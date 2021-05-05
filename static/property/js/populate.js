
	const reportCache = {reservations : [], customers : [], inHouseGuests : [], payments : [], users : []};

	function populatePropertySettings()
	{
		$(".load-slot").addClass("ui placeholder");

		$("#property-page").addClass("ui loading form");

		postJson("hms-admin/worker", function(data, status){

			$("#property-page").removeClass("ui loading form");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					// load data
					propertyInfo = d.data;

					// add info
					$("#property-description").val(d.data.Description);
					$("#property-name").val(d.data.Name);
					$("#property-email").val(d.data.Email1);
					$("#property-email1").val(d.data.Email2);
					$("#property-phone").val(d.data.Phone1);
					$("#property-phone1").val(d.data.Phone2);
					$('#country-wrapper').html(countryDropdown());
					$('#country').dropdown('set selected', d.data.Country);
					$("#country > input").prop("disabled", true); 
					$("#property-address").val(d.data.Address);
					$("#property-type").dropdown('set selected', d.data.Type);

					$(".ui.dropdown").dropdown({allowAdditions:true});
					list({ con: getElement("property-state"), job: 'list states', onLoaded:function(){
						$("#property-state").dropdown('set selected', d.data.State.Id);
					}});

					list({ con: getElement("property-city"), job: 'list cities', onLoaded:function () {
						$("#property-city").dropdown('set selected', d.data.City.Id);
					}});

					// draw rules
					drawPropertyRules('#property-rules', {
						formType : d.data.Formtype,
						cashonly : d.data.Cashonly,
						checkoutH : d.data.Checkouth,
						checkoutM : d.data.Checkoutmin,
						checkinH : d.data.Checkinh,
						checkinM : d.data.Checkinm,
						cancellation : d.data.Cancellation,
						canceldays : d.data.Canceldays,
						cancelhour : d.data.Cancelhours,
						damagedeposit : d.data.Damagedeposit,
						damageamount : d.data.Damagedepositamount,
						earlycheckout : d.data.Earlycheckout,
						partialpayment : d.data.Partialpayment,
						partialpayamount : d.data.Partialpayamount,
						childpolicy : d.data.Childpolicy,
						childfee : d.data.ExtraChildFee,
						checkin_start : d.data.CheckInStarts,
						checkin_end : d.data.CheckInEnds,
						checkout_start : d.data.CheckOutStarts,
						checkout_end : d.data.CheckOutEnds
					});

					// @var array gallery
					let gallery = [];

					// add banner
					gallery.push(d.data.Banner);

					// load others
					if (typeof d.data.Gallery == 'object')
					{
						for (var g in d.data.Gallery) gallery.push(d.data.Gallery[g]);
					}
					
					// update gallery
					d.data.Gallery = gallery;

					// load images
					drawPropertyGallery('#property-gallery', {
						images : d.data.Gallery
					});

					// get property rule wrapper
					var propertyWrapper = document.querySelector('#property-rules');

					// manage partial pay percent
					managePartialPayPercent(propertyWrapper);

					// manage attraction submissions
					manageAttractionSubmission(d.data);

					// run make time function
					manageDataMakeTime();

					// manage checkout rule
					manageCheckOutRule(d.data);

					// manage property facility
					managePropertyFacility(d.data);

					// manage contact information
					manageContactInformation(d.data);

					// load payment methods
					loadPaymentMethods(d.data);

					// manage all data-show
					manageAllDataShow(propertyWrapper);

					// get facilities
					let facilities = d.data.Facilities;

					// get facilities
					postJson(phpvars.CLIENT_API + "listpropertyfacilities", function(data, status){
						
						if(status === "done")
						{
							let d = JSON.parse(data);
			
							if(d.status === "success")
							{
								for(let i = 0; i < d.data.length; i++)
								{
									let space = document.createElement("div");
									space.className = 'checkbox';
									space.innerHTML =
										"<label><input class='v-feature' id='"+d.data[i].Facility+"' type='checkbox'><span>"+d.data[i].Facility+"</span></label>";
			
									// if(d.data.length > (i + 1))
									// {
									// 	i++;
									// 	space.innerHTML += "<div class=''>" +
									// 		"<label><input class='v-feature' id='"+d.data[i].Facility+"' type='checkbox'><span>"+d.data[i].Facility+"</span></label>" +
									// 		"</div>";
									// }
									
									document.getElementById("property-facilities").prepend(space);
								}
			
								for(let i = 0; i < facilities.length; i++)
								{
									getElement(facilities[i]).checked = true;
								}
							}
						}
					}, {});
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, {job:"get-property", property:$("#property-id").val()});
	}

	function populateProperty()
	{
		$("#property-page-1").html("<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>");
		$("#property-page-2").html("<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>");

		$("#property-side-1").html("<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>");
		//$("#property-side-2").html("<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>");
		$("#property-side-2").hide();
		$("#property-name").addClass("ui placeholder");
		$("#property-name").css("color","transparent");

		// create dashboard stats wrapper
		let dashboardStatsWrapper = document.createElement('div');
		dashboardStatsWrapper.innerHTML = phpvars.html.DASHBOARD_STATS;
		document.querySelector('#property-page-1').parentNode.insertBefore(dashboardStatsWrapper, document.querySelector('#property-page-1'));

		postJson("hms-admin/worker", function(data, status){

			if(status === "done")
			{
				let d = JSON.parse(data);

				for(let i = 0; i < d.data.Gallery.length; i++)
				{
					var gallery = document.createElement('div');
					gallery.className = 'gallery-content';
					gallery.innerHTML =
						"<div class='pad-t'>" +
						"<img src='"+phpvars.FILES_CDN+"/"+d.data.Gallery[i]+"' style='width: 100%;'/>" +
						"</div>";

					// add gallery
					dashboardStatsWrapper.find('#property-gallery', (e) => {
						e.appendWhenReady(gallery, '.contain-images');
					});
				}

				// add gallery
				if(d.status === "success")
				{
					$("#property-name").removeClass("ui placeholder");
					$("#property-name").css("color","dimgray");
					$("#property-name").html(d.data.Name);

					$("#property-status").prop("disabled", d.data.Suspended);
					$("#property-status").prop("checked", (d.data.Status && !d.data.Suspended));

					$("#property-side-1").html(
						"<div class=''>" +
						"<div>" +
						"<h3 style='font-family: varela_roundregular;'>Property Information</h3>" +
						"</div>" +
						"<hr/>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l5 m5 s5'>" +
						"<img src='"+phpvars.CDN_URL+"/images/city.png' style='width: 30px;'/>" +
						"</div>" +
						"<div class='w3-col l7 m7 s7 align-r'>" +
						"<h4 style='font-family: varela_roundregular; margin: 0; color: dimgray;'>City</h4>" +
						"<h6 class='sleak text-small' style='margin: 0; margin-top: 5px;'>"+d.data.Cityname+"</h6>" +
						"</div>" +
						"</div>" +
						"<div class='w3-row' style='margin-top: 30px;'>" +
						"<div class='w3-col l5 m5 s5'>" +
						"<img src='"+phpvars.CDN_URL+"/images/map_marker.png' style='width: 30px;'/>" +
						"</div>" +
						"<div class='w3-col l7 m7 s7 align-r'>" +
						"<h4 style='font-family: varela_roundregular; margin: 0; color: dimgray;'>State</h4>" +
						"<h6 class='sleak text-small' style='margin: 0; margin-top: 5px;'>"+d.data.Statename+"</h6>" +
						"</div>" +
						"</div>" +
						"<div class='w3-row' style='margin-top: 30px;'>" +
						"<div class='w3-col l5 m5 s5'>" +
						"<img src='"+phpvars.CDN_URL+"/images/country.png' style='width: 30px;'/>" +
						"</div>" +
						"<div class='w3-col l7 m7 s7 align-r'>" +
						"<h4 style='font-family: varela_roundregular; margin: 0; color: dimgray;'>Address</h4>" +
						"<h6 class='sleak text-small' style='margin: 0; margin-top: 5px;'>"+d.data.Address+"</h6>" +
						"</div>" +
						"</div>" +
						"<div class='w3-row' style='margin-top: 30px;'>" +
						"<div class='w3-col l5 m5 s5'>" +
						"<img src='"+phpvars.CDN_URL+"/images/phone.png' style='width: 30px;'/>" +
						"</div>" +
						"<div class='w3-col l7 m7 s7 align-r'>" +
						"<h4 style='font-family: varela_roundregular; margin: 0; color: dimgray;'>Phone</h4>" +
						"<h6 class='sleak text-small' style='margin: 0; margin-top: 5px;'>"+d.data.Phone1+"</h6>" +
						"</div>" +
						"</div>" +
						"<div class='w3-row' style='margin-top: 30px;'>" +
						"<div class='w3-col l5 m5 s5'>" +
						"<img src='"+phpvars.CDN_URL+"/images/email.png' style='width: 30px;'/>" +
						"</div>" +
						"<div class='w3-col l7 m7 s7 align-r'>" +
						"<h4 style='font-family: varela_roundregular; margin: 0; color: dimgray;'>Email</h4>" +
						"<h6 class='sleak text-small' style='margin: 0; margin-top: 5px; word-wrap: break-word; white-space: nowrap;'>"+d.data.Email1+"</h6>" +
						"</div>" +
						"</div>" +
						"</div>"
					);
					
					
					// get stats
					postJson('hms-admin/statistics', function(e){

						// parse json
						let json = JSON.parse(e);

						// add reservation info
						dashboardStatsWrapper.find('#reservation-section', (e) => {
							e.updateWhenReady('.stats-rows', function(){
								// get all dashboard-table-row
								const tableHeader = this.querySelectorAll('.dashboard-table-row > h1');
								
								// populate data
								tableHeader.item(0).textContent = json.reservationsThisMonth;
								tableHeader.item(1).textContent = json.reservationsToday;
								tableHeader.item(2).textContent = json.noShow;
								tableHeader.item(3).textContent = json.propertyViews;
								tableHeader.item(4).textContent = json.todayAvailability;
								tableHeader.item(5).textContent = json.inHouseGuests;
							});
						});


						// add other info
						dashboardStatsWrapper.find('#other-stats', (e) => {
							e.updateWhenReady('.stats-rows', function(){
								// get all dashboard-table-row
								const tableHeader = this.querySelectorAll('.dashboard-table-row > h1');
								
								// populate data
								tableHeader.item(0).textContent = json.dueToCheckout;
								tableHeader.item(1).textContent = json.checkOutOverdue;
								tableHeader.item(2).textContent = json.totalReviewScore;
								tableHeader.item(3).textContent = json.totalReviewCount;
								tableHeader.item(4).textContent = json.reviewsThisMonth;
								//tableHeader.item(4).textContent = json.;
								//tableHeader.item(5).textContent = json.;
							});
						});

						// add reviews
						$("#property-page-1").html(
							"<div class=''>" +
							"<div>" +
							"<h3 style='font-family: varela_roundregular;'>Latest reviews</h3>" +
							"<hr/>" +
							"<div id='review-con'></div>" +
							"</div>" +
							"</div>");
	
						let revv = 0.0;
	
						for(let i = 0; i < d.reviews.length; i++)
						{
							revv += Number(d.reviews[i].Star);
						}
	
						for(let i = 0; i < d.reviews.length; i++)
						{
							let con = document.createElement("div");
							con.innerHTML =
								"<div>" +
								"<div class='w3-row'>" +
								"<div class='w3-col l12 m12 s12 group-review'>" +
								"<h6 class='review-name' style='font-family: quicksandregular; color: dimgray; color:#26A69A;'>" +							"</h6>" +
								"<h6 style='color: #f2ebeb;'>" +
								"<i class='heart "+(d.reviews[i].Star >= 1 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 2 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 3 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 4 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 5 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 6 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 7 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 8 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 9 ? "red-text" : "")+" icon'></i>" +
								"<i class='heart "+(d.reviews[i].Star >= 10 ? "red-text" : "")+" icon'></i>" +
								"</h6>" +
								"</div>" +
								"<div class='w3-col l6 m6 s6 align-r'>" +
	
								"</div>" +
								"</div>" +
								"<p style='font-family: quicksandregular; color: dimgray; line-height: 170%; font-size: 16px;'>"+d.reviews[i].Body+"</p>" +
								"</div><hr/>";
	
							document.getElementById("review-con").appendChild(con);
	
							if(i >= 5)
							{
								break;
							}
						}

					}, {});
					

					
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}

		}, {job:"get-property", property:$("#property-id").val()});
	}

	function populateReservations(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get-reservations";
		request.property = $("#property-id").val();

		request.tab = "all";
		request.dueDate = $("#reservation-due-date").val();
		request.dueDateTo = $("#reservation-due-date-range").val();

		if($("#paid-reservations").hasClass("active"))
		{
			request.tab = "paid";
		}
		else if($("#unpaid-reservations").hasClass("active"))
		{
			request.tab = "unpaid";
		}
		else if($("#abandoned-reservation").hasClass("active"))
		{
			request.tab = "abandoned";
		}


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(7));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");
			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateReservations"));

					$("#due-count").html(d.today);
					$("#abandpned-count").html(d.abandoned);
					$('#overdue-stay').html(d.overdue);

					// cache result
					reportCache.reservations = d.data;

					if(d.data.length === 0)
					{
						$("#table-body").html("<tr><td colspan='7'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.CDN_URL+"/images/empty_box2.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty reservation list returned</h6>" +
							"</div></td></tr>");
					}

					// create date
					var date = new Date();

					// build date
					var dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

					for (let i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";
						let isAllowed = true;

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						// can we approve
						isAllowed = (d.data[i].Checkindate.Day+"/"+d.data[i].Checkindate.Month+"/"+d.data[i].Checkindate.Year == dateString) ? true : false;

						let td1 = document.createElement("td");
						td1.style.lineHeight = "170%";
						td1.innerHTML = "<span class='blue-text'>"+d.data[i].Customer.Name+" "+d.data[i].Customer.Surname+"</span><br/>"
						+ "<span>"+d.data[i].Bookingnumber+"</span><br/>"
						+"<span style='color: silver;'> Rooms:</span> " +(d.data[i].Rooms.length) + "&nbsp;&nbsp;&nbsp;&nbsp;" +
							"<span style='color: silver;'>adults:</span> "+(d.data[i].Adult)+ "&nbsp;&nbsp;&nbsp;&nbsp;" +
							"<span style='color: silver;'> children:</span> "+(d.data[i].Children)+"";

						let td2 = document.createElement("td");
						td2.style.lineHeight = "170%";
						td2.innerHTML = "<span style='color: silver;'>Total:</span> &#8358; "+
							numFormat(Number(d.data[i].Total).toFixed(2))+
						"<br/><span style='color: silver;'>Paid </span>&#8358; "+
							numFormat(Number(d.data[i].Paidamount).toFixed(2));

						let td3 = document.createElement("td");
						td3.style.lineHeight = "170%";
						td3.innerHTML = d.data[i].Paid ? "<span class='green-back status'>Paid</span>" : "<span class='red-back status'>Unpaid</span>";

						let td4 = document.createElement("td");
						td4.style.lineHeight = "170%";
						td4.innerHTML = "<span style='color: silver;'>Check in: </span>" +
							d.data[i].Checkindate.WeekDay+", "+d.data[i].Checkindate.Day+"/"+d.data[i].Checkindate.MonthName+"/"+d.data[i].Checkindate.Year+
							"<br/><span style='color: silver;'>Check out: </span>" +
						d.data[i].Checkoutdate.WeekDay+", "+d.data[i].Checkoutdate.Day+"/"+d.data[i].Checkoutdate.MonthName+"/"+d.data[i].Checkoutdate.Year;

						let td5 = document.createElement("td");
						td5.style.lineHeight = "170%";

						let isOverdue = reservationIsOverdue(d.data[i]);
						td5.style.lineHeight = "170%";
						td5.innerHTML = ((d.data[i].Noshow == 1) ? "<span class='status red-back' style='background:#f20; color:#fff !important;'>No show</span>" : (d.data[i].Checkedin == true ? "<span class='green-back status'>Checked in</span>" : "<span class='status yellow-back'>Pending</span>"));
							
						// is overdue
						if ((isOverdue || d.data[i].IsOverDue) && d.data[i].Noshow == 0) td5.innerHTML = "<span class='status red-back'>Overdue</span>";

						// pending overdue
						if (d.data[i].UnconfirmedNoShow == 1) td5.innerHTML = "<span class='status' style='background:#FFBF00; color:#fff;' title='Pending Confirmation'>No show</span>";

						// checkedout
						if (d.data[i].Checkedout == true) td5.innerHTML = "<span class='checked-out status'>Checked out</span>";

						// cancelled
						if (d.data[i].Cancelled == true) td5.innerHTML = "<span class='checked-out status'>Cancelled</span>";

						let td6 = document.createElement("td");
						td6.innerHTML = "<div class='w3-container'> " +
							"<div id='" + d.data[i].Id + "-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a class='item' href='#reservation-detail/" + d.data[i].Id + "'><i class='eye icon'></i>Open reservation</a>" +
							((d.data[i].UnconfirmedNoShow == 1 && d.data[i].isApprovedByPartnerAdmin == 0) ? "<a class='item' href='javascript:void(0);' onclick=\"confirmNoShow('" + d.data[i].Id + "')\"><i class='check icon'></i>Confirm No Show</a>" : "") +
							((d.data[i].Noshow == 0 && d.data[i].Cancelable == true && isAllowed && d.data[i].Noshow == 0 && d.data[i].UnconfirmedNoShow == 0 && d.data[i].Cancelled == false) ? "<div class='ui divider'></div>" + "<div class='item' onclick=\"ConfirmReservationDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Cancel reservation</div>" : "")
							"</div>" +
							"</div></div>";

						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	var currentPage = 0;

	function populateReport(page=null)
	{
		let start = page == null ? 0 : page;
		page = page == null ? 1 : page;

		let sn = start + 1;
		let perpage = 25;

		$("#table-body").html("");

		if ($("#perpage").dropdown('get value') != "")
		{
			perpage = $("#perpage").dropdown('get value');
		}

		let filter = "all";

		if ($("#paid-report").hasClass("active"))
		{
			filter = "paid";
		}

		if ($("#refund-report").hasClass("active"))
		{
			filter = "refund";
		}

		let request = {};
		request.Page = page;
		request.Perpage = 25;
		request.filter = filter;
		request.searchterm = $("#search-txt").val();
		request.item_type = "frontdesk_item";
		request.job = "get report";

		request.dueDate = $("#report-due-date").val();
		request.dueDateTo = $("#report-due-date-range").val();
		request.sort_by = $('#payment-mode').dropdown('get value');
		request.posuser = $('#pos-user').val();

		if ($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		// add preloader
		$("#table-body").html(tableLoader(8));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{								
				let d = JSON.parse(data);

				if (d.Status === "success")
				{
					// localStorage.setItem('report', JSON.stringify(d.Data));/
					reportCache.payments = d.Data;

					// add income and refund
					$('#total-income').html('&#8358;' + numFormat(Number(d.Income).toFixed(2)));
					$('#total-refund').html('&#8358;' + numFormat(Number(d.Refunds).toFixed(2)));
					
					let sn = ((request.Page - 1) * request.Perpage) + 1;
					$("#pages").html(Paginate(Number(request.Page), Number(d.Data.length), Number(request.Perpage), "populateReport"));

					if (d.Data.length > 0)
					{
						for (let i = 0; i < d.Data.length; i++)
						{

							let row = document.createElement("tr");
							row.id = d.Data[i].Id + "-row";
							row.setAttribute("row-num", sn);

							let td0 = document.createElement("td");
							td0.innerHTML = "<label><input id='"+d.Data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

							let td1 = document.createElement("td");
							td1.style.lineHeight = "170%";
							td1.innerHTML = "<span class='blue-text'>"+d.Data[i].Customer.Name+" "+d.Data[i].Customer.Surname+"</span>";

							let td2 = document.createElement("td");
							td2.style.lineHeight = "170%";
							td2.innerHTML = "&#8358;"+
							numFormat(Number(d.Data[i].Amount).toFixed(2));

							let td2_ = document.createElement("td");
							td2.style.lineHeight = "170%";
							td2_.innerHTML = d.Data[i].UserId.Name + ' ' + d.Data[i].UserId.Surname;

							let td3 = document.createElement("td");
							td3.style.lineHeight = "170%";
							td3.innerHTML = d.Data[i].PaymentMode;

							let td4 = document.createElement("td");
							td4.style.lineHeight = "170%";
							td4.innerHTML = (d.Data[i].Created.Day + '/' + d.Data[i].Created.Month + '/' + d.Data[i].Created.Year);
							
							let td5 = document.createElement("td");
							td5.style.lineHeight = "170%";
							td5.innerHTML = ((d.Data[i].PaymentCode == 'refund') ? "<span class='status red-back' style='background:#f20; color:#fff !important;'>Refund</span>" : "<span class='green-back status'>"+d.Data[i].PaymentCode+"</span>");
							
							let td6 = document.createElement("td");
							td6.style.lineHeight = "170%";
							td6.innerHTML = d.Data[i].Remark;

							row.appendChild(td0);
							row.appendChild(td1);
							row.appendChild(td2);
							row.appendChild(td2_);
							row.appendChild(td3);
							row.appendChild(td4);
							row.appendChild(td5);
							row.appendChild(td6);

							sn++;

							document.getElementById("table-body").appendChild(row);
						}
					}
					else
					{
						document.getElementById("table-body").innerHTML =
						"<tr><td colspan='8'><div class='pad-2 align-c'><h2><i class='la la-list la-3x' style='color: silver;'></i> </h2>" +
						"<h6 style='font-family: Nunito, quicksandregular; color: dimgray;'>"+d.Message+"</h6><br/>" +
						"<button class='ui sleak button'>try again</button></div></td></tr>";
					}
				}
				else
				{
					document.getElementById("table-body").innerHTML =
						"<tr><td colspan='8'><div class='pad-2 align-c'><h2><i class='la la-list la-3x' style='color: silver;'></i> </h2>" +
						"<h6 style='font-family: Nunito, quicksandregular; color: dimgray;'>"+d.Message+"</h6><br/>" +
						"<button class='ui sleak button'>try again</button></div></td></tr>";
				}
			}
			else
			{
				document.getElementById("table-body").innerHTML =
					"<tr><td colspan='8'><div class='pad-2 align-c'><h2><i class='la la-list la-3x' style='color: silver;'></i> </h2>" +
					"<h6 style='font-family: Nunito, quicksandregular; color: dimgray;'>Connection error</h6><br/>" +
					"<button class='ui sleak button'>try again</button></div></td></tr>";
			}
		}, request);

		// load admin users
		if (reportCache.users.length == 0)
		{
			postJson("hms-admin/worker", function(data, status){

				if (status == 'done')
				{
					data = JSON.parse(data);

					// check status
					if (data.status == 'success')
					{
						if (data.data.length > 0)
						{
							$('.switch-user').show();
							reportCache.users = data.data;
						}
					}
				}
			}, {
				job : 'get admin users',
				Page : 1,
				Perpage : 1000,
				Filter : 'search list',
				Filtervalue : ''
			});
		}
		
	}

	function exportReportCSV()
	{
		let reports = getAllCheckedItems(reportCache.payments, 'Report');
		if(reports != null && reports.length > 0)
		{
			let sn = 0;
			let report = reports.map(e => {
				sn += 1;
				
				const { Day, MonthName, Year } = e.Created;

				return { 
					SN: sn, 
					Name: `${e.Customer.Name} ${e.Customer.Surname}`, 
					Total: numFormat(Number(e.Amount).toFixed(2)),
					User: `${e.UserId.Name} ${e.UserId.Surname}`,
					Payment_mode: e.PaymentMode,
					Date: `${Day}-${MonthName}-${Year}`, 
					Account: e.PaymentCode, 
					Remark: e.Remark
				};
			});
	
			const csvData = objectToCsv(report);
			downloadCSV(csvData, 'Report-'+(new Date).getTime());
		}
	}

	function launchUsers()
	{
		loadModal({title:"Generate user report", html:"<div class='pad-1'>" +
			"<div class='ui fluid input'>" +
			"<select onchange=\"generateReport()\" id='report-select' class='ui search fluid wix-select dropdown selection'>" +
			generateUsersDropdown()+
			"</select>"+
			"</div> " +
			"</div>", onLoaded:function(){
				$('#report-select').dropdown();
			}});
	}

	function generateReport()
	{
		var user = $('#report-select').dropdown('get value');

		// name 
		var name = 'General';

		// check user
		if (user == 'adxc0')
		{
			name = 'Main Admin'
		}
		else if (user != 'all')
		{
			reportCache.users.forEach((e)=>{
				if (e.Id == user)
				{
					name = (e.Name + ' ' + e.Surname);
				}
			});
		}
		else if (user == 'all')
		{
			user = '';
		}

		// add to pos user
		$('#pos-user').val(user);

		// update title
		$('#active-user').html(name);

		// load report
		populateReport();

		// close modal
		closeGenModal('0');
	}

	function generateUsersDropdown()
	{
		var options = '<option value="">Please choose</option>';
		options += '<option value="all">General</option>';
		options += '<option value="adxc0"> Main Admin </option>';

		// load from array
		reportCache.users.forEach((user)=>{
			options += '<option value="'+user.Id+'">'+(user.Name + ' ' + user.Surname)+'</option>';
		});

		// return options
		return options;
	}

	function reservationIsOverdue(reservation)
	{
		// is overdue
		let isOverdue = false;

		// build checkout and checkin date
		let checkOutDate = reservation.Checkoutdate.Day + '' + parseInt(reservation.Checkoutdate.Month)-1 + '' + reservation.Checkoutdate.Year;
		let checkInDate = reservation.Checkindate.Day + '' + parseInt(reservation.Checkindate.Month)-1 + '' + reservation.Checkindate.Year;

		// get date
		let date = new Date;

		// build today
		let todayDate = date.getDate() + '' + date.getMonth() + '' + date.getFullYear();

		// is overdue??
		if (parseInt(todayDate) > parseInt(checkInDate))
		{
			if (!reservation.Checkedin)
			{
				isOverdue = true;
			}
			else
			{
				// check out passed ???
				if (parseInt(todayDate) > parseInt(checkOutDate))
				{
					if (reservation.Noshow == 0)
					{
						isOverdue = true;
					}
				}
			}
		}

		return isOverdue;
	}

	function populateReservation()
	{
		let request = {
			reservation:getArg(),
			property:$("#property-id").val(),
			job:"get-reservation"
		};

		//loaders
		$(".load-slip").addClass("ui placeholder");
		let load = document.getElementsByClassName("load-slip");
		for(let i = 0; i < load.length; i++)
		{
			if(load[i].getAttribute("color-store") == undefined)
			{
				load[i].setAttribute("color-store", load[i].style.color);
			}
		}
		$(".load-slip").css("color","transparent");

		postJson("hms-admin/worker", function(data, status){

			$(".load-slip").removeClass("ui placeholder");
			let load = document.getElementsByClassName("load-slip");
			for(let i = 0; i < load.length; i++)
			{
				if(load[i].getAttribute("color-store") != null)
				{
					load[i].style.color = load[i].getAttribute("color-store");
				}
			}
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#res-number").html(d.data.Bookingnumber);

					var phone = d.data.Customer.Phone.substring(0,5) + '######', email = d.data.Customer.InternalEmail;

					if (d.data.Checkedin && d.data.Checkedout == false)
					{
						phone = d.data.Customer.Phone;
						email = d.data.Customer.Email;
					}

					$("#res-name").html(d.data.Customer.Name+" "+d.data.Customer.Surname);
					$("#res-phone").html(phone);
					$("#res-email").html(email);

					$("#subtotal").html(numFormat(Number(d.data.Total).toFixed(2)));
					$("#discount").html(numFormat(Number(d.data.Discount).toFixed(2)));
					$("#total").html(numFormat((Number(d.data.Total) - Number(d.data.Discount)).toFixed(2)));
					$("#paid").html(d.data.Paid ? numFormat(Number(d.data.Paidamount).toFixed(2)) : "0.00");
					
					
					let roomNum = [];
					
					for(let h = 0; h < d.data.Rooms.length; h++)
					{
					    //roomNum.push(Number(d.data.Rooms[h].Number));
					}


					$("#room-res-count").html(d.data.Rooms.length);

					$("#res-crested-con").html(d.data.Created.WeekDay+", "+d.data.Created.Day+"/"+
						d.data.Created.MonthName+"/"+d.data.Created.Year);

					$("#special-req").html(d.data.Request);

					$("#see-profile-con").html("<i class='user circle icon'></i> See profile");
					$("#see-profile-con").attr("href", "#customer/"+d.data.Customer.Id);


					if(d.data.Paid)
					{
						$("#pay-status").addClass("green-back");
						$("#pay-status").removeClass("yellow-back");
						$("#pay-status").html("Paid");
					}
					else
					{
						$("#pay-status").removeClass("green-back");
						$("#pay-status").addClass("yellow-back");
						$("#pay-status").html("Unpaid");
					}

					if (d.data.Checkedin && d.data.Checkedout)
					{
						$("#reserve-status").addClass("checked-out");
						$("#reserve-status").removeClass("red-back");
						$("#reserve-status").removeClass("green-back");
						$("#reserve-status").removeClass("blue-back");
						$("#reserve-status").html("Checked out");
					}

					if(d.data.Status == "active")
					{
						$("#reserve-status").addClass("blue-back");
						$("#reserve-status").removeClass("red-back");
						$("#reserve-status").removeClass("green-back");
						$("#reserve-status").html("Active");
					}
					else if((d.data.Status == "due") && (d.data.Noshow == 0))
					{
						$("#reserve-status").addClass("green-back");
						$("#reserve-status").removeClass("red-back");
						$("#reserve-status").removeClass("blue-back");
						$("#reserve-status").html("Due");
					}
					else if(d.data.Noshow == 1)
					{
						$("#reserve-status").removeClass("green-back");
						$("#reserve-status").addClass("red-back");
						$("#reserve-status").removeClass("blue-back");
						$("#reserve-status").html("No show");
					}

					for(let i = 0; i < d.data.Rooms.length; i++)
					{
						let con = document.createElement("div");
						con.className = "w3-row";
						con.innerHTML =
							"<div class='w3-col l4 m4 s4 pad-2 align-c'>" +
							"<img src='"+phpvars.FILES_CDN+"/"+d.data.Rooms[i].Room.Images[0]+
							"' style='width: 90px; border-radius: 4px; max-width: 100%;'/>" +
							"</div>" +
							"<div class='w3-col l8 m8 s8 pad-1'>" +
							"<h6 class='sleak'><span style='color: silver;'>Room category: </span>" +
							"<span style=' font-weight: bold;'>"+d.data.Rooms[i].Room.Name+"</span>" +
							"</h6>" +
							"<span class='sleak' style='font-size: 13px;'><span style='color: silver;'>Period: </span>"+
							d.data.Checkindate.WeekDay+" "+d.data.Checkindate.Day+"/"+
							d.data.Checkindate.MonthName+"/"+d.data.Checkindate.Year+" - "+
							d.data.Checkoutdate.WeekDay+" "+d.data.Checkoutdate.Day+"/"+
							d.data.Checkoutdate.MonthName+"/"+d.data.Checkoutdate.Year+"</span><br/>" +
							"<span class='sleak'><span style='color: silver;'>Night(s): </span>"+d.data.Period+"</span><br/>" +
							"<span class='sleak'><span style='color: silver;'>Guest(s): </span>"+((Number(d.data.Adult) + Number(d.data.Children)))+"</span><br/>" +
							"<span class='sleak'><span style='color: silver;'>Room: </span>"+Number(d.data.Rooms[i].Number)+"</span>" +
							"</div>";
						getElement("room-reservations-con").appendChild(con);
					}
				}
				else
				{
					$(".settings-text").css("color","lightgray");
					$(".settings-control").prop("disabled", true);
					$("#error-pane-text").html(d.Message);
					$("#error-pane").transition("drop in");


					$(".load-slip").removeClass("ui placeholder");
					$(".load-slip").css("color", "silver");
				}

			}
			else
			{
				$(".settings-text").css("color","lightgray");
				$(".settings-control").prop("disabled", true);
				$("#error-pane-text").html("Connection error. Check your connection and try again");
				$("#error-pane").transition("drop in");


				$(".load-slip").removeClass("ui placeholder");
				$(".load-slip").css("color", "silver");
			}
		},request);
	}

	function populateGuests(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "getguest";
		request.property = $("#property-id").val();
		request.dueDate = $('#guest-due-date').val();
		request.dueDateTo = $('#guest-due-date-range').val();

		request.tab = "all";

		if($("#inhouse-guest-tab").hasClass("active"))
		{
			request.tab = "in-house";
		}
		else if($("#due-checkout-tab").hasClass("active"))
		{
			request.tab = "due-check-out";
		}
		else if($("#overdue-tab").hasClass("active"))
		{
			request.tab = "overdue-check-out";
		}


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(8));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateGuests"));

					$("#inhouse-count").html(d.inhouse);
					$("#todays-checkin-count").html(d.today);
					$("#todays-checkout-count").html(d.todayCheckout);
					$("#overdue-stay").html(d.overdue);

					if(d.data.length === 0)
					{
						$("#table-body").html("<tr><td colspan='9'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.CDN_URL+"/images/empty_box2.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty guest list returned</h6>" +
							"</div></td></tr>");
					}

					reportCache.inHouseGuests = d.data;

					for(let i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Guest.Id + "-row";
						row.setAttribute("s-data", d.data[i].Guest.Id+":guest");

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";


						let td1 = document.createElement("td");
						td1.innerHTML = "<span class='blue-text'>"+d.data[i].Guest.Name+" "+d.data[i].Guest.Surname+"</span><br/>" +
							"<span style='color: silver;'>Email: </span><span style='color: dimgray;'>"+
							d.data[i].Guest.InternalEmail+"</span><br/>" +
							"<span style='color: silver;'>Phone: </span><span style='color: dimgray;'>"
							+d.data[i].Guest.Phone.substring(0,5)+"######</span>";


						let td2 = document.createElement("td");
						td2.innerHTML = "<span style='color: silver;'>Check-in: </span><span style='color: dimgray;'>"+
							d.data[i].Checkin.Day+" "+d.data[i].Checkin.MonthName+" "+d.data[i].Checkin.Year+"</span><br/>" +
							"<span style='color: silver;'>Check-out: </span><span style='color: dimgray;'>"+
							d.data[i].Checkout.Day+" "+d.data[i].Checkout.MonthName+" "+d.data[i].Checkout.Year+"</span>";

						let rooms = "";
						if(d.data[i].Rooms.length < 4)
						{
							for(let j = 0; j < d.data[i].Rooms.length; j++)
							{
								rooms = ((rooms === "") ? "" : "<br/>") +
									d.data[i].Rooms[j].Category.Name + ":" +
									"<span style='color: lightgray;'> room: </span>" + d.data[i].Rooms[j].Number;
							}
						}
						else
						{
							rooms = d.data[i].Rooms.length + " rooms";
						}

						let td3 = document.createElement("td");
						td3.innerHTML = rooms;

						let td4 = document.createElement("td");
						td4.innerHTML = "<span style='color: silver;'>Adults: </span><span style='color: dimgray;'>"+
							d.data[i].Adults+"</span><br/>" +
							"<span style='color: silver;'>Children: </span><span style='color: dimgray;'>"+
							d.data[i].Children+"</span>";

						let td5 = document.createElement("td");
						td5.innerHTML = "<span style='color: silver;'>Total: </span><span style='color: dimgray;'> &#8358; "+
							numFormat(((Number(d.data[i].Total) + Number(d.data[i].Bills)) - Number(d.data[i].Discount)).toFixed(2))+"</span><br/>" +
							"<span style='color: silver;'>Deposit: </span><span style='color: dimgray;'>&#8358; "+
							(numFormat(Number(d.data[i].Paidamount).toFixed(2)))+"</span>";


						let balance = (((Number(d.data[i].Total) - Number(d.data[i].Discount)) + Number(d.data[i].Bills)) - (Number(d.data[i].Paidamount)));
						let rebate = ((Number(d.data[i].Paidamount)) - ((Number(d.data[i].Total) - Number(d.data[i].Discount)) + Number(d.data[i].Bills)));

						let td6 = document.createElement("td");
						td6.innerHTML = "<span style='color: silver;'>Balance: </span><span style='color: dimgray;'> &#8358; "+
							((balance > 0) ? numFormat(balance.toFixed(2)) : "0.00") +
							"</span><br/>" +
							"<span style='color: silver;'>Rebate: </span><span style='color: dimgray;'>&#8358; "+
							((rebate > 0) ? numFormat(rebate.toFixed(2)) : "0.00") +"</span>";


						let td7 = document.createElement("td");
						td7.innerHTML = "<span style='color: silver;'>Lodging: </span><span style='color: dimgray;'> &#8358; "+
							numFormat((Number(d.data[i].Total) - Number(d.data[i].Discount)).toFixed(2))+"</span><br/>" +
							"<span style='color: silver;'>Others: </span><span style='color: dimgray;'>&#8358; "+
							(numFormat(Number(d.data[i].Bills).toFixed(2)))+"</span>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);

						sn++;
						document.getElementById("table-body").appendChild(row);
					}
					$(".c-menu").dropdown();
				}
				else
				{
					$("#table-body").html("<tr><td colspan='9'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.CDN_URL+"/images/code.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>"+d.message+"</h6>" +
						"<br/>" +
						"<button class='ui basic sleak button' onclick='populateGuests()'>try again</button>" +
						"</div></td></tr>");
				}
			}
			else
			{
				$("#table-body").html("<tr><td colspan='9'><div class='align-c pad-2'>" +
					"<img src='"+phpvars.CDN_URL+"/images/ban.png' style='width: 60px;'/>" +
					"<h6 class='sleak-b' style='color: dimgray;'>Connection error</h6>" +
					"<br/>" +
					"<button class='ui basic sleak button' onclick='populateGuests()'>try again</button>" +
					"</div></td></tr>");
			}
		}, request);
	}

	function populateCustomers(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "getcustomers";
		request.property = $("#property-id").val();


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}

		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(7));
		document.getElementById("table-body").setAttribute('data-page-id', page);

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");
			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateCustomers"));

					$("#customers-count").html(d.Total);

					// cache
					reportCache.customers = d.data;

					if(d.data.length === 0)
					{
						$("#table-body").html("<tr><td colspan='7'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.CDN_URL+"/images/empty_box2.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Enpty customers list returned</h6>" +
							"</div></td></tr>");
					}

					for(let i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";
						row.setAttribute("s-data", d.data[i].Id+":guest");

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Profilepic != "" ?
							"<img src='"+phpvars.FRONTDESK_CDN+'../files/'+d.data[i].Profilepic+"' style='width: 50px; border-radius: 50%;'/>" :
							(((d.data[i].Sex == "male") || (d.data[i].Sex == "")) ?
								"<img src='"+phpvars.FRONTDESK_CDN+"/images/icons/pastel/customer.png' style='width: 50px; border-radius: 50%;'/>" :
								"<img src='"+phpvars.FRONTDESK_CDN+"/images/icons/pastel/customer.png' style='width: 50px; border-radius: 50%;'/>");


						let td2 = document.createElement("td");
						td2.innerHTML = "<span class='blue-text'>"+d.data[i].Name+" "+d.data[i].Surname+"</span><br/>" +
							"<span style='color: silver;'>Email: </span><span style='color: dimgray;'>"+
							d.data[i].InternalEmail+"</span><br/>" +
							"<span style='color: silver;'>Phone: </span><span style='color: dimgray;'>"
							+d.data[i].Phone.substring(0,5)+"######</span><br/>" + 
							"<span style='color: silver;'>Banned: </span><span style='color: dimgray;'>" +
							(d.data[i].isBanned ? '<span style="color: #fff;background: #ff4734;padding: 3px;border-radius: 5px;font-size: 11px;">Yes</span>' : '<span style="color: #fff;background: #51c854;padding: 3px;border-radius: 5px;font-size: 11px;">No</span>')+"</span>";

						let td3 = document.createElement("td");
						td3.innerHTML = "<span style='color: silver;'>State: </span><span style='color: dimgray;'>"+
							d.data[i].State+"</span><br/>" +
							"<span style='color: silver;'>Country: </span><span style='color: dimgray;'>"+
							d.data[i].Country+"</span><br/>" +
							"<span style='color: silver;'>Address: </span><span style='color: dimgray;'>"+
							(d.data[i].Address == null ? 'n/a' : d.data[i].Address)+"</span><br/>";

						let td4 = document.createElement("td");
						td4.innerHTML = d.data[i].Sex;
						let lastSeen = 'N/A';

						// check for last seen
						if (typeof d.data[i].Lastseen === 'object')
						{
							lastSeen = d.data[i].Lastseen.WeekDay +" - "+ d.data[i].Lastseen.Day +"/"+ d.data[i].Lastseen.MonthName +"/"+ d.data[i].Lastseen.Year
						}

						let td5 = document.createElement("td");
						td5.innerHTML = "<span style='color: silver;'>Registered: </span><span style='color: dimgray;'>"+
							d.data[i].Created.WeekDay +" - "+ d.data[i].Created.Day +"/"+ d.data[i].Created.MonthName +"/"+ d.data[i].Created.Year +"</span><br/>" +
							"<span style='color: silver;'>Last seen: </span><span style='color: dimgray;'>"
							+lastSeen+"</span>";

						// get text
						let banText = (!d.data[i].isBanned) ? "<i class='lock icon'></i> Ban" : "<i class='unlock icon'></i> UnBan";
						let banActionText = (!d.data[i].isBanned) ? 'ban' : 'unban';

						let td6 = document.createElement("td");
						td6.innerHTML =
							"<div class='w3-container'> " +
							"<div id='" + d.data[i].Id + "-btn' class='ui icon top right pointing dropdown button c-menu'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='#customer/"+d.data[i].Id+"' class='item'><i class='male icon'></i> Profile</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmCustomerDelete('" + d.data[i].Id + "', '"+banActionText+"')\">"+banText+"</div>" +
							"</div>" +
							"</div>" +
							"</div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function updateProfileImage(image)
	{
		console.log(image);
	}

	function populateCustomer()
	{
		let request = {
			customerid:getArg(),
			property:$("#property-id").val(),
			job:"getcustomer"
		};

		//loaders
		$(".load-slip").addClass("ui placeholder");
		let load = document.getElementsByClassName("load-slip");
		for(let i = 0; i < load.length; i++)
		{
			if(load[i].getAttribute("color-store") == undefined)
			{
				load[i].setAttribute("color-store", load[i].style.color);
			}
		}
		$(".load-slip").css("color","transparent");

		postJson("hms-admin/worker", function(data, status){

			$(".load-slip").removeClass("ui placeholder");
			let load = document.getElementsByClassName("load-slip");
			for(let i = 0; i < load.length; i++)
			{
				if(load[i].getAttribute("color-store") != null)
				{
					load[i].style.color = load[i].getAttribute("color-store");
				}
			}

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					var src = phpvars.CDN_URL+"/images/customer.png";

					if(d.data.Profilepic != "")
					{
						src = phpvars.CDN_URL + "../files/"+ d.data.Profilepic;
					}

					if (d.data.isActivated === true)
					{
						$("#profile-img-con").html(
							"<div style='position:relative; padding-top:10px; padding-bottom:10px;'>" +
							"<img id='gallery-image-profile' src='"+src+"' style='max-width: 100%;'/>" +
							"</div>"); 
					}
					else
					{
						$("#profile-img-con").html(
							"<div style='position:relative; padding-top:10px; padding-bottom:10px;'>" +
							"<img id='gallery-image-profile' src='"+src+"' style='max-width: 100%;'/>" +
							"<label for='update-picture'>"+
							"<input type='file' name='profile-picture' onchange=\"processGalleryImage(this, 'profile', false, '"+src+"', 'updateProfileImage');\" id='update-picture' style='display:none;' accept='.jpg,.png,.jpeg,.gif'/>"+
							"<input type='hidden' id='gallery-image-name-profile'/>"+
							"<span class='update-picture-button' id='gallery-btn-profile'><i class='picture icon'></i></span>"+
							"</label>"+
							"</div>");
					}
					

					$("#creation-date").html(d.data.Created.WeekDay+", "+d.data.Created.Day+"/"+d.data.Created.MonthName+"/"+d.data.Created.Year);
					$("#customer-name").html(d.data.Name+" "+d.data.Surname);

					// $("#salutation").html(d.data.Salutation != "" ? d.data.Salutation : "<span style='color: silver;'>Salutation</span>");
					// $("#occupation").html(d.data.Occupation != "" ? d.data.Occupation : "<span style='color: silver;'>Occupation</span>");
					// $("#gender").html(d.data.Sex != "" ? d.data.Sex : "<span style='color: silver;'>Gender</span>");

					// $("#dob").html(d.data.DOB);
					// $("#lastseen").html(d.data.Lastseen.Year < 1980 ? "<span style='color: silver;'>Lastseen</span>" :
					// 	d.data.Lastseen.WeekDay+", "+d.data.Lastseen.Day+"/"+d.data.Lastseen.Month+"/"+d.data.Lastseen.Year+" - "+
					// 	d.data.Lastseen.Hour+":"+d.data.Lastseen.Miniute);

					// $("#country").html(d.data.Country != "" ? d.data.Country : "<span style='color: silver;'>Country</span>");
					// $("#city").html(d.data.City != "" ? d.data.City : "<span style='color: silver;'>City</span>");
					// $("#state").html(d.data.State != "" ? d.data.State : "<span style='color: silver;'>State</span>");
					// $("#email").html(d.data.Email != "" ? d.data.Email : "<span style='color: silver;'>Email</span>");
					// $("#phone").html(d.data.Phone != "" ? d.data.Phone : "<span style='color: silver;'>Phone</span>");

					// load html
					let html = d.data.isActivated === true ? '<br/><button class="ui sleak blue button" disabled>Save</button>' : '<br/><button id="billing-btn" class="ui sleak blue button" onclick="addCustomerInfo()">Save</button><input type="hidden" id="guest-id" value="'+d.data.Id+'"/>';

					// load email
					let email = d.data.isActivated === true ? d.data.InternalEmail : d.data.Email;

					// load phone
					let phone = d.data.isActivated === true ? d.data.Phone.substring(0,5) + '######' : d.data.Phone;

					// load customer profile
					$("#customer-profile").html(getCustomerForm({
						guest : {
							name : d.data.Name,
							surname : d.data.Surname,
							phone : phone,
							email : email,
							sex : d.data.Sex,
							dob : d.data.DOB,
							state : d.data.State,
							city : d.data.City,
							address : d.data.Address,
						}
					}, html));

					$('#country').dropdown('set selected', d.data.Country);
					$('#total-reservations').text(d.data.Activity.Reservations);
					$('#total-lodging').text(d.data.Activity.Lodging);
					$('#total-noshow').text(d.data.Activity.NoShow);
					$('#total-reviews').text(d.data.Activity.Reviews);
				}
				else
				{
					$(".settings-text").css("color","lightgray");
					$(".settings-control").prop("disabled", true);
					$("#error-pane-text").html(d.status);
					$("#error-pane").transition("drop in");


					$(".load-slip").removeClass("ui placeholder");
					$(".load-slip").css("color", "silver");
				}
			}
			else
			{
				$(".settings-text").css("color","lightgray");
				$(".settings-control").prop("disabled", true);
				$("#error-pane-text").html("Connection error. Check your connection and try again");
				$("#error-pane").transition("drop in");


				$(".load-slip").removeClass("ui placeholder");
				$(".load-slip").css("color", "silver");
			}
		}, request);
	}

	function populateAdminRoles(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get roles";
		request.property = $("#property-id").val();


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(4));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");
			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateRole"));

					if(d.data.length == 0)
					{
						$("#table-body").html("<tr><td colspan='4'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/role.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>Role list is empty</h6>" +
						"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";



						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Name;

						let td2 = document.createElement("td");
						td2.innerHTML = "";

						td2.innerHTML += GetAccessLabel("Booking", d.data[i].Booking);
						td2.innerHTML += GetAccessLabel("Coupon & Discount", d.data[i].Discount);
						td2.innerHTML += GetAccessLabel("Customers", d.data[i].Customers);
						td2.innerHTML += GetAccessLabel("Staff", d.data[i].Staff);
						td2.innerHTML += GetAccessLabel("Rooms", d.data[i].Rooms);
						td2.innerHTML += GetAccessLabel("Kitchen", d.data[i].Kitchen);
						td2.innerHTML += GetAccessLabel("Bakery", d.data[i].Bakery);
						td2.innerHTML += GetAccessLabel("Bar", d.data[i].Bar);
						td2.innerHTML += GetAccessLabel("Laundry", d.data[i].Laundry);
						td2.innerHTML += GetAccessLabel("Housekeeping", d.data[i].Housekeeping);
						td2.innerHTML += GetAccessLabel("Pool", d.data[i].Pool);
						td2.innerHTML += GetAccessLabel("Store", d.data[i].Store);
						td2.innerHTML += GetAccessLabel("Event", d.data[i].Event);
						td2.innerHTML += GetAccessLabel("Finance", d.data[i].Finance);
						td2.innerHTML += GetAccessLabel("Branch", d.data[i].Branch);
						td2.innerHTML += GetAccessLabel("Log", d.data[i].Log);
						td2.innerHTML += GetAccessLabel("Report", d.data[i].Report);
						td2.innerHTML += GetAccessLabel("Messaging", d.data[i].Messaging);
						td2.innerHTML += GetAccessLabel("Webfront", d.data[i].Webfront);
						td2.innerHTML += GetAccessLabel("Webconfig", d.data[i].Webconfig);
						td2.innerHTML += GetAccessLabel("Settings", d.data[i].Settings);

						td2.innerHTML += GetAccessLabel("Front Desk", d.data[i].Frontdesk);
						td2.innerHTML += GetAccessLabel("Kitchen POS", d.data[i].Kitchenpos);
						td2.innerHTML += GetAccessLabel("Bakery POS", d.data[i].Bakerypos);
						td2.innerHTML += GetAccessLabel("Bar POS", d.data[i].Barpos);
						td2.innerHTML += GetAccessLabel("Laundry POS", d.data[i].Laundrypos);
						td2.innerHTML += GetAccessLabel("Pool POS", d.data[i].Poolpos);

						let td3 = document.createElement("td");
						if(d.data[i].System == false)
						{
                            td3.innerHTML = "<div class='w3-container'> " +
                                "<div id='" + d.data[i].Id + "-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
                                "<i class='blue wrench icon'></i>" +
                                "<div class='menu'>" +
                                "<div class='header'>Action</div>" +
                                "<a class='item' href='#add-role/" + d.data[i].Id + "'><i class='pencil icon'></i>Edit</a>" +
                                "<div class='ui divider'></div>" +
                                "<div class='item' onclick=\"ConfirmRoleDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
                                "</div>" +
                                "</div></div>";
                        }
						else
                        {
                            td3.innerHTML = "<button class='ui inverted green icon button'><i class='cog icon'></i></button>";
                        }


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function GetAccessLabel(name, access)
	{
		let ret = "";

		if(access.ReadAccess === true)
		{
			ret = "R";
		}
		if(access.WriteAccess === true)
		{
			if(ret == ""){ret = "W";}else{ret += "/W";}
		}

		let color = "";

		if(access.ReadAccess && access.WriteAccess)
		{
			color = "green-back";
		}
		else if(!access.WriteAccess && access.ReadAccess)
		{
			color = "blue-back";
		}
		else if(access.WriteAccess && !access.ReadAccess)
		{
			color = "red-back";
		}
		else
		{
			color = "blue-back";
		}


		if(ret !== "")
		{
			return "<label class='status "+color+"' style='margin: 1px; display: inline-block;'>"+name+": "+ret+"</label>"
		}
		else
		{
			return "";
		}
	}

	function populateDepartments()
	{
		let request = {
			job:"get departments"
		};

		request.Page = 1;
		request.Perpage = 25;

		$("#table-body").html(tableLoader(4));

		postJson("hms-admin/worker", function(data, status){

			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					$("#table-body").html("");

					if(d.data.length == 0)
					{
						$("#table-body").html("<tr><td colspan='4'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>No Department Has Been Added</h6>" +
						"</div></td></tr>");
					}


					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Department.Id + "-row";

						let td01 = document.createElement("td");
						td01.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + (i+1) + "</span></label>";

						let td0 = document.createElement("td");
						td0.innerHTML = d.data[i].Department.Name;

						let td1 = document.createElement("td");
						td1.innerHTML = "<label class='status green-back'>"+d.data[i].Staffcount+" staff</label>";

						let td2 = document.createElement("td");
						td2.innerHTML = "<span style='cursor: pointer;' onclick=\"editDepartment('" + d.data[i].Department.Id + "','"+d.data[i].Department.Name+"')\"><i class='pencil blue icon'></i></span>&nbsp;&nbsp;&nbsp;" +
						"<span id='"+d.data[i].Department.Id+"-del-btn' style='cursor: pointer;' onclick=\"ConfirmDepartmentDelete('" + d.data[i].Department.Id + "')\"><i class='trash red icon'></i></span>";

						row.appendChild(td01);
						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);

						document.getElementById("table-body").appendChild(row);
					}
				}
				else
				{

				}
			}
			else
			{

			}

		}, request);
	}

	function populateShift()
	{
		let request = {
			job:"get shift"
		};

		$("#shift-tbl").html("");
		$("#shift-tbl").html(tableLoader(4));

		postJson("hms-admin/worker", function(data, status){
			$("#shift-tbl").html("");
			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					$("#shift-tbl").html("");

					if(d.data.length == 0)
					{
						$("#shift-tbl").html("<tr><td colspan='3'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>No Shift Has Been Created</h6>" +
						"</div></td></tr>");
					}


					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Shift.Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = d.data[i].Shift.Name;

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Period;

						let td2 = document.createElement("td");
						td2.innerHTML = "<label class='status'>"+d.data[i].Hours+"</label>";

						let td3 = document.createElement("td");
						td3.style.textAlign = "right";
						td3.innerHTML = "<span style='cursor: pointer;' onclick=\"editShift('" + d.data[i].Shift.Id + "', this)\"><i class='pencil blue icon'></i></span>&nbsp;&nbsp;&nbsp;" +
						"<span id='"+d.data[i].Shift.Id+"-del-btn' style='cursor: pointer;' onclick=\"ConfirmShiftDelete('" + d.data[i].Shift.Id + "')\"><i class='trash red icon'></i></span>";

						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);

						document.getElementById("shift-tbl").appendChild(row);
					}
				}
				else
				{

				}
			}
			else
			{

			}

		}, request);
	}

	let staffCurrentPage = 1;

	function populateStaff(page=1)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "sort by";
		request.Filtervalue = "created";
		request.job = "get staff";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}

		// update page
		staffCurrentPage = request.Page;

		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		if($("#filter").dropdown('get value') != "")
		{
			//request.Filter = $("#filter").dropdown('get value');
		}

		if(request.Filter == "search list")
		{
			request.Filtervalue = $("#search-txt").val();
		}

		if(request.Filter == "sort by")
		{
			//request.Filtervalue = $("#default-order").val();
		}

		if(request.Filter == "filter by department")
		{
			request.Filtervalue = $("#filter-department").val();
		}

		if(request.Filter == "filter by shift")
		{
			request.Filtervalue = $("#filter-shift").val();
		}

		if(request.Filter == "filter by status")
		{
			request.Filtervalue = $("#filter-status").val();
		}

		if(request.Filter == "filter by suspended")
		{
			request.Filtervalue = $("#filter-suspended").val();
		}

		$("#table-body").html(tableLoader(8));

		postJson("hms-admin/worker", function(data, status){

			$("#table-body").html("");

			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					//$("#total_count").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateStaff"));

					if(d.data.length == 0)
					{
						$("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/user.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>Staff list is empty</h6>" +
						"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Staff.Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Staff.Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = "<img src='"+phpvars.FILES_CDN+"/"+d.data[i].Staff.Passport+"' style='width: 45px; border-radius: 50%;'/>";

						let td2 = document.createElement("td");
						td2.innerHTML = "<span class='blue-text'>"+d.data[i].Staff.Name+" "+d.data[i].Staff.Surname+"</span><br/>" +
                        "<span style='color: silver;'>Email: </span><span style='color: dimgray;'>"+
                        d.data[i].Staff.Email+"</span><br/>" +
                        "<span style='color: silver;'>Phone: </span><span style='color: dimgray;'>"
                        +d.data[i].Staff.Phone+"</span>";

						let td3 = document.createElement("td");
						td3.innerHTML = d.data[i].Staff.Department.Name;

						let td4 = document.createElement("td");
						td4.innerHTML = d.data[i].Onduty ? "<label class='status green' style=''>On duty</label>"
						: "<label class='status blue-back' style=''>off duty</label>";

						let td5 = document.createElement("td");
						td5.innerHTML = d.Currency.Symbol+''+numFormat(Number(d.data[i].Staff.Salary));

						let td6 = document.createElement("td");
						td6.innerHTML = d.data[i].Staff.State;

						let td7 = document.createElement("td");
						td7.innerHTML = "<div class='w3-container'> " +
						"<div id='"+ d.data[i].Staff.Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
						"<i class='blue wrench icon'></i>" +
						"<div class='menu'>" +
						"<div class='header'>Action</div>" +
						"<div class='ui divider'></div>" +
						"<a class='item' href='#staff/new-staff/"+d.data[i].Staff.Id+"'><i class='edit icon'></i>Edit</a>" +
						"<div class='item' onclick=\"ConfirmStaffDelete('" + d.data[i].Staff.Id + "')\"><i class='trash icon'></i>Delete</div>" +
						"</div>" +
						"</div></div>";

						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateBanner(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "all";
		request.job = "list banner";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(7));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateBanner"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>banner list is empty</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = "<img src='files/"+d.data[i].Image+"' style='width: 150px;'/>";

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Text;

						let td3 = document.createElement("td");
						td3.innerHTML = d.data[i].Subtext;

						let td4 = document.createElement("td");
						td4.innerHTML = d.data[i].Sort;

						let td5 = document.createElement("td");
						let status = d.data[i].Status ? "checked" : "";
						td5.innerHTML = "<div class='switch'><label>" +
							"<input type='checkbox' "+status+" onchange=\"SetBanner_Status(this, '"+d.data[i].Id+"')\"/>" +
							"<span class='lever'></span></label></div>";


						let td6 = document.createElement("td");
						td6.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='#new-banner/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit banner</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmBannerDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

    function populateUser(page)
    {
        let request = {};
        request.Page = 1;
        request.Perpage = 25;
        request.Filter = "search list";
        request.Filtervalue = $("#search-txt").val();
        request.job = "get admin users";


        if(Number(page) > 0)
        {
            request.Page = Number(page);
        }
        if($("#perpage").dropdown('get value') != "")
        {
            request.Perpage = $("#perpage").dropdown('get value');
        }
        $("#table-body").html(tableLoader(6));

        postJson("hms-admin/worker", function(data, status){
            $("#table-body").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    let sn = ((d.Page - 1) * d.Perpage) + 1;
                    $("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateUser"));

                    if(d.data.length === 0)
                    {
                        $("#table-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
                            "<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/user.png' style='width: 60px;'/>" +
                            "<h6 class='sleak-b' style='color: dimgray;'>Admin Users list is empty</h6>" +
                            "</div></td></tr>");
                    }

                    for(var i = 0; i < d.data.length; i++)
                    {
                        let row = document.createElement("tr");
                        row.id = d.data[i].Id + "-row";

                        let td0 = document.createElement("td");
                        td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

                        let td1 = document.createElement("td");
                        td1.innerHTML = d.data[i].Name +" "+d.data[i].Surname;

                        let td2 = document.createElement("td");
                        td2.innerHTML = d.data[i].Username;

                        let td3 = document.createElement("td");
                        td3.innerHTML = "<span class='status green-back'>"+d.data[i].Role.Name+"</span>";

                        let td4 = document.createElement("td");
                        let chkd = d.data[i].Status ? "checked" : "";
                        td4.innerHTML = "<div class='switch'><label><input type='checkbox' "+chkd+" onchange=\"SetUserStatus(this,'"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";

                        let td5 = document.createElement("td");
                        td5.innerHTML = "<div class='w3-container'> " +
                            "<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
                            "<i class='blue wrench icon'></i>" +
                            "<div class='menu'>" +
                            "<div class='header'>Action</div>" +
                            "<a href='#admin-user-log/"+d.data[i].Id+"' class='item'><i class='cog icon'></i>View Activities</a>" +
                            "<a href='#new-admin-user/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit</a>" +
                            "<div class='ui divider'></div>" +
                            "<div class='item' onclick=\"ConfirmUserDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
                            "</div>" +
                            "</div></div>";


                        row.appendChild(td0);
                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);
                        sn++;

                        document.getElementById("table-body").appendChild(row);
                    }

                    $(".c-menu").dropdown();
                }
                else if(d.status === "access denied")
                {
                    //Re-login marker goes here
                    //
                }
                else
                {
                    //Unable to save marker goes here
                    //
                }
            }
            else
            {
                //Network error marker goes here
                //
            }
        }, request);
    }

	function populateFaqcategory(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "";
		request.job = "get faq category";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#faq-cat-perpage").dropdown('get value') !== "")
		{
			request.Perpage = $("#faq-cat-perpage").dropdown('get value');
		}

		$("#faq-cat-body").html(tableLoader(5));

		postJson("hms-admin/worker", function(data, status){

			$("#faq-cat-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#faq-cat-pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFaqcategory"));

					if(d.data.length === 0)
					{
						$("#faq-cat-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/question.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>Empty FAQ category list returned</h6>" +
						"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = sn;

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Name;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Sort;

						let td3 = document.createElement("td");
						let ch = d.data[i].Status ? "checked" : "";
						td3.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetFaqcategory_Status(this, '"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";

						let td4 = document.createElement("td");
						td4.innerHTML = "<span><i class='green pencil icon' style='cursor: pointer;' onclick=\"editFaqcategory('"+escape(JSON.stringify(d.data[i]))+"')\"></i></span>" +
						"&nbsp;&nbsp;&nbsp;<span><i id='faqcat-del-btn-"+d.data[i].Id+"' class='red trash icon' style='cursor: pointer;' onclick=\"ConfirmFaqcategoryDelete('" + d.data[i].Id + "')\"></i></span>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);

						sn++;

						document.getElementById("faq-cat-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateFaq(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get faq";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(6));

		postJson("hms-admin/worker", function(data, status){

			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFaq"));

					if(d.data.length === 0)
					{
						$("#table-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/question.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>Empty FAQ list returned</h6>" +
						"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Question;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Category.Name;

						let td3 = document.createElement("td");
                        td3.innerHTML = d.data[i].Sort;

						let td4 = document.createElement("td");
                        let ch = d.data[i].Status ? "checked" : "";
                        td4.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetFaq_Status(this, '"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";

						let td5 = document.createElement("td");
						td5.innerHTML = "<div class='w3-container'> " +
						"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
						"<i class='blue wrench icon'></i>" +
						"<div class='menu'>" +
						"<div class='header'>Action</div>" +
						"<div class='item' onclick=\"viewFaqAnswer('" + escape(JSON.stringify(d.data[i])) + "')\"><i class='question circle icon'></i>View Answer</div>" +
						"<a class='item' href='#new-faq/"+ d.data[i].Id + "'><i class='pencil icon'></i>Edit FAQ</a>" +
						"<div class='ui divider'></div>" +
						"<div class='item' onclick=\"ConfirmFaqDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
						"</div>" +
						"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateGalleryContent(func)
	{
		$("#gallery-content").html("");

		getElement("gallery-content").appendChild(div({
			add:imageTextPlaceholder()+
				imageTextPlaceholder()+
				imageTextPlaceholder()+
				imageTextPlaceholder()
			}));


		postJson("hms-admin/worker", function(data, status){
			$("#gallery-content").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
                    {
                        let ch = d.data[i].Status ? "checked" : "";

                        getElement("gallery-content").appendChild(div({
                            add:"<div id='gallery-item-"+i+"' class='w3-col l3 m6 s12 pad-1 galeries'>" +

                                "<div class='lift-1'>" +

                                "<input id='gallery-id-"+i+"' type='hidden' value='"+d.data[i].Id+"'/>" +
                                "<input id='gallery-image-name-"+i+"' type='hidden' value='"+d.data[i].Image+"'/>" +

                                "<div style='height: 200px; background-color: whitesmoke; position: relative;'>" +
                                "<img id='gallery-image-"+i+"' src='files/"+d.data[i].Image+"' style='width: 100%;'/>" +
                                "<div id='gallery-sort-con-"+i+"' class='ui mini labeled input' " +
                                "style='background-color: transparent; position: absolute; left: 0px; top: 0px;'> " +
                                "<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
                                "<input id='gallery-sort-"+i+"' type='number' value='"+d.data[i].Sort+"' " +
                                "style='width: 60px; border-radius: 0px;'  onchange=\"saveGallery('"+i+"')\"/>" +
                                "</div>" +
                                "<button id='gallery-btn-"+i+"' class='ui circular icon green-back button' "+
                                "style='position: absolute; top: 0px; right: 0px;' onclick=\"getElement('gallery-file-"+i+"').click()\">" +
                                "<i class='image icon'></i></button>" +
                                "<button id='gallery-delete-btn-"+i+"' class='ui circular icon red button' "+
                                "style='position: absolute; top: 0px; right: 30px;' onclick=\"confirmGalleryItemDelete('"+i+"')\">" +
                                "<i class='trash icon'></i></button>" +
                                "<input id='gallery-file-"+i+"' type='file' onchange=\"processGalleryImage(this, '"+i+"')\" style='display: none;'/>" +
                                "</div>" +
                                "<div class='pad-1'>" +
                                "<div class='ui fluid input'>" +
                                "<input id='gallery-heading-"+i+"' class='wix-textbox' type='textbox' placeholder='Heading' style='margin-top: 5px; border-radius: 0px;'" +
                                " onchange=\"saveGallery('"+i+"')\" value='"+d.data[i].Heading+"' onkeyup='checkGalleryPlaceholders()'/>" +
                                "</div>" +
                                "<div class='ui form' style='margin-top: 5px;'>" +
                                "<div class='field'>" +
                                "<textarea id='gallery-description-"+i+"' class='wix-textbox' rows='1' placeholder='short description'" +
                                " onchange=\"saveGallery('"+i+"')\" onkeyup='checkGalleryPlaceholders()' style='border-radius: 0px;'>"+d.data[i].Description+"</textarea>" +
                                "</div>" +
                                "</div>" +
                                "<div class='switch' style='float: right; margin-top: 5px;'>" +
                                "<label>" +
                                "<input type='checkbox' id='gallery-status-"+i+"' "+ch+" onchange=\"saveGallery('"+i+"')\"/><span class='lever'></span></label></div>" +
                                "<h6 id='gallery-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
                                "</div>" +

                                "</div>" +

                                "</div>"
                        }));
                    }
				}
				else
				{

				}
				if(typeof func == "function")
				{
					func();
				}
			}
			else
			{

			}
		},{job:"get gallery"});
	}

	function populateServicesContent(func)
	{
		$("#service-content").html("");

		getElement("service-content").appendChild(div({
			add:servicePlaceholder()+
				servicePlaceholder() +
				servicePlaceholder() +
				servicePlaceholder()
		}));


		postJson("hms-admin/worker", function(data, status){
			$("#service-content").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
					{
						let ch = d.data[i].Status ? "checked" : "";

						let icon = "";
						let iconDisplay = "display: none;";
						let imageDisplay = "";

						if(d.data[i].Icontype === "icon")
						{
							icon = "<i class='"+d.data[i].Icon+" icon'></i>";
							iconDisplay = "";
							imageDisplay = "display: none;";
						}

						getElement("service-content").appendChild(div({
							add:"<div id='service-item-"+i+"' class='w3-col l6 m6 s12 pad-1 services'>" +

								"<div class='w3-row lift-1'>" +

								"<input id='service-id-"+i+"' type='hidden' value='"+d.data[i].Id+"'/>" +
								"<input id='service-image-name-"+i+"' type='hidden' value='"+d.data[i].Icon+"'/>" +
								"<input id='service-icontype-"+i+"' type='hidden' value='"+d.data[i].Icontype+"'/>" +

								"<div class='w3-col l4 m4 s12' style='min-height: 200px; background-color: whitesmoke; position: relative;'>" +
								"<img id='service-image-"+i+"' src='files/"+d.data[i].Icon+"' style='width: 100%; margin-top: 15px; "+imageDisplay+"'/>" +
								"<h1 id='icon-con-"+i+"' class='ui center aligned icon header' style='color: dimgray; margin-top: 60px; "+iconDisplay+"'>" +
								icon + "</h1>" +
								"<button id='service-btn-"+i+"' class='ui circular icon green-back button' "+
								"style='position: absolute; top: 0px; left: 0px;' onclick=\"imageIconChoice('"+i+"')\">" +
								"<i class='plus icon'></i></button>" +
								"<button id='service-delete-btn-"+i+"' class='ui circular icon red button' "+
								"style='position: absolute; top: 0px; left: 30px;' onclick=\"confirmServiceItemDelete('"+i+"')\">" +
								"<i class='trash icon'></i></button>" +
								"<input id='service-file-"+i+"' type='file' onchange=\"processServiceImage(this, '"+i+"')\" style='display: none;'/>" +
								"</div>" +
								"<div class='w3-col l8 m8 s12 pad-1'>" +
								"<div class='ui fluid input'>" +
								"<input id='service-heading-"+i+"' class='wix-textbox' type='textbox' placeholder='Heading' style='margin-top: 5px; border-radius: 0px;'" +
								" onchange=\"saveServices('"+i+"'); activateService('"+i+"')\" value='"+d.data[i].Heading+"' onkeyup='checkServicePlaceholders()'/>" +
								"</div>" +
								"<div class='ui form' style='margin-top: 5px;'>" +
								"<div class='field'>" +
								"<textarea id='service-description-"+i+"' class='wix-textbox' rows='1' placeholder='short description'" +
								" onchange=\"saveServices('"+i+"'); activateService('"+i+"')\" onkeyup='checkServicePlaceholders()' style='border-radius: 0px;'>"+d.data[i].Body+"</textarea>" +
								"</div>" +
								"</div>" +
								"<div id='service-sort-con-"+i+"' class='ui mini labeled input' style=' margin-top: 5px;'> " +
								"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
								"<input id='service-sort-"+i+"' type='number' value='"+d.data[i].Sort+"' " +
								"style='width: 60px; border-radius: 0px;'  onchange=\"saveServices('"+i+"'); activateService('"+i+"')\"/>" +
								"</div>" +
								"<div class='switch' style='float: right; margin-top: 5px;'>" +
								"<label>" +
								"<input type='checkbox' id='service-status-"+i+"' "+ch+" onchange=\"saveServices('"+i+"'); activateService('"+i+"')\"/><span class='lever'></span></label></div>" +
								"<h6 id='service-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
								"</div>" +

								"</div>" +

								"</div>"
						}));
					}
				}
				else
				{

				}
				if(typeof func == "function")
				{
					func();
				}
			}
			else
			{

			}
		},{job:"get services"});
	}

	function populateTeamContent(func)
	{
		$("#team-content").html("");

		getElement("team-content").appendChild(div({
			add:imageTextPlaceholder()+
				imageTextPlaceholder()+
				imageTextPlaceholder()+
				imageTextPlaceholder()
		}));


		postJson("hms-admin/worker", function(data, status){
			$("#team-content").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
					{
						let ch = d.data[i].Status ? "checked" : "";

						getElement("team-content").appendChild(div({
							add:"<div id='team-item-"+i+"' class='w3-col l3 m6 s12 pad-1 teams'>" +

								"<div class='lift-1'>" +

								"<input id='team-id-"+i+"' type='hidden' value='"+d.data[i].Id+"'/>" +
								"<input id='team-image-name-"+i+"' type='hidden' value='"+d.data[i].Image+"'/>" +

								"<div style='height: 200px; background-color: whitesmoke; position: relative;'>" +
								"<img id='team-image-"+i+"' src='files/"+d.data[i].Image+"' style='width: 100%;'/>" +
								"<div id='team-sort-con-"+i+"' class='ui mini labeled input' " +
								"style='background-color: transparent; position: absolute; left: 0px; top: 0px;'> " +
								"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
								"<input id='team-sort-"+i+"' type='number' value='"+d.data[i].Sort+"' " +
								"style='width: 60px; border-radius: 0px;'  onchange=\"saveTeam('"+i+"')\"/>" +
								"</div>" +
								"<button id='team-btn-"+i+"' class='ui circular icon green-back button' "+
								"style='position: absolute; top: 0px; right: 0px;' onclick=\"getElement('team-file-"+i+"').click()\">" +
								"<i class='image icon'></i></button>" +
								"<button id='team-delete-btn-"+i+"' class='ui circular icon red button' "+
								"style='position: absolute; top: 0px; right: 30px;' onclick=\"confirmTeamItemDelete('"+i+"')\">" +
								"<i class='trash icon'></i></button>" +
								"<input id='team-file-"+i+"' type='file' onchange=\"processTeamImage(this, '"+i+"')\" style='display: none;'/>" +
								"</div>" +
								"<div class='pad-1'>" +
								"<div class='ui fluid input'>" +
								"<input id='team-name-"+i+"' class='wix-textbox' type='textbox' placeholder='Name' style='margin-top: 5px; border-radius: 0px;'" +
								" onchange=\"saveTeam('"+i+"')\" value='"+d.data[i].Name+"' onkeyup='checkTeamPlaceholders()'/>" +
								"</div>" +
								"<div class='ui form' style='margin-top: 5px;'>" +
								"<div class='field'>" +
								"<textarea id='team-description-"+i+"' class='wix-textbox' rows='1' placeholder='short description'" +
								" onchange=\"saveTeam('"+i+"')\" onkeyup='checkTeamPlaceholders()' style='border-radius: 0px;'>"+d.data[i].Description+"</textarea>" +
								"</div>" +
								"</div>" +
								"<div class='switch' style='float: right; margin-top: 5px;'>" +
								"<label>" +
								"<input type='checkbox' id='team-status-"+i+"' "+ch+" onchange=\"saveTeam('"+i+"')\"/><span class='lever'></span></label></div>" +
								"<h6 id='team-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
								"</div>" +

								"</div>" +

								"</div>"
						}));
					}
				}
				else
				{

				}
				if(typeof func == "function")
				{
					func();
				}
			}
			else
			{

			}
		},{job:"get team"});
	}

	function populateTestimonialContent(func)
	{
		$("#testimonial-content").html("");

		getElement("testimonial-content").appendChild(div({
			add:testimonialPlaceholder()+
				testimonialPlaceholder()
		}));


		postJson("hms-admin/worker", function(data, status){
			$("#testimonial-content").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				let i = 0;

				if(d.status === "success")
				{
					for(; i < d.data.length; i++)
					{
						let ch = d.data[i].Status ? "checked" : "";

						getElement("testimonial-content").appendChild(div({
							add:"<div id='testimonial-item-"+i+"' class='w3-row pad-1 testimonial' style=''>" +

								"<div class='lift-1'>" +

								"<input id='testimonial-id-"+i+"' type='hidden' value='"+d.data[i].Id+"'/>" +
								"<input id='testimonial-image-name-"+i+"' type='hidden' value='"+d.data[i].Image+"'/>" +


								"<div class='w3-col l2 m2 s12 pad-2'>" +
								"<div class='switch' style='float: right; margin-top: 5px;'>" +
								"<label>" +
								"<input type='checkbox' id='testimonial-status-"+i+"' "+ch+" onchange=\"saveTestimonial('"+i+"')\"/><span class='lever'></span></label>" +
								"</div>" +
								"<h6 id='testimonial-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
								"<br/>" +
								"<div id='testimonial-sort-con-"+i+"' class='ui mini fluid labeled input' " +
								"style=''> " +
								"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
								"<input id='testimonial-sort-"+i+"' type='number' value='"+d.data[i].Sort+"' " +
								"style='width: 60px; border-radius: 0px;'  onchange=\"saveTestimonial('"+i+"')\"/>" +
								"</div><br/>" +

								"<div id='testimonial-rating-"+i+"' class='ui star big rating' data-rating='"+d.data[i].Rating+"'" +
								" onclick=\"ratingSaveTestimonial('"+i+"')\"></div> "+

								"<br/>" +
								"<button id='testimonial-delete-btn-"+d.data[i].Id+"' class='ui circular icon red button' "+
								"style='left: 30px;' onclick=\"confirmTestimonialItemDelete('"+i+"')\">" +
								"<i class='trash icon'></i></button>" +

								"</div> " +


								"<div class='w3-col l3 m3 s12 pad-2'>" +
								"<div class='l-width-l m-width-xl' style='height: 200px; background-color: whitesmoke; position: relative; border-radius: 0px;'>" +
								"<img id='testimonial-image-"+i+"' src='files/"+d.data[i].Image+"' style='width: 100%;'/>" +
								"<button id='testimonial-btn-"+i+"' class='ui circular icon green-back button' "+
								"style='position: absolute; top: 0px; left: 0px;' onclick=\"getElement('testimonial-file-"+i+"').click()\">" +
								"<i class='image icon'></i></button>" +
								"<input id='testimonial-file-"+i+"' type='file' onchange=\"processTestimonialImage(this, '"+i+"')\" style='display: none;'/>" +
								"</div>" +
								"</div>" +


								"<div class='w3-col l7 m7 s12 pad-2'>" +
								"<div class=''>" +
								"<div class='ui fluid input'>" +
								"<input id='testimonial-name-"+i+"' class='wix-textbox' type='textbox' placeholder='Name' style='margin-top: 5px; border-radius: 0px;'" +
								" onchange=\"saveTestimonial('"+i+"')\" value='"+d.data[i].Name+"' onkeyup='checkTestimonialPlaceholders()'/>" +
								"</div>" +
								"<div class='ui form' style='margin-top: 5px;'>" +
								"<div class='field'>" +
								"<textarea id='testimonial-description-"+i+"' class='wix-textbox' rows='3' placeholder='Testimony'" +
								" onchange=\"saveTestimonial('"+i+"')\" onkeyup='checkTestimonialPlaceholders()' style='border-radius: 0px;'>"+d.data[i].Body+"</textarea>" +
								"</div>" +
								"</div>" +

								"</div>" +
								"</div>" +

								"</div>" +

								"</div>"
						}));

						$("#testimonial-rating-"+i).rating({maxRating: 5});
					}
				}
				else
				{

				}
				if(typeof func == "function")
				{
					func(i);
				}
			}
			else
			{

			}
		},{job:"get testimonial"});
	}
 
	function populateFacilitiesContent(func)
	{
		$("#facilities-content").html("");

		getElement("facility-content").appendChild(div({
			add:facilityPlaceholder()+
				facilityPlaceholder() +
				facilityPlaceholder() +
				facilityPlaceholder()
		}));


		postJson("hms-admin/worker", function(data, status){
			$("#facility-content").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
					{
						let ch = d.data[i].Status ? "checked" : "";

						let icon = "";
						let iconDisplay = "display: none;";

						let imageDisplay = "";

						if(d.data[i].Icontype === "icon")
						{
							icon = "<i class='"+d.data[i].Icon+" icon'></i>";
							iconDisplay = "";
							imageDisplay = "display: none;";
						}

						getElement("facility-content").appendChild(div({
							add:"<div id='facility-item-"+i+"' class='w3-col l6 m6 s12 pad-1 facility'>" +

								"<div class='w3-row lift-1'>" +

								"<input id='facility-id-"+i+"' type='hidden' value='"+d.data[i].Id+"'/>" +
								"<input id='facility-image-name-"+i+"' type='hidden' value='"+d.data[i].Icon+"'/>" +
								"<input id='facility-icontype-"+i+"' type='hidden' value='"+d.data[i].Icontype+"'/>" +

								"<div class='w3-col l4 m4 s12' style='min-height: 200px; background-color: whitesmoke; position: relative;'>" +
								"<img id='facility-image-"+i+"' src='files/"+d.data[i].Icon+"' style='width: 100%; margin-top: 15px; "+imageDisplay+"'/>" +
								"<h1 id='icon-con-"+i+"' class='ui center aligned icon header' style='color: dimgray; margin-top: 60px; "+iconDisplay+"'>" +
								icon + "</h1>" +
								"<button id='facility-btn-"+i+"' class='ui circular icon green-back button' "+
								"style='position: absolute; top: 0px; left: 0px;' onclick=\"facilityImageIconChoice('"+i+"')\">" +
								"<i class='plus icon'></i></button>" +
								"<button id='facility-delete-btn-"+i+"' class='ui circular icon red button' "+
								"style='position: absolute; top: 0px; left: 30px;' onclick=\"confirmFacilityItemDelete('"+i+"')\">" +
								"<i class='trash icon'></i></button>" +
								"<input id='facility-file-"+i+"' type='file' onchange=\"processFacilityImage(this, '"+i+"')\" style='display: none;'/>" +
								"</div>" +
								"<div class='w3-col l8 m8 s12 pad-1'>" +
								"<div class='ui fluid input'>" +
								"<input id='facility-heading-"+i+"' class='wix-textbox' type='textbox' placeholder='Heading' style='margin-top: 5px; border-radius: 0px;'" +
								" onchange=\"saveFacility('"+i+"'); activateFacility('"+i+"')\" value='"+d.data[i].Heading+"' onkeyup='checkFacilityPlaceholders()'/>" +
								"</div>" +
								"<div class='ui form' style='margin-top: 5px;'>" +
								"<div class='field'>" +
								"<textarea id='facility-description-"+i+"' class='wix-textbox' rows='1' placeholder='short description'" +
								" onchange=\"saveFacility('"+i+"'); activateFacility('"+i+"')\" onkeyup='checkFacilityPlaceholders()' style='border-radius: 0px;'>"+d.data[i].Body+"</textarea>" +
								"</div>" +
								"</div>" +
								"<div id='facility-sort-con-"+i+"' class='ui mini labeled input' style=' margin-top: 5px;'> " +
								"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
								"<input id='facility-sort-"+i+"' type='number' value='"+d.data[i].Sort+"' " +
								"style='width: 60px; border-radius: 0px;'  onchange=\"saveFacility('"+i+"'); activateFacility('"+i+"')\"/>" +
								"</div>" +
								"<div class='switch' style='float: right; margin-top: 5px;'>" +
								"<label>" +
								"<input type='checkbox' id='facility-status-"+i+"' "+ch+" onchange=\"saveFacility('"+i+"'); activateFacility('"+i+"')\"/><span class='lever'></span></label></div>" +
								"<h6 id='facility-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
								"</div>" +

								"</div>" +

								"</div>"
						}));
					}
				}
				else
				{

				}
				if(typeof func == "function")
				{
					func();
				}
			}
			else
			{

			}
		},{job:"get facility"});
	}

	function populateRoomcategory(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "";
		request.property = $("#property-id").val();
		request.job = "get room category";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(9));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateRoomcategory"));

					if(d.data.length === 0)
					{
						$("#table-body").html("<tr><td colspan='9'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.CDN_URL+"/images/bed.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>Empty Room Category list returned</h6>" +
						"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = "<img src='"+phpvars.FILES_CDN+"/"+d.data[i].Images[0]+"' style='width: 80px; border-radius: 4px;'/>";

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Name;

						let td3 = document.createElement("td");
						td3.innerHTML += "<br/><span><span style='color: lightgray;'>Price: </span>" +
							$("#currency-symbol").val() + numFormat(Number(d.data[i].Price).toFixed(2))+"</span>" +
							((Number(d.data[i].Price) !== Number(d.data[i].Baseprice)) ? "<br/><span><span style='color: lightgray;'>Base price: </span>" +
							$("#currency-symbol").val() + numFormat(Number(d.data[i].Baseprice).toFixed(2))+"</span>":"");

						if(d.data[i].Compareat > 0)
						{
							td3.innerHTML += "<br/><span><span style='color: lightgray;'>Compare at: </span><strike>" +
							$("#currency-symbol").val() + numFormat(Number(d.data[i].Compareat).toFixed(2))+"</strike></span>";
						}

						let td4 = document.createElement("td");
						td4.innerHTML += "<br/><span><span style='color: lightgray;'>Rooms: </span>" +
							d.data[i].Rooms+"</span>";
							td4.innerHTML += "<br/><span><span style='color: lightgray;'>Occupied: </span>" +
							d.data[i].Occupied+"</span>";

						let td5 = document.createElement("td");
						let ch = d.data[i].Onsite ? "checked" : "";
						let rv = d.data[i].Reservable ? "checked" : "";
						td5.innerHTML = "<label><input class='filled-in' type='checkbox' "+ch+" onchange=\"SetRoomcategory_Onsite(this,'"+d.data[i].Id+"')\"/><span>Visiblility</span></label>";
						td5.innerHTML += "<br/><label><input class='filled-in' type='checkbox' "+rv+" onchange=\"SetRoomcategory_Reservable(this, '"+d.data[i].Id+"')\"/><span>Can reserve</span></label>";

						let td6 = document.createElement("td");
						td6.innerHTML = d.data[i].Sort;

						let td7 = document.createElement("td");
						ch = d.data[i].Status ? "checked" : "";
						td7.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetRoomcategory_Status(this,'"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";

						let td8 = document.createElement("td");
						td8.innerHTML = "<div class='w3-container'> " +
						"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
						"<i class='blue wrench icon'></i>" +
						"<div class='menu'>" +
						"<div class='header'>Action</div>" +
						"<a class='item' href='#room-availability/" + d.data[i].Id + "'><i class='calendar alternate outline icon'></i>Manage availability</a>" +
						"<a class='item' href='#room-rate/" + d.data[i].Id + "'><i class='percent icon'></i>Manage rate</a>" +
						"<div class='ui divider'></div>" +
						"<a class='item' href='#new-room-category/" + d.data[i].Id + "'><i class='pencil icon'></i>Edit Category</a>" +
						"<div class='ui divider'></div>" +
						"<div class='item' onclick=\"ConfirmRoomcategoryDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
						"</div>" +
						"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);
						row.appendChild(td8);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateRoom(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "";
		request.job = "get rooms";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(6));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateRoom"));

					if(d.data.length == 0)
					{
						$("#table-body").html("<tr><td colspan='9'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/bed.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>Empty Room list returned</h6>" +
						"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Room.Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Room.Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = "<span><span style='color: lightgray;'>Room: </span>"+d.data[i].Room.Number+"</span>";

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Room.Category.Name;

						let td3 = document.createElement("td");
						//let occp = d.data[i].Occupied ? "<label class='status green-back'>Occupied</label>" : "<label class='status blue-back'>Free</label>";
						let occp = d.data[i].Room.Features.join(', ');
						td3.innerHTML = occp;

						let td4 = document.createElement("td");
						let ch = d.data[i].Room.Status ? "checked" : "";
						td4.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetRoom_Status(this, '"+d.data[i].Room.Id+"')\"/><span class='lever'></span></label></div>";

						let td5 = document.createElement("td");
						td5.innerHTML = "<div class='w3-container'> " +
						"<div id='"+ d.data[i].Room.Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
						"<i class='blue wrench icon'></i>" +
						"<div class='menu'>" +
						"<div class='header'>Action</div>" +
						"<a class='item' href='#new-room/" + d.data[i].Room.Id + "'><i class='pencil icon'></i>Edit</a>" +
						"<div class='ui divider'></div>" +
						"<div class='item' onclick=\"ConfirmRoomDelete('" + d.data[i].Room.Id + "')\"><i class='trash icon'></i>Delete</div>" +
						"</div>" +
						"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateSettings()
	{
		$("#page").addClass("ui loading form");
		postJson("hms-admin/worker", function (data, status) {
			$("#page").removeClass("ui loading form");
			if(status === "done") {

				let d = JSON.parse(data);

				if (d.status === "success")
				{
					$("#hotel-name").val(d.data.Name);
					$("#hotel-phone1").val(d.data.Phone1);
					$("#hotel-phone2").val(d.data.Phone2);
					$("#hotel-email1").val(d.data.Email1);
					$("#hotel-email2").val(d.data.Email2);
					$("#hotel-adddress").val(d.data.Address);
					$("#hotel-country").dropdown("set selected", d.data.Country);
					$("#hotel-state").val(d.data.State);
					$("#hotel-city").val(d.data.City);

					getElement("logo-img").src = Router.resolvePath("files/" + d.data.Logo);

					$("#primary-color").val(d.data.Site.PrimaryColor);
					$("#primary-color").css("background-color", d.data.Site.PrimaryColor);
					$("#primary-color").css("color", "white");

					$("#secondary-color").val(d.data.Site.SecondaryColor);
					$("#secondary-color").css("background-color", d.data.Site.SecondaryColor);
					$("#secondary-color").css("color", "white");


					$("#primary-font").dropdown("set selected", d.data.Site.TextFont);
					$("#secondary-font").dropdown("set selected", d.data.Site.SecondaryFont);
					$("#bold-font").dropdown("set selected", d.data.Site.BoldFont);
					$("#sleak-font").dropdown("set selected", d.data.Site.LightFont);

					getElement("customersaddress").checked = d.data.Site.Customersaddress;
					getElement("customersselfngt").checked = d.data.Site.Customerselfdatamgt;
					getElement("showtextname").checked = d.data.Site.ShowName;
					getElement("showlogo").checked = d.data.Site.ShowLogo;


					if(d.data.Site.Guestformtype === "DETAILED")
					{
						getElement("detailed-check").checked = true;
					}
					else if(d.data.Site.Guestformtype === "INTERMEDIARY")
					{
						getElement("intermediary-check").checked = true;
					}
					else
					{
						getElement("simple-check").checked = true;
					}


					loadingSettings = false;
				}
				else
				{
					_page({ add: pageTop({ icon: "cog", text: "General Settings" }), clear: true });
					_page({add:"<div class='pad-3 widget lift-1'>" +
							"<div class='align-c'>" +
							"<h6 class='sleak'>" +
							"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
							d.message +
							"</h6> " +
							"<button class='ui sleak blue button' onclick='DrawGeneralSetting()'>Try again</button>" +
							"</div>" +
							"</div>", class:"l-pad-3 s-pad-1"});
				}
			}
			else
			{
				_page({ add: pageTop({ icon: "cog", text: "General Settings" }), clear: true });
				_page({add:"<div class='pad-3 widget lift-1'>" +
						"<div class='align-c'>" +
						"<h6 class='sleak'>" +
						"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
						"Connection error. Check your connection and try again" +
						"</h6> " +
						"<button class='ui sleak blue button' onclick='DrawGeneralSetting()'>Try again</button>" +
						"</div>" +
						"</div>", class:"l-pad-3 s-pad-1"});
			}
		}, {job:"get general settings"});
	}

	let loadingIntegration = false;
	function populateIntegration()
	{
		$("#page").addClass("ui loading form");
		postJson("hms-admin/worker", function (data, status) {
			$("#page").removeClass("ui loading form");
			if(status === "done") {

				let d = JSON.parse(data);

				if (d.status === "success")
				{
					loadingIntegration = true;

					$("#facebook-integration").val(d.data.Facebook);
					$("#twitter-integration").val(d.data.Twitter);
					$("#google-integration").val(d.data.Google);
					$("#linkedin-integration").val(d.data.Linkedin);
					$("#whatsapp-integration").val(d.data.Whatsapp);
					$("#telegram-integration").val(d.data.Telegram);
					$("#instagram-integration").val(d.data.Instagram);


					$("#live-chat-integration").val(d.data.Livechat);
					$("#google-analytics-integration").val(d.data.Analytics);
					$("#google-tag-integration").val(d.data.Googletag);
					$("#translator-integration").val(d.data.Translator);

					$("#longitude-integration").val(d.data.Longitude);
					$("#latitude-integration").val(d.data.Latitude);
					$("#apikey-integration").val(d.data.Apikey);

					loadingIntegration = false;
				}
				else
				{
					_page({ add: pageTop({ icon: "code", text: "Integrations" }), clear: true });
					_page({add:"<div class='pad-3 widget lift-1'>" +
							"<div class='align-c'>" +
							"<h6 class='sleak'>" +
							"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
							d.message +
							"</h6> " +
							"<button class='ui sleak blue button' onclick='populateIntegration()'>Try again</button>" +
							"</div>" +
							"</div>", class:"l-pad-3 s-pad-1"});
				}
			}
			else
			{
				_page({ add: pageTop({ icon: "code", text: "Integrations" }), clear: true });
				_page({add:"<div class='pad-3 widget lift-1'>" +
						"<div class='align-c'>" +
						"<h6 class='sleak'>" +
						"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
						"Connection error. Check your connection and try again" +
						"</h6> " +
						"<button class='ui sleak blue button' onclick='populateIntegration()'>Try again</button>" +
						"</div>" +
						"</div>", class:"l-pad-3 s-pad-1"});
			}
		}, {job:"get integration data"});
	}

	let populatingCurrency = false;
	function populateCurrency()
	{
		$("#page").addClass("ui loading form");
		postJson("hms-admin/worker", function (data, status) {
			$("#page").removeClass("ui loading form");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					populatingCurrency = true;

					$("#currency-name-con").html(d.data.Name);
					$("#currency-code-con").html(d.data.Code);
					$("#symbol-con").html(d.data.Symbol);
					$("#country-con").html(d.data.Country);

					$("#current-currency").dropdown("set selected", d.data.Code);


					$("#paypal-id").val(d.Gateway.Paypalid);
					$("#paypal-username").val(d.Gateway.Paypalusername);
					$("#paypal-password").val(d.Gateway.Paypalpassword);
					$("#paystack-private-key").val(d.Gateway.Paystackprivate);
					$("#paystack-public-key").val(d.Gateway.Paystackpublic);
					$("#marchant-id").val(d.Gateway.Interswitchmarchantid);

					getElement("webpay-status").checked = d.Webpay;
					getElement("no-pay-reservation").checked = d.Nopayreservation;


					populatingCurrency = false;
				}
				else
				{
					_page({ add: pageTop({ icon: "money", text: "Currency & Payment Method" }), clear: true });
					_page({add:"<div class='pad-3 widget lift-1'>" +
							"<div class='align-c'>" +
							"<h6 class='sleak'>" +
							"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
							d.message +
							"</h6> " +
							"<button class='ui sleak blue button' onclick='populateCurrency()'>Try again</button>" +
							"</div>" +
							"</div>", class:"l-pad-3 s-pad-1"});
				}
			}
			else
			{
				_page({ add: pageTop({ icon: "money", text: "Currency & Payment Method" }), clear: true });
				_page({add:"<div class='pad-3 widget lift-1'>" +
						"<div class='align-c'>" +
						"<h6 class='sleak'>" +
						"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
						"Connection error. Check your connection and try again" +
						"</h6> " +
						"<button class='ui sleak blue button' onclick='populateCurrency()'>Try again</button>" +
						"</div>" +
						"</div>", class:"l-pad-3 s-pad-1"});
			}
		},{job:"get currency"});
	}

	function populateCoupon(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.property = $("#property-id").val();
		request.Filtervalue = $("#search-txt").val();
		request.job = "get coupon list";

		request.usestatus = "all";

		if($("#used-coupon-tab").hasClass("active"))
		{
			request.usestatus = "used";
		}
		else if($("#unused-coupon-tab").hasClass("active"))
		{
			request.usestatus = "unused";
		}
		else if($("#expired-coupon-tab").hasClass("active"))
		{
			request.usestatus = "expired";
		}


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') !== "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(7));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					//$("#total_count").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateCoupon"));

					if(d.data.length === 0)
					{
						$("#table-body").html("<tr><td colspan='7'><div class='align-c pad-2'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>Empty coupon list returned</h6>" +
						"</div></td></tr>");
					}

					$("#all-coupon-label").html(d.Allcount);
					$("#used-coupon-label").html(d.Usedcount);
					$("#unused-coupon-label").html(d.Unusedcount);
					$("#expired-coupon-label").html(d.Expiredcount);

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Title;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Code;

						let td3 = document.createElement("td");
						if(d.data[i].Bypercentage)
						{
							td3.innerHTML = numFormat(d.data[i].Value)+"%";
						}
						else
						{
							td3.innerHTML = $("#currency-symbol").val()+numFormat(d.data[i].Value);
						}


						let td4 = document.createElement("td");
						if(d.data[i].Booking.length > 0)
						{
							td4.innerHTML += "<label class='status'>Booking</label>";
						}
						if(d.data[i].Food.length > 0)
						{
							td4.innerHTML += "<label class='status'>Food</label>";
						}
						if(d.data[i].Drinks.length > 0)
						{
							td4.innerHTML += "<label class='status'>Drinks</label>";
						}
						if(d.data[i].Pastries.length > 0)
						{
							td4.innerHTML += "<label class='status'>Pastries</label>";
						}
						if(d.data[i].Laundry.length > 0)
						{
							td4.innerHTML += "<label class='status'>Laundry</label>";
						}
						if(d.data[i].Pool.length > 0)
						{
							td4.innerHTML += "<label class='status'>Pool</label>";
						}
						if(d.data[i].Services.length > 0)
						{
							td4.innerHTML += "<label class='status'>Services</label>";
						}


						let td5 = document.createElement("td");
						if(d.data[i].Used == true)
						{
							td5.innerHTML = "<label class='status yellow-back'>Used</label>";
						}
						else if(d.data[i].Expired == true)
						{
							td5.innerHTML = "<label class='status red-back'>Expired</label>";
						}
						else
						{
							td5.innerHTML = "<label class='status blue-back'>Unused</label>";
						}


						let td6 = document.createElement("td");
						td6.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='#new-coupon/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit coupon</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmCouponDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

    function populateDiscount(page)
    {
        let request = {};
        request.Page = 1;
        request.Perpage = 25;
        request.Filter = "search list";
		request.property = $("#property-id").val();
        request.Filtervalue = $("#search-txt").val();
        request.job = "get discount list";


        if(Number(page) > 0)
        {
            request.Page = Number(page);
        }
        if($("#perpage").dropdown('get value') !== "")
        {
            request.Perpage = $("#perpage").dropdown('get value');
        }

        $("#table-body").html(tableLoader(7));

        postJson("hms-admin/worker", function(data, status){
            $("#table-body").html("");

            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    //on success
                    let sn = ((d.Page - 1) * d.Perpage) + 1;
                    //$("#total_count").html(d.Total);
                    $("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateCoupon"));

                    if(d.data.length === 0)
                    {
                        $("#table-body").html("<tr><td colspan='7'><div class='align-c pad-2'>" +
                            "<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
                            "<h6 class='sleak-b' style='color: dimgray;'>Empty Discount list returned</h6>" +
                            "</div></td></tr>");
                    }


                    for(var i = 0; i < d.data.length; i++)
                    {
                        let row = document.createElement("tr");
                        row.id = d.data[i].Id + "-row";

                        let td0 = document.createElement("td");
                        td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

                        let td1 = document.createElement("td");
                        td1.innerHTML = d.data[i].Name;

                        let td2 = document.createElement("td");
                        if(d.data[i].Bypercentage)
                        {
                            td2.innerHTML = numFormat(d.data[i].Value)+"%";
                        }
                        else
                        {
                            td2.innerHTML = $("#currency-symbol").val()+numFormat(d.data[i].Value);
                        }


                        let td3 = document.createElement("td");
                        if(d.data[i].Booking.length > 0)
                        {
                            td3.innerHTML += "<label class='status'>Booking</label>";
                        }
                        if(d.data[i].Food.length > 0)
                        {
                            td3.innerHTML += "<label class='status'>Food</label>";
                        }
                        if(d.data[i].Drinks.length > 0)
                        {
                            td3.innerHTML += "<label class='status'>Drinks</label>";
                        }
                        if(d.data[i].Pastries.length > 0)
                        {
                            td3.innerHTML += "<label class='status'>Pastries</label>";
                        }
                        if(d.data[i].Laundry.length > 0)
                        {
                            td3.innerHTML += "<label class='status'>Laundry</label>";
                        }
                        if(d.data[i].Pool.length > 0)
                        {
                            td3.innerHTML += "<label class='status'>Pool</label>";
                        }
                        if(d.data[i].Services.length > 0)
                        {
                            td3.innerHTML += "<label class='status'>Services</label>";
                        }



                        let td4 = document.createElement("td");
                        if(d.data[i].Autoapply)
                        {
                            td4.innerHTML = "<label class='status'>" +
                                "<i class='green circle icon' style='font-size: 8px;'></i>" +
                                " Automatically</label>";
                        }
                        else
                        {
                            td4.innerHTML = "<label class='status'>" +
                                "<i class='red circle icon' style='font-size: 8px;'></i>" +
                                " Manually</label>";
                        }


                        let td5 = document.createElement("td");
                        if(d.data[i].Status == true)
                        {
                            td5.innerHTML = "<div class='switch'><label><input type='checkbox' " +
                                "checked onchange=\"SetDiscount_status(this, '"+d.data[i].Id+"')\"/>" +
                                "<span class='lever'></span></label></div>";
                        }
                        else
                        {
                            td5.innerHTML = "<div class='switch'><label><input type='checkbox' " +
                                "onchange=\"SetDiscount_status(this, '"+d.data[i].Id+"')\"/>" +
                                "<span class='lever'></span></label></div>";
                        }


                        let td6 = document.createElement("td");
                        td6.innerHTML = "<div class='w3-container'> " +
                            "<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
                            "<i class='blue wrench icon'></i>" +
                            "<div class='menu'>" +
                            "<div class='header'>Action</div>" +
                            "<a href='#new-discount/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit discount</a>" +
                            "<div class='ui divider'></div>" +
                            "<div class='item' onclick=\"ConfirmDiscountDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
                            "</div>" +
                            "</div></div>";


                        row.appendChild(td0);
                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);
                        row.appendChild(td6);
                        sn++;

                        document.getElementById("table-body").appendChild(row);
                    }

                    $(".c-menu").dropdown();
                }
                else
                {
                    //Unable to save marker goes here
                    //
                }
            }
            else
            {
                //Network error marker goes here
                //
            }
        }, request);
    }

	function populateExtraservice(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.job = "get extra services";

		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(4));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					//$("#total_count").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateExtraservice"));

					if(d.data.length == 0)
					{
						//Empty set returned
						//$("#table-body").html("<tr><td colspan='4'></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Name;

						let td2 = document.createElement("td");
						td2.innerHTML = $("#currency-symbol").val()+numFormat(Number(d.data[i].Price).toFixed(2));

						let td3 = document.createElement("td");
						td3.innerHTML = "<span style='cursor: pointer;'>" +
							"<i class='pencil green icon' onclick=\"editExtraservices('"+d.data[i].Id+"','"+d.data[i].Name+"','"+d.data[i].Price+"')\"></i></span>" +
						"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='cursor: pointer;' " +
							"onclick=\"ConfirmExtraserviceDelete('"+d.data[i].Id+"')\"><i id='"+d.data[i].Id+"-delete-icon' class='trash red icon'></i></span>";

						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateFoodcategory(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "";
		request.job = "get food category";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#food-cat-perpage").dropdown('get value') !== "")
		{
			request.Perpage = $("#food-cat-perpage").dropdown('get value');
		}

		$("#food-cat-body").html(tableLoader(5));

		postJson("hms-admin/worker", function(data, status){

			$("#food-cat-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#food-cat-pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFoodcategory"));

					if(d.data.length === 0)
					{
						$("#food-cat-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/question.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty Food category list returned</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = sn;

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Name;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Sort;

						let td3 = document.createElement("td");
						let ch = d.data[i].Status ? "checked" : "";
						td3.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetFoodcategory_Status(this, '"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";

						let td4 = document.createElement("td");
						td4.innerHTML = "<span><i class='green pencil icon' style='cursor: pointer;' onclick=\"editFoodcategory('"+escape(JSON.stringify(d.data[i]))+"')\"></i></span>" +
							"&nbsp;&nbsp;&nbsp;<span><i id='foodcat-del-btn-"+d.data[i].Id+"' class='red trash icon' style='cursor: pointer;' onclick=\"ConfirmFoodcategoryDelete('" + d.data[i].Id + "')\"></i></span>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);

						sn++;

						document.getElementById("food-cat-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateFood(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get food list";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(8));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFood"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='16'></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = "<img src='files/"+d.data[i].Images[0]+"' style='width: 80px; border-radius: 4px;'/>";

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Name+"<br/><span style='color: silver;'>Category: <span style='color: dimgray;'>"+
                            d.data[i].Category.Name+"</span></span>";

						let td3 = document.createElement("td");
						td3.innerHTML = "<br/><span><span style='color: lightgray;'>Price: </span>" +
                            $("#currency-symbol").val() + numFormat(Number(d.data[i].Price).toFixed(2))+"</span>";

                        if(d.data[i].Compareat > 0)
                        {
                            td3.innerHTML += "<br/><span><span style='color: lightgray;'>Compare at: </span><strike>" +
                                $("#currency-symbol").val() + numFormat(Number(d.data[i].Compareat).toFixed(2))+"</strike></span>";
                        }

                        let td4 = document.createElement("td");
                        let ch = d.data[i].Onsite ? "checked" : "";
                        let rv = d.data[i].Reservable ? "checked" : "";
                        td4.innerHTML = "<label><input class='filled-in' type='checkbox' "+ch+" onchange=\"SetFood_Visibility(this,'"+d.data[i].Id+"')\"/><span>Visiblility</span></label>";
                        td4.innerHTML += "<br/><label><input class='filled-in' type='checkbox' "+rv+" onchange=\"SetFood_Reservable(this, '"+d.data[i].Id+"')\"/><span>Can reserve</span></label>";


                        let td5 = document.createElement("td");
						td5.innerHTML = d.data[i].Sort;

                        let td6 = document.createElement("td");
                        ch = d.data[i].Status ? "checked" : "";
                        td6.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetFood_Status(this,'"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";


                        let td7 = document.createElement("td");
						td7.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='#food-report/"+d.data[i].Id+"' class='item'><i class='pie chart icon'></i>Sales report</a>" +
							"<a href='#add-food/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit Food</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmFoodDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);

						//optional fields
						/*
						row.appendChild(td14);
						*/

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateDrinkcategory(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "";
		request.job = "get drink category";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#drink-cat-perpage").dropdown('get value') !== "")
		{
			request.Perpage = $("#drink-cat-perpage").dropdown('get value');
		}

		$("#drink-cat-body").html(tableLoader(5));

		postJson("hms-admin/worker", function(data, status){

			$("#drink-cat-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#drink-cat-pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateDrinkcategory"));

					if(d.data.length === 0)
					{
						$("#drink-cat-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/question.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty Drinks category list returned</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = sn;

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Name;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Sort;

						let td3 = document.createElement("td");
						let ch = d.data[i].Status ? "checked" : "";
						td3.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetDrinkcategory_Status(this, '"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";

						let td4 = document.createElement("td");
						td4.innerHTML = "<span><i class='green pencil icon' style='cursor: pointer;' onclick=\"editDrinkcategory('"+escape(JSON.stringify(d.data[i]))+"')\"></i></span>" +
							"&nbsp;&nbsp;&nbsp;<span><i id='drinkcat-del-btn-"+d.data[i].Id+"' class='red trash icon' style='cursor: pointer;' onclick=\"ConfirmDrinkcategoryDelete('" + d.data[i].Id + "')\"></i></span>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);

						sn++;

						document.getElementById("drink-cat-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

    function populateDrinks(page)
    {
        let request = {};
        request.Page = 1;
        request.Perpage = 25;
        request.Filter = "search list";
        request.Filtervalue = $("#search-txt").val();
        request.job = "get drink list";


        if(Number(page) > 0)
        {
            request.Page = Number(page);
        }
        if($("#perpage").dropdown('get value') != "")
        {
            request.Perpage = $("#perpage").dropdown('get value');
        }


        $("#table-body").html(tableLoader(8));

        postJson("hms-admin/worker", function(data, status){
            $("#table-body").html("");

            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    //on success

                    let sn = ((d.Page - 1) * d.Perpage) + 1;
                    $("#total_count_btn").html(d.Total);
                    $("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFood"));

                    if(d.data.length === 0)
                    {
                        //Empty set returned
                        $("#table-body").html("<tr><td colspan='16'></td></tr>");
                    }

                    for(var i = 0; i < d.data.length; i++)
                    {
                        let row = document.createElement("tr");
                        row.id = d.data[i].Id + "-row";

                        let td0 = document.createElement("td");
                        td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

                        let td1 = document.createElement("td");
                        td1.innerHTML = "<img src='files/"+d.data[i].Images[0]+"' style='width: 80px; border-radius: 4px;'/>";

                        let td2 = document.createElement("td");
                        td2.innerHTML = d.data[i].Name+"<br/><span style='color: silver;'>Category: <span style='color: dimgray;'>"+
                            d.data[i].Category.Name+"</span></span>";

                        let td3 = document.createElement("td");
                        td3.innerHTML = "<br/><span><span style='color: lightgray;'>Price: </span>" +
                            $("#currency-symbol").val() + numFormat(Number(d.data[i].Price).toFixed(2))+"</span>";

                        if(d.data[i].Compareat > 0)
                        {
                            td3.innerHTML += "<br/><span><span style='color: lightgray;'>Compare at: </span><strike>" +
                                $("#currency-symbol").val() + numFormat(Number(d.data[i].Compareat).toFixed(2))+"</strike></span>";
                        }

                        let td4 = document.createElement("td");
                        let ch = d.data[i].Onsite ? "checked" : "";
                        let rv = d.data[i].Reservable ? "checked" : "";
                        td4.innerHTML = "<label><input class='filled-in' type='checkbox' "+ch+" onchange=\"SetDrink_Visibility(this,'"+d.data[i].Id+"')\"/><span>Visiblility</span></label>";
                        td4.innerHTML += "<br/><label><input class='filled-in' type='checkbox' "+rv+" onchange=\"SetDrink_Reservable(this, '"+d.data[i].Id+"')\"/><span>Can reserve</span></label>";


                        let td5 = document.createElement("td");
                        td5.innerHTML = d.data[i].Sort;

                        let td6 = document.createElement("td");
                        ch = d.data[i].Status ? "checked" : "";
                        td6.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetDrink_Status(this,'"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";


                        let td7 = document.createElement("td");
                        td7.innerHTML = "<div class='w3-container'> " +
                            "<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
                            "<i class='blue wrench icon'></i>" +
                            "<div class='menu'>" +
                            "<div class='header'>Action</div>" +
							"<a href='#drink-report/"+d.data[i].Id+"' class='item'><i class='pie chart icon'></i>Sales report</a>" +
							"<a href='#add-drinks/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit Drink</a>" +
							"<div class='ui divider'></div>" +
                            "<div class='item' onclick=\"ConfirmDrinkDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
                            "</div>" +
                            "</div></div>";


                        row.appendChild(td0);
                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);
                        row.appendChild(td6);
                        row.appendChild(td7);

                        sn++;

                        document.getElementById("table-body").appendChild(row);
                    }

                    $(".c-menu").dropdown();
                }
                else if(d.status == "ACCESS_DENIED")
                {
                    //Re-login marker goes here
                    //
                }
                else
                {
                    //Unable to save marker goes here
                    //
                }
            }
            else
            {
                //Network error marker goes here
                //
            }
        }, request);
    }

	function populatePastrycategory(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "";
		request.job = "get pastry category";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#pastry-cat-perpage").dropdown('get value') !== "")
		{
			request.Perpage = $("#pastry-cat-perpage").dropdown('get value');
		}

		$("#pastry-cat-body").html(tableLoader(5));

		postJson("hms-admin/worker", function(data, status){

			$("#pastry-cat-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pastry-cat-pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populatePastrycategory"));

					if(d.data.length === 0)
					{
						$("#pastry-cat-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/question.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty Pastry category list returned</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = sn;

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Name;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Sort;

						let td3 = document.createElement("td");
						let ch = d.data[i].Status ? "checked" : "";
						td3.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetPastrycategory_Status(this, '"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";

						let td4 = document.createElement("td");
						td4.innerHTML = "<span><i class='green pencil icon' style='cursor: pointer;' onclick=\"editPastrycategory('"+escape(JSON.stringify(d.data[i]))+"')\"></i></span>" +
							"&nbsp;&nbsp;&nbsp;<span><i id='pastrycat-del-btn-"+d.data[i].Id+"' class='red trash icon' style='cursor: pointer;' onclick=\"ConfirmPastrycategoryDelete('" + d.data[i].Id + "')\"></i></span>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);

						sn++;

						document.getElementById("pastry-cat-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populatePastries(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get pastry list";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(8));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populatePastries"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='16'></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = "<img src='files/"+d.data[i].Images[0]+"' style='width: 80px; border-radius: 4px;'/>";

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Name+"<br/><span style='color: silver;'>Category: <span style='color: dimgray;'>"+
							d.data[i].Category.Name+"</span></span>";

						let td3 = document.createElement("td");
						td3.innerHTML = "<br/><span><span style='color: lightgray;'>Price: </span>" +
							$("#currency-symbol").val() + numFormat(Number(d.data[i].Price).toFixed(2))+"</span>";

						if(d.data[i].Compareat > 0)
						{
							td3.innerHTML += "<br/><span><span style='color: lightgray;'>Compare at: </span><strike>" +
								$("#currency-symbol").val() + numFormat(Number(d.data[i].Compareat).toFixed(2))+"</strike></span>";
						}

						let td4 = document.createElement("td");
						let ch = d.data[i].Onsite ? "checked" : "";
						let rv = d.data[i].Reservable ? "checked" : "";
						td4.innerHTML = "<label><input class='filled-in' type='checkbox' "+ch+" onchange=\"SetPastry_Visibility(this,'"+d.data[i].Id+"')\"/><span>Visiblility</span></label>";
						td4.innerHTML += "<br/><label><input class='filled-in' type='checkbox' "+rv+" onchange=\"SetPastry_Reservable(this, '"+d.data[i].Id+"')\"/><span>Can reserve</span></label>";


						let td5 = document.createElement("td");
						td5.innerHTML = d.data[i].Sort;

						let td6 = document.createElement("td");
						ch = d.data[i].Status ? "checked" : "";
						td6.innerHTML = "<div class='switch'><label><input type='checkbox' "+ch+" onchange=\"SetPastry_Status(this,'"+d.data[i].Id+"')\"/><span class='lever'></span></label></div>";


						let td7 = document.createElement("td");
						td7.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='#pastry-report/"+d.data[i].Id+"' class='item'><i class='pie chart icon'></i>Sales report</a>" +
							"<a href='#add-pastry/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit Pastry</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmPastryDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);

						//optional fields
						/*
                        row.appendChild(td14);
                        */

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateReceivedMessages(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get messages";
		request.tab = "all";

		if($("#unresolved-messge-tab").hasClass("active"))
		{
			request.tab = "unresolved";
		}
		if($("#resolved-messge-tab").hasClass("active"))
		{
			request.tab = "resolved";
		}
		if($("#stared-messge-tab").hasClass("active"))
		{
			request.tab = "stared";
		}


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(receivedmessageLoader()+receivedmessageLoader());

		postJson("hms-admin/worker", function(data, status){

			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{

					$("#all-count-con").html(d.Totalcount);
					$("#resolved-count-con").html(d.Resolvedcount);
					$("#unresolved-count-con").html(d.Unresolvedcount);
					$("#stared-count-con").html(d.Staredcount);

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFaq"));

					if(d.data.length === 0)
					{
						$("#table-body").html("<div class='align-c widget curve pad-2' style='margin-top: 5px; width: 100%;'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty message list returned</h6>" +
							"</div>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("div");
						row.id = d.data[i].Id + "-row";
						row.className = "w3-row widget hoverable curve message-con";
						row.style.marginTop = "5px";
						row.style.backgroundColor = !d.data[i].Seen ? "rgb(240,255,240)" : "white";

						let snNumber = !d.data[i].Opened ? sn +" <small><small><small><i class='circle green icon' title='Unread message'></i></small></small></small>" : sn;

						let check = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + snNumber + "</span></label>";

						let star = d.data[i].Stared ?
							"<i id='"+d.data[i].Id+"-star' class='star yellow icon' style='cursor: pointer;' onclick=\"starMessage(this, '"+d.data[i].Id+"')\"></i>" :
							"<i id='"+d.data[i].Id+"-star' class='star outline icon' style='cursor: pointer;' onclick=\"starMessage(this, '"+d.data[i].Id+"')\"></i>";


						let status = d.data[i].Status ? "<label class='status green-back'>Resolved</label>" : "<label class='red-back status'>Unresolved</label>";

						row.innerHTML =
							"<div class='w3-col l2 m1 s12 l-pad-2 s-pad-1' style='border-right: 1px solid whitesmoke;'>" +
							check +
							"</div> " +
							"<div class='w3-col l1 m1 s12 l-pad-2 s-pad-1' style='border-right: 1px solid whitesmoke;'>" +
							"<div class='align-c'>"+star+"</div> " +
							"</div> " +
							"<a href='#open-message/"+d.data[i].Id+"'>" +
							"<div class='w3-col l2 m2 s12 l-pad-2 s-pad-1' style='cursor: pointer;'>" +
							"<div class=''>"+status+"</div> " +
							"</div> " +
							"</a>" +
							"<a href='#open-message/"+d.data[i].Id+"'>" +
							"<div class='w3-col l6 m5 s12 l-pad-2 s-pad-1' style='border-right: 1px solid whitesmoke; cursor: pointer;'>" +
							"<div class=''><h6 class='sleak' style='margin:0px; font-family: Lato; font-size: 14px; font-weight: bold; color: black;'>"+
							shortenText(50, d.data[i].Body)+"</h6></div> " +
							"</div> " +
							"</a>" +
							"<div class='w3-col l1 m1 s12 l-pad-2 s-pad-1'>" +
							"<div class='align-c'><i id='"+d.data[i].Id+"-btn' class='trash red icon' style='cursor: pointer;' onclick=\"ConfirmMessageDelete('"+d.data[i].Id+"')\"></i></div> " +
							"</div> ";

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();

					setTimeout(function () {
						$(".message-con").css("background-color","white");
					},  5000);
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateMessageTemplate(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get messagetemplate";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}

		if($("#perpage").dropdown('get value') !== "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(receivedmessageLoader()+receivedmessageLoader());

		postJson("hms-admin/worker", function(data, status){

			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFaq"));

					$("#email-count-con").html(d.Emailcount);
					$("#sms-count-con").html(d.SMScount);

					if(d.data.length === 0)
					{
						$("#table-body").html("<div class='align-c widget curve pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Message template list is empty</h6>" +
							"</div>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("div");
						row.id = d.data[i].Id + "-row";
						row.className = "w3-row widget hoverable curve";
						row.style.marginTop = "3px";
						row.style.cursor = "pointer";

						let check = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";
						let emailsms = d.data[i].Type == "email" ? "<h6 class='sleak' style='font-weight: bold;'><i class='green at icon'></i> Email</h6>"
							: "<h6 class='sleak' style='margin: 0px; font-weight: bold;'><i class='green mobile icon'></i> SMS</h6>";

						row.innerHTML =
							"<div class='widget w3-card curve'> " +
							"<div class='w3-row' style='border-bottom: 1px solid whitesmoke;'>" +
							"<div class='w3-col l1 m1 s12 l-pad-2 s-pad-1' style=''>" +
							check +
							"</div>" +
							"<div class='w3-col l8 m7 s7 l-pad-2 s-pad-1'>" +
							"<h4 class='sleak' style='font-weight: normal;'>"+shortenText(100, d.data[i].Title, (d.data[i].Type == "sms" ? d.data[i].Body : d.data[i].Subject))+"</h4>" +
							"</div> " +
							"<div class='w3-col l2 m2 s12 l-pad-2 s-pad-1'>" +
							"<div class=''>"+emailsms+"</div> " +
							"</div> " +
							"<div class='w3-col l1 m4 s12 l-pad-2 s-pad-1'>" +
							"<div style='float: right;' class='ui right top pointing dropdown c-menu'>" +
							"<div class=''><i class='ellipsis vertical icon'></i></div>" +
							"<div class='menu'>" +
							"<div class='item'>Import customers list</div>" +
							"<div class='item'>Import staff list</div>" +
							"<div class='item'><i class='pencil icon'></i> Edit</div>" +
							"<div class='item'><i class='trash icon'></i> Delete</div>" +
							"</div>" +
							"</div> " +
							"</div> " +
							"</div>" +


							"<div class='w3-row' style=''>" +
							"<div class='w3-col l2 m3 s3 l-pad-1 s-pad-1 align-c' style=''>" +
							"<label style='color: dimgray;'>Events <b class='blue-text'>0</b></label>" +
							"</div>" +
							"<div class='w3-col l3 m3 s3 l-pad-1 s-pad-1 align-c' style=''>" +
							"<label style='color: dimgray;'>Schedule <b class='blue-text'>0</b></label>" +
							"</div>" +
							"<div class='w3-col l7 m6 s12 l-pad-1 s-pad-1'>" +

							"</div> " +
							"</div>" +

							"</div>";

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateContactList(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get contact list";
		request.tab = "all";
		request.list = $("#custom-list-id").val();

		if($("#contact-list-customer").hasClass("active"))
		{
			request.tab = "customer";
		}
		if($("#contact-list-guest").hasClass("active"))
		{
			request.tab = "guest";
		}
		if($("#contact-list-staff").hasClass("active"))
		{
			request.tab = "staff";
		}
		if($("#contact-list-subscribers").hasClass("active"))
		{
			request.tab = "subscribers";
		}
		if($("#contact-list-messaging").hasClass("active"))
		{
			request.tab = "messaging";
		}
		if($("#contact-list-custom").hasClass("active"))
		{
			request.tab = "custom";
		}

		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(tableLoader(4));

		postJson("hms-admin/worker", function(data, status){

			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFaq"));

					if(d.data.length === 0)
					{
						$("#table-body").html("<tr><td colspan='4'><div class='align-c widget curve pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/user.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty contact list returned</h6>" +
							"</div></td></tr>");
					}

					for(let i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' s-data=\""+d.data[i].Id+":"+d.data[i].Type+"\" type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
                        td1.innerHTML =
						d.data[i].Type == "supplier" ?
                            (d.data[i].Company == "" ? d.data[i].Contactperson + "<br/><span style='color: silver;'>Source: <span class='blue-text'>"+d.data[i].Type+"</span></span>"
                                : d.data[i].Company + "<br/><span style='color: silver;'>Source: <span class='blue-text'>"+d.data[i].Type+"</span></span>") : d.data[i].Name + " " + d.data[i].Surname + "<br/>" +
						"<span style='color: silver;'>Source: <span class='blue-text'>"+d.data[i].Type+"</span></span>";

						let td2 = document.createElement("td");
						td2.innerHTML = "<span style='color: silver;'>Phone: </span>"+d.data[i].Phone+"<br/>" +
						"<span style='color: silver;'>Email: </span>"+d.data[i].Email;


						let td3 = document.createElement("td");


						let con3 = "";

						if(d.data[i].Type === "subscriber")
						{
							let ob = {id:d.data[i].Id, names:d.data[i].Name +' '+d.data[i].Surname, phone:d.data[i].Phone, email:d.data[i].Email};

							con3 = "<div class='w3-container'> " +
								"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
								"<i class='blue wrench icon'></i>" +
								"<div class='menu'>" +
								"<div class='header'>Action</div>";

								if($("#contact-list-custom").hasClass("active"))
								{
									con3 += "<div class='item' onclick=\"removeContactfromList('"+d.data[i].Id+"','"+d.data[i].Type+"')\"><i class='minus icon'></i>Remove from this list</div>";
								}
								else
								{
									con3 += "<div class='item' onclick=\"addToContactList('"+d.data[i].Id+"','"+d.data[i].Type+"')\"><i class='plus icon'></i>Add to custom list</div>";
								}

								con3 +=
								"<div class='item' onclick=\"launchAddContact('"+escape(JSON.stringify(ob))+"')\"><i class='pencil icon'></i>Edit contact</div>" +
								"<div class='item' onclick=\"ConfirmContactDelete('"+d.data[i].Id+"')\"><i class='trash icon'></i>Delete Contact</div>" +
								"</div>" +
								"</div></div>";
						}
						else
						{
							con3 = "<div class='w3-container'> " +
								"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
								"<i class='blue wrench icon'></i>" +
								"<div class='menu'>" +
								"<div class='header'>Action</div>";

								if($("#contact-list-custom").hasClass("active"))
								{
									con3 += "<div class='item' onclick=\"removeContactfromList('"+d.data[i].Id+"','"+d.data[i].Type+"')\"><i class='minus icon'></i>Remove from this list</div>";
								}
								else
								{
									con3 += "<div class='item' onclick=\"addToContactList('"+d.data[i].Id+"','"+d.data[i].Type+"')\"><i class='plus icon'></i>Add to custom list</div>";
								}

								con3 +=
								"</div>" +
								"</div></div>";
						}

						td3.innerHTML = con3;


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);

						//optional fields
						/*
                        row.appendChild(td14);
                        */

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateReviews()
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get reviews";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') !== "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}

		$("#table-body").html(receivedmessageLoader()+receivedmessageLoader());

		postJson("hms-admin/worker", function(data, status){

			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateFaq"));

					$("#review-responses-count").html(numFormat(d.Totalresponsecount));
					$("#sent-review-count").html(numFormat(d.Totalsentreviews));
					$("#ignored-review-count").html(numFormat(d.Totalsentreviews - d.Totalresponsecount));

					let resp_curve = "";
					for(let k = 0; k < d.Span.length; k++)
					{
						if(resp_curve == "")
						{
							resp_curve = d.Span[k].toString();
						}
						else
						{
							resp_curve += ","+d.Span[k].toString();
						}
					}
					$("#response-curve").html(resp_curve);
					$("#response-curve").peity('line', {fill:["rgb(64,153,255)"]});

					if(d.data.length === 0)
					{
						$("#table-body").html("<div class='align-c widget w3-card curve pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Review list is empty</h6>" +
							"</div>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("div");
						row.id = d.data[i].Id + "-row";
						row.className = "w3-row widget hoverable curve";
						row.style.marginTop = "5px";

						let check = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";
						let emailsms = d.data[i].Type == "email" ? "<label class='status'><i class='blue at icon'></i> Email</label>"
							: "<label class='status'><i class='blue mobile icon'></i> SMS</label>";
						let star = "<i class='star yellow icon'></i>";

						let status = d.data[i].Status ? "<label class='status green-back'>Resolved</label>" : "<label class='red-back status'>Unresolved</label>";

						row.innerHTML =
							"<div class='widget w3-card curve'> " +
							"<div class='w3-row' style='border-bottom: 1px solid whitesmoke;'>" +
							"<div class='w3-col l1 m1 s12 l-pad-2 s-pad-1' style=''>" +
							check +
							"</div>" +
							"<a href='#review/"+d.data[i].Id+"'> " +
							"<div class='w3-col l7 m7 s7 l-pad-2 s-pad-1'>" +
							"<h4 class='sleak' style='font-weight: normal; color: black;'>"+
							shortenText(80, d.data[i].Title, d.data[i].Body)+"</h4>" +
							"</div> " +
							"</a>" +
							"<a href='#review/"+d.data[i].Id+"'> " +
							"<div class='w3-col l3 m3 s12 l-pad-2 s-pad-1'>" +
							"<div class='align-c'>" +
							"<h2 class='sleak red-text' style='margin: 0px;'>"+d.data[i].Responsecount+"</h2>" +
							"<h6 class='sleak' style='margin: 0px; font-size: 12px; color: dimgray;'>Responses</h6>" +
							"</div> " +
							"</div> " +
							"</a>" +
							"<div class='w3-col l1 m4 s12 l-pad-2 s-pad-1'>" +
							"<div style='float: right;' class='ui right top pointing dropdown c-menu'>" +
							"<div class=''><i class='ellipsis vertical icon'></i></div>" +
							"<div class='menu'>" +
							"<div class='item' onclick=\"createLink('"+d.data[i].Id+"')\"><i class='linkify icon'></i> Create Link</div>" +
							"<div class='item' onclick=\"createButton('"+d.data[i].Id+"')\"><i class='hand pointer icon'></i> Create Button</div>" +
							"<div class='divider'></div>" +
							"<!--[for later]<a href='#create-review/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i> Edit</a>-->" +
							"<div class='item' onclick=\"ConfirmReviewDelete('"+d.data[i].Id+"')\"><i class='trash icon'></i> Delete</div>" +
							"</div>" +
							"</div> " +
							"</div> " +
							"</div>" +


							"</div>";

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status === "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	loadingSeo = true;
	function populateSeo()
	{
		$("#page").addClass("ui loading form");
		postJson("hms-admin/worker", function (data, status) {
			$("#page").removeClass("ui loading form");
			if(status === "done") {

				let d = JSON.parse(data);

				if (d.status === "success")
				{
					getElement("auto-seo").checked = d.data.Autoseo;
					$("#homepage-seo-keywords").val(d.data.Homekeywords);
					$("#homepage-seo-description").val(d.data.Homedescription);
					$("#lodging-seo-keywords").val(d.data.Lodgingkeywords);
					$("#lodging-seo-description").val(d.data.Lodgingdescription);
					$("#restaurant-seo-keywords").val(d.data.Restaurantkeywords);
					$("#restaurant-seo-description").val(d.data.Restaurantdescription);
					$("#bar-seo-keywords").val(d.data.Barkeywords);
					$("#bar-seo-description").val(d.data.Bardescription);
					$("#pastry-seo-keywords").val(d.data.Pastrykeywords);
					$("#pastry-seo-description").val(d.data.Pastrydescription);

					loadingSettings = false;
				}
				else
				{
					_page({ add: pageTop({ icon: "search", text: "Search Engine Optimization" }), clear: true });
					_page({add:"<div class='pad-3 widget lift-1'>" +
							"<div class='align-c'>" +
							"<h6 class='sleak'>" +
							"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
							d.message +
							"</h6> " +
							"<button class='ui sleak blue button' onclick='DrawSEO()'>Try again</button>" +
							"</div>" +
							"</div>", class:"l-pad-3 s-pad-1"});
				}
			}
			else
			{
				_page({ add: pageTop({ icon: "search", text: "Search Engine Optimization" }), clear: true });
				_page({add:"<div class='pad-3 widget lift-1'>" +
						"<div class='align-c'>" +
						"<h6 class='sleak'>" +
						"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
						"Connection error. Check your connection and try again" +
						"</h6> " +
						"<button class='ui sleak blue button' onclick='DrawSEO()'>Try again</button>" +
						"</div>" +
						"</div>", class:"l-pad-3 s-pad-1"});
			}
		}, {job:"get seo"});
	}

	function populateLaundry(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "created";
		request.job = "get laundry items";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(6));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					//$("#total_count").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateLaundry"));

					if(d.data.length == 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Laundry item list is empty</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Name;

						let td2 = document.createElement("td");
						td2.innerHTML = $("#currency-symbol").val()+numFormat(Number(d.data[i].Price).toFixed(2));

						let td3 = document.createElement("td");
						td3.id = d.data[i].Id + "-sale-con";
						td3.innerHTML = "0 sold";

						let td4 = document.createElement("td");
						td4.innerHTML = "<div class='switch'><label>" +
							"<input type='checkbox' "+(d.data[i].Status ? "checked" : "")+" " +
							"onchange=\"changeLaundryStatus('"+d.data[i].Id+"', this)\"/>" +
							"<span class='lever'></span></label></div>";

						let td5 = document.createElement("td");
						td5.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='#new-laundry-item/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmLaundryDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();

					populatePOSReport();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populatePool(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.Filter = "search list";
		request.Filtervalue = "created";
		request.job = "get pool sessions";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(6));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					//$("#total_count").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populatePool"));

					if(d.data.length == 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='5'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Laundry item list is empty</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Name;

						let td2 = document.createElement("td");
						td2.innerHTML = $("#currency-symbol").val()+numFormat(Number(d.data[i].Price).toFixed(2));

						let td3 = document.createElement("td");
						td3.id = d.data[i].Id + "-sale-con";
						td3.innerHTML = "0 sold";


						let td4 = document.createElement("td");
						td4.innerHTML = "<div class='switch'><label>" +
							"<input type='checkbox' "+(d.data[i].Status ? "checked" : "")+" " +
							"onchange=\"changePoolStatus('"+d.data[i].Id+"', this)\"/>" +
							"<span class='lever'></span></label></div>";

						let td5 = document.createElement("td");
						td5.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='#new-pool-session/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmPoolDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();

					populatePOSReport();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateEvent(page)
	{
		let request = {
			Page:1,
			Perpage:25,
			list:"user",
			job:"get events"
		};

		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}

		if($("#event-perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#event-perpage").dropdown('get value');
		}

		if($("#system-event-tab").hasClass("active"))
		{
				request.list = "system";
		}

		$("#event-table").html("<div class='widget pad-2 curve w3-card'>" +
			"<div class='ui placeholder'>"+
			"<div class='line'></div>" +
			"<div class='line'></div>" +
			"<div class='line'></div>" +
			"</div></div>");

		postJson("hms-admin/worker", function(data, status){
			$("#event-table").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#event-count-con").html(d.Total);

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#event-pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateSchedule"));

					if(d.data.length == 0)
					{
						$("#event-table").html("<div class='widget pad-6 curve w3-card align-c'>" +
						"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/code.png' style='width: 60px;'/>" +
						"<h6 class='sleak-b' style='color: dimgray;'>No events have been created yet</h6>" +
						"</div>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("div");
						row.id = d.data[i].Id + "-row";
						row.className = "widget margin-b-t hoverable curve w3-card";
						row.style.cursor = "pointer";

						let con =
							"<div class='w3-row'>" +
							"<a href='#messaging/event-detail/"+d.data[i].Id+"'>" +
							"<div class='w3-col l11 m11 s11 pad-t'>" +

							"<h6 class='sleak' style='font-weight: bold; color: rgb(80,80,80); margin-left: 10px;'>" +
							d.data[i].Title +
							"</h6>" +

							"<h6 class='sleak' style='color: gray; margin-left: 10px; font-weight: bold;'>" +
							"<small><i class='terminal red-text icon'></i> "+
							shortenText(40, d.data[i].Eventname)+
							"</small></h6>" +

							"</div>" +
							"</a>" +
							"<div class='w3-col l1 m1 s1 pad-t'>" +

							"<div style='float: right; margin-top: 7px;' class='ui right top pointing dropdown'>" +
							"<div class=''><i class='ellipsis vertical icon'></i></div>" +
							"<div class='menu'>" +

							(d.data[i].Issystem ? "<div class='item disabled'>System event</div>" :

							(d.data[i].Status ? "<div id='status-item-"+d.data[i].Id+"' cur-status='false' class='item' onclick=\"changeEventStatus('"+d.data[i].Id+"',this)\">Stop listening</div>" :
								"<div id='status-item-"+d.data[i].Id+"' cur-status='true' class='item' onclick=\"changeEventStatus('"+d.data[i].Id+"',this)\">Start listening</div>")
							)+

							(d.data[i].Issystem ? "<div class='item disabled'>System event</div>" :
								"<a href='#messaging/new-event-listener/"+d.data[i].Id+"' class='item'>Edit event</a>")+

							"<div class='divider'></div>" +
							"<div class='item' onclick=\"ConfirmEventlistenerDelete('"+d.data[i].Id+"')\">Delete event</div>" +
							"</div>" +
							"</div> " +

							"</div>" +
							"</div><hr style='margin: 0px; padding: 0px;'/>" +

							"<a href='#messaging/event-detail/"+d.data[i].Id+"'>" +
							"<div class='w3-row'>" +
							"<div class='w3-col l7 m7 s7'> " +
							"<div class='pad-t'>" +
							"<h6 id='status-con-"+d.data[i].Id+"' class='sleak' style='margin-left: 10px; color: dimgray; font-weight: bold;'>" +
							(d.data[i].Status ?
								"<span class='small-blue-pulse'></span> &nbsp;&nbsp;<small>Listening..." :
								"<span class='red-back' style='display: inline-block; border-radius: 50%; " +
								"height: 6px; width: 6px;'></span>" +
								" &nbsp;&nbsp;<small>Pending..") +
							"</small></h6>" +
							"</div>" +
							"</div>" +
							"<div class='w3-col l5 m5 s5'>" +
							"<h6 class='sleak blue-text' style='font-weight: bold; float: right; margin-right: 10px;'>" +
							"<small><i class='"+(d.data[i].Message.Type == "sms" ? "mobile" : "at")+
							" icon'></i> "+(d.data[i].Message.Type)+"</small></h6>" +
							"<h6 class='sleak green-text' style='font-weight: bold;'>" +
							"<small><i class='code icon'></i> "+(d.data[i].Firecount)+"</small></h6>" +
							"</div> " +
							"</div>" +
							"</a>";

						row.innerHTML =  con;
						getElement("event-table").appendChild(row);
					}
					$(".ui.dropdown").dropdown();
				}
				else if(d.status == "access_denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
					//Network error marker goes here
					//
			}
		}, request);
	}

	function populateSchedule(page)
	{
		let request = {
			Page:1,
			Perpage:25,
			list:"user",
			job:"get message schedule"
		};

		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#schedule-perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#schedule-perpage").dropdown('get value');
		}

		if($("#system-schedule-tab").hasClass("active"))
		{
			request.list = "system";
		}

		$("#schedule-table").html("<div class='widget pad-2 curve w3-card'>" +
			"<div class='ui placeholder'>"+
			"<div class='line'></div>" +
			"<div class='line'></div>" +
			"<div class='line'></div>" +
			"</div></div>");


		postJson("hms-admin/worker", function(data, status){
			$("#schedule-table").html("");
			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					$("#schedule-count-con").html(d.Total);

					if(d.Total > 0)
					{
						plotGraph(((d.Completed / d.Total) * (100.0 / 1.0)).toFixed(2));
					}
					else
					{
						plotGraph(0);
					}

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#schedule-pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateSchedule"));

					if(d.data.length == 0)
					{
						$("#schedule-table").html("<div class='widget pad-6 curve w3-card align-c'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/schedule.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No schedules have been created yet</h6>" +
							"</div>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("div");
						row.id = d.data[i].Id + "-row";
						row.className = "widget margin-b-t hoverable curve w3-card";
						row.style.cursor = "pointer";

						let con =
							"<div class='w3-row'>" +
							"<a href='#messaging/schedule-detail/"+d.data[i].Id+"'>" +
							"<div class='w3-col l11 m11 s11 pad-t'>" +

							"<h6 class='sleak' style='font-weight: bold; color: rgb(80,80,80); margin-left: 10px;'>" +
							d.data[i].Title +
							"</h6>" +

							"<h6 class='sleak' style='color: gray; margin-left: 10px; font-weight: bold;'>" +
							"<small><i class='open envelope blue-text icon'></i> "+
							shortenText(40, d.data[i].Message.Title, (d.data[i].Message.Type == "sms" ?
								d.data[i].Message.Body : d.data[i].Message.Subject))+
							"</small></h6>" +

							"</div>" +
							"</a>" +
							"<div class='w3-col l1 m1 s1 pad-t'>" +

							"<div style='float: right; margin-top: 7px;' class='ui right top pointing dropdown'>" +
							"<div class=''><i class='ellipsis vertical icon'></i></div>" +
							"<div class='menu'>" +

							(d.data[i].Issystem ? "<div class='item disabled'>System schedule</div>" :
							"<a href='#messaging/new-schedule/"+d.data[i].Id+"' class='item'>Edit schedule</a>")+

							"<div class='divider'></div>" +
							"<div class='item' onclick=\"ConfirmMessagescheduleDelete('"+d.data[i].Id+"')\">Delete schedule</div>" +
							"</div>" +
							"</div> " +

							"</div>" +
							"</div><hr style='margin: 0px; padding: 0px;'/>" +

							"<a href='#messaging/schedule-detail/"+d.data[i].Id+"'>" +
							"<div class='w3-row'>" +
							"<div class='w3-col l7 m7 s7'> " +
							"<div class='pad-t'>" +
							"<h6 id='status-con-"+d.data[i].Id+"' class='sleak' style='margin-left: 10px; color: dimgray; font-weight: bold;'>" +
							(!d.data[i].Completed ?
								"<i class='stopwatch green-text icon'></i> &nbsp;<small>Waiting.." :
								"<small><i class='check blue-text icon'></i></small> &nbsp;<small>Completed") +
							"</small></h6>" +
							"</div>" +
							"</div>" +
							"<div class='w3-col l5 m5 s5'>" +
							"<h6 class='sleak blue-text' style='font-weight: bold; float: right; margin-right: 10px;'>" +
							"<small><i class='"+(d.data[i].Message.Type == "sms" ? "mobile" : "at")+
							" icon'></i> "+(d.data[i].Message.Type)+"</small></h6>" +
							"</div> " +
							"</div>" +
							"</a>";

						row.innerHTML =  con;
						getElement("schedule-table").appendChild(row);
					}
					$(".ui.dropdown").dropdown();
				}
				else if(d.status == "access_denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

    function populateSupplier(page)
    {
        let request = {};
        request.Page = 1;
        request.Perpage = 25;
        request.Filter = "search list";
        request.Filtervalue = $("#search-txt").val();
        request.job = "get suppliers list";


        if(Number(page) > 0)
        {
            request.Page = Number(page);
        }
        if($("#perpage").dropdown('get value') !== "")
        {
            request.Perpage = $("#perpage").dropdown('get value');
        }

        $("#table-body").html(tableLoader(7));

        postJson("hms-admin/worker", function(data, status){
            $("#table-body").html("");

            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    //on success
                    let sn = ((d.Page - 1) * d.Perpage) + 1;
                    //$("#total_count").html(d.Total);
                    $("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateCoupon"));

                    if(d.data.length === 0)
                    {
                        $("#table-body").html("<tr><td colspan='7'><div class='align-c pad-2'>" +
                            "<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/user.png' style='width: 60px;'/>" +
                            "<h6 class='sleak-b' style='color: dimgray;'>Empty suppliers list returned</h6>" +
                            "</div></td></tr>");
                    }


                    for(var i = 0; i < d.data.length; i++)
                    {
                        let row = document.createElement("tr");
                        row.id = d.data[i].Id + "-row";

                        let td0 = document.createElement("td");
                        td0.innerHTML = "<label><input id='"+d.data[i].Id+"' s-data=\""+d.data[i].Id+":"+d.data[i].Type+"\" class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

                        let td1 = document.createElement("td");
                        td1.innerHTML = d.data[i].Company;

                        let td2 = document.createElement("td");
                        td2.innerHTML = d.data[i].Contactperson;


                        let td3 = document.createElement("td");
                        td3.innerHTML = d.data[i].Phone;


                        let td4 = document.createElement("td");
                        td4.innerHTML = d.data[i].Email;

                        let td5 = document.createElement("td");
                        td5.innerHTML = d.data[i].Address;



                        let td6 = document.createElement("td");
                        td6.innerHTML = "<div class='w3-container'> " +
                            "<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
                            "<i class='blue wrench icon'></i>" +
                            "<div class='menu'>" +
                            "<div class='header'>Action</div>" +
                            "<a href='#new-supplier/"+d.data[i].Id+"' class='item'><i class='pencil icon'></i>Edit supplier</a>" +
                            "<div class='ui divider'></div>" +
                            "<div class='item' onclick=\"ConfirmSupplierDelete('" + d.data[i].Id + "')\"><i class='trash icon'></i>Delete</div>" +
                            "</div>" +
                            "</div></div>";


                        row.appendChild(td0);
                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);
                        row.appendChild(td6);
                        sn++;

                        document.getElementById("table-body").appendChild(row);
                    }

                    $(".c-menu").dropdown();
                }
                else
                {
                    //Unable to save marker goes here
                    //
                }
            }
            else
            {
                //Network error marker goes here
                //
            }
        }, request);
    }

    function populateInventoryItems(page)
    {
        let request = {};
        request.Page = 1;
        request.Perpage = 25;
        request.filter = "all";
        request.item_type = $("#inventory-item-type").val();
        request.searchterm = $("#search-txt").val();
        request.job = "get inventory items";

        if(!$("#instock-item-tab").hasClass("basic"))
        {
            request.filter = "instock";
        }
        if(!$("#lowstock-item-tab").hasClass("basic"))
        {
            request.filter = "lowstock";
        }
        if(!$("#outofstock-item-tab").hasClass("basic"))
        {
            request.filter = "outofstock";
        }

        let sterm = request.searchterm.split("-");
        if(sterm.length === 2)
        {
            if((Number(sterm[0].trim()) != NaN) && (Number(sterm[1].trim()) != NaN))
            {
                request.filter = "stockspan";
                request.rangestart = Number(sterm[0].trim());
                request.rangestop = Number(sterm[1].trim());
            }
        }


        if(Number(page) > 0)
        {
            request.Page = Number(page);
        }
        if($("#perpage").dropdown('get value') != "")
        {
            request.Perpage = $("#perpage").dropdown('get value');
        }


        $("#table-body").html(tableLoader(8));
        postJson("hms-admin/worker", function(data, status){
            $("#table-body").html("");

            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    //on success

                    $("#item-instock-statistic").html(d.instockcount);
                    $("#item-lowstock-statistic").html(d.lowstockcount);
                    $("#item-outofstock-statistic").html(d.outofstockcount);

                    let sn = ((d.Page - 1) * d.Perpage) + 1;
                    $("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateInventoryItems"));

                    if(d.data.length === 0)
                    {
                        //Empty set returned
                        $("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
                            "<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
                            "<h6 class='sleak-b' style='color: dimgray;'>Empty products list returned</h6>" +
                            "</div></td></tr>");
                    }

                    for(var i = 0; i < d.data.length; i++)
                    {
                        let row = document.createElement("tr");
                        row.id = d.data[i].Id + "-row";
                        row.className = Number(d.data[i].Stock) == 0 ? "negative" :
                            (Number(d.data[i].Stock) <= Number(d.data[i].Lowstockpoint) ? "warning" : "");

                        let td0 = document.createElement("td");
                        td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

                        let td1 = document.createElement("td");
                        td1.innerHTML = d.data[i].Image != "" ?
                            "<img src='files/"+d.data[i].Image+"' style='width: 60px; border-radius: 3px;'/>" :
                            "<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/imageplaceholder.png' style='width: 40px; border-radius: 3px;'/>" ;

                        let td2 = document.createElement("td");
                        td2.style.fontWeight = "bold";
                        td2.innerHTML = d.data[i].Name+"<br/><small class='blue-text' style='font-weight: bold;'>SKU: "+d.data[i].Sku+"</small>";

                        let td3 = document.createElement("td");
                        td3.innerHTML = d.data[i].Unit+
                            "<br/><small style='font-weight: bold; color: dimgray;'>plural: "+d.data[i].Pluralunit+"</small>";


                        let td4 = document.createElement("td");
                        td4.style.fontWeight = "bold";
                        td4.id = d.data[i].Id+"-stock-con";
                        td4.innerHTML = numFormat(Number(d.data[i].Stock));


                        let td5 = document.createElement("td");
                        td5.style.fontWeight = "bold";
                        td5.innerHTML = numFormat(Number(d.data[i].Lowstockpoint));

                        let td6 = document.createElement("td");
                        td6.id = d.data[i].Id+"-status-con";
                        td6.innerHTML = Number(d.data[i].Stock) <= 0 ? "<label class='red-back status'>Out of stock</label>" :
                            (Number(d.data[i].Stock) > Number(d.data[i].Lowstockpoint) ? "<label class='green-back status'>In Stock</label>" :
                                "<label class='yellow-back status'>Low stock</label>");

                        let editPath = "";
                        if(d.data[i].Type === "bar_item")
                        {
                            editPath = "#new-bar-item/"+d.data[i].Id;
                        }
                        if(d.data[i].Type === "kitchen_item")
                        {
                            editPath = "#new-kitchen-item/"+d.data[i].Id;
                        }
                        if(d.data[i].Type === "pastry_item")
                        {
                            editPath = "#new-pastry-item/"+d.data[i].Id;
                        }
                        if(d.data[i].Type === "pool_item")
                        {
                            editPath = "#new-pool-item/"+d.data[i].Id;
                        }
                        if(d.data[i].Type === "room_item")
                        {
                            editPath = "#new-room-item/"+d.data[i].Id;
                        }
                        if(d.data[i].Type === "store_item")
                        {
                            editPath = "#new-store-item/"+d.data[i].Id;
                        }
                        if(d.data[i].Type === "laundry_item")
                        {
                            editPath = "#new-laundry-item/"+d.data[i].Id;
                        }


                        let td7 = document.createElement("td");
                        td7.innerHTML = "<div class='w3-container'> " +
                            "<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
                            "<i class='blue wrench icon'></i>" +
                            "<div class='menu'>" +
                            "<div class='header'>Action</div>" +
                            "<div class='item' onclick=\"recordUsage('"+d.data[i].Id+"')\"><i class='minus icon'></i>Record usage</div>" +
                            "<div class='divider'></div>" +
                            "<a href='' class='item'><i class='pie chart icon'></i>Inventory details</a>" +
                            "<div class='item' onclick=\"raisePurchaseRequest('"+d.data[i].Id+"')\"><i class='plus icon'></i>Raise purchase request</div>" +
                            "<div class='item' onclick=\"recordDamage('"+d.data[i].Id+"')\"><i class='minus icon'></i>Record damage</div>" +
                            "<div class='item' onclick=\"recordSurplus('"+d.data[i].Id+"')\"><i class='plus icon'></i>Record surplus</div>" +
                            "<div class='ui divider'></div>" +
							"<div class='item' onclick=\"recordReturn('"+d.data[i].Id+"')\"><i class='minus icon'></i>Record return</div>" +
							"<div class='ui divider'></div>" +
							"<a href='"+editPath+"' class='item'><i class='pencil icon'></i>Edit</a>" +
                            "<div class='item' onclick=\"ConfirmItemDelete('"+d.data[i].Id+"')\"><i class='trash icon'></i>Delete</div>" +
                            "</div>" +
                            "</div></div>";


                        row.appendChild(td0);
                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);
                        row.appendChild(td6);
                        row.appendChild(td7);

                        //optional fields
                        /*
                        row.appendChild(td14);
                        */

                        sn++;

                        document.getElementById("table-body").appendChild(row);
                    }

                    $(".c-menu").dropdown();
                }
                else if(d.status == "ACCESS_DENIED")
                {
                    //Re-login marker goes here
                    //
                }
                else
                {
                    //Unable to save marker goes here
                    //
                }
            }
            else
            {
                //Network error marker goes here
                //
            }
        }, request);
    }

	function populateInventoryItemsTimeline()
	{
		let request = {};
		request.Page = 0;
		request.Perpage = 0;
		request.filter = "all";
		request.item_type = $("#inventory-item-type").val();
		request.searchterm = $("#search-txt").val();
		request.job = "get inventory items";

		if($("#timeline-item-filter").dropdown('get value').toString().toLowerCase() == "in stock")
		{
			request.filter = "instock";
		}
		if($("#timeline-item-filter").dropdown('get value').toString().toLowerCase() == "low stock")
		{
			request.filter = "lowstock";
		}
		if($("#timeline-item-filter").dropdown('get value').toString().toLowerCase() == "out of stock")
		{
			request.filter = "outofstock";
		}

		let sterm = request.searchterm.split("-");
		if(sterm.length === 2)
		{
			if((Number(sterm[0].trim()) != NaN) && (Number(sterm[1].trim()) != NaN))
			{
				request.filter = "stockspan";
				request.rangestart = Number(sterm[0].trim());
				request.rangestop = Number(sterm[1].trim());
			}
		}


		$("#timeline-table").html(tableLoader(1));
		postJson("hms-admin/worker", function(data, status){
			$("#timeline-table").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					if(d.data.length === 0)
					{
						//Empty set returned
						$("#timeline-table").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty products list returned</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id;
						row.className = Number(d.data[i].Stock) <= 0 ? "negative" :
							(Number(d.data[i].Stock) <= Number(d.data[i].Lowstockpoint) ? "warning" : "hoverable-item") +" item-rows";
						row.style.cursor = "pointer";
						row.onclick = function(){
							openItemTimeline(this.id);
						};

						let td0 = document.createElement("td");
						td0.innerHTML =
							"<div class='w3-row'>" +
							"<div class='w3-col l6 m6 s6'> <span style='font-weight: bold;'>"+d.data[i].Name+"</span><br/>" +
							"<small class='blue-text' style='font-weight: bold;'>Product</small></div>" +
							"<div class='w3-col l6 m6 s6 align-r'>"+numFormat(Number(d.data[i].Stock))+" "+
							(Number(d.data[i].Stock) != 1 ? d.data[i].Pluralunit : d.data[i].Unit)+"<br/>" +

							(Number(d.data[i].Stock) <= 0 ? "<small class='red-text' style='font-weight: bold;'>Out of stock</small>" :
								(Number(d.data[i].Stock) <= Number(d.data[i].Lowstockpoint) ?
									"<small class='yellow' style='font-weight: bold;'>Low stock</small>" :
									"<small class='green-text' style='font-weight: bold;'>In stock</small>"))+"</div>" +
							"</div>";


						row.appendChild(td0);
						document.getElementById("timeline-table").appendChild(row);
						row.onclick = function(){openItemTimeline(this.id)};
					}

					let rows = document.getElementsByClassName("item-rows");
					if(rows.length > 0)
					{
						rows[0].click();
					}
				}
				else if(d.status == "access_denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populatePurchaseRequest(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.filter = "all";
		request.item_type = $("#inventory-item-type").val();
		request.searchterm = $("#search-txt").val();
		request.job = "get purchase requests";

		if($("#fulfilled-pr-tab").hasClass("active"))
		{
			request.filter = "fulfilled";
		}
		if($("#processing-pr-tab").hasClass("active"))
		{
			request.filter = "processing";
		}
		if($("#pending-pr-tab").hasClass("active"))
		{
			request.filter = "pending";
		}

		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(8));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					$("#all-pr-label").html(d.All);
					$("#fulfilled-pr-label").html(d.Fulfilled);
					$("#processing-pr-label").html(d.Processing);
					$("#pending-pr-label").html(d.Pending);


					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateInventoryItems"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No purchase requests in this listing</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Reference;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Items.length;

						let td3 = document.createElement("td");
						td3.innerHTML = $("#currency-symbol").val()+numFormat(Number(d.data[i].Total).toFixed(2));

						let td4 = document.createElement("td");
						td4.innerHTML = typeof(d.data[i].User) != "string" ?
							((d.data[i].User.Id != "") ? d.data[i].User.Name+" "+d.data[i].User.Surname :
								"<span class='red'>Suspended or removed</span>") :
								"<span class='red'>Unknown user</span>";

						let td5 = document.createElement("td");
						td5.innerHTML = d.data[i].Created.WeekDay+", "+
							d.data[i].Created.MonthName+"/"+
							d.data[i].Created.Day+"/"+
							d.data[i].Created.Year;


						let td6 = document.createElement("td");
						td6.innerHTML = d.data[i].Fulfilled == true ? "<label class='green-back status'>Fullfilled</label>" :
							((d.data[i].Order_reference == "") ? "<label class='red-back status'>Pending</label>" :
								"<label class='yellow-back status'>Processing</label>");


						let pPath = "";
						if(d.data[i].Type === "bar_pr")
						{
							pPath = "#bar-"
						}
						if(d.data[i].Type === "kitchen_pr")
						{
							pPath = "#kitchen-";
						}
						if(d.data[i].Type === "pastry_pr")
						{
							pPath = "#pastry-";
						}
						if(d.data[i].Type === "pool_pr")
						{
							pPath = "#pool-";
						}
						if(d.data[i].Type === "room_pr")
						{
							pPath = "#room-";
						}
						if(d.data[i].Type === "store_pr")
						{
							pPath = "#store-";
						}
						if(d.data[i].Type === "laundry_pr")
						{
							pPath = "#laundry-";
						}


						let td7 = document.createElement("td");
						td7.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='"+pPath+(d.data[i].Order_reference == "" ? "pr/"+d.data[i].Id : "po/"+d.data[i].Order_reference)+"' class='item'><i class='eye icon'></i>Open</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmPrDelete('"+d.data[i].Id+"')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);

						//optional fields
						/*
                        row.appendChild(td14);
                        */

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	let prItems = [];
	let prSuppliers = [];
	function populatePurchaseRequestData()
	{
		let request = {
			item_type: $("#inventory-item-type").val(),
			prid:getArg(),
			job: "get purchase request"
		};

		$("#table-body").html(tableLoader(6));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success
					prSuppliers = d.Suppliers;

					$("#total-con").html(numFormat(Number(d.data.Total).toFixed(2)));
					$("#item-count-con").html(numFormat(Number(d.data.Items.length)));

					if(d.data.Items.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>" +
							"Invalid request. Request order may have been generated already</h6>" +
							"</div></td></tr>");
					}

					if(d.data.Order_reference != "")
					{
						let pPath = "";
						if(request.item_type === "bar_item")
						{
							pPath = "#bar-po/"
						}
						if(request.item_type === "kitchen_item")
						{
							pPath = "#kitchen-po/";
						}
						if(request.item_type === "pastry_item")
						{
							pPath = "#pastry-po/";
						}
						if(request.item_type === "pool_item")
						{
							pPath = "#pool-po/";
						}
						if(request.item_type === "room_item")
						{
							pPath = "#room-po/";
						}
						if(request.item_type === "store_item")
						{
							pPath = "#store-po/";
						}
						if(request.item_type === "laundry_item")
						{
							pPath = "#laundry-po/";
						}

						$("#pr-generate-btn").prop("disabled", true);

						$("#table-body").html("<tr><td colspan='6'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>" +
							"The order for this request have been generated already</h6>" +
							"<br/>" +
							"<a href='"+pPath+d.data.Order_reference+"'>" +
							"<button class='ui sleak blue button'>Goto request</button>" +
							"</a>" +
							"</div></td></tr>");
					}
					else
					{
						for(let i = 0; i < d.data.Items.length; i++)
						{
							let row = document.createElement("tr");
							row.id = d.data.Items[i].Item.Id;
							row.className = "item-row";

							let td0 = document.createElement("td");
							td0.innerHTML = "<span>" +(i + 1)+ "</span>";


							let td1 = document.createElement("td");
							td1.innerHTML = d.data.Items[i].Item.Name;


							let td2 = document.createElement("td");
							td2.id = d.data.Items[i].Item.Id+"-quantity";
							td2.innerHTML = d.data.Items[i].Quantity;

							let td3 = document.createElement("td");
							td3.innerHTML = "<input id='"+d.data.Items[i].Item.Id+"-rate' type='hidden' value='"+Number(d.data.Items[i].Rate)+"'/>"+
								$("#currency-symbol").val()+numFormat(Number(d.data.Items[i].Rate).toFixed(2));

							let td4 = document.createElement("td");
							td4.innerHTML = $("#currency-symbol").val()+numFormat((Number(d.data.Items[i].Quantity) * Number(d.data.Items[i].Rate)).toFixed(2));

							let td5 = document.createElement("td");

							let options = "";
							for(let j = 0; j < d.data.Items[i].Item.Suppliers.length; j++)
							{
								options += "<option value='"+d.data.Items[i].Item.Suppliers[j].Id+"'>" +
									(d.data.Items[i].Item.Suppliers[j].Company != "" ?
										d.data.Items[i].Item.Suppliers[j].Company :
										d.data.Items[i].Item.Suppliers[j].Contactperson) +
									"</option>";
							}

							let genOptions = "";
							for(let j = 0; j < d.Suppliers.length; j++)
							{
								genOptions += "<option value='"+d.Suppliers[j].Id+"'>" +
									(d.Suppliers[j].Company != "" ?  d.Suppliers[j].Company : d.Suppliers[j].Contactperson)+
									"</option>";
							}
							td5.innerHTML = "<div>" +
								"<label><input class='with-gap' name='supplier-type-"+d.data.Items[i].Id+"' type='radio' "+
								(d.data.Items[i].Item.Suppliers.length == 0 ? "disabled" : "checked")+
								" onclick=\"populateSuppliers('"+d.data.Items[i].Item.Id+"', 'assoc', this)\"/>" +
								"<span>Associated</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"<label><input class='with-gap' name='supplier-type-"+d.data.Items[i].Id+"' type='radio'" +
								(d.data.Items[i].Item.Suppliers.length == 0 ? "checked" : "")+
								" onclick=\"populateSuppliers('"+d.data.Items[i].Item.Id+"', 'added', this)\"/>" +
								"<span>Added &nbsp;&nbsp;&nbsp;&nbsp;(suppliers)</span></label><br/>" +
								"<select id='"+d.data.Items[i].Item.Id+"-select' class='ui fluid dropdown'><option value=''>Select supplier</option>"+
								(d.data.Items[i].Item.Suppliers.length > 0 ? options : genOptions)+"</select>" +
								"</div>";


							prItems.push(d.data.Items[i]);


							let prPath = "";
							if(request.item_type === "bar_pr")
							{
								prPath = "#bar-pr"
							}
							if(request.item_type === "kitchen_pr")
							{
								prPath = "#kitchen-pr";
							}
							if(request.item_type === "pastry_pr")
							{
								prPath = "#pastry-pr";
							}
							if(request.item_type === "pool_pr")
							{
								prPath = "#pool-pr";
							}
							if(request.item_type === "room_pr")
							{
								prPath = "#room-pr";
							}
							if(request.item_type === "store_pr")
							{
								prPath = "#store-pr";
							}
							if(request.item_type === "laundry_pr")
							{
								prPath = "#laundry-pr";
							}


							row.appendChild(td0);
							row.appendChild(td1);
							row.appendChild(td2);
							row.appendChild(td3);
							row.appendChild(td4);
							row.appendChild(td5);

							document.getElementById("table-body").appendChild(row);
						}

						$(".ui.dropdown").dropdown();
					}
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateSinglePurchaseOrder(e)
	{
		let request = {};
		request.item_type = $("#inventory-item-type").val();
		request.reference = e;
		request.job = "get purchase order";

		$("#order-table-list").html(
            "<div class='w3-row'>" +
            "<div class='w3-col l8 m12 s12'>" +
            "<div class='l-width-xl'>" +
            "<table class='ui celled structured table'>" +
            "<thead>" +
            "    <tr>" +
            "      <th>Item</th>" +
            "      <th>Quantity</th>" +
            "      <th>Rate</th>" +
            "      <th>Price</th>" +
            "      <th>Received</th>" +
            "    </tr>" +
            "  </thead>" +
            "  <tbody id='table-body'>" +
            "  </tbody>" +
            "</table>" +
            "</div>" +
            "</div>" +
            "<div class='w3-col l4 m12 s12'>" +
            "<table class='ui celled structured table'>" +
            "<thead>" +
            "    <tr>" +
            "      <th>Supplier</th>" +
            "      <th id='supplier-0'></th>" +
            "    </tr>" +
            "  </thead>" +
            "  <tbody id='suppliers-table-body'>" +
            "  </tbody>" +
            "</table>" +
            "</div>" +
            "</div>");

		$("#table-body").html(tableLoader(5));
		$("#suppliers-table-body").html(tableLoader(2));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");
			$("#suppliers-table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success
					if (d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='" + FRONTDESK_CDN + "images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No quotation document found</h6>" +
							"</div></td></tr>");
					}
					else
					{
						$("#order-table-list").html("");

						for(let i = 0; i < d.data.length; i++)
						{
							let con = document.createElement("div");
							con.style.marginTop = "20px";
							con.className = "w3-row";

							let tots = 0;
							for(let k = 0; k < d.data[i].Items.length; k++)
                            {
                                tots += (Number(d.data[i].Items[k].Supplied) * Number(d.data[i].Items[k].Rate));
                            }

							con.innerHTML =
								"<div class='w3-col l8 m12 s12'>" +
								"<div class='l-width-xl'>" +
								"<table class='ui celled structured table'>" +
								"<thead>" +
								"    <tr>" +
								"      <th>Item</th>" +
								"      <th>Quantity</th>" +
								"      <th>Rate</th>" +
								"      <th>Price</th>" +
								"      <th>Received</th>" +
								"    </tr>" +
								"  </thead>" +
								"  <tbody id='"+d.data[i].Id+"-table-body'>" +
								"  </tbody>" +
								"</table>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l4 m12 s12'>" +
								"<table class='ui celled structured table'>" +
								"<thead>" +
								"    <tr>" +
								"      <th>Supplier</th>" +
								"      <td class='align-r blue' style='font-weight: bold;'>"+
                                            (d.data[i].Supplier.Company != "" ?
                                            d.data[i].Supplier.Company : d.data[i].Supplier.Contactperson)+
                                "       </td>" +
								"    </tr>" +
                                "    <tr>" +
                                "      <th>Total</th>" +
                                "      <td>"+
                                        "<span style='font-weight: normal;'>"+$("#currency-symbol").val()+"</span> "+
                                        numFormat(Number(d.data[i].Total).toFixed(2))+
                                "       </td>" +
                                "    </tr>" +
                                "    <tr>" +
                                "      <th>Generated by</th>" +
                                "      <td>" +
                                            d.data[i].User.Name+" "+d.data[i].User.Surname+
                                "       </td>" +
                                "    </tr>" +
                                "    <tr>" +
                                "      <td>Print order</td>" +
                                "      <td>" +
                                "           <button id='"+d.data[i].Id+"-print-btn' " +
                                "               class='ui blue icon basic button' " +
                                "               onclick=\"getOrderPrintSession('"+d.data[i].Id+"')\">" +
                                "               <i class='print icon'></i>" +
                                "           </button>"+
                                        (d.data[i].Received ?
                                "           <button id='"+d.data[i].Creditnote+"-print-btn' " +
                                "               class='ui blue sleak icon button' " +
                                "               onclick=\"getOrderCreditPrintSession('"+d.data[i].Creditnote+"')\">" +
                                "               Print Credit Note" +
                                "           </button>": "") +
                                "       </td>" +
                                "    </tr>" +
                                (d.data[i].Received ?
                                    "    <tr>" +
                                    "      <td>Receiver</td>" +
                                    "      <td>"+d.data[i].Receiver.Name+" "+d.data[i].Receiver.Surname+"</td>" +
                                    "</tr>" : ""
                                ) +
                                    (d.data[i].Received ? "" :
                                "    <tr>" +
                                "      <td>Send order</td>" +
                                "      <td class='align-r blue'>" +
                                "           <div class='ui compact small buttons'>" +
                                "               <button id='"+d.data[i].Id+"-sms-btn' class='ui blue sleak compact button' " +
                                                    (d.data[i].Supplier.Phone == "" ? "disabled" : "onclick=\"sendOrderBySMS('"+d.data[i].Id+"')\">") +
                                "                   <i class='open envelope icon'></i> SMS" +
                                "               </button>" +
                                "               <div class='or blue'></div>"+
                                "               <button id='"+d.data[i].Id+"-email-btn' class='ui blue sleak compact button' " +
                                                    (d.data[i].Supplier.Email == "" ? "disabled" : "onclick=\"sendOrderByMail('"+d.data[i].Id+"')\">") +
                                "                   <i class='at icon'></i> E-mail" +
                                "               </button>" +
                            "               </div>"+
                                "       </td>" +
                                "    </tr>")+
                                "    <tr>" +
                                        (d.data[i].Received ?
                                "       <td>Received amount</td>" +
                                "        <td>"+$("#currency-symbol").val()+numFormat(tots.toFixed(2))+"</td>"
                                        :
                                "      <th>Receive</th>" +
                                "      <td class='align-r blue'>"+
                                "           <button id='"+d.data[i].Id+"-received-btn' class='ui green compact button' " +
                                "               onclick=\"confirmReceived('"+d.data[i].Id+"')\">" +
                                "               <i class='check icon'></i> Mark received" +
                                "           </button>"+
                                "       </td>"
                                )
                                "    </tr>" +
								"  </thead>" +
								"  <tbody id='suppliers-table-body'>" +
								"  </tbody>" +
								"</table>" +
								"</div>" +
								"</div>";

							getElement("order-table-list").appendChild(con);

							for(let j = 0; j < d.data[i].Items.length; j++)
                            {
                                let row = document.createElement("tr");

                                let td1 = document.createElement("td");
                                td1.innerHTML = d.data[i].Items[j].Item.Name;

                                let td2 = document.createElement("td");
                                td2.innerHTML = numFormat(Number(d.data[i].Items[j].Quantity));

                                let td3 = document.createElement("td");
                                td3.innerHTML = numFormat(Number(d.data[i].Items[j].Rate).toFixed(2));

                                let td4 = document.createElement("td");
                                td4.innerHTML = numFormat((Number(d.data[i].Items[j].Quantity) * (Number(d.data[i].Items[j].Rate))).toFixed(2));

                                let td5 = document.createElement("td");
                                td5.innerHTML =
                                    "<input class='"+d.data[i].Id+"-rec-qty' id='"+d.data[i].Items[j].Id+"' " +
                                    "type='text' value='"+Number(d.data[i].Items[j].Supplied)+"' style='padding: 5px; border: 0px; max-width: 100px;" +
                                    "background-color: white;' "+(d.data[i].Received ? "disabled" : "")+"/>";

                                row.appendChild(td1);
                                row.appendChild(td2);
                                row.appendChild(td3);
                                row.appendChild(td4);
                                row.appendChild(td5);

                                getElement(d.data[i].Id+"-table-body").appendChild(row);
                            }
						}
					}
				}
				else if(d.status == "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populatePriceEnquiary(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.item_type = $("#inventory-item-type").val();
		request.searchterm = $("#search-txt").val();
		request.job = "get price enquiries";

		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(8));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populatePriceEnquiary"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No quotation document found</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Displayreference;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Items.length;

						let td3 = document.createElement("td");
						td3.innerHTML = numFormat(Number(d.data[i].Suppliers.length));

						let td4 = document.createElement("td");
						td4.innerHTML = d.data[i].Sms ? "<i class='mobile blue icon'></i>SMS<br/>" : "";
						td4.innerHTML += d.data[i].Email ? "<i class='at blue icon'></i>Email" : "";

						let td5 = document.createElement("td");
						td5.innerHTML = d.data[i].Created.WeekDay+", "+
							d.data[i].Created.MonthName+"/"+
							d.data[i].Created.Day+"/"+
							d.data[i].Created.Year;


						let td6 = document.createElement("td");
						td6.innerHTML = d.data[i].Responsecomplete == true ? "<label class='green-back status'>Responded</label>" :
								"<label class='yellow-back status'>Waiting</label>";


						let prPath = "";
						if(d.data[i].Type === "bar_quotation")
						{
							prPath = "#bar-quotation"
						}
						if(d.data[i].Type === "kitchen_quotation")
						{
							prPath = "#kitchen-quotation";
						}
						if(d.data[i].Type === "pastry_quotation")
						{
							prPath = "#pastry-quotation";
						}
						if(d.data[i].Type === "pool_quotation")
						{
							prPath = "#pool-quotation";
						}
						if(d.data[i].Type === "room_quotation")
						{
							prPath = "#room-quotation";
						}
						if(d.data[i].Type === "store_quotation")
						{
							prPath = "#store-quotation";
						}
						if(d.data[i].Type === "laundry_quotation")
						{
							prPath = "#laundry-quotation";
						}


						let td7 = document.createElement("td");
						td7.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='"+prPath+"/"+d.data[i].Id+"' class='item'><i class='eye icon'></i>Open</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"ConfirmQuotationDelete('"+d.data[i].Id+"')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);

						//optional fields
						/*
                        row.appendChild(td14);
                        */

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateSinglePriceEnquiry(e)
	{
		let request = {};
		request.item_type = $("#inventory-item-type").val();
		request.quotid = e;
		request.job = "get price enquiry";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(5));
		$("#suppliers-table-body").html(tableLoader(2));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");
			$("#suppliers-table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success
					if(d.data.Items.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No quotation document found</h6>" +
							"</div></td></tr>");
					}

					for(let i = 0; i < d.data.Items.length; i++)
					{
						let row = document.createElement("tr");

						let td0 = document.createElement("td");
						td0.innerHTML = d.data.Items[i].Item.Name;
						td0.rowSpan = d.data.Items[i].Pixel.length > 0 ?
							d.data.Items[i].Pixel.length : 1;

						let td1 = document.createElement("td");
						td1.innerHTML = numFormat(Number(d.data.Items[i].Quantity));
						td1.rowSpan = d.data.Items[i].Pixel.length > 0 ?
							d.data.Items[i].Pixel.length : 1;

						let td2 = document.createElement("td");
						if(d.data.Items[i].Pixel.length > 0)
						{
							td2.innerHTML = d.data.Items[i].Pixel[0].Supplier.Company != "" ?
								d.data.Items[i].Pixel[0].Supplier.Company : d.data.Items[i].Pixel[0].Supplier.Contactperson;
						}
						else
						{
							td2.innerHTML = "<span class='red'>Item has no suppliers</span>";
						}


						let td3 = document.createElement("td");
						if(d.data.Items[i].Pixel.length > 0)
						{
							td3.innerHTML = $("#currency-symbol").val()+
							numFormat(Number(d.data.Items[i].Pixel[0].Price).toFixed(2));
						}
						else
						{
							td3.innerHTML = "<span class='red'>Item has no suppliers</span>";
						}

						let td4 = document.createElement("td");
						if(d.data.Items[i].Pixel.length > 0)
						{
							td4.innerHTML = $("#currency-symbol").val() +
								numFormat(Number(d.data.Items[i].Pixel[0].Price * d.data.Items[i].Quantity).toFixed(2));
						}
						else
						{
							td4.innerHTML = "<span class='red'>Item has no suppliers</span>";
						}

						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);

						document.getElementById("table-body").appendChild(row);

						if(d.data.Items[i].Pixel.length > 1)
						{
							for(let j = 1; j < d.data.Items[i].Pixel.length; j++)
							{
								let r = document.createElement("tr");

								let sup = document.createElement("td");
								sup.innerHTML = d.data.Items[i].Pixel[j].Supplier.Company != ""  ?
								d.data.Items[i].Pixel[j].Supplier.Company :
								d.data.Items[i].Pixel[j].Supplier.Contactperson;

								let price = document.createElement("td");
								price.innerHTML = $("#currency-symbol").val()+
									numFormat(Number(d.data.Items[i].Pixel[j].Price).toFixed(2));


								let tot = document.createElement("td");
								tot.innerHTML = $("#currency-symbol").val()+
									numFormat(Number(d.data.Items[i].Pixel[j].Price * d.data.Items[i].Quantity).toFixed(2));

								r.appendChild(sup);
								r.appendChild(price);
								r.appendChild(tot);

								document.getElementById("table-body").appendChild(r);
							}

						}
					}


					for(let i = 0; i < d.data.Suppliers.length; i++)
					{
						let row = document.createElement("tr");

						let td0 = document.createElement("td");
						td0.innerHTML = (d.data.Suppliers[i].Company != "" ?
							d.data.Suppliers[i].Company :
							d.data.Suppliers[i].Contactperson);

						let td1 = document.createElement("td");
						td1.innerHTML = "<button class='ui blue icon button' " +
							"onclick=\"resendQuotation(this, '"+getArg()+"','"+d.data.Suppliers[i].Id+"')\">" +
							"<i class='paper plane icon'></i></button>";

						row.appendChild(td0);
						row.appendChild(td1);

						document.getElementById("suppliers-table-body").appendChild(row);
					}

				}
				else if(d.status == "access denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateAudits(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.item_type = $("#inventory-item-type").val();
		request.searchterm = $("#search-txt").val();
		request.job = "get inventory audits";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(8));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateInventoryItems"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No Audits in this listing</h6>" +
							"</div></td></tr>");
					}

					for(let i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Title;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Created.WeekDay+", "+
							d.data[i].Created.MonthName+"/"+
							d.data[i].Created.Day+"/"+
							d.data[i].Created.Year;

						let td3 = document.createElement("td");
						td3.innerHTML = numFormat(d.data[i].Items.length);

						let td4 = document.createElement("td");
						td4.innerHTML = numFormat(Number(d.Itemscount) - d.data[i].Items.length);

						let td5 = document.createElement("td");
						td5.innerHTML = "<span style='color: dimgray;'>Items: </span>"+
							"<span style='color: dimgray;'>" +numFormat(Number(d.data[i].Surplus))+"</span></span><br/>" +
							"<span style='color: dimgray;'>Total: </span>"+
							"<span style='color: dimgray;'>" +numFormat(Number(d.data[i].Surplustotal))+"</span></span>";


						let td6 = document.createElement("td");
						td6.innerHTML = "<span style='color: dimgray;'>Items: </span>"+
							"<span style='color: dimgray;'>" +numFormat(Number(d.data[i].Shortage))+"</span></span><br/>" +
							"<span style='color: dimgray;'>Total: </span>"+
							"<span style='color: dimgray;'>" +numFormat(Number(d.data[i].Shortagetotal))+"</span></span>";


						let prPath = "";
						if(d.data[i].Type === "bar_audit")
						{
							prPath = "#bar-audit"
						}
						if(d.data[i].Type === "kitchen_audit")
						{
							prPath = "#kitchen-audit";
						}
						if(d.data[i].Type === "pastry_audit")
						{
							prPath = "#pastry-audit";
						}
						if(d.data[i].Type === "pool_audit")
						{
							prPath = "#pool-audit";
						}
						if(d.data[i].Type === "room_audit")
						{
							prPath = "#room-audit";
						}
						if(d.data[i].Type === "store_audit")
						{
							prPath = "#store-audit";
						}
						if(d.data[i].Type === "laundry_audit")
						{
							prPath = "#laundry-audit";
						}

						let c = {id:d.data[i].Id, title:d.data[i].Title};

						let td7 = document.createElement("td");
						td7.innerHTML = "<div class='w3-container'> " +
							"<div id='"+ d.data[i].Id +"-btn' class='ui icon top right pointing dropdown button c-menu s-float-r'>" +
							"<i class='blue wrench icon'></i>" +
							"<div class='menu'>" +
							"<div class='header'>Action</div>" +
							"<a href='"+prPath+"/"+d.data[i].Id+"' class='item'><i class='eye icon'></i>Open</a>" +
							"<div class='ui divider'></div>" +
							"<div class='item' onclick=\"launchAddInventoryAudit('"+escape(JSON.stringify(c))+"')\"><i class='pencil icon'></i>Edit title</div>" +
							"<div class='item' onclick=\"ConfirmAuditDelete('"+d.data[i].Id+"')\"><i class='trash icon'></i>Delete</div>" +
							"</div>" +
							"</div></div>";


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);

						//optional fields
						/*
                        row.appendChild(td14);
                        */

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateSingleAudit(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.item_type = $("#inventory-item-type").val();
		request.searchterm = $("#search-txt").val();
		request.auditid = getArg();
		request.job = "get inventory audit";


		let audutItems = [];


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(6));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{

					for(let i = 0; i < d.data.Audits.Items.length; i++)
					{
						audutItems.push(d.data.Audits.Items[i].Item);
					}

					$("#accurate-count-con").html(numFormat(Number(d.data.Audits.Accuratestock)));
					$("#shortage-count-con").html(numFormat(Number(d.data.Audits.Shortagestock)));
					$("#surplus-count-con").html(numFormat(Number(d.data.Audits.Surplusstock)));


					//on success
					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateInventoryItems"));

					if(d.data.Items.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No Items to audit</h6>" +
							"</div></td></tr>");
					}


					for(let i = 0; i < d.data.Items.length; i++)
					{

						if(((getElement("remove-audited").checked) && (!audutItems.includes(d.data.Items[i].Id))) || (!getElement("remove-audited").checked))
						{
							let row = document.createElement("tr");
							row.id = d.data.Items[i].Id + "-row";

							let td0 = document.createElement("td");
							td0.innerHTML = sn;

							let td1 = document.createElement("td");
							td1.innerHTML = d.data.Items[i].Image == "" ?
								"<img src='"+phpvars.FRONTDESK_CDN+"/images/icons/pastel/imageplaceholder.png'/>" :
								"<img src='files/"+d.data.Items[i].Image+"' style='width: 80px; border-radius: 3px;'/>";


							let td2 = document.createElement("td");
							td2.innerHTML = d.data.Items[i].Name;

							let td3 = document.createElement("td");
							let td4 = document.createElement("td");
							let td5 = document.createElement("td");

							if(audutItems.includes(d.data.Items[i].Id))
							{
								for(let j = 0; j < d.data.Audits.Items.length; j++)
								{
									if(d.data.Audits.Items[j].Item == d.data.Items[i].Id)
									{
										row.className = ((Number(d.data.Audits.Items[j].Counted) == Number(d.data.Audits.Items[j].Stock)) ?
											"" : ((Number(d.data.Audits.Items[j].Counted) > Number(d.data.Audits.Items[j].Stock)) ?
												"positive" : "negative"));


										td3.innerHTML = numFormat(Number(d.data.Audits.Items[j].Counted)) + " <span style='color: lightgray;'>" +
											(Number(d.data.Audits.Items[j].Counted) != 1 ?
												d.data.Items[i].Pluralunit : d.data.Items[i].Pluralunit) + "</span>";


										td4.innerHTML = ((Number(d.data.Audits.Items[j].Counted) == Number(d.data.Audits.Items[j].Stock)) ?
											"<i class='check green icon'></i> Accurate" :
											((Number(d.data.Audits.Items[j].Counted) > Number(d.data.Audits.Items[j].Stock)) ?
												"<i class='up arrow blue icon'></i> Surplus" :
												"<i class='down arrow red icon'></i> Shortage"));


										td5.innerHTML = ((Number(d.data.Audits.Items[j].Counted) == Number(d.data.Audits.Items[j].Stock)) ?
											0 :
											((Number(d.data.Audits.Items[j].Counted) > Number(d.data.Audits.Items[j].Stock)) ?
												numFormat(Number(d.data.Audits.Items[j].Counted) - Number(d.data.Audits.Items[j].Stock)) :
												numFormat(Number(d.data.Audits.Items[j].Stock) - Number(d.data.Audits.Items[j].Counted)))) +

											" <span style='color: lightgray;'>" +
											(Number(d.data.Audits.Items[j].Counted) != 1 ?
												d.data.Items[i].Pluralunit : d.data.Items[i].Pluralunit) + "</span>";
									}
								}
							}
							else
							{
								td3.id = "count-row-"+d.data.Items[i].Id;
								td3.innerHTML = "<div class='ui input'>" +
									"<input id='"+d.data.Items[i].Id+"-count' type='text' value='0' style='border: none;'/>" +
									"</div>" +
									"<button class='ui blue sleak small button' " +
									"onclick=\"saveAudit('"+d.data.Items[i].Id+"','"+d.data.Audits.Id+"',this)\">" +
									"Save</button>";
								td3.colSpan = 3;
							}



							row.appendChild(td0);
							row.appendChild(td1);
							row.appendChild(td2);
							row.appendChild(td3);
							if(audutItems.includes(d.data.Items[i].Id))
							{
								row.appendChild(td4);
								row.appendChild(td5);
							}
							sn++;

							document.getElementById("table-body").appendChild(row);
						}
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateGeneralSettings()
	{
		let request = {
			item_type : $("#inventory-item-type").val(),
			job:"get settings"
		};

		//settings page loading
		//$(".settings-con").addClass("ui loading form");
		$(".settings-control").prop("disabled", true);
		$(".settings-text").addClass("ui placeholder");
		$(".settings-text").css("color","transparent");

		postJson("hms-admin/worker", function(data, status){
			$(".settings-text").removeClass("ui placeholder");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$(".settings-control").prop("disabled", false);
					$(".settings-text").css("color","dimgray");


					$("#receipt-name").html(d.data.Receipttemplate);

					if(getElement("receipt-image") != null)
					{
						getElement("receipt-image").src = FRONTDESK_CDN+"/hms/pages/receipt/"+d.data.Receipttemplate+"/default.jpg";
					}

					$("#receipttemplate").val(d.data.Receipttemplate);
					$("#lowstockemail").val(d.data.Lowstockemail);
					$("#lowstockphone").val(d.data.Lowstockphone);
					$("#onlineorderphone").val(d.data.Onlineorderphone);
					getElement("receiptaddess").checked = d.data.Receiptaddress;
					getElement("receiptemail").checked = d.data.Receiptemail;
					getElement("receiptlogo").checked = d.data.Receiptlogo;
					getElement("receiptsalutation").checked = d.data.Receiptsalutation;
					getElement("cash_pay").checked = d.data.Cash;
					getElement("pos_pay").checked = d.data.Pos;

					getElement("online_pay").checked = d.data.Online;
					getElement("other_pay").checked = d.data.Others;
					getElement("refund").checked = d.data.Refund;
					getElement("compound_tax").checked = d.data.Compundtax;

					$("#salutation").val(d.data.Salutation);

					if(d.data.Papertype === "a4")
					{
						getElement("a4").checked = true;
						getElement("letter").checked = false;
						getElement("mm58").checked = false;
						getElement("mm80").checked = false;
					}
					if(d.data.Papertype === "letter")
					{
						getElement("a4").checked = false;
						getElement("letter").checked = true;
						getElement("mm58").checked = false;
						getElement("mm80").checked = false;
					}
					if(d.data.Papertype === "58mm")
					{
						getElement("a4").checked = false;
						getElement("letter").checked = false;
						getElement("mm58").checked = true;
						getElement("mm80").checked = false;
					}
					if(d.data.Papertype === "80mm")
					{
						getElement("a4").checked = false;
						getElement("letter").checked = false;
						getElement("mm58").checked = false;
						getElement("mm80").checked = true;
					}
				}
				else
				{
					$(".settings-text").css("color","lightgray");
					$(".settings-control").prop("disabled", true);
                    $("#error-pane-text").html(d.message);
                    $("#error-pane").transition("drop in");
				}
			}
			else
			{
				$(".settings-text").css("color","lightgray");
				$(".settings-control").prop("disabled", true);
                $("#error-pane-text").html("Connection error. Check your connection and try again");
                $("#error-pane").transition("drop in");
			}
		},request);
	}

    function populateMessageSettings()
    {
        let request = {
            item_type : $("#inventory-item-type").val(),
            job:"get message settings"
        };

        $(".settings-control").prop("disabled", true);
        $(".settings-text").addClass("ui placeholder");
        $(".settings-text").css("color","transparent");

        postJson("hms-admin/worker", function(data, status){
            $(".settings-text").removeClass("ui placeholder");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    $(".settings-control").prop("disabled", false);
                    $(".settings-text").css("color","dimgray");


                    $("#sms-unti-con").html(d.SMSUnits);
                    $("#low-unit-phone").val(d.data.Lowunitphone);
                    $("#ononiru-message-api-key").val(d.data.Ononiruapikey);
                    $("#low-uint-point").val(d.data.Lowunitpoint);

                    $("#buy_units_link").attr("href", "https://gigahotels.com/client/smsunits/"+d.token);

                    if(d.data.Tagprocessing === "remove")
                    {
                        getElement("remove-tag").checked = true;
                        getElement("leave-tag").checked = false;
                        getElement("cancel-tag").checked = false;
                    }
                    if(d.data.Tagprocessing === "leave")
                    {
                        getElement("remove-tag").checked = false;
                        getElement("leave-tag").checked = true;
                        getElement("cancel-tag").checked = false;
                    }
                    if(d.data.Tagprocessing === "cancel")
                    {
                        getElement("remove-tag").checked = false;
                        getElement("leave-tag").checked = false;
                        getElement("cancel-tag").checked = true;
                    }
                }
                else
                {
                    $(".settings-text").css("color","lightgray");
                    $(".settings-control").prop("disabled", true);
                    $("#error-pane-text").html(d.message);
                    $("#error-pane").transition("drop in");
                }
            }
            else
            {
                $(".settings-text").css("color","lightgray");
                $(".settings-control").prop("disabled", true);
                $("#error-pane-text").html("Connection error. Check your connection and try again");
                $("#error-pane").transition("drop in");
            }
        },request);
    }

	function populateSystemLog(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.start_date = $("#from-date").val();
		request.stop_date = $("#to-date").val();
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get system log";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(5));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateSystemLog"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='5'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No rescord in the time span</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Created.WeekDay+", "+d.data[i].Created.Day+"/"+
							d.data[i].Created.MonthName+"/"+d.data[i].Created.Year;

						let td2 = document.createElement("td");
						td2.innerHTML = "<span class='status green-back'>"+d.data[i].Event+"</span>";

						let td3 = document.createElement("td");
						td3.innerHTML = d.data[i].Source;

						let td4 = document.createElement("td");
						td4.innerHTML = d.data[i].Description;


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						//optional fields
						/*
						row.appendChild(td14);
						*/

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populateEventLog(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.start_date = $("#from-date").val();
		request.stop_date = $("#to-date").val();
		request.Filter = "search list";
		request.Filtervalue = $("#search-txt").val();
		request.job = "get event log";


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(5));

		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateSystemLog"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='5'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No rescord in the time span</h6>" +
							"</div></td></tr>");
					}

					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id + "-row";

						let td0 = document.createElement("td");
						td0.innerHTML = "<label><input id='"+d.data[i].Id+"' class='check-sel' type='checkbox' onchange='CheckProcess()'><span>" + sn + "</span></label>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Created.WeekDay+", "+d.data[i].Created.Day+"/"+
							d.data[i].Created.MonthName+"/"+d.data[i].Created.Year;

						let td2 = document.createElement("td");
						td2.innerHTML = "<span class='status green-back'>"+d.data[i].Event+"</span>";

						let td3 = document.createElement("td");
						td3.innerHTML = d.data[i].Source;

						let td4 = document.createElement("td");
						td4.innerHTML = d.data[i].Description;


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						//optional fields
						/*
						row.appendChild(td14);
						*/

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	let line = null;
	let donut = null;
	function populatePOSReport(e)
	{
		let request = {
			start_date:$("#from-date").val(),
			stop_date:$("#to-date").val(),
			item_type:$("#report-item-type").val(),
			plotCriteria:"customer",
			job:"get pos report"
		};

		if(!$("#plot-customer").hasClass("blue"))
		{
			request.plotCriteria = "items";
		}

		//loaders
		if((e == null) || (e === true))
		{
			$("#pos-list-con").html("");
			for(let i = 0; i < 2; i++)
			{
				let pos = document.createElement("div");
				pos.innerHTML = "<div class='widget curve w3-card pad-1 w3-row' style='margin-bottom: 3px;'>" +
					"<div class='w3-col l2 m4 s6' style='padding: 5px;'>" +
					"<div class='ui placeholder'>" +
					"<div class='line'></div>"+
					"</div>" +
					"</div>" +
					"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>"+
					"<div class='ui placeholder'>" +
					"<div class='line'></div>"+
					"</div>" +
					"</div>" +
					"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>" +
					"<div class='ui placeholder'>" +
					"<div class='line'></div>"+
					"</div>" +
					"</div>" +
					"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>" +
					"<div class='ui placeholder'>" +
					"<div class='line'></div>"+
					"</div>" +
					"</div>" +
					"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>" +
					"<div class='ui placeholder'>" +
					"<div class='line'></div>"+
					"</div>" +
					"</div>" +
					"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>" +
					"<div class='ui placeholder'>" +
					"<div class='line'></div>"+
					"</div>" +
					"</div>" +
					"</div>";

				getElement("pos-list-con").appendChild(pos);
			}
			$(".load-slip").addClass("ui placeholder");

			let load = document.getElementsByClassName("load-slip");
			for(let i = 0; i < load.length; i++)
			{
				if(load[i].getAttribute("color-store") == undefined)
				{
					load[i].setAttribute("color-store", load[i].style.color);
				}
			}
			$(".load-slip").css("color","transparent");
		}

		postJson("hms-admin/worker", function(data, status){
			if((e == null) || (e === true))
			{
				$("#pos-list-con").html("");
				$(".load-slip").removeClass("ui placeholder");
				let load = document.getElementsByClassName("load-slip");
				for(let i = 0; i < load.length; i++)
				{
					if(load[i].getAttribute("color-store") != null)
					{
						load[i].style.color = load[i].getAttribute("color-store");
					}
				}
			}
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					if(getElement("daily-sale-average-graph").innerHTML.length < 10)
					{
						line = Morris.Line({
							element: 'daily-sale-average-graph',
							data:d.data.General.SalesPeriod,
							olddata: [
								{year: '2009', value: null},
								{year: '2010', value: 3},
								{year: '2011', value: 3},
								{year: '2012', value: 1},
								{year: '2013', value: 2},
								{year: '2014', value: 8},
								{year: '2015', value: 4},
								{year: '2016', value: null}
							],
							xkey: 'time',
							ykeys: ['value'],
							gridTextFamily:"quicksandregular",
							gridTextWeight: "bold",
							resize:true,
							gridTextSize:"14px",
							smooth:true,
							parseTime:false,
							//pointFillColors: "",
							//pointStrokeColors: "",
							parseTime:false, //set to false when x values are just data
							pointSize:"5px",
							//goals:[1.0, -1.0],
							//events:['2009','2010','2011','2012','2013','2014','2015','2016'],
							eventStrokeWidth:"1px",
							eventLineColors:["lightgray"],
							axes:true, //remove the text from graph if false
							grid:true, //remove horizontal lines if false
							lineWidth:"3px",
							lineColors:["steelblue"],
							labels: ['value']
						}).on('click', function(i, row){
							console.log(i, row);
						});
					}
					else
					{
						line.setData(d.data.General.SalesPeriod);
					}

					if(getElement("sale-source-donut") != null)
					{
						if(getElement("sale-source-donut").innerHTML.length < 10)
						{
							donut = Morris.Donut({
								element: 'sale-source-donut',
								data: [
									{value: Number(d.data.General.POSChannelSales), label: 'POS', formatted: Math.round(d.data.General.POSChannelSales)+'%' },
									{value: Number(d.data.General.WebChannelSales), label: 'Online', formatted: Math.round(d.data.General.WebChannelSales)+'%' },
								],
								colors:["rgb(33,133,208)","whitesmoke","rgb(49,148,83)","whitesmoke"],
								formatter: function (x, data) { return data.formatted; }
							});
						}
						else
						{
							let data = [
								{value: Number(d.data.General.POSChannelSales), label: 'POS', formatted: Math.round(d.data.General.POSChannelSales)+'%' },
								{value: Number(d.data.General.WebChannelSales), label: 'Online', formatted: Math.round(d.data.General.WebChannelSales)+'%' },
							];
							donut.setData(data);
						}
					}


					let path = "";
					if(request.item_type === "kitchen_item")
					{
						path = "#kitchen-pos-transactions";
					}
					if(request.item_type === "pastry_item")
					{
						path = "#pastry-pos-transactions";
					}
					if(request.item_type === "bar_item")
					{
						path = "#bar-pos-transactions";
					}
					if(request.item_type === "laundry_item")
					{
						path = "#laundry-pos-transactions";
					}
					if(request.item_type === "pool_item")
					{
						path = "#pool-pos-transactions";
					}


					for(let i = 0; i < d.data.Users.length; i++)
					{
						if(getElement(d.data.Users[i].User.Id+"-pos-con") == null)
						{
							let pos = document.createElement("a");
							pos.id = d.data.Users[i].User.Id+"-pos-con";
							pos.setAttribute("href", path+"/"+d.data.Users[i].User.Id);
							pos.innerHTML = "<div class='widget curve hoverable w3-card pad-1 w3-row' style='margin-bottom: 3px; cursor: pointer;'>" +
								"<div class='w3-col l2 m4 s6' style='padding: 5px;'>" +
								"<h5 id='"+d.data.Users[i].User.Id+"pos-user-name' class='sleak' style='color: black;'>"+
								d.data.Users[i].User.Name+" "+d.data.Users[i].User.Surname+"</h5>" +
								"</div>" +
								"<div id='"+d.data.Users[i].User.Id+"pos-status' class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>"+
								(d.data.Users[i].isActive ? "<span class='status green-back'>Active</span>" :
									"<span class='status yellow-back'>Inactive</span>")+"</div>" +
								"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>" +
								"<h5 id='"+d.data.Users[i].User.Id+"pos-item-count' class='sleak' style='color: dimgray; font-weight: bold;'>"+
								numFormat(Number(d.data.Users[i].Itemcount))+"</h5>" +
								"</div>" +
								"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>" +
								"<h5 class='sleak' style='color: dimgray; font-weight: bold;'>" +
								"<span style='font-family: arial; font-weight: normal;'>"+
								$('#currency-symbol').val()+"</span> <span id='"+d.data.Users[i].User.Id+"pos-sold'>"+
								numFormat(Number(d.data.Users[i].Sold).toFixed(2))+"</span></h5>" +
								"</div>" +
								"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>" +
								"<h5 class='sleak' style='color: dimgray; font-weight: bold;'>" +
								"<span style='font-family: arial; font-weight: normal;'>"+
								$('#currency-symbol').val()+"</span> <span id='"+d.data.Users[i].User.Id+"pos-paid'>"+
								numFormat(Number(d.data.Users[i].Paid).toFixed(2))+"</span></h5>" +
								"</div>" +
								"<div class='w3-col l2 m4 s6 align-r' style='padding: 5px;'>" +
								"<h5 class='sleak' style='color: dimgray; font-weight: bold;'>" +
								"<span style='font-family: arial; font-weight: normal;'>"+
								$('#currency-symbol').val()+"</span> <span id='"+d.data.Users[i].User.Id+"pos-balance'>"+
								numFormat(Number(d.data.Users[i].Balance).toFixed(2))+"</h5>" +
								"</div>" +
								"</div>";

							getElement("pos-list-con").appendChild(pos);
						}
						else
						{
							$("#"+d.data.Users[i].User.Id+"pos-user-name").html(d.data.Users[i].User.Name+" "+d.data.Users[i].User.Surname);
							$("#"+d.data.Users[i].User.Id+"pos-status").html((d.data.Users[i].isActive ? "<span class='status green-back'>Active</span>" :
								"<span class='status yellow-back'>Inactive</span>"));
							$("#"+d.data.Users[i].User.Id+"pos-item-count").html(numFormat(Number(d.data.Users[i].Itemcount)));
							$("#"+d.data.Users[i].User.Id+"pos-sold").html(numFormat(Number(d.data.Users[i].Sold).toFixed(2)));
							$("#"+d.data.Users[i].User.Id+"pos-paid").html(numFormat(Number(d.data.Users[i].Paid).toFixed(2)));
							$("#"+d.data.Users[i].User.Id+"pos-balance").html(numFormat(Number(d.data.Users[i].Balance).toFixed(2)));
						}
					}

					$("#general-total-con").html(numFormat(Number(d.data.General.Totalsold).toFixed(2)));
					$("#general-items-con").html(numFormat(Number(d.data.General.Itemcount)));
					$("#general-customers-con").html(numFormat(Number(d.data.General.Customers)));


					if(getElement("most-sold-con") != null)
					{
						$("#most-sold-con").html("");

						if(d.data.General.Salesort.length == 0)
						{
							$("#most-sold-con").html(
								"<div class='align-c pad-4'>" +
								"<h2 class='ui header' style='font-weight: normal; color: lightgray;'><i class='box icon'></i>" +
								"There are no items to show" +
								"</h2>" +
								"</div>");
						}

						for(let i = 0; i < d.data.General.Salesort.length; i++)
						{
							let con = document.createElement("div");
							con.className = "w3-row";
							con.style.borderBottom = "1px solid lightgray";
							con.innerHTML =
								"<div class='w3-col l2 m2 s2 pad-1'>" +
								"<img src='files/"+
								(d.data.General.Salesort[i].Item.Images[0] != null ?
									d.data.General.Salesort[i].Item.Images[0] : "") +
								"' style='max-width: 100%; border-radius: 4px; width: 80px;'/>" +
								"</div>" +
								"<div class='w3-col l7 m7 s7 pad-1'>" +
								"<h6 class='sleak' style='font-weight: bold;'>"+
								d.data.General.Salesort[i].Item.Name+
								"</h6>" +
								"</div>" +
								"<div class='w3-col l3 m3 s3 pad-1 align-r'>" +
								"<h6 class='sleak' style='font-weight: bold;'>"+
								numFormat(Number(d.data.General.Salesort[i].Quantity)) +
								" sold</h6>" +
								"</div>";

							getElement("most-sold-con").appendChild(con);

							if(i >= 4)
							{
								break;
							}
						}

						$("#least-sold-con").html("");

						if(d.data.General.Salesort.length <= 5)
						{
							$("#least-sold-con").html(
								"<div class='align-c pad-4'>" +
								"<h2 class='ui sleak header' " +
								"style='font-weight: normal; color: lightgray;'>" +
								"<i class='box icon'></i>" +
								"There are no items to show" +
								"</h2>" +
								"</div>");
						}

						for(let i = (d.data.General.Salesort.length - 1); i > 4; i--)
						{
							let con = document.createElement("div");
							con.className = "w3-row";
							con.style.borderBottom = "1px solid lightgray";
							con.innerHTML =
								"<div class='w3-col l2 m2 s2 pad-1'>" +
								"<img src='files/"+
								(d.data.General.Salesort[i].Item.Images[0] != null ?
									d.data.General.Salesort[i].Item.Images[0] : "") +
								"' style='max-width: 100%; border-radius: 4px; width: 80px;'/>" +
								"</div>" +
								"<div class='w3-col l7 m7 s7 pad-1'>" +
								"<h6 class='sleak' style='font-weight: bold;'>"+
								d.data.General.Salesort[i].Item.Name+
								"</h6>" +
								"</div>" +
								"<div class='w3-col l3 m3 s3 pad-1 align-r'>" +
								"<h6 class='sleak' style='font-weight: bold;'>"+
								numFormat(Number(d.data.General.Salesort[i].Quantity)) +
								" sold</h6>" +
								"</div>";

							getElement("least-sold-con").appendChild(con);

							if(i <= (d.data.General.Salesort.length - 5))
							{
								break;
							}
						}
					}
					else
					{
						for(let i = 0; i < d.data.General.Salesort.length; i++)
						{
							if(getElement(d.data.General.Salesort[i].Item.Id) != null)
							{
								$("#"+d.data.General.Salesort[i].Item.Id+"-sale-con").html(d.data.General.Salesort[i].Quantity+" sold");
							}
						}
					}
				}
				else
				{
					$(".settings-text").css("color","lightgray");
					$(".settings-control").prop("disabled", true);
					$("#error-pane-text").html(d.message);
					$("#error-pane").transition("drop in");

					if((e == null) || (e === true))
					{
						$(".load-slip").removeClass("ui placeholder");
						$(".load-slip").css("color", "silver");
					}
				}
			}
			else
			{
				$(".settings-text").css("color","lightgray");
				$(".settings-control").prop("disabled", true);
				$("#error-pane-text").html("Connection error. Check your connection and try again");
				$("#error-pane").transition("drop in");

				if((e == null) || (e === true))
				{
					$(".load-slip").removeClass("ui placeholder");
					$(".load-slip").css("color", "silver");
				}
			}
		},request);
	}

	function populateUserPOSReport(e)
	{
		let request = {
			start_date:$("#from-date").val(),
			stop_date:$("#to-date").val(),
			item_type:$("#report-item-type").val(),
			user:e,
			job:"get user pos report"
		};

		//loaders
		$(".load-slip").addClass("ui placeholder");
		let load = document.getElementsByClassName("load-slip");
		for(let i = 0; i < load.length; i++)
		{
			if(load[i].getAttribute("color-store") == undefined)
			{
				load[i].setAttribute("color-store", load[i].style.color);
			}
		}
		$(".load-slip").css("color","transparent");
		$("#table-body").html(tableLoader(8));

		postJson("hms-admin/worker", function(data, status){

			$(".load-slip").removeClass("ui placeholder");
			let load = document.getElementsByClassName("load-slip");
			for(let i = 0; i < load.length; i++)
			{
				if(load[i].getAttribute("color-store") != null)
				{
					load[i].style.color = load[i].getAttribute("color-store");
				}
			}
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#customers-con").html(numFormat(Number(d.data.Customers)));
					$("#sold-items-con").html(numFormat(Number(d.data.Solditems)));
					$("#total-sold-amount").html(numFormat(Number(d.data.Totalcash).toFixed(2)));

					$("#total-sale").html(numFormat(Number(d.data.Totalcash).toFixed(2)));
					$("#total-paid").html(numFormat(Number(d.data.Paidcash).toFixed(2)));
					$("#total-balance").html(numFormat(Number(d.data.Balance).toFixed(2)));
					$("#total-rebate").html(numFormat(Number(d.data.Rebate).toFixed(2)));

					$("#cash-amount").html(numFormat(Number(d.data.Cash).toFixed(2)));
					$("#pos-amount").html(numFormat(Number(d.data.Pos).toFixed(2)));
					$("#web-amount").html(numFormat(Number(d.data.Online).toFixed(2)));
					$("#others-amount").html(numFormat(Number(d.data.Others).toFixed(2)));

					$("#pos-orders").html(numFormat(Number(d.data.POSOrder)));
					$("#web-orders").html(numFormat(Number(d.data.WebOrder)));

					$("#cash-bar").progress({percent: d.data.Cashbar});
					$("#pos-bar").progress({percent: d.data.Posbar});
					$("#web-bar").progress({percent: d.data.Onlinebar});
					$("#others-bar").progress({percent: d.data.Othersbar});

					if(d.data.user.Id != "")
					{
						$("#pos-user-name").html(
							"<i class='green user circle icon'></i>"+
							d.data.user.Name+" "+d.data.user.Surname);
					}
					else
					{
						$("#pos-user-name").html("Unknow user");
					}

					populateUserPOSTransactions();
				}
				else
				{
					$(".settings-text").css("color","lightgray");
					$(".settings-control").prop("disabled", true);
					$("#error-pane-text").html(d.message);
					$("#error-pane").transition("drop in");


					$(".load-slip").removeClass("ui placeholder");
					$(".load-slip").css("color", "silver");
				}
			}
			else
			{
				$(".settings-text").css("color","lightgray");
				$(".settings-control").prop("disabled", true);
				$("#error-pane-text").html("Connection error. Check your connection and try again");
				$("#error-pane").transition("drop in");


				$(".load-slip").removeClass("ui placeholder");
				$(".load-slip").css("color", "silver");
			}
		},request);
	}

	function populateUserPOSTransactions(page)
	{
		let request = {};
		request.Page = 1;
		request.Perpage = 25;
		request.start_date = $("#from-date").val();
		request.stop_date = $("#to-date").val();
		request.Filter = "all";
		request.Filtervalue = $("#search-txt").val();
		request.user = getArg();
		request.item_type = $("#report-item-type").val();
		request.job = "get user pos transactions";

		request.sale_span = "";
		request.spanStart = 0;
		request.spanStop = 0;

		if($("#staff-filter").hasClass("active"))
		{
			request.Filter = "staff";
		}
		if($("#customers-filter").hasClass("active"))
		{
			request.Filter = "guest";
		}
		if($("#others-filter").hasClass("active"))
		{
			request.Filter = "others";
		}


		let split = request.Filtervalue.split(" ");
		if(split.length > 1)
		{
			if((split[(split.length - 1)].trim() === "items") || (split[(split.length - 1)].trim() == "item") || (split[(split.length - 1)].trim() == "paid"))
			{
				let col = "";
				for(let i = 0; i < (split.length - 1); i++)
				{
					col += split[i];
				}
				let sp = col.split("-");

				if(sp.length === 2)
				{
					if(Number(sp[1]))
					{
						request.sale_span = split[(split.length - 1)].trim() == "item" ? "items" : split[(split.length - 1)].trim();
						request.spanStart = Number(sp[0].trim());
						request.spanStop = Number(sp[1].trim());

						request.Filtervalue = "";
					}
				}
			}
		}


		split = request.Filtervalue.split("-");

		if(split.length === 2)
		{
			if(Number(split[1].trim()))
			{
				request.sale_span = "paid";
				request.spanStart = Number(split[0].trim());
				request.spanStop = Number(split[1].trim());

				request.Filtervalue = "";
			}
		}


		if(Number(page) > 0)
		{
			request.Page = Number(page);
		}
		if($("#perpage").dropdown('get value') != "")
		{
			request.Perpage = $("#perpage").dropdown('get value');
		}


		$("#table-body").html(tableLoader(9));
		postJson("hms-admin/worker", function(data, status){
			$("#table-body").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					//on success

					let sn = ((d.Page - 1) * d.Perpage) + 1;
					$("#total_count_btn").html(d.Total);
					$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateUserPOSTransactions"));

					if(d.data.length === 0)
					{
						//Empty set returned
						$("#table-body").html("<tr><td colspan='9'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/documents.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>No record in the time span</h6>" +
							"</div></td></tr>");
					}


					let path = "";
					if(request.item_type === "kitchen_item")
					{
						path = "#kitchen-pos-transaction-detail/";
					}
					if(request.item_type === "pastry_item")
					{
						path = "#pastry-pos-transaction-detail/";
					}
					if(request.item_type === "bar_item")
					{
						path = "#bar-pos-transaction-detail/";
					}
					if(request.item_type === "laundry_item")
					{
						path = "#laundry-pos-transaction-detail/";
					}
					if(request.item_type === "pool_item")
					{
						path = "#pool-pos-transaction-detail/";
					}


					for(var i = 0; i < d.data.length; i++)
					{
						let row = document.createElement("tr");
						row.id = d.data[i].Id;

						$(row).on("click", function(){
							location.hash = path+this.id;
						});

						let td0 = document.createElement("td");
						td0.innerHTML = "<span>" + sn + "</span>";

						let td1 = document.createElement("td");
						td1.innerHTML = d.data[i].Transactionid;

						let td2 = document.createElement("td");
						td2.innerHTML = d.data[i].Itemcount;

						let td3 = document.createElement("td");
						td3.innerHTML = $("#currency-symbol").val()+
							numFormat(((Number(d.data[i].Total) + Number(d.data[i].Taxes)) -
								(Number(d.data[i].Discount))).toFixed(2));

						let td4 = document.createElement("td");
						td4.innerHTML = $("#currency-symbol").val()+
							numFormat(Number(d.data[i].Paidamount).toFixed(2));

						let td5 = document.createElement("td");
						td5.innerHTML = $("#currency-symbol").val()+
							numFormat((((Number(d.data[i].Total) + Number(d.data[i].Taxes)) -
								(Number(d.data[i].Discount))) - Number(d.data[i].Paidamount)).toFixed(2));

						let td6 = document.createElement("td");
						td6.innerHTML = d.data[i].Channel == "pos" ?
							"<span class='status green-back'>pos</span>" :
							"<span class='status blue-back'>web</span>";

						let td7 = document.createElement("td");
						td7.innerHTML = d.data[i].Hasstaff ?
							"<span class='status green-back'>Staff</span>" :
							(d.data[i].Hasguest ? "<span class='status blue-back'>Guest</span>" :
								"<span class='status yellow-back'>Unknown</span>");

						let td8 = document.createElement("td");
						td8.innerHTML = d.data[i].Created.WeekDay+", "+d.data[i].Created.Day+"/"+
							d.data[i].Created.MonthName+"/"+d.data[i].Created.Year+" - "+
					d.data[i].Created.Hour+":"+d.data[i].Created.Miniute;


						row.appendChild(td0);
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						row.appendChild(td4);
						row.appendChild(td5);
						row.appendChild(td6);
						row.appendChild(td7);
						row.appendChild(td8);

						sn++;

						document.getElementById("table-body").appendChild(row);
					}

					$(".c-menu").dropdown();
				}
				else if(d.status == "ACCESS_DENIED")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	function populatePosTransaction()
	{
		let request = {
			sale: getArg(),
			item_type: $("#report-item-type").val(),
			job: "get pos transaction"
		};


		$("#timeline-table").html(tableLoader(1));
		postJson("hms-admin/worker", function(data, status){
			$("#timeline-table").html("");

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					if(d.data.sale.Items.length === 0)
					{
						//Empty set returned
						$("#timeline-table").html("<tr><td colspan='8'><div class='align-c pad-2'>" +
							"<img src='"+phpvars.FRONTDESK_CDN+"images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Empty products list returned</h6>" +
							"</div></td></tr>");
					}
					$("#currently-viewed-transaction").val(d.data.sale.Id);

					for(let i = 0; i < d.data.sale.Items.length; i++)
					{
						let row = document.createElement("tr");

						let td0 = document.createElement("td");
						td0.innerHTML =
							"<div class='w3-row'>" +
							(d.data.sale.Items[i].Item.Images != null ?
							"<div class='w3-col l3 m3 s3'>" +
							(d.data.sale.Items[i].Item.Images.length > 0 ?
								"<img src='files/"+d.data.sale.Items[i].Item.Images[0]+"' style='max-width: 100%; border-radius: 5px; width: 60px;'/>" : "") +
							"</div>" : "") +
							"<div class='w3-col l6 m6 s6 pad-1'> " +
								"<h4 class='sleak' style='font-weight: bold; margin: 0px; padding: 0px;'>"+
								d.data.sale.Items[i].Item.Name+"</h4>" +
							"</div>" +
							"<div class='w3-col "+(d.data.sale.Items[i].Item.Images != null ? "l3 m3 s3" : "l6 m6 s6")+" align-r'>"+
							numFormat(Number(d.data.sale.Items[i].Quantity))+"<br/>" +
									"<small class='green' style='font-weight: bold;'>Qty</small>"+
									"</div>" +
							"</div>";


						row.appendChild(td0);
						document.getElementById("timeline-table").appendChild(row);
					}

					getElement("inventory-timeline-con").innerHTML = "";

					let con = document.createElement("div");
					con.className = "w3-row";
					con.style.marginTop = "20px";
					con.innerHTML =
						"<div class='w3-row' style='margin-top: 20px;'>" +
						"<div class='w3-col l3 m4 s4'>" +
						"<div class='align-r pad-1'>" +
						"<label class='sleak widget lift-1 curve' " +
						"style='display: inline-block; font-weight: bold; padding: 7px;'>Transaction Summary</label>" +
						"</div>" +
						"</div>" +
						"<div class='w3-col l9 m8 s8'>" +
						"<div class='l-width-8 pad-1'>" +
						"<div id='item-detail-con' class='widget pad-1 lift-1 curve'>" +

						"<div class='w3-row'>" +
						"<div class='w3-col l6 m6 s6'>" +
						"<h3 class='sleak' style='font-weight: bold; color: black; margin-bottom: 0px;'>" +
						"<i class='shopping basket circular blue icon'></i> "+d.data.sale.Channel + " order" +
						"</h3>" +
						"</div>" +
						"<div class='w3-col l6 m6 s6 align-r'>" +
						"<label style='cursor: pointer; color: dimgray;'>" +
						"<span style='color: rgb(235,235,235); font-weight: bold;'>"+ " details" +
						"</span>" +
						"<i class='chevron up icon' onclick=\"toggleDetail('item-detail', this)\"></i></label>" +
						"</div>" +

						"</div>" +

						"<div class='detail-con open' style='margin-top: 15px;'>" +
						"<table class='ui very basic table'>" +
						"<tr>" +
						"<td>Items</td>" +
						"<td>"+
						numFormat(Number(d.data.sale.Itemcount))+
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Subtotal</td>" +
						"<td>"+
						$("#currency-symbol").val()+numFormat(Number(d.data.sale.Total).toFixed(2))+
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Taxes</td>" +
						"<td>"+
						$("#currency-symbol").val()+numFormat(Number(d.data.sale.Taxes).toFixed(2))+
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Discount</td>" +
						"<td>"+
						$("#currency-symbol").val()+numFormat(Number(d.data.sale.Discount).toFixed(2))+
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Total</td>" +
						"<td>"+
						$("#currency-symbol").val()+numFormat(((Number(d.data.sale.Total) + Number(d.data.sale.Taxes)) - Number(d.data.sale.Discount)).toFixed(2))+
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Paid</td>" +
						"<td>"+
						$("#currency-symbol").val()+numFormat(Number(d.data.sale.Paidamount).toFixed(2)) +
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Balance</td>" +
						"<td>"+
						$("#currency-symbol").val()+numFormat((((Number(d.data.sale.Total) + Number(d.data.sale.Taxes)) - Number(d.data.sale.Discount)) - Number(d.data.sale.Paidamount)).toFixed(2)) +
						"</td>" +
						"</tr>" +
						"</table>" +
						"<input id='trans-total' type='hidden' value='"+((Number(d.data.sale.Total) + Number(d.data.sale.Taxes)) - Number(d.data.sale.Discount)).toFixed(2)+"'/>" +
						"<input id='trans-paid' type='hidden' value='"+(Number(d.data.sale.Paidamount)).toFixed(2)+"'/>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>";

					getElement("inventory-timeline-con").appendChild(con);

					if(d.data.transaction == 0)
					{
						let con = document.createElement("div");
						con.className = "w3-row";
						con.style.marginTop = "20px";
						con.innerHTML =
							"<div class='w3-row' style='margin-top: 20px;'>" +
							"<div class='w3-col l3 m4 s4'>" +
							"<div class='align-r pad-1'>" +
							"<label style='display: inline-block; color: transparent;'>.</label>" +
							"</div>" +
							"</div>" +
							"<div class='w3-col l9 m8 s8'>" +
							"<div class='l-width-8 pad-1'>" +
							"<div class='widget pad-3 lift-1 curve align-c'>" +
							"<h2><i class='clipboard blue circular icon'></i></h2>" +
							"<h5 class='sleak' style='font-weight: bold; color: black; text-align: center;'>" +
							"No Payment record was found" +
							"</h5>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"</div>";

						getElement("inventory-timeline-con").appendChild(con);
					}


					if(d.data.sale.Guest.Id != "")
					{
						let con = document.createElement("div");
						con.className = "w3-row";
						con.style.marginTop = "0px";
						con.innerHTML =
							"<div class='w3-row' style=''>" +
							"<div class='w3-col l3 m4 s4'>" +
							"<span style='color: transparent;'>.</span>" +
							"</div>" +
							"<div class='w3-col l9 m8 s8'>" +
							"<div class='l-width-8 pad-1'>" +
							"<div id='"+d.data.sale.Guest.Id+"-con' class='sleak widget pad-t lift-1 curve'>" +
							"<label style='float: right; cursor: pointer; color: dimgray;'>" +
							"<span style='color: silver; font-weight: bold;'>"+ " " +
							"Customer" +
							"</span>" +
							"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data.sale.Guest.Id+"', this)\"></i></label>" +
							"<label style='font-weight: bold; color: rgb(0,100,140);'>" +
							"<i class='user circular blue icon'></i> "+
							"<span style='font-family: Lato; font-weight: normal;'>"+
							"</span> " +
							d.data.sale.Guest.Name +" "+d.data.sale.Guest.Surname +
							"</label>" +
							"<div class='pad-1 detail-con' style='display: none;'>" +
							"<hr/>" +
							"<a href='#customer/"+d.data.sale.Guest.Id+"'>" +
							"<button class='ui blue button'>See profile</button>" +
							"</a>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"</div>";

						getElement("inventory-timeline-con").appendChild(con);
					}

					if(d.data.sale.Staff.Id != "")
					{
						let con = document.createElement("div");
						con.className = "w3-row";
						con.style.marginTop = "0px";
						con.innerHTML =
							"<div class='w3-row' style=''>" +
							"<div class='w3-col l3 m4 s4'>" +
							"<span style='color: transparent;'>.</span>" +
							"</div>" +
							"<div class='w3-col l9 m8 s8'>" +
							"<div class='l-width-8 pad-1'>" +
							"<div id='"+d.data.sale.Staff.Id+"-con' class='sleak widget pad-t lift-1 curve'>" +
							"<label style='float: right; cursor: pointer; color: dimgray;'>" +
							"<span style='color: silver; font-weight: bold;'>"+ " " +
							"Staff" +
							"</span>" +
							"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data.sale.Staff.Id+"', this)\"></i></label>" +
							"<label style='font-weight: bold; color: rgb(0,100,140);'>" +
							"<i class='user circular blue icon'></i> "+
							"<span style='font-family: Lato; font-weight: normal;'>"+
							"</span> " +
							d.data.sale.Staff.Name +" "+d.data.sale.Staff.Surname +
							"</label>" +
							"<div class='pad-1 detail-con' style='display: none;'>" +
							"<hr/>" +
							"<a href='#staff-profile/"+d.data.sale.Staff.Id+"'>" +
							"<button class='ui blue button'>See profile</button>" +
							"</a>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"</div>";

						getElement("inventory-timeline-con").appendChild(con);
					}

					for(let i = 0; i < d.data.transaction.length; i++)
					{
						if(d.data.transaction[i].Type == "debit")
						{
							let con = document.createElement("div");
							con.className = "w3-row";
							con.style.marginTop = "20px";
							con.innerHTML =
								"<div class='w3-row' style='margin-top: 20px;'>" +
								"<div class='w3-col l3 m4 s4'>" +
								"<div class='align-r pad-1'>" +
								"<label class='sleak widget lift-1 curve' " +
								"style='display: inline-block; font-weight: bold; padding: 7px;'>" +
								d.data.transaction[i].Paytime.WeekDay+", " + d.data.transaction[i].Paytime.Day + " "
								+ d.data.transaction[i].Paytime.MonthName+" " + d.data.transaction[i].Paytime.Year +
								"</label>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l9 m8 s8'>" +
								"<div class='l-width-8 pad-1'>" +
								"<div id='"+d.data.transaction[i].Id+"-con' class='sleak widget pad-t lift-1 curve'>" +
								"<label style='float: right; cursor: pointer; color: dimgray;'>" +
								"<span style='color: silver; font-weight: bold;'>"+ " " +
								"Debit" +
								"</span>" +
								"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data.transaction[i].Id+"', this)\"></i></label>" +
								"<label style='font-weight: bold; color: maroon;'>" +
								"<i class='arrow up circular red icon'></i> "+
								"<span style='font-family: Lato; font-weight: normal;'>"+
								$("#currency-symbol").val()+
								"</span> " +
								numFormat(Number(d.data.transaction[i].Amount).toFixed(2)) +
								"</label>" +
								"<div class='pad-1 detail-con' style='display: none;'>" +
								"<hr/>" +
								"<label style='font-weight: bold; color: dimgray;'><span style='color: silver;'>" +
								"Authorized by:</span> "+d.data.transaction[i].User.Name+" "+d.data.transaction[i].User.Surname+"</label>" +
								"<p style='margin-bottom: 0px;'>"+d.data.transaction[i].Paytime.Hour+":" + d.data.transaction[i].Paytime.Miniute +"</p>" +
								"<p style='color: dimgray; line-height: 170%;'>"+d.data.transaction[i].Text+"</p>" +
								"</div>" +
								"</div>" +
								"<div class='widget lift-1 curve' style='margin-top: 3px; padding: 7px;'>" +
								"<label style='font-family: Lato; float: right; color: maroon;'>"+
								d.data.transaction[i].Method+" &nbsp;</label>" +
								"<label style='font-family: Lato;'>" +
								"Pay method: &nbsp; <span style='color: rgb(255,182,77);'>"+
								"</span></label>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>";

							getElement("inventory-timeline-con").appendChild(con);
						}
						if(d.data.transaction[i].Type == "credit")
						{
							let con = document.createElement("div");
							con.className = "w3-row";
							con.style.marginTop = "20px";
							con.innerHTML =
								"<div class='w3-row' style='margin-top: 20px;'>" +
								"<div class='w3-col l3 m4 s4'>" +
								"<div class='align-r pad-1'>" +
								"<label class='sleak widget lift-1 curve' " +
								"style='display: inline-block; font-weight: bold; padding: 7px;'>" +
								d.data.transaction[i].Paytime.WeekDay+", " + d.data.transaction[i].Paytime.Day + " "
								+ d.data.transaction[i].Paytime.MonthName+" " + d.data.transaction[i].Paytime.Year +
								"</label>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l9 m8 s8'>" +
								"<div class='l-width-8 pad-1'>" +
								"<div id='"+d.data.transaction[i].Id+"-con' class='sleak widget pad-t lift-1 curve'>" +
								"<label style='float: right; cursor: pointer; color: dimgray;'>" +
								"<span style='color: silver; font-weight: bold;'>"+ " " +
								"Credit" +
								"</span>" +
								"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data.transaction[i].Id+"', this)\"></i></label>" +
								"<label style='font-weight: bold; color: forestgreen;'>" +
								"<i class='arrow down circular icon' style='color: forestgreen;'></i> "+
								"<span style='font-family: Lato; font-weight: normal;'>"+
								$("#currency-symbol").val()+
								"</span> " +
								numFormat(Number(d.data.transaction[i].Amount).toFixed(2)) +
								"</label>" +
								"<div class='pad-1 detail-con' style='display: none;'>" +
								"<hr/>" +
								"<label style='font-weight: bold; color: dimgray;'><span style='color: silver;'>" +
								"Authorized by:</span> "+d.data.transaction[i].User.Name+" "+d.data.transaction[i].User.Surname+"</label>" +
								"<p style='margin-bottom: 0px;'>"+d.data.transaction[i].Paytime.Hour+":" + d.data.transaction[i].Paytime.Miniute +"</p>" +
								"<p style='color: dimgray; line-height: 170%;'>"+d.data.transaction[i].Text+"</p>" +
								"</div>" +
								"</div>" +
								"<div class='widget lift-1 curve' style='margin-top: 3px; padding: 7px;'>" +
								"<label style='font-family: Lato; float: right; color: forestgreen;'>"+
								d.data.transaction[i].Method+" &nbsp;</label>" +
								"<label style='font-family: Lato;'>" +
								"Pay method: &nbsp; <span style='color: rgb(255,182,77);'>"+
								"</span></label>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>";

							getElement("inventory-timeline-con").appendChild(con);
						}
					}
				}
				else if(d.status == "access_denied")
				{
					//Re-login marker goes here
					//
				}
				else
				{
					//Unable to save marker goes here
					//
				}
			}
			else
			{
				//Network error marker goes here
				//
			}
		}, request);
	}

	let itemRevenue = null;
    function populateItemReport(e)
    {
        let request = {
            start_date:$("#from-date").val(),
            stop_date:$("#to-date").val(),
            item_type:$("#report-item-type").val(),
            item:e,
            job:"get item report"
        };

        //loaders
        $(".load-slip").addClass("ui placeholder");
        let load = document.getElementsByClassName("load-slip");
        for(let i = 0; i < load.length; i++)
        {
            if(load[i].getAttribute("color-store") == undefined)
            {
                load[i].setAttribute("color-store", load[i].style.color);
            }
        }
        $(".load-slip").css("color","transparent");

        postJson("hms-admin/worker", function(data, status){

            $(".load-slip").removeClass("ui placeholder");
            let load = document.getElementsByClassName("load-slip");
            for(let i = 0; i < load.length; i++)
            {
                if(load[i].getAttribute("color-store") != null)
                {
                    load[i].style.color = load[i].getAttribute("color-store");
                }
            }

            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    getElement("item-image").src = "files/"+d.data.Item.Images[0];
                    $("#item-name").html(d.data.Item.Name);
                    $("#item-category").html(d.data.Item.Category.Name);

					if(itemRevenue == null)
					{
						itemRevenue = new EasyPieChart(document.querySelector('#revenue-percentage'), {
							easing: 'easeOutElastic',
							onStep: function(from, to, percent) {
								this.el.children[0].innerHTML = Math.round(percent);
							}
						});
					}
					itemRevenue.update(2.3);
                }
                else
                {
                    $(".settings-text").css("color","lightgray");
                    $(".settings-control").prop("disabled", true);
                    $("#error-pane-text").html(d.message);
                    $("#error-pane").transition("drop in");


                    $(".load-slip").removeClass("ui placeholder");
                    $(".load-slip").css("color", "silver");
                }
            }
            else
            {
                $(".settings-text").css("color","lightgray");
                $(".settings-control").prop("disabled", true);
                $("#error-pane-text").html("Connection error. Check your connection and try again");
                $("#error-pane").transition("drop in");


                $(".load-slip").removeClass("ui placeholder");
                $(".load-slip").css("color", "silver");
            }
        },request);
    }

	function ReportPopulateTemplate(e)
	{
		let request = {
			start_date:$("#from-date").val(),
			stop_date:$("#to-date").val(),
			item_type:$("#report-item-type").val(),
			user:e,
			job:"get user pos report"
		};

		//loaders
		$(".load-slip").addClass("ui placeholder");
		let load = document.getElementsByClassName("load-slip");
		for(let i = 0; i < load.length; i++)
		{
			if(load[i].getAttribute("color-store") == undefined)
			{
				load[i].setAttribute("color-store", load[i].style.color);
			}
		}
		$(".load-slip").css("color","transparent");

		postJson("hms-admin/worker", function(data, status){

			$(".load-slip").removeClass("ui placeholder");
			let load = document.getElementsByClassName("load-slip");
			for(let i = 0; i < load.length; i++)
			{
				if(load[i].getAttribute("color-store") != null)
				{
					load[i].style.color = load[i].getAttribute("color-store");
				}
			}

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{

				}
				else
				{
					$(".settings-text").css("color","lightgray");
					$(".settings-control").prop("disabled", true);
					$("#error-pane-text").html(d.message);
					$("#error-pane").transition("drop in");


					$(".load-slip").removeClass("ui placeholder");
					$(".load-slip").css("color", "silver");
				}
			}
			else
			{
				$(".settings-text").css("color","lightgray");
				$(".settings-control").prop("disabled", true);
				$("#error-pane-text").html("Connection error. Check your connection and try again");
				$("#error-pane").transition("drop in");


				$(".load-slip").removeClass("ui placeholder");
				$(".load-slip").css("color", "silver");
			}
		},request);
	}

	function ConfGroupOrderDelete()
	{
		ShowModal('Coming soon...');
	}

	// custom function to return all checked items in a report
	function getAllCheckedItems(data, title, findBy='Id')
	{
		// @var array checkedItems
		let checkedItems = [];

		// get check selection
		[].forEach.call(document.querySelectorAll('.check-sel'), (element)=>{

			// check if checkbox is checked
			if (element.checked)
			{
				// get item id
				const itemId = element.id;

				// push to checked reservation
				data.forEach(row => {
					if (row[findBy] == itemId)
					{
						checkedItems.push(row);
					}
				});
			}
		});

		// alert user
		if (checkedItems.length == 0)
		{
			// remove checked
			var checked = document.querySelector('.item.active.selected');

			// are we good 
			if (checked != null)
			{
				checked.classList.remove('selected');
				checked.classList.remove('active');
			}

			ShowModal('No '+title+' checked for export');
		}

		// return array
		return checkedItems;
	}

	function exportReservationCSV(){

		let jsonreservations = getAllCheckedItems(reportCache.reservations, 'Reservation');
		if(jsonreservations != null && jsonreservations.length > 0)
		{
			let sn = 0;
			let reservations = jsonreservations.map(reservation => {
				sn += 1;
				
				const { Day, MonthName, Year } = reservation.Checkindate;
				const payment_status = reservation.Paid ? 'Paid' : 'Unpaid';
				const overdue = reservationIsOverdue(reservation);
	
				// Last seen date
				const lastseenDay = reservation.Customer.Lastseen.Day;
				const lastseenDMonth = reservation.Customer.Lastseen.MonthName;
				const lastseenYear = reservation.Customer.Lastseen.Year;
				const phone = reservation.Customer.Phone.search("#") > -1 ? '-' : reservation.Customer.Phone;
				const status = reservation.Noshow == 1 ? 'No show' : (reservation.UnconfirmedNoShow == 1 ? 'Pending No show' : (reservation.Cancelled ? 'Canceled' : (reservation.Checkedin == true ? 'Checked In' : (reservation.Checkedout == true ? 'Checked Out' : (overdue ? 'Overdue' : 'Pending')))));

				return { 
					SN: sn, 
					Name: `${reservation.Customer.Name} ${reservation.Customer.Surname}`, 
					Phone: phone,
					Email: reservation.Customer.Email,
					ReservationID: reservation.Id, 
					No_of_rooms: reservation.Rooms.length, 
					Adult: reservation.Adult,
					Children: reservation.Children, 
					Total_amount: reservation.Total, 
					Discount: reservation.Discount,
					Payment_status: payment_status, 
					Amt_paid: reservation.Paidamount, 
					Outstanding: parseFloat(reservation.Total) - (parseFloat(reservation.Paidamount) + parseFloat(reservation.Discount)),
					Check_in_date: `${Day}-${MonthName}-${Year}`,
					Check_out_date: `${reservation.Checkoutdate.Day}-${reservation.Checkoutdate.MonthName}-${reservation.Checkoutdate.Year}`,
					Date_last_seen: `${lastseenDay}-${lastseenDMonth}-${lastseenYear}`,
					Status: status
				};
			});
	
			const csvData = objectToCsv(reservations);
			downloadCSV(csvData, 'Reservation-'+(new Date).getTime());
		}
	}

	function exportCustomerCSV(){
		let jsoncustomers = getAllCheckedItems(reportCache.customers, 'Customers');

		let customers = jsoncustomers.map(customer => {
			const { Day, Month, Year } = customer.Dateofbirth; 
			return { FirstName: customer.Name, SurName: customer.Surname, Sex: customer.Sex, City: customer.City, State: customer.State, Occupation: customer.Occupation || 'none', Phone: customer.Phone, DOB: `${Day}-${Month}-${Year}`};
		});		
		const csvData = objectToCsv(customers);
		downloadCSV(csvData, 'customers-'+(new Date).getTime());
	}

	function exportCheckCSV()
	{
		let departures = getAllCheckedItems(reportCache.inHouseGuests, 'In House Guests');
		if(departures != null && departures.length > 0)
		{
			let sn = 0;
			let departureObject = departures.map(row => {
				sn += 1;
				
				const { Day, MonthName, Year } = row.Checkin;
				const payment_status = row.Paid ? 'Paid' : 'Unpaid';
	
				// Last seen date
				const lastseenDay = (row.Checkedout) ? row.Checkout.Day : '';
				const lastseenDMonth = (row.Checkedout) ? row.Checkout.MonthName : '';
				const lastseenYear = (row.Checkedout) ? row.Checkout.Year : '';
				const phone = row.Guest.Phone.search("#") > -1 ? '-' : row.Guest.Phone;
	
				return { 
					SN: sn, 
					Name: `${row.Guest.Name} ${row.Guest.Surname}`, 
					Phone: phone,
					Email: row.Guest.Email,
					Checkedout: row.Checkedout == false ? 'No' : 'Yes', 
					No_of_rooms: row.Rooms.length, 
					Adult: row.Adults,
					Children: row.Children, 
					Total_amount: row.Total, 
					Discount: row.Discount,
					Payment_status: payment_status, 
					Amt_paid: row.Paidamount, 
					Bills : parseFloat(row.Bills),
					Outstanding: parseFloat(row.Total) - (parseFloat(row.Paidamount) + parseFloat(row.Discount)),
					Check_in_date: `${Day}-${MonthName}-${Year}`,
					Check_out_date: `${row.Checkout.Day}-${row.Checkout.MonthName}-${row.Checkout.Year}`,
					Date_last_seen: `${lastseenDay}-${lastseenDMonth}-${lastseenYear}`,
					Status : row.Checkedout == false ? 'Checked In' : 'Checked Out'
				};
			});
	
			const csvData = objectToCsv(departureObject);
			downloadCSV(csvData, 'Guests-'+(new Date).getTime());
		}
	}