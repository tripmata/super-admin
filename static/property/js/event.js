//------- Run Logout --------------------//

function countCharacters()
{
	$("#char-count").html(document.getElementById("sms-body").value.length);
}

function switchReserveTab(e)
{
	$(".reserve-tab").removeClass("active");
	$(e).addClass("active");
	document.querySelector('#main-sel').checked = false;

	populateReservations();
}

function switchGuestTab(e)
{
	$(".guest-tab").removeClass("active");
	$(e).addClass("active");
	document.querySelector('#main-sel').checked = false;

	populateGuests();
}

function switchPropertyState(e)
{
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !e.checked;
				ShowModal(d.message);
			}
		}
		else
		{
			e.checked = !e.checked;
			ShowModal("Connection error. Unable to save property status. Check your connection and try again");
		}
	},{job:"set-property-status", status:e.checked, property:$("#property-id").val()});
}

function doLogOut()
{
	postJson("logout", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if (d.status === "success")
			{
				location.hash = "#";
				sessionStorage.removeItem('user_token');
				location.reload();
			}
			else
			{
				ShowModal("Application error. Logout Unsuccessfull");
			}
		}
		else
		{
			ShowModal("Connection error. Logout Unsuccessfull");
		}
	},{})
}


function addGroupToContacttoList()
{
	selectCustomlist(function(listid){
		let cnt = [];

		let inps = document.getElementsByClassName("check-sel");

		let i = 0;
		for(; i < inps.length; i++)
		{
			if(inps[i].checked)
			{
				cnt.push(inps[i].getAttribute("s-data")+":"+listid);
			}
		}

		if(cnt.length > 0)
		{
			addCustomContact(cnt);
		}
		else
		{
			ShowModal("No contacts were selected. Select contacts and try again");
		}
	});
}


//------------------------------   Role Operatons ----------------------------------//
function saveRole()
{
	let request = {
		Roleid: getElement("role-id").value,
		booking_read: getElement("booking-read").checked,
		coupon_read: getElement("coupon-read").checked,
		customer_read: getElement("customer-read").checked,
		staff_read: false, //getElement("staff-read").checked,
		rooms_read: getElement("rooms-read").checked,
		kitchen_read: false, //getElement("kitchen-read").checked,
		bakery_read: false, //getElement("bakery-read").checked,
		bar_read: false, //getElement("bar-read").checked,
		laundry_read: false, //getElement("laundry-read").checked,
		housekeeping_read: false, //getElement("housekeeping-read").checked,
		pool_read: false, //getElement("pool-read").checked,
		store_read: false, //getElement("store-read").checked,
		event_read: false, //getElement("event-read").checked,
		finance_read: false, //getElement("finance-read").checked,
		branch_read: false, //getElement("branch-read").checked,
		log_read: false, //getElement("log-read").checked,
		reporting_read: getElement("reporting-read").checked,
		messaging_read: getElement("messaging-read").checked,
		webfront_read: false, //getElement("webfront-read").checked,
		webconfig_read: false, //getElement("webconfig-read").checked,
		settings_read: getElement("settings-read").checked,


		booking_write:getElement("booking-write").checked,
		coupon_write:getElement("coupon-write").checked,
		customer_write:getElement("customer-write").checked,
		staff_write: false, //getElement("staff-write").checked,
		rooms_write: getElement("rooms-write").checked,
		kitchen_write: false, //getElement("kitchen-write").checked,
		bakery_write: false, //getElement("bakery-write").checked,
		bar_write: false, //getElement("bar-write").checked,
		laundry_write: false, //getElement("laundry-write").checked,
		housekeeping_write: false, //getElement("housekeeping-write").checked,
		pool_write: false, //getElement("pool-write").checked,
		store_write: false, //getElement("store-write").checked,
		event_write: false, //getElement("event-write").checked,
		finance_write: false, //getElement("finance-write").checked,
		branch_write: false, //getElement("branch-write").checked,
		log_write: false, //getElement("log-write").checked,
		reporting_write:getElement("reporting-write").checked,
		messaging_write:getElement("messaging-write").checked,
		webfront_write: false, //getElement("webfront-write").checked,
		webconfig_write: false, //getElement("webconfig-write").checked,
		settings_write: getElement("settings-write").checked,

		frontdesk:false,
		bakery_pos:false,
		kitchen_pos:false,
		pools_pos:false,
		laundry_pos:false,
		bar_pos:false,
		
		property:$("#property-id").val(),

		name: getElement("role-name").value,
		job: "save role"
	};

	if(getElement("frontdesk-write") != null)
	{
		request.frontdesk = getElement("frontdesk-write").checked;
	}
	/*
	if(getElement("bakery-pos") != null)
	{
		request.bakery_pos = getElement("bakery-pos").checked;
	}
	if(getElement("kitchen-pos") != null)
	{
		request.kitchen_pos = getElement("kitchen-pos").checked;
	}
	if(getElement("pools-pos") != null)
	{
		request.pools_pos = getElement("pools-pos").checked;
	}
	if(getElement("laundry-pos") != null)
	{
		request.laundry_pos = getElement("laundry-pos").checked;
	}
	if(getElement("bar-pos") != null)
	{
		request.bar_pos = getElement("bar-pos").checked;
	}
	*/


	if(request.name === "")
	{
		errorButton({btn:"role-save-btn", msg:"Role name is empty", delay:3000});
	}
	else
	{
		loadingButton({btn:"role-save-btn"});

		postJson("hms-admin/worker",function(data, status){

			loadingButton({btn:"role-save-btn",loading:false});

			if(status === "done")
			{
				let d = JSON.parse(data);
				if(d.status === "success")
				{
					if(d.data === "success")
					{
						$("#role-save-btn").addClass("positive");
						$("#role-save-btn").html("<i class='check icon'></i> Role saved");
						setTimeout(function(){
							location.hash = "#staff/roles";
						},3000);
					}
					else
					{
						ShowModal(d.message);
					}
				}
				else
				{
					errorButton({btn:"role-save-btn", msg:"Unknown Error", delay:3000});
				}
			}
			else
			{
				errorButton({btn:"role-save-btn", msg:"Connection error", delay:3000});
			}
		},request);
	}
}

function ConfirmGroupRoleDelete()
{
	ConfirmModal("All users connected to these roles will loose access. Continue?", function(choice){
		if(choice === true)
		{
			RoleGroupDelete();
		}
	});
}

function ConfirmRoleDelete(e)
{
	ConfirmModal("All users connected to this role will loose access. Continue?", function(choice, param){
		if(choice === true)
		{
			RoleListDelete(param);
		}
	}, null, null, e);
}

function RoleGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteRole(lst[i].id, function(status, msg){
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status === "done")
				{
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Roles failed to delete");
		}
	}
	else
	{
		ShowModal("No Roles were selected");
	}
}

function RoleListDelete(e)
{
	$('#'+e+'-btn').addClass('loading');
	DeleteRole(e, function(status, msg){
		$('#'+e+'-btn').removeClass('loading');
		if(status === "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteRole(e, func)
{
	let request = {};
	request.Roleid = e;
	request.job = "delete role";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function loadEditRole(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");

		if(status === "done")
		{
			let d = JSON.parse(data);

			if (d.status === "success")
			{
				getElement("role-name", (element)=>{element.value = d.data.Name});
				getElement("role-id", (element)=>{element.value = d.data.Id});
				getElement("booking-read", (element)=>{element.checked = d.data.Booking.ReadAccess});
				getElement("coupon-read", (element)=>{element.checked = d.data.Discount.ReadAccess});
				getElement("customer-read", (element)=>{element.checked = d.data.Customers.ReadAccess});
				getElement("staff-read", (element)=>{element.checked = d.data.Staff.ReadAccess});
				getElement("rooms-read", (element)=>{element.checked = d.data.Rooms.ReadAccess});
				getElement("kitchen-read", (element)=>{element.checked = d.data.Kitchen.ReadAccess});
				getElement("bakery-read", (element)=>{element.checked = d.data.Bakery.ReadAccess});
				getElement("bar-read", (element)=>{element.checked = d.data.Bar.ReadAccess});
				getElement("laundry-read", (element)=>{element.checked = d.data.Laundry.ReadAccess});
				getElement("housekeeping-read", (element)=>{element.checked = d.data.Housekeeping.ReadAccess});
				getElement("pool-read", (element)=>{element.checked = d.data.Pool.ReadAccess});
				getElement("store-read", (element)=>{element.checked = d.data.Store.ReadAccess});
				getElement("event-read", (element)=>{element.checked = d.data.Event.ReadAccess});
				getElement("finance-read", (element)=>{element.checked = d.data.Finance.ReadAccess});
				getElement("branch-read", (element)=>{element.checked = d.data.Branch.ReadAccess});
				getElement("log-read", (element)=>{element.checked = d.data.Log.ReadAccess});
				getElement("reporting-read", (element)=>{element.checked = d.data.Report.ReadAccess});
				getElement("messaging-read", (element)=>{element.checked = d.data.Messaging.ReadAccess});
				getElement("webfront-read", (element)=>{element.checked = d.data.Webfront.ReadAccess});
				getElement("webconfig-read", (element)=>{element.checked = d.data.Webconfig.ReadAccess});
				getElement("settings-read", (element)=>{element.checked = d.data.Settings.ReadAccess});
				getElement("frontdesk-read", (element)=>{element.checked = d.data.Frontdesk.ReadAccess});
				getElement("settings-read", (element)=>{element.checked = d.data.Settings.ReadAccess});

				getElement("booking-write", (element)=>{element.checked = d.data.Booking.WriteAccess});
				getElement("coupon-write", (element)=>{element.checked = d.data.Discount.WriteAccess});
				getElement("customer-write", (element)=>{element.checked = d.data.Customers.WriteAccess});
				getElement("staff-write", (element)=>{element.checked = d.data.Staff.WriteAccess});
				getElement("rooms-write", (element)=>{element.checked = d.data.Rooms.WriteAccess});
				getElement("kitchen-write", (element)=>{element.checked = d.data.Kitchen.WriteAccess});
				getElement("bakery-write", (element)=>{element.checked = d.data.Bakery.WriteAccess});
				getElement("bar-write", (element)=>{element.checked = d.data.Bar.WriteAccess});
				getElement("laundry-write", (element)=>{element.checked = d.data.Laundry.WriteAccess});
				getElement("housekeeping-write", (element)=>{element.checked = d.data.Housekeeping.WriteAccess});
				getElement("pool-write", (element)=>{element.checked = d.data.Pool.WriteAccess});
				getElement("store-write", (element)=>{element.checked = d.data.Store.WriteAccess});
				getElement("event-write", (element)=>{element.checked = d.data.Event.WriteAccess});
				getElement("finance-write", (element)=>{element.checked = d.data.Finance.WriteAccess});
				getElement("branch-write", (element)=>{element.checked = d.data.Branch.WriteAccess});
				getElement("log-write", (element)=>{element.checked = d.data.Log.WriteAccess});
				getElement("reporting-write", (element)=>{element.checked = d.data.Report.WriteAccess});
				getElement("messaging-write", (element)=>{element.checked = d.data.Messaging.WriteAccess});
				getElement("webfront-write", (element)=>{element.checked = d.data.Webfront.WriteAccess});
				getElement("webconfig-write", (element)=>{element.checked = d.data.Webconfig.WriteAccess});
				getElement("settings-write", (element)=>{element.checked = d.data.Settings.WriteAccess});
				getElement("frontdesk-write", (element)=>{element.checked = d.data.Frontdesk.WriteAccess});
				getElement("settings-write", (element)=>{element.checked = d.data.Settings.WriteAccess});

				if(getElement("frontdesk") != null)
				{
					getElement("frontdesk").checked = d.data.Frontdesk.WriteAccess;
				}
				if(getElement("bakery-pos") != null)
				{
					getElement("bakery-pos").checked = d.data.Bakerypos.WriteAccess;
				}
				if(getElement("kitchen-pos") != null)
				{
					getElement("kitchen-pos").checked = d.data.Kitchenpos.WriteAccess;
				}
				if(getElement("pools-pos") != null)
				{
					getElement("pools-pos").checked = d.data.Poolpos.WriteAccess;
				}
				if(getElement("laundry-pos") != null)
				{
					getElement("laundry-pos").checked = d.data.Laundrypos.WriteAccess;
				}
				if(getElement("bar-pos") != null)
				{
					getElement("bar-pos").checked = d.data.Barpos.WriteAccess;
				}
			}
			else
			{

			}
		}
		else
		{

		}
	},{job:"get role", roleid:e});
}

function staff_changed(e)
{
	$("#full-name").val($("#staff-list").dropdown('get text'));
}

function from_st_lst(e)
{
	if(e.checked)
	{
		$("#staff-list-con").transition("fade down in");
	}
	else
	{
		$("#staff-list-con").transition("fade down out");
	}
}



//-----------------  Customers Logic -----------------------------------------------------------//

function saveCustomer()
{
	let request = {
		customerid:getElement("customerid").value,
		name:getElement("customer-name").value,
		surname:getElement("customer-surname").value,
		phone:getElement("customer-phone").value,
		email:getElement("customer-email").value,
		sex:getElement("male-customer").checked ? "male" : "female",
		newletter:getElement("sub-newsletter").checked,
		guestid:getElement("guestid").value,
		password:getElement("customer-password").value,
		job:"save customer",
		country:"",
		state:"",
		city:"",
		street:""
	};

	if(getElement("customer-country") != null)
	{
		request.country = getElement("customer-country").value;
	}
	if(getElement("customer-state") != null)
	{
		request.state = getElement("customer-state").value;
	}
	if(getElement("customer-city") != null)
	{
		request.city = getElement("customer-city").value;
	}
	if(getElement("customer-street") != null)
	{
		request.street = getElement("customer-street").value;
	}

	let error = false;
	let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(request.name == "")
	{
		errorButton({btn:"save-customer-btn",msg:"Name is empty"});
		error = true;
	}
	else if(request.surname == "")
	{
		errorButton({btn:"save-customer-btn",msg:"Surname is empty"});
		error = true;
	}
	else if(request.phone == "")
	{
		errorButton({btn:"save-customer-btn",msg:"Invalid phone number"});
		error = true;
	}
	else if((request.password == "") && (request.customerid == ""))
	{
		errorButton({btn:"save-customer-btn",msg:"Password is empty"});
		error = true;
	}
	else if(request.email != "")
	{
		if(!regex.test(request.email))
		{
			errorButton({btn:"save-customer-btn",msg:"Invalid email"});
			error = true;
		}
	}

	if(error == false)
	{
		loadingButton({btn:"save-customer-btn"});

		postJson("hms-admin/worker", function(data, status){

			loadingButton({btn:"save-customer-btn", loading:false});
			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					if(d.data == "success")
					{
						$("#customerid").val("");
						$("#customer-name").val("");
						$("#customer-surname").val("");
						$("#customer-phone").val("");
						$("#customer-email").val("");
						$("#customer-password").val("");
						$("#guestid").val("");
						$("#save-customer-btn").addClass("positive");
						$("#save-customer-btn").html("<i class='check icon'></i> Customer Saved");

						setTimeout(function(){
							location.hash = "#customers";
						},2000);
					}
					else
					{
						errorButton({btn:"save-customer-btn",msg:d.message});
					}
				}
				else
				{
					errorButton({btn:"save-customer-btn",msg:"Unable to save data"});
				}
			}
			else
			{
				errorButton({btn:"save-customer-btn",msg:"Connection error"});
			}
		},request);
	}
}



function ConfirmGroupCustomerDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Customers?", function(choice){
		if(choice === true)
		{
			CustomerGroupDelete();
		}
	});
}

function ConfirmCustomerDelete(e, text = 'ban')
{

	ConfirmModal("Are you sure you want to "+text+" the selected Customer?", function(choice, param){
		if(choice === true)
		{
			CustomerListDelete(param);
		}
	}, null, null, e);
}

function CustomerGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteCustomer(lst[i].id, function(status, msg){
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Customers failed to delete");
		}
	}
	else
	{
		ShowModal("No Customers were selected");
	}
}

function CustomerListDelete(e)
{
	$('#'+e+'-btn').addClass('loading');
	DeleteCustomer(e, function(status, msg){
		$('#'+e+'-btn').removeClass('loading');
		if(status == "done")
		{
			populateCustomers(document.getElementById('table-body').getAttribute('data-page-id'));
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteCustomer(e, func)
{
	let request = {};
	request.Customerid = e;
	request.property = $("#property-id").val();
	request.job = "delete customer";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function loadEditCustomerData(e)
{
	$("#page").addClass("ui loading form");
	$("#save-customer-btn").html("<i class='save icon'></i> Save");

	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				getElement("customerid").value = d.data.Id;
				getElement("customer-name").value = d.data.Name;
				getElement("customer-surname").value = d.data.Surname;
				getElement("customer-phone").value = d.data.Phone;
				getElement("customer-email").value = d.data.Email;
				getElement("male-customer").checked = d.data.Sex == "male" ? true : false;
				getElement("sub-newsletter").checked = d.data.Newsletter;
				getElement("guestid").value = d.data.Guestid;

				if(getElement("customer-country") != null)
				{
					getElement("customer-country").value = d.data.Country;
				}
				if(getElement("customer-state") != null)
				{
					getElement("customer-state").value = d.data.State;
				}
				if(getElement("customer-city") != null)
				{
					getElement("customer-city").value = d.data.City;
				}
				if(getElement("customer-street") != null)
				{
					getElement("customer-street").value = d.data.Street;
				}
			}
			else
			{
				location.hash = "#customers";
				ShowModal(d.message);
			}
		}
		else
		{
			location.hash = "#customers";
			ShowModal("Connectiont error. Unable to load customers data");
		}
	}, {customerid:e, job:"get customer"});
}



//-------------------------------- Depertment Login --------------------------------------------//

function saveDepartment()
{
	let request = {
		dept_id:$("#department-id").val(),
		name:$("#department-name").val(),
		job: "save department"
	};

	if(request.name == "")
	{
		errorButton({btn:"save-dept-btn",msg:"Invalid name"});
	}
	else
	{
		loadingButton({btn:"save-dept-btn"});

		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"save-dept-btn",loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#save-dept-btn").addClass("positive");
					$("#save-dept-btn").html("<i class='check icon'></i> Saved");

					$("#department-id").val("");
					$("#department-name").val("");

					setTimeout(function(){
						$("#save-dept-btn").removeClass("positive");
						$("#save-dept-btn").html("<i class='save icon'></i> Save");
					},3000);

					populateDepartments();
				}
				else if(d.status == "exist")
				{
					errorButton({btn:"save-dept-btn",msg:"Depertment exist"});
				}
				else
				{
					errorButton({btn:"save-dept-btn",msg:"Unable to save"});
				}
			}
			else
			{
				errorButton({btn:"save-dept-btn",msg:"Connection error"});
			}
		},request);
	}
}

function editDepartment(id, name)
{
	loadModal({size:"m", title:"Edit Department", html:"<div class='pad-2'>" +
	"<input type='hidden' id='department-id' value='"+id+"'/>" +
	"<div class='ui fluid input'><input type='text' value='"+name+"' id='department-name' placeholder='Department Name'/></div></div>" +
	"<div class='pad-1' style='background-color: whitesmoke;'><button class='ui blue button' id='save-dept-btn' onclick='saveDepartment();'>Save</button></div>"});
}

function saveDepartmentEdit()
{
	let request = {
		dept_id:$("#department-edit-id").val(),
		name:$("#department-edit-name").val(),
		job: "save department"
	};

	if(request.name == "")
	{
		errorButton({btn:"save-dept-edit-btn",msg:"Invalid name"});
	}
	else
	{
		loadingButton({btn:"save-dept-edit-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"save-dept-edit-btn",loading:false});
			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					$("#save-dept-edit-btn").addClass("positive");
					$("#save-dept-edit-btn").html("<i class='check icon'></i> Saved");

					$("#department-id").val("");
					$("#department-name").val("");

					setTimeout(function(){
						$("#save-dept-edit-btn").removeClass("positive");
						$("#save-dept-edit-btn").html("<i class='save icon'></i> Add");
					},3000);

					populateDepartments();
				}
				else if(d.status == "exist")
				{
					errorButton({btn:"save-dept-edit-btn",msg:"Depertment exist"});
				}
				else
				{
					errorButton({btn:"save-dept-edit-btn",msg:"Unable to save"});
				}
			}
			else
			{
				errorButton({btn:"save-dept-edit-btn",msg:"Connection error"});
			}
		},request);
	}
}

function ConfirmDepartmentDelete(e)
{
	ConfirmModal("If there's a staff in the department, deleting it may cause a system malfunction. Continue?", function(choice, param){
		if(choice === true)
		{
			DepartmentListDelete(param);
		}
	}, null, null, e);
}

function DepartmentListDelete(e)
{
	$('#'+e+'-del-btn').html("<i class='spinner red loading icon'></i>");
	DeleteDepartment(e, function(status, msg){
		$('#'+e+'-del-btn').html("<i class='trash red icon'></i>");
		if(status == "done")
		{
			$('#'+e+'-del-btn').html("<i class='green check icon'></i>");
			setTimeout(function(){
				populateDepartments();
			}, 1000);
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteDepartment(e, func)
{
	let request = {};
	request.Departmentid = e;
	request.job = "delete department";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}





//------------------------   SHift Logic -----------------------------------

function saveShift()
{
	let request = {
		shiftid:$("#shiftid").val(),
		name:$("#shift-name").val(),
		monday:getElement("mon-check").checked,
		tueday:getElement("tue-check").checked,
		wedday:getElement("wed-check").checked,
		thuday:getElement("thu-check").checked,
		friday:getElement("fri-check").checked,
		satday:getElement("sat-check").checked,
		sunday:getElement("sun-check").checked,
		starthour:$("#start-hour").val(),
		stophour:$("#stop-hour").val(),
		startmin:$("#start-min").val(),
		stopmin:$("#stop-min").val(),
		startgmt:$("#start-gmt").val(),
		stopgmt:$("#stop-gmt").val(),
		job:"save shift"
	};

	if(request.name === "")
	{
			errorButton({btn:"shift-btn",msg:"No name"});
	}
	else if(!request.monday && !request.tueday && !request.wedday && !request.thuday && !request.friday && !request.satday && !request.sunday)
	{
			errorButton({btn:"shift-btn",msg:"Select days"});
	}
	else
	{
		loadingButton({btn:"shift-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"shift-btn",loading:false});
			if(status === "done")
			{
					let d = JSON.parse(data);

					if(d.status === "success")
					{
							if(d.data === "success")
							{
								$("#shiftid").val(""),
								$("#shift-name").val(""),
								getElement("mon-check").checked = false;
								getElement("tue-check").checked = false;
								getElement("wed-check").checked = false;
								getElement("thu-check").checked = false;
								getElement("fri-check").checked = false;
								getElement("sat-check").checked = false;
								getElement("sun-check").checked = false;
								$("#start-hour").dropdown('set text','01');
								$("#stop-hour").dropdown('set text','01');
								$("#start-min").val("00");
								$("#stop-min").val("00");
								$("#start-gmt").dropdown('set text','am');
								$("#stop-gmt").dropdown('set text','am');

								$("#shift-btn").addClass("positive");
								$("#shift-btn").html("<i class='check icon'></i> Saved");

								setTimeout(function(){
									$("#shift-btn").removeClass("positive");
									$("#shift-btn").html("Add");
								},3000);

								if(shifeditopen)
								{
									closeShiftEdit();
								}

								populateShift();
							}
							else {
								errorButton({btn:"shift-btn",msg:d.message});
							}
					}
					else {
							errorButton({btn:"shift-btn",msg:"Unable to save data"});
					}
			}
			else {
				errorButton({btn:"shift-btn",msg:"Connection error"});
			}
		},request);
	}
}

function ConfirmShiftDelete(e)
{
	ConfirmModal("If there's a staff on the shift, deleting it may cause a system malfunction. Would you liek to continue?", function(choice, param){
		if(choice === true)
		{
			ShiftListDelete(param);
		}
	}, null, null, e);
}

function ShiftListDelete(e)
{
	$('#'+e+'-del-btn').html("<i class='spinner loading icon'></i>");
	DeleteShift(e, function(status, msg){
	$('#'+e+'-del-btn').html("<i class='red trash icon'></i>");
		if(status == "done")
		{
			$('#'+e+'-del-btn').html("<i class='green check icon'></i>");
			setTimeout(function(){
				$('#'+e+'-row').slideUp(500, function(){
					document.getElementById('shift-tbl').removeChild(document.getElementById(e+'-row'));
				});
			}, 2000);
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteShift(e, func)
{
	let request = {};
	request.Shiftid = e;
	request.job = "delete shift";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

let shifeditopen = false;
function editShift(e, el)
{
		$(el).html("<i class='blue spinner loading icon'></i>");
		postJson("hms-admin/worker", function(data, status){
			$(el).html("<i class='blue pencil icon'></i>");
			if(status == "done")
			{
					let d = JSON.parse(data);

					if(d.status == "success")
					{
							shifeditopen = true;
							showShifEdit(function(){
									$("#shiftid").val(d.data.Id),
									$("#shift-name").val(d.data.Name),
									getElement("mon-check").checked = d.data.Monday;
									getElement("tue-check").checked = d.data.Tuesday;
									getElement("wed-check").checked = d.data.Wednesday;
									getElement("thu-check").checked = d.data.Thursday;
									getElement("fri-check").checked = d.data.Friday;
									getElement("sat-check").checked = d.data.Saturday;
									getElement("sun-check").checked = d.data.Sunday;
									$("#start-hour").dropdown('set text',d.data.Starthour < 10 ? "0"+d.data.Starthour : d.data.Starthour);
									$("#stop-hour").dropdown('set text',d.data.Stophour < 10 ? "0"+d.data.Stophour : d.data.Stophour);
									$("#start-min").val(d.data.Startminuite < 10 ? "0"+d.data.Startminuite : d.data.Startminuite);
									$("#stop-min").val(d.data.Stopminuite < 10 ? "0"+d.data.Stopminuite : d.data.Stopminuite);
									$("#start-gmt").dropdown('set text',d.data.Startgmt);
									$("#stop-gmt").dropdown('set text',d.data.Stopgmt);
							});
					}
					else {
							ShowModal("Connection error. Unable to load shift data");
					}
			}
			else {
				ShowModal("Connection error. Unable to load shift data");
			}
		},{job:"get single shift",Shiftid:e});
}

function showShifEdit(func)
{
		let modal = document.createElement("div");
		modal.style.position = "fixed";
		modal.style.backgroundColor = "rgba(0,0,0,0.6)";
		modal.style.top = "0px";
		modal.style.width = "100%";
		modal.style.height = "100%";
		modal.style.zIndex = 200;
		modal.id = "shift-modal";
		modal.style.overflowY = "auto";
		modal.className = "w3-row";
		modal.style.display = "none";


		document.body.appendChild(modal);

		$("#shift-modal").fadeIn(500, function(){
				getElement("dept-edit-con").style.zIndex = 230;
				getElement("dept-edit-con").style.position = "relative";
				$("#dept-edit-con").transition('pulse', function(){
					$("#edit-close-btn").transition("fade up in");

					$("#shift-btn").html("Save");

					if(typeof func == "function")
					{
						func();
					}
				});
		});
}

function closeShiftEdit()
{
		$("#edit-close-btn").transition("fade up out", function(){
				$("#dept-edit-con").transition('pulse', function(){
					getElement("dept-edit-con").style.zIndex = 1;
					getElement("dept-edit-con").style.position = "static";
					$("#shift-modal").fadeOut(500);

					shifeditopen = false;

					$("#shift-btn").html("Add");

					$("#shiftid").val(""),
					$("#shift-name").val(""),
					getElement("mon-check").checked = false;
					getElement("tue-check").checked = false;
					getElement("wed-check").checked = false;
					getElement("thu-check").checked = false;
					getElement("fri-check").checked = false;
					getElement("sat-check").checked = false;
					getElement("sun-check").checked = false;
					$("#start-hour").dropdown('set text','01');
					$("#stop-hour").dropdown('set text','01');
					$("#start-min").val("00");
					$("#stop-min").val("00");
					$("#start-gmt").dropdown('set text','am');
					$("#stop-gmt").dropdown('set text','am');

				});
		});
}




//---------------------------------------- Staff Logic -----------------------------//

function saveStaff()
{
	let request = {
		staffid:$("#staff-id").val(),
		name:$('#staff-name').val(),
		surname:$('#staff-surname').val(),
		phone:$('#staff-phone').val(),
		email:$('#staff-email').val(),
		country:$('#country').dropdown('get value'),
		state:$('#staff-state').val(),
		address:$('#staff-address').val(),
		sex:$('#staff-sex').val(),
		dateofbirth:$('#staff-dateofbirth').val(),
		department:$('#staff-department').val(),
		shift:$('#staff-shifts').val(),
		position:$('#staff-position').val(),
		salary:$('#staff-salary').val(),
		bank:$('#staff-bank').val(),
		accountnum:$('#staff-acc-num').val(),
		accname:$('#staff-acc-name').val(),
		biodata:$('#bio-data').val(),
		passport:$('#passport_file').val(),
		fullshot:$('#fullshot_file').val(),
		job:"save staff"
	};

	let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(request.name == "")
	{
			errorButton({msg:"Name is empty",btn:"staff-save-btn"});
	}
	else if(request.surname == "")
	{
			errorButton({msg:"Surname is empty",btn:"staff-save-btn"});
	}
	else if(request.phone == "")
	{
			errorButton({msg:"Phone is empty",btn:"staff-save-btn"});
	}
	else if((request.email != "") && (!regex.test(request.email)))
	{
			errorButton({msg:"Invalid email",btn:"staff-save-btn"});
	}
	else if((request.department == "") || (request.department == null))
	{
			errorButton({msg:"Invalid department",btn:"staff-save-btn"});
	}
	else if((request.shift == "") || (request.shift == null))
	{
			errorButton({msg:"Invalid shifts",btn:"staff-save-btn"});
	}
	else if(Number(request.salary) < 1)
	{
			errorButton({msg:"Invalid salary",btn:"staff-save-btn"});
	}
	else if(request.biodata == "")
	{
			errorButton({msg:"Invalid biodata",btn:"staff-save-btn"});
	}
	else
	{
		loadingButton({btn:"staff-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"staff-save-btn",loading:false});

			if(status == "done")
			{
					let d = JSON.parse(data);

					if (d.status == "success")
					{
						if (request.staffid == '')
						{
							$('#staff-name').val("");
							$('#staff-surname').val("");
							$('#staff-phone').val("");
							$('#staff-email').val("");
							//$('#nationality').val(),
							$('#staff-state').val("");
							$('#staff-address').val("");
							//$('#staff-sex').val(),
							$('#staff-dateofbirth').val("");
							//$('#staff-department').val(),
							//$('#staff-shifts').val(),
							$('#staff-position').val("");
							$('#staff-salary').val("0.00");
							//$('#staff-bank').val(),
							$('#staff-acc-num').val("");
							$('#staff-acc-name').val("");
							$('#bio-data').val("");
							$('#passport_file').val("");
							$('#fullshot_file').val("");
						}

						$("#staff-save-btn").addClass("positive");
						$("#staff-save-btn").html("<i class='check icon'></i> Saved");

						setTimeout(function(){
							$("#staff-save-btn").removeClass("positive");
							$("#staff-save-btn").html("<i class='save icon'></i>Save");
							window.location.reload();
						},1000);
					}
					else {
							errorButton({msg:"Failed!",btn:"staff-save-btn"});
					}
			}
			else {
					errorButton({btn:"staff-save-btn",msg:"Connection Error"});
			}
		}, request);
	}
}

function loadEditStaff()
{
	let staffid = getArg(1);

	// build request
	let request = {
		job : 'get single staff',
		staffid : staffid
	};

	// make request
	$("#page").addClass("ui loading form");

	// send request
	postJson('hms-admin/worker', (response, status)=>{
		if (status == 'done')
		{
			$('#page').removeClass('ui loading form');

			var data = JSON.parse(response);

			// are we good ?
			if (data.status == 'success')
			{
				// get data
				data = data.data;

				let dob = data.Dateofbirth;

				console.log(data);
				document.getElementById('bio-data').value = data.Biodata;
				document.getElementById('fullshot-photo').src = phpvars.FILES_CDN + data.Fullshot; 
				document.getElementById('passport-photo').src = phpvars.FILES_CDN + data.Passport;
				$('#staff-dateofbirth').val(dob.Month+'/'+dob.Day+'/'+dob.Year);
				document.getElementById('staff-id').value = data.Id;
				document.getElementById('passport_file').value = data.Passport;
				document.getElementById('fullshot_file').value = data.Fullshot;
				$("#country").dropdown("set selected", data.Nationality.Code);

				$('#staff-name').val(data.Name);
				$('#staff-surname').val(data.Surname);
				$('#staff-phone').val(data.Phone);
				$('#staff-email').val(data.Email);
				//$('#nationality').val(),
				$('#staff-state').val(data.State);
				$('#staff-address').val(data.Address);
				
				$('#staff-position').val(data.Position);
				$('#staff-salary').val(data.Salary);
				$('#staff-acc-num').val(data.Accountnumber);
				$('#staff-acc-name').val(data.Accountname);


				$("#staff-bank").dropdown('set selected', data.Bank);
				
				$("#staff-shifts").dropdown({allowAdditions:true});
				$("#staff-sex").dropdown('set selected', data.Sex);
				$("#staff-department").val(data.Department.Id);
				
				
				data.Shift.forEach((shift)=>{
					$("#staff-shifts").dropdown('set selected', shift.Id);
				});
				

				
			}
		}
	}, request);
}

function ConfirmGroupStaffDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Staff?", function(choice){
		if(choice === true)
		{
			StaffGroupDelete();
		}
	});
}

function ConfirmStaffDelete(e)
{
	ConfirmModal("Are you sure you want to delete the Staff?", function(choice, param){
		if(choice === true)
		{
			StaffListDelete(param);
		}
	}, null, null, e);
}

function StaffGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteStaff(lst[i].id, function(status, msg){
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status === "done")
				{
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Staffs failed to delete");
		}
	}
	else
	{
		ShowModal("No Staffs were selected");
	}
}

function StaffListDelete(e)
{
	$('#'+e+'-btn').addClass('loading');
	DeleteStaff(e, function(status, msg){
		$('#'+e+'-btn').removeClass('loading');
		if(status === "done")
		{
			populateStaff(staffCurrentPage || 1);
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteStaff(e, func)
{
	let request = {};
	request.Staffid = e;
	request.job = "delete staff";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}



function generateBarcode()
{
	loadingButton({btn:"bar-code-gen-btn"});
	postJson("hms-admin/worker", function(data, status){
		loadingButton({btn:"bar-code-gen-btn",loading:false});
		if(status == "done")
		{
				let d = JSON.parse(data);
				if(d.status == "success")
				{
					// $("#bio-data").val(d.data);
					document.getElementById('bio-data').value = d.data;
				}
				else
				{
					ShowModal("Unable to generate bar code");
				}
		}
		else
		{
				ShowModal("Connection error");
		}
	},{job:'generate barcode'});
}


function processPassport(e)
{
	cropImage({shape:"circle", file:e.files[0]}, function(blob, URL){
		getElement("passport-photo").src = URL.createObjectURL(blob);

		let img = new File([blob], "file.png");

		loadingButton({btn:"passport-btn"});
		formWorking(true);
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			formWorking(false);
			loadingButton({btn:"passport-btn",loading:false});
			if(status == "done")
			{
				let d = JSON.parse(data);

				if(d.status == "success")
				{
					$("#passport_file").val(d.data);
				}
				else
				{
					getElement("passport-photo").src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("passport-photo").src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	});
}


function formWorking(e=false)
{
	if(e){$("#staff-save-btn").html("A file is uploading");$("#staff-save-btn").prop("disabled", true);}
	else{$("#staff-save-btn").html("<i class='save icon'></i> Save");$("#staff-save-btn").prop("disabled", false);}
}


function processFullshot(e)
{
	cropImage({file:e.files[0]}, function(blob, URL){
			getElement("fullshot-photo").src = URL.createObjectURL(blob);

			let img = new File([blob], "file.png");

			loadingButton({btn:"fullshot-btn"});
			formWorking(true);
			let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
			upload.Upload(function(data, status){
					formWorking(false);
					loadingButton({btn:"fullshot-btn",loading:false});
					if(status === "done")
					{
						let d = JSON.parse(data);

						if(d.status === "success")
						{
								$("#fullshot_file").val(d.data);
						}
						else
						{
								getElement("fullshot-photo").src = "";
								ShowModal("Application error. Unable to upload file please try again");
						}
					}
					else
					{
							getElement("fullshot-photo").src = "";
							ShowModal("Connection error. Unable to upload file please try again");
					}
			});
	});
}



//---------------------------   banner managed events  ------------------------------------------//

function loadBannerEditor()
{
	let request = {job:'get banner config'};

	postJson("hms-admin/worker", function(data, status)
	{
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				/*if(d.data.Config.enabled === "false")
				{
					$("#banner-edit-page").html("<div class='align-c pad-2'><br/><br/>" +
						"<h3 class='ui icon header sleak-b' style='font-weight: normal; color: dimgray;'>" +
						"<img src='"+host+"cdn/images/icons/pastel/empty_box.png'/><br/><br/>" +
						"The theme you are using does not support banners</h3><br/><br/>" +
						"</div>");
				}
				else
				{
				 */
					$("#banner-edit-page").html("<div id='banner-edit-con' class='l-pad-3 s-pad-1'>" +
						"<div class='widget lift-1' style='min-height: 300px; position: relative;'>" +

						"<img id='cover-img' style='width: 100%;'/>" +
						"<button id='cover-img-btn' class='ui circular icon blue large button' style='position: absolute; bottom: -14px; left: -14px;'" +
						"onclick=\"document.getElementById('banner-file').click()\">" +
						"<i class='image icon'></i></button>" +
						"<input id='banner-file' type='file' onchange='processBanner(this)' style='display: none;'/>" +
						"<input id='fullshot_file' type='hidden' value=''/> "+
						"</div> " +
						"</div>");


					//if(d.data.Config.text === "enabled")
					//{
						getElement("banner-edit-con").appendChild(div({class:"ui fluid form margin-t-2 w3-container",
								add:"<div class='field w3-col l-width-5'>" +
									"<label class='sleak' style='color: dimgray;'>Main Text</label>" +
									"<textarea id='banner-maintext' class='wix-textbox' rows='4'></textarea>" +
									"</div>"}));

						//if(d.data.Config.subtext === "enabled")
						//{
							getElement("banner-edit-con").appendChild(div({class:"ui form margin-t-3 w3-container",
								add:"<div class='field w3-col l-width-5'>" +
									"<label class='sleak' style='color: dimgray;'>Sub Text</label>" +
									"<textarea id='banner-sub' class='wix-textbox' rows='2'></textarea>" +
									"</div>"}));
						//}
					//}

				//}


				getElement("banner-edit-con").appendChild(div({class:"ui form margin-t-3 w3-container",
					add:"<div class='w3-col l-width-5'>" +
						"<label class='sleak' style='color: dimgray;'>Sort</label> " +
						"<div class='ui input'>" +
						"<input id='banner-sort' type='number' value='0'/>" +
						"</div>" +
						"</div>"}));

				getElement("banner-edit-con").appendChild(div({class:"ui form margin-t-3 w3-container",
					add:"<div class='w3-col l-width-5'>" +
						"<div class='switch'>" +
						"<span>Status</span>" +
						"<label><input id='banner-status' type='checkbox' value='0' checked/><span class='lever'></span></label>" +
						"</div>" +
						"</div>"}));


				let hueb = [];
				var elem = $('.color-input');
				for(let q = 0; q < elem.length; q++)
				{
					hueb.push(new Huebee(elem[q]));
				}

				/*hueb.on( 'change', function( color ) {
					back_color(color)
				});*/

				$(".ui.dropdown").dropdown();


				let arg = getArg();

				if(arg != null)
				{
					loadBanner(arg);
				}
			}
			else
			{
				$("#banner-edit-page").html("<div class='align-c pad-2'><br/><br/>" +
					"<h3 class='ui icon header sleak'><i class='exclamation circle icon' " +
					"style='color: rgba(255,0,0,0.3);'></i>" +
					"Connection error. Unable to load banner configuration</h3><br/><br/>" +
					"<button class='ui green-back sleak compact button' onclick='loadBannerEditor()'>Try again</button> " +
					"</div>");
			}
		}
		else
		{
			$("#banner-edit-page").html("<div class='align-c pad-2'><br/><br/>" +
				"<h3 class='ui icon header sleak'><i class='exclamation circle icon' " +
				"style='color: rgba(255,0,0,0.3);'></i>" +
				"Connection error. Unable to load banner configuration</h3><br/><br/>" +
				"<button class='ui green-back sleak compact button' onclick='loadBannerEditor()'>Try again</button> " +
				"</div>");
		}
	},request);
}

function loadBanner(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#banner-id").val(d.data.Id);
				$("#fullshot_file").val(d.data.Image);
				getElement("cover-img").src = "files/"+d.data.Image;
				$("#banner-maintext").val(d.data.Text);
				$("#banner-sub").val(d.data.Subtext);
				$("#banner-sort").val(d.data.Sort);
				getElement("banner-status").checked = d.data.Status;
			}
			else
			{
				location.hash = "#banners";
				ShowModal("Connection error! Unable to retrieve data. Reload the page and try again");
			}
		}
		else
		{
			location.hash = "#banners";
			ShowModal("Connection error! Unable to retrieve data. Check your onnection and try again");
		}
	},{banner:e, job:"get banner"});
}

function processBanner(e)
{
	cropImage({file:e.files[0],ratio:2.5/1,size:"original"}, function (blob, URL) {

		getElement("cover-img").src = URL.createObjectURL(blob);

		let img = new File([blob], "file.png");

		loadingButton({btn:"cover-img-btn"});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			formWorking(false);
			loadingButton({btn:"cover-img-btn",loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#fullshot_file").val(d.data);
				}
				else
				{
					getElement("cover-img").src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("cover-img").src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	});
}

function saveBanner()
{
	let request = {
		id:$("#banner-id").val(),
		image:$("#fullshot_file").val(),
		main:$("#banner-maintext").val(),
		sub:$("#banner-sub").val(),
		sort:$("#banner-sort").val(),
		status:getElement("banner-status").checked,
		job:"save banner"
	};

	if(request.image === "")
	{
		errorButton({btn:"banner-save-btn", msg:"Select an Image"});
	}
	else if(request.main === "")
	{
		errorButton({btn:"banner-save-btn", msg:"Main text is empty"});
	}
	else if(request.sub === "")
	{
		errorButton({btn:"banner-save-btn", msg:"Subtext is empty"});
	}
	else
	{
		loadingButton({btn:"banner-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"banner-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#fullshot_file").val("");
					getElement("cover-img").src = "";
					$("#banner-id").val();
					$("#banner-maintext").val("");
					$("#banner-sub").val("");
					$("#banner-sort").val(0);
					getElement("banner-status").checked = true;

					$("#banner-save-btn").html("<i class='check icon'></i> Banner saved");
					$("#banner-save-btn").addClass("disabled positive");
					setTimeout(function () {
						$("#banner-save-btn").html("<i class='plus icon'></i> Save Banner");
						$("#banner-save-btn").removeClass("disabled positive");
					}, 3000);
				}
				else if(d.status === "failed")
				{
					errorButton({btn:"banner-save-btn", msg:"Failed. Reload page & retry"});
				}
				else
				{
					errorButton({btn:"banner-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"banner-save-btn", msg:"Connection error"});
			}
		},request);
	}
}


function SetBanner_Status(e, id)
{
	let request = {};
	request.Bannerid = id;
	request.Status = e.checked;
	request.job = "set banner status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save Banner Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Banner Status");
		}
	}, request);
}



function ConfirmGroupBannerDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Banners?", function(choice){
		if(choice === true)
		{
			BannerGroupDelete();
		}
	});
}

function ConfirmBannerDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Banner?", function(choice, param){
		if(choice === true)
		{
			BannerListDelete(param);
		}
	}, null, null, e);
}

function BannerGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteBanner(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});

				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Banners failed to delete");
		}
	}
	else
	{
		ShowModal("No Banners were selected");
	}
}

function BannerListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeleteBanner(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status === "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteBanner(e, func)
{
	let request = {};
	request.Bannerid = e;
	request.job = "delete banner";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else if(d.status === "access denied")
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", "Operation failed. Try again");
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}



//----------------------------------  Admin user events ------------------------------//

function  saveAdminUser()
{
	let request = {
		userid:$("#adminuserid").val(),
		staffid:"",
		username:$("#username").val(),
		name:$("#full-name").val(),
		role:$("#role-list").val(),
		password:$("#admin-user-password").val(),
		job:"save admin user"
	};

	if(getElement("use-staff-list-chk") !== null)
	{
		if(getElement("use-staff-list-chk").checked)
		{
			request.staffid = $("#staff-list").val();
		}
	}


	if(request.name.split(" ").length < 2)
	{
		errorButton({btn:"save-admin-user-btn", msg:"Full name is required"});
	}
	else if(request.username === "")
	{
		errorButton({btn:"save-admin-user-btn", msg:"Username is required"});
	}
	else if(request.role === "")
	{
		errorButton({btn:"save-admin-user-btn", msg:"Select role"});
	}
	else if(request.password === "" && request.userid == '')
	{
		errorButton({btn:"save-admin-user-btn", msg:"Password is required"});
	}
	else if(request.password !== $("#admin-user-password-conf").val() && request.userid == '')
	{
		errorButton({btn:"save-admin-user-btn", msg:"Passwords don't match"});
	}
	else
	{
		loadingButton({btn:"save-admin-user-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"save-admin-user-btn",loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#username").val("");
					$("#full-name").val("");
					$("#admin-user-password").val("");
					$("#admin-user-password-conf").val("");

					$("#save-admin-user-btn").html("<i class='check icon'></i>User saved");
					$("#save-admin-user-btn").addClass("positive");
					setTimeout(function () {
						$("#save-admin-user-btn").html("Create User");
						$("#save-admin-user-btn").removeClass("positive");
					}, 3000);
				}
				else
				{
					errorButton({btn:"save-admin-user-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"save-admin-user-btn", msg:"Connection error"});
			}
		},request);
	}
}


function ConfirmGroupUserDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Users?", function(choice){
		if(choice === true)
		{
			UserGroupDelete();
		}
	});
}

function ConfirmUserDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Users?", function(choice, param){
		if(choice === true)
		{
			UserListDelete(param);
		}
	}, null, null, e);
}

function UserGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteUser(lst[i].id, function(status, msg){
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status === "done")
				{
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Users failed to delete");
		}
	}
	else
	{
		ShowModal("No Users were selected");
	}
}

function UserListDelete(e)
{
	$("#"+e+"-btn").addClass("loading");
	DeleteUser(e, function(status, msg){
		$("#"+e+"-btn").removeClass("loading");
		if(status === "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteUser(e, func)
{
	let request = {
		Userid:e,
		job:"delete admin user"
	};

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}


function SetUserStatus(e, id)
{
	let request = {};
	request.userid = id;
	request.status = e.checked;
	request.job = "set user status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !e.checked;
				ShowModal("Unable to save user status");
			}
		}
		else
		{
			e.checked = !e.checked;
			ShowModal("Connection error. Unable to save user status");
		}
	}, request);
}



//-------------------- Terms and conditions logic------------------------------//

function getTermsandConditions()
{
	$("#tandc-con").html(
		"<div class='ui placeholder'>" +
		"<div class='line'></div> " +
		"<div class='line'></div> " +
		"</div>" +
		"<div class='ui placeholder'>" +
		"<div class='line'></div> " +
		"<div class='line'></div> " +
		"</div>");

	postJson("hms-admin/worker", function (data, status) {
		$("#tandc-con").html("");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(d.data === "")
				{
					let con ="<h3 class='align-c pad-2' style='font-family: montserratlight; color: silver;'>" +
						"<img src='"+host+"cdn/images/icons/pastel/empty_box.png' style='width: 70px;'/>" +
						"<br/><br/>Your Terms & Condition is empty. Delete this content and type here</h3>";

					$("#tandc-con").html("<textarea id='tandc-edit-con' style='width: 100%;'>"+con+"</textarea>");
					InitEditor(getElement("tandc-edit-con"));
					$("#tandc-con").removeClass("pad-2");
					$("#tandc-save-btn").removeClass("disabled");
				}
				else
				{
					$("#tandc-con").html("<textarea id='tandc-edit-con' style='width: 100%;'>"+d.data+"</textarea>");
					InitEditor(getElement("tandc-edit-con"));
					$("#tandc-con").removeClass("pad-2");
					$("#tandc-save-btn").removeClass("disabled");
				}
			}
			else
			{
				$("#tandc-con").html("<h4 class='align-c' style='font-family: nunitoregular;'>" +
					"<i class='web icon'></i>Connection Error!</h4>");
			}
		}
		else
		{
			$("#tandc-con").html("<h4 class='align-c' style='font-family: nunitoregular;'>" +
				"<i class='web icon'></i>Connection Error!</h4>");
		}
	},{job:"get t&c"});
}


function saveTandc()
{
	let request = {
		content:$("#tandc-edit-con").val(),
		job:"save t&c"
	};

	let store = "<h3 class=\"align-c pad-2\" style=\"font-family: montserratlight; color: silver;\"><img src=\"http://localhost/hotels/cdn/images/icons/pastel/empty_box.png\" style=\"width: 70px;\"><br><br>Your Terms &amp; Condition is empty. Delete this content and type here</h3>";

	if(store === request.content)
	{
		errorButton({btn:"tandc-save-btn",msg:"Invalid content"});
	}
	else
	{
		loadingButton({btn:"tandc-save-btn"});
		postJson("hms-admin/worker", function (data, status) {
			loadingButton({btn:"tandc-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#tandc-save-btn").addClass("positive");
					$("#tandc-save-btn").html("<i class='check icon'></i>Document saved");
					setTimeout(function () {
						$("#tandc-save-btn").removeClass("positive");
						$("#tandc-save-btn").html("<i class='save icon'></i>Save");
					}, 3000);
				}
				else
				{
					errorButton({btn:"tandc-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"tandc-save-btn", msg:"Connection error"});
			}
		}, request);
	}
}




//-------------------- Privacy Policy logic------------------------------//

function getPrivacyPolicy()
{
$("#tandc-con").html(
	"<div class='ui placeholder'>" +
	"<div class='line'></div> " +
	"<div class='line'></div> " +
	"</div>" +
	"<div class='ui placeholder'>" +
	"<div class='line'></div> " +
	"<div class='line'></div> " +
	"</div>");

postJson("hms-admin/worker", function (data, status) {
	$("#tandc-con").html("");
	if(status === "done")
	{
		let d = JSON.parse(data);

		if(d.status === "success")
		{
			if(d.data === "")
			{
				let con ="<h3 class='align-c pad-2' style='font-family: montserratlight; color: silver;'>" +
					"<img src='"+host+"cdn/images/icons/pastel/empty_box.png' style='width: 70px;'/>" +
					"<br/><br/>Your Privacy Policy is empty. Delete this content and type here</h3>";

				$("#tandc-con").html("<textarea id='tandc-edit-con' style='width: 100%;'>"+con+"</textarea>");
				InitEditor(getElement("tandc-edit-con"));
				$("#tandc-con").removeClass("pad-2");
				$("#tandc-save-btn").removeClass("disabled");
			}
			else
			{
				$("#tandc-con").html("<textarea id='tandc-edit-con' style='width: 100%;'>"+d.data+"</textarea>");
				InitEditor(getElement("tandc-edit-con"));
				$("#tandc-con").removeClass("pad-2");
				$("#tandc-save-btn").removeClass("disabled");
			}
		}
		else
		{
			$("#tandc-con").html("<h4 class='align-c' style='font-family: nunitoregular;'>" +
				"<i class='web icon'></i>Connection Error!</h4>");
		}
	}
	else
	{
		$("#tandc-con").html("<h4 class='align-c' style='font-family: nunitoregular;'>" +
			"<i class='web icon'></i>Connection Error!</h4>");
	}
},{job:"get privacy policy"});
}

function savePrivacyPolicy()
{
let request = {
	content:$("#tandc-edit-con").val(),
	job:"save privacy policy"
};

let store = "<h3 class=\"align-c pad-2\" style=\"font-family: montserratlight; color: silver;\"><img src=\"http://localhost/hotels/cdn/images/icons/pastel/empty_box.png\" style=\"width: 70px;\"><br><br>Your Privacy Policy is empty. Delete this content and type here</h3>";

if(store === request.content)
{
	errorButton({btn:"tandc-save-btn",msg:"Invalid content"});
}
else
{
	loadingButton({btn:"tandc-save-btn"});
	postJson("hms-admin/worker", function (data, status) {
		loadingButton({btn:"tandc-save-btn", loading:false});
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#tandc-save-btn").addClass("positive");
				$("#tandc-save-btn").html("<i class='check icon'></i>Document saved");
				setTimeout(function () {
					$("#tandc-save-btn").removeClass("positive");
					$("#tandc-save-btn").html("<i class='save icon'></i>Save");
				}, 3000);
			}
			else
			{
				errorButton({btn:"tandc-save-btn", msg:d.message});
			}
		}
		else
		{
			errorButton({btn:"tandc-save-btn", msg:"Connection error"});
		}
	}, request);
}
}







//---------------------------------  Faq Logic Zone --------------------------------------//

function saveFaq()
{
	let request = {
		faqid:$("#faqid").val(),
		question:$("#faq-question").val(),
		answer:$("#faq-answer").val(),
		sort:$("#faq-sort").val(),
		category:$("#faq-category").val(),
		status:getElement("faq-status").checked,
		job:"save faq"
	};

	if(request.question === "")
	{
		errorButton({btn:"faq-save-btn", msg:"Question is empty"});
	}
	else if(request.answer === "")
	{
		errorButton({btn:"faq-save-btn", msg:"Answer is empty"});
	}
	else if(request.category === "")
	{
		errorButton({btn:"faq-save-btn", msg:"Category is empty"});
	}
	else
	{
		loadingButton({btn:"faq-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"faq-save-btn",loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#faqid").val("");
					$("#faq-question").val("");
					$("#faq-answer").val("");
					$("#faq-sort").val(0);
					$("#faq-category").dropdown('set default'),
					getElement("faq-status").checked = false;

					$("#faq-save-btn").html("<i class='check icon'></i> FAQ Saved");
					$("#faq-save-btn").addClass("positive");
					setTimeout(function(){
						$("#faq-save-btn").html("Save FAQ");
						$("#faq-save-btn").removeClass("positive");
					},2000);
				}
				else
				{
					errorButton({btn:"faq-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"faq-save-btn", msg:"Connection error"});
			}
		},request);
	}
}

function SetFaq_Status(e, id)
{
	let request = {
		Faqid:id,
		Status:e.checked,
		job:"set faq status"
	};

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !request.Status;
				ShowModal("Unable to save Faq Status");
			}
		}
		else
		{
			e.checked = !request.Status;
			ShowModal("Connection error. Unable to save Faq Status");
		}
	}, request);
}


function viewFaqAnswer(e)
{
	let r = JSON.parse(unescape(e));

	loadModal({title:"FAQ Answer",size:"m",html:"<div class='pad-2'>" +
	"<div class=''>" +
	"<h6 class='sleak-b blue'>Question</h6>" +
	"<h6>"+r.Question+"</h6>" +
	"</div>" +
	"<div class=''>" +
	"<br/>" +
	"<h6 class='sleak-b blue'>Answer</h6>" +
	"<p style='color: dimgray;'>"+r.Answer+"</p>" +
	"</div>" +
	"</div>"});
}


function ConfirmGroupFaqDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected FAQs?", function(choice){
		if(choice === true)
		{
			FaqGroupDelete();
		}
	});
}

function ConfirmFaqDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected FAQ?", function(choice, param){
		if(choice === true)
		{
			FaqListDelete(param);
		}
	}, null, null, e);
}

function FaqGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteFaq(lst[i].id, function(status, msg){
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Faqs failed to delete");
		}
	}
	else
	{
		ShowModal("No Faqs were selected");
	}
}

function FaqListDelete(e)
{
	//Loading animation here
	DeleteFaq(e, function(status, msg){
		//Stop Animation here
		//
		if(status === "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteFaq(e, func)
{
	let request = {};
	request.Faqid = e;
	request.job = "delete faq";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

let faqCat_modal = null;

function showfaqcategory()
{
	loadModal({title:"FAQ Category", size:'l',html:"<div class='pad-1 align-r'>"+
	"<button id='new-cat-btn' class='ui sleak compact blue-back button'>New Category</button>" +
	"</div>" + div({class:"pad-1", add:"<table class='ui basic table'>" +
		"<thead class='sleak'>" +
			"<th>SN</th>" +
			"<th>Name</th>" +
			"<th>Sort</th>" +
			"<th>Status</th>" +
			"<th>Action</th>" +
		"</thead>" +
		"<tbody id='faq-cat-body'>" +

		"</tbody>" +
		"<tfoot>" +
			"<tr>" +
			"<th colspan='1'>" +
			"<h4 class='ui header'>" +
			"<div class='content'>" +
			"<div id='faq-cat-perpage' class='ui inline dropdown'>" +
			"<div class='text sleak'> 25</div>" +
			"<i class='dropdown icon'></i>" +
			"<div class='menu'>" +
			"<div class='header'>Show per page</div>" +
			"<div class='active item' data-text='25'>25</div>" +
			"<div class='item' data-text='50'>50</div>" +
			"<div class='item' data-text='100'>100</div>" +
			"<div class='item' data-text='200'>200</div>" +
			"<div class='item' data-text='300'>300</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</h4>" +
			"" +
			"</th>" +
			"<th colspan='6'>" +
			"      <div id='faq-cat-pages' class='ui right floated pagination tiny compact menu'>" +
			"      </div>" +
			"    </th>" +
			"</tr>" +
		"</tfoot>" +
	"</table>"}).outerHTML, onLoaded: function(o){

		$("#faq-cat-perpage").dropdown();
		populateFaqcategory();

		faqCat_modal = o.modal;

		getElement("new-cat-btn").onclick = function(){
			closeGenModal(o.modal, function(){
				showNewfaqcategory();
			});
		};

	}});
}

function showNewfaqcategory(o)
{
	let name = "";
	let sort = 0;
	let status = "checked";
	let id = "";
	let title = "Create New FAQ Category";

	if(o != null)
	{
		if(o.id != null)
		{
			id = o.id;
			title = "Edit FAQ Category";
		}
		if(o.name != null)
		{
			name = o.name;
		}
		if(o.sort != null)
		{
			sort = o.sort;
		}
		if(o.status != null)
		{
			status = o.status ? "checked" : "";
		}
	}

	loadModal({title:title, size:'s',html:"<div class='pad-1 align-r'>"+
	"<button id='new-cat-btn' class='ui sleak compact blue-back button'>Category List</button>" +
	"</div>" + div({class:"pad-2", add:"<div>" +

	"<input id='faq-cat-id' type='hidden' value='"+id+"'/>" +

	"<label>Category Name</label>" +
	"<div class='ui fluid input'><input id='faq-cat-title' class='wix-textbox' type='text' value='"+name+"'/></div><br/>" +
	"<div class='ui fluid labeled input'><label class='ui sleak label'>Sort</label><input id='faq-cat-sort' class='wix-textbox' type='number' value='"+sort+"'/></div><br/>" +
	"<div class='switch'><label><input id='faq-cat-status' type='checkbox' "+status+"/><span class='lever'></span></label>Status</div><br/>" +
	"<div><button id='faq-cat-save-btn' class='ui green-back sleak compact button' onclick='saveFaqCategory()'><i class='save icon'></i>Save</button></div>" +

	"</div>"}).outerHTML, onLoaded: function(o){

		$("#faq-cat-perpage").dropdown();
		populateFaqcategory();

		getElement("new-cat-btn").onclick = function(){
			closeGenModal(o.modal, function(){
				showfaqcategory();
			});
		};

	}});
}

function saveFaqCategory()
{
	let request = {
		catid:$("#faq-cat-id").val(),
		title:$("#faq-cat-title").val(),
		sort:$("#faq-cat-sort").val(),
		status:getElement("faq-cat-status").checked,
		job:"save faq category"
	};

	if(request.title === "")
	{
		errorButton({btn:"faq-cat-save-btn",msg:"Name is empty"});
	}
	else
	{
		loadingButton({btn:"faq-cat-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"faq-cat-save-btn",loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#faq-cat-id").val(""),
					$("#faq-cat-title").val(""),
					$("#faq-cat-sort").val(0);
					getElement("faq-cat-status").checked = true;

					$("#faq-cat-save-btn").html("<i class='check icon'></i>Saved");
					$("#faq-cat-save-btn").addClass("positive");
					$("#faq-cat-save-btn").addClass("disabled");

					setTimeout(function(){
						$("#faq-cat-save-btn").html("<i class='save icon'></i>Save");
						$("#faq-cat-save-btn").removeClass("positive");
						$("#faq-cat-save-btn").removeClass("disabled");
					},2000);
				}
				else
				{
					errorButton({btn:"faq-cat-save-btn",msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"faq-cat-save-btn",msg:"Connection error"});
			}
		},request);
	}
}


function editFaqcategory(o)
{
	let res = JSON.parse(unescape(o));
	let r = {id:res.Id, name:res.Name, sort:res.Sort, status:res.Status};

	closeGenModal(faqCat_modal, function(){
		showNewfaqcategory(r);
	});
}


function SetFaqcategory_Status(e, id)
{
	let request = {};
	request.Faqcategoryid = id;
	request.Status = e.checked;
	request.job = "set faq category status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !request.Status;
				ShowModal("Unable to save Faqcategory Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Faqcategory Status");
		}
	}, request);
}


function ConfirmFaqcategoryDelete(e)
{
	ConfirmModal("Are you sure you want to delete the FAQ category?", function(choice, param){
		if(choice === true)
		{
			FaqcategoryListDelete(param);
		}
	}, null, null, e);
}

function FaqcategoryListDelete(e)
{
	//Loading animation here
	$("#faqcat-del-btn-"+e).removeClass("trash");
	$("#faqcat-del-btn-"+e).addClass("spinner");
	$("#faqcat-del-btn-"+e).addClass("loading");
	DeleteFaqcategory(e, function(status, msg){
		//Stop Animation here
		$("#faqcat-del-btn-"+e).addClass("trash");
		$("#faqcat-del-btn-"+e).removeClass("spinner");
		$("#faqcat-del-btn-"+e).removeClass("loading");
		if(status == "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteFaqcategory(e, func)
{
	let request = {};
	request.Faqcategoryid = e;
	request.job = "delete faq category";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}




//------------------------   Doing Content Logic --------------------------------//

function processGalleryImage(e, id, canSave=true, defaultImage = '', processFunction = null)
{
	cropImage({file:e.files[0], ratio:1/1, args : arguments}, function(blob, URL, n){

		getElement("gallery-image-"+n.toString()).src = URL.createObjectURL(blob);

		let img = new File([blob], "file.png");

		// get args
		var args = this.CropConfig.args;

		loadingButton({btn:"gallery-btn-"+n.toString()});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			loadingButton({btn:"gallery-btn-"+n.toString(),loading:false});
			if(status === "done")
			{
				var failed = true;

				if (data.trim().match(/^[\{]/))
				{
					let d = JSON.parse(data);

					if(d.status === "success")
					{
						// get previous image
						let prevImage = $("#gallery-image-name-"+n.toString()).val();

						// change image
						$("#gallery-image-name-"+n.toString()).val(d.data);

						// can we save??
						if (args[2] === true){
							activateGallery(n);
							saveGallery(n);
							checkGalleryPlaceholders();
						}

						// load process function
						if (args[4] != null)
						{
							if (args[4].toString().match(/[\S]+/g))
							{
								window[args[4]](d.data, prevImage, n);
							}
							else
							{
								args[4].call(this, d.data, prevImage, n);
							}
						}

						// process completed
						failed = false;
					}
				}

				// failed
				if (failed)
				{
					// get default image
					getElement("gallery-image-"+n.toString()).src = args[3];
					ShowModal("Application error. Unable to upload image. Please try again");
				}
			}
			else
			{
				getElement("gallery-image-"+n.toString()).src = args[3];
				ShowModal("Connection error. Unable to upload image. Please try again");
			}
		});
		
	}, id);
}

function saveGallery(n)
{
	let request = {
		galleryid:$("#gallery-id-"+n).val(),
		image:$("#gallery-image-name-"+n).val(),
		heading:$("#gallery-heading-"+n).val(),
		description:$("#gallery-description-"+n).val(),
		status:getElement("gallery-status-"+n).checked,
		sort:$("#gallery-sort-"+n).val(),
		job:"save gallery"
	};

	$("#gallery-status-text-"+n).html("<div class='ui inline active mini loader'></div> Saving");
	$("#gallery-status-text-"+n).css("color","deepskyblue");

	postJson("hms-admin/worker",function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#gallery-id-"+n).val(d.data);
				$("#gallery-status-text-"+n).html("<i class='check icon'></i> Saved");
				$("#gallery-status-text-"+n).css("color","forestgreen");
				setTimeout(function () {
					$("#gallery-status-text-"+n).html("Pending");
					$("#gallery-status-text-"+n).css("color","silver");
				}, 3000);
			}
			else
			{
				$("#gallery-status-text-"+n).html("<i class='times red icon'></i> Error " +
					"<span style='color: blue; cursor: pointer;' onclick=\"saveGallery('"+n+"')\">Try again</span>");
				$("#gallery-status-text-"+n).css("color","red");
			}
		}
		else
		{
			$("#gallery-status-text-"+n).html("<i class='times red icon'></i> Error " +
				"<span style='color: blue; cursor: pointer;' onclick=\"saveGallery('"+n+"')\">Try again</span>");
			$("#gallery-status-text-"+n).css("color","red");
		}
	},request);
}

function addGalleryPlaceholder(i)
{
	getElement("gallery-content").appendChild(div({
		add:"<div id='gallery-item-"+i+"' class='w3-col l3 m6 s12 pad-1 galeries'>" +

			"<div class='lift-1'>" +

			"<input id='gallery-id-"+i+"' type='hidden' value=''/>" +
			"<input id='gallery-image-name-"+i+"' type='hidden' value=''/>" +

			"<div style='height: 200px; background-color: whitesmoke; position: relative; border-radius: 0px;'>" +
			"<img id='gallery-image-"+i+"' src='' style='width: 100%;'/>" +
			"<div id='gallery-sort-con-"+i+"' class='ui mini labeled input' " +
			"style='background-color: transparent; position: absolute; left: 0px; top: 0px; display: none;'> " +
			"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
			"<input id='gallery-sort-"+i+"' type='number' value='0' " +
			"style='width: 60px; border-radius: 0px;'  onchange=\"saveGallery('"+i+"')\"/>" +
			"</div>" +
			"<button id='gallery-btn-"+i+"' class='ui circular icon green-back button' "+
			"style='position: absolute; top: 0px; right: 0px;' onclick=\"getElement('gallery-file-"+i+"').click()\">" +
			"<i class='image icon'></i></button>" +
			"<button id='gallery-delete-btn-"+i+"' class='ui circular icon red button' "+
			"style='position: absolute; top: 0px; right: 30px; display: none;' onclick=\"confirmGalleryItemDelete('"+i+"')\">" +
			"<i class='trash icon'></i></button>" +
			"<input id='gallery-file-"+i+"' type='file' onchange=\"processGalleryImage(this, '"+i+"')\" style='display: none;'/>" +
			"</div>" +
			"<div class='pad-1'>" +
			"<div class='ui fluid input'>" +
			"<input id='gallery-heading-"+i+"' class='wix-textbox' type='textbox' placeholder='Heading' style='margin-top: 5px; border-radius: 0px;'" +
			" onchange=\"saveGallery('"+i+"')\" onkeyup='checkGalleryPlaceholders()'/>" +
			"</div>" +
			"<div class='ui form' style='margin-top: 5px;'>" +
				"<div class='field'>" +
					"<textarea id='gallery-description-"+i+"' class='wix-textbox' rows='1' placeholder='short description'" +
					" onchange=\"saveGallery('"+i+"')\" onkeyup='checkGalleryPlaceholders()' style='border-radius: 0px;'></textarea>" +
				"</div>" +
			"</div>" +
			"<div class='switch' style='float: right; margin-top: 5px;'>" +
			"<label>" +
			"<input type='checkbox' id='gallery-status-"+i+"' checked disabled onchange=\"saveGallery('"+i+"')\"/><span class='lever'></span></label></div>" +
			"<h6 id='gallery-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
			"</div>" +

			"</div>" +

		"</div>"
		}));
}

function removeGalleryPlaceholder(i)
{
	if(getElement("gallery-item-"+i) != null)
	{
		getElement("gallery-content").removeChild(getElement("gallery-item-"+i));
	}
}

function checkGalleryPlaceholders()
{
	let g = document.getElementsByClassName("galeries");

	let empty = false;

	let i = 0;

	for(let j = 0; j < g.length; j++)
	{
		i = g[j].id.split("gallery-item-")[1];

		if(($("#gallery-heading-"+i).val() === "") && ($("#gallery-description-"+i).val() === "") && ($("#gallery-image-name-"+i).val() === ""))
		{
			empty = true;
		}
	}

	i = Number(i) + 1;

	if(empty === false)
	{
		addGalleryPlaceholder(i);
	}
}

function activateGallery(n)
{
	$("#gallery-status-"+n).prop("disabled", false);
	$("#gallery-delete-btn-"+n).show();
	$("#gallery-sort-con-"+n).show();
}

function confirmGalleryItemDelete(e)
{
	ConfirmModal("Are you sure you want to delete the gallery item?",function(choice, param){
		if(choice)
		{
			deleteGallery(param);
		}
	},null,null,e);
}

function deleteGallery(e)
{
	loadingButton({btn:"gallery-delete-btn-"+e});

	postJson("hms-admin/worker", function (data, status) {
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#gallery-item-"+e).transition("flip horizontal out", function () {
					removeGalleryPlaceholder(e);
				});
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to delete ");
		}
	}, {job:"delete gallery item", galleryId:$("#gallery-id-"+e).val()})

}


//----------------------------------------------------Services Logics-------------------------------------//

function processServiceImage(e, id)
{
	cropImage({file:e.files[0], ratio:1/1}, function(blob, URL, n){

		getElement("service-image-"+n.toString()).src = URL.createObjectURL(blob);
		$("#icon-con-"+n).html("");
		$("#service-icontype-"+n).val("image");
		$("#icon-con-"+n).hide();
		$("#service-image-"+n).show();

		let img = new File([blob], "file.png");

		loadingButton({btn:"service-btn-"+n.toString()});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			loadingButton({btn:"service-btn-"+n.toString(),loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#service-image-name-"+n.toString()).val(d.data);
					activateService(n);
					saveServices(n);
					checkServicePlaceholders();
				}
				else
				{
					getElement("service-image-"+n.toString()).src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("gallery-image-"+n.toString()).src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	}, id);
}


function imageIconChoice(e)
{
	loadModal({title:"Select icon or use an image",html:"<div class='pad-3'></div>",
		onLoaded:function(m){
			$("#modal-"+m.modal+"-content").html(
				"<div class='pad-1'>" +
				"<select id='icon-select' class='ui search dropdown' onchange='iconChanged(this)'>"+icon_dropdown+"</select>" +
				"<div class='margin-t-6 margin-b-6'>" +
				"<h1 id='icon-con' class='ui center aligned icon header' style='color: dimgray;'>" +
				"<i class='american sign language interpreting icon'></i></h1>" +
				"</div> " +
				"<div class='pad-1'>" +
				"<div class='w3-container'>" +
				"<button class='ui sleak blue-back right floated button' onclick=\"iconSelected('"+m.modal+"','"+e+"')\">OK</button>" +
				"<label onclick=\"imageChoiceSelected('"+e+"','"+m.modal+"')\" " +
				"style='cursor: pointer; color: steelblue'>" +
				"<i class='image icon'></i> Use Image</label>" +
				"</div>" +
				"</div>" +
				"</div>");
			$(".ui.dropdown").dropdown();
		}});
}

function iconChanged(e)
{
	$("#icon-con").html("<i class='"+e.value+" icon'></i>");
}

function imageChoiceSelected(e, modal)
{
	closeGenModal(modal, function(){
		getElement("service-file-"+e).click();
	});
}

function iconSelected(modal, e)
{
	getElement("service-image-"+e).src = "";
	$("#icon-con-"+e).show();
	$("#service-image-"+e).hide();
	$("#icon-con-"+e).html("<i class='"+$("#icon-select").val()+" icon'></i>");
	$("#service-image-name-"+e).val($("#icon-select").val());
	$("#service-icontype-"+e).val("icon");
	closeGenModal(modal);
	activateService(e);
	saveServices(e);
	checkServicePlaceholders();
}


function saveServices(n)
{
	let request = {
		serviceid:$("#service-id-"+n).val(),
		image:$("#service-image-name-"+n).val(),
		icontype:$("#service-icontype-"+n).val(),
		heading:$("#service-heading-"+n).val(),
		body:$("#service-description-"+n).val(),
		status:getElement("service-status-"+n).checked,
		sort:$("#service-sort-"+n).val(),
		job:"save service"
	};

	$("#service-status-text-"+n).html("<div class='ui inline active mini loader'></div> Saving");
	$("#service-status-text-"+n).css("color","deepskyblue");

	postJson("hms-admin/worker",function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#service-id-"+n).val(d.data);
				$("#service-status-text-"+n).html("<i class='check icon'></i> Saved");
				$("#service-status-text-"+n).css("color","forestgreen");
				setTimeout(function () {
					$("#service-status-text-"+n).html("Pending");
					$("#service-status-text-"+n).css("color","silver");
				}, 3000);
			}
			else
			{
				$("#service-status-text-"+n).html("<i class='times red icon'></i> Error " +
					"<span style='color: blue; cursor: pointer;' onclick=\"saveServices('"+n+"')\">Try again</span>");
				$("#service-status-text-"+n).css("color","red");
			}
		}
		else
		{
			$("#service-status-text-"+n).html("<i class='times red icon'></i> Error " +
				"<span style='color: blue; cursor: pointer;' onclick=\"saveServices('"+n+"')\">Try again</span>");
			$("#service-status-text-"+n).css("color","red");
		}
	},request);
}


function addServicesPlaceholder(i)
{
	getElement("service-content").appendChild(div({
		add:"<div id='service-item-"+i+"' class='w3-col l6 m6 s12 pad-1 services'>" +

			"<div class='lift-1 w3-row'>" +

			"<input id='service-id-"+i+"' type='hidden' value=''/>" +
			"<input id='service-image-name-"+i+"' type='hidden' value=''/>" +
			"<input id='service-icontype-"+i+"' type='hidden' value=''/>" +

			"<div class='w3-col l4 m4 s12' style='min-height: 200px; background-color: whitesmoke; position: relative; border-radius: 0px;'>" +
			"<img id='service-image-"+i+"' src='' style='width: 100%; margin-top: 15px;'/>" +
			"<h1 id='icon-con-"+i+"' class='ui center aligned icon header' style='color: dimgray; margin-top: 60px;'>" +
			"</h1>" +
			"<button id='service-btn-"+i+"' class='ui circular icon green-back button' "+
			"style='position: absolute; top: 0px; left: 0px;' onclick=\"imageIconChoice('"+i+"')\">" +
			"<i class='plus icon'></i></button>" +
			"<button id='service-delete-btn-"+i+"' class='ui circular icon red button' "+
			"style='position: absolute; top: 0px; left: 30px; display: none;' onclick=\"confirmServiceItemDelete('"+i+"')\">" +
			"<i class='trash icon'></i></button>" +
			"<input id='service-file-"+i+"' type='file' onchange=\"processServiceImage(this, '"+i+"')\" style='display: none;'/>" +
			"</div>" +
			"<div class='w3-col l8 m8 s12 pad-1'>" +
			"<div class='ui fluid input'>" +
			"<input id='service-heading-"+i+"' class='wix-textbox' type='textbox' placeholder='Name of service' style='margin-top: 5px; border-radius: 0px;'" +
			" onchange=\"saveServices('"+i+"'); activateService('"+i+"')\" onkeyup='checkServicePlaceholders()'/>" +
			"</div>" +
			"<div class='ui form' style='margin-top: 5px;'>" +
			"<div class='field'>" +
			"<textarea id='service-description-"+i+"' class='wix-textbox' rows='1' placeholder='short description of service'" +
			" onchange=\"saveServices('"+i+"'); activateService('"+i+"')\" onkeyup='checkServicePlaceholders()' style='border-radius: 0px;'></textarea>" +
			"</div>" +
			"</div>" +
			"<div id='service-sort-con-"+i+"' class='ui mini labeled input' style='margin-top: 5px; display: none;'> " +
			"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
			"<input id='service-sort-"+i+"' type='number' value='0' " +
			"style='width: 60px; border-radius: 0px;'  onchange=\"saveServices('"+i+"');  activateService('"+i+"')\"/>" +
			"</div>" +
			"<div class='switch' style='float: right; margin-top: 5px;'>" +
			"<label>" +
			"<input type='checkbox' id='service-status-"+i+"' checked disabled onchange=\"saveServices('"+i+"'); activateService('"+i+"')\"/><span class='lever'></span></label></div>" +
			"<h6 id='service-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
			"</div>" +

			"</div>" +

			"</div>"
	}));
}

function removeServicesPlaceholder(i)
{
	if(getElement("service-item-"+i) != null)
	{
		getElement("service-content").removeChild(getElement("service-item-"+i));
	}
}

function checkServicePlaceholders()
{
	let g = document.getElementsByClassName("services");

	let empty = false;

	let i = 0;

	for(let j = 0; j < g.length; j++)
	{
		i = g[j].id.split("service-item-")[1];

		if(($("#service-heading-"+i).val() === "") && ($("#service-description-"+i).val() === "") && ($("#service-image-name-"+i).val() === ""))
		{
			empty = true;
		}
	}
	i = Number(i) + 1;

	if(empty === false)
	{
		addServicesPlaceholder(i);
	}
}


function activateService(n)
{
	$("#service-status-"+n).prop("disabled", false);
	$("#service-delete-btn-"+n).show();
	$("#service-sort-con-"+n).show();
}

function confirmServiceItemDelete(e)
{
	ConfirmModal("Are you sure you want to delete the service member item?",function(choice, param){
		if(choice)
		{
			deleteService(param);
		}
	},null,null,e);
}

function deleteService(e)
{
	loadingButton({btn:"service-delete-btn-"+e});

	postJson("hms-admin/worker", function (data, status) {
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#service-item-"+e).transition("flip horizontal out", function () {
					removeServicePlaceholder(e);
				});
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to delete ");
		}
	}, {job:"delete service item", serviceId:$("#service-id-"+e).val()})

}





//---------------------------------------------------- Facilities Logics-------------------------------------//

function processFacilityImage(e, id)
{
	cropImage({file:e.files[0], ratio:1/1}, function(blob, URL, n){

		getElement("facility-image-"+n.toString()).src = URL.createObjectURL(blob);
		$("#icon-con-"+n).html("");
		$("#facility-icontype-"+n).val("image");
		$("#icon-con-"+n).hide();
		$("#facility-image-"+n).show();

		let img = new File([blob], "file.png");

		loadingButton({btn:"facilities-btn-"+n.toString()});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			loadingButton({btn:"facility-btn-"+n.toString(),loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#facility-image-name-"+n.toString()).val(d.data);
					activateFacility(n);
					saveFacility(n);
					checkFacilityPlaceholders();
				}
				else
				{
					getElement("facility-image-"+n.toString()).src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("facility-image-"+n.toString()).src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	}, id);
}


function facilityImageIconChoice(e)
{
	loadModal({title:"Select icon or use an image",html:"<div class='pad-3'></div>",
		onLoaded:function(m){
			$("#modal-"+m.modal+"-content").html(
				"<div class='pad-1'>" +
				"<select id='icon-select' class='ui search dropdown' onchange='facilityIconChanged(this)'>"+icon_dropdown+"</select>" +
				"<div class='margin-t-6 margin-b-6'>" +
				"<h1 id='icon-con' class='ui center aligned icon header' style='color: dimgray;'>" +
				"<i class='american sign language interpreting icon'></i></h1>" +
				"</div> " +
				"<div class='pad-1'>" +
				"<div class='w3-container'>" +
				"<button class='ui sleak blue-back right floated button' onclick=\"facilityIconSelected('"+m.modal+"','"+e+"')\">OK</button>" +
				"<label onclick=\"facilityImageChoiceSelected('"+e+"','"+m.modal+"')\" " +
				"style='cursor: pointer; color: steelblue'>" +
				"<i class='image icon'></i> Use Image</label>" +
				"</div>" +
				"</div>" +
				"</div>");
			$(".ui.dropdown").dropdown();
		}});
}

function facilityIconChanged(e)
{
	$("#icon-con").html("<i class='"+e.value+" icon'></i>");
}

function facilityImageChoiceSelected(e, modal)
{
	closeGenModal(modal, function(){
		getElement("facility-file-"+e).click();
	});
}

function facilityIconSelected(modal, e)
{
	getElement("facility-image-"+e).src = "";
	$("#icon-con-"+e).show();
	$("#facility-image-"+e).hide();
	$("#icon-con-"+e).html("<i class='"+$("#icon-select").val()+" icon'></i>");
	$("#facility-image-name-"+e).val($("#icon-select").val());
	$("#facility-icontype-"+e).val("icon");
	closeGenModal(modal);
	activateFacility(e);
	saveFacility(e);
	checkFacilityPlaceholders();
}


function saveFacility(n)
{
	let request = {
		facilityid:$("#facility-id-"+n).val(),
		image:$("#facility-image-name-"+n).val(),
		icontype:$("#facility-icontype-"+n).val(),
		heading:$("#facility-heading-"+n).val(),
		body:$("#facility-description-"+n).val(),
		status:getElement("facility-status-"+n).checked,
		sort:$("#facility-sort-"+n).val(),
		job:"save facility"
	};

	$("#facility-status-text-"+n).html("<div class='ui inline active mini loader'></div> Saving");
	$("#facility-status-text-"+n).css("color","deepskyblue");

	postJson("hms-admin/worker",function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#facility-id-"+n).val(d.data);
				$("#facility-status-text-"+n).html("<i class='check icon'></i> Saved");
				$("#facility-status-text-"+n).css("color","forestgreen");
				setTimeout(function () {
					$("#facility-status-text-"+n).html("Pending");
					$("#facility-status-text-"+n).css("color","silver");
				}, 3000);
			}
			else
			{
				$("#facility-status-text-"+n).html("<i class='times red icon'></i> Error " +
					"<span style='color: blue; cursor: pointer;' onclick=\"saveFacility('"+n+"')\">Try again</span>");
				$("#facility-status-text-"+n).css("color","red");
			}
		}
		else
		{
			$("#facility-status-text-"+n).html("<i class='times red icon'></i> Error " +
				"<span style='color: blue; cursor: pointer;' onclick=\"saveFacility('"+n+"')\">Try again</span>");
			$("#facility-status-text-"+n).css("color","red");
		}
	},request);
}


function addFacilitiesPlaceholder(i)
{
	getElement("facility-content").appendChild(div({
		add:"<div id='facility-item-"+i+"' class='w3-col l6 m6 s12 pad-1 facility'>" +

			"<div class='lift-1 w3-row'>" +

			"<input id='facility-id-"+i+"' type='hidden' value=''/>" +
			"<input id='facility-image-name-"+i+"' type='hidden' value=''/>" +
			"<input id='facility-icontype-"+i+"' type='hidden' value=''/>" +

			"<div class='w3-col l4 m4 s12' style='min-height: 200px; background-color: whitesmoke; position: relative; border-radius: 0px;'>" +
			"<img id='facility-image-"+i+"' src='' style='width: 100%; margin-top: 15px;'/>" +
			"<h1 id='icon-con-"+i+"' class='ui center aligned icon header' style='color: dimgray; margin-top: 60px;'>" +
			"</h1>" +
			"<button id='facility-btn-"+i+"' class='ui circular icon green-back button' "+
			"style='position: absolute; top: 0px; left: 0px;' onclick=\"facilityImageIconChoice('"+i+"')\">" +
			"<i class='plus icon'></i></button>" +
			"<button id='facility-delete-btn-"+i+"' class='ui circular icon red button' "+
			"style='position: absolute; top: 0px; left: 30px; display: none;' onclick=\"confirmFacilityItemDelete('"+i+"')\">" +
			"<i class='trash icon'></i></button>" +
			"<input id='facility-file-"+i+"' type='file' onchange=\"processFacilityImage(this, '"+i+"')\" style='display: none;'/>" +
			"</div>" +
			"<div class='w3-col l8 m8 s12 pad-1'>" +
			"<div class='ui fluid input'>" +
			"<input id='facility-heading-"+i+"' class='wix-textbox' type='textbox' placeholder='Name of facility' style='margin-top: 5px; border-radius: 0px;'" +
			" onchange=\"saveFacility('"+i+"'); activateFacility('"+i+"')\" onkeyup='checkFacilityPlaceholders()'/>" +
			"</div>" +
			"<div class='ui form' style='margin-top: 5px;'>" +
			"<div class='field'>" +
			"<textarea id='facility-description-"+i+"' class='wix-textbox' rows='1' placeholder='Facility description'" +
			" onchange=\"saveFacility('"+i+"'); activateFacility('"+i+"')\" onkeyup='checkFacilityPlaceholders()' style='border-radius: 0px;'></textarea>" +
			"</div>" +
			"</div>" +
			"<div id='facility-sort-con-"+i+"' class='ui mini labeled input' style='margin-top: 5px; display: none;'> " +
			"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
			"<input id='facility-sort-"+i+"' type='number' value='0' " +
			"style='width: 60px; border-radius: 0px;'  onchange=\"saveFacility('"+i+"');  activateFacility('"+i+"')\"/>" +
			"</div>" +
			"<div class='switch' style='float: right; margin-top: 5px;'>" +
			"<label>" +
			"<input type='checkbox' id='facility-status-"+i+"' checked disabled onchange=\"saveFacility('"+i+"'); activateFacility('"+i+"')\"/><span class='lever'></span></label></div>" +
			"<h6 id='facility-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
			"</div>" +

			"</div>" +

			"</div>"
	}));
}

function removeFacilityPlaceholder(i)
{
	if(getElement("facility-item-"+i) != null)
	{
		getElement("facility-content").removeChild(getElement("facility-item-"+i));
	}
}

function checkFacilityPlaceholders()
{
	let g = document.getElementsByClassName("facility");

	let empty = false;

	let i = 0;

	for(let j = 0; j < g.length; j++)
	{
		i = g[j].id.split("facility-item-")[1];

		if(($("#facility-heading-"+i).val() === "") && ($("#facility-description-"+i).val() === "") && ($("#facility-image-name-"+i).val() === ""))
		{
			empty = true;
		}
	}
	i = Number(i) + 1;

	if(empty === false)
	{
		addFacilitiesPlaceholder(i);
	}
}


function activateFacility(n)
{
	$("#facility-status-"+n).prop("disabled", false);
	$("#facility-delete-btn-"+n).show();
	$("#facility-sort-con-"+n).show();
}

function confirmFacilityItemDelete(e)
{
	ConfirmModal("Are you sure you want to delete the facility member item?",function(choice, param){
		if(choice)
		{
			deleteFacility(param);
		}
	},null,null,e);
}

function deleteFacility(e)
{
	loadingButton({btn:"facility-delete-btn-"+e});

	postJson("hms-admin/worker", function (data, status) {
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#facility-item-"+e).transition("flip horizontal out", function () {
					removeFacilityPlaceholder(e);
				});
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to delete ");
		}
	}, {job:"delete facility item", facilityId:$("#facility-id-"+e).val()})

}







//-----------------------------------------------------Team Logic --------------------------------------






function processTeamImage(e, id)
{
	cropImage({file:e.files[0], ratio:1/1}, function(blob, URL, n){

		getElement("team-image-"+n.toString()).src = URL.createObjectURL(blob);

		let img = new File([blob], "file.png");

		loadingButton({btn:"team-btn-"+n.toString()});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			loadingButton({btn:"team-btn-"+n.toString(),loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#team-image-name-"+n.toString()).val(d.data);
					activateTeam(n);
					saveTeam(n);
					checkTeamPlaceholders();
				}
				else
				{
					getElement("team-image-"+n.toString()).src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("team-image-"+n.toString()).src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	}, id);
}



function saveTeam(n)
{
	let request = {
		teamid:$("#team-id-"+n).val(),
		image:$("#team-image-name-"+n).val(),
		name:$("#team-name-"+n).val(),
		description:$("#team-description-"+n).val(),
		status:getElement("team-status-"+n).checked,
		sort:$("#team-sort-"+n).val(),
		job:"save team"
	};

	$("#team-status-text-"+n).html("<div class='ui inline active mini loader'></div> Saving");
	$("#team-status-text-"+n).css("color","deepskyblue");

	postJson("hms-admin/worker",function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#team-id-"+n).val(d.data);
				$("#team-status-text-"+n).html("<i class='check icon'></i> Saved");
				$("#team-status-text-"+n).css("color","forestgreen");
				setTimeout(function () {
					$("#team-status-text-"+n).html("Pending");
					$("#team-status-text-"+n).css("color","silver");
				}, 3000);
			}
			else
			{
				$("#team-status-text-"+n).html("<i class='times red icon'></i> Error " +
					"<span style='color: blue; cursor: pointer;' onclick=\"saveTeam('"+n+"')\">Try again</span>");
				$("#team-status-text-"+n).css("color","red");
			}
		}
		else
		{
			$("#team-status-text-"+n).html("<i class='times red icon'></i> Error " +
				"<span style='color: blue; cursor: pointer;' onclick=\"saveTeam('"+n+"')\">Try again</span>");
			$("#team-status-text-"+n).css("color","red");
		}
	},request);
}


function addTeamPlaceholder(i)
{
	getElement("team-content").appendChild(div({
		add:"<div id='team-item-"+i+"' class='w3-col l3 m6 s12 pad-1 teams'>" +

			"<div class='lift-1'>" +

			"<input id='team-id-"+i+"' type='hidden' value=''/>" +
			"<input id='team-image-name-"+i+"' type='hidden' value=''/>" +

			"<div style='height: 200px; background-color: whitesmoke; position: relative; border-radius: 0px;'>" +
			"<img id='team-image-"+i+"' src='' style='width: 100%;'/>" +
			"<div id='team-sort-con-"+i+"' class='ui mini labeled input' " +
			"style='background-color: transparent; position: absolute; left: 0px; top: 0px; display: none;'> " +
			"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
			"<input id='team-sort-"+i+"' type='number' value='0' " +
			"style='width: 60px; border-radius: 0px;'  onchange=\"saveTeam('"+i+"')\"/>" +
			"</div>" +
			"<button id='team-btn-"+i+"' class='ui circular icon green-back button' "+
			"style='position: absolute; top: 0px; right: 0px;' onclick=\"getElement('team-file-"+i+"').click()\">" +
			"<i class='image icon'></i></button>" +
			"<button id='team-delete-btn-"+i+"' class='ui circular icon red button' "+
			"style='position: absolute; top: 0px; right: 30px; display: none;' onclick=\"confirmTeamItemDelete('"+i+"')\">" +
			"<i class='trash icon'></i></button>" +
			"<input id='team-file-"+i+"' type='file' onchange=\"processTeamImage(this, '"+i+"')\" style='display: none;'/>" +
			"</div>" +
			"<div class='pad-1'>" +
			"<div class='ui fluid input'>" +
			"<input id='team-name-"+i+"' class='wix-textbox' type='textbox' placeholder='Heading' style='margin-top: 5px; border-radius: 0px;'" +
			" onchange=\"saveTeam('"+i+"')\" onkeyup='checkTeamPlaceholders()'/>" +
			"</div>" +
			"<div class='ui form' style='margin-top: 5px;'>" +
				"<div class='field'>" +
					"<textarea id='team-description-"+i+"' class='wix-textbox' rows='1' placeholder='short description'" +
					" onchange=\"saveTeam('"+i+"')\" onkeyup='checkTeamPlaceholders()' style='border-radius: 0px;'></textarea>" +
				"</div>" +
			"</div>" +
			"<div class='switch' style='float: right; margin-top: 5px;'>" +
			"<label>" +
			"<input type='checkbox' id='team-status-"+i+"' checked disabled onchange=\"saveTeam('"+i+"')\"/><span class='lever'></span></label></div>" +
			"<h6 id='team-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
			"</div>" +

			"</div>" +

		"</div>"
		}));
}

function removeTeamPlaceholder(i)
{
	if(getElement("team-item-"+i) != null)
	{
		getElement("team-content").removeChild(getElement("team-item-"+i));
	}
}

function checkTeamPlaceholders()
{
	let g = document.getElementsByClassName("teams");

	let empty = false;

	let i = 0;

	for(let j = 0; j < g.length; j++)
	{
		i = g[j].id.split("team-item-")[1];

		if(($("#team-name-"+i).val() === "") && ($("#team-description-"+i).val() === "") && ($("#team-image-name-"+i).val() === ""))
		{
			empty = true;
		}
	}

	i = Number(i) + 1;

	if(empty === false)
	{
		addTeamPlaceholder(i);
	}
}


function activateTeam(n)
{
	$("#team-status-"+n).prop("disabled", false);
	$("#team-delete-btn-"+n).show();
	$("#team-sort-con-"+n).show();
}

function confirmTeamItemDelete(e)
{
	ConfirmModal("Are you sure you want to delete the team member item?",function(choice, param){
		if(choice)
		{
			deleteTeam(param);
		}
	},null,null,e);
}

function deleteTeam(e)
{
	loadingButton({btn:"team-delete-btn-"+e});

	postJson("hms-admin/worker", function (data, status) {
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#team-item-"+e).transition("flip horizontal out", function () {
					removeTeamPlaceholder(e);
				});
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to delete ");
		}
	}, {job:"delete team item", teamId:$("#team-id-"+e).val()})

}







//--------------------------------- Testimonials -----------------------------------------------------------------//

function processTestimonialImage(e, id)
{
	cropImage({file:e.files[0], ratio:1/1}, function(blob, URL, n){

		getElement("testimonial-image-"+n.toString()).src = URL.createObjectURL(blob);

		let img = new File([blob], "file.png");

		loadingButton({btn:"testimonial-btn-"+n.toString()});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			loadingButton({btn:"testimonial-btn-"+n.toString(),loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#testimonial-image-name-"+n.toString()).val(d.data);
					activateTestimonial(n);
					saveTestimonial(n);
					checkTestimonialPlaceholders();
				}
				else
				{
					getElement("testimonial-image-"+n.toString()).src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("testimonial-image-"+n.toString()).src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	}, id);
}


function ratingSaveTestimonial(e)
{
	setTimeout(function(){
		saveTestimonial(e);
	},500);
}


function saveTestimonial(n)
{
	let request = {
		teamid:$("#testimonial-id-"+n).val(),
		image:$("#testimonial-image-name-"+n).val(),
		name:$("#testimonial-name-"+n).val(),
		testimony:$("#testimonial-description-"+n).val(),
		status:getElement("testimonial-status-"+n).checked,
		sort:$("#testimonial-sort-"+n).val(),
		rating:$("#testimonial-rating-"+n).rating("get rating"),
		job:"save testimonial"
	};

	$("#testimonial-status-text-"+n).html("<div class='ui inline active mini loader'></div> Saving");
	$("#testimonial-status-text-"+n).css("color","deepskyblue");

	postJson("hms-admin/worker",function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#testimonial-id-"+n).val(d.data);
				$("#testimonial-status-text-"+n).html("<i class='check icon'></i> Saved");
				$("#testimonial-status-text-"+n).css("color","forestgreen");
				setTimeout(function () {
					$("#testimonial-status-text-"+n).html("Pending");
					$("#testimonial-status-text-"+n).css("color","silver");
				}, 3000);
			}
			else
			{
				$("#testimonial-status-text-"+n).html("<i class='times red icon'></i> Error " +
					"<span style='color: blue; cursor: pointer;' onclick=\"saveTeam('"+n+"')\">Try again</span>");
				$("#testimonial-status-text-"+n).css("color","red");
			}
		}
		else
		{
			$("#testimonial-status-text-"+n).html("<i class='times red icon'></i> Error " +
				"<span style='color: blue; cursor: pointer;' onclick=\"saveTeam('"+n+"')\">Try again</span>");
			$("#testimonial-status-text-"+n).css("color","red");
		}
	},request);
}


function addTestimonialPlaceholder(i)
{
	getElement("testimonial-content").appendChild(div({
		add:"<div id='testimonial-item-"+i+"' class='w3-row pad-1 testimonial' style=''>" +

			"<div class='lift-1'>" +

			"<input id='testimonial-id-"+i+"' type='hidden' value=''/>" +
			"<input id='testimonial-image-name-"+i+"' type='hidden' value=''/>" +


			"<div class='w3-col l2 m2 s12 pad-2'>" +
			"<div class='switch' style='float: right; margin-top: 5px;'>" +
			"<label>" +
			"<input type='checkbox' id='testimonial-status-"+i+"' disabled checked onchange=\"saveTestimonial('"+i+"')\"/><span class='lever'></span></label>" +
			"</div>" +
			"<h6 id='testimonial-status-text-"+i+"' style='color: silver; margin-top: 5px;'>Status</h6>" +
			"<br/>" +
			"<div id='testimonial-sort-con-"+i+"' class='ui mini fluid labeled input' " +
			"style='display: none;'> " +
			"<label class='ui sleak blue-back label' style='border-radius: 0px;'>sort</label>" +
			"<input id='testimonial-sort-"+i+"' type='number' value='0' " +
			"style='width: 60px; border-radius: 0px;'  onchange=\"saveTestimonial('"+i+"')\"/>" +
			"</div><br/>" +

			"<div id='testimonial-rating-"+i+"' data-max-rating='5' class='ui star rating' onclick=\"ratingSaveTestimonial('"+i+"')\"></div> "+

			"<br/>" +
			"<button id='testimonial-delete-btn-"+i+"' class='ui circular icon red button' "+
			"style='left: 30px; display: none;' onclick=\"confirmTestimonialItemDelete('"+i+"')\">" +
			"<i class='trash icon'></i></button>" +

			"</div> " +


			"<div class='w3-col l3 m3 s12 pad-2'>" +
			"<div class='l-width-l m-width-xl' style='height: 200px; background-color: whitesmoke; position: relative; border-radius: 0px;'>" +
			"<img id='testimonial-image-"+i+"' src='' style='width: 100%;'/>" +
			"<button id='testimonial-btn-"+i+"' class='ui circular icon green-back button' "+
			"style='position: absolute; top: 0px; left: 0px;' onclick=\"getElement('testimonial-file-"+i+"').click()\">" +
			"<i class='image icon'></i></button>" +
			"<input id='testimonial-file-"+i+"' type='file' onchange=\"processTestimonialImage(this, '"+i+"')\" style='display: none;'/>" +
			"<input id='testimonial-image-name-"+i+"' type='hidden' value=''/>" +
			"</div>" +
			"</div>" +


			"<div class='w3-col l7 m7 s12 pad-2'>" +
			"<div class=''>" +
			"<div class='ui fluid input'>" +
			"<input id='testimonial-name-"+i+"' class='wix-textbox' type='textbox' placeholder='Name' style='margin-top: 5px; border-radius: 0px;'" +
			" onchange=\"saveTestimonial('"+i+"')\" onkeyup='checkTestimonialPlaceholders()'/>" +
			"</div>" +
			"<div class='ui form' style='margin-top: 5px;'>" +
			"<div class='field'>" +
			"<textarea id='testimonial-description-"+i+"' class='wix-textbox' rows='3' placeholder='Testimony'" +
			" onchange=\"saveTestimonial('"+i+"')\" onkeyup='checkTestimonialPlaceholders()' style='border-radius: 0px;'></textarea>" +
			"</div>" +
			"</div>" +

			"</div>" +
			"</div>" +

			"</div>" +

			"</div>"
	}));
}


function removeTestimonialPlaceholder(i)
{
	if(getElement("team-item-"+i) != null)
	{
		getElement("team-content").removeChild(getElement("testimonial-item-"+i));
	}
}

function checkTestimonialPlaceholders()
{
	let g = document.getElementsByClassName("testimonial");

	let empty = false;

	let i = 0;

	for(let j = 0; j < g.length; j++)
	{
		i = g[j].id.split("testimonial-item-")[1];

		if(($("#testimonial-name-"+i).val() === "") && ($("#testimonial-description-"+i).val() === "") && ($("#testimonial-image-name-"+i).val() === ""))
		{
			empty = true;
		}
	}

	i = Number(i) + 1;

	if(empty === false)
	{
		addTestimonialPlaceholder(i);
	}
}


function activateTestimonial(n)
{
	$("#testimonial-status-"+n).prop("disabled", false);
	$("#testimonial-delete-btn-"+n).show();
	$("#testimonial-sort-con-"+n).show();
	$("#testimonial-rating-"+n).show();
	$("#testimonial-rating-"+n).rating({maxRating: 5});
}


function confirmTestimonialItemDelete(e)
{
	ConfirmModal("Are you sure you want to delete the testimonial?",function(choice, param){
		if(choice)
		{
			deleteTestimonial(param);
		}
	},null,null,e);
}


function deleteTestimonial(e)
{
	loadingButton({btn:"testimonial-delete-btn-"+e});

	postJson("hms-admin/worker", function (data, status) {
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#testimonial-item-"+e).transition("flip vertical out", function () {
					removeTestimonialPlaceholder(e);
				}) ;
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to delete ");
		}
	}, {job:"delete testimonial item", testimonialId:$("#testimonial-id-"+e).val()})

}














// -------------------------------------- Room category Logic---------------------------------------------------//

function  saveRoomCategory()
{
	let request = {
		roomcatid:$("#roomcatid").val(),
		name:$("#room-name").val(),
		description:$("#room-description").val(),
		price:Number($("#room-price").val()),
		compare:Number($("#room-price-compare").val()),
		showpromo:getElement("show-promo-text").checked,
		showonsite:getElement("show-on-site").checked,
		reservable:getElement("reservable").checked,
		services:$("#special-services").val(),
		promotext:$("#room-promo-text").val(),
		sort:$("#room-cat-sort").val(),
		baseoccupancy:Number($("#base-occupancy").val()),
		maxoccupancy:Number($("#max-occupancy").val()),
		extrapersonprice:Number($("#extra-person-price").val()),
		smoking:$("#smoking-policy").val(),
		children:$("#children-policy").val(),
		pets:$("#pet-policy").val(),
		images:[],
		features:[],
		property:$("#property-id").val(),
		job:"save room category"
	};


	let i = 1;
	while(getElement("room-file-name-"+i) !== null)
	{
		if($("#room-file-name-"+i).val() !== "")
		{
			request.images.push($("#room-file-name-"+i).val());
		}
		i++;
	}


	i = 0;
	while(getElement("features-list-"+i) !== null)
	{
		if($("#features-list-"+i+"-txt").val() !== "")
		{
			request.features.push($("#features-list-"+i+"-txt").val());
		}
		i++;
	}

	if(request.images.length === 0)
	{
		ShowModal("Add at least one image of the room category");
	}
	else if(request.name === "")
	{
		errorButton({btn: "room-cat-save-btn", msg: "Invalid Name"});
	}
	else if(Number(request.price) < 1)
	{
		errorButton({btn: "room-cat-save-btn", msg: "Invalid Price"});
	}
	else if(Number(request.baseoccupancy) < 1)
	{
		errorButton({btn: "room-cat-save-btn", msg: "Invalid base occupancy"});
	}
	else if(Number(request.maxoccupancy) < 1)
	{
		errorButton({btn: "room-cat-save-btn", msg: "Invalid max occupancy"});
	}
	else
	{
		loadingButton({btn:"room-cat-save-btn"});
		postJson("hms-admin/worker", function (data, status)
		{
			loadingButton({btn:"room-cat-save-btn", loading:false});
			if (status === "done")
			{
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					$("#roomcatid").val("");
					$("#room-name").val("");
					$("#room-description").val("");
					$("#room-price").val("");
					$("#room-price-compare").val("");
					getElement("show-promo-text").checked = false;
					getElement("show-on-site").checked = true;
					getElement("reservable").checked = true;
					$("#room-promo-text").val("");
					$("#room-cat-sort").val(0);


					$("#features-list-con").html("");
					addFeatureList(0);

					let i = 1;
					while(getElement("room-img-"+i) !== null)
					{
						getElement("room-img-"+i).src = "";
						i++;
					}

					$("#room-cat-save-btn").html("<i class='check icon'></i> Category saved");
					$("#room-cat-save-btn").addClass("positive");
					$("#room-cat-save-btn").addClass("disabled");
					setTimeout(function () {
						$("#room-cat-save-btn").html("Save Category");
						$("#room-cat-save-btn").removeClass("positive");
						$("#room-cat-save-btn").removeClass("disabled");
					}, 3000);
				}
				else
				{
					errorButton({btn: "room-cat-save-btn", msg: d.message});
				}
			}
			else
			{
				errorButton({btn: "room-cat-save-btn", msg: "Connection error"});
			}
		}, request);
	}
}

function loadEditRoomCatData(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#roomcatid").val(d.data.Id);
				$("#room-name").val(d.data.Name);
				$("#room-description").val(d.data.Description);
				$("#room-price").val(d.data.Price);
				$("#room-price-compare").val(Number(d.data.Compareat));
				getElement("show-promo-text").checked = d.data.Showpromotion;
				getElement("show-on-site").checked = d.data.Onsite;
				getElement("reservable").checked = d.data.Reservable;
				$("#special-services").val(d.data.Services);
				$("#room-promo-text").val(d.data.Promotext);
				$("#room-cat-sort").val(d.data.Sort);
				$("#base-occupancy").val(Number(d.data.Baseoccupancy));
				$("#max-occupancy").val(Number(d.data.Maxoccupancy));
				$("#extra-person-price").val(Number(d.data.Extraguestprice));
				$("#smoking-policy").dropdown("set selected", (d.data.Smokingpolicy ? "Smoking" : "Non-smoking"));
				$("#children-policy").dropdown("set selected", (d.data.Childrenpolicy ? "Allowed" : "Not - Allowed"));
				$("#pet-policy").dropdown("set text", (d.data.Pets ? "Not - Allowed" : "Allowed"));


				if(d.data.Images.length > 0)
				{
					getElement("room-img-1").src = ""+phpvars.FILES_CDN+"/"+d.data.Images[0];
					getElement("room-file-name-1").value = d.data.Images[0];
				}
				if(d.data.Images.length > 1)
				{
					getElement("room-img-2").src = ""+phpvars.FILES_CDN+"/"+d.data.Images[1];
					getElement("room-file-name-2").value = d.data.Images[1];
				}
				if(d.data.Images.length > 2)
				{
					getElement("room-img-3").src = ""+phpvars.FILES_CDN+"/"+d.data.Images[2];
					getElement("room-file-name-3").value = d.data.Images[2];
				}
				if(d.data.Images.length > 3)
				{
					getElement("room-img-4").src = ""+phpvars.FILES_CDN+"/"+d.data.Images[3];
					getElement("room-file-name-4").value = d.data.Images[3];
				}


				if(d.data.Features.length > 0)
				{
					$("#features-list-0-txt").val(d.data.Features[0]);
				}
				let i = 1;
				for(; i < d.data.Features.length; i++)
				{
					addFeatureList(i, d.data.Features[i]);
				}
				addFeatureList(i);

			}
			else
			{
				location.href = "#room-categories";
				ShowModal(d.message);
			}
		}
		else
		{
			location.href = "#room-categories";
			ShowModal("Connection error. Unable to load room category error");
		}
	},{roomcategoryid:e, property:$("#property-id").val(), job:"single room category"});
}

function checkFeatureList()
{
	let i = 0;

	while(getElement("features-list-"+i) != null)
	{
		i++;
	}

	if(i > 0)
	{
		if($("#features-list-"+(i - 1)+"-txt").val() !== "")
		{
			addFeatureList(i);
		}
		else
		{
			if(i > 1)
			{
				if($("#features-list-"+(i - 2)+"-txt").val() === "")
				{
					removeFeatureList(i - 1);
					checkFeatureList();
				}
			}
		}
	}
}

function addFeatureList(e, value)
{
	let v = "";
	if(typeof value == "string")
	{
		v = value;
	}
	let h = document.createElement("div");
	h.id = "features-list-"+e;
	if(e !== 0)
	{
		h.style.marginTop = "5px";
	}
	h.className = "ui fluid input";
	h.innerHTML = "<input id='features-list-"+e+"-txt' class='wix-textbox' type='text' value='"+v+"' onkeyup='checkFeatureList()'/>";
	getElement("features-list-con").appendChild(h);
}

function removeFeatureList(e)
{
	if(getElement("features-list-"+e) != null)
	{
		getElement("features-list-con").removeChild(getElement("features-list-"+e));
	}
}

function SetRoomcategory_Showpromotion(e, id)
{
	let request = {};
	request.Roomcategoryid = id;
	request.property = $("#property-id").val();
	request.Showpromotion = e.checked;
	request.job = "save room cat show promo status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save Roomcategory Showpromotion");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Roomcategory Showpromotion");
		}
	}, request);
}

function SetRoomcategory_Status(e, id)
{
	let request = {};
	request.Roomcategoryid = id;
	request.Status = e.checked;
	request.property = $("#property-id").val();
	request.job = "save room category status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save Roomcategory Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Roomcategory Status");
		}
	}, request);
}

function SetRoomcategory_Reservable(e, id)
{
	let request = {};
	request.Roomcategoryid = id;
	request.Reservable = e.checked;
	request.property = $("#property-id").val();
	request.job = "save room category reservable";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save Room category Reservable");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Room category Reservable");
		}
	}, request);
}

function SetRoomcategory_Onsite(e, id)
{
	let request = {};
	request.Roomcategoryid = id;
	request.Onsite = e.checked;
	request.property = $("#property-id").val();
	request.job = "save room category visibility";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save Roomcategory Onsite");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Roomcategory Onsite");
		}
	}, request);
}

function processRoomImage(e, num)
{
	cropImage({file:e.files[0], ratio:1.5/1}, function(blob, URL, n){

		getElement("room-img-"+n.toString()).src = URL.createObjectURL(blob);

		let img = new File([blob], "file.png");
		
		console.log(phpvars);

		loadingButton({btn:"room-btn-"+n.toString()});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			loadingButton({btn:"room-btn-"+n.toString(),loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#room-file-name-"+n.toString()).val(d.data);
				}
				else
				{
					getElement("room-img-"+n.toString()).src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("room-img-"+n.toString()).src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	}, num);
}

function ConfirmGroupRoomcategoryDelete()
{
	ConfirmModal("All the rooms associated with these categories will be deleted. Proceed?", function(choice){
		if(choice === true)
		{
			RoomcategoryGroupDelete();
		}
	});
}

function ConfirmRoomcategoryDelete(e)
{
	ConfirmModal("All the rooms associated to this category will be deleted. Proceed?", function(choice, param){
		if(choice === true)
		{
			RoomcategoryListDelete(param);
		}
	}, null, null, e);
}

function RoomcategoryGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteRoomcategory(lst[i].id, function(status, msg){
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Roomcategorys failed to delete");
		}
	}
	else
	{
		ShowModal("No Roomcategorys were selected");
	}
}

function RoomcategoryListDelete(e)
{
	$("#"+e+"-btn").addClass("loading");
	DeleteRoomcategory(e, function(status, msg){
		$("#"+e+"-btn").removeClass("loading");
		if(status === "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteRoomcategory(e, func)
{
	let request = {};
	request.Roomcategoryid = e;
	request.job = "delete room category";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}



//------------------------------------ Room Logic ------------------------------------------//

function saveRoom()
{
	let request = {
		roomid:$("#roomid").val(),
		number:$("#room-nun").val(),
		category:$("#room-category-list").val(),
		features: [],
		property:$("#property-id").val(),
		status:getElement("room-status").checked,
		job:"save room"
	};

	i = 0;
	while(getElement("features-list-"+i) !== null)
	{
		if($("#features-list-"+i+"-txt").val() !== "")
		{
			request.features.push($("#features-list-"+i+"-txt").val());
		}
		i++;
	}

	if(request.number === "")
	{
		errorButton({btn:"room-save-btn", msg:"Invalid room number"});
	}
	else if(request.category === "")
	{
		errorButton({btn:"room-save-btn", msg:"Select category"});
	}
	else
	{
		loadingButton({btn:"room-save-btn"});

		postJson("hms-admin/worker", function(data, status){

			loadingButton({btn:"room-save-btn", loading:false});

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#roomid").val("");
					$("#room-nun").val("");
					getElement("room-status").checked = true;

					$("#room-save-btn").html("<i class='check icon'></i> Saved");
					$("#room-save-btn").addClass("positive");

					setTimeout(function(){
						$("#room-save-btn").html("Save Room");
						$("#room-save-btn").removeClass("positive");
					},3000);
				}
				else
				{
					errorButton({btn:"room-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"room-save-btn", msg:"Connection error"});
			}
		}, request);
	}
}

function loadEditRoomData(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#roomid").val(d.data.Id);
				$("#room-nun").val(d.data.Number);
				$("#room-category-list").dropdown('set selected', d.data.Category.Id);

				if(d.data.Features.length > 0)
				{
					$("#features-list-0-txt").val(d.data.Features[0]);
				}
				let i = 1;
				for(; i < d.data.Features.length; i++)
				{
					addFeatureList(i, d.data.Features[i]);
				}
				addFeatureList(i);
			}
			else
			{
				location.href = "#rooms/number";
				ShowModal(d.message);
			}
		}
		else
		{
			location.href = "#rooms/number";
			ShowModal("Connection error. Unable to load room data error");
		}
	},{roomid:e, property:$("#property-id").val(), job:"single-room"});
}

function SetRoom_Status(e, id)
{
	let request = {};
	request.Roomid = id;
	request.Status = e.checked;
	request.property = $("#property-id").val();
	request.job = "save room status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !request.Status;
				ShowModal("Unable to save Room Status");
			}
		}
		else
		{
			e.checked = !request.Status;
			ShowModal("Connection error. Unable to save Room Status");
		}
	}, request);
}

function ConfirmGroupRoomDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Rooms?", function(choice){
		if(choice === true)
		{
			RoomGroupDelete();
		}
	});
}

function ConfirmRoomDelete(e)
{
	ConfirmModal("Are you sure you want to delete the room?", function(choice, param){
		if(choice === true)
		{
			RoomListDelete(param);
		}
	}, null, null, e);
}

function RoomGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteRoom(lst[i].id, function(status, msg){
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status === "done")
				{
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Rooms failed to delete");
		}
	}
	else
	{
		ShowModal("No Rooms were selected");
	}
}

function RoomListDelete(e)
{
	$("#"+e+"-btn").addClass("loading");
	DeleteRoom(e, function(status, msg){
		$("#"+e+"-btn").removeClass("loading");
		if(status === "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteRoom(e, func)
{
	let request = {};
	request.Roomid = e;
	request.property = $("#property-id").val();
	request.job = "delete room";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}



///------------------------------ About us logic ---------------------------------///
function getAboutUs()
{
	$("#aboutus-con").html(
		"<div class='ui placeholder'>" +
		"<div class='line'></div> " +
		"<div class='line'></div> " +
		"</div>" +
		"<div class='ui placeholder'>" +
		"<div class='line'></div> " +
		"<div class='line'></div> " +
		"</div>");

	postJson("hms-admin/worker", function (data, status) {
		$("#aboutus-con").html("");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(d.data === "")
				{
					let con ="<h3 class='align-c pad-2' style='font-family: montserratlight; color: silver;'>" +
						"<img src='"+host+"cdn/images/icons/pastel/empty_box.png' style='width: 70px;'/>" +
						"<br/><br/>About Us page is empty. Delete this content and type here</h3>";

					$("#aboutus-con").html("<textarea id='about-us-edit-con' style='width: 100%;'>"+con+"</textarea>");
					InitEditor(getElement("about-us-edit-con"));
					$("#aboutus-con").removeClass("pad-2");
					$("#about-us-save-btn").removeClass("disabled");
				}
				else
				{
					$("#aboutus-con").html("<textarea id='about-us-edit-con' style='width: 100%;'>"+d.data+"</textarea>");
					InitEditor(getElement("about-us-edit-con"));
					$("#aboutus-con").removeClass("pad-2");
					$("#about-us-save-btn").removeClass("disabled");
				}
			}
			else
			{
				$("#aboutus-con").html("<h4 class='ui center aligned icon sleak header' style='font-family: nunitoregular;'>" +
					"<i class='ban icon' style='color: rgba(255,0,0,0.1)'></i>Connection Error!</h4>");
			}
		}
		else
		{
			$("#aboutus-con").html("<h4 class='align-c' style='font-family: nunitoregular;'>" +
				"<i class='web icon'></i>Connection Error!</h4>");
		}
	},{job:"get about us"});
}

function saveAboutUs()
{
	let request = {
		content:$("#about-us-edit-con").val(),
		job:"save about us"
	};

	let store = "<h3 class=\"align-c pad-2\" style=\"font-family: montserratlight; color: silver;\">" +
		"<img src=\""+host+"cdn/images/icons/pastel/empty_box.png\" style=\"width: 70px;\">" +
		"<br><br>About Us page is empty. Delete this content and type here</h3>";

	if(store === request.content)
	{
		errorButton({btn:"about-us-save-btn",msg:"Invalid content"});
	}
	else
	{
		loadingButton({btn:"about-us-save-btn"});
		postJson("hms-admin/worker", function (data, status) {
			loadingButton({btn:"about-us-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#about-us-save-btn").addClass("positive");
					$("#about-us-save-btn").html("<i class='check icon'></i>Document saved");
					setTimeout(function () {
						$("#about-us-save-btn").removeClass("positive");
						$("#about-us-save-btn").html("<i class='save icon'></i>Save");
					}, 3000);
				}
				else
				{
					errorButton({btn:"about-us-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"about-us-save-btn", msg:"Connection error"});
			}
		}, request);
	}
}




//------------------------------------- Page text logic------------------------------------------//

function getPageText()
{
	$("#page-text-con").html(
		"<div class='ui placeholder'>" +
		"<div class='line'></div> " +
		"<div class='line'></div> " +
		"</div>" +
		"<div class='ui placeholder'>" +
		"<div class='line'></div> " +
		"<div class='line'></div> " +
		"</div>");

	postJson("hms-admin/worker", function (data, status) {
		$("#page-text-con").html("");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(d.data === "")
				{
					let con ="<h3 class='align-c pad-2' style='font-family: montserratlight; color: silver;'>" +
						"<img src='"+host+"cdn/images/icons/pastel/empty_box.png' style='width: 70px;'/>" +
						"<br/><br/>Main Page Text is empty. Delete this content and type here</h3>";

					$("#page-text-con").html("<textarea id='page-text-edit-con' style='width: 100%;'>"+con+"</textarea>");
					InitEditor(getElement("page-text-edit-con"));
					$("#aboutus-con").removeClass("pad-2");
					$("#about-us-save-btn").removeClass("disabled");
				}
				else
				{
					$("#page-text-con").html("<textarea id='page-text-edit-con' style='width: 100%;'>"+d.data+"</textarea>");
					InitEditor(getElement("page-text-edit-con"));
					$("#page-text-con").removeClass("pad-2");
					$("#about-us-save-btn").removeClass("disabled");
				}
			}
			else
			{
				$("#page-text-con").html("<h4 class='ui center aligned icon sleak header' style='font-family: nunitoregular;'>" +
					"<i class='ban icon' style='color: rgba(255,0,0,0.1)'></i>Connection Error!</h4>");
			}
		}
		else
		{
			$("#page-text-con").html("<h4 class='align-c' style='font-family: nunitoregular;'>" +
				"<i class='web icon'></i>Connection Error!</h4>");
		}
	},{job:"get page text"});
}



function savePagetext()
{
	let request = {
		content:$("#page-text-edit-con").val(),
		job:"save page text"
	};

	let store ="<h3 class=\"align-c pad-2\" style=\"font-family: montserratlight; color: silver;\">" +
		"<img src=\""+host+"cdn/images/icons/pastel/empty_box.png\" style=\"width: 70px;\">" +
		"<br><br>Main Page Text is empty. Delete this content and type here</h3>";

	if(store === request.content)
	{
		errorButton({btn:"page-text-save-btn",msg:"Invalid content"});
	}
	else
	{
		loadingButton({btn:"page-text-save-btn"});
		postJson("hms-admin/worker", function (data, status) {
			loadingButton({btn:"page-text-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#page-text-save-btn").addClass("positive");
					$("#page-text-save-btn").html("<i class='check icon'></i>Document saved");
					setTimeout(function () {
						$("#page-text-save-btn").removeClass("positive");
						$("#page-text-save-btn").html("<i class='save icon'></i>Save");
					}, 3000);
				}
				else
				{
					errorButton({btn:"page-text-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"page-text-save-btn", msg:"Connection error"});
			}
		}, request);
	}
}



//----------------------------- Coupon logics --------------------------------
function coverageChanged(e)
{
	$("#lodging-select-con").slideDown(400);

	if(getElement("lodging-select").options.length === 0)
	{
		list({con:getElement("lodging-select"),job:'list room category',all:true});
	}
	/*
	if(e.options[0].selected)
	{
		$("#lodging-select-con").slideDown(400);

		if(getElement("lodging-select").options.length === 0)
		{
			list({con:getElement("lodging-select"),job:'list room category',all:true});
		}
	}
	else
	{
		$("#lodging-select-con").slideUp(400);
	}


	if(e.options[1].selected)
	{
		$("#kitchen-select-con").slideDown(400);

		if(getElement("kitchen-select").options.length === 0)
		{
			list({con:getElement("kitchen-select"),job:'list food',all:true});
		}
	}
	else
	{
		$("#kitchen-select-con").slideUp(400);
	}


	if(e.options[2].selected)
	{
		$("#bar-select-con").slideDown(400);

		if(getElement("bar-select").options.length === 0)
		{
			list({con:getElement("bar-select"),job:'list drink',all:true});
		}
	}
	else
	{
		$("#bar-select-con").slideUp(400);
	}


	if(e.options[3].selected)
	{
		$("#bakery-select-con").slideDown(400);

		if(getElement("bakery-select").options.length === 0)
		{
			list({con:getElement("bakery-select"),job:'list pastry',all:true});
		}
	}
	else
	{
		$("#bakery-select-con").slideUp(400);
	}


	if(e.options[4].selected)
	{
		$("#laundry-select-con").slideDown(400);

		if(getElement("laundry-select").options.length === 0)
		{
			list({con:getElement("laundry-select"),job:'list room category',all:true});
		}
	}
	else
	{
		$("#laundry-select-con").slideUp(400);
	}


	if(e.options[5].selected)
	{
		$("#pool-select-con").slideDown(400);

		if(getElement("pool-select").options.length === 0)
		{
			list({con:getElement("pool-select"),job:'list room category',all:true});
		}
	}
	else
	{
		$("#pool-select-con").slideUp(400);
	}


	if(e.options[6].selected)
	{
		$("#services-select-con").slideDown(400);

		if(getElement("services-select").options.length === 0)
		{
			list({con:getElement("services-select"),job:'list extra services',all:true});
		}
	}
	else
	{
		$("#services-select-con").slideUp(400);
	}
	 */
}

function generateCoupon()
{
	loadingButton({btn:"coupon-gen-btn"});
	postJson("hms-admin/worker",function(data, status){
		loadingButton({btn:"coupon-gen-btn",loading:false});

		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#coupon-code").val(d.data);
			}
			else
			{
				errorButton({btn:"coupon-gen-btn", msg:"<i class='times icon'></i>"});
			}
		}
		else
		{
			errorButton({btn:"coupon-gen-btn", msg:"<i class='times icon'></i>"});
		}
	},{job:"generate coupon"});
  }

function percentageSwitch()
{
	let val = Number($("#coupon-amount").val());

	if(getElement("bypercentage").checked)
	{
		$("#per-cash-icon").removeClass("money");
		$("#per-cash-icon").addClass("percent");
		$("#per-cash-label").html("Percentage");

		if(val > 100)
		{
			$("#coupon-amount").val(100);
		}
	}
	else
	{
		$("#per-cash-icon").addClass("money");
		$("#per-cash-icon").removeClass("percent");
		$("#per-cash-label").html("Amount");
	}
}

var resetPage = true;

function saveCoupon()
{
	let request = {
		id:$("#couponid").val(),
		name:$("#coupon-name").val(),
		code:$("#coupon-code").val(),
		value:Number($("#coupon-amount").val()),
		bypercent:getElement("bypercentage").checked,
		use:Number($("#use-count").val()),
		expires:$("#coupon-expiry-date").val(),
		lodging:$("#lodging-select").dropdown("get value"),
		food:$("#kitchen-select").dropdown("get value"),
		bar:$("#bar-select").dropdown("get value"),
		bakery:$("#bakery-select").dropdown("get value"),
		laundry:$("#laundry-select").dropdown("get value"),
		pool:$("#pool-select").dropdown("get value"),
		services:$("#services-select").dropdown("get value"),
		property:$("#property-id").val(),
		job:"save coupon"
	};

	if(request.name === "")
	{
		errorButton({btn:"save-coupon-btn", msg:"Name is empty"});
	}
	else if(request.code === "")
	{
		errorButton({btn:"save-coupon-btn", msg:"Code is empty"});
	}
	else if(Number(request.value) < 1)
	{
		errorButton({btn:"save-coupon-btn", msg:"Invalid coupon value"});
	}
	else if((request.lodging == "") && (request.bakery == "") && (request.bar == "") &&
		(request.laundry == "") && (request.food == "") && (request.pool == "") && (request.services == ""))
	{
		errorButton({btn:"save-coupon-btn", msg:"Coupon covers nothing"});
	}
	else
	{

		loadingButton({btn: "save-coupon-btn"});
		postJson("hms-admin/worker", function (data, status) {
			loadingButton({btn: "save-coupon-btn", loading: false});
			if (status === "done") {
				let d = JSON.parse(data);

				if (d.status === "success")
				{

					if (resetPage)
					{
						$("#couponid").val("");
						$("#coupon-name").val("");
						$("#coupon-code").val("");
						$("#coupon-amount").val("");
						$("#use-count").val(1);
						$("#coupon-expiry-date").val("");
						$("#lodging-select").dropdown("restore defaults");
						$("#kitchen-select").dropdown("restore defaults");
						$("#bar-select").dropdown("restore defaults");
						$("#bakery-select").dropdown("restore defaults");
						$("#laundry-select").dropdown("restore defaults");
						$("#pool-select").dropdown("restore defaults");
						$("#services-select").dropdown("restore defaults");

						$("#coupon-main-select").dropdown("restore defaults");

						getElement("bypercentage").checked = false;
						percentageSwitch();
					}


					$("#save-coupon-btn").addClass("positive disabled");
					$("#save-coupon-btn").html("<i class='check icon'></i> Coupon saved");
					setTimeout(function () {
						$("#save-coupon-btn").removeClass("positive disabled");
						$("#save-coupon-btn").html("Submit");
					}, 3000);
				}
				else
				{
					errorButton({btn: "save-coupon-btn", msg: d.message});
				}
			}
			else
			{
				errorButton({btn: "save-coupon-btn", msg: "Failed. Connection error."});
			}
		}, request);
	}
}

function switchCouponTabs(e)
{
	$(".coupon-tab").removeClass("active");
	$(e).addClass("active");
	$("#search-txt").val("");
	document.querySelector('#main-sel').checked = false;
	populateCoupon();
}

function ConfirmGroupCouponDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Coupons?", function(choice){
		if(choice === true)
		{
			CouponGroupDelete();
		}
	});
}

function ConfirmCouponDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Coupons?", function(choice, param){
		if(choice === true)
		{
			CouponListDelete(param);
		}
	}, null, null, e);
}

function CouponGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteCoupon(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Coupons failed to delete");
		}
	}
	else
	{
		ShowModal("No Coupons were selected");
	}
}

function CouponListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeleteCoupon(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status === "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteCoupon(e, func)
{
	let request = {};
	request.Couponid = e;
	request.property = $("#property-id").val();
	request.job = "delete coupon";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}


function loadEditCoupon(e)
{
	$("#page").addClass("ui active loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui active loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#couponid").val(d.data.Id);
				$("#coupon-name").val(d.data.Title);
				$("#coupon-code").val(d.data.Code);
				$("#coupon-amount").val(d.data.Value);
				$("#use-count").val(d.data.Usecount);
				$('#save-coupon-btn').text('Edit coupon');
				resetPage = false;

				if(d.data.Expires)
				{
					$("#coupon-expiry-date").val(d.data.Expirydate.Month+"/"+d.data.Expirydate.Day+"/"+d.data.Expirydate.Year);
				}
				getElement("bypercentage").checked = d.data.Bypercentage;
				percentageSwitch();

				let selGroup = [];
				if(d.data.Booking.length > 0)
				{
					selGroup.push("Lodging");
				}
				if(d.data.Food.length > 0)
				{
					selGroup.push("Restaurant");
				}
				if(d.data.Drinks.length > 0)
				{
					selGroup.push("Bar");
				}
				if(d.data.Pastries.length > 0)
				{
					selGroup.push("Bakery");
				}
				if(d.data.Laundry.length > 0)
				{
					selGroup.push("Laundry");
				}
				if(d.data.Pool.length > 0)
				{
					selGroup.push("Pool");
				}
				if(d.data.Services.length > 0)
				{
					selGroup.push("Extra services");
				}

				$("#coupon-main-select").dropdown('set selected', selGroup);

				list({con:getElement("lodging-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Booking.length > 0)
							{
								$("#lodging-select").dropdown("set selected", d.data.Booking);
							}
						}
					}});
				list({con:getElement("kitchen-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Food.length > 0)
							{
								$("#kitchen-select").dropdown("set selected", d.data.Food);
							}
						}
					}});
				list({con:getElement("bar-select"),job:'list drinks',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Drinks.length > 0)
							{
								$("#bar-select").dropdown("set selected", d.data.Drinks);
							}
						}
					}});
				list({con:getElement("bakery-select"),job:'list pastries',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Pastries.length > 0)
							{
								$("#bakery-select").dropdown("set selected", d.data.Pastries);
							}
						}
					}});
				list({con:getElement("laundry-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Laundry.length > 0)
							{
								$("#laundry-select").dropdown("set selected", d.data.Laundry)
							}
						}
					}});
				list({con:getElement("pool-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Pool.length > 0)
							{
								$("#pool-select").dropdown("set selected", d.data.Pool);
							}
						}
					}});
				list({con:getElement("services-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Services.length > 0)
							{
								$("#services-select").dropdown("set selected", d.data.Services);
							}
						}
					}});
			}
			else
			{

			}
		}
		else
		{

		}
	},{job:"get coupon", property: $("#property-id").val(), couponid:e});
}





//----------------------------- Discount logic --------------------------------


function autoDiscountSelected(e)
{
	if(e.checked)
	{
		$("#auto-discount-list").slideDown(300);
		discountCoverageChanged(getElement("discount-main-select"));
	}
}
function manualDiscountSelected(e)
{
	if(e.checked)
	{
		$("#auto-discount-list").slideUp(300);
	}
}

function discountCoverageChanged(e)
{
	if(e.options[0].selected)
	{
		$("#lodging-select-con").slideDown(400);

		if(getElement("lodging-select").options.length === 0)
		{
			list({con:getElement("lodging-select"),job:'list room category',all:true});
		}

		$("#auto-discount-sel").html(
			"<option value='is-staff'>Customer is a staff</option>" +
			"<option value='former-booking-count'>Formerly booking count is</option>" +
			"<option value='online-order'>Reservation is made online</option>" +
			"<option value='offline-order'>Reservation is made at the Front-desk</option>" +
			"<option value='periodic'>Period is</option>" +
			"<option value='time-of-day'>Time of checking in is</option>" +
			"<option value='days-count'>Number of days booked is</option>" +
			"<option value='room-count'>Number of rooms booked is</option>"+
			"<option value='total-amount'>Total amount is</option>"+
			"<option value='payment-mode'>Payment mode is</option>"
		);
		$(".option-value-con").slideUp(300);
	}
	else
	{
		$("#lodging-select-con").slideUp(400);
	}


	if(e.options[1].selected)
	{
		$("#kitchen-select-con").slideDown(400);

		if(getElement("kitchen-select").options.length === 0)
		{
			list({con:getElement("kitchen-select"),job:'list food',all:true});
		}

		$("#auto-discount-sel").html(
			"<option value='is-staff'>Customer is a staff</option>" +
			"<option value='former-order'>Former ordered up to</option>" +
			"<option value='former-booking-count'>Formerly booked up to</option>" +
			"<option value='quantity'>Quantity bought is</option>" +
			"<option value='online-order'>Order is made online</option>" +
			"<option value='offline-order'>Order is made at POS</option>" +
			"<option value='periodic'>Period is</option>" +
			"<option value='time-of-day'>Time of day is</option>" +
			"<option value='days-count'>Number of days booked is</option>" +
			"<option value='room-count'>Number of rooms booked is</option>"+
			"<option value='total-amount'>Total amount is</option>",
			"<option value='payment-mode'>Payment mode is</option>"
		);
		$(".option-value-con").slideUp(300);
	}
	else
	{
		$("#kitchen-select-con").slideUp(400);
	}


	if(e.options[2].selected)
	{
		$("#bar-select-con").slideDown(400);

		if(getElement("bar-select").options.length === 0)
		{
			list({con:getElement("bar-select"),job:'list drink',all:true});
		}

		$("#auto-discount-sel").html(
			"<option value='is-staff'>Customer is a staff</option>" +
			"<option value='former-order'>Former ordered up to</option>" +
			"<option value='former-booking-count'>Formerly booked up to</option>" +
			"<option value='quantity'>Quantity bought is</option>" +
			"<option value='online-order'>Order is made online</option>" +
			"<option value='offline-order'>Order is made at POS</option>" +
			"<option value='periodic'>Period is</option>" +
			"<option value='time-of-day'>Time of day is</option>" +
			"<option value='days-count'>Number of days booked is</option>" +
			"<option value='room-count'>Number of rooms booked is</option>"+
			"<option value='total-amount'>Total amount is</option>" +
			"<option value='payment-mode'>Payment mode is</option>"
		);
		$(".option-value-con").slideUp(300);
	}
	else
	{
		$("#bar-select-con").slideUp(400);
	}


	if(e.options[3].selected)
	{
		$("#bakery-select-con").slideDown(400);

		if(getElement("bakery-select").options.length === 0)
		{
			list({con:getElement("bakery-select"),job:'list pastry',all:true});
		}

		$("#auto-discount-sel").html(
			"<option value='is-staff'>Customer is a staff</option>" +
			"<option value='former-order'>Former ordered up to</option>" +
			"<option value='former-booking-count'>Formerly booked up to</option>" +
			"<option value='quantity'>Quantity bought is</option>" +
			"<option value='online-order'>Order is made online</option>" +
			"<option value='offline-order'>Order is made at POS</option>" +
			"<option value='periodic'>Period is</option>" +
			"<option value='time-of-day'>Time of day is</option>" +
			"<option value='days-count'>Number of days booked is</option>" +
			"<option value='room-count'>Number of rooms booked is</option>"+
			"<option value='total-amount'>Total amount is</option>" +
			"<option value='payment-mode'>Payment mode is</option>"
		);
		$(".option-value-con").slideUp(300);
	}
	else
	{
		$("#bakery-select-con").slideUp(400);
	}


	if(e.options[4].selected)
	{
		$("#laundry-select-con").slideDown(400);

		if(getElement("laundry-select").options.length === 0)
		{
			list({con:getElement("laundry-select"), job:'list room category',all:true});
		}

		$("#auto-discount-sel").html(
			"<option value='is-staff'>Customer is a staff</option>" +
			"<option value='former-order'>Former ordered up to</option>" +
			"<option value='former-booking-count'>Formerly booked up to</option>" +
			"<option value='quantity'>Quantity bought is</option>" +
			"<option value='online-order'>Order is made online</option>" +
			"<option value='offline-order'>Order is made at POS</option>" +
			"<option value='periodic'>Period is</option>" +
			"<option value='time-of-day'>Time of day is</option>" +
			"<option value='days-count'>Number of days booked is</option>" +
			"<option value='room-count'>Number of rooms booked is</option>"+
			"<option value='total-amount'>Total amount is</option>" +
			"<option value='payment-mode'>Payment mode is</option>"
		);
		$(".option-value-con").slideUp(300);
	}
	else
	{
		$("#laundry-select-con").slideUp(400);
	}


	if(e.options[5].selected)
	{
		$("#pool-select-con").slideDown(400);

		if(getElement("pool-select").options.length === 0)
		{
			list({con:getElement("pool-select"),job:'list room category',all:true});
		}

		$("#auto-discount-sel").html(
			"<option value='is-staff'>Customer is a staff</option>" +
			"<option value='former-booking-count'>Formerly booked up to</option>" +
			"<option value='periodic'>Period is</option>" +
			"<option value='time-of-day'>Time of day is</option>" +
			"<option value='days-count'>Number of days booked is</option>" +
			"<option value='room-count'>Number of rooms booked is</option>" +
			"<option value='total-amount'>Total amount is</option>" +
			"<option value='payment-mode'>Payment mode is</option>"
		);
		$(".option-value-con").slideUp(300);
	}
	else
	{
		$("#pool-select-con").slideUp(400);
	}

	if(e.options[6].selected)
	{
		$("#services-select-con").slideDown(400);

		if(getElement("services-select").options.length === 0)
		{
			list({con:getElement("services-select"),job:'list extra services',all:true});
		}

		$("#auto-discount-sel").html(
			"<option value='is-staff'>Customer is a staff</option>" +
			"<option>Time of checking in is</option>" +
			"<option value='former-booking-count'>Formerly booked up to</option>" +
			"<option value='periodic'>Period is</option>" +
			"<option value='time-of-day'>Time of checking in is</option>" +
			"<option value='days-count'>Number of days booked is</option>" +
			"<option value='room-count'>Number of rooms booked is</option>"+
			"<option value='total-amount'>Total amount is</option>" +
			"<option value='payment-mode'>Payment mode is</option>"
		);
		$(".option-value-con").slideUp(300);
	}
	else
	{
		$("#services-select-con").slideUp(400);
	}
}




function discountMeasured(e)
{
	if((e.value == "is-staff") || (e.value == "online-order") || (e.value == "offline-order"))
	{
		$(".option-value-con").slideUp(300);
	}
	if(e.value == "former-order")
	{
		$(".option-value-con").slideUp(300);
		$("#quantity-con").slideDown(300);
	}
	if(e.value == "former-booking-count")
	{
		$(".option-value-con").slideUp(300);
		$("#quantity-con").slideDown(300);
	}
	if(e.value == "quantity")
	{
		$(".option-value-con").slideUp(300);
		$("#quantity-con").slideDown(300);
	}
	if(e.value == "periodic")
	{
		$(".option-value-con").slideUp(300);
		$("#date-period-con").slideDown(300);
	}
	if(e.value == "time-of-day")
	{
		$(".option-value-con").slideUp(300);
		$("#time-period-con").slideDown(300);
	}
	if(e.value == "days-count")
	{
		$(".option-value-con").slideUp(300);
		$("#quantity-con").slideDown(300);
	}
	if(e.value == "room-count")
	{
		$(".option-value-con").slideUp(300);
		$("#quantity-con").slideDown(300);
	}
	if(e.value == "total-amount")
	{
		$(".option-value-con").slideUp(300);
		$("#amount-con").slideDown(300);
	}
	if(e.value == "payment-mode")
	{
		$(".option-value-con").slideUp(300);
		$("#payment-mode").slideDown(300);
	}

}

function discountPercentageSwitch()
{
	let val = Number($("#discount-amount").val());

	if(getElement("bypercentage").checked)
	{
		$("#per-cash-icon").removeClass("money");
		$("#per-cash-icon").addClass("percent");
		$("#per-cash-label").html("Percentage");

		if(val > 100)
		{
			$("#discount-amount").val(100);
		}
	}
	else
	{
		$("#per-cash-icon").addClass("money");
		$("#per-cash-icon").removeClass("percent");
		$("#per-cash-label").html("Amount");
	}
}

var resetPage = true;

function saveDiscount()
{
	//let sel = getElement("discount-main-select");

	let request = {
		id:$("#discountid").val(),
		name:$("#discount-name").val(),
		value:Number($("#discount-amount").val()),
		bypercent:getElement("bypercentage").checked,
		lodging: true ? $("#lodging-select").dropdown("get value") : "",
		food: "", //sel.options[1].selected ? $("#kitchen-select").dropdown("get value") : "",
		bar: "", //sel.options[2].selected ? $("#bar-select").dropdown("get value") : "",
		bakery: "", //sel.options[3].selected ? $("#bakery-select").dropdown("get value") : "",
		laundry: "", //sel.options[4].selected ? $("#laundry-select").dropdown("get value") : "",
		pool: "", //sel.options[5].selected ? $("#pool-select").dropdown("get value") : "",
		services: "", //sel.options[6].selected ? $("#services-select").dropdown("get value") : "",
		status:$("#discountstatus").val(),
		ontotal:getElement("ontotal").checked,

		isstaff:$("#auto-discount-sel").val() === "is-staff" ? true : false,
		periodic:$("#auto-discount-sel").val() === "periodic" ? true : false,
		timebased:$("#auto-discount-sel").val() === "time-of-day" ? true : false,
		bookingcount:$("#auto-discount-sel").val() === "former-booking-count" ? true : false,
		formerorder:$("#auto-discount-sel").val() === "former-order" ? true : false,
		onlineorder:$("#auto-discount-sel").val() === "online-order" ? true : false,
		offlineorder:$("#auto-discount-sel").val() === "offline-order" ? true : false,
		quantity:$("#auto-discount-sel").val() === "quantity" ? true : false,
		bookedroom:$("#auto-discount-sel").val() === "room-count" ? true : false,
		bookeddays:$("#auto-discount-sel").val() === "days-count" ? true : false,
		amountbased:$("#auto-discount-sel").val() === "total-amount" ? true : false,
		paymentmode:$("#auto-discount-sel").val() === "payment-mode" ? true : false,


		autoapply:getElement("auto-discount").checked,
		fromamount:"",
		toamount:"",
		fromcount:"",
		tocount:"",
		fromhour:"",
		tohour:"",
		fromminuite:"",
		tominuite:"",
		fromday:"",
		today:"",
		frommonth:"",
		tomonth:"",
		frommeridean:"",
		tomeridean:"",

		paymentCollection: JSON.stringify({
			'online' : getElement('online-only').checked,
			'cash' : getElement('cash-only').checked, 
			'transfer' : getElement('transfer-deposit').checked,
			'card' : getElement('card-pos').checked
		}),

		property:$("#property-id").val(),

		job:"save discount"
	};

	if(request.periodic)
	{
		request.fromdate = $("#date-from").val();
		request.todate = $("#date-to").val();
		// request.frommonth = $("#start-month").val();
		// request.tomonth = $("#stop-month").val();
	}
	if(request.timebased)
	{
		request.fromhour = $("#start-hour").val();
		request.tohour = $("#stop-hour").val();
		request.fromminuite = $("#start-min").val();
		request.tominuite = $("#stop-min").val();
		request.frommeridean = $("#start-gmt").val();
		request.tomeridean = $("#stop-gmt").val();
	}
	if(request.bookingcount)
	{
		request.fromcount = $("#from-quantity").val();
		request.tocount = $("#to-quantity").val();
	}
	if(request.formerorder)
	{
		request.fromcount = $("#from-quantity").val();
		request.tocount = $("#to-quantity").val();
	}
	if(request.quantity)
	{
		request.fromcount = $("#from-quantity").val();
		request.tocount = $("#to-quantity").val();
	}
	if(request.bookedroom)
	{
		request.fromcount = $("#from-quantity").val();
		request.tocount = $("#to-quantity").val();
	}
	if(request.bookeddays)
	{
		request.fromcount = $("#from-quantity").val();
		request.tocount = $("#to-quantity").val();
	}
	if(request.amountbased)
	{
		request.fromamount = $("#from-amount").val();
		request.toamount = $("#to-amount").val();
	}


	if(request.name === "")
	{
		errorButton({btn:"save-discount-btn", msg:"Name is empty"});
	}
	else if(Number(request.value) < 1)
	{
		errorButton({btn:"save-discount-btn", msg:"Invalid discount value"});
	}
	else if((request.lodging == "") && (request.bakery == "") && (request.bar == "") &&
		(request.laundry == "") && (request.food == "") && (request.pool == "") && (request.services == ""))
	{
		errorButton({btn:"save-discount-btn", msg:"Discount covers nothing"});
	}
	else
	{

		loadingButton({btn: "save-discount-btn"});
		postJson("hms-admin/worker", function (data, status) {
			loadingButton({btn: "save-discount-btn", loading: false});
			if (status === "done") {
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					if (resetPage)
					{
						getElement("manual-discount").checked= true;

						$("#auto-discount-sel").dropdown("set selected", "is-staff");
						discountMeasured(getElement("auto-discount-sel"));

						$("#discountstatus").val("true");
						$("#discountid").val("");
						$("#discount-name").val("");
						$("#discount-amount").val("");
						$("#lodging-select").dropdown("restore defaults");
						$("#kitchen-select").dropdown("restore defaults");
						$("#bar-select").dropdown("restore defaults");
						$("#bakery-select").dropdown("restore defaults");
						$("#laundry-select").dropdown("restore defaults");
						$("#pool-select").dropdown("restore defaults");
						$("#services-select").dropdown("restore defaults");

						$("#coupon-main-select").dropdown("restore defaults");

						getElement("bypercentage").checked = false;
						percentageSwitch();
					}


					$("#save-discount-btn").addClass("positive disabled");
					$("#save-discount-btn").html("<i class='check icon'></i> Discount saved");
					setTimeout(function () {
						$("#save-discount-btn").removeClass("positive disabled");
						$("#save-discount-btn").html("Save discount");
					}, 3000);
				}
				else
				{
					if (d.message.length <= 40)
					{
						errorButton({btn: "save-discount-btn", msg: d.message});
					}
					else
					{
						// show modal
						ShowModal(d.message);

						// failed
						errorButton({btn: "save-discount-btn", msg: 'Operation failed!'});
					}
				}
			}
			else
			{
				errorButton({btn: "save-discount-btn", msg: "Failed. Connection error."});
			}
		}, request);
	}
}

function loadEditDiscount(e)
{
	$("#page").addClass("ui active loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui active loading form");
		if(status === "done")
		{
			let d = JSON.parse(data); 

			if(d.status === "success")
			{
				if(d.data.Booking.length > 0)
				{
					$("#discount-main-select").dropdown('set selected', "Lodging");
				}
				if(d.data.Food.length > 0)
				{
					$("#discount-main-select").dropdown('set selected', "Restaurant");
				}
				if(d.data.Drinks.length > 0)
				{
					$("#discount-main-select").dropdown('set selected', "Bar");
				}
				if(d.data.Pastries.length > 0)
				{
					$("#discount-main-select").dropdown('set selected', "Bakery");
				}
				if(d.data.Laundry.length > 0)
				{
					$("#discount-main-select").dropdown('set selected', "Laundry");
				}
				if(d.data.Pool.length > 0)
				{
					$("#discount-main-select").dropdown('set selected', "Pool");
				}
				if(d.data.Services.length > 0)
				{
					$("#discount-main-select").dropdown('set selected', "Extra services");
				}

				//getElement("discount-main-select", function(r){ discountCoverageChanged(r);})
				resetPage = false;

				getElement("auto-discount").checked = d.data.Autoapply;
				

				if(d.data.Isstaff)
				{
					$("#auto-discount-sel").dropdown("set selected", "is-staff");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Periodic)
				{
					$("#auto-discount-sel").dropdown("set selected", "periodic");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Timebased)
				{
					$("#auto-discount-sel").dropdown("set selected", "time-of-day");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Bookingcount)
				{
					$("#auto-discount-sel").dropdown("set selected", "former-booking-count");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Formerorder)
				{
					$("#auto-discount-sel").dropdown("set selected", "former-order");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Onlineorder)
				{
					$("#auto-discount-sel").dropdown("set selected", "online-order");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Offlineorder)
				{
					$("#auto-discount-sel").dropdown("set selected", "offline-order");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Quantity)
				{
					$("#auto-discount-sel").dropdown("set selected", "quantity");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Bookedroom)
				{
					$("#auto-discount-sel").dropdown("set selected", "room-count");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Bookeddays)
				{
					$("#auto-discount-sel").dropdown("set selected", "days-count");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.Amountbased)
				{
					$("#auto-discount-sel").dropdown("set selected", "total-amount");
					discountMeasured(getElement("auto-discount-sel"));
				}
				if(d.data.PaymentMode)
				{
					$("#auto-discount-sel").dropdown("set selected", "payment-mode");
					discountMeasured(getElement("auto-discount-sel"));

					// load 
					let paymentCollection = JSON.parse(d.data.PaymentCollection);

					// check them all
					getElement('online-only').checked = paymentCollection.online;
					getElement('cash-only').checked = paymentCollection.cash;
					getElement('transfer-deposit').checked = paymentCollection.transfer;
					getElement('card-pos').checked = paymentCollection.card;
				}

				$("#discountid").val(d.data.Id);
				$("#discount-name").val(d.data.Name);
				$("#discount-amount").val(d.data.Value);
				getElement("ontotal").checked = d.data.Ontotal;

				getElement("bypercentage").checked = d.data.Bypercentage;
				discountPercentageSwitch();

				list({con:getElement("lodging-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Booking.length > 0)
							{
								$("#lodging-select").dropdown("set selected", d.data.Booking);
							}
						}
					}});
				list({con:getElement("kitchen-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Food.length > 0)
							{
								$("#kitchen-select").dropdown("set selected", d.data.Food);
							}
						}
					}});
				list({con:getElement("bar-select"),job:'list drinks',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Drinks.length > 0)
							{
								$("#bar-select").dropdown("set selected", d.data.Drinks);
							}
						}
					}});
				list({con:getElement("bakery-select"),job:'list pastries',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Pastries.length > 0)
							{
								$("#bakery-select").dropdown("set selected", d.data.Pastries);
							}
						}
					}});
				list({con:getElement("laundry-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Laundry.length > 0)
							{
								$("#laundry-select").dropdown("set selected", d.data.Laundry)
							}
						}
					}});
				list({con:getElement("pool-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Pool.length > 0)
							{
								$("#pool-select").dropdown("set selected", d.data.Pool);
							}
						}
					}});
				list({con:getElement("services-select"),job:'list room category',all:true, onLoaded:function(o){
						if(o.status === "success")
						{
							if(d.data.Services.length > 0)
							{
								$("#services-select").dropdown("set selected", d.data.Services);
							}
						}
					}});


				if(d.data.Periodic)
				{
					$("#date-from").val(d.data.DateFrom);
					$("#date-to").val(d.data.DateTo);
					// $("#start-month").dropdown('set selected', d.data.Frommonth);
					// $("#stop-month").dropdown('set selected', d.data.Tomonth);
				}
				if(d.data.Timebased)
				{
					$("#start-hour").dropdown('set selected', (d.data.Fromhour < 10 ? "0"+d.data.Fromhour : d.data.Fromhour));
					$("#stop-hour").dropdown('set selected', (d.data.Tohour <  10 ? "0"+d.data.Tohour : d.data.Tohour));
					$("#start-min").val(d.data.Fromminuite);
					$("#stop-min").val(d.data.Tominuite);
					$("#start-gmt").dropdown('set selected', d.data.Frommeridean);
					$("#stop-gmt").dropdown('set selected', d.data.Tomeridean);
				}
				if(d.data.Bookingcount)
				{
					$("#from-quantity").val(d.data.Fromcount);
					$("#to-quantity").val(d.data.Tocount);
				}
				if(d.data.Formerorder)
				{
					$("#from-quantity").val(d.data.Fromcount);
					$("#to-quantity").val(d.data.Tocount);
				}
				if(d.data.Quantity || d.data.Bookedroom || d.data.Bookeddays)
				{
					$("#from-quantity").val(d.data.Fromcount);
					$("#to-quantity").val(d.data.Tocount);
				}
				if(d.data.Amountbased)
				{
					$("#from-amount").val(d.data.Fromamount);
					$("#to-amount").val(d.data.Toamount);
				}

				autoDiscountSelected(getElement("auto-discount"));
			}
		}

	},{job:"get discount", property:$("#property-id").val(), discountid:e});
}

function ConfirmGroupDiscountDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Discounts?", function(choice){
		if(choice === true)
		{
			DiscountGroupDelete();
		}
	});
}

function ConfirmDiscountDelete(e)
{
	ConfirmModal("Are you sure you want to delete the Discounts?", function(choice, param){
		if(choice === true)
		{
			DiscountListDelete(param);
		}
	}, null, null, e);
}

function DiscountGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteDiscount(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Discounts failed to delete");
		}
	}
	else
	{
		ShowModal("No Discounts were selected");
	}
}

function DiscountListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeleteDiscount(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteDiscount(e, func)
{
	let request = {};
	request.Discountid = e;
	request.job = "delete discount";
	request.property = $("#property-id").val();

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function SetDiscount_status(e, a)
{
	let request = {};
	request.Discountid = a;
	request.status = e.checked;
	request.property = $("#property-id").val();
	request.job = "save discount status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !e.checked;
				ShowModal("Unable to save discount status");
			}
		}
		else
		{
			e.checked = !e.checked;
			ShowModal("Connection error. Unable to save discount status");
		}
	}, request);
}

function loadDiscountAnalytics()
{
	Morris.Line({
		element: 'discount-use-graph',
		data: [
			{year: '2009', value: null},
			{year: '2010', value: 3},
			{year: '2011', value: 3},
			{year: '2012', value: 1},
			{year: '2013', value: 2},
			{year: '2014', value: 8},
			{year: '2015', value: 4},
			{year: '2016', value: null}
		],
		xkey: 'year',
		ykeys: ['value'],
		gridTextFamily:"quicksandregular",
		gridTextWeight: "bold",
		resize:true,
		gridTextSize:"14px",
		smooth:false,
		//pointFillColors: "",
		//pointStrokeColors: "",
		//parseTime:false, set to false when x values are just data
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


	Morris.Donut({
		element: 'discoungt-donut',
		data: [
			{value: 70, label: 'foo', formatted: 'at least 70%' },
			{value: 15, label: 'bar', formatted: 'approx. 15%' },
			{value: 10, label: 'baz', formatted: 'approx. 10%' },
			{value: 5, label: 'A really really long label', formatted: 'at most 5%' }
		],
		colors:["rgb(64,153,255)"],
		formatter: function (x, data) { return data.formatted; }
	});
}




//------------------------------------- Theme Logic --------------------------------------


  function loadTheme()
  {
	$("#theme-con").addClass("loading");
	postJson("hms-admin/worker", function(data, status){
		$("#theme-con").removeClass("loading");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#theme-con").html("<div class='l-pad-2 s-pad-1'>" +

					"<div class='w3-row'>" +
					"<div class='w3-col l3 m4 s12'>" +
					"<div class='l-width-9' style='margin: auto;'>" +
					"<div class='lift-1' style='min-height: 250px; max-height: 300px; overflow-y: hidden;'>" +
					"<img src='"+host+"cdn/images/theme/"+d.data.Current.Cover+"' style='width: 100%;'/>" +
					"</div>" +
					"</div>" +
					"</div>" +
					"<div class='w3-col l9 m8 s12'>" +
					"<div class='l-width-xl' style='margin: auto;'>" +
					"<div style=''><div class='line'>" +
					"<h2 style='font-family: quicksandregular; color: silver; margin-top: 40px;'>" +
					"Name: <span style='color: dimgray;'>"+
						d.data.Current.Name+"</span>" +
					"</h2>" +
					"<h6 style='font-family: quicksandregular; color: silver;'>Version: <span style='color: dimgray;'>"+
					d.data.Current.Version+"</span></h6>" +
					"<h6 style='font-family: quicksandregular; color: silver;'>Build: <span style='color: dimgray;'>"+
					d.data.Current.BuildNumber+"</span></h6>" +
					"<h6 style='font-family: quicksandregular; color: silver;'><small>Designer(s): <span style='color: dimgray;'>"+
					d.data.Current.Designer+"</span></small></h6>" +
					"<h6 style='font-family: quicksandregular; color: silver;'><small>Developer(s): <span style='color: dimgray;'>"+
					d.data.Current.Developer+"</span></small></h6>" +
					"</div></div>" +
					"</div>" +
					"</div>" +
					"</div>" +

					"</div>" +

					"<div>" +
					"<hr/>" +
					"<h3 class='ui sleak header' style='color: dimgray;'>" +
					"<i class='shopping blue bag icon'></i> Theme Store" +
					"</h3>" +

					"<div id='theme-store-con'></div>" +

					"</div>");


				let con = "<div class='w3-row'>";
				let count = 0;

				for(let i = 0; i < d.data.List.length; i++)
				{
					if(d.data.List[i].User === "client")
					{
						con += "<div class='w3-col l3 m4 s12 pad-1'>" +
							"<div class='w3-card lift-1' style='position: relative; cursor: pointer;' " +
							"onmouseenter=\"themeMouseEnter('"+d.data.List[i].Name+"','"+d.data.List[i].Version+"')\" " +
							"onmouseleave=\"themeMouseLeave('"+d.data.List[i].Name+"','"+d.data.List[i].Version+"')\" " +
							"onclick=\"themeClick('"+escape(JSON.stringify(d.data.List[i]))+"')\">" +
							"<div style='max-height: 300px; overflow-y: hidden;'>" +
							"<img src='"+host+"cdn/images/theme/"+d.data.List[i].Cover+"' style='width: 100%;'/>" +
							"</div>" +
							"<div id='cover-"+d.data.List[i].Name+"-"+d.data.List[i].Version+"' " +
							"class='pad-1' style='position: absolute; width: 100%; height: 100%; top: 0px;" +
							" background-color: rgba(100,100,100,0.8); color: white; display: none;'>" +
							"<h2 class='sleak' style='position: absolute; top: 50%; margin-left: 20px; width: 100%;'>"+
							d.data.List[i].Name+"</h2>" +
							"<h5 style='position: absolute; top: 50%; width: 100%; margin-left: 20px;'>"+
							d.data.List[i].Version+"</h5>" +
							"</div>" +
							"</div>" +
							"</div>";
						count++;

						if(count > 3)
						{
							con += "</div>";
							getElement("theme-store-con").appendChild(div({add:con}));
							con = "<div class='w3-row'>";
							count = 0;
						}
					}
				}
				con += "</div>";
				getElement("theme-store-con").appendChild(div({add:con}));
			}
			else
			{
				$("#theme-con").html("<div class='pad-3 align-c'><h4>Connection error. Try again</h4></div>");
			}
		}
		else
		{
			$("#theme-con").html("<div class='pad-3 align-c'><h4>Connection error. Try again</h4></div>");
		}
	},{job:"get theme"})
  }

  function themeMouseEnter(name, version)
{
	getElement("cover-"+name+"-"+version).style.display = "block";
}

function themeMouseLeave(name, version)
{
	getElement("cover-"+name+"-"+version).style.display = "none";
}

function themeClick(e)
{
	let t = JSON.parse(unescape(e));

	loadModal({title:t.Name+" theme", size:"m",
		html:"<div class='pad-1'>" +
			"<div class='w3-row'>" +
			"<div class='w3-col l4 m4 s12' style='max-height: 400px; overflow-y: hidden;'>" +
			"<img class='lift-1' src='"+host+"cdn/images/theme/"+t.Cover+"' style='width: 100%;'/>" +
			"</div>" +
			"<div class='w3-col l8 m8 s12 pad-2'>" +
			"<h3 class='sleak'>Name: "+t.Name+"</h3>" +
			"<h5 class='sleak'>Version: "+t.Version+"</h5>" +
			"<h5 class='sleak'>Build: "+t.BuildNumber+"</h5>" +
			"<h5 class='sleak'>Designer: "+t.Designer+"</h5>" +
			"<h5 class='sleak'>Developer: "+t.Developer+"</h5>" +
			"<button id='use-theme-btn' class='ui sleak blue button' onclick=\"useTheme('"+t.Name+"')\">Use theme</button> " +
			"</div>" +
			"</div>" +
			"</div>"});
}

function useTheme(e)
{
	loadingButton({btn:"use-theme-btn"});
	postJson("hms-admin/worker", function(data, status){
		loadingButton({btn:"use-theme-btn", loading:false});
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#use-theme-btn").html("<i class='check icon'></i> Theme set successfully");
				$("#use-theme-btn").addClass("success");
				setTimeout(function(){
					location.reload();
				},2000);
			}
			else
			{
				errorButton({btn:"use-theme-btn", msg:"Connection error"});
			}
		}
		else
		{
			errorButton({btn:"use-theme-btn", msg:"Connection error"});
		}
	},{job:"set client theme", theme:e});
}

  function loadAdminTheme()
  {
	  $("#theme-con").addClass("loading");
	  postJson("hms-admin/worker", function(data, status){
		  $("#theme-con").removeClass("loading");
		  if(status === "done")
		  {
			  let d = JSON.parse(data);

			  if(d.status === "success")
			  {
				  $("#theme-con").html("<div class='l-pad-2 s-pad-1'>" +

					  "<div class='w3-row'>" +
					  "<div class='w3-col l3 m4 s12'>" +
					  "<div class='l-width-9' style='margin: auto;'>" +
					  "<div class='' style='min-height: 250px;'>" +
					  "<img class='lift-1' src='"+host+"cdn/images/theme/"+d.data.Current.Cover+"' style='width: 100%;'/>" +
					  "</div>" +
					  "</div>" +
					  "</div>" +
					  "<div class='w3-col l9 m8 s12'>" +
					  "<div class='l-width-xl' style='margin: auto;'>" +
					  "<div style=''><div class='line'>" +
					  "<h2 style='font-family: quicksandregular; color: silver; margin-top: 40px;'>" +
					  "Name: <span style='color: dimgray;'>"+
					  d.data.Current.Name+"</span>" +
					  "</h2>" +
					  "<h6 style='font-family: quicksandregular; color: silver;'>Version: <span style='color: dimgray;'>"+
					  d.data.Current.Version+"</span></h6>" +
					  "<h6 style='font-family: quicksandregular; color: silver;'>Build: <span style='color: dimgray;'>"+
					  d.data.Current.BuildNumber+"</span></h6>" +
					  "<h6 style='font-family: quicksandregular; color: silver;'><small>Designer(s): <span style='color: dimgray;'>"+
					  d.data.Current.Designer+"</span></small></h6>" +
					  "<h6 style='font-family: quicksandregular; color: silver;'><small>Developer(s): <span style='color: dimgray;'>"+
					  d.data.Current.Developer+"</span></small></h6>" +
					  "</div></div>" +
					  "</div>" +
					  "</div>" +
					  "</div>" +

					  "</div>" +


					  "<div>" +
					  "<hr/>" +
					  "<h3 class='ui sleak header' style='color: dimgray;'>" +
					  "<i class='shopping blue bag icon'></i> Theme Store" +
					  "</h3>" +

					  "<div id='theme-store-con'></div>" +

					  "</div>");


				  let con = "<div class='w3-row'>";
				  let count = 0;

				  for(let i = 0; i < d.data.List.length; i++)
				  {
					  if(d.data.List[i].User === "admin")
					  {
						  con += "<div class='w3-col l3 m4 s12 pad-1'>" +
							  "<div class='w3-card lift-1' style='position: relative; cursor: pointer;' " +
							  "onmouseenter=\"themeMouseEnter('"+d.data.List[i].Name+"','"+d.data.List[i].Version+"')\" " +
							  "onmouseleave=\"themeMouseLeave('"+d.data.List[i].Name+"','"+d.data.List[i].Version+"')\" " +
							  "onclick=\"adminThemeClick('"+escape(JSON.stringify(d.data.List[i]))+"')\">" +
							  "<div style='max-height: 300px; overflow-y: hidden;'>" +
							  "<img src='"+host+"cdn/images/theme/"+d.data.List[i].Cover+"' style='width: 100%;'/>" +
							  "</div>" +
							  "<div id='cover-"+d.data.List[i].Name+"-"+d.data.List[i].Version+"' " +
							  "class='pad-1' style='position: absolute; width: 100%; height: 100%; top: 0px;" +
							  " background-color: rgba(100,100,100,0.8); color: white; display: none;'>" +
							  "<h2 class='sleak' style='position: absolute; top: 50%; margin-left: 20px; width: 100%;'>"+
							  d.data.List[i].Name+"</h2>" +
							  "<h5 style='position: absolute; top: 50%; width: 100%; margin-left: 20px;'>"+
							  d.data.List[i].Version+"</h5>" +
							  "</div>" +
							  "</div>" +
							  "</div>";
						  count++;

						  if(count > 3)
						  {
							  con += "</div>";
							  getElement("theme-store-con").appendChild(div({add:con}));
							  con = "<div class='w3-row'>";
							  count = 0;
						  }
					  }
				  }
				  con += "</div>";
				  getElement("theme-store-con").appendChild(div({add:con}));
			  }
			  else
			  {
				  $("#theme-con").html("<div class='pad-3 align-c'><h4>Connection error. Try again</h4></div>");
			  }
		  }
		  else
		  {
			  $("#theme-con").html("<div class='pad-3 align-c'><h4>Connection error. Try again</h4></div>");
		  }
	  },{job:"get admin theme"})
  }


function adminThemeClick(e)
{
	let t = JSON.parse(unescape(e));

	loadModal({title:t.Name+" theme", size:"m",
		html:"<div class='pad-1'>" +
			"<div class='w3-row'>" +
			"<div class='w3-col l4 m4 s12' style='max-height: 400px; overflow-y: hidden;'>" +
			"<img class='lift-1' src='"+host+"cdn/images/theme/"+t.Cover+"' style='width: 100%;'/>" +
			"</div>" +
			"<div class='w3-col l8 m8 s12 pad-2'>" +
			"<h3 class='sleak'>Name: "+t.Name+"</h3>" +
			"<h5 class='sleak'>Version: "+t.Version+"</h5>" +
			"<h5 class='sleak'>Build: "+t.BuildNumber+"</h5>" +
			"<h5 class='sleak'>Designer: "+t.Designer+"</h5>" +
			"<h5 class='sleak'>Developer: "+t.Developer+"</h5>" +
			"<button id='use-theme-btn' class='ui sleak blue button' onclick=\"useAdminTheme('"+t.Name+"')\">Use theme</button> " +
			"</div>" +
			"</div>" +
			"</div>"});
}


function useAdminTheme(e)
{
	loadingButton({btn:"use-theme-btn"});
	postJson("hms-admin/worker", function(data, status){
		loadingButton({btn:"use-theme-btn", loading:false});
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#use-theme-btn").html("<i class='check icon'></i> Theme set successfully");
				$("#use-theme-btn").addClass("success");
				setTimeout(function(){
					location.reload();
				},2000);
			}
			else
			{
				errorButton({btn:"use-theme-btn", msg:"Connection error"});
			}
		}
		else
		{
			errorButton({btn:"use-theme-btn", msg:"Connection error"});
		}
	},{job:"set admin theme", theme:e});
}


//------------------------- admin security logic ----------------------------------------------//

function saveUserPassword()
{
	let request = {
		password:$("#admin-user-password").val(),
		job:"save admin password"
	};

	if(request.password === "")
	{
		errorButton({btn:"save-admin-pass-btn", msg:"Password is empty"});
	}
	else if(request.password !== $("#admin-user-password-conf").val())
	{
		errorButton({btn:"save-admin-pass-btn", msg:"Passwords don't match"});
	}
	else
	{
		loadingButton({btn:"save-admin-pass-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"save-admin-pass-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#admin-user-password").val("");
					$("#admin-user-password-conf").val("");

					$("#save-admin-pass-btn").addClass("positive");
					$("#save-admin-pass-btn").html("<i class='check icon'></i> Password saved");
					setTimeout(function(){
						$("#save-admin-pass-btn").removeClass("positive");
						$("#save-admin-pass-btn").html("Save Password");
					},3000);
				}
				else
				{
					errorButton({btn:"save-admin-pass-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"save-admin-pass-btn", msg:"Connection error"});
			}
		},request);
	}
}

function saveAdminUsername()
{
	let request = {
		username:$("#username").val(),
		job:"save admin username"
	};

	if(request.username === "")
	{
		errorButton({btn:"save-admin-user-btn", msg:"Username is empty"});
	}
	else
	{
		loadingButton({btn:"save-admin-user-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"save-admin-user-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#username").val("");

					$("#save-admin-user-btn").addClass("positive");
					$("#save-admin-user-btn").html("<i class='check icon'></i> Username saved");
					setTimeout(function(){
						$("#save-admin-user-btn").removeClass("positive");
						$("#save-admin-user-btn").html("Save Username");
					},3000);
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				errorButton({btn:"save-admin-user-btn", msg:"Connection error"});
			}
		},request);
	}
}



//----------------------------  module logic ----------------------------------------//4

function saveModuleSettings(e)
{
	let store = e.checked;

	let request = {
		aboutus:getElement("aboutus").checked,
		bakery:getElement("bakery").checked,
		bar:getElement("bar").checked,
		booking:getElement("booking").checked,
		contactus:getElement("contactus").checked,
		customer:getElement("customers").checked,
		discount:getElement("discount").checked,
		facilities:getElement("facility").checked,
		faq:getElement("faq").checked,
		gallery:getElement("gallery").checked,
		kitchen:getElement("kitchen").checked,
		laundry:getElement("laundry").checked,
		lodging:getElement("lodging").checked,
		newsletter:getElement("newsletter").checked,
		testimonials:getElement("testimonial").checked,
		terms:getElement("tc").checked,
		team:getElement("team").checked,
		policy:getElement("pp").checked,
		pagetext:getElement("pagetext").checked,
		services:getElement("services").checked,
		job:"save module settings"
	};

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !store;
				ShowModal(d.message);
			}
		}
		else
		{
			e.checked = !store;
			ShowModal("Connection error. Unable to save module settings");
		}
	}, request);
}

function loadModules()
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				getElement("aboutus").checked = d.data.Aboutus;
				getElement("bakery").checked = d.data.Bakery;
				getElement("bar").checked = d.data.Bar;
				getElement("booking").checked = d.data.Booking;
				getElement("contactus").checked = d.data.Contactus;
				getElement("customers").checked = d.data.Customers;
				getElement("discount").checked = d.data.Discount;
				getElement("facility").checked = d.data.Facilities;
				getElement("faq").checked = d.data.Faq;
				getElement("gallery").checked = d.data.Gallery;
				getElement("kitchen").checked = d.data.Kitchen;
				getElement("laundry").checked = d.data.Laundry;
				getElement("lodging").checked = d.data.Lodging;
				getElement("newsletter").checked = d.data.Newsletter;
				getElement("testimonial").checked = d.data.Testimonials;
				getElement("tc").checked = d.data.Terms;
				getElement("team").checked = d.data.Team;
				getElement("pp").checked = d.data.Policy;
				getElement("pagetext").checked = d.data.Pagetext;
				getElement("services").checked = d.data.Services;
			}
			else
			{
				_page({ add: pageTop({ icon: "sitemap", text: "Modules" }), clear: true });
				_page({add:"<div class='pad-3 widget lift-1'>" +
						"<div class='align-c'>" +
						"<h6 class='sleak'>" +
						"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
						d.message +
						"</h6> " +
						"<button class='ui sleak blue button' onclick='DrawModules()'>Try again</button>" +
						"</div>" +
						"</div>", class:"l-pad-3 s-pad-1"});
			}
		}
		else
		{
			_page({ add: pageTop({ icon: "sitemap", text: "Modules" }), clear: true });
			_page({add:"<div class='pad-3 widget lift-1'>" +
					"<div class='align-c'>" +
					"<h6 class='sleak'>" +
					"<i class='ban icon' style='font-size: 3em; color: rgba(255,0,0,0.1)'></i><br/><br/>" +
					"Connection error. Check your connection and try again" +
					"</h6> " +
					"<button class='ui sleak blue button' onclick='DrawModules()'>Try again</button>" +
					"</div>" +
					"</div>", class:"l-pad-3 s-pad-1"});
		}
	},{job:"get module settings"});
}



//---------------------- General settings logic -------------------------------------//

function uploadLogo(e)
{
	loadingButton({btn:"logo-upload-btn"});

	let upload = new WixUpload({file:e.files[0], url:phpvars.STORAGE_API + "upload/files"});
	upload.Upload(function(data, status){
		loadingButton({btn:"logo-upload-btn", loading:false});
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				getElement("logo-img").src = URL.createObjectURL(e.files[0]);
				saveLogo(d.data);
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to upload the seleced logo");
		}
	});
}

function saveLogo(e)
{
	$("#logo-save-status").html("<div class='ui mini inline active loader'></div> Saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#logo-save-status").html("<span class='green-txt'><i class='check icon'></i> Saved</span>");
				setTimeout(function(){
					$("#logo-save-status").html("Saved");
				},3000);
			}
			else
			{
				getElement("logo-img").src = "";
				ShowModal(d.message);
				$("#logo-save-status").html("<span class='red-txt'><i class='times icon'></i> Failed</span>");
			}
		}
		else
		{
			getElement("logo-img").src = "";
			ShowModal("Connection error. Unabl to save logo");
			$("#logo-save-status").html("<span class='red-txt'><i class='times icon'></i> Failed</span>");
		}
	},{job:"save logo", logo:e});
}

function  saveWebfrontSettings()
{
	if(loadingSettings == false)
	{
		let request = {
			primarycolor:$("#primary-color").val(),
			secondarycolor:$("#secondary-color").val(),
			primaryfont:$("#primary-font").dropdown("get value"),
			secondaryfont:$("#secondary-font").dropdown("get value"),
			boldfont:$("#bold-font").dropdown("get value"),
			sleakfont:$("#sleak-font").dropdown("get value"),
			job:"save webfront settings"
		};

		$("#webfront-save-label").html("<div class='ui mini inline active loader'></div> saving...");
		postJson("hms-admin/worker", function(data, status){
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#webfront-save-label").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
					setTimeout(function(){
						$("#webfront-save-label").html("Saved");
					},3000);
				}
				else
				{
					$("#webfront-save-label").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span> " +
					"<span style='color: blue; cursor: pointer;' onclick='saveWebfrontSettings()'>try again</span>");
				}
			}
			else
			{
				$("#webfront-save-label").html("<span style='color: forestgreen;'><i class='times icon'></i> Failed. Connection error " +
					"<span style='color: blue; cursor: pointer;' onclick='saveWebfrontSettings()'>try again</span></span>");
			}
		},request);
	}
}

function  saveWebfrontInfo()
{
	if(loadingSettings == false)
	{
		let request = {
			hotelname:$("#hotel-name").val(),
			phone1:$("#hotel-phone1").val(),
			phone2:$("#hotel-phone2").val(),
			email1:$("#hotel-email1").val(),
			email2:$("#hotel-email2").val(),
			country:$("#hotel-country").dropdown("get value"),
			state:$("#hotel-state").val(),
			city:$("#hotel-city").val(),
			address:$("#hotel-adddress").val(),
			job:"save webfront info"
		};

		$("#webfront-info-save-label").html("<div class='ui mini inline active loader'></div> saving...");
		postJson("hms-admin/worker", function(data, status){
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#webfront-info-save-label").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
					setTimeout(function(){
						$("#webfront-save-label").html("Saved");
					},3000);
				}
				else
				{
					$("#webfront-info-save-label").html("<span style='color: red;'><i class='times icon'></i> Failed " +
					"<span style='color: blue; cursor: pointer;' onclick='saveWebfrontInfo()'>try again</span></span>");
				}
			}
			else
			{
				$("#webfront-info-save-label").html("<span style='color: red;'><i class='times icon'></i> Failed. Connection error " +
					"<span style='color: blue; cursor: pointer;' onclick='saveWebfrontInfo()'>try again</span></span>");
			}
		},request);
	}
}

function saveCustomersSettings()
{
	let request = {
		collectaddress:getElement("customersaddress").checked,
		allowselfmgt:getElement("customersselfngt").checked,
		job:"save customers settings"
	};

	$("#customer-settings-save-label").html("<div class='ui mini inline active loader'></div> saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#customer-settings-save-label").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function(){
					$("#customer-settings-save-label").html("Saved");
				},3000);
			}
			else
			{
				$("#customer-settings-save-label").html("<span style='color: red;'><i class='times icon'></i> " + d.message +
					"<span style='color: blue; cursor: pointer;' onclick='saveCuestomersSettings()'>try again</span></span>");
			}
		}
		else
		{
			$("#customer-settings-save-label").html("<span style='color: red;'><i class='times icon'></i> Failed. Connection error " +
				"<span style='color: blue; cursor: pointer;' onclick='saveCuestomersSettings()'>try again</span></span>");
		}
	},request);
}

function saveLogoNameSettings()
{
	let request = {
		showlogo:getElement("showlogo").checked,
		showname:getElement("showtextname").checked,
		job:"save logoname settings"
	};

	$("#logoname-save-label").html("<div class='ui mini inline active loader'></div> saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#logoname-save-label").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function(){
					$("#logoname-save-label").html("Saved");
				},3000);
			}
			else
			{
				$("#logoname-save-label").html("<span style='color: red;'><i class='times icon'></i> " + d.message +
					"<span style='color: blue; cursor: pointer;' onclick='saveLogoNameSettings()'>try again</span></span>");
			}
		}
		else
		{
			$("#logoname-save-label").html("<span style='color: red;'><i class='times icon'></i> Failed. Connection error " +
				"<span style='color: blue; cursor: pointer;' onclick='saveLogoNameSettings()'>try again</span></span>");
		}
	},request);
}

function saveGuestFormSettings()
{
	let form = "SIMPLE";
	if(getElement("intermediary-check").checked)
	{
		form = "INTERMEDIARY";
	}
	else if(getElement("detailed-check").checked)
	{
		form = "DETAILED";
	}

	let request = {
		collectaddress:form,
		job:"save guestform settings"
	};

	$("#guestform-save-label").html("<div class='ui mini inline active loader'></div> saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#guestform-save-label").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function(){
					$("#guestform-save-label").html("Saved");
				},3000);
			}
			else
			{
				$("#guestform-save-label").html("<span style='color: red;'><i class='times icon'></i> " + d.message +
					"<span style='color: blue; cursor: pointer;' onclick='saveGuestFormSettings()'> try again</span></span>");
			}
		}
		else
		{
			$("#guestform-save-label").html("<span style='color: red;'><i class='times icon'></i> Failed. Connection error " +
				"<span style='color: blue; cursor: pointer;' onclick='saveGuestFormSettings()'>try again</span></span>");
		}
	},request);
}





//------------------------------------ Iintegration Logic -------------------------------//

function saveSocialIntegration()
{
	let request = {
		facebook:$("#facebook-integration").val(),
		twitter:$("#twitter-integration").val(),
		google:$("#google-integration").val(),
		linkedin:$("#linkedin-integration").val(),
		whatsapp:$("#whatsapp-integration").val(),
		telegram:$("#telegram-integration").val(),
		instagram:$("#instagram-integration").val(),
		job:"save social integration"
	};

	$("#social-integration-status").html("<div class='ui mini inline active loader'></div> Saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#social-integration-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function () {
					$("#social-integration-status").html("Saved");
				}, 3000);
			}
			else
			{
				$("#social-integration-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
					"<span style='color: blue;' onclick='saveSocialIntegration()'>try again</span> </span>");
			}
		}
		else
		{
			$("#social-integration-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
				"Connection error <span style='color: blue;' onclick='saveSocialIntegration()'>try again</span> </span>");
		}
	},request);
}

function saveLivechatIntegration()
{
	let request = {
		livechat:$("#live-chat-integration").val(),
		job:"save livechat integration"
	};

	$("#livechat-integration-status").html("<div class='ui mini inline active loader'></div> Saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#livechat-integration-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function () {
					$("#livechat-integration-status").html("Saved");
				}, 3000);
			}
			else
			{
				$("#livechat-integration-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
					"<span style='color: blue;' onclick='saveLivechatIntegration()'>try again</span> </span>");
			}
		}
		else
		{
			$("#livechat-integration-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
				"Connection error <span style='color: blue;' onclick='saveLivechatIntegration()'>try again</span> </span>");
		}
	},request);
}

function saveAnalyticsIntegration()
{
	let request = {
		analytics:$("#google-analytics-integration").val(),
		job:"save analytics integration"
	};

	$("#analytics-integration-status").html("<div class='ui mini inline active loader'></div> Saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#analytics-integration-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function () {
					$("#analytics-integration-status").html("Saved");
				}, 3000);
			}
			else
			{
				$("#analytics-integration-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
					"<span style='color: blue;' onclick='saveAnalyticsIntegration()'>try again</span> </span>");
			}
		}
		else
		{
			$("#analytics-integration-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
				"Connection error <span style='color: blue;' onclick='saveAnalyticsIntegration()'>try again</span> </span>");
		}
	},request);
}

function saveGoogleTagIntegration()
{
	let request = {
		googletag:$("#google-tag-integration").val(),
		job:"save googletag integration"
	};

	$("#googletag-integration-status").html("<div class='ui mini inline active loader'></div> Saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#googletag-integration-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function () {
					$("#googletag-integration-status").html("Saved");
				}, 3000);
			}
			else
			{
				$("#googletag-integration-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
					"<span style='color: blue;' onclick='saveGoogleTagIntegration()'>try again</span> </span>");
			}
		}
		else
		{
			$("#googletag-integration-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
				"Connection error <span style='color: blue;' onclick='saveGoogleTagIntegration()'>try again</span> </span>");
		}
	},request);
}

function saveTranslatorIntegration()
{
	let request = {
		translator:$("#translator-integration").val(),
		job:"save translator integration"
	};

	$("#translator-integration-status").html("<div class='ui mini inline active loader'></div> Saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#translator-integration-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function () {
					$("#translator-integration-status").html("Saved");
				}, 3000);
			}
			else
			{
				$("#translator-integration-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
					"<span style='color: blue;' onclick='saveTranslatorIntegration()'>try again</span> </span>");
			}
		}
		else
		{
			$("#translator-integration-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
				"Connection error <span style='color: blue;' onclick='saveTranslatorIntegration()'>try again</span> </span>");
		}
	},request);
}

function saveMapIntegration()
{
	let request = {
		longitude:$("#longitude-integration").val(),
		latitude:$("#latitude-integration").val(),
		apikey:$("#apikey-integration").val(),
		job:"save map integration"
	};

	$("#map-integration-status").html("<div class='ui mini inline active loader'></div> Saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#map-integration-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function () {
					$("#map-integration-status").html("Saved");
				}, 3000);
			}
			else
			{
				$("#map-integration-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
					"<span style='color: blue;' onclick='saveMapIntegration()'>try again</span> </span>");
			}
		}
		else
		{
			$("#map-integration-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
				"Connection error <span style='color: blue;' onclick='saveMapIntegration()'>try again</span> </span>");
		}
	},request);
}




//---------------------------  Currency & Payment method -------------------------------------//

function saveCurrency()
{
	if(!populatingCurrency)
	{
		let request = {
			currency: $("#current-currency").dropdown('get value'),
			job: "save currency"
		};

		$("#currency-save-status").html("<div class='ui mini inline active loader'></div> Saving...");
		postJson("hms-admin/worker", function (data, status) {
			if (status === "done") {
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					$("#currency-name-con").html(d.data.Name);
					$("#currency-code-con").html(d.data.Code);
					$("#symbol-con").html(d.data.Symbol);
					$("#country-con").html(d.data.Country);

					$("#currency-save-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
					setTimeout(function () {
						$("#currency-save-status").html("Saved");
					}, 3000);
				}
				else
				{
					$("#currency-save-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
						"<span style='color: blue;' onclick='saveCurrency()'>try again</span> </span>");
				}
			}
			else
			{
				$("#currency-save-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
					"Connection error <span style='color: blue;' onclick='saveCurrency()'>try again</span> </span>");
			}
		}, request);
	}
}

function savePaypal()
{
	if(!populatingCurrency)
	{
		let request = {
			paypalid: $("#paypal-id").val(),
			username: $("#paypal-username").val(),
			password: $("#paypal-password").val(),
			job: "save paypal integration"
		};

		$("#paypal-save-status").html("<div class='ui mini inline active loader'></div> Saving...");
		postJson("hms-admin/worker", function (data, status) {
			if (status === "done") {
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					$("#paypal-save-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
					setTimeout(function () {
						$("#paypal-save-status").html("Saved");
					}, 3000);
				}
				else
				{
					$("#paypal-save-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
						"<span style='color: blue;' onclick='savePaypal()'>try again</span> </span>");
				}
			}
			else
			{
				$("#paypal-save-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
					"Connection error <span style='color: blue;' onclick='savePaypal()'>try again</span> </span>");
			}
		}, request);
	}
}

function saveInterswitch()
{
	if(!populatingCurrency)
	{
		let request = {
			marchantid: $("#marchant-id").val(),
			job: "save interswitch integration"
		};

		$("#interswitch-save-status").html("<div class='ui mini inline active loader'></div> Saving...");
		postJson("hms-admin/worker", function (data, status) {
			if (status === "done") {
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					$("#interswitch-save-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
					setTimeout(function () {
						$("#interswitch-save-status").html("Saved");
					}, 3000);
				}
				else
				{
					$("#interswitch-save-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
						"<span style='color: blue; cursor: pointer;' onclick='saveInterswitch()'> try again</span> </span>");
				}
			}
			else
			{
				$("#interswitch-save-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
					"Connection error <span style='color: blue; cursor: pointer;' onclick='saveInterswitch()'>try again</span> </span>");
			}
		}, request);
	}
}

function savePaystack()
{
	if(!populatingCurrency)
	{
		let request = {
			privatekey: $("#paystack-private-key").val(),
			publickey: $("#paystack-public-key").val(),
			job: "save paystack integration"
		};

		$("#paystack-save-status").html("<div class='ui mini inline active loader'></div> Saving...");
		postJson("hms-admin/worker", function (data, status) {
			if (status === "done") {
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					$("#paystack-save-status").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
					setTimeout(function () {
						$("#paystack-save-status").html("Saved");
					}, 3000);
				}
				else
				{
					$("#paystack-save-status").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
						"<span style='color: blue; cursor: pointer;' onclick='savePaystack()'>try again</span> </span>");
				}
			}
			else
			{
				$("#paystack-save-status").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
					"Connection error <span style='color: blue; cursor: pointer;' onclick='savePaystack()'> try again</span> </span>");
			}
		}, request);
	}
}

function saveWebpaystatus()
{
	$("#webpay-save-label").html("<div class='ui mini inline active loader'></div> Saving...");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#webpay-save-label").html("<span style='color: forestgreen;'><i class='check icon'></i> Saved</span>");
				setTimeout(function () {
					$("#webpay-save-label").html("Saved");
				}, 3000);
			}
			else
			{
				$("#webpay-save-label").html("<span style='color: red;'><i class='check icon'></i> " + d.message +
					"<span style='color: blue; cursor: pointer;' onclick='saveWebpaystatus()'>try again</span> </span>");
			}
		}
		else
		{
			$("#webpay-save-label").html("<span style='color: red;'><i class='check icon'></i> Failed. " +
				"Connection error <span style='color: blue; cursor: pointer;' onclick='saveWebpaystatus()'> try again</span> </span>")
		}
	},{job:"save webpay status", webpay:getElement("webpay-status").checked, nopayreservation:getElement("no-pay-reservation").checked})
}


//----------------------- Extra services logic -----------------------------------------------

function saveExtraService()
{
	let request = {
		id:$("#extra-service-id").val(),
		name:$("#service-name").val(),
		price:Number($("#service-price").val()),
		job:"save extra service"
	};


	if(request.name === "")
	{
		errorButton({btn: "extraservice-save-btn", msg: "<i class='times icon'></i> Invalid name"});
	}
	else if(request.price < 1)
	{
		errorButton({btn: "extraservice-save-btn", msg: "<i class='times icon'></i> Invaid price"});
	}
	else
	{
		loadingButton({btn: "extraservice-save-btn"});
		postJson("hms-admin/worker", function (data, status)
		{
			loadingButton({btn: "extraservice-save-btn", loading: false});
			if (status === "done")
			{
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					$("#service-name").val("");
					$("#service-price").val("");

					populateExtraservice();

					$("#extraservice-save-btn").addClass("positive");
					$("#extraservice-save-btn").html("<i class='check icon'></i> Service saved");
					setTimeout(function(){
						$("#extraservice-save-btn").removeClass("positive");
						$("#extraservice-save-btn").html("Save");
					},3000);
				}
				else
				{
					errorButton({btn: "extraservice-save-btn", msg: d.message});
				}
			}
			else
			{
				errorButton({btn: "extraservice-save-btn", msg: "<i class='times icon'></i> Connection error"});
			}
		}, request);
	}
}


function ConfirmGroupExtraserviceDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Extraservices?", function(choice){
		if(choice === true)
		{
			ExtraserviceGroupDelete();
		}
	});
}

function ConfirmExtraserviceDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Extraservices?", function(choice, param){
		if(choice === true)
		{
			ExtraserviceListDelete(param);
		}
	}, null, null, e);
}

function ExtraserviceGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here

			$("#"+lst[i].id+"-delete-icon").addClass("loading spinner");
			$("#"+lst[i].id+"-delete-icon").removeClass("trash");
			DeleteExtraservice(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-delete-icon").removeClass("loading spinner");
				$("#"+lst[i].id+"-delete-icon").addClass("trash");
				if(status === "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Extra services failed to delete");
		}
	}
	else
	{
		ShowModal("No Extra services were selected");
	}
}

function ExtraserviceListDelete(e)
{
	//Loading animation here
	$("#"+e+"-delete-icon").addClass("loading spinner");
	$("#"+e+"-delete-icon").removeClass("trash");
	DeleteExtraservice(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-delete-icon").removeClass("loading loader");
		$("#"+e+"-delete-icon").addClass("trash");
		if(status === "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteExtraservice(e, func)
{
	let request = {};
	request.Extraserviceid = e;
	request.job = "delete extra service";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

let serviceeditopen = false;
function editExtraservices(id, name, price)
{
	serviceeditopen = true;
	showServiceEdit(function(){
		$("#extra-service-id").val(id);
		$("#service-name").val(name);
		$("#service-price").val(price);
	});
}


function showServiceEdit(func)
{
	let modal = document.createElement("div");
	modal.style.position = "fixed";
	modal.style.backgroundColor = "rgba(0,0,0,0.6)";
	modal.style.top = "0px";
	modal.style.width = "100%";
	modal.style.height = "100%";
	modal.style.zIndex = 200;
	modal.id = "service-modal";
	modal.style.overflowY = "auto";
	modal.className = "w3-row";
	modal.style.display = "none";


	document.body.appendChild(modal);

	$("#service-modal").fadeIn(500, function(){
		getElement("service-edit-con").style.zIndex = 230;
		getElement("service-edit-con").style.position = "relative";
		$("#service-edit-con").transition('pulse', function(){
			$("#edit-close-btn").transition("fade up in");

			$("#extraservice-save-btn").html("Save");

			if(typeof func == "function")
			{
				func();
			}
		});
	});
}

function closeServiceEdit()
{
	$("#edit-close-btn").transition("fade up out", function(){
		$("#service-edit-con").transition('pulse', function(){
			getElement("service-edit-con").style.zIndex = 1;
			getElement("service-edit-con").style.position = "static";
			$("#service-modal").fadeOut(500);
			serviceeditopen = false;

			$("#extraservice-save-btn").html("Save");

			$("#extra-service-id").val("");
			$("#service-name").val("");
			$("#service-price").val("");
		});
	});
}



//--------------------------------  Home page analytics -------------------------------//

function loadHomeData()
{
	Morris.Area({
		element: 'revenue-graph',
		data: [
			{x: '2010 Q4', y: 3, z: 7},
			{x: '2011 Q1', y: 3, z: 4},
			{x: '2011 Q2', y: null, z: 1},
			{x: '2011 Q3', y: 2, z: 5},
			{x: '2011 Q4', y: 8, z: 2},
			{x: '2012 Q1', y: 4, z: 4}
		],
		xkey: 'x',
		ykeys: ['y', 'z'],
		labels: ['Y', 'Z']
	}).on('click', function(i, row){
		console.log(i, row);
	});


	Morris.Donut({
		element: 'donut-1',
		data: [
			{value: 70, label: 'foo', formatted: 'at least 70%' },
			{value: 15, label: 'bar', formatted: 'approx. 15%' },
			{value: 10, label: 'baz', formatted: 'approx. 10%' },
			{value: 5, label: 'A really really long label', formatted: 'at most 5%' }
		],
		formatter: function (x, data) { return data.formatted; }
	});

	Morris.Donut({
		element: 'donut-2',
		data: [
			{value: 70, label: 'foo', formatted: 'at least 70%' },
			{value: 15, label: 'bar', formatted: 'approx. 15%' },
			{value: 10, label: 'baz', formatted: 'approx. 10%' },
			{value: 5, label: 'A really really long label', formatted: 'at most 5%' }
		],
		formatter: function (x, data) { return data.formatted; }
	});


	Morris.Donut({
		element: 'donut-3',
		data: [
			{value: 70, label: 'foo', formatted: 'at least 70%' },
			{value: 15, label: 'bar', formatted: 'approx. 15%' },
			{value: 10, label: 'baz', formatted: 'approx. 10%' },
			{value: 5, label: 'A really really long label', formatted: 'at most 5%' }
		],
		formatter: function (x, data) { return data.formatted; }
	});

	Morris.Donut({
		element: 'donut-4',
		data: [
			{value: 70, label: 'foo', formatted: 'at least 70%' },
			{value: 15, label: 'bar', formatted: 'approx. 15%' },
			{value: 10, label: 'baz', formatted: 'approx. 10%' },
			{value: 5, label: 'A really really long label', formatted: 'at most 5%' }
		],
		formatter: function (x, data) { return data.formatted; }
	});
}



//------------------------- Item Processing Logic -----------------------//

function processItemImage(e, num)
{
	cropImage({file:e.files[0], ratio:1.5/1}, function(blob, URL, n){

		getElement("item-img-"+n.toString()).src = URL.createObjectURL(blob);

		let img = new File([blob], "file.png");

		loadingButton({btn:"item-btn-"+n.toString()});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			loadingButton({btn:"item-btn-"+n.toString(),loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#item-file-name-"+n.toString()).val(d.data);
				}
				else
				{
					getElement("item-img-"+n.toString()).src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("item-img-"+n.toString()).src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	}, num);
}



//------------------------- Profile image processing logic --------------------------------//

//------------------------- Item Processing Logic -----------------------//

function processProfileImage(e, num)
{
	cropImage({file:e.files[0], ratio:1/1.1}, function(blob, URL, n){

		getElement("item-img-"+n.toString()).src = URL.createObjectURL(blob);

		let img = new File([blob], "file.png");

		loadingButton({btn:"item-btn-"+n.toString()});
		let upload = new WixUpload({file:img,url:phpvars.STORAGE_API + "upload/files"});
		upload.Upload(function(data, status){
			loadingButton({btn:"item-btn-"+n.toString(),loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#item-file-name-"+n.toString()).val(d.data);
				}
				else
				{
					getElement("item-img-"+n.toString()).src = "";
					ShowModal("Application error. Unable to upload file please try again");
				}
			}
			else
			{
				getElement("item-img-"+n.toString()).src = "";
				ShowModal("Connection error. Unable to upload file please try again");
			}
		});
	}, num);
}




//----------------------- Food Category Logic-----------------------------------------------//

let foodCat_modal = null;

function showfoodcategory()
{
	loadModal({title:"Food Categories", size:'l',html:"<div class='pad-1 align-r'>"+
			"<button id='new-cat-btn' class='ui sleak compact blue-back button'>Add Category</button>" +
			"</div>" + div({class:"pad-1", add:"<table class='ui basic table'>" +
					"<thead class='sleak'>" +
					"<th>SN</th>" +
					"<th>Name</th>" +
					"<th>Sort</th>" +
					"<th>Status</th>" +
					"<th>Action</th>" +
					"</thead>" +
					"<tbody id='food-cat-body'>" +

					"</tbody>" +
					"<tfoot>" +
					"<tr>" +
					"<th colspan='1'>" +
					"<h4 class='ui header'>" +
					"<div class='content'>" +
					"<div id='food-cat-perpage' class='ui inline dropdown'>" +
					"<div class='text sleak'> 25</div>" +
					"<i class='dropdown icon'></i>" +
					"<div class='menu'>" +
					"<div class='header'>Show per page</div>" +
					"<div class='active item' data-text='25'>25</div>" +
					"<div class='item' data-text='50'>50</div>" +
					"<div class='item' data-text='100'>100</div>" +
					"<div class='item' data-text='200'>200</div>" +
					"<div class='item' data-text='300'>300</div>" +
					"</div>" +
					"</div>" +
					"</div>" +
					"</h4>" +
					"" +
					"</th>" +
					"<th colspan='6'>" +
					"      <div id='food-cat-pages' class='ui right floated pagination tiny compact menu'>" +
					"      </div>" +
					"    </th>" +
					"</tr>" +
					"</tfoot>" +
					"</table>"}).outerHTML, onLoaded: function(o){

			$("#food-cat-perpage").dropdown();
			populateFoodcategory();

			foodCat_modal = o.modal;

			getElement("new-cat-btn").onclick = function(){
				closeGenModal(o.modal, function(){
					showNewfoodcategory();
				});
			};

		}});
}

function showNewfoodcategory(o)
{
	let name = "";
	let sort = 0;
	let status = "checked";
	let id = "";
	let title = "Create New Food Category";

	if(o != null)
	{
		if(o.id != null)
		{
			id = o.id;
			title = "Edit Food Category";
		}
		if(o.name != null)
		{
			name = o.name;
		}
		if(o.sort != null)
		{
			sort = o.sort;
		}
		if(o.status != null)
		{
			status = o.status ? "checked" : "";
		}
	}

	loadModal({title:title, size:'s',html:"<div class='pad-1 align-r'>"+
			"<button id='new-cat-btn' class='ui sleak compact blue-back button'>Category List</button>" +
			"</div>" + div({class:"pad-2", add:"<div>" +

					"<input id='food-cat-id' type='hidden' value='"+id+"'/>" +

					"<label>Category Name</label>" +
					"<div class='ui fluid input'><input id='food-cat-title' class='wix-textbox' type='text' value='"+name+"'/></div><br/>" +
					"<div class='ui fluid labeled input'><label class='ui sleak label'>Sort</label><input id='food-cat-sort' class='wix-textbox' type='number' value='"+sort+"'/></div><br/>" +
					"<div class='switch'><label><input id='food-cat-status' type='checkbox' "+status+"/><span class='lever'></span></label>Status</div><br/>" +
					"<div><button id='food-cat-save-btn' class='ui green-back sleak compact button' onclick='saveFoodCategory()'><i class='save icon'></i>Save</button></div>" +

					"</div>"}).outerHTML, onLoaded: function(o){

			$("#food-cat-perpage").dropdown();
			populateFoodcategory();

			getElement("new-cat-btn").onclick = function(){
				closeGenModal(o.modal, function(){
					showfoodcategory();
				});
			};

		}});
}

function saveFoodCategory()
{
	let request = {
		catid:$("#food-cat-id").val(),
		title:$("#food-cat-title").val(),
		sort:$("#food-cat-sort").val(),
		status:getElement("food-cat-status").checked,
		job:"save food category"
	};

	if(request.title === "")
	{
		errorButton({btn:"food-cat-save-btn",msg:"Name is empty"});
	}
	else
	{
		loadingButton({btn:"food-cat-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"food-cat-save-btn",loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#food-cat-id").val(""),
						$("#food-cat-title").val(""),
						$("#food-cat-sort").val(0);
					getElement("food-cat-status").checked = true;

					$("#food-cat-save-btn").html("<i class='check icon'></i>Saved");
					$("#food-cat-save-btn").addClass("positive");
					$("#food-cat-save-btn").addClass("disabled");

					setTimeout(function(){
						$("#food-cat-save-btn").html("<i class='save icon'></i>Save");
						$("#food-cat-save-btn").removeClass("positive");
						$("#food-cat-save-btn").removeClass("disabled");
					},2000);
				}
				else
				{
					errorButton({btn:"food-cat-save-btn",msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"food-cat-save-btn",msg:"Connection error"});
			}
		},request);
	}
}

function editFoodcategory(o)
{
	let res = JSON.parse(unescape(o));
	let r = {id:res.Id, name:res.Name, sort:res.Sort, status:res.Status};

	closeGenModal(foodCat_modal, function(){
		showNewfoodcategory(r);
	});
}

function SetFoodcategory_Status(e, id)
{
	let request = {};
	request.Foodcategoryid = id;
	request.Status = e.checked;
	request.job = "save food category status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !request.Status;
				ShowModal("Unable to save Foodcategory Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Foodcategory Status");
		}
	}, request);
}

function ConfirmFoodcategoryDelete(e)
{
	ConfirmModal("Are you sure you want to delete the Food category?", function(choice, param){
		if(choice === true)
		{
			FoodcategoryListDelete(param);
		}
	}, null, null, e);
}

function FoodcategoryListDelete(e)
{
	//Loading animation here
	$("#foodcat-del-btn-"+e).removeClass("trash");
	$("#foodcat-del-btn-"+e).addClass("spinner");
	$("#foodcat-del-btn-"+e).addClass("loading");
	DeleteFoodcategory(e, function(status, msg){
		//Stop Animation here
		$("#foodcat-del-btn-"+e).addClass("trash");
		$("#foodcat-del-btn-"+e).removeClass("spinner");
		$("#foodcat-del-btn-"+e).removeClass("loading");
		if(status == "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteFoodcategory(e, func)
{
	let request = {};
	request.Foodcategoryid = e;
	request.job = "delete food category";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}






//-------------------------  Food Logic --------------------------------//
function saveFood()
{
	let request = {
		foodid:$("#foodid").val(),
		status:$("#foodstatus").val(),
		name:$("#food-name").val(),
		description:$("#food-description").val(),
		price:Number($("#food-price").val()),
		compare:Number($("#food-price-compare").val()),
		showpromo:getElement("show-promo-text").checked,
		showonsite:getElement("show-on-site").checked,
		reservable:getElement("reservable").checked,
		inventory:getElement("track-inventory").checked,
		category:$("#food-category").dropdown('get value'),
		promotext:$("#food-promo-text").val(),
		sort:$("#food-sort").val(),
		tax:Number($("#tax-amount").val()),
		pos:getElement("pos-available").checked,
		barcode:$("#barcode").val(),
		cost:$("#cost").val(),
		images:[],


		// --------- Variables for inventory managment
		unit:"",
		pluralunit:"",
		lowstockpoint:0,
		openingstock:0,
		suppliers:[],


		job:"save food"
	};

	if((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled))
	{

		request.unit = $("#item-unit-singular").val();
		request.pluralunit = $("#item-unit-plural").val();
		request.lowstockpoint = Number($("#item-lowstockpoint").val());
		request.openingstock = getElement("item-openingstock") != null ? getElement("item-openingstock").value : 0;
		request.suppliers = $("#suppliers").dropdown('get value');
	}

	let i = 1;
	while(getElement("item-file-name-"+i) !== null)
	{
		if($("#item-file-name-"+i).val() !== "")
		{
			request.images.push($("#item-file-name-"+i).val());
		}
		i++;
	}

	if(request.images.length === 0)
	{
		ShowModal("Add at least one image of the food");
	}
	else if(request.name === "")
	{
		errorButton({btn: "food-save-btn", msg: "Invalid Name"});
	}
	else if(Number(request.price) < 1)
	{
		errorButton({btn: "food-save-btn", msg: "Invalid Price"});
	}
	else if(request.barcode == "")
	{
		errorButton({btn: "food-save-btn", msg: "Add or generate an SKU"});
	}
	else if(Number(request.category) < 1)
	{
		errorButton({btn: "food-save-btn", msg: "Select category"});
	}
	else if((request.unit == "") && ((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled)))
	{
		errorButton({btn:"food-save-btn", msg:"Add a unit of inventory measurement"});
	}
	else if((request.pluralunit == "") && ((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled)))
	{
		errorButton({btn:"food-save-btn", msg:"Add plural form for inventory unit"});
	}
	else
	{
		loadingButton({btn:"food-save-btn"});
		postJson("hms-admin/worker", function (data, status)
		{
			loadingButton({btn:"food-save-btn", loading:false});
			if (status === "done")
			{
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					if((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled))
					{
						$("#inventory-con").transition('drop out');
					}

					$("#foodid").val("");
					$("#foodstatus").val("true");
					$("#food-name").val("");
					$("#food-description").val("");
					$("#food-price").val("");
					$("#food-price-compare").val("");
					getElement("show-promo-text").checked = false;
					getElement("show-on-site").checked = true;
					getElement("reservable").checked = true;
					getElement("track-inventory").checked = false;
					getElement("track-inventory").disabled = false;
					getElement("pos-available").checked = true;
					$("#barcode").val("");
					$("#cost").val("");
					$("#food-category").dropdown('set default');
					$("#food-promo-text").val("");
					$("#food-sort").val(0);
					$("#tax-amount").val("");

					let i = 1;
					while(getElement("item-img-"+i) !== null)
					{
						$("#item-file-name-"+i).val("");
						getElement("item-img-"+i).src = "";
						i++;
					}

					$("#food-save-btn").html("<i class='check icon'></i> Food saved");
					$("#food-save-btn").addClass("positive");
					$("#food-save-btn").addClass("disabled");
					setTimeout(function () {
						$("#food-save-btn").html("Save Food");
						$("#food-save-btn").removeClass("positive");
						$("#food-save-btn").removeClass("disabled");
					}, 3000);
				}
				else
				{
					errorButton({btn: "food-save-btn", msg: d.message});
				}
			}
			else
			{
				errorButton({btn: "food-save-btn", msg: "Connection error"});
			}
		}, request);
	}
}

function SetFood_Status(e, id)
{
	let request = {};
	request.Foodid = id;
	request.Status = e.checked;
	request.job = "save food status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save Food Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Food Status");
		}
	}, request);
}

function SetFood_Reservable(e, id)
{
	let request = {};
	request.Foodid = id;
	request.Reservable = e.checked;
	request.job = "save food reservablity";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save food Reservable");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save food Reservable");
		}
	}, request);
}

function SetFood_Visibility(e, id)
{
	let request = {};
	request.Foodid = id;
	request.Onsite = e.checked;
	request.job = "save food visibility";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save Food Onsite");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Food Onsite");
		}
	}, request);
}

function ConfirmGroupFoodDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Food?", function(choice){
		if(choice === true)
		{
			FoodGroupDelete();
		}
	});
}

function ConfirmFoodDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Food?", function(choice, param){
		if(choice === true)
		{
			FoodListDelete(param);
		}
	}, null, null, e);
}

function FoodGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteFood(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Foods failed to delete");
		}
	}
	else
	{
		ShowModal("No Foods were selected");
	}
}

function FoodListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeleteFood(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteFood(e, func)
{
	let request = {};
	request.Foodid = e;
	request.job = "delete food";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function loadEditFoodData(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#foodid").val(d.data.Id);
				$("#foodstatus").val(d.data.Status);
				$("#food-name").val(d.data.Name);
				$("#food-description").val(d.data.Description);
				$("#food-price").val(d.data.Price);
				$("#food-price-compare").val(Number(d.data.Compareat));
				getElement("show-promo-text").checked = d.data.Showpromo;
				getElement("show-on-site").checked = d.data.Onsite;
				getElement("reservable").checked = d.data.Reservable;
				getElement("track-inventory").checked = d.data.Trackinventory;
				if(d.data.Trackinventory)
				{
					getElement("track-inventory").disabled = true;
				}
				getElement("pos-available").checked = d.data.Pos;
				$("#barcode").val(d.data.Barcode);
				$("#cost").val(d.data.Costprice);
				$("#food-promo-text").val(d.data.Promotext);
				$("#food-sort").val(d.data.Sort);
				$("#food-category").dropdown('set selected', d.data.Category.Id);
				$("#tax-amount").val(d.data.Tax);


				if(d.data.Images.length > 0)
				{
					getElement("item-img-1").src = "files/"+d.data.Images[0];
					getElement("item-file-name-1").value = d.data.Images[0];
				}
				if(d.data.Images.length > 1)
				{
					getElement("item-img-2").src = "files/"+d.data.Images[1];
					getElement("item-file-name-2").value = d.data.Images[1];
				}
				if(d.data.Images.length > 2)
				{
					getElement("item-img-3").src = "files/"+d.data.Images[2];
					getElement("item-file-name-3").value = d.data.Images[2];
				}
				if(d.data.Images.length > 3)
				{
					getElement("item-img-4").src = "files/"+d.data.Images[3];
					getElement("item-file-name-4").value = d.data.Images[3];
				}
			}
			else
			{
				location.href = "#food";
				ShowModal(d.message);
			}
		}
		else
		{
			location.href = "#food";
			ShowModal("Connection error. Unable to load food data");
		}
	},{foodid:e, job:"single food"});
}




//-----------------------Drink Category Logic-----------------------------------------------//

let drinkCat_modal = null;

function showdrinkcategory()
{
	loadModal({title:"Drinks Categories", size:'l',html:"<div class='pad-1 align-r'>"+
			"<button id='new-cat-btn' class='ui sleak compact blue-back button'>Add Category</button>" +
			"</div>" + div({class:"pad-1", add:"<table class='ui basic table'>" +
					"<thead class='sleak'>" +
					"<th>SN</th>" +
					"<th>Name</th>" +
					"<th>Sort</th>" +
					"<th>Status</th>" +
					"<th>Action</th>" +
					"</thead>" +
					"<tbody id='drink-cat-body'>" +

					"</tbody>" +
					"<tfoot>" +
					"<tr>" +
					"<th colspan='1'>" +
					"<h4 class='ui header'>" +
					"<div class='content'>" +
					"<div id='drink-cat-perpage' class='ui inline dropdown'>" +
					"<div class='text sleak'> 25</div>" +
					"<i class='dropdown icon'></i>" +
					"<div class='menu'>" +
					"<div class='header'>Show per page</div>" +
					"<div class='active item' data-text='25'>25</div>" +
					"<div class='item' data-text='50'>50</div>" +
					"<div class='item' data-text='100'>100</div>" +
					"<div class='item' data-text='200'>200</div>" +
					"<div class='item' data-text='300'>300</div>" +
					"</div>" +
					"</div>" +
					"</div>" +
					"</h4>" +
					"" +
					"</th>" +
					"<th colspan='6'>" +
					"      <div id='drink-cat-pages' class='ui right floated pagination tiny compact menu'>" +
					"      </div>" +
					"    </th>" +
					"</tr>" +
					"</tfoot>" +
					"</table>"}).outerHTML, onLoaded: function(o){

			$("#drink-cat-perpage").dropdown();
			populateDrinkcategory();

			drinkCat_modal = o.modal;

			getElement("new-cat-btn").onclick = function(){
				closeGenModal(o.modal, function(){
					showNewdrinkcategory();
				});
			};

		}});
}

function showNewdrinkcategory(o)
{
	let name = "";
	let sort = 0;
	let status = "checked";
	let id = "";
	let title = "Create New Drink Category";

	if(o != null)
	{
		if(o.id != null)
		{
			id = o.id;
			title = "Edit Drink Category";
		}
		if(o.name != null)
		{
			name = o.name;
		}
		if(o.sort != null)
		{
			sort = o.sort;
		}
		if(o.status != null)
		{
			status = o.status ? "checked" : "";
		}
	}

	loadModal({title:title, size:'s',html:"<div class='pad-1 align-r'>"+
			"<button id='new-cat-btn' class='ui sleak compact blue-back button'>Category List</button>" +
			"</div>" + div({class:"pad-2", add:"<div>" +

					"<input id='drink-cat-id' type='hidden' value='"+id+"'/>" +

					"<label>Category Name</label>" +
					"<div class='ui fluid input'><input id='drink-cat-title' class='wix-textbox' type='text' value='"+name+"'/></div><br/>" +
					"<div class='ui fluid labeled input'><label class='ui sleak label'>Sort</label><input id='drink-cat-sort' class='wix-textbox' type='number' value='"+sort+"'/></div><br/>" +
					"<div class='switch'><label><input id='drink-cat-status' type='checkbox' "+status+"/><span class='lever'></span></label>Status</div><br/>" +
					"<div><button id='drink-cat-save-btn' class='ui green-back sleak compact button' onclick='saveDrinkCategory()'><i class='save icon'></i>Save</button></div>" +

					"</div>"}).outerHTML, onLoaded: function(o){

			$("#drink-cat-perpage").dropdown();
			populateDrinkcategory();

			getElement("new-cat-btn").onclick = function(){
				closeGenModal(o.modal, function(){
					showdrinkcategory();
				});
			};

		}});
}

function saveDrinkCategory()
{
	let request = {
		catid:$("#drink-cat-id").val(),
		title:$("#drink-cat-title").val(),
		sort:$("#drink-cat-sort").val(),
		status:getElement("drink-cat-status").checked,
		job:"save drink category"
	};

	if(request.title === "")
	{
		errorButton({btn:"drink-cat-save-btn",msg:"Name is empty"});
	}
	else
	{
		loadingButton({btn:"drink-cat-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"drink-cat-save-btn",loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#drink-cat-id").val(""),
						$("#drink-cat-title").val(""),
						$("#drink-cat-sort").val(0);
					getElement("drink-cat-status").checked = true;

					$("#drink-cat-save-btn").html("<i class='check icon'></i>Saved");
					$("#drink-cat-save-btn").addClass("positive");
					$("#drink-cat-save-btn").addClass("disabled");

					setTimeout(function(){
						$("#drink-cat-save-btn").html("<i class='save icon'></i>Save");
						$("#drink-cat-save-btn").removeClass("positive");
						$("#drink-cat-save-btn").removeClass("disabled");
					},2000);
				}
				else
				{
					errorButton({btn:"drink-cat-save-btn",msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"drink-cat-save-btn",msg:"Connection error"});
			}
		},request);
	}
}

function editDrinkcategory(o)
{
	let res = JSON.parse(unescape(o));
	let r = {id:res.Id, name:res.Name, sort:res.Sort, status:res.Status};

	closeGenModal(drinkCat_modal, function(){
		showNewdrinkcategory(r);
	});
}

function SetDrinkcategory_Status(e, id)
{
	let request = {};
	request.Drinkcategoryid = id;
	request.Status = e.checked;
	request.job = "save drink category status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !request.Status;
				ShowModal("Unable to save Drink category Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Drink category Status");
		}
	}, request);
}

function ConfirmDrinkcategoryDelete(e)
{
	ConfirmModal("Are you sure you want to delete the Drink category?", function(choice, param){
		if(choice === true)
		{
			DrinkcategoryListDelete(param);
		}
	}, null, null, e);
}

function DrinkcategoryListDelete(e)
{
	//Loading animation here
	$("#drinkcat-del-btn-"+e).removeClass("trash");
	$("#drinkcat-del-btn-"+e).addClass("spinner");
	$("#drinkcat-del-btn-"+e).addClass("loading");
	DeleteDrinkcategory(e, function(status, msg){
		//Stop Animation here
		$("#drinkcat-del-btn-"+e).addClass("trash");
		$("#drinkcat-del-btn-"+e).removeClass("spinner");
		$("#drinkcat-del-btn-"+e).removeClass("loading");
		if(status == "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeleteDrinkcategory(e, func)
{
	let request = {};
	request.Drinkcategoryid = e;
	request.job = "delete drink category";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}



//-------------------------  Drink Logic --------------------------------//

function saveDrink()
{
	let request = {
		drinkid:$("#drinkid").val(),
		status:$("#drinkstatus").val(),
		name:$("#drink-name").val(),
		description:$("#drink-description").val(),
		price:Number($("#drink-price").val()),
		compare:Number($("#drink-price-compare").val()),
		showpromo:getElement("show-promo-text").checked,
		showonsite:getElement("show-on-site").checked,
		reservable:getElement("reservable").checked,
		inventory:getElement("track-inventory").checked,
		category:$("#drink-category").dropdown('get value'),
		promotext:$("#drink-promo-text").val(),
		sort:$("#drink-sort").val(),
		tax:Number($("#tax-amount").val()),
		pos:getElement("pos-available").checked,
		barcode:$("#barcode").val(),
		cost:$("#cost").val(),
		images:[],


		// --------- Variables for inventory managment
		unit:"",
		pluralunit:"",
		lowstockpoint:0,
		openingstock:0,
		suppliers:[],


		job:"save drink"
	};


	if((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled))
	{

		request.unit = $("#item-unit-singular").val();
		request.pluralunit = $("#item-unit-plural").val();
		request.lowstockpoint = Number($("#item-lowstockpoint").val());
		request.openingstock = getElement("item-openingstock") != null ? getElement("item-openingstock").value : 0;
		request.suppliers = $("#suppliers").dropdown('get value');
	}


	let i = 1;
	while(getElement("item-file-name-"+i) !== null)
	{
		if($("#item-file-name-"+i).val() !== "")
		{
			request.images.push($("#item-file-name-"+i).val());
		}
		i++;
	}

	if(request.images.length === 0)
	{
		ShowModal("Add at least one image of the drink");
	}
	else if(request.name === "")
	{
		errorButton({btn: "drink-save-btn", msg: "Invalid Name"});
	}
	else if(Number(request.price) < 1)
	{
		errorButton({btn: "drink-save-btn", msg: "Invalid Price"});
	}
	else if(request.barcode == "")
	{
		errorButton({btn: "drink-save-btn", msg: "Add or generate an SKU"});
	}
	else if(Number(request.category) < 1)
	{
		errorButton({btn: "drink-save-btn", msg: "Select category"});
	}
	else if((request.unit == "") && ((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled)))
	{
		errorButton({btn:"drink-save-btn", msg:"Add a unit of measurement"});
	}
	else if((request.pluralunit == "") && ((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled)))
	{
		errorButton({btn:"drink-save-btn", msg:"Add plural form for unit"});
	}
	else
	{
		loadingButton({btn:"drink-save-btn"});
		postJson("hms-admin/worker", function (data, status)
		{
			loadingButton({btn:"drink-save-btn", loading:false});
			if (status === "done")
			{
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					if((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled))
					{
						$("#inventory-con").transition('drop out');
					}

					$("#drinkid").val("");
					$("#drinkstatus").val("true");
					$("#drink-name").val("");
					$("#drink-description").val("");
					$("#drink-price").val("");
					$("#drink-price-compare").val("");
					getElement("show-promo-text").checked = false;
					getElement("show-on-site").checked = true;
					getElement("reservable").checked = true;
					getElement("track-inventory").checked = false;
					getElement("pos-available").checked = true;
					$("#barcode").val("");
					$("#cost").val("");
					$("#drink-category").dropdown('set default');
					$("#drink-promo-text").val("");
					$("#drink-sort").val(0);
					$("#tax-amount").val("");

					let i = 1;
					while(getElement("item-img-"+i) !== null)
					{
						$("#item-file-name-"+i).val("");
						getElement("item-img-"+i).src = "";
						i++;
					}

					$("#drink-save-btn").html("<i class='check icon'></i> Drink saved");
					$("#drink-save-btn").addClass("positive");
					$("#drink-save-btn").addClass("disabled");
					setTimeout(function () {
						$("#drink-save-btn").html("Save Drink");
						$("#drink-save-btn").removeClass("positive");
						$("#drink-save-btn").removeClass("disabled");
					}, 3000);
				}
				else
				{
					errorButton({btn: "drink-save-btn", msg: d.message});
				}
			}
			else
			{
				errorButton({btn: "drink-save-btn", msg: "Connection error"});
			}
		}, request);
	}
}

function SetDrink_Status(e, id)
{
	let request = {};
	request.Drinkid = id;
	request.Status = e.checked;
	request.job = "save drink status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save drink Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save drink Status");
		}
	}, request);
}

function SetDrink_Reservable(e, id)
{
	let request = {};
	request.Drinkid = id;
	request.Reservable = e.checked;
	request.job = "save drink reservablity";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save drink Reservable");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save drink Reservable");
		}
	}, request);
}

function SetDrink_Visibility(e, id)
{
	let request = {};
	request.Drinkid = id;
	request.Onsite = e.checked;
	request.job = "save drink visibility";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save drink on-site");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save drink on-site");
		}
	}, request);
}

function ConfirmGroupDrinkDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Drinks?", function(choice){
		if(choice === true)
		{
			DrinkGroupDelete();
		}
	});
}

function ConfirmDrinkDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Drink?", function(choice, param){
		if(choice === true)
		{
			DrinkListDelete(param);
		}
	}, null, null, e);
}

function DrinkGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteDrink(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Drinks failed to delete");
		}
	}
	else
	{
		ShowModal("No Drinks were selected");
	}
}

function DrinkListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeleteDrink(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteDrink(e, func)
{
	let request = {};
	request.Drinkid = e;
	request.job = "delete drink";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function loadEditDrinkData(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#drinkid").val(d.data.Id);
				$("#drinkstatus").val(d.data.Status);
				$("#drink-name").val(d.data.Name);
				$("#drink-description").val(d.data.Description);
				$("#drink-price").val(d.data.Price);
				$("#drink-price-compare").val(Number(d.data.Compareat));
				getElement("show-promo-text").checked = d.data.Showpromo;
				getElement("show-on-site").checked = d.data.Onsite;
				getElement("reservable").checked = d.data.Reservable;
				getElement("track-inventory").checked = d.data.Trackinventory;
				if(d.data.Trackinventory)
				{
					getElement("track-inventory").disabled = true;
				}
				getElement("pos-available").checked = d.data.Pos;
				$("#barcode").val(d.data.Barcode);
				$("#cost").val(d.data.Costprice);
				$("#drink-promo-text").val(d.data.Promotext);
				$("#drink-sort").val(d.data.Sort);
				$("#drink-category").dropdown('set selected', d.data.Category.Id);
				$("#tax-amount").val(d.data.Tax);


				if(d.data.Images.length > 0)
				{
					getElement("item-img-1").src = "files/"+d.data.Images[0];
					getElement("item-file-name-1").value = d.data.Images[0];
				}
				if(d.data.Images.length > 1)
				{
					getElement("item-img-2").src = "files/"+d.data.Images[1];
					getElement("item-file-name-2").value = d.data.Images[1];
				}
				if(d.data.Images.length > 2)
				{
					getElement("item-img-3").src = "files/"+d.data.Images[2];
					getElement("item-file-name-3").value = d.data.Images[2];
				}
				if(d.data.Images.length > 3)
				{
					getElement("item-img-4").src = "files/"+d.data.Images[3];
					getElement("item-file-name-4").value = d.data.Images[3];
				}
			}
			else
			{
				location.href = "#bar-drinks";
				ShowModal(d.message);
			}
		}
		else
		{
			location.href = "#bar-drinks";
			ShowModal("Connection error. Unable to load drink's data");
		}
	},{drinkid:e, job:"single drink"});
}






//----------------------- Pastry Category Logic-----------------------------------------------//

let pastryCat_modal = null;

function showpastrycategory()
{
	loadModal({title:"Pastry Categories", size:'l',html:"<div class='pad-1 align-r'>"+
		"<button id='new-cat-btn' class='ui sleak compact blue-back button'>Add Category</button>" +
		"</div>" + div({class:"pad-1", add:"<table class='ui basic table'>" +
				"<thead class='sleak'>" +
				"<th>SN</th>" +
				"<th>Name</th>" +
				"<th>Sort</th>" +
				"<th>Status</th>" +
				"<th>Action</th>" +
				"</thead>" +
				"<tbody id='pastry-cat-body'>" +

				"</tbody>" +
				"<tfoot>" +
				"<tr>" +
				"<th colspan='1'>" +
				"<h4 class='ui header'>" +
				"<div class='content'>" +
				"<div id='pastry-cat-perpage' class='ui inline dropdown'>" +
				"<div class='text sleak'> 25</div>" +
				"<i class='dropdown icon'></i>" +
				"<div class='menu'>" +
				"<div class='header'>Show per page</div>" +
				"<div class='active item' data-text='25'>25</div>" +
				"<div class='item' data-text='50'>50</div>" +
				"<div class='item' data-text='100'>100</div>" +
				"<div class='item' data-text='200'>200</div>" +
				"<div class='item' data-text='300'>300</div>" +
				"</div>" +
				"</div>" +
				"</div>" +
				"</h4>" +
				"" +
				"</th>" +
				"<th colspan='6'>" +
				"      <div id='pastry-cat-pages' class='ui right floated pagination tiny compact menu'>" +
				"      </div>" +
				"    </th>" +
				"</tr>" +
				"</tfoot>" +
				"</table>"}).outerHTML, onLoaded: function(o){

		$("#pastry-cat-perpage").dropdown();
		populatePastrycategory();

		pastryCat_modal = o.modal;

		getElement("new-cat-btn").onclick = function(){
			closeGenModal(o.modal, function(){
				showNewpastrycategory();
			});
		};

	}});
}

function showNewpastrycategory(o)
{
	let name = "";
	let sort = 0;
	let status = "checked";
	let id = "";
	let title = "Create New Pastry Category";

	if(o != null)
	{
		if(o.id != null)
		{
			id = o.id;
			title = "Edit Pastry Category";
		}
		if(o.name != null)
		{
			name = o.name;
		}
		if(o.sort != null)
		{
			sort = o.sort;
		}
		if(o.status != null)
		{
			status = o.status ? "checked" : "";
		}
	}

	loadModal({title:title, size:'s',html:"<div class='pad-1 align-r'>"+
		"<button id='new-cat-btn' class='ui sleak compact blue-back button'>Category List</button>" +
		"</div>" + div({class:"pad-2", add:"<div>" +

				"<input id='pastry-cat-id' type='hidden' value='"+id+"'/>" +

				"<label>Category Name</label>" +
				"<div class='ui fluid input'><input id='pastry-cat-title' class='wix-textbox' type='text' value='"+name+"'/></div><br/>" +
				"<div class='ui fluid labeled input'><label class='ui sleak label'>Sort</label><input id='pastry-cat-sort' class='wix-textbox' type='number' value='"+sort+"'/></div><br/>" +
				"<div class='switch'><label><input id='pastry-cat-status' type='checkbox' "+status+"/><span class='lever'></span></label>Status</div><br/>" +
				"<div><button id='pastry-cat-save-btn' class='ui green-back sleak compact button' onclick='savePastryCategory()'><i class='save icon'></i>Save</button></div>" +

				"</div>"}).outerHTML, onLoaded: function(o){

		$("#pastry-cat-perpage").dropdown();
		populatePastrycategory();

		getElement("new-cat-btn").onclick = function(){
			closeGenModal(o.modal, function(){
				showpastrycategory();
			});
		};

	}});
}

function savePastryCategory()
{
	let request = {
		catid:$("#pastry-cat-id").val(),
		title:$("#pastry-cat-title").val(),
		sort:$("#pastry-cat-sort").val(),
		status:getElement("pastry-cat-status").checked,
		job:"save pastry category"
	};

	if(request.title === "")
	{
		errorButton({btn:"pastry-cat-save-btn",msg:"Name is empty"});
	}
	else
	{
		loadingButton({btn:"pastry-cat-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"pastry-cat-save-btn",loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#pastry-cat-id").val(""),
						$("#pastry-cat-title").val(""),
						$("#pastry-cat-sort").val(0);
					getElement("pastry-cat-status").checked = true;

					$("#pastry-cat-save-btn").html("<i class='check icon'></i>Saved");
					$("#pastry-cat-save-btn").addClass("positive");
					$("#pastry-cat-save-btn").addClass("disabled");

					setTimeout(function(){
						$("#pastry-cat-save-btn").html("<i class='save icon'></i>Save");
						$("#pastry-cat-save-btn").removeClass("positive");
						$("#pastry-cat-save-btn").removeClass("disabled");
					},2000);
				}
				else
				{
					errorButton({btn:"pastry-cat-save-btn",msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"pastry-cat-save-btn",msg:"Connection error"});
			}
		},request);
	}
}

function editPastrycategory(o)
{
	let res = JSON.parse(unescape(o));
	let r = {id:res.Id, name:res.Name, sort:res.Sort, status:res.Status};

	closeGenModal(pastryCat_modal, function(){
		showNewpastrycategory(r);
	});
}

function SetPastrycategory_Status(e, id)
{
	let request = {};
	request.Pastrycategoryid = id;
	request.Status = e.checked;
	request.job = "save pastry category status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !request.Status;
				ShowModal("Unable to save Pastry category Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save Pastry category Status");
		}
	}, request);
}

function ConfirmPastrycategoryDelete(e)
{
	ConfirmModal("Are you sure you want to delete the Pastry category?", function(choice, param){
		if(choice === true)
		{
			PastrycategoryListDelete(param);
		}
	}, null, null, e);
}

function PastrycategoryListDelete(e)
{
	//Loading animation here
	$("#pastrycat-del-btn-"+e).removeClass("trash");
	$("#pastrycat-del-btn-"+e).addClass("spinner");
	$("#pastrycat-del-btn-"+e).addClass("loading");
	DeletePastrycategory(e, function(status, msg){
		//Stop Animation here
		$("#pastrycat-del-btn-"+e).addClass("trash");
		$("#pastrycat-del-btn-"+e).removeClass("spinner");
		$("#pastrycat-del-btn-"+e).removeClass("loading");
		if(status == "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeletePastrycategory(e, func)
{
	let request = {};
	request.Pastrycategoryid = e;
	request.job = "delete pastry category";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}





//-------------------------  Pastry Logic --------------------------------//

function savePastry()
{
	let request = {
		pastryid:$("#pastryid").val(),
		status:$("#pastrystatus").val(),
		name:$("#pastry-name").val(),
		description:$("#pastry-description").val(),
		price:Number($("#pastry-price").val()),
		compare:Number($("#pastry-price-compare").val()),
		showpromo:getElement("show-promo-text").checked,
		showonsite:getElement("show-on-site").checked,
		reservable:getElement("reservable").checked,
		inventory:getElement("track-inventory").checked,
		category:$("#pastry-category").dropdown('get value'),
		promotext:$("#pastry-promo-text").val(),
		sort:$("#pastry-sort").val(),
		tax:Number($("#tax-amount").val()),
		pos:getElement("pos-available").checked,
		barcode:$("#barcode").val(),
		cost:$("#cost").val(),
		images:[],


		// --------- Variables for inventory managment
		unit:"",
		pluralunit:"",
		lowstockpoint:0,
		openingstock:0,
		suppliers:[],


		job:"save pastry"
	};


	if((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled))
	{

		request.unit = $("#item-unit-singular").val();
		request.pluralunit = $("#item-unit-plural").val();
		request.lowstockpoint = Number($("#item-lowstockpoint").val());
		request.openingstock = getElement("item-openingstock") != null ? getElement("item-openingstock").value : 0;
		request.suppliers = $("#suppliers").dropdown('get value');
	}


	let i = 1;
	while(getElement("item-file-name-"+i) !== null)
	{
		if($("#item-file-name-"+i).val() !== "")
		{
			request.images.push($("#item-file-name-"+i).val());
		}
		i++;
	}

	if(request.images.length === 0)
	{
		ShowModal("Add at least one image of the pastry");
	}
	else if(request.name === "")
	{
		errorButton({btn: "pastry-save-btn", msg: "Invalid Name"});
	}
	else if(Number(request.price) < 1)
	{
		errorButton({btn: "pastry-save-btn", msg: "Invalid Price"});
	}
	else if(request.barcode == "")
	{
		errorButton({btn: "pastry-save-btn", msg: "Add or generate an SKU"});
	}
	else if(Number(request.category) < 1)
	{
		errorButton({btn: "pastry-save-btn", msg: "Select category"});
	}
	else if((request.unit == "") && ((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled)))
	{
		errorButton({btn:"pastry-save-btn", msg:"Add a unit of measurement"});
	}
	else if((request.pluralunit == "") && ((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled)))
	{
		errorButton({btn:"pastry-save-btn", msg:"Add plural form for unit"});
	}
	else
	{
		loadingButton({btn:"pastry-save-btn"});
		postJson("hms-admin/worker", function (data, status)
		{
			loadingButton({btn:"pastry-save-btn", loading:false});
			if (status === "done")
			{
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					if((getElement("track-inventory").checked) && (!getElement("track-inventory").disabled))
					{
						$("#inventory-con").transition('drop out');
					}

					$("#pastryid").val("");
					$("#pastrystatus").val("true");
					$("#pastry-name").val("");
					$("#pastry-description").val("");
					$("#pastry-price").val("");
					$("#pastry-price-compare").val("");
					getElement("show-promo-text").checked = false;
					getElement("show-on-site").checked = true;
					getElement("reservable").checked = true;
					getElement("track-inventory").checked = false;
					getElement("pos-available").checked = true;
					$("#barcode").val("");
					$("#cost").val("");
					$("#pastry-category").dropdown('set default');
					$("#pastry-promo-text").val("");
					$("#pastry-sort").val(0);
					$("#tax-amount").val("");

					let i = 1;
					while(getElement("item-img-"+i) !== null)
					{
						$("#item-file-name-"+i).val("");
						getElement("item-img-"+i).src = "";
						i++;
					}

					$("#pastry-save-btn").html("<i class='check icon'></i> Pastry saved");
					$("#pastry-save-btn").addClass("positive");
					$("#pastry-save-btn").addClass("disabled");
					setTimeout(function () {
						$("#pastry-save-btn").html("Save Pastry");
						$("#pastry-save-btn").removeClass("positive");
						$("#pastry-save-btn").removeClass("disabled");
					}, 3000);
				}
				else
				{
					errorButton({btn: "pastry-save-btn", msg: d.message});
				}
			}
			else
			{
				errorButton({btn: "pastry-save-btn", msg: "Connection error"});
			}
		}, request);
	}
}

function SetPastry_Status(e, id)
{
	let request = {};
	request.Pastryid = id;
	request.Status = e.checked;
	request.job = "save pastry status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save patry Status");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save drink Status");
		}
	}, request);
}

function SetPastry_Reservable(e, id)
{
	let request = {};
	request.Pastryid = id;
	request.Reservable = e.checked;
	request.job = "save pastry reservablity";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			 {
				ShowModal("Unable to save pastry Reservable");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save pastry Reservable");
		}
	}, request);
}

function SetPastry_Visibility(e, id)
{
	let request = {};
	request.Pastryid = id;
	request.Onsite = e.checked;
	request.job = "save pastry visibility";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				ShowModal("Unable to save pastry on-site");
			}
		}
		else
		{
			ShowModal("Connection error. Unable to save pastry on-site");
		}
	}, request);
}

function ConfirmGroupPastryDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Pastries", function(choice){
		if(choice === true)
		{
			PastryGroupDelete();
		}
	});
}

function ConfirmPastryDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Pastry?", function(choice, param){
		if(choice === true)
		{
			PastryListDelete(param);
		}
	}, null, null, e);
}

function PastryGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeletePastry(lst[i].id, function(status, msg){

				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");

				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Pastry failed to delete");
		}
	}
	else
	{
		ShowModal("No Pastries were selected");
	}
}

function PastryListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeletePastry(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeletePastry(e, func)
{
	let request = {};
	request.Pastryid = e;
	request.job = "delete pastry";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) === "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", "Operation failed. Try again");
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function loadEditPastryData(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#pastryid").val(d.data.Id);
				$("#pastrystatus").val(d.data.Status);
				$("#pastry-name").val(d.data.Name);
				$("#pastry-description").val(d.data.Description);
				$("#pastry-price").val(d.data.Price);
				$("#pastry-price-compare").val(Number(d.data.Compareat));
				getElement("show-promo-text").checked = d.data.Showpromo;
				getElement("show-on-site").checked = d.data.Onsite;
				getElement("reservable").checked = d.data.Reservable;
				getElement("track-inventory").checked = d.data.Trackinventory;
				if(d.data.Trackinventory)
				{
					getElement("track-inventory").disabled = true;
				}
				getElement("pos-available").checked = d.data.Pos;
				$("#barcode").val(d.data.Barcode);
				$("#cost").val(d.data.Costprice);
				$("#pastry-promo-text").val(d.data.Promotext);
				$("#pastry-sort").val(d.data.Sort);
				$("#pastry-category").dropdown('set selected', d.data.Category.Id);
				$("#tax-amount").val(d.data.Tax);


				if(d.data.Images.length > 0)
				{
					getElement("item-img-1").src = "files/"+d.data.Images[0];
					getElement("item-file-name-1").value = d.data.Images[0];
				}
				if(d.data.Images.length > 1)
				{
					getElement("item-img-2").src = "files/"+d.data.Images[1];
					getElement("item-file-name-2").value = d.data.Images[1];
				}
				if(d.data.Images.length > 2)
				{
					getElement("item-img-3").src = "files/"+d.data.Images[2];
					getElement("item-file-name-3").value = d.data.Images[2];
				}
				if(d.data.Images.length > 3)
				{
					getElement("item-img-4").src = "files/"+d.data.Images[3];
					getElement("item-file-name-4").value = d.data.Images[3];
				}
			}
			else
			{
				location.href = "#pastries";
				ShowModal(d.message);
			}
		}
		else
		{
			location.href = "#pastries";
			ShowModal("Connection error. Unable to load pastrie's data");
		}
	},{Pastryid:e, job:"single pastry"});
}

// function generateBarcode()
// {
// 	loadingButton({btn:"barcode-btn"});
// 	postJson("hms-admin/worker", function(data, status){
// 		loadingButton({btn:"barcode-btn", loading:false});
// 		if(status === "done")
// 		{
// 			let d = JSON.parse(data);

// 			if(d.status === "success")
// 			{
// 				$("#barcode").val(d.data);
// 			}
// 			else
// 			{
// 				ShowModal(d.message);
// 			}
// 		}
// 		else
// 		{
// 			ShowModal("Unable to generate barcode. Connection error");
// 		}
// 	},{job:"generate item barcode"});
// }


function receivedmessageLoader()
{
	return "<div class='w3-row widget curve' style='margin-top: 5px;'>" +
		"<div class='w3-col l2 m1 s12 l-pad-2 s-pad-1' style='border-right: 1px solid lightgray;'>" +
		"<div class='ui placeholder'><div class='line'></div></div> " +
		"</div> " +
		"<div class='w3-col l1 m1 s12 l-pad-2 s-pad-1' style=''>" +
		"<div class='ui placeholder'><div class='line'></div></div> " +
		"</div> " +
		"<div class='w3-col l2 m2 s12 l-pad-2 s-pad-1'>" +
		"<div class='ui placeholder'><div class='line'></div></div> " +
		"</div> " +
		"<div class='w3-col l5 m4 s12 l-pad-2 s-pad-1'>" +
		"<div class='ui placeholder'><div class='line'></div></div> " +
		"</div> " +
		"<div class='w3-col l2 m2 s12 l-pad-2 s-pad-1'>" +
		"<div class='ui placeholder'><div class='line'></div></div> " +
		"</div> " +
		"</div>";
}



//----------------------------------------- Message template logic-----------------------------------------

function saveEmailTemplate()
{
	let request = {
		messageid:$("#messageid").val(),
		type:"email",
		from:$("#email-from").val(),
		fromname:$("#email-from-name").val(),
		replyto:$("#email-reply-to").val(),
		subject:$("#email-subject").val(),
		body:$("#email-body").val(),
		attachment:$("#email-attachment").val(),
		title:$("#email-title").val(),
		status:$("#email-status").val(),
		job:"save message template"
	}

	if(request.title === "")
	{
		errorButton({btn:"email-template-btn", msg:"Title is empty"});
	}
	else if(request.from === "")
	{
		errorButton({btn:"email-template-btn", msg:"Title is empty"});
	}
	else if(request.fromname === "")
	{
		errorButton({btn:"email-template-btn", msg:"From name is empty"});
	}
	else if(request.subject === "")
	{
		errorButton({btn:"email-template-btn", msg:"Subject is empty"});
	}
	else if(request.body === "")
	{
		errorButton({btn:"email-template-btn", msg:"Message body is empty"});
	}
	else
	{
		loadingButton({btn:"email-template-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"email-template-btn", loading:false});

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#email-template-btn").html("<i class='check icon'></i> Template saved");
					$("#email-template-btn").addClass("positive disabled");

					setTimeout(function(){
						$("#email-template-btn").html("<i class='save icon'></i> Save");
						$("#email-template-btn").removeClass("positive disabled");
					},3000);

					$("#messageid").val("");
					$("#messagetype").val("email");
					$("#email-from").val("");
					$("#email-from-name").val("");
					$("#email-reply-to").val("");
					$("#email-subject").val("");
					$("#email-body").val("");
					$("#email-attachment").val("");
					$("#email-title").val("");
					$("#email-attachment-txt").html("Click to add attachment");
				}
				else
				{
					errorButton({btn:"email-template-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"email-template-btn", msg:"Connection error"});
			}
		}, request);
	}
}

function saveSMSTemplate()
{
	let request = {
		messageid:$("#messageid").val(),
		type:"sms",
		from:"",
		fromname:$("#sms-from-name").val(),
		replyto:"",
		subject:"",
		body:$("#sms-body").val(),
		attachment:"",
		title:$("#sms-title").val(),
		status:$("#status-status").val(),
		job:"save message template"
	}

	if(request.title === "")
	{
		errorButton({btn:"sms-template-btn", msg:"Title is empty"});
	}
	else if(request.fromname === "")
	{
		errorButton({btn:"sms-template-btn", msg:"From name is empty"});
	}
	else if(request.body === "")
	{
		errorButton({btn:"sms-template-btn", msg:"Message body is empty"});
	}
	else
	{
		loadingButton({btn:"sms-template-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"sms-template-btn", loading:false});

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#sms-template-btn").html("<i class='check icon'></i> Template saved");
					$("#sms-template-btn").addClass("positive disabled");

					setTimeout(function(){
						$("#sms-template-btn").html("<i class='save icon'></i> Save");
						$("#sms-template-btn").removeClass("positive disabled");
					},3000);

					$("#messageid").val("");
					$("#messagetype").val("sms");
					$("#email-from-name").val("");
					$("#sms-body").val("");
					$("#sms-title").val("");
				}
				else
				{
					errorButton({btn:"sms-template-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"sms-template-btn", msg:"Connection error"});
			}
		}, request);
	}
}

function contactListClicked(e)
{
	$(".contact-list-menu").removeClass("active");
	$(e).addClass("active");
	populateContactList();
	$(".list-name-con").html("");
}

function addGroupContacttoList()
{
	selectCustomlist(function(listid){
		let cnt = [];

		let inps = document.getElementsByClassName("check-sel");

		let i = 0;
		for(; i < inps.length; i++)
		{
			if(inps[i].checked)
			{
				cnt.push(inps[i].getAttribute("s-data")+":"+listid);
			}
		}

		if(cnt.length > 0)
		{
			addCustomContact(cnt);
		}
		else
		{
			ShowModal("No contacts were selected. Select contacts and try again");
		}
	});
}

function launchAddContact(a)
{
	let e = null;

	if(a != null)
	{
		e = JSON.parse(unescape(a));
	}

	let id = e != null ? e.id : "";
	let names =  e != null ? e.names : "";
	let phone =  e != null ? e.phone : "";
	let email =  e != null ? e.email : "";

	loadModal({title:"Add contact", html:"<div class='pad-1'>" +
			"<input id='contactid' type='hidden' value='"+id+"'/>" +
			"<div class='ui fluid input'>" +
			"<input id='contact-names' class='wix-textbox' type='text' value='"+names+"' placeholder='Full name'/>" +
			"</div> " +
			"<div class='ui fluid input' style='margin-top: 5px;'>" +
			"<input id='contact-phone' class='wix-textbox' type='text' value='"+phone+"' placeholder='Phone'/>" +
			"</div> " +
			"<div class='ui fluid input' style='margin-top: 5px;'>" +
			"<input id='contact-email' class='wix-textbox' type='text' value='"+email+"' placeholder='Email'/>" +
			"</div> " +
			"<div class='ui fluid input' style='margin-top: 5px;'>" +
			"<button id='contact-save-btn' class='ui sleak blue button' onclick='saveContact()'>" +
			"<i class='save icon'></i> Save</button>" +
			"</div> " +
			"</div>"});
}

function launchCustomList()
{
	loadModal({title:"Create contact list", html:"<div class='pad-1'>" +
			"<div class='ui fluid input'>" +
			"<input id='listid' type='hidden' value=''/> " +
			"<input id='custom-list-name' class='wix-textbox' type='text' placeholder='List name'/>" +
			"</div> " +
			"<div class='ui fluid input' style='margin-top: 5px;'>" +
			"<button id='custom-list-btn' class='ui sleak blue button' " +
			"onclick='saveCustomList()'><i class='save icon'></i> Save</button>" +
			"</div> " +
			"</div>"});
}

function saveCustomList()
{
	let request = {
		id:$("#listid").val(),
		name:$("#custom-list-name").val(),
		job:"save custom list"
	}

	if(request.name === "")
	{
		errorButton({btn:"custom-list-btn", msg:"Name is empty"});
	}
	else
	{
		loadingButton({btn:"custom-list-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"custom-list-btn", loading:false});

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#custom-list-btn").addClass("positive disabled");
					$("#custom-list-btn").html("<i class='check icon'></i> List saved");
					setTimeout(function(){
						$("#custom-list-btn").removeClass("positive disabled");
						$("#custom-list-btn").html("<i class='save icon'></i> Save");


					},3000);

					$("#listid").val("");
					$("#custom-list-name").val("");
				}
				else
				{
					errorButton({btn:"custom-list-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"custom-list-btn", msg:"Connection error"});
			}
		},request);
	}
}

function saveContact()
{
	let request = {
		id:$("#contactid").val(),
		names:$("#contact-names").val(),
		phone:$("#contact-phone").val(),
		email:$("#contact-email").val(),
		job:"save contact"
	};

	if((request.email === "") && (request.phone === ""))
	{
		errorButton({btn:"contact-save-btn", msg:"Phone and email are empty"});
	}
	else
	{
		loadingButton({btn:"contact-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"contact-save-btn", loading:false});

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#contact-save-btn").addClass("positive disabled");
					$("#contact-save-btn").html("<i class='check icon'></i> Contact saved");
					setTimeout(function(){
						$("#contact-save-btn").removeClass("positive disabled");
						$("#contact-save-btn").html("<i class='save icon'></i> Save");


					},3000);

					$("#contactid").val("");
					$("#contact-names").val("");
					$("#contact-phone").val("");
					$("#contact-email").val("");
				}
				else
				{
					errorButton({btn:"contact-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"contact-save-btn", msg:"Connection error"});
			}
		},request);
	}
}


let functionStore = null;
function selectCustomlist(func)
{
	functionStore = func;

	
	loadModal({title:"Custom contact list",
		html:"<div id='custom-list-con' class='pad-5 align-c'>" +
		"<div class='ui inline huge active loader'></div>" +
		"</div>",
		onLoaded:function(modalId){

		postJson("hms-admin/worker", function(data, status){
			$("#custom-list-con").html("");
			$("#custom-list-con").removeClass("pad-5");
			$("#custom-list-con").removeClass("align-c");
			//$("#custom-list-con").addClass("pad-1");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					if(d.data.length == 0)
					{
						let c = document.createElement("div");
						c.className = "pad-2";
						c.innerHTML = "<div >" +
							"<div class='align-c widget curve pad-2'>" +
							"<img src='"+host+"cdn/images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
							"<h6 class='sleak-b' style='color: dimgray;'>Custom contact list is empty</h6>" +
							"</div>"+
							"</div>";

						getElement("custom-list-con").appendChild(c);
					}
					for(let i = 0; i < d.data.length; i++)
					{
						let c = document.createElement("div");
						c.className = "minor-menu";
						c.id = d.data[i].Id+"-row";
						c.innerHTML = "<div class='w3-row'>" +
							"<div class='w3-col l11 m11 s11' onclick=\"cutomlistSelected('"+d.data[i].Id+"','"+modalId.modal+"','"+d.data[i].Name+"')\">" +
							"<h6 class='minor-menu pad-1' style='margin: 0px; " +
							"font-family: Lato;'>"+d.data[i].Name+" " +
							"<label class='ui circular small green-back label'>"+d.data[i].Itemcount+"</label></h6>" +
							"</div>" +
							"<div class='w3-col l1 m1 s1'>" +
							"<i id='"+d.data[i].Id+"-btn' class='trash red icon' style='cursor: pointer; margin-top: 10px;'" +
							" onclick=\"ConfirmContactcollectionDelete('"+d.data[i].Id+"')\"></i>" +
							"</div>" +
							"</div>";

						getElement("custom-list-con").appendChild(c);
					}
				}
				else
				{

				}
			}
			else
			{

			}
		}, {
			job:"get custom contacts list"
		});

	}});
}

function cutomlistSelected(e, modal, name)
{
	closeGenModal(modal, function(){
		if(typeof(functionStore) === "function")
		{
			functionStore(e, name);
		}
	});
}

function ConfirmContactcollectionDelete(e)
{
	ConfirmModal("All events and schedules using this list will be disabled. Would you like to continue?", function(choice, param){
		if(choice === true)
		{
			ContactcollectionListDelete(param);
		}
	}, null, null, e);
}

function ContactcollectionListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading spinner");
	$("#"+e+"-btn").removeClass("trash");
	DeleteContactcollection(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading spinner");
		$("#"+e+"-btn").addClass("trash");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('custom-list-con').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteContactcollection(e, func)
{
	let request = {};
	request.Contactcollectionid = e;
	request.job = "delete custom contact list";

	postJson("hms-admin/worker", function(data, status){
		if(status == "done")
		{
			let d = JSON.parse(data);

			if(d.status == "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function addToContactList(id, type)
{
	selectCustomlist(function(listid){
		let cnt = [];
		cnt.push(id+":"+type+":"+listid);
		addCustomContact(cnt);
	});
}

function populateCustomContactList(e)
{
	selectCustomlist(function(listid, listname){
		$("#custom-list-id").val(listid);
		$(".contact-list-menu").removeClass("active");
		$(".list-name-con").html("<small><small>(<small><i class='circle green icon'></i></small> "+listname+")</small></small>");
		$(e).addClass("active");
		populateContactList();
	});
}

function addCustomContact(contactArray)
{
	loadModal({titlebar:false, html:"<div class='pad-1'>" +
			"<div id='status-con' class='pad-5 align-c'>" +
			"<div class='ui active inline large loader'></div>" +
			"<h4 class='sleak'>Adding contact(s) to list</h4>" +
			"</div>" +
			"</div>", onLoaded:function(m){

		postJson("hms-admin/worker", function(data, status){
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#status-con").html("<div class=''>" +
						"<h1 class='ui header'><i class='check green icon'></i></h1>" +
						"<h4 class='sleak' style='font-weight: normal;'>Contact saved to list</h4></div>");
					setTimeout(function(){
						closeGenModal(m.modal);
					},2000);
				}
				else
				{

				}
			}
			else
			{

			}
		},{job:"save contact to list", property:$("#property-id").val(), data:contactArray});

		}});
}

function removeCustomContact(contactArray)
{
	loadModal({titlebar:false, html:"<div class='pad-1'>" +
			"<div id='status-con' class='pad-5 align-c'>" +
			"<div class='ui active inline large loader'></div>" +
			"<h4 class='sleak'>Removing contact(s) from list</h4>" +
			"</div>" +
			"</div>", onLoaded:function(m){

			postJson("hms-admin/worker", function(data, status){
				if(status === "done")
				{
					let d = JSON.parse(data);

					if(d.status === "success")
					{
						$("#status-con").html("<div class=''>" +
							"<h1 class='ui header'><i class='check green icon'></i></h1>" +
							"<h4 class='sleak' style='font-weight: normal;'>Contact(s) removed from list</h4></div>");
						setTimeout(function(){
							closeGenModal(m.modal);
						},2000);

						populateContactList();
					}
					else
					{

					}
				}
				else
				{

				}
			},{job:"delete contact from list", data:contactArray});

		}});
}

function ConfirmGroupContactDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Contacts?", function(choice){
		if(choice === true)
		{
			ContactGroupDelete();
		}
	});
}

function ConfirmContactDelete(e)
{
	ConfirmModal("Are you sure you want to delete the contact?", function(choice, param){
		if(choice === true)
		{
			ContactListDelete(param);
		}
	}, null, null, e);
}

function ContactGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteContact(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Contacts failed to delete");
		}
	}
	else
	{
		ShowModal("No Contacts were selected");
	}
}

function ContactListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeleteContact(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status === "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteContact(e, func)
{
	let request = {};
	request.Contactid = e;
	request.job = "delete contact";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) === "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}



function removeGroupContactfromList()
{
	if($("#contact-list-custom").hasClass("active"))
	{
		let cnt = [];

		let inps = document.getElementsByClassName("check-sel");

		let i = 0;
		for(; i < inps.length; i++)
		{
			if(inps[i].checked)
			{
				cnt.push(inps[i].getAttribute("s-data")+":"+$("#custom-list-id").val());
			}
		}

		if(cnt.length > 0)
		{
			removeCustomContact(cnt);
		}
		else
		{
			ShowModal("No contacts were selected. Select contacts and try again");
		}
	}
	else
	{
		ShowModal("Enter the custom list to remove contact items");
	}
}


function removeContactfromList(contactid, type)
{
	if($("#contact-list-custom").hasClass("active"))
	{
		let cnt = [];
		cnt.push(contactid+":"+type+":"+$("#custom-list-id").val());
		removeCustomContact(cnt);
	}
	else
	{
		ShowModal("Enter the custom list to remove contact items");
	}
}




//------------------------------------------- Review Logic----------------------------------


function addStarRating()
{
	let stop = 0;

	while(document.getElementById("review-items-"+stop) != null)
	{
		stop++;
	}


	getElement("review-dynamic-con").appendChild(div({add:"" +
			"<div class='widget w3-card curve pad-1' " +
			"style='margin-top: 5px; position: relative; width: 100%;'>" +
			"<button class='ui red icon circular small button' " +
			"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+stop+"')\">" +
			"<i class='times icon'></i>" +
			"</button>" +
			"<div class='ui form'>" +
			"<h5 style='color: dimgray;'><i class='green-text star icon' style='font-size: 16px;'></i>Star rating</h5>" +
			"<div class='field'>" +
			"<label style='color: dimgray; font-weight: normal;'>What would they be rating?</label>" +
			"<textarea id='review-question-"+stop+"' class='wix-textbox' placeholder='e.g How would you rate our food delivery service' rows='1'></textarea>" +
			"</div>" +
			"</div>" +
			"<div class='w3-row' style='margin-top: 5px;'>" +
			"<div class='w3-col l6 m6 s6'>" +
			"<h3 id='review-start-con-"+stop+"' style='margin-top: 10px;'>" +
			"<i class='star green-text icon'></i>" +
			"<i class='star green-text icon'></i>" +
			"<i class='star green-text icon'></i>" +
			"<i class='star green-text icon'></i>" +
			"</h3>" +
			"</div>" +
			"<div class='w3-col l6 m6 s6'>" +
			"<div class='ui labeled fluid input'>" +
			"<label class='ui sleak label'>Max start rating</label>" +
			"<input id='review-star-count-"+stop+"' " +
			"class='wix-textbox' type='number' min='2' max='10' " +
			"value='4' onchange=\"changeStarcount('"+stop+"')\"/>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>",
		id:"review-items-"+stop, class:"review-item",
		attrb:[{name:"item-number", value:stop},{name:"item-type", value:"star-rating"},{name:"item-id", value:""}]}));
}

function addHeartRating()
{
	let stop = 0;

	while(document.getElementById("review-items-"+stop) != null)
	{
		stop++;
	}


	getElement("review-dynamic-con").appendChild(div({add:"" +
			"<div class='widget w3-card curve pad-1' " +
			"style='margin-top: 5px; position: relative; width: 100%;'>" +
			"<button class='ui red icon circular small button' " +
			"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+stop+"')\">" +
			"<i class='times icon'></i>" +
			"</button>" +
			"<div class='ui form'>" +
			"<h5 style='color: dimgray;'><i class='red heart icon' style='font-size: 16px;'></i>Heart rating</h5>" +
			"<div class='field'>" +
			"<label style='color: dimgray; font-weight: normal;'>What would they be rating?</label>" +
			"<textarea id='review-question-"+stop+"' class='wix-textbox' " +
			"placeholder='e.g How much did you love our room service' rows='1'></textarea>" +
			"</div>" +
			"</div>" +
			"<div class='w3-row' style='margin-top: 5px;'>" +
			"<div class='w3-col l6 m6 s6'>" +
			"<h3 id='review-heart-con-"+stop+"' style='margin-top: 10px;'>" +
			"<i class='heart red icon'></i>" +
			"<i class='heart red icon'></i>" +
			"<i class='heart red icon'></i>" +
			"<i class='heart red icon'></i>" +
			"</h3>" +
			"</div>" +
			"<div class='w3-col l6 m6 s6'>" +
			"<div class='ui labeled fluid input'>" +
			"<label class='ui sleak label'>Max heart rating</label>" +
			"<input id='review-heart-count-"+stop+"' " +
			"class='wix-textbox' type='number' min='2' max='10' " +
			"value='4' onchange=\"changeHeartcount('"+stop+"')\"/>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>",
		id:"review-items-"+stop, class:"review-item",
		attrb:[{name:"item-number", value:stop},{name:"item-type", value:"heart-rating"},{name:"item-id", value:""}]}));
}

function addMutipleselect()
{
	let stop = 0;

	while(document.getElementById("review-items-"+stop) != null)
	{
		stop++;
	}


	getElement("review-dynamic-con").appendChild(div({add:"" +
			"<div class='widget w3-card curve pad-1' " +
			"style='margin-top: 5px; position: relative; width: 100%;'>" +
			"<button class='ui red icon circular small button' " +
			"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+stop+"')\">" +
			"<i class='times icon'></i>" +
			"</button>" +
			"<div class='ui form'>" +
			"<h5 style='color: dimgray;'><i class='check square icon' style='font-size: 16px;'></i>Multi Select</h5>" +
			"<div class='field'>" +
			"<label style='color: dimgray; font-weight: normal;'>What question would they be answering to</label>" +
			"<textarea id='review-question-"+stop+"' class='wix-textbox' " +
			"placeholder='e.g Select the areas you disliked in our hotel' rows='1'></textarea>" +
			"</div>" +
			"</div>" +
			"<div class='w3-row' style='margin-top: 5px;'>" +
			"<div class='w3-col l6 m6 s6'>" +
			"<div id='review-choice-0-"+stop+"-con' class='ui labeled small fluid input'>" +
			"<label class='ui sleak label'><i class='check square icon' style='font-size: 16px;'></i></label>" +
			"<input id='review-choice-0-"+stop+"' " +
			"class='wix-textbox multi-choice-collection-"+stop+"' type='text' placeholder='Write Option here' onkeyup=\"checkChoiceText('"+stop+"')\"/>" +
			"</div>" +
			"<div id='multiselect-choice-"+stop+"-con'></div>" +
			"</div>" +
			"</div>" +
			"</div>",
		id:"review-items-"+stop, class:"review-item",
		attrb:[{name:"item-number", value:stop},{name:"item-type", value:"multiple-select"},{name:"item-id", value:""}]}));
}

function addSingleselect()
{
	let stop = 0;

	while(document.getElementById("review-items-"+stop) != null)
	{
		stop++;
	}

	getElement("review-dynamic-con").appendChild(div({add:"" +
			"<div class='widget w3-card curve pad-1' " +
			"style='margin-top: 5px; position: relative; width: 100%;'>" +
			"<button class='ui red icon circular small button' " +
			"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+stop+"')\">" +
			"<i class='times icon'></i>" +
			"</button>" +
			"<div class='ui form'>" +
			"<h5 style='color: dimgray;'><i class='dot circle icon' style='font-size: 16px;'></i>Single Select</h5>" +
			"<div class='field'>" +
			"<label style='color: dimgray; font-weight: normal;'>What question would they be answering to</label>" +
			"<textarea id='review-question-"+stop+"' class='wix-textbox' " +
			"placeholder='e.g Which one of these are you allegic to?' rows='1'></textarea>" +
			"</div>" +
			"</div>" +
			"<div class='w3-row' style='margin-top: 5px;'>" +
			"<div class='w3-col l6 m6 s6'>" +
			"<div id='review-choice-0-"+stop+"-con' class='ui labeled small fluid input'>" +
			"<label class='ui sleak label'><i class='dot circle icon' style='font-size: 16px;'></i></label>" +
			"<input id='review-choice-0-"+stop+"' " +
			"class='wix-textbox single-choice-collection-"+stop+"' type='text' placeholder='Write Option here' onkeyup=\"checkSingleChoiceText('"+stop+"')\"/>" +
			"</div>" +
			"<div id='singleselect-choice-"+stop+"-con'></div>" +
			"</div>" +
			"</div>" +
			"</div>",
		id:"review-items-"+stop, class:"review-item",
		attrb:[{name:"item-number", value:stop},{name:"item-type", value:"single-select"},{name:"item-id", value:""}]}));
}

function addCommentbox()
{
	let stop = 0;

	while(document.getElementById("review-items-"+stop) != null)
	{
		stop++;
	}


	getElement("review-dynamic-con").appendChild(div({add:"" +
			"<div class='widget w3-card curve pad-1' " +
			"style='margin-top: 5px; position: relative; width: 100%;'>" +
			"<button class='ui red icon circular small button' " +
			"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+stop+"')\">" +
			"<i class='times icon'></i>" +
			"</button>" +
			"<div class='ui form'>" +
			"<h5 style='color: dimgray;'><i class='blue pencil icon' style='font-size: 16px;'></i>Comment box</h5>" +
			"<div class='field'>" +
			"<label style='color: dimgray; font-weight: normal;'>What question would they be answering to</label>" +
			"<textarea id='review-question-"+stop+"' class='wix-textbox' " +
			"placeholder='e.g Select the areas you disliked in our hotel' rows='1'></textarea>" +
			"</div>" +
			"</div>" +
			"<div style='margin-top: 5px;'>" +
			"<h5 class='sleak' style='color: dimgray;'>" +
			"<i class='pencil blue icon'></i> Customers will responde by typing their response</h5>" +
			"</div>" +
			"</div>",
		id:"review-items-"+stop, class:"review-item",
		attrb:[{name:"item-number", value:stop},{name:"item-type", value:"comment-box"},{name:"item-id", value:""}]}));
}

function changeStarcount(e)
{
	let num = Number(getElement("review-star-count-"+e).value);


	if(num > 10)
	{
		getElement("review-star-count-"+e).value = 10;
		num = 10;
	}
	if(num == NaN)
	{
		getElement("review-star-count-"+e).value = 4;
		num = 4;
	}
	if(num < 2)
	{
		getElement("review-star-count-"+e).value = 2;
		num = 2;
	}

	let cn = "";

	for(let i = 0; i < num; i++)
	{
		cn += "<i class='green star icon'></i>";
	}
	$("#review-start-con-"+e).html(cn);
}

function changeHeartcount(e)
{
	let num = Number(getElement("review-heart-count-"+e).value);


	if(num > 10)
	{
		getElement("review-heart-count-"+e).value = 10;
		num = 10;
	}
	if(num == NaN)
	{
		getElement("review-heart-count-"+e).value = 4;
		num = 4;
	}
	if(num < 2)
	{
		getElement("review-heart-count-"+e).value = 2;
		num = 2;
	}


	let cn = "";

	for(let i = 0; i < num; i++)
	{
		cn += "<i class='red heart icon'></i>";
	}
	$("#review-heart-con-"+e).html(cn);
}

function removeReviewItem(e)
{
	getElement("review-dynamic-con").removeChild(getElement("review-items-"+e));
}

function checkChoiceText(e)
{
	let i = 0;

	while(getElement("review-choice-"+i+"-"+e) != null)
	{
		i++;
	}

	if(i > 0)
	{
		if($("#review-choice-"+(i - 1)+"-"+e).val() !== "")
		{
			addMultiselectChoice(i, e);
		}
		else
		{
			if(i > 1)
			{
				if($("#review-choice-"+(i - 2)+"-"+e).val() === "")
				{
					removeMultiselectChoice((i - 1), e);
					checkChoiceText(e);
				}
			}
		}
	}
}

function checkSingleChoiceText(e)
{
	let i = 0;

	while(getElement("review-choice-"+i+"-"+e) != null)
	{
		i++;
	}

	if(i > 0)
	{
		if($("#review-choice-"+(i - 1)+"-"+e).val() !== "")
		{
			addSingleselectChoice(i, e);
		}
		else
		{
			if(i > 1)
			{
				if($("#review-choice-"+(i - 2)+"-"+e).val() === "")
				{
					removeSingleselectChoice((i - 1), e);
					checkSingleChoiceText(e);
				}
			}
		}
	}
}

function addMultiselectChoice(e, con)
{
	getElement("multiselect-choice-"+con+"-con").appendChild(div({
		add:"<label class='ui sleak label'><i class='check square icon' style='font-size: 16px;'></i></label>" +
			"<input class='wix-textbox multi-choice-collection-"+con+"' id='review-choice-"+e+"-"+con+"' " +
			"type='text' placeholder='Write Option here' onkeyup=\"checkChoiceText('"+con+"')\"/>",
		id:"review-choice-"+e+"-"+con+"-con", class:"ui labeled small fluid margin-t-t input"}));
}

function removeMultiselectChoice(e, con)
{
	getElement("multiselect-choice-"+con+"-con").removeChild(getElement("review-choice-"+e+"-"+con+"-con"));
}

function addSingleselectChoice(e, con)
{
	getElement("singleselect-choice-"+con+"-con").appendChild(div({
		add:"<label class='ui sleak label'><i class='dot circle icon' style='font-size: 16px;'></i></label>" +
			"<input class='wix-textbox single-choice-collection-"+con+"' id='review-choice-"+e+"-"+con+"' " +
			"type='text' placeholder='Write Option here' onkeyup=\"checkSingleChoiceText('"+con+"')\"/>",
		id:"review-choice-"+e+"-"+con+"-con", class:"ui labeled small fluid margin-t-t input"}));
}

function removeSingleselectChoice(e, con)
{
	getElement("singleselect-choice-"+con+"-con").removeChild(getElement("review-choice-"+e+"-"+con+"-con"));
}


function saveReview()
{
	let request = {
		reviewid:$("#review-id").val(),
		data:[],
		title:$("#review-title").val(),
		body:$("#review-body").val(),
		job:"save review"
	};

	let rev = document.getElementsByClassName("review-item");

	for(let i = 0; i < rev.length; i++)
	{
		let num = Number(rev[i].getAttribute("item-number"));

		request.data[i] = rev[i].getAttribute("item-id")+":"+rev[i].getAttribute("item-type")+":"+$("#review-question-"+num).val();

		let optionlist = "";
		if(rev[i].getAttribute("item-type") === "star-rating")
		{
			request.data[i] += ":"+$("#review-star-count-"+num).val();
		}
		if(rev[i].getAttribute("item-type") === "heart-rating")
		{
			request.data[i] += ":"+$("#review-heart-count-"+num).val();
		}
		if(rev[i].getAttribute("item-type") === "multiple-select")
		{
			let optionlist = document.getElementsByClassName("multi-choice-collection-"+i);

			for(let j = 0; j < optionlist.length; j++)
			{
				if(optionlist[j].value !== "")
				{
					request.data[i] += ":"+ optionlist[j].value;
				}
			}
		}
		if(rev[i].getAttribute("item-type") === "single-select")
		{
			let optionlist = document.getElementsByClassName("single-choice-collection-"+i);

			for(let j = 0; j < optionlist.length; j++)
			{
				if(optionlist[j].value !== "")
				{
					request.data[i] += ":"+ optionlist[j].value;
				}
			}
		}
	}



	if(request.title === "")
	{
		errorButton({btn:"review-save-btn", msg:"Title is empty"});
	}
	else if(request.body === "")
	{
		errorButton({btn:"review-save-btn", msg:"Body is empty"});
	}
	else if(request.data.length === 0)
	{
		errorButton({btn:"review-save-btn", msg:"No valid review item"});
	}
	else
	{
		loadingButton({btn:"review-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"review-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#review-dynamic-con").html("");
					$("#review-title").val("");
					$("#review-body").val("");

					$("#review-save-btn").html("<i class='check icon'></i> saved");
					$("#review-save-btn").addClass("positive disabled");
					setTimeout(function(){
						$("#review-save-btn").html("<i class='save icon'></i> Save review");
						$("#review-save-btn").removeClass("positive disabled");
					},3000);
				}
				else
				{
					errorButton({btn:"review-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"review-save-btn", msg:"Connection error"});
			}
		},request);
	}
}

function ConfirmGroupReviewDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Reviews?", function(choice){
		if(choice === true)
		{
			ReviewGroupDelete();
		}
	});
}

function ConfirmReviewDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Reviews?", function(choice, param){
		if(choice === true)
		{
			ReviewListDelete(param);
		}
	}, null, null, e);
}

function ReviewGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-row").transition('set looping').transition('pulse', '1000ms');
			DeleteReview(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-row").transition('remove looping');
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Reviews failed to delete");
		}
	}
	else
	{
		ShowModal("No Reviews were selected");
	}
}

function ReviewListDelete(e)
{
	//Loading animation here
	$("#"+e+"-row").transition('set looping').transition('pulse', '1000ms');
	DeleteReview(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-row").transition('remove looping');
		if(status == "done")
		{
			//Deletion success

			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteReview(e, func)
{
	let request = {};
	request.Reviewid = e;
	request.job = "delete review";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function loadEditReview(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#review-id").val(d.data.Review.Id);
				$("#review-title").val(d.data.Review.Title);
				$("#review-body").val(d.data.Review.Body);

				let con = "";
				for(let i = 0; i < d.data.Items.length; i++)
				{
					if(d.data.Items[i].Type == "star-rating")
					{
						getElement("review-dynamic-con").appendChild(div({add:"" +
								"<div class='widget w3-card curve pad-1' " +
								"style='margin-top: 5px; position: relative; width: 100%;'>" +
								"<button class='ui red icon circular small button' " +
								"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+i+"')\">" +
								"<i class='times icon'></i>" +
								"</button>" +
								"<div class='ui form'>" +
								"<h5 style='color: dimgray;'><i class='green-text star icon' style='font-size: 16px;'></i>Star rating</h5>" +
								"<div class='field'>" +
								"<label style='color: dimgray; font-weight: normal;'>What would they be rating?</label>" +
								"<textarea id='review-question-"+i+"' class='wix-textbox' placeholder='e.g How would you rate our food delivery service' rows='1'>"+d.data.Items[i].Question+"</textarea>" +
								"</div>" +
								"</div>" +
								"<div class='w3-row' style='margin-top: 5px;'>" +
								"<div class='w3-col l6 m6 s6'>" +
								"<h3 id='review-start-con-"+i+"' style='margin-top: 10px;'>" +
								"<i class='star green-text icon'></i>" +
								"<i class='star green-text icon'></i>" +
								"<i class='star green-text icon'></i>" +
								"<i class='star green-text icon'></i>" +
								"</h3>" +
								"</div>" +
								"<div class='w3-col l6 m6 s6'>" +
								"<div class='ui labeled fluid input'>" +
								"<label class='ui sleak label'>Max start rating</label>" +
								"<input id='review-star-count-"+i+"' " +
								"class='wix-textbox' type='number' min='2' max='10' " +
								"value='"+d.data.Items[i].Maxrating+"' onchange=\"changeStarcount('"+i+"')\"/>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>",
							id:"review-items-"+i, class:"review-item",
							attrb:[{name:"item-number", value:i},{name:"item-type", value:"star-rating"},{name:"item-id", value:d.data.Items[i].Id}]}));

						changeStarcount(i);
					}
					if(d.data.Items[i].Type == "heart-rating")
					{
						getElement("review-dynamic-con").appendChild(div({add:"" +
								"<div class='widget w3-card curve pad-1' " +
								"style='margin-top: 5px; position: relative; width: 100%;'>" +
								"<button class='ui red icon circular small button' " +
								"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+i+"')\">" +
								"<i class='times icon'></i>" +
								"</button>" +
								"<div class='ui form'>" +
								"<h5 style='color: dimgray;'><i class='red heart icon' style='font-size: 16px;'></i>Heart rating</h5>" +
								"<div class='field'>" +
								"<label style='color: dimgray; font-weight: normal;'>What would they be rating?</label>" +
								"<textarea id='review-question-"+i+"' class='wix-textbox' " +
								"placeholder='e.g How much did you love our room service' rows='1'>"+
								d.data.Items[i].Question+"</textarea>" +
								"</div>" +
								"</div>" +
								"<div class='w3-row' style='margin-top: 5px;'>" +
								"<div class='w3-col l6 m6 s6'>" +
								"<h3 id='review-heart-con-"+i+"' style='margin-top: 10px;'>" +
								"<i class='heart red icon'></i>" +
								"<i class='heart red icon'></i>" +
								"<i class='heart red icon'></i>" +
								"<i class='heart red icon'></i>" +
								"</h3>" +
								"</div>" +
								"<div class='w3-col l6 m6 s6'>" +
								"<div class='ui labeled fluid input'>" +
								"<label class='ui sleak label'>Max heart rating</label>" +
								"<input id='review-heart-count-"+i+"' " +
								"class='wix-textbox' type='number' min='2' max='10' " +
								"value='"+d.data.Items[i].Maxrating+"' onchange=\"changeHeartcount('"+i+"')\"/>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>",
							id:"review-items-"+i, class:"review-item",
							attrb:[{name:"item-number", value:i},{name:"item-type", value:"heart-rating"},{name:"item-id", value:d.data.Items[i].Id}]}));
						changeHeartcount(i);
					}
					if(d.data.Items[i].Type == "multiple-select")
					{
						con += "";

						getElement("review-dynamic-con").appendChild(div({add:"" +
								"<div class='widget w3-card curve pad-1' " +
								"style='margin-top: 5px; position: relative; width: 100%;'>" +
								"<button class='ui red icon circular small button' " +
								"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+i+"')\">" +
								"<i class='times icon'></i>" +
								"</button>" +
								"<div class='ui form'>" +
								"<h5 style='color: dimgray;'><i class='check square icon' style='font-size: 16px;'></i>Multi Select</h5>" +
								"<div class='field'>" +
								"<label style='color: dimgray; font-weight: normal;'>What question would they be answering to</label>" +
								"<textarea id='review-question-"+i+"' class='wix-textbox' " +
								"placeholder='e.g Select the areas you disliked in our hotel' rows='1'>"+
								d.data.Items[i].Question+"</textarea>" +
								"</div>" +
								"</div>" +
								"<div class='w3-row' style='margin-top: 5px;'>" +
								"<div class='w3-col l6 m6 s6'>" +
								"<div id='review-choice-0-"+i+"-con' class='ui labeled small fluid input'>" +
								"<label class='ui sleak label'><i class='check square icon' style='font-size: 16px;'></i></label>" +
								"<input id='review-choice-0-"+i+"' " +
								"class='wix-textbox multi-choice-collection-"+i+"' type='text' placeholder='Write Option here' onkeyup=\"checkChoiceText('"+i+"')\"/>" +
								"</div>" +
								"<div id='multiselect-choice-"+i+"-con'></div>" +
								"</div>" +
								"</div>" +
								"</div>",
							id:"review-items-"+i, class:"review-item",
							attrb:[{name:"item-number", value:i},{name:"item-type", value:"multiple-select"},{name:"item-id", value:d.data.Items[i].Id}]}));


						for(let j = 1; j < (d.data.Items[i].Options.length + 1); j++)
						{
							addMultiselectChoice(j, i);
						}
						for(let j = 0; j < d.data.Items[i].Options.length; j++)
						{
							getElement("review-choice-"+j+"-"+i).value  = d.data.Items[i].Options[j];
						}
					}
					if(d.data.Items[i].Type == "single-select")
					{
						con += "";

						getElement("review-dynamic-con").appendChild(div({add:"" +
								"<div class='widget w3-card curve pad-1' " +
								"style='margin-top: 5px; position: relative; width: 100%;'>" +
								"<button class='ui red icon circular small button' " +
								"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+i+"')\">" +
								"<i class='times icon'></i>" +
								"</button>" +
								"<div class='ui form'>" +
								"<h5 style='color: dimgray;'><i class='dot circle outline icon' style='font-size: 16px;'></i>Single Select</h5>" +
								"<div class='field'>" +
								"<label style='color: dimgray; font-weight: normal;'>What question would they be answering to</label>" +
								"<textarea id='review-question-"+i+"' class='wix-textbox' " +
								"placeholder='e.g Which one of these are you allegic to?' rows='1'>"+d.data.Items[i].Question+"</textarea>" +
								"</div>" +
								"</div>" +
								"<div class='w3-row' style='margin-top: 5px;'>" +
								"<div class='w3-col l6 m6 s6'>" +
								"<div id='review-choice-0-"+i+"-con' class='ui labeled small fluid input'>" +
								"<label class='ui sleak label'><i class='dot circle icon' style='font-size: 16px;'></i></label>" +
								"<input id='review-choice-0-"+i+"' " +
								"class='wix-textbox single-choice-collection-"+i+"' type='text' placeholder='Write Option here' onkeyup=\"checkSingleChoiceText('"+i+"')\"/>" +
								"</div>" +
								"<div id='singleselect-choice-"+i+"-con'></div>" +
								"</div>" +
								"</div>" +
								"</div>",
							id:"review-items-"+i, class:"review-item",
							attrb:[{name:"item-number", value:i},{name:"item-type", value:"single-select"},{name:"item-id", value:d.data.Items[i].Id}]}));

						for(let j = 1; j < (d.data.Items[i].Options.length + 1); j++)
						{
							addSingleselectChoice(j, i);
						}

						for(let j = 0; j < d.data.Items[i].Options.length; j++)
						{
							getElement("review-choice-"+j+"-"+i).value  = d.data.Items[i].Options[j];
						}
					}
					if(d.data.Items[i].Type == "comment-box")
					{
						getElement("review-dynamic-con").appendChild(div({add:"" +
								"<div class='widget w3-card curve pad-1' " +
								"style='margin-top: 5px; position: relative; width: 100%;'>" +
								"<button class='ui red icon circular small button' " +
								"style='position: absolute; right: -15px; top: -15px;' onclick=\"removeReviewItem('"+i+"')\">" +
								"<i class='times icon'></i>" +
								"</button>" +
								"<div class='ui form'>" +
								"<h5 style='color: dimgray;'><i class='blue pencil icon' style='font-size: 16px;'></i>Comment box</h5>" +
								"<div class='field'>" +
								"<label style='color: dimgray; font-weight: normal;'>What question would they be answering to</label>" +
								"<textarea id='review-question-"+i+"' class='wix-textbox' " +
								"placeholder='e.g Select the areas you disliked in our hotel' rows='1'>"+d.data.Items[i].Question+"</textarea>" +
								"</div>" +
								"</div>" +
								"<div style='margin-top: 5px;'>" +
								"<h5 class='sleak' style='color: dimgray;'>" +
								"<i class='pencil blue icon'></i> Customers will responde by typing their response</h5>" +
								"</div>" +
								"</div>",
							id:"review-items-"+i, class:"review-item",
							attrb:[{name:"item-number", value:i},{name:"item-type", value:"comment-box"},{name:"item-id", value:d.data.Items[i]}]}));
					}
				}
				//getElement("review-dynamic-con").appendChild(con);
			}
			else
			{
				location.hash  = "#customer-review";
				ShowModal(d.message);
			}
		}
		else
		{
			location.hash  = "#customer-review";
			ShowModal("Connectiont error. Unable to load review data");
		}
	},{reviewid:e, job:"get edit review"});
}

function loadReviewResponses(page)
{
	let request = {
		reviewid:$("#review-id-input").val(),
		Page:1,
		Perpage:25,
		job:"get taken review sessions"
	};

	if(Number(page) > 0)
	{
		request.Page = Number(page);
	}
	if($("#perpage").dropdown('get value') !== "")
	{
		request.Perpage = $("#perpage").dropdown('get value');
	}

	$("#customers-list").html("<div class='l-pad-2 s-pad-1'>" +
		"<div class='ui fluid placeholder'>" +
		"<div class='image header'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>" +

		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +

		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"</div>");

	$("#review-con").html(
		"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +
		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>" +

		"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +
		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>");

	postJson("hms-admin/worker", function(data, status){

		$("#customers-list").html("");
		$("#review-con").html("");

		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "loadReviewResponses"));

				let cusCon = "";

				for(let i = 0; i < d.data.length; i++)
				{
					cusCon += "<div class='pad-1 hoverable review-user-tab' " +
						"style='border-top: 1px solid lightgray; cursor: pointer;' " +
						"onclick=\"loadIndividualReview('"+d.data[i].Id+"')\"> "+
						(d.data[i].User.Id == '' ? "<i class='user circle red-text icon'></i> Unknown user"
							: "<i class='user circle blue icon'></i> "+d.data[i].User.Name + d.data[i].User.Surname)+"</div>";
				}

				if(d.data.length == 0)
				{
					cusCon = "<div class='align-c pad-2'>" +
						"<img src='"+host+"/cdn/images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
						"<h4 class='sleak' style='font-weight: bold; color: silver;'>No responses yet</h4>" +
						"</div>";

					$("#review-con").html(
						"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1'>" +
						"<div class='align-c pad-2'>" +
						"<img src='"+host+"/cdn/images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
						"<h4 class='sleak' style='font-weight: bold; color: silver;'>Data list is empty</h4>" +
						"</div>" +
						"</div>");
				}

				$("#customers-list").html("<div class='s-pad-1 l-pad-2'>" +
					"<h2 class='ui sleak header' style='font-weight: normal;'>" +
					"<i class='star blue icon' style='font-size: 40px;'></i> Customers review</h2><br/>" +
					"<h4 class='sleak' style='margin: 0px; color: gray; " +
					"line-height: 160%;'>Click on customer to view their response(s)</h4>" +
					"</div>" +
					"<div id='cus-con-list' style='margin-top: 10px;'>"+cusCon+"</div>");

				let tabs = document.getElementsByClassName("review-user-tab");

				if(tabs.length > 0)
				{
					tabs[0].click();
				}
			}
			else
			{

			}
		}
		else
		{

		}
	},request);
}

function loadReviewItem(page)
{
	let request = {
		itemid:$("#review-item-id-input").val(),
		Page:1,
		Perpage:25,
		job:"get review item list"
	};

	if(Number(page) > 0)
	{
		request.Page = Number(page);
	}
	if($("#perpage").dropdown('get value') !== "")
	{
		request.Perpage = $("#perpage").dropdown('get value');
	}

	$("#item-detail-con").html("<div class=''>" +
		"<div class='ui fluid placeholder'>" +
		"<div class='image header'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>" +

		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +

		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"</div>");

	$("#reply-list-con").html(
		"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +
		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>" +

		"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +
		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>");

	postJson("hms-admin/worker", function(data, status){

		$("#item-detail-con").html("");
		$("#reply-list-con").html("");

		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "loadReviewItem"));

				if(d.data.length == 0)
				{
					$("#reply-list-con").html(
						"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1'>" +
						"<div class='align-c pad-2'>" +
						"<img src='"+host+"/cdn/images/icons/pastel/empty_box.png' style='width: 60px;'/>" +
						"<h4 class='sleak' style='font-weight: bold; color: silver;'>Data list is empty</h4>" +
						"</div>" +
						"</div>");
				}

				$("#item-detail-con").html("<div class=''>" +
					"<h3 class='ui sleak header' style='font-weight: normal;'>" +
					"<i class='star blue icon' style='font-size: 30px;'></i> Item response list</h3><br/>" +
					"<h4 class='sleak blue-text' style='font-weight: bold;'>Question</h4>" +
					"<h4 class='sleak' style='margin: 0px; color: gray; " +
					"line-height: 160%;'>"+d.Item.Question+"</h4><br/>" +
					"<h4 class='sleak blue-text' style='font-weight: bold;'>Response</h4>" +
					"<h4 class='sleak' style='margin: 0px; color: gray; " +
					"line-height: 160%;'>"+numFormat(d.data.length)+"</h4>" +
					"</div>");

				for(let i = 0; i < d.data.length; i++)
				{
					if(d.data[i].Type == "star-rating")
					{
						getElement("reply-list-con").appendChild(div({
							add:
								"<div>" +
								"<h3>" +
								cloneItem("<i class='blue star icon'></i>", d.data[i].Rating) +
								cloneItem("<i class='star icon' style='color: lightgray;'></i>", (d.Item.Maxrating - d.data[i].Rating)) +
								"</h3>" +
								"<h6 class='sleak' style='float: right; margin: 0px; font-weight: bold; color: dimgray;'><small>"+
								d.data[i].Responsedate.WeekDay+", "+d.data[i].Responsedate.Day+"/"+
								d.data[i].Responsedate.MonthName+"/"+d.data[i].Responsedate.Year+"</small>" +
								"</h6>" +
								"<h6 class='sleak' style='color: dimgray; font-weight: bold;'>"+
								(d.data[i].User.Id == "" ? "<span class='red-text'>Unknown user</span>"
									: (d.data[i].User.Name+" "+d.data[i].User.Surname)+
								"&nbsp;&nbsp;&nbsp; <small><a href='' style='color: steelblue;'>" +
								"<i class='user circle icon'></i> Open profile</a></small>")+"</h6>" +
								"</div>", class: "pad-1 widget w3-card margin-t-xt curve"
						}));
					}

					if(d.data[i].Type == "heart-rating")
					{
						getElement("reply-list-con").appendChild(div({
							add:
								"<div>" +
								"<h3>" +
								cloneItem("<i class='red heart icon'></i>", d.data[i].Rating) +
								cloneItem("<i class='heart icon' style='color: lightgray;'></i>", (d.Item.Maxrating - d.data[i].Rating)) +
								"</h3>" +
								"<h6 class='sleak' style='float: right; margin: 0px; font-weight: bold; color: dimgray;'><small>"+
								d.data[i].Responsedate.WeekDay+", "+d.data[i].Responsedate.Day+"/"+
								d.data[i].Responsedate.MonthName+"/"+d.data[i].Responsedate.Year+"</small>" +
								"</h6>" +
								"<h6 class='sleak' style='color: dimgray; font-weight: bold;'>"+
								(d.data[i].User.Id == "" ? "<span class='red-text'>Unknown user</span>"
									: (d.data[i].User.Name+" "+d.data[i].User.Surname)+
									"&nbsp;&nbsp;&nbsp; <small><a href='' style='color: steelblue;'>" +
									"<i class='user circle icon'></i> Open profile</a></small>")+"</h6>" +
								"</div>", class: "pad-1 widget w3-card margin-t-xt curve"
						}));
					}

					if(d.data[i].Type == "comment-box")
					{
						getElement("reply-list-con").appendChild(div({
							add:
								"<div>" +
								"<h3>" +
								d.data[i].Comment +
								"</h3>" +
								"<h6 class='sleak' style='float: right; margin: 0px; font-weight: bold; color: dimgray;'><small>"+
								d.data[i].Responsedate.WeekDay+", "+d.data[i].Responsedate.Day+"/"+
								d.data[i].Responsedate.MonthName+"/"+d.data[i].Responsedate.Year+"</small>" +
								"</h6>" +
								"<h6 class='sleak' style='color: dimgray; font-weight: bold;'>"+
								(d.data[i].User.Id == "" ? "<span class='red-text'>Unknown user</span>"
									: (d.data[i].User.Name+" "+d.data[i].User.Surname)+
									"&nbsp;&nbsp;&nbsp; <small><a href='' style='color: steelblue;'>" +
									"<i class='user circle icon'></i> Open profile</a></small>")+"</h6>" +
								"</div>", class: "pad-1 widget w3-card margin-t-xt curve"
						}));
					}

					if(d.data[i].Type == "single-select")
					{
						let cdata = "";

						for(let j = 0; j < d.Item.Options.length; j++)
						{
							if(d.data[i].Options.length > 0)
							{
								if(d.data[i].Options[0] == d.Item.Options[j])
								{
									cdata += "<h6><i class='circle outline dot icon'></i> "+d.Item.Options[j]+"</h6>";
								}
								else
								{
									cdata += "<h6 style='color: silver;'><i class='circle outline icon'></i> "+d.Item.Options[j]+"</h6>";
								}
							}
							else
							{
								cdata += "<h6 style='color: silver;'><i class='circle outline icon'></i> "+d.Item.Options[j]+"</h6>";
							}
						}

						getElement("reply-list-con").appendChild(div({
							add:
								"<div>" +
								cdata +
								"<h6 class='sleak' style='float: right; margin: 0px; font-weight: bold; color: dimgray;'>" +
								"<small>"+
								d.data[i].Responsedate.WeekDay+", "+d.data[i].Responsedate.Day+"/"+
								d.data[i].Responsedate.MonthName+"/"+d.data[i].Responsedate.Year+
								"</small>" +
								"</h6>" +
								"<h6 class='sleak' style='color: dimgray; font-weight: bold;'>"+
								(d.data[i].User.Id == "" ? "<span class='red-text'>Unknown user</span>"
									: (d.data[i].User.Name+" "+d.data[i].User.Surname)+
									"&nbsp;&nbsp;&nbsp; <small><a href='' style='color: steelblue;'>" +
									"<i class='user circle icon'></i> Open profile</a></small>")+"</h6>" +
								"</div>", class: "pad-1 widget w3-card margin-t-xt curve"
						}));
					}

					if(d.data[i].Type == "multiple-select")
					{
						let cdata = "";

						for(let j = 0; j < d.Item.Options.length; j++)
						{
							if(d.data[i].Options.includes(d.Item.Options[j]))
							{
								cdata += "<h6><i class='square check outline icon'></i> "+d.Item.Options[j]+"</h6>";
							}
							else
							{
								cdata += "<h6 style='color: silver;'><i class='square outline icon'></i> "+d.Item.Options[j]+"</h6>";
							}
						}

						getElement("reply-list-con").appendChild(div({
							add:
								"<div>" +
								cdata +
								"<h6 class='sleak' style='float: right; margin: 0px; font-weight: bold; color: dimgray;'><small>"+
								d.data[i].Responsedate.WeekDay+", "+d.data[i].Responsedate.Day+"/"+
								d.data[i].Responsedate.MonthName+"/"+d.data[i].Responsedate.Year+"</small>" +
								"</h6>" +
								"<h6 class='sleak' style='color: dimgray; font-weight: bold;'>"+
								(d.data[i].User.Id == "" ? "<span class='red-text'>Unknown user</span>"
									: (d.data[i].User.Name+" "+d.data[i].User.Surname)+
									"&nbsp;&nbsp;&nbsp; <small><a href='' style='color: steelblue;'>" +
									"<i class='user circle icon'></i> Open profile</a></small>")+"</h6>" +
								"</div>", class: "pad-1 widget w3-card margin-t-xt curve"
						}));
					}
				}

			}
			else
			{

			}
		}
		else
		{

		}
	},request);
}

function loadIndividualReview(e)
{
	$("#review-con").html(
		"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +
		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>" +

		"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +
		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>");

	postJson("hms-admin/worker", function(data, status)
	{

		$("#review-con").html("");

		if (status === "done")
		{
			let d = JSON.parse(data);

			if (d.status === "success")
			{
				let cusCon = "<div class='widget w3-card curve pad-1'>" +
					"<h3 class='sleak' style='margin-top: 10px;'>"+
					(d.User.Id == "" ? "<i class='red-text user circle icon'></i> Unknown user"
						: "<i class='blue-text user circle icon'></i> "+d.User.Name +" "+ d.User.Surname)+"</h3>" +
					"<h6 class='sleak'>Sent: <b><small>"+d.Session.Created.WeekDay+", "+d.Session.Created.Day+"/"+
					d.Session.Created.Month+"/"+d.Session.Created.Year+"</small></b></h6>" +
					"<h6 class='sleak'>Responded: <b><small>"+d.Session.Responsedate.WeekDay+", "+d.Session.Responsedate.Day+"/"+
					d.Session.Responsedate.Month+"/"+d.Session.Responsedate.Year+"</small></b></h6>" +
					"<h6 class='sleak'>Channel: <b>"+
					(d.Session.Responsechannel == "" ? "Unknown" : d.Session.Responsechannel)+"</b></h6>" +
					"</div>";

				for(i = 0; i < d.data.length; i++)
				{
					if(d.data[i].Item.Type == "star-rating")
					{
						cusCon += "<div class='widget pad-1 w3-card curve' style='margin-top: 3px;'>" +
							"<h6 class='sleak'>" +
							"<i class='star icon' style='color: silver;'></i> Star rating" +
							"</h6>" +
							"<h6 class='sleak' style='font-weight: bold;'>" +
							d.data[i].Item.Question +
							"</h6>" +
							"<h4 class=''>"+
							cloneItem("<i class='blue star icon'></i>", d.data[i].Rating)+
							cloneItem("<i class='star icon' style='color: lightgray;'></i>",
								(d.data[i].Item.Maxrating - d.data[i].Rating))+
							"</h4>" +
							"</div>";
					}
					if(d.data[i].Item.Type == "heart-rating")
					{
						cusCon += "<div class='widget pad-1 w3-card curve' style='margin-top: 3px;'>" +
							"<h6 class='sleak'>" +
							"<i class='heart icon' style='color: silver;'></i> Heart rating" +
							"</h6>" +
							"<h6 class='sleak' style='font-weight: bold;'>" +
							d.data[i].Item.Question +
							"</h6>" +
							"<h4 class=''>"+
							cloneItem("<i class='red heart icon'></i>", d.data[i].Rating)+
							cloneItem("<i class='heart icon' style='color: lightgray;'></i>",
								(d.data[i].Item.Maxrating - d.data[i].Rating))+
							"</h4>" +
							"</div>";
					}
					if(d.data[i].Item.Type == "single-select")
					{
						cusCon += "<div class='widget pad-1 w3-card curve' style='margin-top: 3px;'>" +
							"<h6 class='sleak'>" +
							"<i class='circle dot outline icon' style='color: silver;'></i> Single select" +
							"</h6>" +
							"<h6 class='sleak' style='font-weight: bold;'>" +
							d.data[i].Item.Question +
							"</h6>";

						for(let j = 0; j < d.data[i].Item.Options.length; j++)
						{
							if(d.data[i].Options.length > 0)
							{
								if(d.data[i].Item.Options[j] == d.data[i].Options[0])
								{
									cusCon += "<h6><i class='dot circle outline icon'></i> "+d.data[i].Item.Options[j]+"</h6>";
								}
								else
								{
									cusCon += "<h6 style='color: lightgray;'><i class='circle outline icon'></i> "+d.data[i].Item.Options[j]+"</h6>";
								}
							}
							else
							{
								cusCon += "<h6 style='color: lightgray;'><i class='circle outline icon'></i> "+d.data[i].Item.Options[j]+"</h6>";
							}
						}
						cusCon +="</div>";
					}
					if(d.data[i].Item.Type == "multiple-select")
					{
						cusCon += "<div class='widget pad-1 w3-card curve' style='margin-top: 3px;'>" +
							"<h6 class='sleak'>" +
							"<i class='check square outline icon' style='color: silver;'></i> Multiple select" +
							"</h6>" +
							"<h6 class='sleak' style='font-weight: bold;'>" +
							d.data[i].Item.Question +
							"</h6>";

						for(let j = 0; j < d.data[i].Item.Options.length; j++)
						{
							if(d.data[i].Options.includes(d.data[i].Item.Options[j]))
							{
								cusCon += "<h6><i class='check square outline icon'></i> "+d.data[i].Item.Options[j]+"</h6>";
							}
							else
							{
								cusCon += "<h6 style='color: lightgray;'><i class='square outline icon'></i> "+d.data[i].Item.Options[j]+"</h6>";
							}
						}
						cusCon +="</div>";
					}
					if(d.data[i].Item.Type == "comment-box")
					{
						cusCon += "<div class='widget pad-1 w3-card curve' style='margin-top: 3px;'>" +
							"<h6 class='sleak'>" +
							"<i class='edit cursor icon' style='color: silver;'></i> Star rating" +
							"</h6>" +
							"<h6 class='sleak' style='font-weight: bold;'>" +
							d.data[i].Item.Question +
							"</h6>" +
							"<h5 style='color: dimgray;'>"+d.data[i].Comment+"</h5>" +
							"</div>";
					}
				}
				$("#review-con").html(cusCon);
			}
		}
	},{job:"get review session", sessionid:e});
}

function loadReview(e)
{
	$("#review-info").html("<div class='ui fluid placeholder'>" +
		"<div class='image header'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>" +

		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +

		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder s-hide'><div class='line'></div><div class='line'></div></div>");

	$("#review-body").html(
		"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +
		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>" +

		"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +
		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>");

	postJson("hms-admin/worker", function(data, status){

		$("#review-body").html("");
		$("#review-info").html("");

		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#review-info").html("<h2 class='ui sleak header' style='margin-top: 20px; font-weight: normal;'>" +
					"<i class='pie chart blue icon' style='font-size: 40px;'></i> Review responses</h2><br/>" +
					"<h3 style='margin: 0px;'><i class='i cursor green icon'></i> "+
					d.data.Review.Title+"</h3><br/>" +
					"<h4 class='sleak' style='margin: 0px; margin-top: 10px; color: gray; " +
					"line-height: 160%;'> "+
					d.data.Review.Body+"</h4><br/>" +
					"<hr  style='margin: 0px; padding: 0px;'/>" +
					"<h6 class='sleak' style='font-weight: bold;'>Response channels</h6>" +
					"<div class='l-width-8 sleak' style='margin: auto;' id='channel-distribution'></div>" +
					"<hr style='margin: 0px; padding: 0px;'/>" +
					"<div class='w3-row'>" +
					"<div class='w3-col l6 m6 s6'>" +
					"<div class='align-c pad-2'>" +
					"<h1 id='review-sent-count' class='sleak blue-text' style='font-family: 40px;'>"+d.data.Sent+"</h1>" +
					"<h6 class='sleak'>Sent</h6>" +
					"</div>" +
					"</div>" +
					"<div class='w3-col l6 m6 s6'>" +
					"<div class='align-c pad-2'>" +
					"<h1 class='sleak blue-text' style='font-family: 40px;'>"+d.data.Responded+"</h1>" +
					"<h6 class='sleak'>Responses</h6>" +
					"</div>" +
					"</div>" +
					"</div>" +
					"<div>" +
					"<a href='#review-response-list/"+e+"'>" +
					"<button class='ui sleak basic button' style='margin: 0px; color: dimgray; font-weight: bold;'>" +
					"Individual responses" +
					"</button>" +
					"</a>" +
					"</div>");



				if((d.data.Viasms == 0) && (d.data.Viaemail == 0) && (d.data.Unknownsource == 0))
				{
					Morris.Donut({
						element: 'channel-distribution',
						data: [
							{value: 100, label: 'No Data Yet', formatted: '0%' }
						],
						TextColor:"dimgray",
						resize:true,
						colors:['whitesmoke'],
						formatter: function (x, data) { return data.formatted; }
					});
				}
				else
				{
					let sourceTot = (d.data.Viasms + d.data.Viaemail + d.data.Unknownsource);

					console.log("sms total: " + d.data.Viasms);
					console.log("email total: " + d.data.Viaemail);
					console.log("Unknown total: " + d.data.Unknownsource);

					let sms = ((d.data.Viasms / sourceTot) * (100.0 / 1));
					let email = ((d.data.Viaemail / sourceTot) * (100.0 / 1));
					let unknown = ((d.data.Unknownsource / sourceTot) * (100.0 / 1));

					console.log(sms);
					console.log(email);
					console.log(unknown);

					Morris.Donut({
						element: 'channel-distribution',
						data: [
							{value: sms, label: 'SMS', formatted: sms.toFixed(1)+'%' },
							{value: email, label: 'EMail', formatted: email.toFixed(1)+'%' },
							{value: unknown, label: 'Unknown', formatted: unknown.toFixed(1)+'%' }
						],
						TextColor:"dimgray",
						resize:true,
						colors:['rgb(64,153,255)','whitesmoke','maroon'],
						formatter: function (x, data) { return data.formatted; }
					});
				}




				for(let i = 0; i < d.data.Items.length; i++)
				{
					let itemType = "";

					if(d.data.Items[i].Type === "star-rating")
					{
						let percentage = 0;
						let x = "";
						let tot = 0;

						for(let j = 0; j < d.data.Items[i].Maxrating; j++)
						{
							if(d.data.Items[i].Ratedtotal > 0)
							{
								percentage = Math.round((d.data.Items[i].Rated[j] / d.data.Items[i].Ratedtotal) * (100.0 / 1));
							}

							x += "<div class='w3-row'>" +
								"<div class='w3-col l1 m1 s1'>" +
								"<h6 class='sleak' style='margin: 0px; font-weight: bold;'>"+(j + 1)+"</h6>" +
								"</div>" +
								"<div class='w3-col l10 m10 s10'>" +
								"<div class='ui tiny blue progress' style='margin-top: 5px;'>" +
								"<div class='bar' style='width: "+percentage+"%;'></div>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l1 m1 s1 align-r'>" +
								"<h6 class='sleak' style='margin: 0px; font-weight: bold;'>" +
								"<small>"+percentage+"%</small></h6>" +
								"</div>" +
								"</div>";

							tot += (percentage * (j + 1));
						}

						getElement("review-body").appendChild(div({add:
								"<div class='widget w3-card curve pad-1 margin-b-t'>" +
								"<div class=''>" +
								"<div class='w3-row'>" +
								"<div class='w3-col l3 m3 s4' style='color: transparent;'>.</div>" +
								"<div class='w3-col l9 m9 s8'>" +



								"<div style='float: right;' class='ui right top pointing dropdown'>" +
								"<div class=''><i class='angle down icon'></i></div>" +
								"<div class='menu'>" +
								"<div class='item' onclick=\"showGraph('"+d.data.Items[i].Id+"')\"><i class='area chart icon'></i> Periodic change</div>" +
								"<a href='#review-item-listing/"+d.data.Items[i].Id+"' class='item'>" +
								"<i class='list icon'></i> List rating</a>" +
								"</div>" +
								"</div> " +



								"<div class='l-pad-t-2 l-pad-b-2'>" +
								"<p class='sleak' style='font-size: 16px; font-weight: bold;'>"+
								d.data.Items[i].Question+"</p>" +
								"</div>" +

								"</div>" +
								"</div>" +
								"<div class='w3-row'>" +
								"<div class='w3-col l3 s3 m4 align-c'>" +
								"<h1 class='sleak' style='margin: 0px; margin-top: 20px;'>"+Number(tot / 100.0).toFixed(1)+"</h1>" +
								"<h6 class='sleak' style='font-weight: bold; margin: 0px; margin-bottom: 20px;'>" +
								"<i class='star blue-text icon'></i> Star rating" +
								"</h6>" +
								"</div>" +
								"<div class='w3-col l9 s9 m8'>" +
								"<div class='l-width-xl'>" +
								x +
								"</div>" +
								"</div>" +
								"</div>"+
								"</div>" +
								"</div>"}));
					}
					if(d.data.Items[i].Type === "heart-rating")
					{
						let x = "";

						let percentage = 0;

						let tot = 0;

						for(let j = 0; j < d.data.Items[i].Maxrating; j++)
						{

							if(d.data.Items[i].Ratedtotal > 0)
							{
								percentage = Math.round((d.data.Items[i].Rated[j] / d.data.Items[i].Ratedtotal) * (100.0 / 1));
							}

							x += "<div class='w3-row'>" +
								"<div class='w3-col l1 m1 s1'>" +
								"<h6 class='sleak' style='margin: 0px; font-weight: bold;'>"+(j + 1)+"</h6>" +
								"</div>" +
								"<div class='w3-col l10 m10 s10'>" +
								"<div class='ui tiny blue progress' style='margin-top: 5px;'>" +
								"<div class='bar' style='width: "+percentage+"%;'></div>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l1 m1 s1 align-r'>" +
								"<h6 class='sleak' style='margin: 0px; font-weight: bold;'>" +
								"<small>"+percentage+"%</small></h6>" +
								"</div>" +
								"</div>";

							tot += (percentage * (j + 1));
						}

						getElement("review-body").appendChild(div({add:
								"<div class='widget w3-card curve pad-1 margin-b-t'>" +
								"<div class=''>" +
								"<div class='w3-row'>" +
								"<div class='w3-col l3 m3 s4' style='color: transparent;'>.</div>" +
								"<div class='w3-col l9 m9 s8'>" +


								"<div style='float: right;' class='ui right top pointing dropdown'>" +
								"<div class=''><i class='angle down icon'></i></div>" +
								"<div class='menu'>" +
								"<div class='item' onclick=\"showGraph('"+d.data.Items[i].Id+"')\"><i class='area chart icon'></i> Periodic change</div>" +
								"<a href='#review-item-listing/"+d.data.Items[i].Id+"' class='item'>" +
								"<i class='list icon'></i> List rating</a>" +
								"</div>" +
								"</div> " +


								"<div class='l-pad-t-2 l-pad-b-2'>" +
								"<p class='sleak' style='font-size: 16px; font-weight: bold;'>"+
								d.data.Items[i].Question+"</p>" +
								"</div>" +

								"</div>" +
								"</div>" +
								"<div class='w3-row'>" +
								"<div class='w3-col l3 s3 m4 align-c'>" +
								"<h1 class='sleak' style='margin: 0px; margin-top: 20px;'>"+Number(tot / 100.0).toFixed(1)+"</h1>" +
								"<h6 class='sleak' style='font-weight: bold; margin: 0px; margin-bottom: 20px;'>" +
								"<i class='heart red-text icon'></i> Heart rating" +
								"</h6>" +
								"</div>" +
								"<div class='w3-col l9 s9 m8'>" +
								"<div class='l-width-xl'>" +
								x +
								"</div>" +
								"</div>" +
								"</div>"+
								"</div>" +
								"</div>"}));
					}
					if(d.data.Items[i].Type === "multiple-select")
					{
						let x = "";

						let percentage = 0;

						let tot = 0;

						for(let j = 0; j < d.data.Items[i].Options.length; j++)
						{
							if(d.data.Items[i].Ratedtotal > 0)
							{
								percentage = Math.round((d.data.Items[i].Rated[d.data.Items[i].Options[j]] / d.data.Items[i].Ratedtotal) * (100.0 / 1));
							}

							x += "<div class='w3-row'>" +
								"<div class='w3-col l3 m3 s3'>" +
								"<h6 class='sleak' style='margin: 0px; font-weight: bold;'>"+d.data.Items[i].Options[j]+"</h6>" +
								"</div>" +
								"<div class='w3-col l8 m8 s8'>" +
								"<div class='ui tiny blue progress' style='margin-top: 5px;'>" +
								"<div class='bar' style='width: "+percentage+"%;'></div>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l1 m1 s1 align-r'>" +
								"<h6 class='sleak' style='margin: 0px; font-weight: bold;'>" +
								"<small>"+percentage+"%</small></h6>" +
								"</div>" +
								"</div>";
						}

						getElement("review-body").appendChild(div({add:
								"<div class='widget w3-card curve pad-1 margin-b-t'>" +
								"<div class=''>" +




								"<div style='float: right;' class='ui right top pointing dropdown'>" +
								"<div class=''><i class='angle down icon'></i></div>" +
								"<div class='menu'>" +
								"<div class='item' onclick=\"showGraph('"+d.data.Items[i].Id+"')\"><i class='area chart icon'></i> Periodic change</div>" +
								"<a href='#review-item-listing/"+d.data.Items[i].Id+"' class='item'>" +
								"<i class='list icon'></i> List rating</a>" +
								"</div>" +
								"</div> " +



								"<div class='w3-row'>" +
								"<div class='w3-col l1 m1 s1' style='color: transparent;'>.</div>" +
								"<div class='w3-col l9 m9 s8'>" +
								"<div class=''>" +
								"<h6 class='sleak' style='font-weight: bold;'>" +
								"<i class='check square outline icon' style='color: silver;'></i> Multiple select" +
								"</h6>" +
								"</div>"+
								"<div class='l-pad-t-2 l-pad-b-2'>" +
								"<p class='sleak' style='font-size: 16px; font-weight: bold;'>"+
								d.data.Items[i].Question+"</p>" +
								"</div>" +

								"</div>" +
								"</div>" +
								"<div class='w3-row'>" +
								"<div class='w3-col l1 s1 m12 align-c' style='color: transparent;'>.</div>" +
								"<div class='w3-col l11 s11 m12'>" +
								"<div class='l-width-xl'>" +
								x +
								"</div>" +
								"</div>" +

								"</div>"+
								"</div>" +
								"</div>"}));
					}
					if(d.data.Items[i].Type === "single-select")
					{
						let x = "";

						let percentage = 0;

						let tot = 0;

						for(let j = 0; j < d.data.Items[i].Options.length; j++)
						{
							if(d.data.Items[i].Ratedtotal > 0)
							{
								percentage = Math.round((d.data.Items[i].Rated[d.data.Items[i].Options[j]] / d.data.Items[i].Ratedtotal) * (100.0 / 1));
							}

							x += "<div class='w3-row'>" +
								"<div class='w3-col l3 m3 s3'>" +
								"<h6 class='sleak' style='margin: 0px; font-weight: bold;'>"+d.data.Items[i].Options[j]+"</h6>" +
								"</div>" +
								"<div class='w3-col l8 m8 s8'>" +
								"<div class='ui tiny blue progress' style='margin-top: 5px;'>" +
								"<div class='bar' style='width: "+percentage+"%;'></div>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l1 m1 s1 align-r'>" +
								"<h6 class='sleak' style='margin: 0px; font-weight: bold;'>" +
								"<small>"+percentage+"%</small></h6>" +
								"</div>" +
								"</div>";
						}

						getElement("review-body").appendChild(div({add:
								"<div class='widget w3-card curve pad-1 margin-b-t'>" +
								"<div class=''>" +


								"<div style='float: right;' class='ui right top pointing dropdown'>" +
								"<div class=''><i class='angle down icon'></i></div>" +
								"<div class='menu'>" +
								"<div class='item' onclick=\"showGraph('"+d.data.Items[i].Id+"')\"><i class='area chart icon'></i> Periodic change</div>" +
								"<a href='#review-item-listing/"+d.data.Items[i].Id+"' class='item'>" +
								"<i class='list icon'></i> List rating</a>" +
								"</div>" +
								"</div> " +


								"<div class='w3-row'>" +
								"<div class='w3-col l1 m1 s1' style='color: transparent;'>.</div>" +
								"<div class='w3-col l9 m9 s8'>" +
								"<div class=''>" +
								"<h6 class='sleak' style='font-weight: bold;'>" +
								"<i class='dot circle outline icon' style='color: silver;'></i> Single select" +
								"</h6>" +
								"</div>"+
								"<div class='l-pad-t-2 l-pad-b-2'>" +
								"<p class='sleak' style='font-size: 16px; font-weight: bold;'>"+
								d.data.Items[i].Question+"</p>" +
								"</div>" +

								"</div>" +
								"</div>" +
								"<div class='w3-row'>" +
								"<div class='w3-col l1 s1 m12 align-c' style='color: transparent;'>.</div>" +
								"<div class='w3-col l11 s11 m12'>" +
								"<div class='l-width-xl'>" +
								x +
								"</div>" +
								"</div>" +

								"</div>"+
								"</div>" +
								"</div>"}));
					}
					if(d.data.Items[i].Type === "comment-box")
					{
						let com = "";

						for(let j = 0; j < d.data.Items[i].Commentlist.length; j++)
						{
							com += "<hr/><div><p>"+d.data.Items[i].Commentlist[j]+"</p></div>";

							if(j > 1) {break;}
						}
						getElement("review-body").appendChild(div({add:
								"<div class='w3-row widget w3-card curve l-pad-2 s-pad-1 margin-b-t'>" +


								"<div style='float: right;' class='ui right top pointing dropdown'>" +
								"<div class=''><i class='angle down icon'></i></div>" +
								"<div class='menu'>" +
								"<a href='#review-item-listing/"+d.data.Items[i].Id+"' class='item'>" +
								"<i class='list icon'></i> List rating</a>" +
								"</div>" +
								"</div> " +


								"<div class=''>" +
								"<h6 class='sleak' style='font-weight: bold;'>" +
								"<i class='i cursor icon' style='color: silver;'></i> Comment box" +
								"</h6>" +
								"<div>" +
								"<div class='l-pad-t-1 l-pad-b-2 s-pad-t-1 s-pad-b-1'>" +
								"<p class='sleak' style='font-size: 16px; font-weight: bold;'>"+
								d.data.Items[i].Question+"</p>" +
								"</div>" +
								"</div>" +
								"<div style='max-height: 300px;'>" +
								com +
								"</div>"+
								"</div>" +
								"</div>"}));
					}
				}

				$(".ui.dropdown").dropdown();


			}
			else
			{

			}
		}
		else
		{

		}
	},{job:"get review",reviewid:e});
}

function createLink(e)
{
	loadModal({title:"Create link",
		html:"<div class='pad-1'>" +
			"<div class='ui labeled fluid input'>" +
			"<label class='ui icon label'><i class='linkify icon'></i></label>" +
			"<input id='review-id-code' type='hidden' value='"+e+"'/> " +
			"<input id='review-link' type='text' value='http://"+location.host+"/review/{review["+e+"]}/sms'/></div>" +
			"<div class='w3-row' style='margin-top: 10px;'>" +
			"<div class='w3-col l5 m5 s5'>" +
			"<label><input class='with-gap' type='radio' name='email-type' checked onchange=\"channelChanged('sms','"+e+"')\"/>" +
			"<span>SMS</span></label>" +
			"</div>" +
			"<div class='w3-col l5 m5 s5'>" +
			"<label><input class='with-gap' type='radio' name='email-type' onchange=\"channelChanged('email','"+e+"')\"/>" +
			"<span>Email</span></label>" +
			"</div>" +
			"</div>" +
			"<div style='margin-top: 10px;'>" +
			"<button class='ui blue button' onclick='copyLink()'><i class='clone icon'></i> Copy</button>" +
			"</div>" +
			"</div>"});
}

function channelChanged(a, e)
{
	$("#review-link").val("http://"+location.host+"/review/{review["+e+"]}/"+a);
}

function copyLink()
{
	copyToClipboard($("#review-link").val(), function(){
		dropNotification("Link copied successfully!");
	});
}

function createButton(e)
{
	loadModal({title:"Create link",
		html:"<div class='pad-1'>" +
			"<input id='review-id-code' type='hidden' value='"+e+"'/> " +

			"<div class='ui form'>" +
			"<div class='field'>" +
			"<textarea id='review-link' class='wix-textbox' rows='2'></textarea>" +
			"</div>" +
			"</div>" +

			"<div class='ui labeled input' style='margin-top: 10px;'>" +
			"<label class='ui label'>Button text</label>" +
			"<input id='button-text' class='wix-textbox' type='text' value='Click here' " +
			"onchange='buttonBuilder()' onkeyup='buttonBuilder()'/> " +
			"</div>" +

			"<div class='ui labeled input' style='margin-top: 10px;'>" +
			"<label class='ui label'>Button color</label>" +
			"<input id='button-color' type='text' value='#08F' onchange='buttonBuilder()'/> " +
			"</div>" +

			"<div style='margin-top: 10px;'>" +
			"<button class='ui blue button' onclick='copyLink()'><i class='clone icon'></i> Copy</button>" +
			"</div>" +
			"</div>", onLoaded:function(){

			let col = new Huebee(getElement("button-color"), {onChange:function(){alert("Year");}});
			col.on("change", function(){
				buttonBuilder();
			});
			buttonBuilder();
		}});
}

function buttonBuilder()
{
	$("#review-link").val("<a href='https://"+location.host+"/review/{review["+$("#review-id-code").val()+"]}/email'>" +
		"<button style='color: white; border: none; cursor: pointer; background-color: "
		+$("#button-color").val()+"; padding: 10px; border-radius: 3px;'>"+
		$("#button-text").val()+"</button></a>");
}




//-------------------------------------------------- Message Logic ---------------------------

function selectMessagetab(e)
{
	$(".message-menu-item").removeClass("active");
	$(e).addClass("active");
	populateReceivedMessages();
}

function ConfirmGroupMessageDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Messages?", function(choice){
		if(choice === true)
		{
			MessageGroupDelete();
		}
	});
}

function ConfirmMessageDelete(e)
{
	ConfirmModal("Are you sure you want to delete the Message?", function(choice, param){
		if(choice === true)
		{
			MessageListDelete(param);
		}
	}, null, null, e);
}

function MessageGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading spinner");
			$("#"+lst[i].id+"-btn").removeClass("trash");
			DeleteMessage(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading spinner");
				$("#"+lst[i].id+"-btn").addClass("trash");
				if(status === "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Messages failed to delete");
		}
	}
	else
	{
		ShowModal("No Messages were selected");
	}
}

function MessageListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading spinner");
	$("#"+e+"-btn").removeClass("trash");
	DeleteMessage(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading spinner");
		$("#"+e+"-btn").addClass("trash");
		if(status === "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteMessage(e, func)
{
	let request = {};
	request.Messageid = e;
	request.job = "delete message";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}


function starMessage(e, a)
{
	if($(e).hasClass("outline"))
	{
		$(e).addClass("yellow");
		$(e).removeClass("outline");
		addStar(a);
	}
	else
	{
		$(e).removeClass("yellow");
		$(e).addClass("outline");
		removeStar(a);
	}
}

function addStar(e)
{
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				$("#"+e+"-star").addClass("outline");
				$("#"+e+"-star").removeClass("yellow");
				ShowModal(d.message);
			}
			else
			{
				$("#stared-count-con").html(d.data);
			}
		}
		else
		{
			$("#"+e+"-star").addClass("outline");
			$("#"+e+"-star").removeClass("yellow");
			ShowModal("Unable to star message. Connection error");
		}
	},{job:"star message",Messageid:e});
}

function removeStar(e)
{
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				$("#"+e+"-star").removeClass("outline");
				$("#"+e+"-star").addClass("yellow");
				ShowModal(d.message);
			}
			else
			{
				$("#stared-count-con").html(d.data);
			}
		}
		else
		{
			$("#"+e+"-star").removeClass("outline");
			$("#"+e+"-star").addClass("yellow");
			ShowModal("Unable to unstar message. Connection error");
		}
	},{job:"unstar message",Messageid:e})
}

function changeMessageStatus(e, a)
{
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				a.checked = !a.checked;
				ShowModal(d.message);
			}
		}
		else
		{
			a.checked = !a.checked;
			ShowModal("Connection error. Unable to save status.");
		}
	},{job:"change message status",Messageid:e, status:a.checked})
}

function loadMessage(e)
{
	$("#message-info").html("<div class='ui fluid placeholder'>" +
		"<div class='image header'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +
		"</div>" +

		"<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>" +
		"<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>");

	$("#message-body").html( "<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>" +

		"<div class='ui red placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +

		"<div class='ui placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>" +

		"<div class='ui placeholder'>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"<div class='line'></div>" +
		"</div>");

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				let star = d.data.Stared ?
					"<i id='"+d.data.Id+"-star' class='star yellow icon' style='cursor: pointer; font-size: 20px;' onclick=\"starMessage(this, '"+d.data.Id+"')\"></i>" :
					"<i id='"+d.data.Id+"-star' class='star outline icon' style='cursor: pointer; font-size: 20px;' onclick=\"starMessage(this, '"+d.data.Id+"')\"></i>";

				let status = d.data.Status ? "checked" : "";

				let menuItems = "";

				if(d.data.Phone !== "")
				{
					menuItems = "<a href='#send-sms/message/"+d.data.Id+"' class='item'><i class='mobile icon'></i> Send SMS</a>";
				}
				if(d.data.Phone !== "")
				{
					menuItems += "<a href='#send-messages/message/"+d.data.Id+"' class='item'><i class='open envelope icon'></i> Send Email</a>";
				}


				$("#message-info").html("<h3 class='ui header' style='margin-top: 20px;'>" +
					"<i class='user circle blue icon' style='font-size: 40px;'></i> "+
					d.data.Name+" "+d.data.Surname+"</h3>" +
					"<h5 style='margin: 0px; color: dimgray;'><i class='at green icon'></i> "+d.data.Email+"</h5>" +
					"<h5 style='margin: 0px; margin-top: 10px; color: dimgray;'><i class='mobile green icon'></i> "+
					d.data.Phone+"</h5><hr/>" +
					"<h6 class='sleak'>"+d.data.Created.WeekDay+", "+d.data.Created.Day+"/"+d.data.Created.MonthName+
					"/"+d.data.Created.Year+"</h6>" +
					"<h6 class='sleak'>"+d.data.Created.Hour+":"+d.data.Created.Miniute+"</h6><hr/>" +
					"<label><input class='filled-in' type='checkbox' "+status+" onchange=\"changeMessageStatus('"+d.data.Id+"',this)\"/>" +
					"<span>Resolved</span></label><br/><br/>"+
					star+" <span>Importance</span>");

				$("#message-body").html("<h4>Message Body</h4>" +
					"<hr/><p class='sleak' style='line-height: 180%; font-size: 16px; font-family: Lato;" +
					" font-weight: bold; color: dimgray;'>"+
					d.data.Body+"</p><hr/>" +
					"<div class='ui icon top blue left pointing dropdown button'>" +
					"Reply <i class='caret down icon'></i>" +
					"<div class='menu'>" + menuItems +
					"</div>" +
					"</div>");

				$(".ui.dropdown").dropdown();
			}
			else
			{

			}
		}
		else
		{

		}
	},{job:"get message",messageid:e});
}


//---------------------------------------------- SEO Logic -----------------------------------//
function saveHomePageSeo()
{
	$("#homepage-seo-save-label").html("<span style='color: steelblue;'><i class='loading spinner icon'></i> Saving...</span>");
	postJson("hms-admin/worker", function(data, status){
		$("#homepage-seo-save-label").html("Saved");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#homepage-seo-save-label").html("<span style='color: forestgreen;'>" +
					"<i class='check icon'></i> Saved</span></span>");

				setTimeout(function(){
					$("#homepage-seo-save-label").html("Saved");
				},3000);
			}
			else
			{
				$("#homepage-seo-save-label").html("<span style='color: red;'>" + d.message +
					" <span style='cursor: pointer;color: blue;' " +
					"onclick='saveHomePageSeo()'>try again</span></span>");
			}
		}
		else
		{
			$("#homepage-seo-save-label").html("<span style='color: red;'>" +
				"Connection error <span style='cursor: pointer;color: blue;' " +
				"onclick='saveHomePageSeo()'>try again</span></span>");
		}
	},{keyword:$("#homepage-seo-keywords").val(),
		description:$("#homepage-seo-description").val(),job:"save homepage seo"})
}

function saveLodgingSeo()
{
	$("#lodging-seo-save-label").html("<span style='color: steelblue;'>" +
		"<i class='loading spinner icon'></i> Saving...</span>");
	postJson("hms-admin/worker", function(data, status){
		$("#lodging-seo-save-label").html("Saved");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#lodging-seo-save-label").html("<span style='color: forestgreen;'>" +
					"<i class='check icon'></i> Saved</span></span>");

				setTimeout(function(){
					$("#lodging-seo-save-label").html("Saved");
				},3000);
			}
			else
			{
				$("#lodging-seo-save-label").html("<span style='color: red;'>" + d.message +
					" <span style='cursor: pointer;color: blue;' " +
					"onclick='saveLodgingSeo()'>try again</span></span>");
			}
		}
		else
		{
			$("#lodging-seo-save-label").html("<span style='color: red;'>" +
				"Connection error <span style='cursor: pointer;color: blue;' " +
				"onclick='saveLodgingSeo()'>try again</span></span>");
		}
	},{keyword:$("#lodging-seo-keywords").val(),
		description:$("#lodging-seo-description").val(),job:"save lodging seo"})
}

function saveRestaurantSeo()
{
	$("#restaurant-seo-save-label").html("<span style='color: steelblue;'>" +
		"<i class='loading spinner icon'></i> Saving...</span>");
	postJson("hms-admin/worker", function(data, status){
		$("#restaurant-seo-save-label").html("Saved");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#restaurant-seo-save-label").html("<span style='color: forestgreen;'>" +
					"<i class='check icon'></i> Saved</span></span>");

				setTimeout(function(){
					$("#restaurant-seo-save-label").html("Saved");
				},3000);
			}
			else
			{
				$("#restaurant-seo-save-label").html("<span style='color: red;'>" + d.message +
					" <span style='cursor: pointer;color: blue;' " +
					"onclick='saveRestaurantSeo()'>try again</span></span>");
			}
		}
		else
		{
			$("#restaurant-seo-save-label").html("<span style='color: red;'>" +
				"Connection error <span style='cursor: pointer;color: blue;' " +
				"onclick='saveRestaurantSeo()'>try again</span></span>");
		}
	},{keyword:$("#restaurant-seo-keywords").val(),
		description:$("#restaurant-seo-description").val(),job:"save restaurant seo"})
}

function saveBarSeo()
{
	$("#bar-seo-save-label").html("<span style='color: steelblue;'>" +
		"<i class='loading spinner icon'></i> Saving...</span>");
	postJson("hms-admin/worker", function(data, status){
		$("#bar-seo-save-label").html("Saved");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#bar-seo-save-label").html("<span style='color: forestgreen;'>" +
					"<i class='check icon'></i> Saved</span></span>");

				setTimeout(function(){
					$("#bar-seo-save-label").html("Saved");
				},3000);
			}
			else
			{
				$("#bar-seo-save-label").html("<span style='color: red;'>" + d.message +
					" <span style='cursor: pointer;color: blue;' " +
					"onclick='saveBarSeo()'>try again</span></span>");
			}
		}
		else
		{
			$("#bar-seo-save-label").html("<span style='color: red;'>" +
				"Connection error <span style='cursor: pointer;color: blue;' " +
				"onclick='saveBarSeo()'>try again</span></span>");
		}
	},{keyword:$("#bar-seo-keywords").val(),
		description:$("#bar-seo-description").val(),job:"save bar seo"});
}

function savePastrySeo()
{
	$("#pastry-seo-save-label").html("<span style='color: steelblue;'>" +
		"<i class='loading spinner icon'></i> Saving...</span>");
	postJson("hms-admin/worker", function(data, status){
		$("#pastry-seo-save-label").html("Saved");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#pastry-seo-save-label").html("<span style='color: forestgreen;'>" +
					"<i class='check icon'></i> Saved</span></span>");

				setTimeout(function(){
					$("#pastry-seo-save-label").html("Saved");
				},3000);
			}
			else
			{
				$("#pastry-seo-save-label").html("<span style='color: red;'>" + d.message +
					" <span style='cursor: pointer;color: blue;' " +
					"onclick='savePastrySeo()'>try again</span></span>");
			}
		}
		else
		{
			$("#pastry-seo-save-label").html("<span style='color: red;'>" +
				"Connection error <span style='cursor: pointer;color: blue;' " +
				"onclick='savePastrySeo()'>try again</span></span>");
		}
	},{keyword:$("#pastry-seo-keywords").val(),
		description:$("#pastry-seo-description").val(),job:"save pastry seo"});
}

function SetSeo_Autoseo(e)
{
	let request = {};
	request.Autoseo = e.checked;
	request.job = "save autoseo status";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				e.checked = !e.checked;
				ShowModal("Unable to save Seo Autoseo");
			}
		}
		else
		{
			e.checked = !e.checked;
			ShowModal("Connection error. Unable to save Seo Autoseo");
		}
	}, request);
}


//----------------------------------------send message logic---------------------------------------
function uploadAttachment(e)
{
	if(e.files.length > 0)
	{
		let upload = new WixUpload({file: e.files[0], url: phpvars.STORAGE_API + "upload/files"});
		loadingButton({btn: "email-attachment-btn"});
		$("#email-attachment-txt").html("Uploading attachment...");
		upload.Upload(function (data, status) {
			loadingButton({btn: "email-attachment-btn", loading: false});
			$("#email-attachment-txt").html("Click to add attachment");
			if (status === "done") {
				let d = JSON.parse(data);

				if (d.status === "success")
				{
					$("#email-attachment-btn").html("<i class='check icon'></i>");
					$("#email-attachment").val(d.data);
					$("#email-attachment-txt").html(e.files[0].name + " added " +
						"<span style='color: steelblue; cursor: pointer;' " +
						"onclick='removeAttachment()'>Remove file</span onclick>");
				}
				else
				{
					ShowModal("Connection error. Unable to add the attachment");
				}
			}
			else
			{
				ShowModal("Connection error. Unable to add the attachment");
			}
		});
	}
}

function removeAttachment()
{
	$("#email-attachment").val("");
	$("#email-attachment-btn").html("<i class='linkify icon'></i>");
	$("#email-attachment-txt").html("Click to add attachment");
}

function showMessageTags()
{
	loadModal({title:"Message Tags", html:"" +
			"<div class='pad-1'>" +
			"<br>" +
			"<h6 class='m-tag'>{name}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name </h6>" +
			"<h6 class='m-tag'>{surname}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name </h6>" +
			"<h6 class='m-tag'>{guestid}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user guest ID </h6>" +
			"<h6 class='m-tag'>{country}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user country </h6>" +
			"<h6 class='m-tag'>{street}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user street address </h6>" +
			"<h6 class='m-tag'>{state}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's state </h6>" +
			"<h6 class='m-tag'>{city}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's city </h6>" +
			"<h6 class='m-tag'>{usertoken}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users system ID </h6>" +
			"<h6 class='m-tag'>{lastseen-date}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last seen date </h6>" +
			"<h6 class='m-tag'>{lastseen-time}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last seen time </h6>" +
			"<h6 class='m-tag'>{total-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users to total deficit </h6>" +
			"<h6 class='m-tag'>{last-lodged}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The last time the user lodged </h6>" +
			"</div>"});
}


//----------------------------------------------- Laundry logic-----------------------------------------------------
function saveLaundryItem()
{
	let request = {
		id:$("#laundryid").val(),
		status:$("#laundrystatus").val(),
		name:$("#laundry-name").val(),
		price:$("#laundry-price").val(),
		tax:$("#tax-amount").val(),
		onsite:getElement("show-on-site").checked,
		job:"save laundry item"
	};

	if(request.name == "")
	{
		errorButton({btn:"laundry-save-btn", msg:"Invalid name"});
	}
	else if(Number(request.price) < 1)
	{
		errorButton({btn:"laundry-save-btn", msg:"Invalid price"});
	}
	else
	{
		loadingButton({btn:"laundry-save-btn"});

		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"laundry-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#laundryid").val("");
					$("#laundrystatus").val("true");
					$("#laundry-name").val("");
					$("#laundry-price").val("");
					$("#tax-amount").val("");
					getElement("show-on-site").checked = true;

					$("#laundry-save-btn").addClass("positive disabled");
					$("#laundry-save-btn").html("<i class='check icon'></i> Item saved");
					setTimeout(function(){
						$("#laundry-save-btn").removeClass("positive disabled");
						$("#laundry-save-btn").html("Save item");
					},3000);
				}
				else
				{
					errorButton({btn:"laundry-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"laundry-save-btn", msg:"Connection error"});
			}
		},request);
	}
}

function ConfirmGroupLaundryDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Laundry?", function(choice){
		if(choice === true)
		{
			LaundryGroupDelete();
		}
	});
}

function ConfirmLaundryDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Laundry?", function(choice, param){
		if(choice === true)
		{
			LaundryListDelete(param);
		}
	}, null, null, e);
}

function LaundryGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteLaundry(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Laundrys failed to delete");
		}
	}
	else
	{
		ShowModal("No Laundrys were selected");
	}
}

function LaundryListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeleteLaundry(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteLaundry(e, func)
{
	let request = {};
	request.Laundryid = e;
	request.job = "delete laundry item";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", "Operation failed. Try again");
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}



function changeLaundryStatus(e, a)
{
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				a.checked = !a.checked;
				ShowModal(d.message);
			}
		}
		else
		{
			a.checked = !a.checked;
			ShowModal("Connection error. Unable to save status.");
		}
	},{job:"change laundry status",id:e, status:a.checked})
}



function changeLaundryVisibility(e, a)
{
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				a.checked = !a.checked;
				ShowModal(d.message);
			}
		}
		else
		{
			a.checked = !a.checked;
			ShowModal("Connection error. Unable to save status.");
		}
	},{job:"laundry onsite status",id:e, status:a.checked})
}



function loadEditLaundryData(e)
{
	$(".header-text").html("Edit laundry item");
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#laundryid").val(d.data.Id);
				$("#laundrystatus").val(d.data.Status);
				$("#laundry-name").val(d.data.Name);
				$("#laundry-price").val(d.data.Price);
				$("#tax-amount").val(d.data.Tax);
				getElement("show-on-site").checked = d.data.Onsite;
			}
			else
			{
				location.hash = "#pool";
				ShowModal(d.message);
			}
		}
		else
		{
			location.hash = "#pool";
			ShowModal("Connection error. Unable to load data");
		}
	},{job:"get laundry item", id:e})
}









//----------------------------------------------- Pool logic-----------------------------------------------------

function savePoolSession()
{
	let request = {
		id:$("#poolid").val(),
		status:$("#poolstatus").val(),
		name:$("#session-name").val(),
		price:$("#session-price").val(),
		tax:$("#tax-amount").val(),
		job:"save pool session"
	};

	if(request.name == "")
	{
		errorButton({btn:"pool-save-btn", msg:"Invalid name"});
	}
	else if(Number(request.price) < 1)
	{
		errorButton({btn:"pool-save-btn", msg:"Invalid price"});
	}
	else
	{
		loadingButton({btn:"pool-save-btn"});

		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"pool-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#poolid").val("");
					$("#poolstatus").val("true");
					$("#session-name").val("");
					$("#session-price").val("");
					$("#tax-amount").val("");

					$("#pool-save-btn").addClass("positive disabled");
					$("#pool-save-btn").html("<i class='check icon'></i> Item saved");
					setTimeout(function(){
						$("#pool-save-btn").removeClass("positive disabled");
						$("#pool-save-btn").html("Save session");
					},3000);
				}
				else
				{
					errorButton({btn:"pool-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"pool-save-btn", msg:"Connection error"});
			}
		},request);
	}
}



function ConfirmGroupPoolDelete()
{
	ConfirmModal("Are you sure you want to delete all the Pool session?", function(choice){
		if(choice === true)
		{
			PoolGroupDelete();
		}
	});
}

function ConfirmPoolDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Pool sessions?", function(choice, param){
		if(choice === true)
		{
			PoolListDelete(param);
		}
	}, null, null, e);
}

function PoolGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeletePool(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Pools failed to delete");
		}
	}
	else
	{
		ShowModal("No Pools were selected");
	}
}

function PoolListDelete(e)
{
	//Loading animation here
	$("#"+e+"-btn").addClass("loading");
	DeletePool(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-btn").removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeletePool(e, func)
{
	let request = {};
	request.Poolid = e;
	request.job = "delete pool session";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", "Operation failed. Try again");
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function changePoolStatus(e, a)
{
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				a.checked = !a.checked;
				ShowModal(d.message);
			}
		}
		else
		{
			a.checked = !a.checked;
			ShowModal("Connection error. Unable to save status.");
		}
	},{job:"change pool status",id:e, status:a.checked});
}

function loadEditPoolData(e)
{
	$(".header-text").html("Edit pool session");
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#poolid").val(d.data.Id);
				$("#poolstatus").val(d.data.Status);
				$("#session-name").val(d.data.Name);
				$("#session-price").val(d.data.Price);
				$("#tax-amount").val(d.data.Tax);
			}
			else
			{
				location.hash = "#pool";
				ShowModal(d.message);
			}
		}
		else
		{
			location.hash = "#pool";
			ShowModal("Connection error. Unable to load data");
		}
	},{job:"get pool session", id:e});
}




  //-----------------------------Shedules Logic----------------------------------

  function switchScheduleTab(e)
  {
		$(".schedule-tab").removeClass("active");
		$(e).addClass("active");

		populateSchedule();
  }

  function execNumChanged(e)
  {
	  if(e.checked)
	  {
			$("#exec-count-con").addClass("disabled");
	  }
	  else
	  {
			$("#exec-count-con").removeClass("disabled");
	  }
  }

  function addContact(e)
  {
	if(e.id == "guest-contact-btn")
	{
		getElement("contact-list-con").appendChild(div({add:
			"<input class='inner-contact-list' type='hidden' value='guest'/>" +
			"<div class='w3-col l10 m10 s10'>" +
			"<h6 class='sleak' style='font-weight: bold; color: dimgray;'>"+
			"<i class='group icon'></i> Guest List</h6>" +
			"</div>" +
			"<div class='w3-col l2 m2 s2 align-r'>"  +
			"<h6><i class='times red icon' style='cursor: pointer;' onclick=\"removeContact('guest-contact-btn')\"></i></h6>"+
			"</div>",
			class:"w3-card curve pad-t margin-b-t w3-row",id:"guest-contact-btn-indic"}));
	}
	if(e.id == "customers-contact-btn")
	{
		getElement("contact-list-con").appendChild(div({add:
			"<input class='inner-contact-list' type='hidden' value='customers'/>" +
			"<div class='w3-col l10 m10 s10'>" +
			"<h6 class='sleak' style='font-weight: bold; color: dimgray;'>"+
			"<i class='user circle icon'></i> Customers List</h6>" +
			"</div>" +
			"<div class='w3-col l2 m2 s2 align-r'>"  +
			"<h6><i class='times red icon' style='cursor: pointer;' onclick=\"removeContact('customers-contact-btn')\"></i></h6>"+
			"</div>",
			class:"w3-card curve pad-t margin-b-t w3-row",id:"customers-contact-btn-indic"}));
	}
	if(e.id == "staff-contact-btn")
	{
		getElement("contact-list-con").appendChild(div({add:
			"<input class='inner-contact-list' type='hidden' value='staff'/>" +
			"<div class='w3-col l10 m10 s10'>" +
			"<h6 class='sleak' style='font-weight: bold; color: dimgray;'>"+
			"<i class='male icon'></i>Staff List</h6>" +
			"</div>" +
			"<div class='w3-col l2 m2 s2 align-r'>"  +
			"<h6><i class='times red icon' style='cursor: pointer;' onclick=\"removeContact('staff-contact-btn')\"></i></h6>"+
			"</div>",
			class:"w3-card curve pad-t margin-b-t w3-row",id:"staff-contact-btn-indic"}));
	}
	if(e.id == "contactus-contact-btn")
	{
		getElement("contact-list-con").appendChild(div({add:
			"<input class='inner-contact-list' type='hidden' value='contactus'/>" +
			"<div class='w3-col l10 m10 s10'>" +
			"<h6 class='sleak' style='font-weight: bold; color: dimgray;'>"+
			"<i class='open envelope icon'></i> Contact Us users</h6>" +
			"</div>" +
			"<div class='w3-col l2 m2 s2 align-r'>"  +
			"<h6><i class='times red icon' style='cursor: pointer;' onclick=\"removeContact('contactus-contact-btn')\"></i></h6>"+
			"</div>",
			class:"w3-card curve pad-t margin-b-t w3-row",id:"contactus-contact-btn-indic"}));
	}
	if(e.id == "subscribers-contact-btn")
	{
	  getElement("contact-list-con").appendChild(div({add:
		  "<input class='inner-contact-list' type='hidden' value='subscribers'/>" +
		  "<div class='w3-col l10 m10 s10'>" +
		  "<h6 class='sleak' style='font-weight: bold; color: dimgray;'>"+
		  "<i class='at icon'></i> Subscribers List</h6>" +
		  "</div>" +
		  "<div class='w3-col l2 m2 s2 align-r'>"  +
		  "<h6><i class='times red icon' style='cursor: pointer;' onclick=\"removeContact('subscribers-contact-btn')\"></i></h6>"+
		  "</div>",
		  class:"w3-card curve pad-t margin-b-t w3-row",id:"subscribers-contact-btn-indic"}));
	}
	if(e.id != "custom-contact-btn")
	{
	  $(e).addClass("disabled");
	}
	else {
	  selectCustomlist(function(id, name){
		  let list = document.getElementsByClassName("inner-contact-list");
		  let found = false;
		  for(let i = 0; i < list.length; i++){if(list[i].value == id){found=true; break;}}

		  if(!found)
		  {
			  getElement("contact-list-con").appendChild(div({add:
				  "<input class='inner-contact-list' type='hidden' value='"+id+"'/>" +
				  "<div class='w3-col l10 m10 s10'>" +
				  "<h6 class='sleak' style='font-weight: bold; color: dimgray;'>"+
				  "<i class='list icon'></i> "+name+"</h6>" +
				  "</div>" +
				  "<div class='w3-col l2 m2 s2 align-r'>"  +
				  "<h6><i class='times red icon' style='cursor: pointer;' onclick=\"removeContact('"+id+"')\"></i></h6>"+
				  "</div>",
				  class:"w3-card curve pad-t margin-b-t w3-row",id:id+"-indic"}));
		  }
	  });
  }
}

  function removeContact(e)
  {
	  $(getElement(e)).removeClass("disabled");
	  getElement("contact-list-con").removeChild(getElement(e+"-indic"));
  }


  function saveSchedule()
  {
	  let request = {
		  id:$("#schedule-id").val(),
		  status:$("#schedule-status").val(),
		  title:$("#schedule-title").val(),
		  message:$("#message-template").val(),
		  year:$("#schedule-year").val(),
		  day:$("#schedule-day").val(),
		  month:$("#schedule-month").val(),
		  hour:$("#schedule-hour").val(),
		  min:$("#schedule-min").val(),
		  gmt:$("#schedule-gmt").val(),
		  inifinity:getElement("indefinit-exec").checked,
		  executions:$("#exec-count").val(),
		  autodelete:getElement("auto-delete").checked,
		  contacts:[],
		  contactcollection:$("#contact-collection").val(),
		  job:"save message schedule"
	  };

	  let list = document.getElementsByClassName("inner-contact-list");
	  for(let i = 0; i < list.length; i++)
	  {
		  request.contacts.push(list[i].value);
	  }


	  if(request.title == "")
	  {
		  errorButton({btn:"schedule-btn", msg:"Title is empty"});
	  }
	  else if(request.message == "")
	  {
		  errorButton({btn:"schedule-btn", msg:"Select message"});
	  }
	  else if((request.contacts.length == 0) && (request.contactcollection == ""))
	  {
		  errorButton({btn:"schedule-btn", msg:"No contacts have been added"});
	  }
	  else
	  {
		  loadingButton({btn:"schedule-btn"});
		  postJson("hms-admin/worker", function(data, status){
			  loadingButton({btn:"schedule-btn", loading:false});
			  if(status === "done")
			  {
				  let d = JSON.parse(data);

				  if(d.status === "success")
				  {
					  $("#schedule-id").val("");
					  $("#schedule-status").val("true");
					  $("#schedule-title").val("");
					  $("#message-template").dropdown("restore defaults");
					  $("#schedule-year").dropdown("restore defaults");
					  $("#schedule-day").dropdown("restore defaults");
					  $("#schedule-month").dropdown("restore defaults");
					  $("#schedule-hour").dropdown("restore defaults");
					  $("#schedule-min").val("00");
					  $("#schedule-gmt").dropdown("restore defaults");
					  getElement("indefinit-exec").checked = false;
					  $("#exec-count").val("1");
					  getElement("auto-delete").checked = false;
					  $("#contact-collection").val("");

					  $("#guest-contact-btn").removeClass("disabled");
					  $("#customers-contact-btn").removeClass("disabled");
					  $("#staff-contact-btn").removeClass("disabled");
					  $("#subscribers-contact-btn").removeClass("disabled");
					  $("#contactus-contact-btn").removeClass("disabled");
					  $("#custom-contact-btn").removeClass("disabled");

					  $("#exec-count-con").removeClass("disabled");


					  $("#contact-list-con").html("");


						$("#schedule-btn").addClass("positive disabled");
						$("#schedule-btn").html("<i class='check icon'></i> Schedule saved");
						setTimeout(function(){
							$("#schedule-btn").removeClass("positive disabled");
							$("#schedule-btn").html("Save schedule");
						},3000);
				  }
				  else
				  {
					  errorButton({btn:"schedule-btn", msg:d.message});
				  }
			  }
			  else
			  {
				  errorButton({btn:"schedule-btn", msg:"Connectiont error"});
			  }
		  },request);
	  }
  }


function ConfirmMessagescheduleDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Message schedules?", function(choice, param){
		if(choice === true)
		{
			MessagescheduleListDelete(param);
		}
	}, null, null, e);
}

function MessagescheduleListDelete(e)
{
	//Loading animation here
	$("#"+e+"-row").transition("set looping").transition('bounce', '2000ms');
	DeleteMessageschedule(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-row").transition("remove looping");
		if(status === "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteMessageschedule(e, func)
{
	let request = {};
	request.Messagescheduleid = e;
	request.job = "delete message schedule";

	postJson("hms-admin/worker", function(data, status){
		if(status == "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function loadEditSchedule(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#schedule-id").val(d.data.Id);
				$("#schedule-status").val(d.data.Status);
				$("#schedule-title").val(d.data.Title);
				$("#message-template").dropdown("set selected", d.data.Message.Id);
				$("#schedule-year").dropdown("set selected", d.data.Year);
				$("#schedule-month").dropdown("set selected", d.data.Month);
				$("#schedule-hour").dropdown("set selected", zerofy(d.data.Hour));
				$("#schedule-gmt").dropdown("set selected", zerofy(d.data.Meridian));
				$("#schedule-day").dropdown("set selected", d.data.Day);
				$("#exec-count").val(d.data.Execcount);
				$("#schedule-min").val(zerofy(d.data.Minuet));
				getElement("indefinit-exec").checked = d.data.Continuous;
				getElement("auto-delete").checked = d.data.Autodelete;
				$("#contact-collection").val(d.data.Contactlist.toString());

				addContact(d.data.Guest ? getElement("guest-contact-btn") : "");
				addContact(d.data.Customers ? getElement("customers-contact-btn") : "");
				addContact(d.data.Staff ? getElement("staff-contact-btn") : "");
				addContact(d.data.Subscribers ? getElement("subscribers-contact-btn") : "");
				addContact(d.data.Contactus ? getElement("contactus-contact-btn") : "");

				for(let h = 0; h < d.data.Customlist.length; h++)
				{
					getElement("contact-list-con").appendChild(div({add:
							"<input class='inner-contact-list' type='hidden' value='"+d.data.Customlist[h].Id+"'/>" +
							"<div class='w3-col l10 m10 s10'>" +
							"<h6 class='sleak' style='font-weight: bold; color: dimgray;'>"+
							"<i class='list icon'></i> "+d.data.Customlist[h].Name+"</h6>" +
							"</div>" +
							"<div class='w3-col l2 m2 s2 align-r'>"  +
							"<h6><i class='times red icon' style='cursor: pointer;' onclick=\"removeContact('"+d.data.Customlist[h].Id+"')\"></i></h6>"+
							"</div>",
						class:"w3-card curve pad-t margin-b-t w3-row",id:d.data.Customlist[h].Id+"-indic"}));
				}
			}
			else
			{
				location.hash = "#reminders";
				ShowModal(d.message);
			}
		}
		else
		{
			location.hash = "#reminders";
			ShowModal("Connection error. Unable to load schedule data");
		}
	},{job:"single message schedule", scheduleid:e});
}


  //----------------------------Events Logic--------------------------------------

  function switchEventTab(e)
  {
	$(".event-tab").removeClass("active");
	$(e).addClass("active");
	populateEvent();
  }

  function saveEvent()
  {
	  let request = {
		  id:$("#event-id").val(),
		  status:$("#event-status").val(),
		  title:$("#event-title").val(),
		  message:$("#message-template").val(),
		  event:$("#event").val(),
		  delayhours:Number($("#delay-hours").val()),
		  delaymins:Number($("#delay-mins").val()),
		  contextuser:getElement("context-user").checked,
		  contacts:[],
		  contactcollection:$("#contact-collection").val(),
		  job:"save event"
	  };

	  let list = document.getElementsByClassName("inner-contact-list");
	  for(let i = 0; i < list.length; i++)
	  {
		  request.contacts.push(list[i].value);
	  }

	  if(request.title == "")
	  {
		  errorButton({btn:"event-btn", msg:"Title is empty"});
	  }
	  else if(request.message == "")
	  {
		  errorButton({btn:"event-btn", msg:"Select message"});
	  }
	  else if((request.contacts.length == 0) && (request.contactcollection == "") && (!request.contextuser))
	  {
		  errorButton({btn:"event-btn", msg:"No contacts have been added"});
	  }
	  else
	  {
		  loadingButton({btn:"event-btn"});
		  postJson("hms-admin/worker", function(data, status){
			  loadingButton({btn:"event-btn", loading:false});
			  if(status === "done")
			  {
				  let d = JSON.parse(data);

				  if(d.status === "success")
				  {
					  $("#event-id").val("");
					  $("#event-status").val("");
					  $("#event-title").val("");
					  $("#message-template").dropdown("restore defaults");
					  $("#event").dropdown("restore defaults");
					  $("#delay-hours").val("00");
					  $("#delay-mins").val("00");
					  getElement("context-user").checked = false;
					  $("#contact-collection").val("");


					  $("#guest-contact-btn").removeClass("disabled");
					  $("#customers-contact-btn").removeClass("disabled");
					  $("#staff-contact-btn").removeClass("disabled");
					  $("#subscribers-contact-btn").removeClass("disabled");
					  $("#contactus-contact-btn").removeClass("disabled");
					  $("#custom-contact-btn").removeClass("disabled");


					  $("#contact-list-con").html("");


					  $("#event-btn").addClass("positive disabled");
					  $("#event-btn").html("<i class='check icon'></i> Event saved");
					  setTimeout(function(){
							$("#event-btn").removeClass("positive disabled");
							$("#event-btn").html("Save event");
						},3000);
				  }
				  else
				  {
					  errorButton({btn:"event-btn", msg:d.message});
				  }
			  }
			  else
			  {
				  errorButton({btn:"event-btn", msg:"Connectiont error"});
			  }
		  },request);
	  }
  }


let scheduleChart = null;
function plotGraph(e)
{
	if(scheduleChart == null)
	{
		scheduleChart = new EasyPieChart(document.querySelector('#completed-schedule'), {
			easing: 'easeOutElastic',
			onStep: function(from, to, percent) {
				this.el.children[0].innerHTML = Math.round(percent);
			}
		});
	}
	scheduleChart.update(e);
  }

function ConfirmEventlistenerDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected Event listener?", function(choice, param){
		if(choice === true)
		{
			EventlistenerListDelete(param);
		}
	}, null, null, e);
}

function EventlistenerListDelete(e)
{
	//Loading animation here
	$("#"+e+"-row").transition("set looping").transition('bounce', '2000ms');
	DeleteEventlistener(e, function(status, msg){
		//Stop Animation here
		$("#"+e+"-row").transition("remove looping");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteEventlistener(e, func)
{
	let request = {};
	request.Eventlistenerid = e;
	request.job = "delete event";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}


function changeEventStatus(e, a)
{
	$("#status-con-"+e).html("<small><span class='yellow-large-pulse'></span> &nbsp;&nbsp;Processing..</small>");
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status == "success")
			{
				if(a.getAttribute("cur-status") === "true")
				{
					$("#status-con-"+e).html("<span class='small-blue-pulse'></span> &nbsp;&nbsp;<small>Listening...");
					a.setAttribute("cur-status", "false");
					a.innerHTML = "Stop listening";
				}
				else
				{
					$("#status-con-"+e).html("<span class='red-back' style='display: inline-block; border-radius: 50%; " +
						"height: 6px; width: 6px;'></span>" +
						" &nbsp;&nbsp;<small>Pending..");
					a.setAttribute("cur-status", "true");
					a.innerHTML = "Start listening";
				}
			}
			else
			{
				if(a.getAttribute("cur-status") === "false")
				{
					$("#status-con-"+e).html("<span class='small-blue-pulse'></span> &nbsp;&nbsp;<small>Listening...");
				}
				else
				{
					$("#status-con-"+e).html("<span class='red-back' style='display: inline-block; border-radius: 50%; " +
						"height: 6px; width: 6px;'></span>" +
						" &nbsp;&nbsp;<small>Pending..");
				}
				ShowModal(d.message);
			}
		}
		else
		{
			if(a.getAttribute("cur-status") === "false")
			{
				$("#status-con-"+e).html("<span class='small-blue-pulse'></span> &nbsp;&nbsp;<small>Listening...");
			}
			else
			{
				$("#status-con-"+e).html("<span class='red-back' style='display: inline-block; border-radius: 50%; " +
					"height: 6px; width: 6px;'></span>" +
					" &nbsp;&nbsp;<small>Pending..");
			}
			ShowModal("Connection error. Unable to save status.");
		}
	},{job:"change event status",id:e, status:a.getAttribute("cur-status")})
}

function loadEditEvent(e)
{
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#event-id").val(d.data.Id);
				$("#event-status").val(d.data.Status);
				$("#event-title").val(d.data.Title);
				$("#message-template").dropdown("set selected", d.data.Message.Id);
				$("#event").dropdown("set selected", d.data.Event);
				$("#delay-hours").val(zerofy(d.data.Delayhours));
				$("#delay-mins").val(zerofy(d.data.Delaymins));
				getElement("context-user").checked = d.data.Contextuser;
				$("#contact-collection").val(d.data.Contactlist.toString());

				addContact(d.data.Guest ? getElement("guest-contact-btn") : "");
				addContact(d.data.Customer ? getElement("customers-contact-btn") : "");
				addContact(d.data.Staff ? getElement("staff-contact-btn") : "");
				addContact(d.data.Subscribers ? getElement("subscribers-contact-btn") : "");
				addContact(d.data.Contactform ? getElement("contactus-contact-btn") : "");

				for(let h = 0; h < d.data.Customlist.length; h++)
				{
					getElement("contact-list-con").appendChild(div({add:
							"<input class='inner-contact-list' type='hidden' value='"+d.data.Customlist[h].Id+"'/>" +
							"<div class='w3-col l10 m10 s10'>" +
							"<h6 class='sleak' style='font-weight: bold; color: dimgray;'>"+
							"<i class='list icon'></i> "+d.data.Customlist[h].Name+"</h6>" +
							"</div>" +
							"<div class='w3-col l2 m2 s2 align-r'>"  +
							"<h6><i class='times red icon' style='cursor: pointer;' onclick=\"removeContact('"+d.data.Customlist[h].Id+"')\"></i></h6>"+
							"</div>",
						class:"w3-card curve pad-t margin-b-t w3-row",id:d.data.Customlist[h].Id+"-indic"}));
				}
			}
			else
			{
				location.hash = "#reminders";
				ShowModal(d.message);
			}
		}
		else
		{
			location.hash = "#reminders";
			ShowModal("Connection error. Unable to load event data");
		}
	},{job:"get event", eventid:e});
}

function loadEventData(e)
{
	let placeholder = "<div class='ui placeholder'>" +
		"<div class='line'></div><div class='line'></div><div class='line'></div>" +
		"<div class='line'></div><div class='line'></div><div class='line'></div>" +
		"</div>";

	$("#event-data-con-1").html(placeholder);
	$("#event-data-con-2").html(placeholder);
	$("#event-data-con-3").html(placeholder);

	postJson("hms-admin/worker", function(data, status){
		$("#event-data-con-1").html("");
		$("#event-data-con-2").html("");
		$("#event-data-con-3").html("");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#event-data-con-1").html("<h3 class='sleak blue-text' style='font-weight: bold;'>" +
					"<i class='code blue icon'></i> Event details</h3>" +
					"<table class='ui very basic padded table'>" +
					"<tbody>" +
					"<tr><td>Title</td><td>"+d.data.Title+"</td></tr>" +
					"<tr><td>Created</td><td>"+d.data.Created.WeekDay+", "+d.data.Created.Day+"/"+d.data.Created.MonthName+"/"+d.data.Created.Year+"</td></tr>" +
					"<tr><td>Event Name</td><td>"+d.data.Eventname+"</td></tr>" +
					"<tr><td>Event Code</td><td>"+d.data.Event+"</td></tr>" +
					"<tr><td>Fired </td><td>"+d.data.Firecount+" (time(s))</td></tr>" +
					"<tr><td>Attached message type</td><td>"+d.data.Message.Type+"</td></tr>" +
					"<tr><td>Delay period</td><td>"+zerofy(d.data.Delayhours)+":"+zerofy(d.data.Delaymins)+"</td></tr>" +
					"</tbody>" +
					"</table>");

				$("#event-data-con-2").html("<h4 class='sleak blue-text' style='font-weight: bold;'>" +
					(d.data.Message.Type == "sms" ? "<i class='open envelope icon' style='color: lightgray;'></i>" :
						"<i class='at icon' style='color: lightgray;'></i>") +
					" Attached message</h4>" +
					"<table class='ui very basic padded table'>" +
					"<tbody>" +
					"<tr><td>Title</td><td>"+d.data.Message.Title+"</td></tr>" +
					(d.data.Message.Type == "email" ?
					"<tr><td>Subject</td><td>"+d.data.Message.Subject+"</td></tr>" : "")+
					"</tbody>" +
					"</table>" +
					"<h6 class='sleak blue-text' style='font-weight: bold;'>Content</h6>" +
					d.data.Message.Body);

				$("#event-data-con-3").html("<h4 class='sleak blue-text' style='font-weight: bold;'>" +
					"<i class='users icon' style='color: lightgray;'></i> Contacts</h4><br/>" +
					(d.data.Contextuser ? "<h6 style='font-family: Lato;'>" +
						"<i class='user circle green icon'></i> Context user (Source of the event)</h6>" : "") +
					(d.data.Guest ? "<h6 style='font-family: Lato;'><i class='group green icon'></i>  Guests</h6>" : "") +
					(d.data.Customer ? "<h6  style='font-family: Lato;'><i class='user green icon'></i> Cuestomers</h6>" : "") +
					(d.data.Staff ? "<h6  style='font-family: Lato;'><i class='male green icon'></i> Staff</h6>" : "") +
					(d.data.Subscribers ? "<h6 style='font-family: Lato;'><i class='at green icon'></i> Subscribers</h6>" : "") +
					(d.data.Contactform ? "<h6'  style='font-family: Lato;'><i class='envelope green icon'></i> Contact us form</h6>" : ""));

				for(let h = 0; h < d.data.Customlist.length; h++)
				{
					getElement("event-data-con-3").appendChild(
						div({add:"<h6 style='font-family: Lato;'><i class='list green icon'></i> "+
								d.data.Customlist[h].Name+" <small>(Custom list) ("+d.data.Customlist[h].Itemcount+" contacts)</small></h6>"}));
				}
			}
			else
			{

			}
		}
		else
		{

		}
	},{job:"get event", eventid:e})
}

function loadScheduleData(e)
{
	let placeholder = "<div class='ui placeholder'>" +
		"<div class='line'></div><div class='line'></div><div class='line'></div>" +
		"<div class='line'></div><div class='line'></div><div class='line'></div>" +
		"</div>";

	$("#event-data-con-1").html(placeholder);
	$("#event-data-con-2").html(placeholder);
	$("#event-data-con-3").html(placeholder);

	postJson("hms-admin/worker", function(data, status){
		$("#event-data-con-1").html("");
		$("#event-data-con-2").html("");
		$("#event-data-con-3").html("");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#event-data-con-1").html("<h3 class='sleak blue-text' style='font-weight: bold;'>" +
					"<i class='calendar outline alternate blue icon'></i> Schedule details</h3>" +
					"<table class='ui very basic padded table'>" +
					"<tbody>" +
					"<tr><td>Title</td><td>"+d.data.Title+"</td></tr>" +
					"<tr><td>Created</td><td>"+d.data.Created.WeekDay+", "+d.data.Created.Day+"/"+d.data.Created.MonthName+"/"+d.data.Created.Year+"</td></tr>" +
					"<tr><td>Year</td><td>"+(Number(d.data.Year) == 0 ? "Every year" : d.data.Year)+"</td></tr>" +
					"<tr><td>Month</td><td>"+(Number(d.data.Month) == 0 ? "Every month" : IntToMonth(d.data.Month))+"</td></tr>" +
					"<tr><td>Day</td><td>"+(Number(d.data.Day) == 0 ? "Every month" : zerofy(d.data.Day))+"</td></tr>" +
					"<tr><td>Time </td><td>"+zerofy(d.data.Hour)+":"+zerofy(d.data.Minuet)+" "+d.data.Meridian+"</td></tr>" +
					"<tr><td>Attached message type</td><td>"+d.data.Message.Type+"</td></tr>" +
					"<tr><td>Max execution</td><td>"+d.data.Execcount+"</td></tr>" +
					"<tr><td>Auto delete</td><td>"+(d.data.Autodelete ? "True" : "false")+"</td></tr>" +
					"<tr><td>Executed</td><td>"+d.data.Executed+" (time(s))</td></tr>" +
					"<tr><td>Status</td><td>"+(d.data.Completed ? "Completed" : "Waiting")+"</td></tr>" +
					"</tbody>" +
					"</table>");

				$("#event-data-con-2").html("<h4 class='sleak blue-text' style='font-weight: bold;'>" +
					(d.data.Message.Type == "sms" ? "<i class='open envelope icon' style='color: lightgray;'></i>" :
						"<i class='at icon' style='color: lightgray;'></i>") +
					" Attached message</h4>" +
					"<table class='ui very basic padded table'>" +
					"<tbody>" +
					"<tr><td>Title</td><td>"+d.data.Message.Title+"</td></tr>" +
					(d.data.Message.Type == "email" ?
						"<tr><td>Subject</td><td>"+d.data.Message.Subject+"</td></tr>" : "")+
					"</tbody>" +
					"</table>" +
					"<h6 class='sleak blue-text' style='font-weight: bold;'>Content</h6>" +
					d.data.Message.Body);

				$("#event-data-con-3").html("<h4 class='sleak blue-text' style='font-weight: bold;'>" +
					"<i class='users icon' style='color: lightgray;'></i> Contacts</h4><br/>" +
					(d.data.Contextuser ? "<h6 style='font-family: Lato;'>" +
						"<i class='user circle green icon'></i> Context user (Source of the event)</h6>" : "") +
					(d.data.Guest ? "<h6 style='font-family: Lato;'><i class='group green icon'></i>  Guests</h6>" : "") +
					(d.data.Customers ? "<h6  style='font-family: Lato;'><i class='user green icon'></i> Cuestomers</h6>" : "") +
					(d.data.Staff ? "<h6  style='font-family: Lato;'><i class='male green icon'></i> Staff</h6>" : "") +
					(d.data.Subscribers ? "<h6 style='font-family: Lato;'><i class='at green icon'></i> Subscribers</h6>" : "") +
					(d.data.Contactus ? "<h6'  style='font-family: Lato;'><i class='envelope green icon'></i> Contact us form</h6>" : ""));

				for(let h = 0; h < d.data.Customlist.length; h++)
				{
					getElement("event-data-con-3").appendChild(
						div({add:"<h6 style='font-family: Lato;'><i class='list green icon'></i> "+
								d.data.Customlist[h].Name+" <small>(Custom list) ("+d.data.Customlist[h].Itemcount+" contacts)</small></h6>"}));
				}
			}
			else
			{

			}
		}
		else
		{

		}
	},{job:"single message schedule", scheduleid:e})
}

function importCustomContactList()
{
	selectCustomlist(function(id, name){
		if(getElement(id+"-contact-list") == null)
		{
			let tr = document.createElement("tr");
			tr.id = id+"-contact-list";
			tr.className = "custom-list-item";
			tr.innerHTML = "<td><label><input id='"+id+"' class='filled-in contact-list-item' type='checkbox' " +
				"checked onchange=\"removeCustomList('"+id+"')\"/><span></span></label></td>" +
				"<td><label>"+name+"</label></td>";
			getElement("contact-table-list").appendChild(tr);
		}
	});
}

function removeCustomList(e)
{
	getElement("contact-table-list").removeChild(getElement(e+"-contact-list"));
}




//------------------------------------------------ --- Supplier logic ------------------------------------------//
function saveSupplier()
{
	let request = {
		id:$("#supplier-id").val(),
		company:$("#company-name").val(),
		phone:$("#phone").val(),
		email:$("#email").val(),
		name:$("#name").val(),
		surname:$("#surname").val(),
		address:$("#address").val(),
		job:"save supplier"
	};

	if(request.name == "")
	{
		errorButton({btn:"supplier-save-btn", msg:"Name is empty"});
	}
	else if(request.surname == "")
	{
		errorButton({btn:"supplier-save-btn", msg:"Surname is empty"});
	}
	else if(request.phone == "")
	{
		errorButton({btn:"supplier-save-btn", msg:"Add a phone number"});
	}
	else
	{
		loadingButton({btn:"supplier-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"supplier-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#supplier-id").val("");
					$("#company-name").val("");
					$("#phone").val("");
					$("#email").val("");
					$("#name").val("");
					$("#surname").val("");
					$("#address").val("");
					
					$("#supplier-save-btn").addClass("positive disabled");
					$("#supplier-save-btn").html("<i class='check icon'></i> Supplier added");
					setTimeout(function(){
						$("#supplier-save-btn").removeClass("positive disabled");
						$("#supplier-save-btn").html("Save supplier");
					},3000);
				}
				else
				{
					errorButton({btn:"supplier-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"supplier-save-btn", msg:"Connection error"});
			}
		},request);
	}
}

function ConfirmGroupSupplierDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Suppliers?", function(choice){
		if(choice === true)
		{
			SupplierGroupDelete();
		}
	});
}

function ConfirmSupplierDelete(e)
{
	ConfirmModal("Are you sure you want to delete the Supplier?", function(choice, param){
		if(choice === true)
		{
			SupplierListDelete(param);
		}
	}, null, null, e);
}

function SupplierGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteSupplier(lst[i].id, function(status, msg){
				//Stop Animation here

				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Suppliers failed to delete");
		}
	}
	else
	{
		ShowModal("No Suppliers were selected");
	}
}

function SupplierListDelete(e)
{
	//Loading animation here
	$('#'+e+'-btn').addClass("loading");
	DeleteSupplier(e, function(status, msg){
		//Stop Animation here
		$('#'+e+'-btn').removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteSupplier(e, func)
{
	let request = {};
	request.Supplierid = e;
	request.job = "delete supplier";

	postJson("hms-admin/worker", function(data, status){
		if(status == "done")
		{
			let d = JSON.parse(data);

			if(d.status == "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function loadEditSupplierData(e)
{
	$("#header-text").html("Edit supplier");
	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				let names = d.data.Contactperson.split(" ");

				$("#supplier-id").val(d.data.Id);
				$("#company-name").val(d.data.Company);
				$("#phone").val(d.data.Phone);
				$("#email").val(d.data.Email);
				$("#name").val(names.length > 0 ? names[0] : "");
				$("#surname").val(names.length > 1 ? names[1] : "");
				$("#address").val(d.data.Address);
			}
			else
			{
				location.hash = "#suppliers";
				ShowModal(d.message);
			}
		}
		else
		{
			location.hash = "#suppliers";
			ShowModal("Connection error. Unable to load supplier's data");
		}
	},{job:"get supplier", id:e});
}



// -------------------------------------- Inventory Items Logic ----------------------------------------------

function saveInventoryItem()
{
	request = {
		item_type:$("#inventory-item-type").val(),
		itemid:$("#item-id").val(),
		image:$("#item-file-name-1").val(),
		name:$("#item-name").val(),
		unit:$("#item-unit-singular").val(),
		pluralunit:$("#item-unit-plural").val(),
		sku:$("#barcode").val(),
		productid:$("#item-productid").val(),
		lowstockpoint:Number($("#item-lowstockpoint").val()),
		openingstock:getElement("item-openingstock") != null ? getElement("item-openingstock").value : 0,
		suppliers:$("#suppliers").dropdown('get value'),
		job:"save inventory item"
	};

	if(request.item_type == "")
	{
		ShowModl("Fatal error. Unrecognised item type. Please reload the page or contact support");
	}
	else if(request.name == "")
	{
		errorButton({btn:"inventory-item-save-btn", msg:"Add item name"});
	}
	else if(request.unit == "")
	{
		errorButton({btn:"inventory-item-save-btn", msg:"Add a unit of measurement"});
	}
	else if(request.pluralunit == "")
	{
		errorButton({btn:"inventory-item-save-btn", msg:"Add plural form for unit"});
	}
	else if(request.sku == "")
	{
		errorButton({btn:"inventory-item-save-btn", msg:"Add or generate an SKU"});
	}
	else
	{
		loadingButton({btn:"inventory-item-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"inventory-item-save-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#item-id").val("");
					$("#item-file-name-1").val("");
					$("#item-name").val("");
					$("#item-unit-singular").val("");
					$("#item-unit-plural").val("");
					$("#barcode").val("");
					$("#item-productid").val("");
					$("#item-lowstockpoint").val("0");
					$("#item-openingstock").val("0");
					$("#suppliers").dropdown('restore defaults');

					$("#inventory-item-save-btn").addClass("positive disabled");
					$("#inventory-item-save-btn").html("<i class='check icon'></i> Item saved successfully");
					setTimeout(function(){
						$("#inventory-item-save-btn").removeClass("positive disabled");
						$("#inventory-item-save-btn").html("Save Item");
					},3000);

					getElement("item-img-1").src = "";
				}
				else
				{
					errorButton({btn:"inventory-item-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"inventory-item-save-btn", msg:"Connection error"});
			}
		},request);
	}
}

function switchItemFilterTab(e)
{
	$(".inventory-items-filter-tab").addClass("basic");
	$(e).removeClass("basic");
	populateInventoryItems();
}

function ConfirmGroupItemDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected Items?", function(choice){
		if(choice === true)
		{
			ItemGroupDelete();
		}
	});
}

function ConfirmItemDelete(e)
{
	ConfirmModal("Are you sure you want to delete the item?", function(choice, param){
		if(choice === true)
		{
			ItemListDelete(param);
		}
	}, null, null, e);
}

function ItemGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteItem(lst[i].id, function(status, msg){
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> Storeitems failed to delete");
		}
	}
	else
	{
		ShowModal("No Storeitems were selected");
	}
}

function ItemListDelete(e)
{
	$("#"+e+"-btn").addClass("loading");
	DeleteItem(e, function(status, msg){
		$("#"+e+"-btn").removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteItem(e, func)
{
	let request = {};
	request.itemid = e;
	request.item_type = $("#inventory-item-type").val();
	request.job = "delete inventory item";

	postJson("hms-admin/worker", function(data, status){
		if(status == "done")
		{
			let d = JSON.parse(data);

			if(d.status == "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", d.message);
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function LoadEditInventoryItem(e)
{
	let retPath = "";
	if($("#inventory-item-type").val() === "bar_item")
	{
		retPath = "#bar-inventory";
	}
	if($("#inventory-item-type").val() === "kitchen_item")
	{
		retPath = "#kitchen-inventory";
	}
	if($("#inventory-item-type").val() === "pastry_item")
	{
		retPath = "#pastry-inventory";
	}
	if($("#inventory-item-type").val() === "pool_item")
	{
		retPath = "#pool-inventory";
	}
	if($("#inventory-item-type").val() === "room_item")
	{
		retPath = "#room-inventory";
	}
	if($("#inventory-item-type").val() === "store_item")
	{
		retPath = "#store-inventory";
	}
	if($("#inventory-item-type").val() === "laundry_item")
	{
		retPath = "#laundry-inventory";
	}

	$("#page").addClass("ui loading form");
	postJson("hms-admin/worker", function(data, status){
		$("#page").removeClass("ui loading form");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#item-id").val(d.data.Id);
				$("#item-file-name-1").val(d.data.Image);
				$("#item-name").val(d.data.Name);
				$("#item-unit-singular").val(d.data.Unit);
				$("#item-unit-plural").val(d.data.Pluralunit);
				$("#barcode").val(d.data.Sku);
				$("#item-productid").val(d.data.Productid);
				$("#item-lowstockpoint").val(d.data.Lowstockpoint);
				$("#item-openingstock").val(d.data.Openingstock);

				let suppliers = [];
				for(let i = 0; i < d.data.Suppliers.length; i++)
				{
					suppliers.push(d.data.Suppliers[i].Id);
				}
				$("#suppliers").dropdown('set selected', suppliers);

				getElement("item-img-1").src = "files/"+d.data.Image;
			}
			else
			{
				location.href = retPath;
				ShowModal(d.message);
			}
		}
		else
		{
			location.href = retPath;
			ShowModal("Connection error. Unable to load item data");
		}
	},{itemid:e, job:"get inventory item", item_type:$("#inventory-item-type").val()});
}

function alreadyAdded(value)
{
	let rows = document.getElementsByClassName("product-dropdown");
	let count = 0;
	for(let i = 0; i < rows.length; i++)
	{
		if($(rows[i]).dropdown('get value') == value)
		{
			if(count == 1)
			{
				return  true;
			}
			else
			{
				count++;
			}
		}
	}
	return false;
}

function dropRow(e)
{
	if((alreadyAdded($(e).val())) && ($(e).dropdown('get text') != "Select product"))
	{
		ShowModal($(e).dropdown('get text') +" has already been added");
		$(e).dropdown('restore defaults');
	}
	else
	{
		let rows = document.getElementsByClassName("product-row");
		let r = rows[(rows.length - 1)].getAttribute("row-num");

		let i = Number(r) + 1;

		if($("#product-dropdown-"+(i - 1)).val() != "")
		{
			let row = (rows[(rows.length - 1)]).cloneNode(true);
			row.id = "product-row-"+i;
			row.setAttribute("row-num", i);
			getElement("products-table").appendChild(row);
			$("#product-row-"+i+" .product-dropdown-con").attr("id", "product-dropdown-con-"+i);
			$("#product-row-"+i+" .product-quantity-input").attr("id", "product-quantity-"+i);
			$("#product-row-"+i+" .product-rate-input").attr("id", "product-rate-"+i);
			$("#product-row-"+i+" .product-total-input").attr("id", "product-total-"+i);
			$("#product-row-"+i+" .cancel-buttons").attr("row-num", i);

			$("#product-row-"+i+" .product-quantity-input").val("0");
			$("#product-row-"+i+" .product-rate-input").val("0.00");
			$("#product-row-"+i+" .product-total-input").val("0.00");

			$("#product-row-"+i+" .product-quantity-input").attr("row-num", i);
			$("#product-row-"+i+" .product-rate-input").attr("row-num", i);

			$("#product-dropdown-con-"+i).html(
				"<select id='product-dropdown-"+i+"' " +
				"class='ui wix-select-borderless product-dropdown dropdown' " +
				"style='border: none;' onchange='dropRow(this)'>" +
				"<option value=''>Select product</option>" +
				"</select>"
			);

			for(let q = 0; q < itemsList.length; q++)
			{
				let op = document.createElement("option");
				op.value = itemsList[q].value;
				op.innerHTML = itemsList[q].name;
				getElement("product-dropdown-"+i).appendChild(op);
			}
			$("#product-dropdown-"+i).dropdown();
			$("#product-row-"+(i - 1)+" .cancel-buttons").attr("disabled", false);
			calculateTable(getElement("product-quantity-"+(i - 1)));
		}
	}
}

function removeRow(e)
{
	let row = e.getAttribute("row-num");
	getElement("products-table").removeChild(getElement("product-row-"+row));
	let rows = document.getElementsByClassName("product-row");
	if(rows.length <= 1)
	{
		$(".cancel-buttons").attr("disabled", true);
	}

	//recalculate table
	let qtyTotal = 0;
	let qty = document.getElementsByClassName("product-quantity-input");
	for(let q = 0; q < qty.length; q++)
	{
		let ro = qty[q].getAttribute("row-num");
		if((Number(qty[q].value)) && ($("#product-dropdown-"+ro).val() != ""))
		{
			qtyTotal += Number(qty[q].value);
		}
	}
	if(qtyTotal == 0)
	{
		$("#qty-total").html(qtyTotal.toFixed(2));
	}
	else
	{
		if(Number(qtyTotal.toFixed(2).toString().split(".")[1]) > 0)
		{
			$("#qty-total").html(qtyTotal.toFixed(2));
		}
		else
		{
			$("#qty-total").html(qtyTotal);
		}
	}

	let amtTotal = 0;

	let amt = document.getElementsByClassName("product-total-input");
	if(amt.length > 0)
	{
		for(let q = 0; q < amt.length; q++)
		{
			let ro = amt[q].getAttribute("row-num");
			if((Number(amt[q].value)) && ($("#product-dropdown-"+ro).val() != ""))
			{
				amtTotal += Number(amt[q].value);
			}
		}
		$("#amt-total").html(numFormat(amtTotal.toFixed(2)));
	}
}

function calculateTable(e)
{
	if((!Number(e.value)) && (Number(e.value) !== 0))
	{
		$(e).css("color","red");

		if(!$(e.parentNode).hasClass("shaking"))
		{
			$(e.parentNode).addClass("shaking");
			$(e.parentNode).transition("shake", function(){
				$(e.parentNode).removeClass("shaking");
			});
		}
	}
	else
	{
		let row = Number(e.getAttribute("row-num"));
		$(e).css("color","black");

		if($("#product-dropdown-"+row).val() != "")
		{
			if(getElement("product-rate-"+row) != null)
			{
				let amount = Number((Number($("#product-quantity-"+row).val()) * Number($("#product-rate-"+row).val()))).toFixed(2);

				if(Number(amount.toString().split(".")[1]) > 0)
				{
					$("#product-total-"+row).val(amount);
				}
				else
				{
					if(Number(amount) > 0)
					{
						$("#product-total-"+row).val(amount.toString().split(".")[0]);
					}
					else
					{
						$("#product-total-"+row).val(amount);
					}
				}

			}

			let qtyTotal = 0;
			let qty = document.getElementsByClassName("product-quantity-input");
			for(let q = 0; q < qty.length; q++)
			{
				let ro = qty[q].getAttribute("row-num");
				if((Number(qty[q].value)) && ($("#product-dropdown-"+ro).val() != ""))
				{
					qtyTotal += Number(qty[q].value);
				}
			}
			if(qtyTotal == 0)
			{
				$("#qty-total").html(qtyTotal.toFixed(2));
			}
			else
			{
				if(Number(qtyTotal.toFixed(2).toString().split(".")[1]) > 0)
				{
					$("#qty-total").html(qtyTotal.toFixed(2));
				}
				else
				{
					$("#qty-total").html(qtyTotal);
				}
			}

			let amtTotal = 0;
			if(getElement("product-rate-"+row) != null)
			{
				let amt = document.getElementsByClassName("product-total-input");
				for(let q = 0; q < amt.length; q++)
				{
					let ro = amt[q].getAttribute("row-num");
					if((Number(amt[q].value)) && ($("#product-dropdown-"+ro).val() != ""))
					{
						amtTotal += Number(amt[q].value);
					}
				}
				$("#amt-total").html(numFormat(amtTotal.toFixed(2)));
			}
		}
	}
}

let itemsList = [];
function raisePurchaseRequest(e)
{
	itemsList = [];
	loadPageModal({onLoaded:function(m){

		$("#modal_"+m.modal+"-inner").html(
			"<div class='pad-3'>" +
			"<div class='align-c'>" +
			"<div class='margin-t-8'>" +
			"<div class='ui loader large active inline'></div>" +
			"<h3 class='sleak'>Please wait...</h3>" +
			"</div>" +
			"</div>" +
			"</div>");

		postJson("hms-admin/worker", function(data, status){
			$("#modal_"+m.modal+"-inner").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
					{
						itemsList.push({name:d.data[i].Name, value:d.data[i].Id});
					}

					$("#modal_"+m.modal+"-inner").html("<div class='pad-4'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l8 m8 s12'>" +
						"<h2 style='font-family: quicksandregular; color: dimgrayy'>" +
						"<i class='blue shopping basket icon'></i> Purchase Request" +
						"</h2>" +
						"<p>Request Restocking of Items</p>" +
						"</div>" +
						"<div class='w3-col l4 m4 s12 align-r'>" +
						"<button class='ui blue sleak button' onclick=\"savePurchaseRequest('"+m.modal+"', this)\">" +
						((e == "pick") ? "Save": "Raise")+"</button>" +
						"</div>" +
						"</div>" +

						"<input id='prid' type='hidden' value=''/>" +

						"</div><hr style='margin: 0px; padding: 0px;'/><br/>" +
						"<div class='pad-2'>" +
						"<table class='ui very basic celled table'>" +
						"<thead>" +
						"<tr>" +
						"<th>Item</th>" +
						"<th>Quantity</th>" +
						"<th>Rate</th>" +
						"<th>Total</th>" +
						"</tr>" +
						"</thead>" +
						"<tbody id='products-table'>" +
						"<tr class='product-row' id='product-row-0' row-num='0'>" +
						"<td class='product-dropdown-con' id='product-dropdown-con-0'>" +
						"<select id='product-dropdown-0' " +
						"class='ui wix-select-borderless product-dropdown dropdown' " +
						"style='border: none;' onchange='dropRow(this)'>" +
						"<option value=''>Select product</option>" +
						"</select>" +
						"</td>" +
						"<td>" +
						"<div class='ui input' style='max-width: 80px;'>" +
						"<input class='product-quantity-input' row-num='0' id='product-quantity-0' type='text' value='0' style='border: none;' onkeyup='calculateTable(this)' onchange='calculateTable(this)'/>" +
						"</div>" +
						"</td>" +
						"<td>" +
						"<div class='ui input' style='max-width: 80px;'>" +
						"<input class='product-rate-input' id='product-rate-0' row-num='0' type='text' value='0.00' style='border: none; text-align: right;' onkeyup='calculateTable(this)' onchange='calculateTable(this)'/>" +
						"</div>" +
						"</td>" +
						"<td>" +
						"<div class='ui input' style='max-width: 100px;'>" +
						"<input class='product-total-input' id='product-total-0' type='text' value='0.00' style='border: none; text-align: right; color: black;' disabled/>" +
						"</div>&nbsp;&nbsp;&nbsp;&nbsp;" +
						"<button class='ui mini cancel-buttons circular compact red icon button' row-num='0' onclick='removeRow(this)' disabled><i class='times icon'></i></button>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table></div>" +
						"<div class='pad-1' style='margin-bottom: 5px;'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l6 m3 s12' style='color: transparent;'>.</div>" +
						"<div class='w3-col l6 m3 s12'>" +
						"<div class='w3-row pad-2'>" +
						"<div class='w3-col l6 m6 s6'>" +
						"<h6 class='sleak' style='font-weight: bold;'>Item total</h6></div>" +
						"<div class='w3-col l6 m6 s6 align-r'>" +
						"<h6 id='qty-total' class='sleak' style='font-weight: bold;'>0.00</h6></div>" +
						"</div>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l6 m6 s6'>" +
						"<h6 class='sleak' style='font-weight: bold;'>Amount total</h6></div>" +
						"<div class='w3-col l6 m6 s6 align-r' style='padding-right: 20px;'>" +
						"<h6 id='amt-total' class='sleak' style='font-weight: bold;'>0.00</h6></div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div class='pad-2 ui form' style='margin-bottom: 100px;'>" +
						"<label class='sleak' style='font-weight: bold;'>Notes</label>" +
						"<textarea id='form-notes' class='wix-textbox' rows='3'></textarea>" +
						"</div>");

					for(let q = 0; q < itemsList.length; q++)
					{
						let op = document.createElement("option");
						op.value = itemsList[q].value;
						op.innerHTML = itemsList[q].name;
						getElement("product-dropdown-0").appendChild(op);
					}
					$("#product-dropdown-0").dropdown();

					if(e != null)
					{
						if(e === "list")
						{
							let lst = document.getElementsByClassName("check-sel");
							let errors = 0;
							let found = false;

							for(let p = 0; p < lst.length; p++)
							{
								if(lst[p].checked === true)
								{
									let el = document.getElementsByClassName("product-dropdown");
									$(el[(el.length - 1)]).dropdown('set selected', lst[p].id);
								}
							}
						}
						else if(e === "pick")
						{
							let lst = document.getElementsByClassName("item-row");
							let errors = 0;
							let found = false;

							for(let p = 0; p < lst.length; p++)
							{
								let el = document.getElementsByClassName("product-dropdown");

								if(getElement(lst[p].id+"-quantity") != null)
								{
									$("#product-quantity-"+(el.length - 1)).val(Number($("#"+lst[p].id+"-quantity").html()));
								}
								if(getElement(lst[p].id+"-rate") != null)
								{
									$("#product-rate-"+(el.length - 1)).val(Number($("#"+lst[p].id+"-rate").val()).toFixed(2));
								}
								$(el[(el.length - 1)]).dropdown('set selected', lst[p].id);
							}

							if(getArg() != null)
							{
								$("#prid").val(getArg());
							}
						}
						else
						{
							$("#product-dropdown-0").dropdown('set selected', e);
						}
					}
				}
				else
				{
					closeGenModal(m.modal, function(){
						ShowModal(d.message);
					});
				}
			}
			else
			{
				closeGenModal(m.modal, function(){
					ShowModal("Connection error. Unable initialize form");
				});
			}
		},{job:"get inventory items", item_type:$("#inventory-item-type").val(),
			filter:"all", searchterm:"", Page:0, Perpage:0});
	}});
}

function recordUsage(e)
{
	itemsList = [];
	loadPageModal({size:"ms", onLoaded:function(m){

			$("#modal_"+m.modal+"-inner").html(
				"<div class='pad-3'>" +
				"<div class='align-c'>" +
				"<div class='margin-t-8'>" +
				"<div class='ui loader large active inline'></div>" +
				"<h3 class='sleak'>Please wait...</h3>" +
				"</div>" +
				"</div>" +
				"</div>");

			postJson("hms-admin/worker", function(data, status){
				$("#modal_"+m.modal+"-inner").html("");
				if(status === "done")
				{
					let d = JSON.parse(data);

					if(d.status === "success")
					{
						for(let i = 0; i < d.data.length; i++)
						{
							itemsList.push({name:d.data[i].Name, value:d.data[i].Id});
						}

						$("#modal_"+m.modal+"-inner").html("<div class='pad-4'>" +
							"<div class='w3-row'>" +
							"<div class='w3-col l8 m8 s12'>" +
							"<h2 style='font-family: quicksandregular; color: dimgrayy'>" +
							"<i class='blue dolly icon'></i> Record Usage" +
							"</h2>" +
							"<p>The record will automatically subtract items from the inventory</p>" +
							"</div>" +
							"<div class='w3-col l4 m4 s12 align-r'>" +
							"<button id='order-save-btn' class='ui blue sleak button' onclick=\"saveUsageData('"+m.modal+"')\">Save</button>" +
							"</div>" +
							"</div>" +

							"</div><hr style='margin: 0px; padding: 0px;'/><br/>" +
							"<div class='pad-2'>" +
							"<table class='ui very basic table'>" +
							"<thead>" +
							"<tr>" +
							"<th>Item</th>" +
							"<th>Quantity</th>" +
							"</tr>" +
							"</thead>" +
							"<tbody id='products-table'>" +
							"<tr class='product-row' id='product-row-0' row-num='0'>" +
							"<td class='product-dropdown-con' id='product-dropdown-con-0'>" +
							"<select id='product-dropdown-0' " +
							"class='ui wix-select-borderless product-dropdown dropdown' " +
							"style='border: none;' onchange='dropRow(this)'>" +
							"<option value=''>Select product</option>" +
							"</select>" +
							"</td>" +
							"<td>" +
							"<div class='ui input' style='max-width: 80px;'>" +
							"<input class='product-quantity-input' row-num='0' id='product-quantity-0' type='text' value='0' style='border: none;' onkeyup='calculateTable(this)' onchange='calculateTable(this)'/>" +
							"</div>&nbsp;&nbsp;&nbsp;&nbsp;" +
							"<button class='ui mini cancel-buttons circular compact red icon button' row-num='0' onclick='removeRow(this)' disabled><i class='times icon'></i></button>" +
							"</td>" +
							"</tr>" +
							"</tbody>" +
							"</table></div>" +
							"<div class='pad-1' style='margin-bottom: 5px;'>" +
							"<div class='w3-row'>" +
							"<div class='w3-col l6 m3 s12' style='color: transparent;'>.</div>" +
							"<div class='w3-col l6 m3 s12'>" +
							"<div class='w3-row pad-2'>" +
							"<div class='w3-col l6 m6 s6'>" +
							"<h6 class='sleak' style='font-weight: bold;'>Item total</h6></div>" +
							"<div class='w3-col l6 m6 s6 align-r'>" +
							"<h6 id='qty-total' class='sleak' style='font-weight: bold;'>0.00</h6></div>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"<div class='pad-2 ui form' style='margin-bottom: 100px;'>" +
							"<label class='sleak' style='font-weight: bold;'>Notes</label>" +
							"<textarea id='form-notes' class='wix-textbox' rows='3'></textarea>" +
							"</div>");

						for(let q = 0; q < itemsList.length; q++)
						{
							let op = document.createElement("option");
							op.value = itemsList[q].value;
							op.innerHTML = itemsList[q].name;
							getElement("product-dropdown-0").appendChild(op);
						}
						$("#product-dropdown-0").dropdown();

						if(e != null)
						{
							if(e === "list")
							{
								let lst = document.getElementsByClassName("check-sel");
								let errors = 0;
								let found = false;

								for(let p = 0; p < lst.length; p++)
								{
									if(lst[p].checked === true)
									{
										let el = document.getElementsByClassName("product-dropdown");
										$(el[(el.length - 1)]).dropdown('set selected', lst[p].id);
									}
								}
							}
							else
							{
								$("#product-dropdown-0").dropdown('set selected', e);
							}
						}
					}
					else
					{
						closeGenModal(m.modal, function(){
							ShowModal(d.message);
						});
					}
				}
				else
				{
					closeGenModal(m.modal, function(){
						ShowModal("Connection error. Unable initialize form");
					});
				}
			},{job:"get inventory items", item_type:$("#inventory-item-type").val(),
				filter:"all", searchterm:"", Page:0, Perpage:0});
		}});
}

function recordDamage(e)
{
	itemsList = [];
	loadPageModal({size:"ms", onLoaded:function(m){

		$("#modal_"+m.modal+"-inner").html(
			"<div class='pad-3'>" +
			"<div class='align-c'>" +
			"<div class='margin-t-8'>" +
			"<div class='ui loader large active inline'></div>" +
			"<h3 class='sleak'>Please wait...</h3>" +
			"</div>" +
			"</div>" +
			"</div>");

		postJson("hms-admin/worker", function(data, status){
			$("#modal_"+m.modal+"-inner").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
					{
						itemsList.push({name:d.data[i].Name, value:d.data[i].Id});
					}

					$("#modal_"+m.modal+"-inner").html("<div class='pad-4'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l8 m8 s12'>" +
						"<h2 style='font-family: quicksandregular; color: dimgrayy'>" +
						"<i class='blue ban icon'></i> Record Damage / Loss" +
						"</h2>" +
						"<p>The record will automatically subtract items from the inventory</p>" +
						"</div>" +
						"<div class='w3-col l4 m4 s12 align-r'>" +
						"<button class='ui blue sleak button' onclick=\"saveDamageData('"+m.modal+"')\">Save</button>" +
						"</div>" +
						"</div>" +

						"</div><hr style='margin: 0px; padding: 0px;'/><br/>" +
						"<div class='pad-2'>" +
						"<table class='ui very basic table'>" +
						"<thead>" +
						"<tr>" +
						"<th>Item</th>" +
						"<th>Quantity</th>" +
						"</tr>" +
						"</thead>" +
						"<tbody id='products-table'>" +
						"<tr class='product-row' id='product-row-0' row-num='0'>" +
						"<td class='product-dropdown-con' id='product-dropdown-con-0'>" +
						"<select id='product-dropdown-0' " +
						"class='ui wix-select-borderless product-dropdown dropdown' " +
						"style='border: none;' onchange='dropRow(this)'>" +
						"<option value=''>Select product</option>" +
						"</select>" +
						"</td>" +
						"<td>" +
						"<div class='ui input' style='max-width: 80px;'>" +
						"<input class='product-quantity-input' row-num='0' id='product-quantity-0' type='text' value='0' style='border: none;' onkeyup='calculateTable(this)' onchange='calculateTable(this)'/>" +
						"</div>&nbsp;&nbsp;&nbsp;&nbsp;" +
						"<button class='ui mini cancel-buttons circular compact red icon button' row-num='0' onclick='removeRow(this)' disabled><i class='times icon'></i></button>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table></div>" +
						"<div class='pad-1' style='margin-bottom: 5px;'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l6 m3 s12' style='color: transparent;'>.</div>" +
						"<div class='w3-col l6 m3 s12'>" +
						"<div class='w3-row pad-2'>" +
						"<div class='w3-col l6 m6 s6'>" +
						"<h6 class='sleak' style='font-weight: bold;'>Item total</h6></div>" +
						"<div class='w3-col l6 m6 s6 align-r'>" +
						"<h6 id='qty-total' class='sleak' style='font-weight: bold;'>0.00</h6></div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div class='pad-2 ui form' style='margin-bottom: 100px;'>" +
						"<label class='sleak' style='font-weight: bold;'>Notes</label>" +
						"<textarea id='form-notes' class='wix-textbox' rows='3'></textarea>" +
						"</div>");

					for(let q = 0; q < itemsList.length; q++)
					{
						let op = document.createElement("option");
						op.value = itemsList[q].value;
						op.innerHTML = itemsList[q].name;
						getElement("product-dropdown-0").appendChild(op);
					}
					$("#product-dropdown-0").dropdown();

					if(e != null)
					{
						if(e === "list")
						{
							let lst = document.getElementsByClassName("check-sel");
							let errors = 0;
							let found = false;

							for(let p = 0; p < lst.length; p++)
							{
								if(lst[p].checked === true)
								{
									let el = document.getElementsByClassName("product-dropdown");
									$(el[(el.length - 1)]).dropdown('set selected', lst[p].id);
								}
							}
						}
						else
						{
							$("#product-dropdown-0").dropdown('set selected', e);
						}
					}
				}
				else
				{
					closeGenModal(m.modal, function(){
						ShowModal(d.message);
					});
				}
			}
			else
			{
				closeGenModal(m.modal, function(){
					ShowModal("Connection error. Unable initialize form");
				});
			}
		},{job:"get inventory items", item_type:$("#inventory-item-type").val(),
			filter:"all", searchterm:"", Page:0, Perpage:0});
	}});
}

function recordSurplus(e)
{
	itemsList = [];
	loadPageModal({size:"ms", onLoaded:function(m){

		$("#modal_"+m.modal+"-inner").html(
			"<div class='pad-3'>" +
			"<div class='align-c'>" +
			"<div class='margin-t-8'>" +
			"<div class='ui loader large active inline'></div>" +
			"<h3 class='sleak'>Please wait...</h3>" +
			"</div>" +
			"</div>" +
			"</div>");

		postJson("hms-admin/worker", function(data, status){
			$("#modal_"+m.modal+"-inner").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
					{
						itemsList.push({name:d.data[i].Name, value:d.data[i].Id});
					}

					$("#modal_"+m.modal+"-inner").html("<div class='pad-4'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l8 m8 s12'>" +
						"<h2 style='font-family: quicksandregular; color: dimgrayy'>" +
						"<i class='blue dolly flatbed icon'></i> Record Surplus" +
						"</h2>" +
						"<p>The record will automatically increment items in the inventory</p>" +
						"</div>" +
						"<div class='w3-col l4 m4 s12 align-r'>" +
						"<button class='ui blue sleak button' onclick=\"saveSurplusData('"+m.modal+"')\">Save</button>" +
						"</div>" +
						"</div>" +

						"</div><hr style='margin: 0px; padding: 0px;'/><br/>" +
						"<div class='pad-2'>" +
						"<table class='ui very basic table'>" +
						"<thead>" +
						"<tr>" +
						"<th>Item</th>" +
						"<th>Quantity</th>" +
						"</tr>" +
						"</thead>" +
						"<tbody id='products-table'>" +
						"<tr class='product-row' id='product-row-0' row-num='0'>" +
						"<td class='product-dropdown-con' id='product-dropdown-con-0'>" +
						"<select id='product-dropdown-0' " +
						"class='ui wix-select-borderless product-dropdown dropdown' " +
						"style='border: none;' onchange='dropRow(this)'>" +
						"<option value=''>Select product</option>" +
						"</select>" +
						"</td>" +
						"<td>" +
						"<div class='ui input' style='max-width: 80px;'>" +
						"<input class='product-quantity-input' row-num='0' id='product-quantity-0' type='text' value='0' style='border: none;' onkeyup='calculateTable(this)' onchange='calculateTable(this)'/>" +
						"</div>&nbsp;&nbsp;&nbsp;&nbsp;" +
						"<button class='ui mini cancel-buttons circular compact red icon button' row-num='0' onclick='removeRow(this)' disabled><i class='times icon'></i></button>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table></div>" +
						"<div class='pad-1' style='margin-bottom: 5px;'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l6 m3 s12' style='color: transparent;'>.</div>" +
						"<div class='w3-col l6 m3 s12'>" +
						"<div class='w3-row pad-2'>" +
						"<div class='w3-col l6 m6 s6'>" +
						"<h6 class='sleak' style='font-weight: bold;'>Item total</h6></div>" +
						"<div class='w3-col l6 m6 s6 align-r'>" +
						"<h6 id='qty-total' class='sleak' style='font-weight: bold;'>0.00</h6></div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div class='pad-2 ui form' style='margin-bottom: 100px;'>" +
						"<label class='sleak' style='font-weight: bold;'>Notes</label>" +
						"<textarea id='form-notes' class='wix-textbox' rows='3'></textarea>" +
						"</div>");

					for(let q = 0; q < itemsList.length; q++)
					{
						let op = document.createElement("option");
						op.value = itemsList[q].value;
						op.innerHTML = itemsList[q].name;
						getElement("product-dropdown-0").appendChild(op);
					}
					$("#product-dropdown-0").dropdown();

					if(e != null)
					{
						if(e === "list")
						{
							let lst = document.getElementsByClassName("check-sel");
							let errors = 0;
							let found = false;

							for(let p = 0; p < lst.length; p++)
							{
								if(lst[p].checked === true)
								{
									let el = document.getElementsByClassName("product-dropdown");
									$(el[(el.length - 1)]).dropdown('set selected', lst[p].id);
								}
							}
						}
						else
						{
							$("#product-dropdown-0").dropdown('set selected', e);
						}
					}
				}
				else
				{
					closeGenModal(m.modal, function(){
						ShowModal(d.message);
					});
				}
			}
			else
			{
				closeGenModal(m.modal, function(){
					ShowModal("Connection error. Unable initialize form");
				});
			}
		},{job:"get inventory items", item_type:$("#inventory-item-type").val(),
			filter:"all", searchterm:"", Page:0, Perpage:0});
	}});
}

function recordReturn(e)
{
	itemsList = [];
	loadPageModal({size:"ms", onLoaded:function(m){

		$("#modal_"+m.modal+"-inner").html(
			"<div class='pad-3'>" +
			"<div class='align-c'>" +
			"<div class='margin-t-8'>" +
			"<div class='ui loader large active inline'></div>" +
			"<h3 class='sleak'>Please wait...</h3>" +
			"</div>" +
			"</div>" +
			"</div>");

		postJson("hms-admin/worker", function(data, status){
			$("#modal_"+m.modal+"-inner").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
					{
						itemsList.push({name:d.data[i].Name, value:d.data[i].Id});
					}

					$("#modal_"+m.modal+"-inner").html("<div class='pad-4'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l8 m8 s12'>" +
						"<h2 style='font-family: quicksandregular; color: dimgrayy'>" +
						"<i class='blue shipping fast icon'></i> Record Return" +
						"</h2>" +
						"<p>The record will automatically increment items in the inventory</p>" +
						"</div>" +
						"<div class='w3-col l4 m4 s12 align-r'>" +
						"<button class='ui blue sleak button' onclick=\"saveReturnData('"+m.modal+"')\">Save</button>" +
						"</div>" +
						"</div>" +

						"</div><hr style='margin: 0px; padding: 0px;'/><br/>" +
						"<div class='pad-2'>" +
						"<table class='ui very basic table'>" +
						"<thead>" +
						"<tr>" +
						"<th>Item</th>" +
						"<th>Quantity</th>" +
						"</tr>" +
						"</thead>" +
						"<tbody id='products-table'>" +
						"<tr class='product-row' id='product-row-0' row-num='0'>" +
						"<td class='product-dropdown-con' id='product-dropdown-con-0'>" +
						"<select id='product-dropdown-0' " +
						"class='ui wix-select-borderless product-dropdown dropdown' " +
						"style='border: none;' onchange='dropRow(this)'>" +
						"<option value=''>Select product</option>" +
						"</select>" +
						"</td>" +
						"<td>" +
						"<div class='ui input' style='max-width: 80px;'>" +
						"<input class='product-quantity-input' row-num='0' id='product-quantity-0' type='text' value='0' style='border: none;' onkeyup='calculateTable(this)' onchange='calculateTable(this)'/>" +
						"</div>&nbsp;&nbsp;&nbsp;&nbsp;" +
						"<button class='ui mini cancel-buttons circular compact red icon button' row-num='0' onclick='removeRow(this)' disabled><i class='times icon'></i></button>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table></div>" +
						"<div class='pad-1' style='margin-bottom: 5px;'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l6 m3 s12' style='color: transparent;'>.</div>" +
						"<div class='w3-col l6 m3 s12'>" +
						"<div class='w3-row pad-2'>" +
						"<div class='w3-col l6 m6 s6'>" +
						"<h6 class='sleak' style='font-weight: bold;'>Item total</h6></div>" +
						"<div class='w3-col l6 m6 s6 align-r'>" +
						"<h6 id='qty-total' class='sleak' style='font-weight: bold;'>0.00</h6></div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div class='pad-2 ui form' style='margin-bottom: 100px;'>" +
						"<label class='sleak' style='font-weight: bold;'>Notes</label>" +
						"<textarea id='form-notes' class='wix-textbox' rows='3'></textarea>" +
						"</div>");

					for(let q = 0; q < itemsList.length; q++)
					{
						let op = document.createElement("option");
						op.value = itemsList[q].value;
						op.innerHTML = itemsList[q].name;
						getElement("product-dropdown-0").appendChild(op);
					}
					$("#product-dropdown-0").dropdown();

					if(e != null)
					{
						if(e === "list")
						{
							let lst = document.getElementsByClassName("check-sel");
							let errors = 0;
							let found = false;

							for(let p = 0; p < lst.length; p++)
							{
								if(lst[p].checked === true)
								{
									let el = document.getElementsByClassName("product-dropdown");
									$(el[(el.length - 1)]).dropdown('set selected', lst[p].id);
								}
							}
						}
						else
						{
							$("#product-dropdown-0").dropdown('set selected', e);
						}
					}
				}
				else
				{
					closeGenModal(m.modal, function(){
						ShowModal(d.message);
					});
				}
			}
			else
			{
				closeGenModal(m.modal, function(){
					ShowModal("Connection error. Unable initialize form");
				});
			}
		},{job:"get inventory items", item_type:$("#inventory-item-type").val(),
			filter:"all", searchterm:"", Page:0, Perpage:0});
	}});
}

function runPriceEnquiry(e)
{
	itemsList = [];
	loadPageModal({size:"ms", onLoaded:function(m){

		$("#modal_"+m.modal+"-inner").html(
			"<div class='pad-3'>" +
			"<div class='align-c'>" +
			"<div class='margin-t-8'>" +
			"<div class='ui loader large active inline'></div>" +
			"<h3 class='sleak'>Please wait...</h3>" +
			"</div>" +
			"</div>" +
			"</div>");

		postJson("hms-admin/worker", function(data, status){
			$("#modal_"+m.modal+"-inner").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					for(let i = 0; i < d.data.length; i++)
					{
						itemsList.push({name:d.data[i].Name, value:d.data[i].Id});
					}

					$("#modal_"+m.modal+"-inner").html("<div class='pad-4'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l8 m8 s12'>" +
						"<h2 style='font-family: quicksandregular; color: dimgrayy'>" +
						"<i class='blue money icon'></i> Price Enquiry" +
						"</h2>" +
						"<p>Find out the prices of items from your suppliers before raising a purchase request</p>" +
						"</div>" +
						"<div class='w3-col l4 m4 s12 align-r'>" +
						"<button class='ui blue sleak button' onclick=\"savePriceEnquiry('"+m.modal+"')\">Send</button>" +
						"</div>" +
						"</div>" +

						"</div><hr style='margin: 0px; padding: 0px;'/><br/>" +
						"<div class='pad-2'>" +
						"<table class='ui very basic table'>" +
						"<thead>" +
						"<tr>" +
						"<th>Item</th>" +
						"<th>Quantity</th>" +
						"</tr>" +
						"</thead>" +
						"<tbody id='products-table'>" +
						"<tr class='product-row' id='product-row-0' row-num='0'>" +
						"<td class='product-dropdown-con' id='product-dropdown-con-0'>" +
						"<select id='product-dropdown-0' " +
						"class='ui wix-select-borderless product-dropdown dropdown' " +
						"style='border: none;' onchange='dropRow(this)'>" +
						"<option value=''>Select product</option>" +
						"</select>" +
						"</td>" +
						"<td>" +
						"<div class='ui input' style='max-width: 80px;'>" +
						"<input class='product-quantity-input' row-num='0' id='product-quantity-0' type='text' value='0' style='border: none;' onkeyup='calculateTable(this)' onchange='calculateTable(this)'/>" +
						"</div>&nbsp;&nbsp;&nbsp;&nbsp;" +
						"<button class='ui mini cancel-buttons circular compact red icon button' row-num='0' onclick='removeRow(this)' disabled><i class='times icon'></i></button>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table></div>" +
						"<div class='pad-1' style='margin-bottom: 5px;'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l6 m3 s12' style='color: transparent;'>.</div>" +
						"<div class='w3-col l6 m3 s12'>" +
						"<div class='w3-row pad-2'>" +
						"<div class='w3-col l6 m6 s6'>" +
						"<h6 class='sleak' style='font-weight: bold;'>Item total</h6></div>" +
						"<div class='w3-col l6 m6 s6 align-r'>" +
						"<h6 id='qty-total' class='sleak' style='font-weight: bold;'>0.00</h6></div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div class='pad-2' style='margin-bottom: 100px;'>" +
						"<div class='w3-row'>" +
						"<div class='w3-col l7 m7 s'>" +
						"<label>" +
						"<input id='associated-suppliers' class='with-gap' name='supplier-source' type='radio' checked onchange=\"switchSupplier('associated')\"/>" +
						"<span>Send to associated suppliers</span>" +
						"</label>" +
						"<br/><br/>" +
						"<label>" +
						"<input class='with-gap' name='supplier-source' type='radio' onchange=\"switchSupplier('add')\"/>" +
						"<span>Send to added suppliers</span>" +
						"</label>" +
						"</div>" +
						"<div class='w3-col l5 m5 s5'>" +
						"<label>" +
						"<input id='send-email' class='filled-in' type='checkbox' onchange=\"switchSupplier('add')\"/>" +
						"<span>Send Email</span>" +
						"</label>" +
						"<br/><br/>" +
						"<label>" +
						"<input id='send-sms' class='filled-in' name='supplier-source' type='checkbox' onchange=\"switchSupplier('add')\"/>" +
						"<span>Send SMS</span>" +
						"</label>" +
						"</div>" +
						"</div>" +
						"<div><br/>" +
						"<select id='suppliers-list' class='ui search fluid dropdown' multiple>" +
						"<option value=''>Add suppliers</option>" +
						"</select>" +
						"<br/>" +
						"</div>" +
						"<div class='ui form'>" +
						"<label class='sleak' style='font-weight: bold;'>Notes <small>Notes will be sent to suppliers</small></label>" +
						"<textarea id='form-notes' class='wix-textbox' rows='3'></textarea>" +
						"</div>" +
						"</div>");

					list({ con: getElement("suppliers-list"), job: 'list suppliers', all: true });
					$("#suppliers-list").dropdown();

					for(let q = 0; q < itemsList.length; q++)
					{
						let op = document.createElement("option");
						op.value = itemsList[q].value;
						op.innerHTML = itemsList[q].name;
						getElement("product-dropdown-0").appendChild(op);
					}
					$("#product-dropdown-0").dropdown();

					if(e != null)
					{
						if(e === "list")
						{
							let lst = document.getElementsByClassName("check-sel");
							let errors = 0;
							let found = false;

							for(let p = 0; p < lst.length; p++)
							{
								if(lst[p].checked === true)
								{
									let el = document.getElementsByClassName("product-dropdown");
									$(el[(el.length - 1)]).dropdown('set selected', lst[p].id);
								}
							}
						}
						else
						{
							$("#product-dropdown-0").dropdown('set selected', e);
						}
					}
				}
				else
				{
					closeGenModal(m.modal, function(){
						ShowModal(d.message);
					});
				}
			}
			else
			{
				closeGenModal(m.modal, function(){
					ShowModal("Connection error. Unable initialize form");
				});
			}
		},{job:"get inventory items", item_type:$("#inventory-item-type").val(),
			filter:"all", searchterm:"", Page:0, Perpage:0});
	}});
}



//----------------------------------- Send orders to server --------------------------------------
function serializeTableData()
{
	let ret = [];
	let rows = document.getElementsByClassName("product-row");

	for(let i = 0; i < rows.length; i++)
	{
		let numrows = rows[i].getAttribute("row-num");

		if($("#product-dropdown-"+numrows).dropdown("get value") != "")
		{
			let d = $("#product-dropdown-"+numrows).dropdown("get value");

			if(Number($("#product-quantity-"+numrows).val()))
			{
				d += ":" + Number($("#product-quantity-"+numrows).val()).toString();
			}
			else
			{
				ret = Number($("#product-quantity-"+numrows).val()) == 0 ?
					"The quantity of "+$("#product-dropdown-"+numrows).dropdown("get text")+" is zero" :
					"The quantity of "+$("#product-dropdown-"+numrows).dropdown("get text")+" is not a number";
				return ret;
			}

			if(getElement("product-rate-"+numrows) != null)
			{
				if(Number($("#product-rate-"+numrows).val()))
				{
					d += ":" + Number($("#product-rate-"+numrows).val()).toString();
				}
				else
				{
					ret = Number($("#product-rate-"+numrows).val()) == 0 ?
						"The quantity of "+$("#product-dropdown-"+numrows).dropdown("get text")+" is zero" :
						"The quantity of "+$("#product-dropdown-"+numrows).dropdown("get text")+" is not a number";
					return ret;
				}
			}
			ret.push(d);
		}
	}
	return ret;
}


//--------------------------------------- Save data--------------------------------------

function getCover()
{
	let cover = document.createElement("div");
	cover.style.position = "absolute";
	cover.style.width = "100%";
	cover.style.height = "100%";
	cover.style.top = "0px";
	cover.style.backgroundColor = "rgba(255,255,255,0.7)";
	cover.style.zIndex = 300;
	cover.className = "align-c";
	cover.innerHTML = "<div style='margin-top: 130px;'>" +
		"<div class='ui active inline loader'></div><h3 class='sleak'>Processing...</h3></div>";

	return cover;
}

function saveUsageData(m)
{
	let request = {
		data:serializeTableData(),
		note:$("#form-notes").val(),
		item_type:$("#inventory-item-type").val(),
		activity:"usage",
		job:"save inventory activity"
	};

	if(request.data.length == 0)
	{
		ShowModal("No item have been added");
	}
	else if(typeof(request.data) == "string")
	{
		ShowModal(request.data);
	}
	else
	{
		let cover = getCover();
		getElement("modal_"+m+"-inner").appendChild(cover);
		postJson("hms-admin/worker", function(data, status){
			getElement("modal_"+m+"-inner").removeChild(cover);
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#modal_"+m+"-inner").html("<div id='success-con' style='margin-top: 150px; text-align: center; display: none;'>" +
						"<h3 class='ui center aligned icon header'>" +
						"<i class='circular green check icon'></i>" +
						"</h3>" +
						"<h3 class='sleak'>Record saved successfully</h3>" +
						"</div>");
					$("#success-con").transition('drop in', function(){
						setTimeout(function(){
							getElement("modal_"+m).click();
						}, 2000);
					});

					for(let i = 0; i < d.data.length; i++)
					{
						if(getElement(d.data[i].Id) != null)
						{
							if(d.data[i].Stock == 0)
							{
								$("#"+d.data[i].Id + "-row").addClass("negative");
								$("#"+d.data[i].Id + "-row").removeClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='red-back status'>Out of stock</label>");
							}
							else if(d.data[i].Stock <= d.data[i].Lowstockpoint)
							{
								$("#"+d.data[i].Id + "-row").removeClass("negative");
								$("#"+d.data[i].Id + "-row").addClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='yellow-back status'>Low stock</label>");
							}
							else
							{
								$("#"+d.data[i].Id + "-row").removeClass("negative");
								$("#"+d.data[i].Id + "-row").removeClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='green-back status'>In Stock</label>");
							}
							$("#"+d.data[i].Id+"-stock-con").html(numFormat(Number(d.data[i].Stock)));

							$("#item-instock-statistic").html(d.instockcount);
							$("#item-lowstock-statistic").html(d.lowstockcount);
							$("#item-outofstock-statistic").html(d.outofstockcount);
						}
					}
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Check your connection and try again");
			}
		},request);
	}
}

function saveSurplusData(m)
{
	let request = {
		data:serializeTableData(),
		note:$("#form-notes").val(),
		item_type:$("#inventory-item-type").val(),
		activity:"surplus",
		job:"save inventory activity"
	};

	if(request.data.length == 0)
	{
		ShowModal("No item have been added");
	}
	else if(typeof(request.data) == "string")
	{
		ShowModal(request.data);
	}
	else
	{
		let cover = getCover();
		getElement("modal_"+m+"-inner").appendChild(cover);
		postJson("hms-admin/worker", function(data, status){
			getElement("modal_"+m+"-inner").removeChild(cover);
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#modal_"+m+"-inner").html("<div id='success-con' style='margin-top: 150px; text-align: center; display: none;'>" +
						"<h3 class='ui center aligned icon header'>" +
						"<i class='circular green check icon'></i>" +
						"</h3>" +
						"<h3 class='sleak'>Record saved successfully</h3>" +
						"</div>");
					$("#success-con").transition('drop in', function(){
						setTimeout(function(){
							getElement("modal_"+m).click();
						}, 2000);
					});

					for(let i = 0; i < d.data.length; i++)
					{
						if(getElement(d.data[i].Id) != null)
						{
							if(d.data[i].Stock == 0)
							{
								$("#"+d.data[i].Id + "-row").addClass("negative");
								$("#"+d.data[i].Id + "-row").removeClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='red-back status'>Out of stock</label>");
							}
							else if(d.data[i].Stock <= d.data[i].Lowstockpoint)
							{
								$("#"+d.data[i].Id + "-row").removeClass("negative");
								$("#"+d.data[i].Id + "-row").addClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='yellow-back status'>Low stock</label>");
							}
							else
							{
								$("#"+d.data[i].Id + "-row").removeClass("negative");
								$("#"+d.data[i].Id + "-row").removeClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='green-back status'>In Stock</label>");
							}
							$("#"+d.data[i].Id+"-stock-con").html(numFormat(Number(d.data[i].Stock)));

							$("#item-instock-statistic").html(d.instockcount);
							$("#item-lowstock-statistic").html(d.lowstockcount);
							$("#item-outofstock-statistic").html(d.outofstockcount);
						}
					}
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Check your connection and try again");
			}
		},request);
	}
}

function saveDamageData(m)
{
	let request = {
		data:serializeTableData(),
		note:$("#form-notes").val(),
		item_type:$("#inventory-item-type").val(),
		activity:"damage",
		job:"save inventory activity"
	};

	if(request.data.length == 0)
	{
		ShowModal("No item have been added");
	}
	else if(typeof(request.data) == "string")
	{
		ShowModal(request.data);
	}
	else
	{
		let cover = getCover();
		getElement("modal_"+m+"-inner").appendChild(cover);
		postJson("hms-admin/worker", function(data, status){
			getElement("modal_"+m+"-inner").removeChild(cover);
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#modal_"+m+"-inner").html("<div id='success-con' style='margin-top: 150px; text-align: center; display: none;'>" +
						"<h3 class='ui center aligned icon header'>" +
						"<i class='circular green check icon'></i>" +
						"</h3>" +
						"<h3 class='sleak'>Record saved successfully</h3>" +
						"</div>");
					$("#success-con").transition('drop in', function(){
						setTimeout(function(){
							getElement("modal_"+m).click();
						}, 2000);
					});

					for(let i = 0; i < d.data.length; i++)
					{
						if(getElement(d.data[i].Id) != null)
						{
							if(d.data[i].Stock == 0)
							{
								$("#"+d.data[i].Id + "-row").addClass("negative");
								$("#"+d.data[i].Id + "-row").removeClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='red-back status'>Out of stock</label>");
							}
							else if(d.data[i].Stock <= d.data[i].Lowstockpoint)
							{
								$("#"+d.data[i].Id + "-row").removeClass("negative");
								$("#"+d.data[i].Id + "-row").addClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='yellow-back status'>Low stock</label>");
							}
							else
							{
								$("#"+d.data[i].Id + "-row").removeClass("negative");
								$("#"+d.data[i].Id + "-row").removeClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='green-back status'>In Stock</label>");
							}
							$("#"+d.data[i].Id+"-stock-con").html(numFormat(Number(d.data[i].Stock)));

							$("#item-instock-statistic").html(d.instockcount);
							$("#item-lowstock-statistic").html(d.lowstockcount);
							$("#item-outofstock-statistic").html(d.outofstockcount);
						}
					}
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Check your connection and try again");
			}
		},request);
	}
}

function saveReturnData(m)
{
	let request = {
		data:serializeTableData(),
		note:$("#form-notes").val(),
		item_type:$("#inventory-item-type").val(),
		activity:"return",
		job:"save inventory activity"
	};

	if(request.data.length == 0)
	{
		ShowModal("No item have been added");
	}
	else if(typeof(request.data) == "string")
	{
		ShowModal(request.data);
	}
	else
	{
		let cover = getCover();
		getElement("modal_"+m+"-inner").appendChild(cover);
		postJson("hms-admin/worker", function(data, status){
			getElement("modal_"+m+"-inner").removeChild(cover);
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#modal_"+m+"-inner").html("<div id='success-con' style='margin-top: 150px; text-align: center; display: none;'>" +
						"<h3 class='ui center aligned icon header'>" +
						"<i class='circular green check icon'></i>" +
						"</h3>" +
						"<h3 class='sleak'>Record saved successfully</h3>" +
						"</div>");
					$("#success-con").transition('drop in', function(){
						setTimeout(function(){
							getElement("modal_"+m).click();
						}, 2000);
					});

					for(let i = 0; i < d.data.length; i++)
					{
						if(getElement(d.data[i].Id) != null)
						{
							if(d.data[i].Stock == 0)
							{
								$("#"+d.data[i].Id + "-row").addClass("negative");
								$("#"+d.data[i].Id + "-row").removeClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='red-back status'>Out of stock</label>");
							}
							else if(d.data[i].Stock <= d.data[i].Lowstockpoint)
							{
								$("#"+d.data[i].Id + "-row").removeClass("negative");
								$("#"+d.data[i].Id + "-row").addClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='yellow-back status'>Low stock</label>");
							}
							else
							{
								$("#"+d.data[i].Id + "-row").removeClass("negative");
								$("#"+d.data[i].Id + "-row").removeClass("warning");
								$("#"+d.data[i].Id+"-status-con").html("<label class='green-back status'>In Stock</label>");
							}
							$("#"+d.data[i].Id+"-stock-con").html(numFormat(Number(d.data[i].Stock)));

							$("#item-instock-statistic").html(d.instockcount);
							$("#item-lowstock-statistic").html(d.lowstockcount);
							$("#item-outofstock-statistic").html(d.outofstockcount);
						}
					}
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Check your connection and try again");
			}
		},request);
	}
}

function savePurchaseRequest(m, btn)
{
	let request = {
		data:serializeTableData(),
		prid:$("#prid").val(),
		note:$("#form-notes").val(),
		item_type:$("#inventory-item-type").val(),
		job:"save purchase request"
	};

	if(request.data.length == 0)
	{
		ShowModal("No item have been added");
	}
	else if(typeof(request.data) == "string")
	{
		ShowModal(request.data);
	}
	else
	{
		let cover = getCover();
		getElement("modal_"+m+"-inner").appendChild(cover);
		postJson("hms-admin/worker", function(data, status){
			getElement("modal_"+m+"-inner").removeChild(cover);
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#modal_"+m+"-inner").html("<div id='success-con' style='margin-top: 150px; text-align: center; display: none;'>" +
						"<h3 class='ui center aligned icon header'>" +
						"<i class='circular green check icon'></i>" +
						"</h3>" +
						"<h3 class='sleak'>Request raised successfully</h3>" +
						"</div>");
						$("#success-con").transition('drop in', function(){
							setTimeout(function(){
								closeGenModal(m, function(){
									if(btn.innerText.trim().toLowerCase() == "save")
									{
										populatePurchaseRequestData();
									}
								});
								//getElement("modal_"+m).click();
							}, 2000);
						});
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Check your connection and try again");
			}
		},request);
	}
}

function savePriceEnquiry(m)
{
	let request = {
		data:serializeTableData(),
		sendmail:getElement("send-email").checked,
		sendsms:getElement("send-sms").checked,
		note:$("#form-notes").val(),
		item_type:$("#inventory-item-type").val(),
		suppliers:$("#suppliers-list").dropdown('get value'),
		toassociatedSp:getElement("associated-suppliers").checked,
		job:"send quotation request"
	};

	if(request.data.length == 0)
	{
		ShowModal("No item have been added");
	}
	else if(typeof(request.data) == "string")
	{
		ShowModal(request.data);
	}
	else if(!request.sendmail && !request.sendsms)
	{
		ShowModal("Select messaging channel. (Email or SMS)");
	}
	else if(!request.toassociatedSp && (request.suppliers == ""))
	{
		ShowModal("Add the suppliers you want to send quotation request to");
	}
	else
	{
		let cover = getCover();
		getElement("modal_"+m+"-inner").appendChild(cover);
		postJson("hms-admin/worker", function(data, status){
			getElement("modal_"+m+"-inner").removeChild(cover);
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#modal_"+m+"-inner").html("<div class='l-pad-9 s-pad-1' id='success-con' " +
						"style='margin-top: 150px; text-align: center; display: none;'>" +
						"<h3 class='ui center aligned icon header'>" +
						"<i class='circular green check icon'></i>" +
						"</h3>" +
						"<h3 class='sleak' style='line-height: 170%;'>" +
						"Messaging have been scheduled and will be sent in a minuite" +
						"</h3>" +
						"</div>");
					$("#success-con").transition('drop in', function(){
						setTimeout(function(){
							getElement("modal_"+m).click();
						}, 4000);
					});

					if(getElement("on-enquiry-page") != null)
					{
						populatePriceEnquiary();
					}
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Check your connection and try again");
			}
		},request);
	}
}

function openItemTimeline(e)
{
	if((e != "") && (e != null))
	{
		$("#currently-viewed-item").val(e);

		let request = {
			item_type:$("#inventory-item-type").val(),
			itemid:e,
			starttime:$("#from-date").val(),
			stoptime:$("#to-date").val(),
			filter:"all",
			job:"get item timeline"
		};

		if($("#timeline-filter").dropdown('get value').toString().trim() != "")
		{
			request.filter = $("#timeline-filter").dropdown('get value').toString().trim();
		}

		$("#inventory-timeline-con").html(
			"<br/>" +
			"<div class='widget curve lift-1 pad-1 l-width-8' style='margin: auto;'>" +
			"<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>" +
			"</div><br/>" +
			"<div class='widget curve lift-1 pad-1 l-width-8' style='margin: auto;'>" +
			"<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>" +
			"</div>");

		postJson("hms-admin/worker", function(data, status){
			$("#inventory-timeline-con").html("");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					let con = document.createElement("div");
					con.className = "w3-row";
					con.style.marginTop = "20px";
					con.innerHTML =
						"<div class='w3-row' style='margin-top: 20px;'>" +
						"<div class='w3-col l3 m4 s4'>" +
						"<div class='align-r pad-1'>" +
						"<label class='sleak widget lift-1 curve' " +
						"style='display: inline-block; font-weight: bold; padding: 7px;'>Item Details</label>" +
						"</div>" +
						"</div>" +
						"<div class='w3-col l9 m8 s8'>" +
						"<div class='l-width-8 pad-1'>" +
						"<div id='item-detail-con' class='widget pad-1 lift-1 curve'>" +

						"<div class='w3-row'>" +
						"<div class='w3-col l6 m6 s6'>" +
						"<h3 class='sleak' style='font-weight: bold; color: black; margin-bottom: 0px;'>" +
						"<i class='boxes circular blue icon'></i> "+d.Item.Name +
						"</h3>" +
						"</div>" +
						"<div class='w3-col l6 m6 s6 align-r'>" +
						"<label style='cursor: pointer; color: dimgray;'>" +
						"<span style='color: rgb(235,235,235); font-weight: bold;'>"+ " details" +
						"</span>" +
						"<i class='chevron down icon' onclick=\"toggleDetail('item-detail', this)\"></i></label>" +
						"</div>" +

						"</div>" +

						"<div class='detail-con' style='display: none; margin-top: 15px;'>" +
						"<table class='ui very basic table'>" +
						"<tr>" +
						"<td>Usage</td>" +
						"<td>"+
						numFormat(Number(d.Stats.Usage))+" " + (Number(d.Stats.Usage) == 1 ? d.Item.Unit : d.Item.Pluralunit) +
						"</td>" +
						"<td>"+
						numFormat(Number(d.Stats.UsageEvents))+" " + (Number(d.Stats.UsageEvents) == 1 ? " Event" : " Events") +
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Restocked</td>" +
						"<td>"+
						numFormat(Number(d.Stats.Restocking))+" " + (Number(d.Stats.Restocking) == 1 ? d.Item.Unit : d.Item.Pluralunit) +
						"</td>" +
						"<td>"+
						numFormat(Number(d.Stats.RestockingEvents))+" " + (Number(d.Stats.RestockingEvents) == 1 ? " Event" : " Events") +
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Surplus</td>" +
						"<td>"+
						numFormat(Number(d.Stats.Surplus))+" " + (Number(d.Stats.Surplus) == 1 ? d.Item.Unit : d.Item.Pluralunit) +
						"</td>" +
						"<td>"+
						numFormat(Number(d.Stats.SurplusEvents))+" " + (Number(d.Stats.SurplusEvents) == 1 ? " Event" : " Events") +
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Damages</td>" +
						"<td>"+
						numFormat(Number(d.Stats.Damage))+" " + (Number(d.Stats.Damage) == 1 ? d.Item.Unit : d.Item.Pluralunit) +
						"</td>" +
						"<td>"+
						numFormat(Number(d.Stats.DamageEvents))+" " + (Number(d.Stats.DamageEvents) == 1 ? " Event" : " Events") +
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Returned</td>" +
						"<td>"+
						numFormat(Number(d.Stats.Return))+" " + (Number(d.Stats.Return) == 1 ? d.Item.Unit : d.Item.Pluralunit) +
						"</td>" +
						"<td>"+
						numFormat(Number(d.Stats.ReturnEvents))+" " + (Number(d.Stats.ReturnEvents) == 1 ? " Event" : " Events") +
						"</td>" +
						"</tr>" +
						"<tr>" +
						"<td>Sale</td>" +
						"<td>"+
						numFormat(Number(d.Stats.Sale))+" " + (Number(d.Stats.Sale) == 1 ? d.Item.Unit : d.Item.Pluralunit) +
						"</td>" +
						"<td>"+
						numFormat(Number(d.Stats.SaleEvents))+" " + (Number(d.Stats.SaleEvents) == 1 ? " Event" : " Events") +
						"</td>" +
						"</tr>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>";

					getElement("inventory-timeline-con").appendChild(con);

					if(d.data.length == 0)
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
							"No record for the spaned period" +
							"</h5>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"</div>";

						getElement("inventory-timeline-con").appendChild(con);
					}

					for(let i = 0; i < d.data.length; i++)
					{
						if((d.data[i].Type == "usage") || (d.data[i].Type == "damage") ||  (d.data[i].Type == "return"))
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
								d.data[i].Created.WeekDay+", " + d.data[i].Created.Day + " "
								+ d.data[i].Created.MonthName+" " + d.data[i].Created.Year +
								"</label>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l9 m8 s8'>" +
								"<div class='l-width-8 pad-1'>" +
								"<div id='"+d.data[i].Id+"-con' class='sleak widget pad-t lift-1 curve'>" +
								"<label style='float: right; cursor: pointer; color: dimgray;'>" +
								"<span style='color: rgb(235,235,235); font-weight: bold;'>"+ " " +
								(d.data[i].Type == "return" ? "Returned" : (d.data[i].Type == "usage" ? "Used" : "Damaged")) +
								"</span>" +
								"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data[i].Id+"', this)\"></i></label>" +
								"<label style='font-weight: bold; color: maroon;'>" +
								"<i class='arrow up circular red icon'></i> "+numFormat(Number(d.data[i].Difference)) + " " +
								(Number(d.data[i].Difference) == 1 ? d.Item.Unit : d.Item.Pluralunit) + " <i>" +
								(d.data[i].Type == "return" ? "Returned" : (d.data[i].Type == "usage" ? "Used" : "Damaged")) +
								"</i></label>" +
								"<div class='pad-1 detail-con' style='display: none;'>" +
								"<hr/>" +
								"<label style='font-weight: bold; color: dimgray;'><span style='color: silver;'>" +
								"Authorized by:</span> "+d.data[i].User.Name+" "+d.data[i].User.Surname+"</label>" +
								"<p style='margin-bottom: 0px;'>"+d.data[i].Created.Hour+":" + d.data[i].Created.Miniute +"</p>" +
								"<p style='color: dimgray; line-height: 170%;'>"+d.data[i].Note+"</p>" +
								"</div>" +
								"</div>" +
								"<div class='widget lift-1 curve' style='margin-top: 3px; padding: 7px;'>" +

								(Number(d.data[i].Newstock) <= 0 ? "<label style='font-family: Lato; float: right; color: maroon;'>" +
									"Out of stock &nbsp;</label>" : (Number(d.data[i].Newstock) <= Number(d.Item.Lowstockpoint) ?
									"<label style='font-family: Lato; float: right; color: rgb(255,182,77);'>Low stock &nbsp;</label>" :
									"<label style='font-family: Lato; float: right; color: forestgreen;'>In stock &nbsp;</label>")) +

								"<label style='font-family: Lato;'>" +
								"New stock: &nbsp; <span style='"+(Number(d.data[i].Newstock) <= 0 ? "color: maroon;" :
								(Number(d.data[i].Newstock) <= Number(d.Item.Lowstockpoint) ?  "color: rgb(255,182,77);" : ""))+
								"'>"+numFormat(Number(d.data[i].Newstock))+" "+
								(d.data[i].Difference == 1 ? d.Item.Unit : d.Item.Pluralunit) +
								"</span></label>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>";

							getElement("inventory-timeline-con").appendChild(con);
						}
						if((d.data[i].Type == "surplus") || (d.data[i].Type == "opening"))
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
								d.data[i].Created.WeekDay+", " + d.data[i].Created.Day + " "
								+ d.data[i].Created.MonthName+" " + d.data[i].Created.Year +
								"</label>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l9 m8 s8'>" +
								"<div class='l-width-8 pad-1'>" +
								"<div id='"+d.data[i].Id+"-con' class='sleak widget pad-t lift-1 curve'>" +
								"<label style='float: right; cursor: pointer; color: dimgray;'>" +
								"<span style='color: rgb(235,235,235); font-weight: bold;'>"+ " " +
								(d.data[i].Type == "opening" ? "Opening stock" : "Surplus") +
								"</span>" +
								"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data[i].Id+"', this)\"></i></label>" +
								"<label style='font-weight: bold; color: forestgreen;'>" +
								"<i class='arrow down circular icon' style='color: forestgreen;'></i> "+
								numFormat(Number(d.data[i].Difference)) + " " +
								(Number(d.data[i].Difference) == 1 ? d.Item.Unit : d.Item.Pluralunit) + " <i>" +
								(d.data[i].Type == "opening" ? "Opening stock" : "Surplus") +
								"</i></label>" +
								"<div class='pad-1 detail-con' style='display: none;'>" +
								"<hr/>" +
								"<label style='font-weight: bold; color: dimgray;'><span style='color: silver;'>" +
								"Authorized by:</span> "+d.data[i].User.Name+" "+d.data[i].User.Surname+"</label>" +
								"<p style='margin-bottom: 0px;'>"+d.data[i].Created.Hour+":" + d.data[i].Created.Miniute +"</p>" +
								"<p style='color: dimgray; line-height: 170%;'>"+d.data[i].Note+"</p>" +
								"</div>" +
								"</div>" +
								"<div class='widget lift-1 curve' style='margin-top: 3px; padding: 7px;'>" +

								(Number(d.data[i].Newstock) <= 0 ? "<label style='font-family: Lato; float: right; color: maroon;'>" +
									"Out of stock &nbsp;</label>" : (Number(d.data[i].Newstock) <= Number(d.Item.Lowstockpoint) ?
									"<label style='font-family: Lato; float: right; color: rgb(255,182,77);'>Low stock &nbsp;</label>" :
									"<label style='font-family: Lato; float: right; color: forestgreen;'>In stock &nbsp;</label>")) +

								"<label style='font-family: Lato;'>" +
								"New stock: &nbsp; <span style='"+(Number(d.data[i].Newstock) <= 0 ? "color: maroon;" :
								(Number(d.data[i].Newstock) <= Number(d.Item.Lowstockpoint) ?  "color: rgb(255,182,77);" : ""))+
								"'>"+numFormat(Number(d.data[i].Newstock))+" "+
								(d.data[i].Difference == 1 ? d.Item.Unit : d.Item.Pluralunit) +
								"</span></label>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>";

							getElement("inventory-timeline-con").appendChild(con);
						}
						if(d.data[i].Type == "restocking")
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
								d.data[i].Created.WeekDay+", " + d.data[i].Created.Day + " "
								+ d.data[i].Created.MonthName+" " + d.data[i].Created.Year +
								"</label>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l9 m8 s8'>" +
								"<div class='l-width-8 pad-1'>" +
								"<div id='"+d.data[i].Id+"-con' class='sleak widget pad-t lift-1 curve'>" +
								"<label style='float: right; cursor: pointer; color: dimgray;'>" +
								"<span style='color: rgb(235,235,235); font-weight: bold;'>Re-stocking</span>" +
								"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data[i].Id+"', this)\"></i></label>" +
								"<label style='font-weight: bold; color: forestgreen;'>" +
								"<i class='arrow down circular icon' style='color: forestgreen;'></i> "+
								numFormat(Number(d.data[i].Difference)) + " " +
								(Number(d.data[i].Difference) == 1 ? d.Item.Unit : d.Item.Pluralunit) + " <i>" +
								"Re-stocking</i></label>" +
								"<div class='pad-1 detail-con' style='display: none;'>" +
								"<hr/>" +
								"<label style='font-weight: bold; color: dimgray;'><span style='color: silver;'>" +
								"Authorized by:</span> "+d.data[i].User.Name+" "+d.data[i].User.Surname+"</label>" +
								"<p style='margin-bottom: 0px;'>"+d.data[i].Created.Hour+":" + d.data[i].Created.Miniute +"</p>" +
								"<p style='color: dimgray; line-height: 170%;'>"+d.data[i].Note+"</p>" +
								"</div>" +
								"</div>" +
								"<div class='widget lift-1 curve' style='margin-top: 3px; padding: 7px;'>" +

								(Number(d.data[i].Newstock) <= 0 ? "<label style='font-family: Lato; float: right; color: maroon;'>" +
									"Out of stock &nbsp;</label>" : (Number(d.data[i].Newstock) <= Number(d.Item.Lowstockpoint) ?
									"<label style='font-family: Lato; float: right; color: rgb(255,182,77);'>Low stock &nbsp;</label>" :
									"<label style='font-family: Lato; float: right; color: forestgreen;'>In stock &nbsp;</label>")) +

								"<label style='font-family: Lato;'>" +
								"New stock: &nbsp; <span style='"+(Number(d.data[i].Newstock) <= 0 ? "color: maroon;" :
								(Number(d.data[i].Newstock) <= Number(d.Item.Lowstockpoint) ?  "color: rgb(255,182,77);" : ""))+
								"'>"+numFormat(Number(d.data[i].Newstock))+" "+
								(d.data[i].Difference == 1 ? d.Item.Unit : d.Item.Pluralunit) +
								"</span></label>" +
								"</div>" +
								"<div class='widget lift-1 curve' style='margin-top: 3px; padding: 7px;'>" +
								"<label style='float: right; cursor: pointer; color: dimgray;'>" +
								"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data[i].Id+"-order', this)\"></i></label>" +
								"<label style='font-family: Lato;'>" +
								"Purchase request raised" +
								"</label>" +
								"<div id='"+d.data[i].Id+"-order-con'>" +
								"<div class='detail-con' style='display: none;'>" +
								"<br/>" +
								"<h5 class='sleak green-text' style='color: dimgray; font-weight: bold;'>" +
								"Purchase order details</h5>" +
								"<p>" +
								(d.data[i].Order == "" ? "Unable to locate the associated purchase order" :
								"See purchase request and purchase order " +
								"<a href='#purchase-reuest/"+d.data[i].Order.Id+"'>" +
								"details" +
								"</a>") +
								"</p>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>";

							getElement("inventory-timeline-con").appendChild(con);
						}
						if(d.data[i].Type == "sold")
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
								d.data[i].Created.WeekDay+", " + d.data[i].Created.Day + " "
								+ d.data[i].Created.MonthName+" " + d.data[i].Created.Year +
								"</label>" +
								"</div>" +
								"</div>" +
								"<div class='w3-col l9 m8 s8'>" +
								"<div class='l-width-8 pad-1'>" +
								"<div id='"+d.data[i].Id+"-con' class='sleak widget pad-t lift-1 curve'>" +
								"<label style='float: right; cursor: pointer; color: dimgray;'>" +
								"<span style='color: rgb(235,235,235); font-weight: bold;'>"+ " Sold </span>" +
								"<i class='chevron down icon' onclick=\"toggleDetail('"+d.data[i].Id+"', this)\"></i></label>" +
								"<label style='font-weight: bold; color: maroon;'>" +
								"<i class='arrow up circular red icon'></i> "+numFormat(Number(d.data[i].Difference)) + " " +
								(Number(d.data[i].Difference) == 1 ? d.Item.Unit : d.Item.Pluralunit) + " <i>Sold</i></label>" +
								"<div class='pad-1 detail-con' style='display: none;'>" +
								"<hr/>" +
								"<label style='font-weight: bold; color: dimgray;'><span style='color: silver;'>" +
								"Authorized by:</span> "+d.data[i].User.Name+" "+d.data[i].User.Surname+"</label>" +
								"<p style='margin-bottom: 0px;'>"+d.data[i].Created.Hour+":" + d.data[i].Created.Miniute +"</p>" +
								"<a href='#sales-details/"+d.Item.Id+"'>" +
								"<p class='blue-text' style='color: dimgray; font-weight: bold; line-height: 170%;'>" +
								"See item sales analytics" +
								"</p>" +
								"</a>" +
								"</div>" +
								"</div>" +
								"<div class='widget lift-1 curve' style='margin-top: 3px; padding: 7px;'>" +

								(Number(d.data[i].Newstock) <= 0 ? "<label style='font-family: Lato; float: right; color: maroon;'>" +
									"Out of stock &nbsp;</label>" : (Number(d.data[i].Newstock) <= Number(d.Item.Lowstockpoint) ?
									"<label style='font-family: Lato; float: right; color: rgb(255,182,77);'>Low stock &nbsp;</label>" :
									"<label style='font-family: Lato; float: right; color: forestgreen;'>In stock &nbsp;</label>")) +

								"<label style='font-family: Lato;'>" +
								"New stock: &nbsp; <span style='"+(Number(d.data[i].Newstock) <= 0 ? "color: maroon;" :
								(Number(d.data[i].Newstock) <= Number(d.Item.Lowstockpoint) ?  "color: rgb(255,182,77);" : ""))+
								"'>"+numFormat(Number(d.data[i].Newstock))+" "+
								(d.data[i].Difference == 1 ? d.Item.Unit : d.Item.Pluralunit) +
								"</span></label>" +
								"</div>" +
								"</div>" +
								"</div>" +
								"</div>";

							getElement("inventory-timeline-con").appendChild(con);
						}
					}
				}
				else
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
						"<h2><i class='ban circular icon' style='color: rgb(255,0,0,0.1);'></i></h2>" +
						"<h5 class='sleak' style='font-weight: bold; color: black; text-align: center;'>" +
						d.message +
						"</h5>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>";

					getElement("inventory-timeline-con").appendChild(con);
				}
			}
			else
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
					"<h2><i class='ban circular icon' style='color: rgb(255,0,0,0.1);'></i></h2>" +
					"<h5 class='sleak' style='font-weight: bold; color: black; text-align: center;'>" +
					"Connection error. Check your connection and try again" +
					"</h5>" +
					"</div>" +
					"</div>" +
					"</div>" +
					"</div>";

				getElement("inventory-timeline-con").appendChild(con);
			}
		},request);
	}
}

function toggleDetail(e, icon)
{
	if($("#"+e+"-con .detail-con").hasClass("open"))
	{
		$("#"+e+"-con .detail-con").slideUp(400, function(){
			$("#"+e+"-con .detail-con").removeClass("open");
		});
		$(icon).transition("drop out", function(){
			$(icon).removeClass("up");
			$(icon).addClass("down");
			$(icon).transition("drop in");
		});
	}
	else
	{
		$("#"+e+"-con .detail-con").slideDown(400, function(){
			$("#"+e+"-con .detail-con").addClass("open");
		});
		$(icon).transition("drop out", function(){
			$(icon).removeClass("down");
			$(icon).addClass("up");
			$(icon).transition("drop in");
		});
	}
}

function getPrintSession(e)
{
	if($("#currently-viewed-item").val() != "")
	{
		let request = {
			startdate:$("#from-date").val(),
			stopdate:$("#to-date").val(),
			itemid:$("#currently-viewed-item").val(),
			itemtype:$("#inventory-item-type").val(),
			filter:"all",
			job:"print item timeline"
		};

		if($("#timeline-filter").dropdown('get value') != "")
		{
			request.filter = $("#timeline-filter").dropdown('get value');
		}

		$(e).addClass("loading");
		postJson("hms-admin/worker", function(data, status){
			$(e).removeClass("loading");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					window.open("http://"+d.URL, "print");
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Check your connectio and try again");
			}
		},request);
	}
	else
	{
		ShowModal("Please select item to print");
	}
}

function switchPRTabs(e)
{
	$(".purchase-request-tab").removeClass("active");
	$(e).addClass("active");
	populatePurchaseRequest();
}

function ConfirmGroupPrDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected purchase requests?", function(choice){
		if(choice === true)
		{
			prGroupDelete();
		}
	});
}

function ConfirmPrDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected purchase request?", function(choice, param){
		if(choice === true)
		{
			prListDelete(param);
		}
	}, null, null, e);
}

function prGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeletePr(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status === "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> requests failed to delete");
		}
	}
	else
	{
		ShowModal("No purchase requests were selected");
	}
}

function prListDelete(e)
{
	//Loading animation here
	$('#'+e+'-btn').addClass("loading");
	DeletePr(e, function(status, msg){
		//Stop Animation here
		$('#'+e+'-btn').removeClass("loading");
		if(status == "done")
		{
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			ShowModal(msg);
		}
	});
}

function DeletePr(e, func)
{
	let request = {};
	request.prid = e;
	request.item_type = $("#inventory-item-type").val();
	request.job = "delete purchase request";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", "Operation failed. Try again");
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}


function ConfirmGroupQuotationDelete()
{
	ConfirmModal("Are you sure you want to delete all the quotation document?", function(choice){
		if(choice === true)
		{
			quotationGroupDelete();
		}
	});
}

function ConfirmQuotationDelete(e)
{
	ConfirmModal("Are you sure you want to delete the selected quotation documents?", function(choice, param){
		if(choice === true)
		{
			quotationListDelete(param);
		}
	}, null, null, e);
}

function quotationGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here
			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteQuotation(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> quotations failed to delete");
		}
	}
	else
	{
		ShowModal("No Quotations were selected");
	}
}

function quotationListDelete(e)
{
	//Loading animation here
	$('#'+e+'-btn').addClass("loading");
	DeleteQuotation(e, function(status, msg){
		$('#'+e+'-btn').removeClass("loading");
		if(status === "done")
		{
			//Deletion success
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteQuotation(e, func)
{
	let request = {};
	request.quotationid = e;
	request.item_type = $("#inventory-item-type").val();
	request.job = "delete quotation";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", "Operation failed. Try again");
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}


function launchAddInventoryAudit(a)
{
	let e = null;

	if(a != null)
	{
		e = JSON.parse(unescape(a));
	}

	let id = e != null ? e.id : "";
	let title =  e != null ? e.title : "";

	loadModal({title:"New Audit session", html:"<div class='pad-1'>" +
			"<input id='auditid' type='hidden' value='"+id+"'/>" +
			"<div class='ui fluid input'>" +
			"<input id='audit-title' class='wix-textbox' type='text' value='"+title+"' placeholder='Session title'/>" +
			"</div> " +
			"<div class='ui fluid input' style='margin-top: 5px;'>" +
			"<button id='audit-save-btn' class='ui sleak blue button' onclick='saveInventoryAuditSession()'>" +
			"<i class='save icon'></i> Save</button>" +
			"</div> " +
			"</div>", onLoaded:function(m){
				getElement("audit-save-btn").setAttribute("modal-id", m.modal);
		}});
}

function saveInventoryAuditSession()
{
	let request = {
		id:$("#auditid").val(),
		title:$("#audit-title").val(),
		item_type:$("#inventory-item-type").val(),
		job:"save inventory audit"
	};

	if(request.title === "")
	{
		errorButton({btn:"audit-save-btn", msg:"Enter a title"});
	}
	else
	{
		loadingButton({btn:"audit-save-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"audit-save-btn", loading:false});

			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#audit-save-btn").addClass("positive disabled");
					$("#audit-save-btn").html("<i class='check icon'></i> Audit saved");
					setTimeout(function(){
						$("#audit-save-btn").removeClass("positive disabled");
						$("#audit-save-btn").html("<i class='save icon'></i> Save");
						closeGenModal(getElement("audit-save-btn").getAttribute("modal-id"), function(){
							populateAudits();
						});
					},2000);
				}
				else
				{
					errorButton({btn:"audit-save-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"audit-save-btn", msg:"Connection error"});
			}
		},request);
	}
}

function ConfirmGroupAuditDelete()
{
	ConfirmModal("Are you sure you want to delete all the selected sessions?", function(choice){
		if(choice === true)
		{
			auditGroupDelete();
		}
	});
}

function ConfirmAuditDelete(e)
{
	ConfirmModal("Are you sure you want to delete the session?", function(choice, param){
		if(choice === true)
		{
			auditListDelete(param);
		}
	}, null, null, e);
}

function auditGroupDelete(e)
{
	let lst = document.getElementsByClassName("check-sel");
	let errors = 0;
	let found = false;

	for(let i = 0; i < lst.length; i++)
	{
		if(lst[i].checked === true)
		{
			found = true;

			//Loading animation here

			$("#"+lst[i].id+"-btn").addClass("loading");
			DeleteAudit(lst[i].id, function(status, msg){
				//Stop Animation here
				$("#"+lst[i].id+"-btn").removeClass("loading");
				if(status == "done")
				{
					//Deletion success
					$('#'+lst[i].id+'-row').slideUp(500, function(){
						document.getElementById('table-body').removeChild(document.getElementById(lst[i].id+'-row'));
					});
				}
				else
				{
					errors++;
				}
			});
		}
	}

	if(found === true)
	{
		if(errors > 0)
		{
			ShowModal("<b>("+ errors +")</b> audits failed to delete");
		}
	}
	else
	{
		ShowModal("No audits were selected");
	}
}

function auditListDelete(e)
{
	//Loading animation here
	$('#'+e+'-btn').addClass("loading");
	DeleteAudit(e, function(status, msg){
		//Stop Animation here
		$('#'+e+'-btn').removeClass("loading");
		if(status == "done")
		{
			//Deletion success
			$('#'+e+'-btn').removeClass("loading");
			$('#'+e+'-row').slideUp(500, function(){
				document.getElementById('table-body').removeChild(document.getElementById(e+'-row'));
			});
		}
		else
		{
			//Deletion Failed
			ShowModal(msg);
		}
	});
}

function DeleteAudit(e, func)
{
	let request = {};
	request.auditid = e;
	request.item_type = $("#inventory-item-type").val();
	request.job = "delete inventory audit";

	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(typeof(func) == "function")
				{
					func("done");
				}
			}
			else
			{
				if(typeof(func) == "function")
				{
					func("error", "Operation failed. Try again");
				}
			}
		}
		else
		{
			if(typeof(func) == "function")
			{
				func("error", "Connection Error. Check your connection and try again");
			}
		}
	}, request);
}

function getQuotationPrintSession(e)
{
	if($("#currently-viewed-item").val() != "")
	{
		let request = {
			quoteid:getArg(),
			itemtype:$("#inventory-item-type").val(),
			job:"print quotation"
		};

		if($("#timeline-filter").dropdown('get value') != "")
		{
			request.filter = $("#timeline-filter").dropdown('get value');
		}

		$(e).addClass("loading");
		postJson("hms-admin/worker", function(data, status){
			$(e).removeClass("loading");
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					window.open("http://"+d.URL, "print");
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Check your connectio and try again");
			}
		},request);
	}
	else
	{
		ShowModal("Please select item to print");
	}
}

function resendQuotation(a, e, sup)
{
	let request = {
		quoteid:e,
		supplier:sup == null ? "" : sup,
		item_type:$("#inventory-item-type").val(),
		job:"resend quotation"
	};

	$(a).addClass("loading");
	postJson("hms-admin/worker", function(data, status){
		$(a).removeClass("loading");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				if(sup != null)
				{
					$(a).html("<i class='check icon'></i>");
					$(a).addClass("positive");

					setTimeout(function(){
						$(a).html("<i class='paper plane icon'></i>");
						$(a).removeClass("positive");
					},3000);
				}
				else
				{
					$(a).html("<i class='check icon'></i> sent");
					$(a).addClass("positive");

					setTimeout(function(){
						$(a).html("<i class='paper plane icon'></i> resend all");
						$(a).removeClass("positive");
					},3000);
				}
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to send message");
		}
	},request);
}

function saveAudit(e, audit, btn)
{
	if(Number($("#"+e+"-count").val()) || (Number($("#"+e+"-count").val()) === 0))
	{
		if(btn.innerHTML.toString().toLowerCase() == "save")
		{
			$(btn).addClass("positive");
			$(btn).html("Click again to save");

			setTimeout(function(){
				$(btn).removeClass("positive");
				$(btn).html("Save");
			},3000);
		}
		else
		{
			request = {
				auditid:audit,
				itemid:e,
				item_type:$("#inventory-item-type").val(),
				counted:$("#"+e+"-count").val(),
				job:"save audit count"
			};


			getElement(e+"-row").removeChild(getElement("count-row-"+e));

			let td1 = document.createElement("td");
			let td2 = document.createElement("td");
			let td3 = document.createElement("td");

			td1.id = e+"-attached-1";
			td2.id = e+"-attached-2";
			td3.id = e+"-attached-3";

			td1.innerHTML = "<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>";
			td2.innerHTML = td1.innerHTML;
			td3.innerHTML = td2.innerHTML;

			getElement(e+"-row").appendChild(td1);
			getElement(e+"-row").appendChild(td2);
			getElement(e+"-row").appendChild(td3);

			postJson("hms-admin/worker", function(data, status){
				if(status === "done")
				{
					let d =JSON.parse(data);

					if(d.status === "success")
					{
						getElement(e+"-row").className = ((Number(d.data.Counted) == Number(d.data.Stock)) ?
							"" : ((Number(d.data.Counted) > Number(d.data.Stock)) ?
								"positive" : "negative"));


						let con1 = document.createElement("span");
						let con2 = document.createElement("span");
						let con3 = document.createElement("span");

						con1.innerHTML = numFormat(Number(d.data.Counted)) + " <span style='color: lightgray;'>" +
							(Number(d.data.Counted) != 1 ?
								d.data.Item.Pluralunit : d.data.Item.Pluralunit) + "</span>";


						con2.innerHTML = ((Number(d.data.Counted) == Number(d.data.Item.Stock)) ?
							"<i class='check green icon'></i> Accurate" :
							((Number(d.data.Counted) > Number(d.data.Item.Stock)) ?
								"<i class='up arrow blue icon'></i> Surplus" :
								"<i class='down arrow red icon'></i> Shortage"));


						con3.innerHTML = ((Number(d.data.Counted) == Number(d.data.Item.Stock)) ?
							0 :
							((Number(d.data.Counted) > Number(d.data.Item.Stock)) ?
								numFormat(Number(d.data.Counted) - Number(d.data.Stock)) :
								numFormat(Number(d.data.Stock) - Number(d.data.Counted)))) +

							" <span style='color: lightgray;'>" +
							(Number(d.data.Counted) != 1 ?
								d.data.Item.Pluralunit : d.data.Item.Pluralunit) + "</span>";

						getElement(e+"-attached-1").innerHTML = "";
						getElement(e+"-attached-2").innerHTML = "";
						getElement(e+"-attached-3").innerHTML = "";

						getElement(e+"-attached-1").appendChild(con1);
						getElement(e+"-attached-2").appendChild(con2);
						getElement(e+"-attached-3").appendChild(con3);


						$("#accurate-count-con").html(numFormat(Number(d.Accuratestock)));
						$("#shortage-count-con").html(numFormat(Number(d.Shortagestock)));
						$("#surplus-count-con").html(numFormat(Number(d.SurplusStock)));
						
						
						
						
						if(getElement("remove-audited").checked)
						{
							setTimeout(function(){
								$(getElement(e+"-row")).transition('drop out', function(){
									getElement("table-body").removeChild(getElement(e+"-row"));
								});
							},3000);
						}
					}
					else
					{
						let td = document.createElement("td");
						td.id = "count-row-"+e;
						td.innerHTML = "<div class='ui input'>" +
							"<input id='"+e+"-count' type='text' value='"+request.counted+"' style='border: none;'/>" +
							"</div>" +
							"<button class='ui blue sleak small button' " +
							"onclick=\"saveAudit('"+e+"','"+audit+"',this)\">" +
							"Save</button>";
						td.colSpan = 3;

						getElement(e+"-row").removeChild(getElement(e+"-attached-3"));
						getElement(e+"-row").removeChild(getElement(e+"-attached-2"));
						getElement(e+"-row").removeChild(getElement(e+"-attached-1"));

						getElement(e+"-row").appendChild(td);

						ShowModal(d.message);
					}
				}
				else
				{
					let td = document.createElement("td");
					td.id = "count-row-"+e;
					td.innerHTML = "<div class='ui input'>" +
						"<input id='"+e+"-count' type='text' value='"+request.counted+"' style='border: none;'/>" +
						"</div>" +
						"<button class='ui blue sleak small button' " +
						"onclick=\"saveAudit('"+e+"','"+audit+"',this)\">" +
						"Save</button>";
					td.colSpan = 3;

					getElement(e+"-row").removeChild(getElement(e+"-attached-3"));
					getElement(e+"-row").removeChild(getElement(e+"-attached-2"));
					getElement(e+"-row").removeChild(getElement(e+"-attached-1"));

					getElement(e+"-row").appendChild(td);

					ShowModal("Connection error. Unable to save data");
				}
			},request);
		}
	}
	else
	{
		ShowModal("Please enter a valid number");
	}
}

function getAuditPrintSession(e)
{
	let request = {
		auditid:getArg(),
		itemtype:$("#inventory-item-type").val(),
		job:"print inventory audit"
	};

	$(e).addClass("loading");
	postJson("hms-admin/worker", function(data, status){
		$(e).removeClass("loading");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				window.open("http://"+d.URL, "print");
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Check your connection and try again");
		}
	},request);
}

function saveSettings(e)
{
	let request = {
		receipttemplate:$("#receipttemplate").val(),
		papertype:"a4",
		lowstockemail:$("#lowstockemail").val(),
		lowstockphone:$("#lowstockphone").val(),
		onlineorderphone:"",
		receiptaddess:getElement("receiptaddess").checked,
		receiptemail:getElement("receiptemail").checked,
		receiptlogo:getElement("receiptlogo").checked,
		receiptsalutation:getElement("receiptsalutation").checked,
		cash_pay:getElement("cash_pay").checked,
		pos_pay:getElement("pos_pay").checked,
		online_pay:getElement("online_pay").checked,
		other_pay:getElement("other_pay").checked,
		refund:getElement("refund").checked,
		compound_tax:getElement("compound_tax").checked,
		salutation:$("#salutation").val(),

		item_type:$("#inventory-item-type").val(),
		job:"save settings"
	};

	if(getElement("onlineorderphone") != null)
	{
		request.onlineorderphone = $("#onlineorderphone").val();
	}

	if(getElement("letter").checked)
	{
		request.papertype = "letter";
	}
	if(getElement("mm58").checked)
	{
		request.papertype = "58mm";
	}
	if(getElement("mm80").checked)
	{
		request.papertype = "80mm";
	}


	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				if((e.type === "checkbox") || (e.type === "radio"))
				{
					e.checked = !e.checked;
				}
				if((e.type === "text") || (e.type === "textarea"))
				{
					e.value = "";
				}

				dropNotification(d.message);
			}
		}
		else
		{
			if((e.type === "checkbox") || (e.type === "radio"))
			{
				e.checked = !e.checked;
			}
			if((e.type === "text") || (e.type === "textarea"))
			{
				e.value = "";
			}

			dropNotification("Connection error. Unable to save settings");
		}
	},request);
}

function saveMessageSettings(e)
{
	let request = {
		lowunitphone:$("#low-unit-phone").val(),
		tagprocessing:"remove",
		ononiruapikey:$("#ononiru-message-api-key").val(),
		lowunitpoint:$("#low-uint-point").val(),
		job:"save message settings"
	};

	if(getElement("leave-tag").checked)
	{
		request.tagprocessing = "leave";
	}
	if(getElement("cancel-tag").checked)
	{
		request.tagprocessing = "cancel";
	}


	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status !== "success")
			{
				if((e.type === "checkbox") || (e.type === "radio"))
				{
					e.checked = !e.checked;
				}
				if((e.type === "text") || (e.type === "textarea"))
				{
					e.value = "";
				}

				dropNotification(d.message);
			}
		}
		else
		{
			if((e.type === "checkbox") || (e.type === "radio"))
			{
				e.checked = !e.checked;
			}
			if((e.type === "text") || (e.type === "textarea"))
			{
				e.value = "";
			}

			dropNotification("Connection error. Unable to save settings");
		}
	},request);
}

function selectTemplate()
{
	loadPageModal({size:"ms", onLoaded:function(m){
			$("#modal_"+m.modal+"-inner").html(
				"<div class='w3-row' id='receipt-list-con'></div>");
			loadReceipts(m);
		}});
}

function loadReceipts(m)
{
	$("#receipt-list-con").html(
		"<div class='pad-3'>" +
		"<div class='align-c'>" +
		"<div class='margin-t-8'>" +
		"<div class='ui loader large active inline'></div>" +
		"<h3 class='sleak'>Please wait...</h3>" +
		"</div>" +
		"</div>" +
		"</div>");

	postJson("hms-admin/worker", function(data, status){
		$("#receipt-list-con").html("");
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#receipt-list-con").html(
					"<div class='pad-3'>" +
					"<div class=''>" +
					"<div>" +
					"<h2 style='font-family: quicksandregular; color: dimgrayy'>" +
					"<i class='blue print icon'></i> Select receipt" +
					"</h2>" +
					"</div>" +
					"</div>" +
					"</div><hr style='margin: 0px; padding: 0px;'/><br/>");

				for(let i = 0; i < d.data.length; i++)
				{
					let con = document.createElement("div");
					con.className = "w3-col l6 m6 s12 pad-1";
					con.innerHTML =
						"<div class='w3-card hoverable' style='max-height: 300px; overflow: hidden; cursor: pointer; position: relative;' " +
						"onclick=\"receiptSelected('"+d.data[i].Definitions.name+"','"+m.modal+"')\">" +
						"<img src='"+host+"hms/pages/receipt/"+d.data[i].Definitions.name+"/default.jpg' style='width: 100%;'/>" +
						"<div class='pad-1' style='position: absolute; width: 100%; bottom: 0px; background-color: rgba(0,0,0,0.6);'>" +
						"<h3 class='sleak' style='color: white;'>"+d.data[i].Definitions.name+"</h3>" +
						"<h5 class='sleak' style='color: white; margin: 0px;'>Format: "+d.data[i].Definitions.type+"</h5>" +
						"<h5 class='sleak' style='color: white; margin: 0px;'>Printer: "+d.data[i].Definitions.printer+"</h5>" +
						"</div>" +
						"</div>";

					getElement("receipt-list-con").appendChild(con);
				}
			}
			else
			{
				closeGenModal(m.modal, function(){
					ShowModal(d.message);
				});
			}
		}
		else
		{
			closeGenModal(m.modal, function(){
				ShowModal("Connection error. Unable retrieve receipt");
			});
		}
	},{job:"get all receipts"});
}

function receiptSelected(receipt, modal)
{
	$("#receipt-name").html(receipt);
	if(getElement("receipt-image") != null)
	{
		getElement("receipt-image").src = host+"/hms/pages/receipt/"+receipt+"/default.jpg";
	}
	$("#receipttemplate").val(receipt);
	saveSettings();
	closeGenModal(modal);
}

function connectOnoniruMessaging()
{
	loadingButton({btn:"api-connect-button"});
	postJson("hms-admin/worker", function(data, status){
		loadingButton({btn:"api-connect-button", loading: false});
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				ShowModal("Success! API connected successfully");
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to complete operation.");
		}
	},{job:"connect ononiru messaging api"})
}

function openInventoryCon(e)
{
	if(e.checked === true)
	{
		$("#inventory-con").transition('drop in');
	}
	else
	{
		$("#inventory-con").transition("drop out");
	}
}

function switchDailyPlotType(e)
{
	if(e == "customer")
	{
		if(!$("#plot-customer").hasClass("blue"))
		{
			$("#plot-customer").addClass("blue");
			$("#plot-items").removeClass("blue");
			populatePOSReport(false);
		}
	}
	else
	{
		if(!$("#plot-items").hasClass("blue"))
		{
			$("#plot-customer").removeClass("blue");
			$("#plot-items").addClass("blue");
			populatePOSReport(false);
		}
	}
}

function switchTransLstFilter(e)
{
	$(".trans-list-filter").removeClass("active");
	$(e).addClass("active");
	populateUserPOSTransactions();
}

function launchPOSReceivePayment()
{
	let val = 0;
	if(getElement("trans-paid") != null)
	{
		val = Number($("#trans-total").val()) - Number($("#trans-paid").val());
	}
	loadModal({title:"Receive payment", html:"<div class='pad-1'>" +
			"<input id='funding-modal' type='hidden' value=''/> " +
			"<div class='ui labeled fluid input'>" +
			"<label class='ui label'>Amount</label>" +
			"<input id='funding-amount' class='wix-textbox' type='text' value='"+val+"' placeholder='Amount'/>" +
			"</div> " +
			"<div class='w3-row' style='margin-top: 10px;'>" +
			"<h6 class='sleak'>Pay method</h6>" +
			"<div class='w3-col l3 m3 s3'>" +
			"<label><input id='cash' name='paymethod' type='radio'/><span>Cash</span></label>" +
			"</div>" +
			"<div class='w3-col l3 m3 s3'>" +
			"<label><input id='pos' name='paymethod' type='radio'/><span>POS</span></label>" +
			"</div>" +
			"<div class='w3-col l3 m3 s3'>" +
			"<label><input id='web' name='paymethod' type='radio'/><span>Web</span></label>" +
			"</div>" +
			"<div class='w3-col l3 m3 s3'>" +
			"<label><input id='others' name='paymethod' type='radio'/><span>Others</span></label>" +
			"</div>" +
			"</div>" +
			"<div class='ui form'  style='margin-top: 5px;'>" +
			"<textarea rows='2' class='wix-textbox' id='note' placeholder='Note on received fund'></textarea>" +
			"</div>" +
			"<div class='' style='margin-top: 5px;'>" +
			"<button id='pos-funding-btn' class='ui sleak blue button' " +
			"onclick='savePOSFunding()'><i class='save icon'></i> Save</button>" +
			"</div> " +
			"</div>", onLoaded:function(m){
			$("#funding-modal").val(m.modal);
		}});
}

function savePOSFunding()
{
	let request = {
		sale:$("#currently-viewed-transaction").val(),
		amount:Number($("#funding-amount").val()),
		note:$("#note").val(),
		method:"",
		item_type:$("#report-item-type").val(),
		job:"add pos payment"
	};

	if(getElement("cash").checked)
	{
		request.method = "cash";
	}
	if(getElement("pos").checked)
	{
		request.method = "pos";
	}
	if(getElement("others").checked)
	{
		request.method = "others";
	}
	if(getElement("web").checked)
	{
		request.method = "web";
	}

	if(request.sale == "")
	{
		ShowModal("Invalid transaction. Try reloading the page to resolve this");
	}
	else if(!request.amount)
	{
		errorButton({btn:"pos-funding-btn", msg:"Invalid amount"});
	}
	else if(request.method === "")
	{
		errorButton({btn:"pos-funding-btn", msg:"Select pay method"});
	}
	else
	{
		loadingButton({btn:"pos-funding-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"pos-funding-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#pos-funding-btn").html("<i class='check icon'></i> Saved");
					$("#pos-funding-btn").addClass("disabled positive");

					$("#funding-amount").val("");

					setTimeout(function(){
						closeGenModal($("#funding-modal").val());
						populatePosTransaction();
					},2000);
				}
				else
				{
					errorButton({btn:"pos-funding-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"pos-funding-btn", msg:"Connection error"});
			}
		},request);
	}
}

function launchPOSRefund()
{
	let val = 0;
	if(getElement("trans-paid") != null)
	{
		val = $("#trans-paid").val();
	}
	loadModal({title:"Add refund", html:"<div class='pad-1'>" +
			"<input id='refund-modal' type='hidden' value=''/> " +
			"<div class='ui labeled fluid input'>" +
			"<label class='ui label'>Amount</label>" +
			"<input id='refund-amount' class='wix-textbox' type='text' value='"+val+"' placeholder='Amount'/>" +
			"</div> " +
			"<div class='w3-row' style='margin-top: 10px;'>" +
			"<h6 class='sleak'>Refund method</h6>" +
			"<div class='w3-col l3 m3 s3'>" +
			"<label><input id='cash' name='paymethod' type='radio'/><span>Cash</span></label>" +
			"</div>" +
			"<div class='w3-col l3 m3 s3'>" +
			"<label><input id='pos' name='paymethod' type='radio'/><span>POS</span></label>" +
			"</div>" +
			"<div class='w3-col l3 m3 s3'>" +
			"<label><input id='web' name='paymethod' type='radio'/><span>Web</span></label>" +
			"</div>" +
			"<div class='w3-col l3 m3 s3'>" +
			"<label><input id='others' name='paymethod' type='radio'/><span>Others</span></label>" +
			"</div>" +
			"</div>" +
			"<div class='ui form'  style='margin-top: 5px;'>" +
			"<textarea rows='2' class='wix-textbox' id='note' placeholder='Note on refund'></textarea>" +
			"</div>" +
			"<div class='ui fluid input' style='margin-top: 5px;'>" +
			"<button id='pos-refund-btn' class='ui sleak blue button' " +
			"onclick='savePOSRefund()'><i class='save icon'></i> Save</button>" +
			"</div> " +
			"</div>", onLoaded:function(m){
		$("#refund-modal").val(m.modal);
		}});
}

function savePOSRefund()
{
	let request = {
		sale:$("#currently-viewed-transaction").val(),
		amount:Number($("#refund-amount").val()),
		note:$("#note").val(),
		method:"",
		item_type:$("#report-item-type").val(),
		job:"add pos refund"
	};


	if(getElement("cash").checked)
	{
		request.method = "cash";
	}
	if(getElement("pos").checked)
	{
		request.method = "pos";
	}
	if(getElement("others").checked)
	{
		request.method = "others";
	}
	if(getElement("web").checked)
	{
		request.method = "web";
	}

	if(request.sale == "")
	{
		ShowModal("Invalid transaction. Try reloading the page to resolve this");
	}
	else if(!request.amount)
	{
		errorButton({btn:"pos-refund-btn", msg:"Invalid amount"});
	}
	else if(request.method === "")
	{
		errorButton({btn:"pos-refund-btn", msg:"Select refund method"});
	}
	else
	{
		loadingButton({btn:"pos-refund-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"pos-refund-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#pos-refund-btn").html("<i class='check icon'></i> Saved");
					$("#pos-refund-btn").addClass("disabled positive");

					$("#refund-amount").val("");

					setTimeout(function(){
						closeGenModal($("#refund-modal").val());
						populatePosTransaction();
					},2000);
				}
				else
				{
					errorButton({btn:"pos-refund-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"pos-refund-btn", msg:"Connection error"});
			}
		},request);
	}
}

function populateSuppliers(item, type, e)
{
	if(e.checked === true)
	{
		if(type === "added")
		{
			let ops = "<option value=''>Select supplier</option>";
			for(let i = 0; i < prSuppliers.length; i++)
			{
				ops += "<option value='"+prSuppliers[i].Id+"'>"+
					(prSuppliers[i].Company != "" ?  prSuppliers[i].Company :  prSuppliers[i].Contactperson)+"</option>";
			}
			$("#"+item+"-select").html(ops);
			$("#"+item+"-select").dropdown('restore defaults');
		}
		else
		{
			for(let i = 0; i < prItems.length; i++)
			{
				if(prItems[i].Item.Id == item)
				{
					let ops = "<option value=''>Select supplier</option>";
					for(let j = 0; j < prItems[i].Item.Suppliers.length; j++)
					{
						ops += "<option value='"+prItems[i].Item.Suppliers[j].Id+"'>"+
							(prItems[i].Item.Suppliers[j].Company != "" ?
								prItems[i].Item.Suppliers[j].Company :
								prItems[i].Item.Suppliers[j].Contactperson)+"</option>";
					}
					$("#"+item+"-select").html(ops);
					$("#"+item+"-select").dropdown('restore defaults');
					break;
				}
			}
		}
	}
}

function editPurchaseRequest()
{
	raisePurchaseRequest('pick');
}

function generatePO()
{
	let request = {
		prid:getArg(),
		item_type:$("#inventory-item-type").val(),
		items:[],
		job:"generate purchase order"
	};

	let notFound = false;

	let lst = document.getElementsByClassName("item-row");
	for(let i = 0; i < lst.length; i++)
	{
		request.items.push(lst[i].id+":"+$("#"+lst[i].id+"-select").val());
		if($("#"+lst[i].id+"-select").dropdown("get value") == "")
		{
			notFound = true;
		}
	}


	if(notFound === true)
	{
		errorButton({btn:"pr-generate-btn", msg:"Some items have no suppliers"});
	}
	else
	{
		loadingButton({btn:"pr-generate-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:"pr-generate-btn", loading: false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#pr-generate-btn").addClass("positive disabled");
					$("#pr-generate-btn").html("<i class='check icon'></i> Order created");
					setTimeout(function(){

						if(request.item_type === "kitchen_item")
						{
							location.hash = "#kitchen-po/"+d.data;
						}
						if(request.item_type === "pastry_item")
						{
							location.hash = "#pastry-po/"+d.data;
						}
						if(request.item_type === "bar_item")
						{
							location.hash = "#bar-po/"+d.data;
						}
						if(request.item_type === "pool_item")
						{
							location.hash = "#pool-po/"+d.data;
						}
						if(request.item_type === "laundry_item")
						{
							location.hash = "#laundry-po/"+d.data;
						}
						if(request.item_type === "room_item")
						{
							location.hash = "#room-po/"+d.data;
						}
						if(request.item_type === "store_item")
						{
							location.hash = "#store-po/"+d.data;
						}


					},3000);
				}
				else
				{
					errorButton({btn:"pr-generate-btn", msg:d.message});
				}
			}
			else
			{
				errorButton({btn:"pr-generate-btn", msg:"Connection error"});
			}
		},request);
	}
}

function getOrderPrintSession(e)
{
	let request = {
		orderid:e,
		itemtype:$("#inventory-item-type").val(),
		job:"print purchase order"
	};

	loadingButton({btn:e+"-print-btn"});
	postJson("hms-admin/worker", function(data, status){
		loadingButton({btn:e+"-print-btn", loading:false});
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				window.open("http://"+d.URL, "print");
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Check your connection and try again");
		}
	},request);
}

function sendOrderBySMS(e)
{
	let request = {
		order:e,
		method:"sms",
		item_type:$("#inventory-item-type").val(),
		job:"send order"
	};

	loadingButton({btn:e+"-sms-btn"});
	postJson("hms-admin/worker", function(data, status){
		loadingButton({btn:e+"-sms-btn", loading:false});
		if(status == "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#"+e+"-sms-btn").addClass("disabled positive");
				$("#"+e+"-sms-btn").html("<i class='check icon'></i> Sent");
				setTimeout(function(){
					$("#"+e+"-sms-btn").removedClass("disabled positive");
					$("#"+e+"-sms-btn").html("<i class='open envelope icon'></i> SMS");
				},3000);
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to send order");
		}
	},request);
}

function sendOrderByMail(e)
{
	let request = {
		order:e,
		method:"mail",
		item_type:$("#inventory-item-type").val(),
		job:"send order"
	};

	loadingButton({btn:e+"-email-btn"});
	postJson("hms-admin/worker", function(data, status){
		loadingButton({btn:e+"-email-btn", loading:false});
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#"+e+"-mail-btn").addClass("disabled positive");
				$("#"+e+"-mail-btn").html("<i class='check icon'></i> Sent");
				setTimeout(function(){
					$("#"+e+"-mail-btn").removeClass("disabled positive");
					$("#"+e+"-mail-btn").html("<i class='at icon'></i> E-mail");
				},3000);
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Unable to send order");
		}
	},request);
}

function confirmReceived(e)
{
	let rec = document.getElementsByClassName(e+"-rec-qty");

	let found = false;
	let isValid = false;
	for(let i = 0; i < rec.length; i++)
	{
		if((!Number(rec[i].value)) && (Number(rec[i].value) !== 0))
		{
			found = true;
		}
		if((Number(rec[i].value)) && (Number(rec[i].value) > 0))
		{
			isValid = true;
		}
	}

	if(found)
	{
		errorButton({btn:e+"-received-btn", msg:"Non numeric value encountered"});
	}
	else if(!isValid)
	{
		ShowModal("No item have been received. Enter the number of received items to proceed");
	}
	else
	{
		ConfirmModal("After marking the order as received, the number of received items cannot " +
			"be changed. Would you like to continue",function(choice, param){
			if(choice)
			{
				markReceived(param);
			}
		},"Yes","Cancel",e);
	}
}

function markReceived(e)
{
	let request = {
		order:e,
		item_type:$("#inventory-item-type").val(),
		items:[],
		job:"receive order"
	};

	let rec = document.getElementsByClassName(e+"-rec-qty");

	let found = false;
	let isValid = false;
	for(let i = 0; i < rec.length; i++)
	{
		if((!Number(rec[i].value)) && (Number(rec[i].value) !== 0))
		{
			found = true;
		}
		if((Number(rec[i].value)) && (Number(rec[i].value) > 0))
		{
			isValid = true;
		}
		request.items.push(rec[i].id+":"+Number(rec[i].value).toString());
	}



	if(found)
	{
		errorButton({btn:e+"-received-btn", msg:"Non numeric value encountered"});
	}
	else if(!isValid)
	{
		ShowModal("No item have been received. Enter the number of received items to proceed");
	}
	else
	{
		loadingButton({btn:e+"-received-btn"});
		postJson("hms-admin/worker", function(data, status){
			loadingButton({btn:e+"-received-btn", loading:false});
			if(status === "done")
			{
				let d = JSON.parse(data);

				if(d.status === "success")
				{
					$("#"+e+"-received-btn").addClass("disabled positive");
					$("#"+e+"-received-btn").html("<i class='check icon'></i> Operation completed");
					setTimeout(function(){
						populateSinglePurchaseOrder(getArg());
					},3000);
				}
				else
				{
					ShowModal(d.message);
				}
			}
			else
			{
				ShowModal("Connection error. Unable to send order");
			}
		},request);
	}
}

function getOrderCreditPrintSession(e)
{
	let request = {
		noteid:e,
		itemtype:$("#inventory-item-type").val(),
		job:"print supplier credit"
	};

	loadingButton({btn:e+"-print-btn"});
	postJson("hms-admin/worker", function(data, status){
		loadingButton({btn:e+"-print-btn", loading:false});
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				window.open("http://"+d.URL, "print");
			}
			else
			{
				ShowModal(d.message);
			}
		}
		else
		{
			ShowModal("Connection error. Check your connection and try again");
		}
	},request);
}

function saveAvailability()
{
	let span = $("#availability-calendar").val().split("-");

	if(span.length !== 2)
	{
		errorButton({btn:"availability-btn", msg:"Select date span"});
	}
	else
	{
		let start = span[0].split("/");
		let stop = span[1].split("/");

		if((start.length !== 3) || (stop.length !== 3))
		{
			errorButton({btn:"availability-btn", msg:"Select date span"});
		}
		else
		{
			let start = span[0].trim().split("/");
			let stop = span[1].trim().split("/");

			let request = {
				start:start[1]+"/"+start[0]+"/"+start[2],
				stop:stop[1]+"/"+stop[0]+"/"+stop[2],
				available:Number($("#availability-value").val()),
				category:$("#category-input").val(),
				job:"saveroomavailability",
				property: phpvars.property
			};

			loadingButton({btn:"availability-btn"});
			postJson("hms-admin/worker", function(data, status){
				loadingButton({btn:"availability-btn", loading:false});
				if(status === "done")
				{
					let d = JSON.parse(data);

					if(d.status === "success")
					{
						$("#availability-btn").html("<i class='check icon'></i> saved");
						$("#availability-btn").addClass("disabled positive");
						setTimeout(function(){
							DrawAvailablitCalendar();
						},2000);
					}
					else
					{
						errorButton({btn:"availability-btn", msg:d.message});
					}
				}
				else
				{
					errorButton({btn:"availability-btn", msg:"connection error"});
				}
			}, request);
		}
	}
}

function removeAvailability(e)
{
	loadingButton({btn:e+"-btn"});
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#"+e+"-con").transition('fade up out', function(){
					getElement(e+"-con").parentNode.removeChild(getElement(e+"-con"));
				})
			}
			else
			{
				alert(d.message);
			}
		}
		else
		{
			alert("Connection error. Chek our connection and try again");
		}
	},{job:'removeavailability', avail:e});
}

function saveRate()
{
	let span = $("#availability-calendar").val().split("-");

	if(span.length !== 2)
	{
		errorButton({btn:"availability-btn", msg:"Select date span"});
	}
	else
	{
		let start = span[0].split("/");
		let stop = span[1].split("/");

		if((start.length !== 3) || (stop.length !== 3))
		{
			errorButton({btn:"availability-btn", msg:"Select date span"});
		}
		else if(!Number($("#availability-value").val()))
		{
			errorButton({btn:"availability-btn", msg:"Invalid amount"});
		}
		else
		{
			let start = span[0].trim().split("/");
			let stop = span[1].trim().split("/");

			let request = {
				start:start[1]+"/"+start[0]+"/"+start[2],
				stop:stop[1]+"/"+stop[0]+"/"+stop[2],
				rate:Number($("#availability-value").val()),
				category:$("#category-input").val(),
				job:"saveroomrate"
			};

			loadingButton({btn:"availability-btn"});
			postJson("hms-admin/worker", function(data, status){
				loadingButton({btn:"availability-btn", loading:false});
				if(status === "done")
				{
					let d = JSON.parse(data);

					if(d.status === "success")
					{
						$("#availability-btn").html("<i class='check icon'></i> saved");
						$("#availability-btn").addClass("disabled positive");
						setTimeout(function(){
							DrawRatesCalendar()
						},2000);
					}
					else
					{
						errorButton({btn:"availability-btn", msg:d.message});
					}
				}
				else
				{
					errorButton({btn:"availability-btn", msg:"connection error"});
				}
			}, request);
		}
	}
}

function removeRate(e)
{
	loadingButton({btn:e+"-btn"});
	postJson("hms-admin/worker", function(data, status){
		if(status === "done")
		{
			let d = JSON.parse(data);

			if(d.status === "success")
			{
				$("#"+e+"-con").transition('fade up out', function(){
					getElement(e+"-con").parentNode.removeChild(getElement(e+"-con"));
				})
			}
			else
			{
				alert(d.message);
			}
		}
		else
		{
			alert("Connection error. Chek our connection and try again");
		}
	},{job:'removerate', rate:e});
}


function addCustomer()
{
	let checkinForm = document.createElement("div");
	checkinForm.style.position = "fixed";
	checkinForm.id = "checkin-dialogue";
	checkinForm.style.top = "0";
	checkinForm.style.width = "100%";
	checkinForm.style.height = "100%";
	checkinForm.style.overflowY = "auto";
	checkinForm.style.zIndex = 200;
	checkinForm.style.backgroundColor = "rgba(0,0,0,0.4)";
	checkinForm.style.display = "none";

	checkinForm.innerHTML =
		"<div class='l-margin-t-6 m-margin-t-3 s-margin-1 margin-b-9'>" +
		"<div id='checkin-form-inner' class='l-width-4 m-width-8 s-width-xl widget' style='margin: auto; display: none;'>" +
		"<div id='checkin-form-container'>" +
		"<div id='checkin-main-page' style=''></div>" +
		"</div>" +
		"<div style='border-top: 1px solid lightgray;'>" +
		"<div id='checkin-form-action-con'>" +
		"<div id='checkin-total-con'></div>" +
		"</div>" +
		"</div>" +
		"</div>" +
		"</div>";

	document.body.appendChild(checkinForm);

	$("#checkin-form-container").html("<div id='guest-info-page'></div>");
	addGuestInformation();

	$(checkinForm).fadeIn(500, function () {
		$("#checkin-form-inner").transition('fade up in', function () {
			// $("#checkin-form-action-con").transition('fade up out', function() {
			// 	$("#checkin-form-container").transition('fade right out', function () {
	
					
			// 		$("#checkin-form-action-con").html("<div id='action-btn-page'></div>");
	
		
	
			// 		$("#checkin-form-container").transition('fade left in', function(){
			// 			$("#checkin-form-action-con").transition('fade up in');
			// 		});
			// 	});
			// });
		});
	});
}

// add guest information
function addGuestInformation()
{
	let d = document.createElement("div");
	d.innerHTML =
		"<div>" +

		"<div class='w3-row l-pad-2 m-pad-1' style='background-color: rgb(250,250,250);'>" +
		"<div class='w3-col l12 210 s9 guest-info-header'>" +
		"<h3 style='color: dimgray; margin-top: 7px; font-family: varela_roundregular; font-weight: normal;'>" +
		"New Customer Info" +
		"</h3>" +
		"<h3 style='display: inline-block;'>" +
		"<i class='red times icon' style='cursor: pointer' onclick='closeCheckinForm()'></i>" +
		"</h3>" +
		"</div>" +
		"</div>" +

		"<div class='l-pad-2 m-pad-1'>" +
		"<div class='w3-row'>" +
		"<div class='w3-col l6 m6 s12'>" +
		"<div class='l-width-xl'>" +
		"<div class='ui fluid left icon input'>" +
		"<i class='user circel icon'></i> " +
		"<input id='guest-name' class='wix-textbox' placeholder='Name' type='text'/>" +
		"</div>" +
		"</div>" +
		"</div> " +
		"<div class='w3-col l6 m6 s12'>" +
		"<div class=''>" +
		"<div class='ui fluid left icon input'>" +
		"<i class='icon'></i>" +
		"<input id='guest-surname' class='wix-textbox' placeholder='Surname' type='text'/>" +
		"</div>" +
		"</div>" +
		"</div> " +
		"</div> " +

		"<div class='w3-row' style='margin-top: 10px;'>" +
		"<div class='w3-col l4 m4 s12'>" +
		"<div class='l-width-xl'>" +
		"<div class='ui fluid left icon input'>" +
		"<i class='mobile icon'></i> " +
		"<input id='guest-phone' class='wix-textbox' placeholder='Phone' type='text'/>" +
		"</div>" +
		"</div>" +
		"</div> " +
		"<div class='w3-col l8 m8 s12'>" +
		"<div class=''>" +
		"<div class='ui fluid left icon input'>" +
		"<i class='at icon'></i>" +
		"<input id='guest-email' class='wix-textbox' placeholder='Email' type='text'/>" +
		"</div>" +
		"</div>" +
		"</div> " +
		"</div> " +

		"<div class='w3-row' style='margin-top: 10px;'>" +
		"<div class='w3-col l6 m6 s6' style='padding-top: 10px;'>" +
		"<div class='w3-row'>" +
		"<div class='w3-col l6 m6 s6'>" +
		"<label class='user circel icon'> " +
		"<input id='male' class='with-gap' name='gender' type='radio'/>" +
		"<span>Male</span>" +
		"</label>" +
		"</div>" +
		"<div class='w3-col l6 m6 s6'>" +
		"<label class='user circle icon'> " +
		"<input id='' class='with-gap' name='gender' type='radio'/>" +
		"<span>Female</span>" +
		"</label>" +
		"</div>" +
		"</div>" +
		"</div> " +
		"<div class='w3-col l6 m6 s6'>" +
		"<div class=''>" +
		"<div class='ui fluid left icon input'>" +
		"<i class='calendar alternate icon'></i>" +
		"<input id='dob' class='wix-textbox' placeholder='Date of birth' type='text'/>" +
		"</div>" +
		"</div>" +
		"</div> " +
		"</div> " +

		"<div class='w3-row' style='margin-top: 10px;'>" +
		"<div class='w3-col l4 m4 s12'>" +
		"<div class='l-width-xl'>" +
		countryDropdown() +
		"</div>" +
		"</div> " +
		"<div class='w3-col l4 m4 s12'>" +
		"<div class='l-width-xl'>" +
		"<div class='ui fluid left icon input'>" +
		"<i class='map marker icon'></i>" +
		"<input id='guest-state' class='wix-textbox' placeholder='State' type='text'/>" +
		"</div>" +
		"</div>" +
		"</div> " +
		"<div class='w3-col l4 m4 s12'>" +
		"<div class=''>" +
		"<div class='ui fluid left icon input'>" +
		"<i class='map icon'></i>" +
		"<input id='guest-city' class='wix-textbox' placeholder='City' type='text'/>" +
		"</div>" +
		"</div>" +
		"</div> " +
		"</div> " +

		"<div class='ui fluid form' style='margin-top: 10px;'>" +
		"<textarea id='guest-address' class='wix-textbox' rows='3' placeholder='Address'></textarea>" +
		"</div>" +

		"<hr/>" +

		'<div id="action-btn-page"><div class=""><div class=""><div class=""><button class="ui sleak button" onclick="closeCheckinForm()">Close</button><button id="billing-btn" class="ui sleak blue button" onclick="addCustomerInfo()">Submit</button></div></div></div></div>'+

		"</div>" +
		"</div>";

	getElement("guest-info-page").appendChild(d);

	$("#country").dropdown();

	new Lightpick({
		field: document.getElementById('dob'),
		singleDate: true,
		inline:false,
		format:"MM/DD/YY",
		numberOfColumns:1,
		numberOfMonths:1,
		onSelect: function(date){
			
		}
	});
}

function closeCheckinForm()
{
	$("#checkin-form-inner").transition('fade up out', function () {
		$("#checkin-dialogue").fadeOut(500, function () {
			document.body.removeChild(getElement("checkin-dialogue"));
		});
	});
}

function addCustomerInfo()
{
	if($("#guest-name").val() === "")
	{
		errorButton({btn:"billing-btn", msg:"name is empty"});
	}
	else if($("#guest-surname").val() === "")
	{
		errorButton({btn:"billing-btn", msg:"surname is empty"});
	}
	else if($("#guest-phone").val() === "")
	{
		errorButton({btn:"billing-btn", msg:"phone number is empty"});
	}
	else if($("#guest-email").val() === "")
	{
		errorButton({btn:"billing-btn", msg:"email address is empty"});
	}
	else if($("#guest-address").val() === "")
	{
		errorButton({btn:"billing-btn", msg:"guest address is empty"});
	}
	else
	{
		guest = {};
		guest.name = $("#guest-name").val();
		guest.surname = $("#guest-surname").val();
		guest.phone = $("#guest-phone").val();
		guest.email = $("#guest-email").val();
		guest.country = $("#country").dropdown('get value');
		guest.state = $("#guest-state").val();
		guest.city = $("#guest-city").val();
		guest.address = $("#guest-address").val();
		guest.sex = $("#male").prop("checked") ? "male" : "female";
		guest.dob = $("#dob").val();
		guest.profilePic = $("#gallery-image-name-profile").val();
		
		const id = $('#guest-id').val();
		let canReload = true;

		if (typeof id == 'string')
		{
			guest.id = id;
			canReload = false;
		}

		loadingButton({btn:"billing-btn"});

		// send now
		postJson('hms-admin/worker', function(res, status){

			// stop loading
			loadingButton({btn:"billing-btn", loading:false});

			// continue
			if (status == 'done')
			{
				res = JSON.parse(res);

				// what do we havee
				if (res.status == 'success')
				{
					$('#billing-btn').addClass('success disabled');
					$('#billing-btn').html("<i class='check icon'></i> " + (canReload == true ? 'Created' : 'Updated'));

					// reload
					if (canReload) populateCustomers(1);

					// clear out
					setTimeout(function(){
						if (canReload) clearFormInput();
						$('#billing-btn').removeClass('success disabled');
						$('#billing-btn').html('Submit');
					}, 1000);
				}
				else
				{
					errorButton({btn:"billing-btn", msg:res.message});
				}
			}

		}, Object.assign({
			job : 'savepropertycustomer',
		}, guest));


		// clear input
		function clearFormInput()
		{
			getElement('guest-name').value = '';
			getElement('guest-surname').value = '';
			getElement('guest-phone').value = '';
			getElement('guest-email').value = '';
			$("#country").dropdown('set selected', '');
			getElement('guest-state').value = '';
			getElement('guest-city').value = '';
			getElement('guest-address').value = '';
			getElement('male').value = '';
			getElement('dob').removeAttribute('checked');
			getElement('dob').value = '';
		}
	}
}

// manages all data-show, data-show-at attributes
function manageAllDataShow(wrapper) {

	// look for all data-show
	if (wrapper !== null)
	{
		// get all elements
		var showElements = wrapper.querySelectorAll('*[data-show]');

		// toggle visibility
		const toggleFunction = function(element){

			// get show child
			var showChild = wrapper.querySelector('*[data-show-at="'+element.getAttribute('data-show')+'"]');

			// ok, are we good?
			if (showChild !== null)
			{
				// element is checked??
				if (element.checked)
				{
					// show now
					showChild.style.display = 'block';
				}
				else
				{	
					// hide now
					showChild.style.display = 'none';
				}
			}
		};

		// apply foreach
		[].forEach.call(showElements, (element) => {

			// toggle visibility for default checked elements
			toggleFunction(element);

			// listen for change event
			element.addEventListener('change', function(){
				
				// toggle visibility
				toggleFunction(element);

			});	
		});
	}
}

// manages partial pay checkbox for percent and actual amount
function managePartialPayPercent(wrapper)
{
	// can we continue?
	if (wrapper !== null)
	{
		// get checkbox element
		let checkBoxElement = wrapper.querySelector('#partial-pay-percent');

		// save the default label and payAmount
		let defaultLabel = null, payAmount = null;

		// are we good?
		if (checkBoxElement !== null)
		{
			// get payamount
			let payAmountElement = wrapper.querySelector('#partial-pay-amount');

			// get pay amount label
			if (payAmountElement !== null)
			{
				// get the pay amount label
				var payAmountLabelElement = payAmountElement.parentNode.querySelector('label');

				// save label
				if (defaultLabel === null) defaultLabel = payAmountLabelElement.innerText;

				// save pay amount
				if (payAmount === null) payAmount = payAmountElement.value;

				// wrap method in function
				const checkBoxToggleFunction = function()
				{	
					// toggle
					if (checkBoxElement.checked)
					{
						// load label
						payAmountLabelElement.innerText = '%';

						// get payamount value
						let payAmountValue = parseInt(payAmountElement.value);

						// check amount
						if (payAmountValue > 100) payAmountValue = 100;

						// update pay amount label
						payAmountElement.value = payAmountValue;
					}
					else
					{
						// change label to default
						payAmountLabelElement.innerText = defaultLabel;

						// revert amount to default
						payAmountElement.value = payAmount;
					}
				};

				// call function to handle default operation
				checkBoxToggleFunction();

				// listen for change event
				checkBoxElement.addEventListener('change', ()=>{

					// trigger toggle function
					checkBoxToggleFunction();

				});
			}
			
		}
	}
}

// manages attraction submission
function manageAttractionSubmission(data)
{
	// load attraction form
	const attractionFormElement = document.querySelector('.attraction-form');

	// manage close buttons
	const attractionBodyFunction = function()
	{
		// get attraction button list
		var attractionBodyList = document.querySelectorAll('.attraction-body-list');

		// are we good?
		if (attractionBodyList.length > 0)
		{
			// run through
			[].forEach.call(attractionBodyList, (element)=>{

				// load close button
				var closeButtonElement = element.querySelector('.remove-attraction');

				// listen for event
				if (closeButtonElement != null)
				{
					closeButtonElement.addEventListener('click', ()=>{
						// ok we can remove parent
						element.parentNode.removeChild(closeButtonElement.parentNode);
					});
				}
			});
		}
	};

	// are we good?
	if (attractionFormElement != null)
	{
		// get attraction button
		var attractionSubmitButton = attractionFormElement.querySelector('button');

		// button clicked?
		attractionSubmitButton.addEventListener('click', ()=>{

			// get attraction place and distance
			var attractionPlace = $('#attraction-place').val(), 
				attractionDistance = $('#attraction-distance').val();

			// check place and distance
			if (attractionPlace != '' && attractionDistance != '')
			{
				// append attraction
				document.querySelector('.attraction-body').appendChild(drawAttractionDiv(attractionPlace, attractionDistance));

				// clear all
				$('#attraction-place').val('');
				$('#attraction-distance').val('');

				// load function
				attractionBodyFunction();
			}
			else
			{
				errorButton({btn:"attraction-btn", msg:"<i class='close icon'></i>", delay:1000});
			}
		});

		// get the last input element
		var lastInputElement = attractionFormElement.querySelector('input:nth-child(2)');

		// watch button press
		lastInputElement.addEventListener('keyup', (e)=>{
			if (e.keyCode == 13 || e.key.toUpperCase() == 'ENTER')
			{
				attractionSubmitButton.click();
				lastInputElement.previousElementSibling.focus();
			}
		});
	}

	// load attration rule body
	const attractionBody = document.querySelector('.attraction-body');

	// populate
	data.NearbyAttractions.forEach((attraction)=>{
		attractionBody.appendChild(drawAttractionDiv(attraction.place, attraction.distance));
	});

	// load body function
	attractionBodyFunction();
}

// manages checkout rule submission
function manageCheckOutRule(data)
{
	// load checkout form
	const checkoutFormElement = document.querySelector('.checkout-rule-form');

	// manage close buttons
	const checkoutBodyFunction = function()
	{
		// get checkout button list
		var checkoutBodyList = document.querySelectorAll('.checkout-body-list');

		// are we good?
		if (checkoutBodyList.length > 0)
		{
			// run through
			[].forEach.call(checkoutBodyList, (element)=>{

				// load close button
				var closeButtonElement = element.querySelector('.remove-checkout');

				// listen for event
				if (closeButtonElement != null)
				{
					closeButtonElement.addEventListener('click', ()=>{
						// ok we can remove parent
						element.parentNode.removeChild(closeButtonElement.parentNode);
					});
				}
			});
		}
	};

	// are we good?
	if (checkoutFormElement != null)
	{
		// get checkout rule button
		var checkoutSubmitButton = checkoutFormElement.querySelector('button');

		// button clicked?
		checkoutSubmitButton.addEventListener('click', ()=>{

			// get attraction place and distance
			var checkoutFrom = $('#checkout-rule-from').val(), 
				checkoutTo = $('#checkout-rule-to').val(),
				checkoutAmount = $('#checkout-rule-amount').val();

			// check all fields
			if (checkoutFrom != '' && checkoutTo != '' && checkoutAmount != '')
			{
				// append checkout rule
				document.querySelector('.checkout-rule-body').appendChild(drawCheckoutRuleDiv(checkoutFrom, checkoutTo, checkoutAmount));

				// clear all
				$('#checkout-rule-from').val('');
				$('#checkout-rule-to').val('');
				$('#checkout-rule-amount').val('');
				document.querySelector('#checkout-rule-to').type = 'text';

				// load function
				checkoutBodyFunction();

				// date time function
				manageDataMakeTime();
			}
			else
			{
				errorButton({btn:"checkout-rule-btn", msg:"<i class='close icon'></i>", delay:1000});
			}
		});

		// get the last input element
		var lastInputElement = checkoutFormElement.querySelector('input:nth-child(3)');

		// watch button press
		lastInputElement.addEventListener('keyup', (e)=>{
			if (e.keyCode == 13 || e.key.toUpperCase() == 'ENTER')
			{
				checkoutSubmitButton.click();
				lastInputElement.parentNode.firstElementChild.focus();
			}
		});
	}

	// load checkout rule body
	const checkOutRuleBody = document.querySelector('.checkout-rule-body');

	// populate
	data.LateCheckoutRules.forEach((checkOut)=>{
		checkOutRuleBody.appendChild(drawCheckoutRuleDiv(checkOut.from, checkOut.to, checkOut.amount));
	});

	// load body function
	checkoutBodyFunction();
}

// manage data make time
function manageDataMakeTime()
{
	// look for data-make-time='yes'
	const makeTimeWrapper = document.querySelectorAll('*[data-make-time="yes"]');

	// are we good ?
	if (makeTimeWrapper !== null)
	{
		[].forEach.call(makeTimeWrapper, (element)=>{

			// listen for focus
			element.addEventListener('focus', ()=>{
				// change type
				element.type = 'time';
				element.focus();
			});

			// changed??
			element.addEventListener('blur', ()=>{
				// check value
				if (element.value == '')
				{
					element.type = 'text';
				}
			});

			// load default
			if (element.value != '')
			{
				element.type = 'time';
			}

		});
	}
}

// manage property facility
function managePropertyFacility(data)
{
	// get button 
	var facilityButton = document.querySelector('#facility-name-btn');

	// get the facility name
	var facilityName = document.querySelector('#facility-name');

	// manage enter key
	facilityName.addEventListener('keyup', (e)=>{

		// check keycode
		if (e.keyCode == 13 || e.key.toUpperCase() == 'ENTER')
		{
			facilityButton.click();
			facilityName.focus();
		}
	});

	// manage click event
	facilityButton.addEventListener('click', ()=>{

		if (facilityName.value != '')
		{
			drawPropertyFacility(facilityName.value, true);
			// clear now
			facilityName.value = '';
			facilityName.focus();
		}
		else
		{
			errorButton({btn:"facility-name-btn", msg:"<i class='close icon'></i>", delay:1000});
		}
	});

	// load facilities
	let _facilities = data.FacilitiesJson;

	// populate
	_facilities.forEach((facilityData)=>{
		// draw out
		drawPropertyFacility(facilityData.name, facilityData.checked);
	});
	
}

// manage contact information
function manageContactInformation(data)
{
	// load contact form
	const contactFormElement = document.querySelectorAll('.contact-form');

	// manage close buttons
	const contactBodyFunction = function()
	{
		// get contact button list
		var contactBodyList = document.querySelectorAll('.contact-body-list');

		// are we good?
		if (contactBodyList.length > 0)
		{
			// run through
			[].forEach.call(contactBodyList, (element)=>{

				// load close button
				var closeButtonElement = element.querySelector('.remove-contact');

				// listen for event
				if (closeButtonElement != null)
				{
					closeButtonElement.addEventListener('click', ()=>{
						// ok we can remove parent
						element.parentNode.removeChild(closeButtonElement.parentNode);
					});
				}
			});
		}
	};

	// are we good?
	if (contactFormElement.length > 0)
	{
		[].forEach.call(contactFormElement, (contactForm)=>{

			// get contact button
			var contactSubmitButton = contactForm.querySelector('button');

			// get key 
			var contactKey = contactForm.getAttribute('data-key');

			// button clicked?
			contactSubmitButton.addEventListener('click', ()=>{

				// get name and value
				var name = contactForm.querySelector('*[data-key="name"]'), 
					value = contactForm.querySelector('*[data-key="value"]');

				// check name and value
				if (name.value != '' && value.value != '')
				{
					// append attraction
					contactForm.parentNode.lastElementChild.appendChild(drawContactDiv(name.value, value.value, [name.type, value.type]));

					// clear all
					name.value = value.value = '';

					// load function
					contactBodyFunction();
				}
				else
				{
					errorButton({btn:"contact-btn-"+contactKey, msg:"<i class='close icon'></i>", delay:1000});
				}
			});

			// get the last input element
			var lastInputElement = contactForm.querySelector('input:nth-child(2)');

			// watch button press
			lastInputElement.addEventListener('keyup', (e)=>{
				if (e.keyCode == 13 || e.key.toUpperCase() == 'ENTER')
				{
					contactSubmitButton.click();
					lastInputElement.previousElementSibling.focus();
				}
			});

		});
	}

	// load contact phone
	const contactPhoneWrapper = document.querySelector('*[data-key="phone-contact"]');

	// populate
	data.ContactPhone.forEach((contact)=>{
		contactPhoneWrapper.appendChild(drawContactDiv(contact.name, contact.value, ['text', 'tel']));
	});

	// load contact email
	const contactEmailWrapper = document.querySelector('*[data-key="email-contact"]');

	// populate
	data.ContactEmail.forEach((contact)=>{
		contactEmailWrapper.appendChild(drawContactDiv(contact.name, contact.value, ['text', 'email']));
	});

	// load function
	contactBodyFunction();
}

// get all phone contacts
function getAllPhoneContacts()
{
	var allPhones = document.querySelectorAll('*[data-key="phone-contact"] > div > ul');

	// @var array phones
	var phones = [];

	// run loop
	[].forEach.call(allPhones, (list)=>{
		phones.push({
			name : list.querySelector('*[data-contact="name"]').value,
			value : list.querySelector('*[data-contact="value"]').value
		});
	});

	// return array
	return JSON.stringify(phones);
}

// get all email contacts
function getAllEmailContacts()
{
	var allEmails = document.querySelectorAll('*[data-key="email-contact"] > div > ul');

	// @var array emails
	var emails = [];

	// run loop
	[].forEach.call(allEmails, (list)=>{
		emails.push({
			name : list.querySelector('*[data-contact="name"]').value,
			value : list.querySelector('*[data-contact="value"]').value
		});
	});

	// return array
	return JSON.stringify(emails);
}

// get all facilities
function getAllFacilities()
{
	// load data facility
	var dataFacility = document.querySelectorAll('*[data-facility]');

	// @var array facilities
	let facilities = [];

	if (dataFacility.length > 0)
	{
		// loop 
		[].forEach.call(dataFacility, (element)=>{

			// look for the input element
			var inputElement = element.querySelector('input');

			// push data
			facilities.push({
				name : element.getAttribute('data-facility'),
				checked : inputElement.checked
			});

		});
	}

	// return string 
	return JSON.stringify(facilities);
}

// get all checkout rules
function getAllCheckoutRules()
{
	// checkout list
	var checkOutList = document.querySelectorAll('.checkout-body-list');

	// @var array data
	let data = [];

	// are we good 
	if (checkOutList.length > 0)
	{
		[].forEach.call(checkOutList, (checkOut)=>{

			// load data
			data.push({
				from : checkOut.querySelector('*[data-checkout-rule="time-from"]').value,
				to : checkOut.querySelector('*[data-checkout-rule="time-to"]').value,
				amount : checkOut.querySelector('*[data-checkout-rule="amount"]').value,
			});
		});
	}

	// return data
	return JSON.stringify(data);
}

// get all nearby attractions
function getAllAttractions()
{
	// load attractions
	var attractionLists = document.querySelectorAll('.attraction-body-list');

	// @var array data
	let data = [];

	if (attractionLists.length > 0)
	{
		// loop 
		[].forEach.call(attractionLists, (element)=>{

			// push data
			data.push({
				place : element.querySelector('*[data-attraction="place"]').value,
				distance : element.querySelector('*[data-attraction="distance"]').value
			});

		});
	}

	// return string 
	return JSON.stringify(data);
}

// get payment methods
function getPaymentMethods()
{
	return JSON.stringify({
		'online' : document.querySelector('#online-only').checked,
		'cash' : document.querySelector('#cash-only').checked,
		'transfer' : document.querySelector('#transfer-deposit').checked,
		'pos' : document.querySelector('#card-pos').checked,
		'others' : document.querySelector('*[data-show="get-others"]').checked,
		'others_val' : document.querySelector("*[data-sel='others-val']").value
	});
}

// populate payment methods
function loadPaymentMethods(data)
{
	// load data
	var data = data.PaymentMethods;

	// we have an object?
	if (typeof data == 'object')
	{
		document.querySelector('#online-only').checked = data.online ?? false;
		document.querySelector('#cash-only').checked = data.cash ?? false;
		document.querySelector('#transfer-deposit').checked = data.transfer ?? false;
		document.querySelector('#card-pos').checked = data.pos ?? false;
		if(data.others == true) document.querySelector('*[data-show="get-others"]').checked = data.others ?? false;
		document.querySelector("*[data-sel='others-val']").value = data.others_val ?? '';
	}
}

function downloadCSV(data, title){

	const blob = new Blob([data], { type: 'text/csv'});
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a'); 
	a.setAttribute('hidden', '');
	a.setAttribute('href', url);
	a.setAttribute('download', title+'.csv');
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function objectToCsv(data){
	
	if (data.length > 0)
	{
		const csvRows = [];
		// get the headers
		const headers = Object.keys(data[0]);
		csvRows.push(headers.join(','));

		// loop over the rows
		for(const row of data){
			const values = headers.map(header => { 				
				const escape = (''+row[header]).replace(/"/g, '\\"');
				return `"${escape}"`;
			});
			csvRows.push(values.join(','));
		}
		return csvRows.join('\n');
	}				
}

function confirmNoShow(e)
{
	let res = null;

	for(let i = 0; i < reportCache.reservations.length; i++)
	{
		if(reportCache.reservations[i].Id === e)
		{
			res = reportCache.reservations[i];
			break;
		}
	}

	if (res === null)
	{
		ShowModal("Invalid reservation id selected");
	}
	else
	{
		loadPageModal({size:"s",  onLoaded:function(m){
			$("#modal_"+m.modal+"-inner").html(
				"<div class='pad-2'>" +
				"<div class=''>" +
				"<h3 style='font-family: Nunito, quicksandregular; color: dimgray; font-weight: normal;'>" +
				"<i class='blue la la-money-bill la-2x' style='vertical-align: middle;'></i>" +
				"<span style='vertical-align: middle'> Confirm NoShow</span>" +
				"</h3>" +
				"</div>" +
				"</div>" +
				"<hr style='margin: 0px; padding: 0px;'/><br/>" +
				"<div id='reservation-con'>" +
				"<div class='pad-2' id='checkin-control-con'>" +
				"<div>" +
				"<h3 style='font-family: Nunito, quicksandregular, serif; font-weight: normal; vertical-align: middle;'>" +
				"<i class='la la-user blue' style='vertical-align: middle; font-size: 1.5em;'></i>"+
				res.Customer.Name+" "+res.Customer.Surname+"</h3>" +
				"<h5 style='margin: 0; padding: 0; font-weight: normal; font-family: Nunito, quicksandregular;'>"+res.Customer.Email+"</h5>" +
				"<h5 style='margin: 0; margin-top: 10px; padding: 0; font-weight: normal; font-family: Nunito, quicksandregularl'>"+res.Customer.Phone+"</h5>" +
				"</div>" +
				"</div>" +
				"<hr/> " +
				"<div class='pad-2'>" +
				"<div class='w3-row'>" +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>Bank</span> " +
				"</div> " +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>" +
				(res.Customer.Bank == '' ? 'N/A' : res.Customer.Bank)+"</span> " +
				"</div> " +
				"</div> " +
				"<div class='w3-row' style='margin-top: 10px;'>" +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>Account Name</span> " +
				"</div> " +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>" +
				(res.Customer.Accountname == '' ? 'N/A' : res.Customer.Accountname)+"</span> " +
				"</div> " +
				"</div> " +
				"<div class='w3-row' style='margin-top: 10px;'>" +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>Account Number</span> " +
				"</div> " +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>" +
				(res.Customer.Accountnumber == '' ? 'N/A' : res.Customer.Accountnumber)+"</span> " +
				"</div> " +
				"</div> " +
				"<div class='w3-row' style='margin-top: 10px;'>" +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>Paid</span> " +
				"</div> " +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>" +
				"<span style='font-family: Lato;'> &#8358;</span>"+
				numFormat(Number(res.Paidamount).toFixed(2))+"</span> " +
				"</div> " +
				"</div> " +
				"<div class='w3-row' style='margin-top: 10px;'>" +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>Refund</span> " +
				"</div> " +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>" +
				"<span style='font-family: Lato;'> &#8358;</span>"+
				numFormat(Number(res.Paidamount).toFixed(2))+"</span> " +
				"</div> " +
				"</div> " +
				"<div class='w3-row' style='margin-top: 10px;'>" +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;'>Issued By</span> " +
				"</div> " +
				"<div class='w3-col l6 m6 s6'>" +
				"<span style='font-family: Nunito, segoe ui;' id='marked-by'>" +
				"<span style='font-family: Lato;'></span>"+''+"</span> " +
				"</div> " +
				"</div> " +
				"</div>" +
				
				"<hr/>" +
				"<div class='pad-2' style='padding-top:5px'>" +
				"<label class='' style='font-family: Nunito, quicksandregular; display:block;'>Refund would be made by?</label>" +
				"<div class='w3-row' style='margin-top: 15px;'>" +
				"<div class='w3-col l6 m6 s6'>" +
				"<label><input id='cash_payment' name='pay-method' class='with-gap' type='radio' /><span>Cash</span></label>" +
				"</div> " +
				"<div class='w3-col l6 m6 s6'></div> " +
				"<label><input id='pos_payment' name='pay-method' class='with-gap' type='radio' /><span>POS (credit / debit card)</span></label>" +
				"</div>" +
				"<div class='w3-row' style='margin-top: 15px;'>" +
				"<div class='w3-col l6 m6 s6'>" +
				"<label><input id='transfer_payment' name='pay-method' class='with-gap' type='radio' /><span>Transfer / deposit</span></label>" +
				"</div> " +
				"<div class='w3-col l6 m6 s6'></div> " +
				"<label><input id='others_payment' name='pay-method' class='with-gap' type='radio' /><span>Others</span></label>" +
				"</div>" +
				"</div> " +
				"<hr/>" +
				"<div class='pad-2' style='padding-top:5px'>" +
				"<div class=''>" +
				"<label class='' style='font-family: Nunito, quicksandregular; display:block; margin-bottom:7px;'>Message from frontdesk</label>" +
				"<textarea id='refund-text' class='wix-textbox' readonly rows='5' style='display:block; border:1px solid #eee; border-radius:5px; padding:10px; font-family: Nunito, quicksandregular; width:100%; outline:none; box-shadow:none;' placeholder='Personal comment from frontdesk to you'></textarea>" +
				"</div>" +"<br/>" +
				"<button id='refund-btn' class='ui blue button' style='font-family: Nunito, quicksandregular; margin-top: 10px;' onclick=\"processRefund('"+res.Id+"','"+m.modal+"')\">Approve</button> " +
				"</div> " +
			"</div>");


			// add marked
			if (res.RefundPaymentCondition != '')
			{
				// add initiator
				$('#marked-by').html(res.RefundPaymentCondition.loggedBy);

				// check method
				document.getElementById(res.RefundPaymentCondition.method+'_payment').checked = true;

				// add message
				$('#refund-text').val(res.RefundPaymentCondition.message);
			}
		}});
	}
}

function processRefund(e, modal)
{
	loadingButton({btn:'refund-btn'});
	postJson('hms-admin/worker', function(data, status){
		if (status == 'done')
		{
			loadingButton({btn:'refund-btn', loading:false});

			// get data
			data = JSON.parse(data);

			// all good 
			if (data.status == 'success')
			{
				$("#refund-btn").html("<i class='check icon'></i> " + data.message);
				$("#refund-btn").prop("disabled", true);
				populateReservations(1);

				setTimeout(function(){
					closeGenModal(modal);
				}, 1000);
			}
			else
			{
				errorButton({btn:"refund-btn", msg:data.message});
			}
		}
	}, {
		job : 'approvenoshow',
		id : e
	});
}