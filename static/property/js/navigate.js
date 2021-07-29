
    var ThemeColor = "";
    var ThemeIcon = "";


    $(document).ready(function () {

        window.onhashchange = locationChanged;

        //window.onscroll = pageScrolled;

        window.onresize = reSize;

        FirstRun();
    });


    function locationChanged() {
        FirstRun();
    }

    function reSize()
    {
        let page_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let page_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        $(".f-height").height(page_height);

        let x = $(document).innerHeight();
        let hh = 0;
        if(getElement("page-header") != null)
        {
            hh += $('#page-header').innerHeight();
        }
        if(getElement("page-control-menu") != null)
        {
            hh += $("#page-control-menu").innerHeight();
        }
        if(getElement("header-menu") != null)
        {
            hh += $("#header-menu").innerHeight();
        }

        let r = x - (hh  + 2);
        $("#inventory-item-table-con").height(r);
        $("#inventory-timeline-con").height(r);


    }

    function getArg(num) {
        let hashes = location.hash.split("/");
        if (num == null) {
            if (hashes.length > 1) {
                return hashes[1];
            }
        }
        else {
            if (hashes.length > (1 + num)) {
                return hashes[(1 + num)];
            }
        }
    }

    function pageScrolled() {

    }

    function DrawNav(){
        $('#partnernav__container').html(
            "<div>"+
                "<a href='/?endsession' class='partnernav__link partnernav__logo'>"+
                    "<i class='la la-globe partnernav__icon' style='color: rgba(255,255,255,0.3);'></i>"+
                    "<span class='partnernav__logo-name'>Return</span>"+
                "</a>"+

                "<div class='partnernav__list'>"+
                    "<div class='partnernav__items'>"+

                        "<a href='#property' class='partnernav__link active'>"+
                            "<i class='bx bx-home partnernav__icon' ></i>"+
                            "<span class='partnernav__name'>Dashboard</span>"+
                        "</a>"+

                        "<div class='partnernav__dropdown'>"+
                            "<a href='#' class='partnernav__link'>"+
                                "<i class='bx bx-calendar partnernav__icon' ></i>"+
                                "<span class='partnernav__name'>Booking Management</span>"+
                                "<i class='bx bx-chevron-down partnernav__icon partnernav__dropdown-icon'></i>"+
                            "</a>"+

                            "<div class='partnernav__dropdown-collapse'>"+
                                "<div class='partnernav__dropdown-content'>"+
                                    "<a href='#reservation' class='partnernav__dropdown-item'>Reservations</a>"+
                                    "<a href='#reservation/customers' class='partnernav__dropdown-item'>Customers</a>"+
                                    "<a href='#reservation/lodging' class='partnernav__dropdown-item'>In-house Guest</a>"+
                                    "<a href='"+phpvars.FRONTDESK_MANAGER+"' class='partnernav__dropdown-item' target='_blank'>Front desk</a>"+
                                    "<a href='#reservation/avaliability' class='partnernav__dropdown-item'>Avaliability Manager</a>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+

                        "<a href='#' class='partnernav__link'>"+
                            "<i class='bx bx-trip partnernav__icon' ></i>"+
                            "<span class='partnernav__name'>Channel Manager</span>"+
                        "</a>"+
                        
                        "<div class='partnernav__dropdown'>"+
                            "<a href='#' class='partnernav__link'>"+
                                "<i class='bx bxs-coupon partnernav__icon' ></i>"+
                                "<span class='partnernav__name'>Discount & Coupon</span>"+
                                "<i class='bx bx-chevron-down partnernav__icon partnernav__dropdown-icon'></i>"+
                            "</a>"+
                            "<div class='partnernav__dropdown-collapse'>"+
                                "<div class='partnernav__dropdown-content'>"+
                                    "<a href='#discount' class='partnernav__dropdown-item'>Discount</a>"+
                                    "<a href='#coupon' class='partnernav__dropdown-item'>Coupon</a>                                       "+
                                "</div>"+
                            "</div>"+
                        "</div>"+

                        "<div class='partnernav__dropdown'>"+
                            "<a href='#' class='partnernav__link'>"+
                                "<i class='bx bx-bed partnernav__icon' ></i>"+
                                "<span class='partnernav__name'>Room Setting</span>"+
                                "<i class='bx bx-chevron-down partnernav__icon partnernav__dropdown-icon'></i>"+
                            "</a>"+

                            "<div class='partnernav__dropdown-collapse'>"+
                                "<div class='partnernav__dropdown-content'>"+
                                    "<a href='#rooms' class='partnernav__dropdown-item'>Category</a>"+
                                    "<a href='#rooms/number' class='partnernav__dropdown-item'>List</a>"+
                                    "<a href='#rooms' class='partnernav__dropdown-item'>Inventory</a>"+
                                    "<a href='#rooms' class='partnernav__dropdown-item'>Extra Service</a>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+

                        "<div class='partnernav__dropdown'>"+
                            "<a href='#' class='partnernav__link'>"+
                                "<i class='bx bx-user partnernav__icon' ></i>"+
                                "<span class='partnernav__name'>Admin Users</span>"+
                                "<i class='bx bx-chevron-down partnernav__icon partnernav__dropdown-icon'></i>"+
                            "</a>"+

                            "<div class='partnernav__dropdown-collapse'>"+
                                "<div class='partnernav__dropdown-content'>"+
                                    "<a href='#staff' class='partnernav__dropdown-item'>All Staff</a>"+
                                    "<a href='#staff/roles' class='partnernav__dropdown-item'>Group Role</a>"+
                                    "<a href='#staff/list' class='partnernav__dropdown-item'>Staff List</a>"+
                                    "<a href='#staff/departments' class='partnernav__dropdown-item'>Department</a>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+

                        "<div class='partnernav__dropdown'>"+
                            "<a href='#' class='partnernav__link'>"+
                                "<i class='bx bx-pie-chart-alt partnernav__icon' ></i>"+
                                "<span class='partnernav__name'>Reports</span>"+
                                "<i class='bx bx-chevron-down partnernav__icon partnernav__dropdown-icon'></i>"+
                            "</a>"+

                            "<div class='partnernav__dropdown-collapse'>"+
                                "<div class='partnernav__dropdown-content'>"+
                                    "<a href='#reports' class='partnernav__dropdown-item'>Revenue</a>"+
                                    "<a href='#reports' class='partnernav__dropdown-item'>Checkin</a>"+
                                    "<a href='#reports' class='partnernav__dropdown-item'>Occupancy</a>"+
                                    "<a href='#reports' class='partnernav__dropdown-item'>Inventory</a>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+

                        "<a href='#settings' class='partnernav__link'>"+
                            "<i class='bx bx-cog partnernav__icon'></i>"+
                            "<span class='partnernav__name'>Settings</span>"+
                        "</a>"+
                        

                    "</div>"+
                "</div>"+
            "</div>"+

            "<a href='#sign-out' class='partnernav__link partnernav__logout'>"+
                "<i class='bx bx-log-out partnernav__icon' ></i>"+
                "<span class='partnernav__name'>Sign out</span>"+
            "</a>"
        );
    }

    function FirstRun() {
        let hash = location.hash;

        let page = hash.split("/")[0];

        DrawNav()
        if (page === "") {
                location.hash = "#property";
            DrawProperty();
        }

        switch (page)
        {
            case "#property":
                DrawProperty();
                break;

            case "#reservation":
                drawReservations();
                break;

            case "#new-room-category":
                DrawNewRoomCategory();
                break;

            case "#messaging":
                DrawMessaging();
                break;

            case "#rooms":
                DrawRoom();
                break;

            case "#new-room":
                DrawNewRoom();
                break;

            case "#staff":
                DrawStaff();
                break;

            case "#new-admin-user":
                DrawNewAdminUsers();
                break;

            case "#add-role":
                DrawNewGroupRole();
                break;

            case "#discount":
                DrawDiscounts();
                break;

            case "#new-discount":
                DrawNewDiscount();
                break;

            case "#coupon":
                DrawCoupon();
                break;

            case "#new-coupon":
                DrawNewCoupon();
                break;

            case "#reports":
                DrawReport();
                break;

            case "#settings":
                DrawPropertySettings();
                break;

            case "#sign-out":
                DoSignOut();
                break;

            case "#room-availability":
                DrawAvailablitCalendar();
                break;

            case "#room-rate":
                DrawRatesCalendar()
                break;

            case "#reservation-detail":
                DrawReservation();
                break;

            case "#customer":
                DrawCustomerProfile();
                break;

            default:
                break;
        }
    }

    function DrawProperty()
    {
        $('body').css("background-color", "rgb(250,250,250)");

        $("#min-menue-con").html("");
        $("#property-page").html(
            // "<div class='' style='margin: auto;'>" +
            // "<div class='pad-2' style=''>" +
            // "<div class='w3-row'>" +
            // "<div class='w3-col l8 m8 s12'>" +
            // "<div class='l-width-xl pad-t'>" +
            // "<h2 id='property-name' style='font-family: varela_roundregular; font-weight: normal; color: dimgray;'>Property Name</h2>" +
            // "<div id='property-page-1' class='pad-3 lift-1 widget curve' style=''>" +
            // "" +
            // "</div>" +
            // "</div> " +
            // "</div> " +
            // "<div class='w3-col l4 m4 s12'>" +
            // "<div class=''>" +
            // "<h1 style='font-family: varela_roundregular; font-weight: normal; color: dimgray;'>" +
            // "<div class='switch'><label><input id='property-status' type='checkbox' disabled onchange='switchPropertyState(this)'/><span class='lever'></span></label>" +
            // "<span style='font-size: 16px;'>Open / close property</span></div> " +
            // "</h1>" +
            // "<div class='pad-3 lift-1 widget curve' style='margin-top: 10px;'>" +
            // "<div id='property-side-1' class=''>" +
            // "" +
            // "</div>" +
            // "</div>" +
            // "</div> " +
            // "</div> " +
            // "<div class='w3-col l4 m4 s12'></div> " +
            // "</div> " +
            // "</div>" +
            // "</div>"


            
            "<div class='analytics_container'>"+
                "<div class='property_box'>"+
                    "<div class='property_header'>"+
                        "<h1 style='margin: 0;'>Property Information</h1>"+
                        "<div class='switch'>"+
                        "<label><input id='property-status' type='checkbox' disabled onchange='switchPropertyState(this)'/><span class='lever'></span></label>"+
                        "<span style='font-size: 11px;'>Open / Close property</span>"+
                        "</div>" +
                    "</div>"+
                    "<div class='triple_column property_data'>"+
                        "<div id='city_info' class='property_item'>"+"</div>"+
                        "<div id='state_info' class='property_item'>"+"</div>"+
                        "<div id='phone_info' class='property_item'>"+"</div>"+
                    "</div>"+
                    "<div class='double_column property_data'>"+
                        "<div id='email_info' class='property_item'>"+"</div>"+
                        "<div id='address_info' class='property_item'>"+"</div>"+
                    "</div>"+
                    // "<div class='single_column property_data'>"+
                    // "</div>"+                    
                "</div>"+
                "<div>"+
                    "<div class='analytics_box' id='first_analytics'>"+
                        "<section class='analytic'>"+"</section>"+
                        "<section class='analytic'>"+"</section>"+
                        "<section class='analytic'>"+"</section>"+
                    "</div>"+
                    
                    "<div class='analytics_box'>"+
                        "<section class='analytic'>"+"</section>"+
                        "<section class='analytic'>"+"</section>"+
                        "<section class='analytic'>"+"</section>"+
                    "</div>"+

                    "<div class='analytics_box'>"+
                        "<section class='analytic'>"+"</section>"+
                        "<section class='analytic'>"+"</section>"+
                        "<section class='analytic'>"+"</section>"+
                    "</div>"+

                    "<div class='analytics_box'>"+
                        "<section class='analytic'>"+"</section>"+
                        "<section class='analytic'>"+"</section>"+
                        "<section class='analytic'>"+"</section>"+
                    "</div>"+
                "</div>"+

                "<div id='reviews' class='reviews property_item'>"+
                    // "<div class='reviews_header'>"+
                    //     "<h3>Recent Reviews</h3>"+
                    // "</div>"+
                    // "<div id='all_reviews'>"+
                    "<div class='ui placeholder'>"+
                        "<div class='line'>"+"</div>"+
                        "<div class='line'>"+"</div>"+
                    "</div>"+
                        // "<div class='review_item'>"+
                        //     "<div class='review_bio'>"+
                        //         "<div>8.0</div>"+
                        //         "<span class='center_vertical'>Victor Chukwuemekaeze</span>"+
                        //     "</div>"+

                        //     "<div class='review_text center_vertical'>"+
                        //         "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit....</p>"+
                        //     "</div>"+
                        //     "<div class='review_date'>"+
                        //         "<p>July 28, 2021</p>"+
                        //     "</div>"+
                        // "</div>"+                        
                    // "</div>"+
                                    
                "</div>"+                
            "</div>"
            );

        populateProperty();
    }

    function drawReservations()
    {
        let arg = getArg();

        $('body').css("background-color", "white");

        $("#min-menue-con").html(
            "<div>" +
            "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: 0;'>" +
            "       <div class='header blue item' style='border-radius: 0; background-color: rgb(0,100,140);opacity: 0.5; color: white;'>" +
            "           <i class='calendar alternate outline icon'></i> Manage Bookings" +
            "       </div>" +
            "       <a href='#reservation' class='item "+(arg == null ? "active" : "")+"'>" +
            "           Reservations" +
            "       </a>" +
            "       <a href='#reservation/customers' class='item "+(arg == "customers" ? "active" : "")+"'>" +
            "           Customers" +
            "       </a>" +
            "       <a href='#reservation/lodging' class='item "+(arg == "lodging" ? "active" : "")+"'>" +
            "           In house guests" +
            "       </a>" +
            "       <a href='"+phpvars.FRONTDESK_MANAGER+"' class='item' target='_blank'>" +
            "           Front desk" +
            "       </a>" +
            "       <a href='#reservation/avaliability' class='item "+(arg == "avaliability" ? "active" : "")+"'>" +
            "           Avaliability" +
            "       </a>" +
            "   </div>" +
            "</div>");

        $("#property-page").html(
            "<div>" +
            "<div id='menu'></div>" +
            "<div id='page'></div>" +
            "</div>");

        if(arg == null)
        {
            DrawReservations();
        }
        else if(arg == "lodging")
        {
            DrawLoging();
        }
        else if(arg == "customers")
        {
            DrawCustomers();
        }
        else if(arg == "avaliability")
        {
            DrawRoomAvailablitCalendar();
        }
    }

    function DrawMessaging()
    {
        $('body').css("background-color", "white");

        let arg = getArg();

        $("#min-menue-con").html(
            "<div>" +
            "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
            "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
            "           <i class='open envelope icon'></i> Messaging" +
            "       </div>" +
            "       <a href='#messaging' class='item "+(arg == null ? "active" : "")+"'>" +
            "           E-mail" +
            "       </a>" +
            "       <a href='#messaging/sms' class='item "+(arg == "sms" ? "active" : "")+"'>" +
            "           SMS" +
            "       </a>" +
            "       <a href='#messaging/message-template' class='item "+( (arg == "message-template" || arg == 'add-message-template' || arg == 'add-sms-template' || arg == 'new-schedule' || arg == 'schedule-detail' || arg == 'event-detail') ? "active" : "")+"'>" +
            "           Message Template" +
            "       </a>" +
            "       <a href='#messaging/contact-list' class='item "+(arg == "contact-list" ? "active" : "")+"'>" +
            "           Contact List" +
            "       </a>" +
            "       <a href='#messaging/schedular' class='item "+(arg == "schedular" ? "active" : "")+"'>" +
            "           Schedular" +
            "       </a>" +
            "   </div>" +
            "</div>");

        $("#property-page").html(
            "<div>" +
            "<div id='menu'></div>" +
            "<div id='page'></div>" +
            "</div>");

        switch (arg)
        {
            case 'sms':
                DrawSendSMS();
            break;

            case 'message-template':
                DrawMessagesTemplate();
            break;

            case 'add-message-template':
                DrawAddMessagesTemplate();
            break;

            case 'add-sms-template':
                DrawAddSMSTemplate();
            break;

            case 'contact-list':
                DrawContactList();
            break;

            case 'schedular':
                DrawReminders();
            break;

            case 'new-schedule':
                DrawSchedule();
            break;

            case 'new-event-listener':
                DrawNewEventListner();
            break;

            case 'schedule-detail':
                DrawScheduleDetail();
            break;

            case 'event-detail':
                DrawEventDetails();
            break;

            default:
                DrawSendMessages();
        }
    }

    function DrawRoom()
    {
        $('body').css("background-color", "white");

        let arg = getArg();

        $("#min-menue-con").html(
            "<div>" +
            "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
            "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
            "          <i class='bed icon'></i> Rooms" +
            "       </div>" +
            "       <a href='#rooms' class='item "+(arg == null ? "active" : "")+"'>" +
            "           Categories" +
            "       </a>" +
            "       <a href='#rooms/number' class='item "+(arg == "number" ? "active" : "")+"'>" +
            "           Number/ name" +
            "       </a>" +
            "   </div>" +
            "</div>");

        $("#property-page").html(
            "<div>" +
            "<div id='menu'>" +
            "</div>" +
            "<div id='page'></div>" +
            "</div>");


        if(arg == null)
        {
            DrawRoomCategories();
            $("#menu").html(

                "<div class='l-pad-2 s-pad-1'>" +
                "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
                "<img src='"+phpvars.CDN_URL+"/images/roomservice.png' style='width: 40px; margin-top: 0px;'> Room/Hall Category" +
                "</h3>" +
                "</div>" +

                "<div class='pad-2'>" +
                "<a href='#new-room-category'><button class='ui blue fluid button'>Add new category</button></a>" +
                "</div> ");
        }
        else
        {
            DrawRooms();
            $("#menu").html(

                "<div class='l-pad-2 s-pad-1'>" +
                "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
                "<img src='"+phpvars.CDN_URL+"/images/bed_1.png' style='width: 40px; margin-top: 0px;'> Rooms" +
                "</h3>" +
                "</div>" +

                "<div class='pad-2'>" +
                "<a href='#new-room'><button class='ui blue fluid button''>New room</button></a>" +
                "</div> ");
        }
    }

    function DrawStaff()
    {
        let arg = getArg();

        $('body').css("background-color", "white");

        $("#min-menue-con").html(
            "<div>" +
            "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
            "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
            "           <i class='users icon'></i> Staff" +
            "       </div>" +
            "       <a href='#staff' class='item  "+(arg == null ? "active" : "")+"'>" +
            "           All" +
            "       </a>" +
            "       <a href='#staff/roles' class='item  "+(arg == "roles" ? "active" : "")+"'>" +
            "           Group role" +
            "       </a>" +
            "       <a href='#staff/list' class='item  "+(arg == "list" || arg == 'new-staff' ? "active" : "")+"'>" +
            "           Staff list" +
            "       </a>" +
            "       <a href='#staff/departments' class='item  "+(arg == "departments" || arg == 'new-department' ? "active" : "")+"'>" +
            "           Departments" +
            "       </a>" +
            "   </div>" +
            "</div>");

        $("#property-page").html(
            "<div>" +
            "<div id='menu'></div>" +
            "<div id='page'></div>" +
            "</div>");

        if (arg == null)
        {
            DrawAdminUsers();
        }
        else if (arg == "roles")
        {
            DrawAdminGroupRoles();
        }
        else if (arg == "list")
        {
            DrawStaffList();
        }
        else if (arg == 'departments')
        {
            DrawDepartments();
        }
        else if (arg == 'new-staff')
        {
            DrawNewStaff();
        }
    }

    function DrawDepartments()
    {
        $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
            "<div class='l-pad-2 s-pad-1'>" +
            "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
            "<img src='"+phpvars.CDN_URL+"/images/admin_user.png' style='width: 50px; margin-top: -10;'> Departments " +
            "</h3>" +
            "</div>" +
            "<div class='l-pad-2 s-pad-1'>" +
            "<a href='javascript:void(0);' onclick='showDepartmentModal(); return false;'><button class='ui blue sleak fluid button'><i class='plus icon'></i> New Department</button></a> " +
            "</div>" +
            "</div>");

        let searchCon = div({ add: DrawSearch({ method: "populateDepartments" }), class: "l-pad-2" });
        searchCon.style.paddingBottom = "0px";
        _page({ add: searchCon });

        _page({
            add: DrawTable(["Name", "Staffs", "Action"],
                {
                    GroupAction: [{ Text: "DIVIDER" },]
                }).outerHTML, class: "l-pad-2"
        });

        $(".ui.dropdown").dropdown();

        // populate
        populateDepartments();
    }

    function DrawStaffList()
    {
        $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
            "<div class='l-pad-2 s-pad-1'>" +
            "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
            "<img src='"+phpvars.CDN_URL+"/images/admin_user.png' style='width: 50px; margin-top: -10;'> Staff List " +
            "</h3>" +
            "</div>" +
            "<div class='l-pad-2 s-pad-1'>" +
            "<a href='#staff/new-staff'><button class='ui blue sleak fluid button'><i class='plus icon'></i> New Staff</button></a> " +
            "</div>" +
            "</div>");

        let searchCon = div({ add: DrawSearch({ method: "populateStaff" }), class: "l-pad-2" });
        searchCon.style.paddingBottom = "0px";
        _page({ add: searchCon });

        _page({
            add: DrawTable(["Display Pic", "Staff Info", "Deparment", "Status", 'Salary', 'State', "Action"],
                {
                    GroupAction: [{ Text: "DIVIDER" },]
                }).outerHTML, class: "l-pad-2"
        });

        $(".ui.dropdown").dropdown();

        // run
        populateStaff();
    }

    function showDepartmentModal()
    {
        loadModal({size:"m", title:"Add a new Department", html:"<div class='pad-2'>" +
        "<input type='hidden' id='department-id' value=''/>" +
		"<div class='ui fluid input'><input type='text' value='' id='department-name' placeholder='Department Name'/></div></div>" +
		"<div class='pad-1' style='background-color: whitesmoke;'><button class='ui blue button' id='save-dept-btn' onclick='saveDepartment();'>Save</button></div>"});
    }

    function DrawReport()
    {
        let arg = getArg();

        $('body').css("background-color", "white");

        $("#min-menue-con").html(
            "<div>" +
            "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
            "       <div class='header item'style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
            "           <i class='pie chart icon'></i> Reports" +
            "       </div>" +
            "       <a href='#reports' class='item "+(arg == null ? "active" : "")+"'>" +
            "           Revenue" +
            "       </a>" +
            // "       <a href='#reports/finance' class='item "+(arg == "finance" ? "active" : "")+"'>" +
            // "           Financial report" +
            // "       </a>" +
            // "       <a href='#reports/customers' class='item "+(arg == "customers" ? "active" : "")+"'>" +
            // "           Customers" +
            // "       </a>" +
            // "       <a href='#reports/reviews' class='item "+(arg == "reviews" ? "active" : "")+"'>" +
            // "           Reviews" +
            // "       </a>" +
            "   </div>" +
            "</div>");

        $("#property-page").html(
            "<div>" +
            "<div id='menu'></div>" +
            "<div id='page'></div>" +
            "</div>");

        // draw report
        if (arg == null)
        {
            drawReport();
        }
    }

    function drawReport()
	{
        $("#menu").html(
            "<div class='w3-col l12 m12 s12 pad-1'>" +

            "<div class='l-pad-2 s-pad-1'>" +
            "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
            "<img src='"+phpvars.CDN_URL+"/images/money.png' style='width: 40px; margin-top: 0px;'> Report Summary" +
            "</h3>" +
            "</div>" +

            "<div class='w3-row'>" +
            "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
            "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
            "<h6 style='text-align: center;'><i class='yellow user alternate outline inverted circular icon'></i></h6>" +
            "</div>" +
            "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
            "<h6 id='active-user' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>General</h6>" +
            "<h6 class='' style='text-align: right; color: dimgray; font-family: varela_roundregular; margin-right: 10px;'>Revenue report <a href='javascript:void(0)' onclick=\"launchUsers()\" class='switch-user' style='display:none'>switch user?</a>" +
            "<input type='hidden' id='pos-user' value=''/>"+
            "</h6>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
            "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
            "<h6 style='text-align: center;'>" +
            "<i class='green calendar inverted times outline circular icon'></i>" +
            "</h6>" +
            "</div>" +
            "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
            "<h6 id='total-income' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>&#8358;"+numFormat(Number('0').toFixed(2))+"</h6>" +
            "<h6 class='' style='text-align: right; color: dimgray; font-family: varela_roundregular; margin-right: 10px;'>Total Revenue" +
            "</h6>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
            "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
            "<h6 style='text-align: center;'>" +
            "<i class='red calendar inverted times outline circular icon'></i>" +
            "</h6>" +
            "</div>" +
            "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
            "<h6 id='total-refunds' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>&#8358;"+numFormat(Number('0').toFixed(2))+"</h6>" +
            "<h6 class='' style='text-align: right; color: dimgray; font-family: varela_roundregular; margin-right: 10px;'>Total Refunds" +
            "</h6>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>");

		$("#page").html(
			
			"<div class='l-width-12 w3-col pad-2' id='large-calendar-con'>" +
			"<div id=''>" +


			"<div class='ui pointing menu'>" +
			"  <a id='all-report' class='active item reserve-tab' onclick='switchReportTab(this)' style='font-family: Nunito;'>" +
			"     <i class='circle dot blue outline icon'></i> All" +
			"  </a>" +
			"  <a id='paid-report' class='item reserve-tab' onclick='switchReportTab(this)' style='font-family: Nunito;'>" +
			"     <i class='green check circle icon'></i> Income" +
			"  </a>" +
			"  <a id='refund-report' class='item reserve-tab' onclick='switchReportTab(this)' style='font-family: Nunito;'>" +
			"     <i class='red times circle icon'></i> Refunds" +
			"  </a>" +
			"    <div class='item'>" +
			"      <div class='ui input payment-mode-wrapper'>" +
					drawPaymentMode() +
			"      </div>" +
			"    </div>" +
			"    <div class='item'>" +
			"      <div class='ui transparent icon input'>" +
			"        <input id='report-due-date' type='text' data-toggle='datepicker' " +
			"             placeholder='Date from' onchange='populateReport();'>" +
			"        <i id='report-cancel-btn' class='blue calendar alternate outline icon' onclick='cancelDate()'></i>" +
			"      </div>" +
			"    </div>" +
			"	<div class='item'>" +
			"      <div class='ui transparent icon input'>" +
			"        <input id='report-due-date-range' type='text' data-toggle='datepicker' " +
			"             placeholder='Date to' onchange='populateReport();'>" +
			"        <i id='report-cancel-btn' class='blue calendar alternate outline icon' onclick='cancelDate()'></i>" +
			"      </div>" +
			"    </div>" +
			"  <div class='right menu'>" +
			"    <div class='item'>" +
			"      <div class='ui transparent icon input'>" +
			"        <input id='search-txt' type='text' placeholder='Search...' " +
			"         onkeyup='if(event.keyCode == 13){populateReport();}'/>" +
			"        <i class='search link icon' onclick=\"populateReport()\"></i>" +
			"      </div>" +
			"    </div>" +
			"  </div>" +
			"</div>" +

			DrawTable(["Customer", "Total", "User", "Payment Mode", "Date", "Account", "Remark"],
				{
					Celled: true, Padded: true, GroupAction: [{ Text: "Export CSV", Method: "exportReportCSV" }]
				}).outerHTML +

			"</div>" +
			"</div>"
		);

		$(".ui.dropdown").dropdown();
		$("#payment-mode").dropdown();

		new Lightpick({
			field: document.getElementById('report-due-date'),
			singleDate: true,
			inline:false,
			format:"MM/DD/YY",
			numberOfColumns:1,
			numberOfMonths:1,
			onSelect: function(date){
				populateReport();
			}
		});

		new Lightpick({
			field: document.getElementById('report-due-date-range'),
			singleDate: true,
			inline:false,
			format:"MM/DD/YY",
			numberOfColumns:1,
			numberOfMonths:1,
			onSelect: function(date){
				populateReport();
			}
		});

		populateReport();
    }
    
    function drawPaymentMode()
	{
		return '<select id="payment-mode" style="border:none" onchange="populateReport()">\
		<option value=""> Select payment mode </option>\
		<option value="pos">Card (POS)</option>\
		<option value="cash">Cash</option>\
		<option value="online">Online</option>\
		<option value="transfer">Transfer/Deposit</option>\
		<option value="other">Other</option>\
		<option value="all">All</option>\
		</select>'
    }
    
    function switchReportTab(e)
	{
		$(".reserve-tab").removeClass("active");
		$(e).addClass("active");
		//$("#reservation-due-date").val("");
		$("#search-txt").val("");
		// uncheck main sel
		document.querySelector('#main-sel').checked = false;
		populateReport();
    }

    function DrawPropertySettings()
    {
        $('body').css("background-color", "white");

        $("#min-menue-con").html("");
        $("#property-page").html(
            "<div style='margin-top: 20px;'>" +
                "<div class='l-width-7 w3-row' style='margin: auto;'>" +
                    "<h1 class='ui header' style='font-family: varela_roundregular; font-weight: normal; color: dimgray;'>" +
                        "<img src='"+phpvars.CDN_URL+"/images/cog.png' style='width: 50px; margin-top: -15px;'> " +
                        "Settings" +
                    "</h1>" +

                    phpvars.html.SETTINGS +

                "</div> " +
            "</div>");

        $(".ui.dropdown").dropdown();

        populatePropertySettings();
    }

    function DrawDiscounts()
    {
        $('body').css("background-color", "white");

        $("#min-menue-con").html(
            "<div>" +
            "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
            "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
            "           <i class='percent icon'></i> &nbsp;Coupon & discounts" +
            "       </div>" +
            "       <a href='#coupon' class='item'>" +
            "           Coupon" +
            "       </a>" +
            "       <a href='#discount' class='item active'>" +
            "           Discount" +
            "       </a>" +
            "   </div>" +
            "</div>");

        $("#property-page").html(
            "<div>" +
            "<div id='menu'></div>" +
            "<div id='page'></div>" +
            "</div>");

            DrawDiscount();

            $("#menu").html(
                "<div class='l-pad-2 s-pad-1'>" +
                "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
                "<img src='"+phpvars.CDN_URL+"/images/percent.png' style='width: 40px; margin-top: 0px;'> Discount" +
                "</h3>" +
                "</div>" +

                "<div class='pad-2'>" +
                "<a href='#discount'><button class='ui blue fluid button'>Discount list</button></a><br/> " +
                "<a href='#new-discount'><button class='ui blue fluid button'>New Discount</button></a>" +
                "</div> ");
    }

    function countryDropdown()
	{
		var country_dropdown = "<div id='country' class='ui search fluid selection dropdown'>" +
			"  <input type='hidden' name='country'>" +
			"  <i class='dropdown icon'></i>" +
			"  <div class='default text'>Select Country</div>" +
			"  <div class='menu'>" +
			"  <div class='item' data-value='af'><i class='af flag'></i>Afghanistan</div>" +
			"  <div class='item' data-value='ax'><i class='ax flag'></i>Aland Islands</div>" +
			"  <div class='item' data-value='al'><i class='al flag'></i>Albania</div>" +
			"  <div class='item' data-value='dz'><i class='dz flag'></i>Algeria</div>" +
			"  <div class='item' data-value='as'><i class='as flag'></i>American Samoa</div>" +
			"  <div class='item' data-value='ad'><i class='ad flag'></i>Andorra</div>" +
			"  <div class='item' data-value='ao'><i class='ao flag'></i>Angola</div>" +
			"  <div class='item' data-value='ai'><i class='ai flag'></i>Anguilla</div>" +
			"  <div class='item' data-value='ag'><i class='ag flag'></i>Antigua</div>" +
			"  <div class='item' data-value='ar'><i class='ar flag'></i>Argentina</div>" +
			"  <div class='item' data-value='am'><i class='am flag'></i>Armenia</div>" +
			"  <div class='item' data-value='aw'><i class='aw flag'></i>Aruba</div>" +
			"  <div class='item' data-value='au'><i class='au flag'></i>Australia</div>" +
			"  <div class='item' data-value='at'><i class='at flag'></i>Austria</div>" +
			"  <div class='item' data-value='az'><i class='az flag'></i>Azerbaijan</div>" +
			"  <div class='item' data-value='bs'><i class='bs flag'></i>Bahamas</div>" +
			"  <div class='item' data-value='bh'><i class='bh flag'></i>Bahrain</div>" +
			"  <div class='item' data-value='bd'><i class='bd flag'></i>Bangladesh</div>" +
			"  <div class='item' data-value='bb'><i class='bb flag'></i>Barbados</div>" +
			"  <div class='item' data-value='by'><i class='by flag'></i>Belarus</div>" +
			"  <div class='item' data-value='be'><i class='be flag'></i>Belgium</div>" +
			"  <div class='item' data-value='bz'><i class='bz flag'></i>Belize</div>" +
			"  <div class='item' data-value='bj'><i class='bj flag'></i>Benin</div>" +
			"  <div class='item' data-value='bm'><i class='bm flag'></i>Bermuda</div>" +
			"  <div class='item' data-value='bt'><i class='bt flag'></i>Bhutan</div>" +
			"" +
			"  <div class='item' data-value='bo'><i class='bo flag'></i>Bolivia</div>" +
			"  <div class='item' data-value='ba'><i class='ba flag'></i>Bosnia</div>" +
			"  <div class='item' data-value='bw'><i class='bw flag'></i>Botswana</div>" +
			"  <div class='item' data-value='bv'><i class='bv flag'></i>Bouvet Island</div>" +
			"  <div class='item' data-value='br'><i class='br flag'></i>Brazil</div>" +
			"  <div class='item' data-value='vg'><i class='vg flag'></i>British Virgin Islands</div>" +
			"  <div class='item' data-value='bn'><i class='bn flag'></i>Brunei</div>" +
			"  <div class='item' data-value='bg'><i class='bg flag'></i>Bulgaria</div>" +
			"  <div class='item' data-value='bf'><i class='bf flag'></i>Burkina Faso</div>" +
			"  <div class='item' data-value='mm'><i class='mm flag'></i>Burma</div>" +
			"  <div class='item' data-value='bi'><i class='bi flag'></i>Burundi</div>" +
			"  <div class='item' data-value='tc'><i class='tc flag'></i>Caicos Islands</div>" +
			"  <div class='item' data-value='kh'><i class='kh flag'></i>Cambodia</div>" +
			"  <div class='item' data-value='cm'><i class='cm flag'></i>Cameroon</div>" +
			"  <div class='item' data-value='ca'><i class='ca flag'></i>Canada</div>" +
			"  <div class='item' data-value='cv'><i class='cv flag'></i>Cape Verde</div>" +
			"  <div class='item' data-value='ky'><i class='ky flag'></i>Cayman Islands</div>" +
			"  <div class='item' data-value='cf'><i class='cf flag'></i>Central African Republic</div>" +
			"  <div class='item' data-value='td'><i class='td flag'></i>Chad</div>" +
			"  <div class='item' data-value='cl'><i class='cl flag'></i>Chile</div>" +
			"  <div class='item' data-value='cn'><i class='cn flag'></i>China</div>" +
			"  <div class='item' data-value='cx'><i class='cx flag'></i>Christmas Island</div>" +
			"  <div class='item' data-value='cc'><i class='cc flag'></i>Cocos Islands</div>" +
			"  <div class='item' data-value='co'><i class='co flag'></i>Colombia</div>" +
			"  <div class='item' data-value='km'><i class='km flag'></i>Comoros</div>" +
			"  <div class='item' data-value='cg'><i class='cg flag'></i>Congo Brazzaville</div>" +
			"  <div class='item' data-value='cd'><i class='cd flag'></i>Congo</div>" +
			"  <div class='item' data-value='ck'><i class='ck flag'></i>Cook Islands</div>" +
			"  <div class='item' data-value='cr'><i class='cr flag'></i>Costa Rica</div>" +
			"  <div class='item' data-value='ci'><i class='ci flag'></i>Cote Divoire</div>" +
			"  <div class='item' data-value='hr'><i class='hr flag'></i>Croatia</div>" +
			"  <div class='item' data-value='cu'><i class='cu flag'></i>Cuba</div>" +
			"  <div class='item' data-value='cy'><i class='cy flag'></i>Cyprus</div>" +
			"  <div class='item' data-value='cz'><i class='cz flag'></i>Czech Republic</div>" +
			"  <div class='item' data-value='dk'><i class='dk flag'></i>Denmark</div>" +
			"  <div class='item' data-value='dj'><i class='dj flag'></i>Djibouti</div>" +
			"  <div class='item' data-value='dm'><i class='dm flag'></i>Dominica</div>" +
			"  <div class='item' data-value='do'><i class='do flag'></i>Dominican Republic</div>" +
			"  <div class='item' data-value='ec'><i class='ec flag'></i>Ecuador</div>" +
			"  <div class='item' data-value='eg'><i class='eg flag'></i>Egypt</div>" +
			"  <div class='item' data-value='sv'><i class='sv flag'></i>El Salvador</div>" +
			"  <div class='item' data-value='gb'><i class='gb flag'></i>England</div>" +
			"  <div class='item' data-value='gq'><i class='gq flag'></i>Equatorial Guinea</div>" +
			"  <div class='item' data-value='er'><i class='er flag'></i>Eritrea</div>" +
			"  <div class='item' data-value='ee'><i class='ee flag'></i>Estonia</div>" +
			"  <div class='item' data-value='et'><i class='et flag'></i>Ethiopia</div>" +
			"  <div class='item' data-value='eu'><i class='eu flag'></i>European Union</div>" +
			"  <div class='item' data-value='fk'><i class='fk flag'></i>Falkland Islands</div>" +
			"  <div class='item' data-value='fo'><i class='fo flag'></i>Faroe Islands</div>" +
			"  <div class='item' data-value='fj'><i class='fj flag'></i>Fiji</div>" +
			"  <div class='item' data-value='fi'><i class='fi flag'></i>Finland</div>" +
			"  <div class='item' data-value='fr'><i class='fr flag'></i>France</div>" +
			"  <div class='item' data-value='gf'><i class='gf flag'></i>French Guiana</div>" +
			"  <div class='item' data-value='pf'><i class='pf flag'></i>French Polynesia</div>" +
			"  <div class='item' data-value='tf'><i class='tf flag'></i>French Territories</div>" +
			"  <div class='item' data-value='ga'><i class='ga flag'></i>Gabon</div>" +
			"  <div class='item' data-value='gm'><i class='gm flag'></i>Gambia</div>" +
			"  <div class='item' data-value='ge'><i class='ge flag'></i>Georgia</div>" +
			"  <div class='item' data-value='de'><i class='de flag'></i>Germany</div>" +
			"  <div class='item' data-value='gh'><i class='gh flag'></i>Ghana</div>" +
			"  <div class='item' data-value='gi'><i class='gi flag'></i>Gibraltar</div>" +
			"  <div class='item' data-value='gr'><i class='gr flag'></i>Greece</div>" +
			"  <div class='item' data-value='gl'><i class='gl flag'></i>Greenland</div>" +
			"  <div class='item' data-value='gd'><i class='gd flag'></i>Grenada</div>" +
			"  <div class='item' data-value='gp'><i class='gp flag'></i>Guadeloupe</div>" +
			"  <div class='item' data-value='gu'><i class='gu flag'></i>Guam</div>" +
			"  <div class='item' data-value='gt'><i class='gt flag'></i>Guatemala</div>" +
			"  <div class='item' data-value='gw'><i class='gw flag'></i>Guinea-Bissau</div>" +
			"  <div class='item' data-value='gn'><i class='gn flag'></i>Guinea</div>" +
			"  <div class='item' data-value='gy'><i class='gy flag'></i>Guyana</div>" +
			"  <div class='item' data-value='ht'><i class='ht flag'></i>Haiti</div>" +
			"  <div class='item' data-value='hm'><i class='hm flag'></i>Heard Island</div>" +
			"  <div class='item' data-value='hn'><i class='hn flag'></i>Honduras</div>" +
			"  <div class='item' data-value='hk'><i class='hk flag'></i>Hong Kong</div>" +
			"  <div class='item' data-value='hu'><i class='hu flag'></i>Hungary</div>" +
			"  <div class='item' data-value='is'><i class='is flag'></i>Iceland</div>" +
			"  <div class='item' data-value='in'><i class='in flag'></i>India</div>" +
			"  <div class='item' data-value='io'><i class='io flag'></i>Indian Ocean Territory</div>" +
			"  <div class='item' data-value='id'><i class='id flag'></i>Indonesia</div>" +
			"  <div class='item' data-value='ir'><i class='ir flag'></i>Iran</div>" +
			"  <div class='item' data-value='iq'><i class='iq flag'></i>Iraq</div>" +
			"  <div class='item' data-value='ie'><i class='ie flag'></i>Ireland</div>" +
			"  <div class='item' data-value='il'><i class='il flag'></i>Israel</div>" +
			"  <div class='item' data-value='it'><i class='it flag'></i>Italy</div>" +
			"  <div class='item' data-value='jm'><i class='jm flag'></i>Jamaica</div>" +
			"  <div class='item' data-value='jp'><i class='jp flag'></i>Japan</div>" +
			"  <div class='item' data-value='jo'><i class='jo flag'></i>Jordan</div>" +
			"  <div class='item' data-value='kz'><i class='kz flag'></i>Kazakhstan</div>" +
			"  <div class='item' data-value='ke'><i class='ke flag'></i>Kenya</div>" +
			"  <div class='item' data-value='ki'><i class='ki flag'></i>Kiribati</div>" +
			"  <div class='item' data-value='kw'><i class='kw flag'></i>Kuwait</div>" +
			"  <div class='item' data-value='kg'><i class='kg flag'></i>Kyrgyzstan</div>" +
			"  <div class='item' data-value='la'><i class='la flag'></i>Laos</div>" +
			"  <div class='item' data-value='lv'><i class='lv flag'></i>Latvia</div>" +
			"  <div class='item' data-value='lb'><i class='lb flag'></i>Lebanon</div>" +
			"  <div class='item' data-value='ls'><i class='ls flag'></i>Lesotho</div>" +
			"  <div class='item' data-value='lr'><i class='lr flag'></i>Liberia</div>" +
			"  <div class='item' data-value='ly'><i class='ly flag'></i>Libya</div>" +
			"  <div class='item' data-value='li'><i class='li flag'></i>Liechtenstein</div>" +
			"  <div class='item' data-value='lt'><i class='lt flag'></i>Lithuania</div>" +
			"  <div class='item' data-value='lu'><i class='lu flag'></i>Luxembourg</div>" +
			"  <div class='item' data-value='mo'><i class='mo flag'></i>Macau</div>" +
			"  <div class='item' data-value='mk'><i class='mk flag'></i>Macedonia</div>" +
			"  <div class='item' data-value='mg'><i class='mg flag'></i>Madagascar</div>" +
			"  <div class='item' data-value='mw'><i class='mw flag'></i>Malawi</div>" +
			"  <div class='item' data-value='my'><i class='my flag'></i>Malaysia</div>" +
			"  <div class='item' data-value='mv'><i class='mv flag'></i>Maldives</div>" +
			"  <div class='item' data-value='ml'><i class='ml flag'></i>Mali</div>" +
			"  <div class='item' data-value='mt'><i class='mt flag'></i>Malta</div>" +
			"  <div class='item' data-value='mh'><i class='mh flag'></i>Marshall Islands</div>" +
			"  <div class='item' data-value='mq'><i class='mq flag'></i>Martinique</div>" +
			"  <div class='item' data-value='mr'><i class='mr flag'></i>Mauritania</div>" +
			"  <div class='item' data-value='mu'><i class='mu flag'></i>Mauritius</div>" +
			"  <div class='item' data-value='yt'><i class='yt flag'></i>Mayotte</div>" +
			"  <div class='item' data-value='mx'><i class='mx flag'></i>Mexico</div>" +
			"  <div class='item' data-value='fm'><i class='fm flag'></i>Micronesia</div>" +
			"  <div class='item' data-value='md'><i class='md flag'></i>Moldova</div>" +
			"  <div class='item' data-value='mc'><i class='mc flag'></i>Monaco</div>" +
			"  <div class='item' data-value='mn'><i class='mn flag'></i>Mongolia</div>" +
			"  <div class='item' data-value='me'><i class='me flag'></i>Montenegro</div>" +
			"  <div class='item' data-value='ms'><i class='ms flag'></i>Montserrat</div>" +
			"  <div class='item' data-value='ma'><i class='ma flag'></i>Morocco</div>" +
			"  <div class='item' data-value='mz'><i class='mz flag'></i>Mozambique</div>" +
			"  <div class='item' data-value='na'><i class='na flag'></i>Namibia</div>" +
			"  <div class='item' data-value='nr'><i class='nr flag'></i>Nauru</div>" +
			"  <div class='item' data-value='np'><i class='np flag'></i>Nepal</div>" +
			"  <div class='item' data-value='an'><i class='an flag'></i>Netherlands Antilles</div>" +
			"  <div class='item' data-value='nl'><i class='nl flag'></i>Netherlands</div>" +
			"  <div class='item' data-value='nc'><i class='nc flag'></i>New Caledonia</div>" +
			"  <div class='item' data-value='pg'><i class='pg flag'></i>New Guinea</div>" +
			"  <div class='item' data-value='nz'><i class='nz flag'></i>New Zealand</div>" +
			"  <div class='item' data-value='ni'><i class='ni flag'></i>Nicaragua</div>" +
			"  <div class='item' data-value='ne'><i class='ne flag'></i>Niger</div>" +
			"  <div class='item' data-value='ng'><i class='ng flag'></i>Nigeria</div>" +
			"  <div class='item' data-value='nu'><i class='nu flag'></i>Niue</div>" +
			"  <div class='item' data-value='nf'><i class='nf flag'></i>Norfolk Island</div>" +
			"  <div class='item' data-value='kp'><i class='kp flag'></i>North Korea</div>" +
			"  <div class='item' data-value='mp'><i class='mp flag'></i>Northern Mariana Islands</div>" +
			"  <div class='item' data-value='no'><i class='no flag'></i>Norway</div>" +
			"  <div class='item' data-value='om'><i class='om flag'></i>Oman</div>" +
			"  <div class='item' data-value='pk'><i class='pk flag'></i>Pakistan</div>" +
			"  <div class='item' data-value='pw'><i class='pw flag'></i>Palau</div>" +
			"  <div class='item' data-value='ps'><i class='ps flag'></i>Palestine</div>" +
			"  <div class='item' data-value='pa'><i class='pa flag'></i>Panama</div>" +
			"  <div class='item' data-value='py'><i class='py flag'></i>Paraguay</div>" +
			"  <div class='item' data-value='pe'><i class='pe flag'></i>Peru</div>" +
			"  <div class='item' data-value='ph'><i class='ph flag'></i>Philippines</div>" +
			"  <div class='item' data-value='pn'><i class='pn flag'></i>Pitcairn Islands</div>" +
			"  <div class='item' data-value='pl'><i class='pl flag'></i>Poland</div>" +
			"  <div class='item' data-value='pt'><i class='pt flag'></i>Portugal</div>" +
			"  <div class='item' data-value='pr'><i class='pr flag'></i>Puerto Rico</div>" +
			"  <div class='item' data-value='qa'><i class='qa flag'></i>Qatar</div>" +
			"  <div class='item' data-value='re'><i class='re flag'></i>Reunion</div>" +
			"  <div class='item' data-value='ro'><i class='ro flag'></i>Romania</div>" +
			"  <div class='item' data-value='ru'><i class='ru flag'></i>Russia</div>" +
			"  <div class='item' data-value='rw'><i class='rw flag'></i>Rwanda</div>" +
			"  <div class='item' data-value='sh'><i class='sh flag'></i>Saint Helena</div>" +
			"  <div class='item' data-value='kn'><i class='kn flag'></i>Saint Kitts and Nevis</div>" +
			"  <div class='item' data-value='lc'><i class='lc flag'></i>Saint Lucia</div>" +
			"  <div class='item' data-value='pm'><i class='pm flag'></i>Saint Pierre</div>" +
			"  <div class='item' data-value='vc'><i class='vc flag'></i>Saint Vincent</div>" +
			"  <div class='item' data-value='ws'><i class='ws flag'></i>Samoa</div>" +
			"  <div class='item' data-value='sm'><i class='sm flag'></i>San Marino</div>" +
			"  <div class='item' data-value='gs'><i class='gs flag'></i>Sandwich Islands</div>" +
			"  <div class='item' data-value='st'><i class='st flag'></i>Sao Tome</div>" +
			"  <div class='item' data-value='sa'><i class='sa flag'></i>Saudi Arabia</div>" +
			"  <div class='item' data-value='sn'><i class='sn flag'></i>Senegal</div>" +
			"  <div class='item' data-value='cs'><i class='cs flag'></i>Serbia</div>" +
			"  <div class='item' data-value='rs'><i class='rs flag'></i>Serbia</div>" +
			"  <div class='item' data-value='sc'><i class='sc flag'></i>Seychelles</div>" +
			"  <div class='item' data-value='sl'><i class='sl flag'></i>Sierra Leone</div>" +
			"  <div class='item' data-value='sg'><i class='sg flag'></i>Singapore</div>" +
			"  <div class='item' data-value='sk'><i class='sk flag'></i>Slovakia</div>" +
			"  <div class='item' data-value='si'><i class='si flag'></i>Slovenia</div>" +
			"  <div class='item' data-value='sb'><i class='sb flag'></i>Solomon Islands</div>" +
			"  <div class='item' data-value='so'><i class='so flag'></i>Somalia</div>" +
			"  <div class='item' data-value='za'><i class='za flag'></i>South Africa</div>" +
			"  <div class='item' data-value='kr'><i class='kr flag'></i>South Korea</div>" +
			"  <div class='item' data-value='es'><i class='es flag'></i>Spain</div>" +
			"  <div class='item' data-value='lk'><i class='lk flag'></i>Sri Lanka</div>" +
			"  <div class='item' data-value='sd'><i class='sd flag'></i>Sudan</div>" +
			"  <div class='item' data-value='sr'><i class='sr flag'></i>Suriname</div>" +
			"  <div class='item' data-value='sj'><i class='sj flag'></i>Svalbard</div>" +
			"  <div class='item' data-value='sz'><i class='sz flag'></i>Swaziland</div>" +
			"  <div class='item' data-value='se'><i class='se flag'></i>Sweden</div>" +
			"  <div class='item' data-value='ch'><i class='ch flag'></i>Switzerland</div>" +
			"  <div class='item' data-value='sy'><i class='sy flag'></i>Syria</div>" +
			"  <div class='item' data-value='tw'><i class='tw flag'></i>Taiwan</div>" +
			"  <div class='item' data-value='tj'><i class='tj flag'></i>Tajikistan</div>" +
			"  <div class='item' data-value='tz'><i class='tz flag'></i>Tanzania</div>" +
			"  <div class='item' data-value='th'><i class='th flag'></i>Thailand</div>" +
			"  <div class='item' data-value='tl'><i class='tl flag'></i>Timorleste</div>" +
			"  <div class='item' data-value='tg'><i class='tg flag'></i>Togo</div>" +
			"  <div class='item' data-value='tk'><i class='tk flag'></i>Tokelau</div>" +
			"  <div class='item' data-value='to'><i class='to flag'></i>Tonga</div>" +
			"  <div class='item' data-value='tt'><i class='tt flag'></i>Trinidad</div>" +
			"  <div class='item' data-value='tn'><i class='tn flag'></i>Tunisia</div>" +
			"  <div class='item' data-value='tr'><i class='tr flag'></i>Turkey</div>" +
			"  <div class='item' data-value='tm'><i class='tm flag'></i>Turkmenistan</div>" +
			"  <div class='item' data-value='tv'><i class='tv flag'></i>Tuvalu</div>" +
			"  <div class='item' data-value='ug'><i class='ug flag'></i>Uganda</div>" +
			"  <div class='item' data-value='ua'><i class='ua flag'></i>Ukraine</div>" +
			"  <div class='item' data-value='ae'><i class='ae flag'></i>United Arab Emirates</div>" +
			"  <div class='item' data-value='us'><i class='us flag'></i>United States</div>" +
			"  <div class='item' data-value='uy'><i class='uy flag'></i>Uruguay</div>" +
			"  <div class='item' data-value='um'><i class='um flag'></i>Us Minor Islands</div>" +
			"  <div class='item' data-value='vi'><i class='vi flag'></i>Us Virgin Islands</div>" +
			"  <div class='item' data-value='uz'><i class='uz flag'></i>Uzbekistan</div>" +
			"  <div class='item' data-value='vu'><i class='vu flag'></i>Vanuatu</div>" +
			"  <div class='item' data-value='va'><i class='va flag'></i>Vatican City</div>" +
			"  <div class='item' data-value='ve'><i class='ve flag'></i>Venezuela</div>" +
			"  <div class='item' data-value='vn'><i class='vn flag'></i>Vietnam</div>" +
			"  <div class='item' data-value='wf'><i class='wf flag'></i>Wallis and Futuna</div>" +
			"  <div class='item' data-value='eh'><i class='eh flag'></i>Western Sahara</div>" +
			"  <div class='item' data-value='ye'><i class='ye flag'></i>Yemen</div>" +
			"  <div class='item' data-value='zm'><i class='zm flag'></i>Zambia</div>" +
			"  <div class='item' data-value='zw'><i class='zw flag'></i>Zimbabwe</div>" +
			"</div>" +
			"</div>";

		return country_dropdown;
    }  

    function firstCheckPropertyImages()
    {
        let cons = document.getElementsByClassName("property-image");
        let found = 0;

        for (let i = 1; i < cons.length; i++)
        {
            if ($(cons[i]).find(".property-image-input").val() === "")
            {
                found++;
            }
        }

        if (found === 0)
        {
            let i = 2 ;

            while (getElement("property-image-"+i) != null) {i++;}
            addPropetyImage(i);
        }
    }

    function removePropertyImage(e)
    {
        if (getElement("property-image-"+e) != null)
        {
            // get image name
            var imageName = getElement('gallery-image-name-' + e);

            // can we remove
            if (imageName !== null)
            {
                removeImageFromServer(imageName.value, e);
            }

            // remove image container
            getElement("property-images-con").removeChild(getElement("property-image-"+e));
        }
    }

    function removeImageFromServer(image, index)
    {
        // remove image from storage
        postJson(phpvars.STORAGE_API + 'delete/files/' + image, function(){}, {});

        // remove from gallery
        postJson(phpvars.LISTING_API + '/property/update/' + phpvars.property, function(){},{
            job : 'remove from gallery',
            image : image,
            index : index
        });
    }

    function addPropetyImage(n)
    {
        let con = document.createElement("div");
        con.id = "property-image-"+n;
        con.className = "w3-col l6 m6 s12 property-image";

        con.innerHTML =
            "<div class='' style='position: relative; border: 1px solid #eee;'>" +
            "<button id='close-btn-"+n+"' class='ui circular red icon button' " +
            "style='position: absolute; right: -10px; top: -10px; z-index: 100; display:none;' onclick=\"removePropertyImage('"+n+"')\">" +
            "<i class='times icon'></i></button> " +
            "<div class='w3-card' style=\"height: 200px; " +
            "background-repeat: no-repeat; background-position: center; position: relative;\">" +
            "<img class='propert-images' id='gallery-image-"+n+"' src='"+phpvars.FILES_CDN+"/white-image.png' style='width: 100%;'/>" +
            "<button id='gallery-btn-"+n+"' class='ui circular large blue icon button' style='position: absolute; bottom: -10px; left: -10px;'" +
            " onclick=\"getElement('item-file-"+n+"').click()\">" +
            "<i class='image file icon'></i></button>" +
            "<input class='property-image-file' accept='.jpg,.jpeg,.png,.gif' id='item-file-"+n+"' type='file' style='display: none;' " +
            "onchange=\"processGalleryImage(this, '"+n+"', false, this.value, 'removeOldPicture');\"/>" +
            "<input class='property-image-input' id='gallery-image-name-"+n+"' type='hidden' value=''/>" +
            "</div> " +
            "</div>";

        getElement("property-images-con").appendChild(con);
    }

    function processImage(index)
    {
        // get propert image
        let galleryImage = document.querySelector('#gallery-image-name-' + index);

        // add new row
        if (galleryImage.value.length > 5)
        {
            // add new placeholdeer
            addPropetyImage(index+1);
        }

        // update database
        postJson(phpvars.LISTING_API + '/property/update/' + phpvars.property, function(){}, {
            job : 'change gallery image',
            image : galleryImage.value,
            index : index
        });
    }

    function removeOldPicture(newPicture, oldPicture, index)
    {
        if (oldPicture.length > 3) removeImageFromServer(oldPicture, index);

        // load process image
        processImage(index);
    }

    var propertyInfo = {};

    function savePropertySettings(e)
    {
        var property = {};

        property.type = propertyInfo.Type;
        property.name = propertyInfo.Name;
        property.description = propertyInfo.Description;

        property.country = $("#country").dropdown('get value');
        property.city = $("#property-city").dropdown('get value');
        property.cityname = $("#property-city").dropdown('get text');

        property.state = $("#property-state").dropdown('get value');
        property.statename = $("#property-state").dropdown('get text');

        property.phone1 = $("#property-phone").val();
        property.phone2 = $("#property-phone1").val();
        property.email1 = $("#property-email").val();
        property.email2 = $("#property-email1").val();
        property.address = $("#property-address").val();
        property.contact_phone = getAllPhoneContacts();
        property.contact_email = getAllEmailContacts();
        property.facilities_json = getAllFacilities();
        property.late_checkout_rules = getAllCheckoutRules();
        property.nearby_attractions = getAllAttractions();
        property.extra_child_fee = $('#extra-child-amount').val();
        property.payment_methods = getPaymentMethods();
        property.checkin_start = $('#checkin_start').val();
        property.checkin_end = $('#checkin_end').val();
        property.checkout_start = $('#checkout_start').val();
        property.checkout_end = $('#checkout_end').val();

        // can continue ??
        var continueProcess = true;

        // build errors
        var errors = {
            type : 'Enter property type',
            name : 'Enter property name',
            description : 'Enter property description',
            country : 'Enter property country',
            // city : 'Enter property city',
            // cityname : 'Enter property city',
            state : 'Enter property state',
            statename : 'Enter property state',
            phone1 : 'Enter property contact phone',
            email1 : 'Enter property contact email',
            address : 'Enter property address',
        };

        // no city ?
        for (var x in property)
        {
            if (property[x] == '' && typeof errors[x] != 'undefined')
            {
                continueProcess = false;
                errorButton({btn: 'save-button', msg: errors[x]});
                break;
            }
        }

        // all good ?
        if (continueProcess)
        {
            // load facilities
            let facilities = document.getElementsByClassName("v-feature");
            var checks = [];

            for (let i = 0; i < facilities.length; i++)
            {
                if (facilities[i].checked)
                {
                    checks.push(facilities[i].id);
                }
            }

            property.facilities = checks;

            // load property rules
            var checks = [];
            let rules = document.getElementsByClassName("rules-check");

            for (let i = 0; i < rules.length; i++)
            {
                if (rules[i].checked)
                {
                    checks.push(rules[i]);
                }
            }
            
            property.checkinH = Number($("#checkin-h").val());
            property.checkinM = Number($("#checkin-m").val());
            property.checkoutH = Number($("#checkout-h").val());
            property.checkoutM = Number($("#checkin-m").val());

            property.cashonly = $("#cash-only").prop("checked");
            property.formType = $("#detailed-form").prop("checked") ? "detailed" : "simple";
            property.cancellation = $("#cancellation").prop("checked");
            property.canceldays = Number($("#cancel-days").val());
            property.cancelhour = Number($("#cancel-hours").val());
            property.damagedeposit = $("#damage-deposite").prop("checked");
            property.damageamount = Number($("#damage-amount").val());
            property.earlycheckout = $("#early-checkout").prop("checked");
            property.partialpayment = $("#partial-payment").prop("checked");
            property.partialpayamount = Number($("#partial-pay-amount").val());
            property.percialpaypercent = $("#partial-pay-percent").prop("checked");
            property.childpolicy = $("#child-policy").val();

            // process
            loadingButton({btn:"save-button"});

            // send 
            postJson(phpvars.CLIENT_API + "/listproperty", function (data, status) {
                loadingButton({btn:"save-button", loading:false});
                if (status === "done")
                {
                    let d = JSON.parse(data);

                    if (d.status === "success")
                    {
                        var prevHtml = document.getElementById('save-button').innerHTML;
                        $("#save-button").html("<i class='check icon'></i> " + d.message);
                        $("#save-button").addClass("success");
                        $("#save-button").addClass("disabled");
                        
                        setTimeout(function () {
                            $("#save-button").html(prevHtml);
                            $("#save-button").removeClass("success");
                            $("#save-button").removeClass("disabled");
                        }, 3000);
                    }
                    else
                    {
                        errorButton({btn:"save-button", msg:d.message});
                    }
                }
                else
                {
                    errorButton({btn:"save-button", msg:"Connection error"});
                }
            }, property);
        }
    }