
function DrawNewRoomCategory()
{
    $('body').css("background-color", "white");

    $("#min-menue-con").html(
        "<div>" +
        "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
        "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
        "          <i class='bed icon'></i> Rooms" +
        "       </div>" +
        "       <a href='#rooms' class='item'>" +
        "           Categories" +
        "       </a>" +
        "       <a href='#rooms/number' class='item'>" +
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

    $("#menu").html(

        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/roomservice.png' style='width: 40px; margin-top: 0px;'> Room/Hall Category" +
        "</h3>" +
        "</div>" +

        "<div class='pad-2'>" +
        "<a href='#rooms'><button class='ui blue fluid button'>Category List</button></a><br/> " +
        "</div> ");


    _page({add:"", clear:true});

    _page({
        add: "<br/> " +
            "<div class='l-width-8 widget wix-textbox curve l-pad-2 s-pad-1' style='margin: auto; border: 3px solid rgb(230,230,230); margin-bottom: 50px;'>" +

            "<div class='' style='margin: auto;'>" +

            "<input id='roomcatid' type='hidden' value=''/>" +

            "<div class='w3-row'>" +
            "<div class='w3-col l3 m6 s12'>" +
            "<div class='pad-1'>" +
            "<div class='w3-card' style=\"height: 200px; " +
            "background-image: url('"+phpvars.CDN_URL+"/images/imageplaceholder.png'); " +
            "background-repeat: no-repeat; background-position: center; position: relative;\">" +
            "<img id='room-img-1' style='width: 100%;'/>" +
            "<button id='room-btn-1' class='ui circular compact sleak blue-back button' style='position:absolute; bottom:-15px; right:0px;'" +
            " onclick=\"getElement('room-file-1').click()\">" +
            "<i class='plus icon'></i>Add Image</button>" +
            "<input id='room-file-1' type='file' style='display: none;' onchange='processRoomImage(this, 1)'/>" +
            "<input id='room-file-name-1' type='hidden' value=''/>" +
            "</div> " +
            "</div>" +
            "</div>" +
            "<div class='w3-col l3 m6 s12'>" +
            "<div class='pad-1'>" +
            "<div class='w3-card' style=\"height: 200px; " +
            "background-image: url('"+phpvars.CDN_URL+"/images/imageplaceholder.png'); " +
            "background-repeat: no-repeat; background-position: center; position: relative;\">" +
            "<img id='room-img-2' style='width: 100%;'/>" +
            "<button id='room-btn-2' class='ui circular compact sleak blue-back button' style='position:absolute; bottom:-15px; right:0px;'" +
            " onclick=\"getElement('room-file-2').click()\">" +
            "<i class='plus icon'></i>Add Image</button>" +
            "<input id='room-file-2' type='file' style='display: none;' onchange='processRoomImage(this, 2)'/> " +
            "<input id='room-file-name-2' type='hidden' value=''/>" +
            "</div> " +
            "</div>" +
            "</div>" +
            "<div class='w3-col l3 m6 s12'>" +
            "<div class='pad-1'>" +
            "<div class='w3-card' style=\"height: 200px; " +
            "background-image: url('"+phpvars.CDN_URL+"/images/imageplaceholder.png'); " +
            "background-repeat: no-repeat; background-position: center; position: relative;\">" +
            "<img id='room-img-3' style='width: 100%;'/>" +
            "<button  id='room-btn-3' class='ui circular compact sleak blue-back button' style='position:absolute; bottom:-15px; right:0px;'" +
            " onclick=\"getElement('room-file-3').click()\">" +
            "<i class='plus icon'></i>Add Image</button>" +
            "<input id='room-file-3' type='file' style='display: none;' onchange='processRoomImage(this, 3)'/> " +
            "<input id='room-file-name-3' type='hidden' value=''/>" +
            "</div> " +
            "</div>" +
            "</div>" +
            "<div class='w3-col l3 m6 s12'>" +
            "<div class='pad-1'>" +
            "<div class='w3-card' style=\"height: 200px; " +
            "background-image: url('"+phpvars.CDN_URL+"/images/imageplaceholder.png'); " +
            "background-repeat: no-repeat; background-position: center; position: relative;\">" +
            "<img id='room-img-4' style='width: 100%;'/>" +
            "<button id='room-btn-4' class='ui circular compact sleak blue-back button' style='position:absolute; bottom:-15px; right:0px;'" +
            " onclick=\"getElement('room-file-4').click()\">" +
            "<i class='plus icon'></i>Add Image</button>" +
            "<input id='room-file-4' type='file' style='display: none;' onchange='processRoomImage(this, 4)'/> " +
            "<input id='room-file-name-4' type='hidden' value=''/>" +
            "</div> " +
            "</div>" +
            "</div>" +
            "</div>" +


            "</div>" +



            "<div class='l-width-8' style='margin: auto;'>" +

            "<br/><br/><br/>" +

            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Name</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui fluid input'><input id='room-name' class='wix-textbox' type='text'/></div></div>" +
            "</div><br/>" +

            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Price</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui fluid labeled input'><label class='ui label'>" + $('#currency-symbol').val() + "</label>" +
            "<input id='room-price' class='wix-textbox' type='text'/></div></div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Compare Price at</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui fluid labeled input'><label class='ui label'>" + $('#currency-symbol').val() + "</label>" +
            "<input id='room-price-compare' class='wix-textbox' type='text'/></div></div>" +
            "</div><br/>" +



            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Occupancy</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui fluid labeled input'><label class='ui sleak label'>Base</label>" +
            "<input id='base-occupancy' class='wix-textbox' type='text' style='border-radius: 0px;'/>" +
            "<label class='ui label' style='border-radius: 0px;'>Max</label>" +
            "<input id='max-occupancy' class='wix-textbox' type='text' style='border-radius: 0px 4px 4px 0px;'/>" +
            "</div></div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Price per extra person</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui fluid labeled input'><label class='ui label'>" + $('#currency-symbol').val() + "</label>" +
            "<input id='extra-person-price' class='wix-textbox' type='text'/></div></div>" +
            "</div><br/>" +


            "<div>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Special services</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><select id='special-services' multiple class='ui wix-select fluid search dropdown'></select></div>" +
            "</div><br/>" +



            "<div>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Smoking</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><select id='smoking-policy' class='ui wix-select fluid dropdown'>" +
            "<option value='false'>Non-smoking</option>" +
            "<option value='true'>Smoking</option>" +
            "</select></div>" +
            "</div><br/>" +



            "<div>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Children</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><select id='children-policy' class='ui wix-select fluid dropdown'>" +
            "<option value='true'>Allowed</option>" +
            "<option value='false'>Not - Allowed</option>" +
            "</select></div>" +
            "</div><br/>" +



            "<div>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Pets</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><select id='pet-policy' class='ui wix-select fluid dropdown'>" +
            "<option value='false'>Not - Allowed</option>" +
            "<option value='true'>Allowed</option>" +
            "</select></div>" +
            "</div><br/>" +



            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Room Description</label></div></div>" +
            "<div class='w3-col l8 m3 s12 ui form'><div class='field'><textarea id='room-description' class='wix-textbox' rows='3'></textarea></div></div>" +
            "</div><br/>" +



            "<div class='w3-row' style='display:none;'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Room Features</label></div></div>" +
            "<div id='features-list-con' class='w3-col l8 m3 s12'>" +
            "<div id='features-list-0' class='ui fluid input'>" +
            "<input id='features-list-0-txt' class='wix-textbox' type='text' onkeyup='checkFeatureList()'/>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Promotional Text</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i class='gift green icon'></i><input id='room-promo-text' class='wix-textbox' type='text'/></div></div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Sort</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui fluid input'><input id='room-cat-sort' class='wix-textbox' type='number' value='0'/></div></div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
            "<div class='w3-col l8 m3 s12'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='show-promo-text' type='checkbox'/><span>Show promotional text</span></label></div>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
            "<div class='w3-col l8 m3 s12'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='show-on-site' type='checkbox' checked/><span>Show on website</span></label></div>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
            "<div class='w3-col l8 m3 s12'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l12 m12 s12'><label><input id='reservable' type='checkbox' checked/><span>Enable reservation</span></label></div>" +
            "<div class='w3-col l12 m12 s12' style='margin-top:20px'><label><input id='hall_type' type='checkbox'/><span>Category is a hall</span></label></div>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='align-r'>" +
            "<button id='room-cat-save-btn' class='ui blue sleak compact button' onclick='saveRoomCategory()'>Save Category</button>" +
            "</div><br/>" +


            "<div>" +
            "</div></div>", class: 'l-margin-t-4'
    });

    list({ con: getElement("staff-list"), job: 'list staff', all: true });
    list({ con: getElement("role-list"), job: 'list role', all: true });

    $(".ui.dropdown").dropdown();

    let arg = getArg();

    if (arg != null) {
        loadEditRoomCatData(arg);
    }
}

function DrawRoomCategories()
{
    //_page({ add: pageTop({ icon: "shower", text: "Rooms Category" }), clear: true });

    _page({add:"", clear:true});

    let buttons = document.createElement("div");
    buttons.className = "pad-2 align-r";
    buttons.style.paddingBottom = "0px";
    buttons.innerHTML = "<div class='ui labeled button' tabindex='0'" +
        " onclick=\"location.hash='#new-room-category'\">" +
        "<div class='ui small blue-back sleak button'><i class='plus icon'></i>New category</div>" +
        "<a id='total_count_btn' class='ui basic blue-text left pointing label'>0</a></div> ";
    // _page({ add: buttons });

    _page({
        add: DrawTable(["Image", "Name", "Price", "Rooms/Halls", "On site", "sort", "status", "Action"],
            {
                Padded: true, GroupAction: [{ Text: "DIVIDER" },
                    { Text: "Delete", Method: "ConfirmGroupRoomcategoryDelete" }]
            }).outerHTML, class: "l-pad-2"
    });

    $(".ui.dropdown").dropdown();

    populateRoomcategory();
}

function DrawRooms()
{
    _page({ add: "", clear: true });

    let buttons = document.createElement("div");
    buttons.className = "pad-2 align-r";
    buttons.style.paddingBottom = "0px";
    buttons.innerHTML = "<div class='ui labeled button' tabindex='0'" +
        " onclick=\"location.hash='#new-room'\">" +
        "<div class='ui small blue-back sleak button'><i class='plus icon'></i>Add Rooms</div>" +
        "<a id='total_count_btn' class='ui basic blue-text left pointing label'>0</a></div> ";
    //_page({ add: buttons });

    _page({
        add: DrawTable(["Number", "Category", "Features", "Status", "Action"],
            {
                Celled: true, Padded: true, GroupAction: [{ Text: "DIVIDER" },
                    { Text: "Delete Rooms", Method: "ConfirmGroupRoomDelete" }]
            }).outerHTML, class: "l-pad-2"
    });

    $(".ui.dropdown").dropdown();

    populateRoom();
}

function DrawNewRoom()
{
    $('body').css("background-color", "white");

    $("#min-menue-con").html(
        "<div>" +
        "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
        "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
        "          <i class='bed icon'></i> Rooms" +
        "       </div>" +
        "       <a href='#rooms' class='item'>" +
        "           Categories" +
        "       </a>" +
        "       <a href='#rooms/number' class='item'>" +
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


        $("#menu").html(

            "<div class='l-pad-2 s-pad-1'>" +
            "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
            "<img src='"+phpvars.CDN_URL+"/images/bed_1.png' style='width: 40px; margin-top: 0px;'> Rooms" +
            "</h3>" +
            "</div>" +

            "<div class='pad-2'>" +
            "<a href='#rooms/number'><button class='ui blue fluid button'>Room list</button></a><br/> " +
            "</div> ");

    _page({ add: "", clear: true });

    _page({
        add: "<br/>" +
            "<div class='l-width-8 widget wix-textbox curve l-pad-2 s-pad-1' style='margin: auto; border: 3px solid rgb(230,230,230); margin-bottom: 50px;'>" +

            "<input id='roomid' type='hidden' value=''/>" +


            "<div class='l-width-8' style='margin: auto;'>" +

            "<br/><br/><br/>" +

            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Room Number</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui fluid input'><input id='room-nun' class='wix-textbox' type='text'/></div></div>" +
            "</div><br/>" +


            "<div>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Room Category</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><select id='room-category-list' class='ui wix-select fluid dropdown'><option value=''>Select Category</option></select></div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Room Features</label></div></div>" +
            "<div id='features-list-con' class='w3-col l8 m3 s12'>" +
            "<div id='features-list-0' class='ui fluid input'>" +
            "<input id='features-list-0-txt' class='wix-textbox' type='text' onkeyup='checkFeatureList()'/>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
            "<div class='w3-col l8 m3 s12'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><div class='switch'><label><input id='room-status' type='checkbox' checked/><span class='lever'></span></label>Status</div></div>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='align-r'>" +
            "<button id='room-save-btn' class='ui blue sleak compact button' onclick='saveRoom()'>Save Room</button>" +
            "</div><br/>" +


            "<div>" +
            "</div>", class: 'l-margin-t-4'
    });

    list({ con: getElement("room-category-list"), job: 'list room category', all: true });

    $(".ui.dropdown").dropdown();

    let arg = getArg();

    if (arg != null) {
        loadEditRoomData(arg);
    }
}

function DrawCoupon()
{
    $('body').css("background-color", "white");

    $("#min-menue-con").html(
        "<div>" +
        "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
        "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
        "           <i class='percent icon'></i> &nbsp;Coupon & discounts" +
        "       </div>" +
        "       <a href='#coupon' class='item active'>" +
        "           Coupon" +
        "       </a>" +
        "       <a href='#discount' class='item'>" +
        "           Discount" +
        "       </a>" +
        "   </div>" +
        "</div>");

    $("#property-page").html(
        "<div>" +
        "<div id='menu'></div>" +
        "<div id='page'></div>" +
        "</div>");


    $("#menu").html(
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/discount.png' style='width: 50px; margin-top: 0px;'> Coupons" +
        "</h3>" +
        "</div>" +

        "<div class='pad-2'>" +
        "<a href='#coupon'><button class='ui blue fluid button'>Coupon List</button></a><br/> " +
        "<a href='#new-coupon'><button class='ui blue fluid button'>Create new coupon</button></a>" +
        "</div> ");

    _page({ add: "", clear: true });

    _page({
        add: "<div class='ui pointing menu'>" +
            "  <a id='all-coupon-tab' class='active coupon-tab item' onclick='switchCouponTabs(this)'>" +
            "    All<label id='all-coupon-label' class='ui label sleak blue-back'>0</label>" +
            "  </a>" +
            "  <a id='used-coupon-tab' class='item coupon-tab' onclick='switchCouponTabs(this)'>" +
            "    Used<label id='used-coupon-label' class='ui label sleak blue-back'>0</label>" +
            "  </a>" +
            "  <a id='unused-coupon-tab' class='item coupon-tab' onclick='switchCouponTabs(this)'>" +
            "    Unused<label id='unused-coupon-label' class='ui label sleak blue-back'>0</label>" +
            "  </a>" +
            "  <a id='expired-coupon-tab' class='item coupon-tab' onclick='switchCouponTabs(this)'>" +
            "    Expired<label id='expired-coupon-label' class='ui label sleak blue-back'>0</label>" +
            "  </a>" +
            "  <div class='right menu'>" +
            "    <div class='item'>" +
            "      <div class='ui transparent icon input'>" +
            "        <input id='search-txt' type='text' placeholder='Search...' onkeyup='if(event.keyCode==13){populateCoupon();}'>" +
            "        <i class='search link icon'></i>" +
            "      </div>" +
            "    </div>" +
            "  </div>" +
            "</div>", class: "l-pad-2 s-pad-1"
    });

    _page({ add: DrawTable(["Name", "Code", "Value", "Coverage", "Status", "Action"], {GroupAction:[{Method:"ConfirmGroupCouponDelete",Text:"Delete coupons"}]}).outerHTML, class: "l-pad-2 s-pad-1" });
    $(".ui.dropdown").dropdown();
    populateCoupon();
}

function DrawNewCoupon()
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
        "       <a href='#discount' class='item'>" +
        "           Discount" +
        "       </a>" +
        "   </div>" +
        "</div>");

    $("#property-page").html(
        "<div>" +
        "<div id='menu'></div>" +
        "<div id='page'></div>" +
        "</div>");

        $("#menu").html(
            "<div class='l-pad-2 s-pad-1'>" +
            "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
            "<img src='"+phpvars.CDN_URL+"/images/discount.png' style='width: 50px; margin-top: 0px;'> Coupons" +
            "</h3>" +
            "</div>" +

            "<div class='pad-2'>" +
            "<a href='#coupon'><button class='ui blue fluid button'>Coupon List</button></a><br/> " +
            "</div> ");


    _page({ add: "", clear: true });

    let page = "<br/>" +
        "<div class='l-width-8 widget wix-textbox curve l-pad-2 s-pad-1' style='margin: auto; border: 3px solid rgb(230,230,230); margin-bottom: 50px;'>" +
        "<div class='l-width-8' style='margin: auto;'>" +

        "<input id='couponid' type='hidden' value=''/>" +

        "<br/><br/><br/>" +

        "<div class='w3-row margin-t-1'>" +
        "<div class='w3-col l4 m3 s12'><span style='color: transparent;'>.</span></div>" +
        "<div class='w3-col l8 m3 s12'><h6 class='sleak-b' style='color: dimgray;'>Coverage</h6></div>" +
        "</div><br/>" +


        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>What's covered</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<input id='coupon-main-select' type='hidden' value='Lodging'/> " +
        "<!--" +
        "<select  class='ui fluid  dropdown wix-select' multiple onchange='coverageChanged(this)'>" +
        "<option>Lodging</option>" +
        "<option>Restaurant</option>" +
        "<option>Bar</option>" +
        "<option>Bakery</option>" +
        "<option>Laundry</option>" +
        "<option>Pool</option>" +
        "<option>Extra services</option>" +
        "</select>" +
        "-->" +
        "</div>" +
        "</div>" +


        "<div id='lodging-select-con' class='w3-row' style='margin-top: 4px; display: block;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Lodging</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='lodging-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='kitchen-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Kitchen</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='kitchen-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='bar-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Bar</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='bar-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='bakery-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Bakery</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='bakery-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='laundry-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Laundry</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='laundry-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='pool-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Pool</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='pool-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='services-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Extra services</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='services-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div><br/><br/>" +




        "<div class='w3-row margin-t-1'>" +
        "<div class='w3-col l4 m3 s12'><span style='color: transparent;'>.</span></div>" +
        "<div class='w3-col l8 m3 s12'><h6 class='sleak-b' style='color: dimgray;'>General</h6></div>" +
        "</div><br/>" +

        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Name</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i class='ticket circle green icon'></i><input id='coupon-name' class='wix-textbox' type='text'/></div></div>" +
        "</div><br/>" +

        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Code</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><div class='ui fluid action input'>" +
        "<input id='coupon-code' class='wix-textbox' type='text'/>" +
        "<button id='coupon-gen-btn' class='ui blue icon button' onclick='generateCoupon()'>" +
        "<i class='hand pointer icon'></i>" +
        "</button>" +
        "</div></div>" +
        "</div><br/>" +



        "<div class='w3-row margin-t-1'>" +
        "<div class='w3-col l4 m3 s12'><span style='color: transparent;'>.</span></div>" +
        "<div class='w3-col l8 m3 s12'><h6 class='sleak-b' style='color: dimgray;'>Value</h6></div>" +
        "</div><br/>" +


        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label id='per-cash-label' style='color: gray; font-family: nunitoregular;'>Amount</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i id='per-cash-icon' class='money green icon'></i><input id='coupon-amount' class='wix-textbox' type='text'/></div></div>" +
        "</div><br/>" +


        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><label><input id='bypercentage' class='filled-in' type='checkbox' onchange='percentageSwitch()'/><span>By Percentage</span></label></div>" +
        "</div><br/><br/>" +




        "<div class='w3-row margin-t-1'>" +
        "<div class='w3-col l4 m3 s12'><span style='color: transparent;'>.</span></div>" +
        "<div class='w3-col l8 m3 s12'><h6 class='sleak-b' style='color: dimgray;'>Usage</h6></div>" +
        "</div><br/>" +


        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Number of use</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i class='green ticket icon'></i><input id='use-count' class='wix-textbox' type='number' value='1'/></div></div>" +
        "</div><br/>" +


        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Expiriy date</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i class='calendar green icon'></i><input id='coupon-expiry-date' data-toggle='datepicker' class='wix-textbox' type=''/></div></div>" +
        "</div><br/>" +



        "<br/><br/>" +

        "<div class='align-r'>" +
        "<button id='save-coupon-btn' class='ui blue sleak button' onclick='saveCoupon()'>Create coupon</button>" +
        "</div><br/>" +

        "<div>" +
        "</div>";

    _page({ class: 'l-margin-t-4', add: page });

    $(".ui.dropdown").dropdown();

    $('[data-toggle="datepicker"]').datepicker();

    let arg = getArg();
    if(arg != null)
    {
        loadEditCoupon(arg);
    }
    coverageChanged(getElement("coupon-main-select"));
}

function DrawCouponDetails()
{
    _page({ add: pageTop({ icon: "ticket", text: "Coupon details" }), clear: true });
}

function DrawDiscount()
{
    _page({clear: true });

    _page({
        add: div({add:
                "<div class='w3-col l6 m6 s12'>" +
                DrawSearch({method:"populateDiscount"}).outerHTML +
                "</div>" +
                "<div class='w3-col l6 m6 ss12 align-r'>" +
                "</div>",
            class: "w3-row l-pad-2 s-pad-1"
        })
    });

    _page({ add: DrawTable(["Name", "Value", "Coverage", "Application method", "Status", "Action"],
            {GroupAction:[{Method:"ConfirmGroupDiscountDelete", Text:"Delete"}]}).outerHTML, class: "l-pad-2 s-pad-1" });

    $(".ui.dropdown").dropdown();
    populateDiscount();
}

function DrawNewDiscount()
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
        "       <a href='#discount' class='item'>" +
        "           Discount" +
        "       </a>" +
        "   </div>" +
        "</div>");

    $("#property-page").html(
        "<div>" +
        "<div id='menu'></div>" +
        "<div id='page'></div>" +
        "</div>");


    $("#menu").html(
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/percent.png' style='width: 40px; margin-top: 0px;'> Discount" +
        "</h3>" +
        "</div>" +

        "<div class='pad-2'>" +
        "<a href='#discount'><button class='ui blue fluid button'>Discount list</button></a><br/> " +
        "</div> ");

    _page({clear: true });


    let days = "";
    for(let i = 0; i < 31; i++)
    {
        days += "<option value='"+(i + 1)+"'>"+(i + 1)+"</option>";
    }


    let page = "<br/>" +
        "<div class='l-width-8 widget wix-textbox curve l-pad-2 s-pad-1' style='margin: auto; border: 3px solid rgb(230,230,230); margin-bottom: 50px;'>" +
        "<div class='l-width-8' style='margin: auto;'>" +

        "<input id='discountid' type='hidden' value=''/>" +
        "<input id='discountstatus' type='hidden' value='true'/>" +

        "<br/><br/><br/>" +


        "<div class='w3-row margin-t-1'>" +
        "<div class='w3-col l4 m3 s12'><span style='color: transparent;'>.</span></div>" +
        "<div class='w3-col l8 m3 s12'><h6 class='sleak-b' style='color: dimgray;'>Coverage</h6></div>" +
        "</div><br/>" +

        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><!--<label style='color: gray; font-family: nunitoregular;'>What's covered</label>--></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<input id='discount-main-select' type='hidden' value='Lodging'/>" +
        "<!--" +
        "<select  class='ui fluid  dropdown wix-select' onchange='discountCoverageChanged(this)'>" +
        "<option>Lodging</option>" +
        "<option>Restaurant</option>" +
        "<option>Bar</option>" +
        "<option>Bakery</option>" +
        "<option>Laundry</option>" +
        "<option>Pool</option>" +
        "<option>Extra services</option>" +
        "</select>" +
        "-->" +
        "</div>" +
        "</div>" +


        "<div id='lodging-select-con' class='w3-row' style='margin-top: 4px;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Covered rooms</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='lodging-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='kitchen-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Kitchen</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='kitchen-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='bar-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Bar</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='bar-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='bakery-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Bakery</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='bakery-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='laundry-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Laundry</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='laundry-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='pool-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Pool</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='pool-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div>" +


        "<div id='services-select-con' class='w3-row' style='margin-top: 4px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'>" +
        "<label style='color: gray; font-family: nunitoregular;'>Extra services</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='services-select' class='ui fluid dropdown wix-select' multiple></select>" +
        "</div>" +
        "</div><br/>" +



        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l6 m6 s6'>" +
        "<div class=''>" +
        "<label><input id='manual-discount' class='with-gap' type='radio' name='auto-discount' checked onchange='manualDiscountSelected(this)'/><span>Apply Manually</span></label>" +
        "</div>" +
        "</div>" +
        "<div class='w3-col l6 m6 s6'>" +
        "<div class=''>" +
        "<label><input id='auto-discount' class='with-gap' type='radio' name='auto-discount' onchange='autoDiscountSelected(this)'/><span>Apply Automatically</span></label>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div><br/>" +



        "<div id='auto-discount-list' class='w3-row' style='margin-bottom: 50px; display: none;'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Apply discount if</label></div></div>" +
        "<div class='w3-col l8 m3 s12'>" +
        "<select id='auto-discount-sel' class='ui fluid  dropdown wix-select' onchange='discountMeasured(this)'>" +
        "<option value='is-staff'>Customer is a staff</option>" +
        "<option value='former-booking-count'>Formerly booked up to</option>" +
        "<option value='online-order'>Reservation is made online</option>" +
        "<option value='offline-order'>Reservation is made at the Front-desk</option>" +
        "<option value='periodic'>Period is</option>" +
        "<option value='time-of-day'>Time of checking in is</option>" +
        "<option value='days-count'>Number of days booked is</option>" +
        "<option value='room-count'>Number of rooms booked is</option>"+
        "<option value='total-amount'>Total amount is</option>" +
        "<option value='payment-mode'>Payment mode is</option>" +
        "</select>" +

        "<div style='margin-top: 7px;'>" +


        "<div class='option-value-con' id='time-period-con' style='display: none;'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l9 m10 s12'>" +
        "<div class='ui fluid action labeled input'>" +
        "<label class='ui sleak label'>From</label>" +
        "<select id='start-hour' class='ui wix-select compact selection dropdown'>" +
        "<option>01</option>" +
        "<option>02</option>" +
        "<option>03</option>" +
        "<option>04</option>" +
        "<option>05</option>" +
        "<option>06</option>" +
        "<option>07</option>" +
        "<option>08</option>" +
        "<option>09</option>" +
        "<option>10</option>" +
        "<option>11</option>" +
        "<option>12</option>" +
        "</select>" +
        "<label class='ui label' style='border-radius: 0px;'>:</label>" +
        "<input id='start-min' class='wix-textbox' type='text' value='00' style='border-radius: 0px;'/>" +
        "<select id='start-gmt' class='ui wix-select compact selection dropdown'>" +
        "<option>am</option>" +
        "<option>pm</option>" +
        "</select>" +
        "</div>" +
        "</div>" +
        "<div class='w3-col l9 m10 s12'>" +
        "<div class='ui fluid action labeled input' style='margin-top: 3px;'>" +
        "<label class='ui sleak label'>to</label>" +
        "<select id='stop-hour' class='ui wix-select compact selection dropdown'>" +
        "<option>01</option>" +
        "<option>02</option>" +
        "<option>03</option>" +
        "<option>04</option>" +
        "<option>05</option>" +
        "<option>06</option>" +
        "<option>07</option>" +
        "<option>08</option>" +
        "<option>09</option>" +
        "<option>10</option>" +
        "<option>11</option>" +
        "<option>12</option>" +
        "</select>" +
        "<label class='ui label' style='border-radius: 0px;'>:</label>" +
        "<input id='stop-min' class='wix-textbox' type='text' value='00' style='border-radius: 0px;'/>" +
        "<select id='stop-gmt' class='ui wix-select compact selection dropdown'>" +
        "<option>am</option>" +
        "<option>pm</option>" +
        "</select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +



        "<div class='option-value-con' id='date-period-con' style='display: none;'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l12 m12 s12'>" +
        "<div class='ui fluid action labeled input'>" +
        "<label class='ui sleak label'>From</label>" +
        "<div class='ui transparent icon input' style='padding-left:10px;'>" +
        "  <input id='date-from' type='text' data-toggle='datepicker' " +
        "    placeholder='Date from'>" +
        "  <i id='reservation-cancel-btn' class='blue calendar alternate outline icon' onclick='cancelDate()'></i>" +
        "</div>"+
        // "<select id='start-day' style='display:none' class='ui wix-select compact selection dropdown'>" + days + "</select>" +
        // "<select id='start-month' style='display:none' class='ui wix-select compact selection dropdown'>" +
        // "<option>January</option>" +
        // "<option>February</option>" +
        // "<option>March</option>" +
        // "<option>April</option>" +
        // "<option>May</option>" +
        // "<option>June</option>" +
        // "<option>July</option>" +
        // "<option>August</option>" +
        // "<option>September</option>" +
        // "<option>October</option>" +
        // "<option>November</option>" +
        // "<option>December</option>" +
        // "</select>" +
        "</div>" +
        "</div>" +
        "<div class='w3-col l12 m12 s12'>" +
        "<div class='ui fluid action labeled input' style='margin-top: 3px;'>" +
        "<label class='ui sleak label'>To</label>" +
        "<div class='ui transparent icon input' style='padding-left:10px;'>" +
        "  <input id='date-to' type='text' data-toggle='datepicker' " +
        "    placeholder='Date to'>" +
        "  <i id='reservation-cancel-btn' class='blue calendar alternate outline icon' onclick='cancelDate()'></i>" +
        "</div>"+
        // "<select id='stop-day' style='display:none' class='ui wix-select compact selection dropdown'>" + days + "</select>" +
        // "<select id='stop-month' style='display:none' class='ui wix-select compact selection dropdown'>" +
        // "<option>January</option>" +
        // "<option>February</option>" +
        // "<option>March</option>" +
        // "<option>April</option>" +
        // "<option>May</option>" +
        // "<option>June</option>" +
        // "<option>July</option>" +
        // "<option>August</option>" +
        // "<option>September</option>" +
        // "<option>October</option>" +
        // "<option>November</option>" +
        // "<option>December</option>" +
        // "</select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +


        "<div class='option-value-con' id='amount-con' style='display: none;'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l6 m6 s12'>" +
        "<div class='l-width-xl'>" +
        "<div class='ui fluid left labeled input'>" +
        "<label class='ui sleak label'>From&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-family: Arial;'>"+
        $("#currency-symbol").val()+"</span></label>" +
        "<input id='from-amount' class='wix-textbox' type='number' value='0.00' min='0'/>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='w3-col l6 m6 s12'>" +
        "<div class='ui fluid left labeled input'>" +
        "<label class='ui sleak label'>To&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-family: Arial;'>"+
        $("#currency-symbol").val()+"</span></label>" +
        "<input id='to-amount' class='wix-textbox' type='number' value='0.00' min='0'/>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +


        "<div class='option-value-con' id='quantity-con' style='display: none;'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l6 m6 s12'>" +
        "<div class='l-width-xl'>" +
        "<div class='ui fluid left labeled input'>" +
        "<label class='ui sleak label'>From</label>" +
        "<input id='from-quantity' class='wix-textbox' type='number' value='0' min='0'/>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='w3-col l6 m6 s12'>" +
        "<div class='ui fluid left labeled input'>" +
        "<label class='ui sleak label'>To</label>" +
        "<input id='to-quantity' class='wix-textbox' type='number' value='0' min='0'/>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +

        "<div class='option-value-con' id='payment-mode' style='display: none; margin-top:20px;'>"+
        "<div class='checkbox-list'>"+
        "<label class='checkbox'><input id='online-only' type='checkbox'/><span style=''>" +
        "  Online</span>" +
        "</label><br/>" +
        "<label class='checkbox'><input id='cash-only' type='checkbox'/><span style=''>" +
        "  Cash</span>" +
        "</label><br/>" +
        "<label class='checkbox'><input id='transfer-deposit' type='checkbox'/><span style=''>" +
        "  Transfer/Deposit</span>" +
        "</label><br/>" +
        "<label class='checkbox'><input id='card-pos' type='checkbox'/><span style=''>" +
        "  Card (POS)</span>" +
        "</label><br/>" +
        "</div>" +
        "</div>" + 

        "</div>" +
        "</div>" +
        "</div>" +


        "<div class='w3-row margin-t-1'>" +
        "<div class='w3-col l4 m3 s12'><span style='color: transparent;'>.</span></div>" +
        "<div class='w3-col l8 m3 s12'><h6 class='sleak-b' style='color: dimgray;'>General</h6></div>" +
        "</div><br/>" +

        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Name</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i class='money circle green icon'></i><input id='discount-name' class='wix-textbox' type='text'/></div></div>" +
        "</div><br/>" +



        "<div class='w3-row margin-t-1'>" +
        "<div class='w3-col l4 m3 s12'><span style='color: transparent;'>.</span></div>" +
        "<div class='w3-col l8 m3 s12'><h6 class='sleak-b' style='color: dimgray;'>Value</h6></div>" +
        "</div><br/>" +


        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label id='per-cash-label' style='color: gray; font-family: nunitoregular;'>Amount</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i id='per-cash-icon' class='money green icon'></i><input id='discount-amount' class='wix-textbox' type='text'/></div></div>" +
        "</div><br/>" +


        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><label><input id='bypercentage' class='filled-in' type='checkbox' onchange='discountPercentageSwitch()'/><span>By Percentage</span></label></div>" +
        "</div>" +



        "<div class='w3-row'>" +
        "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
        "<div class='w3-col l8 m3 s12'><label><input id='ontotal' class='filled-in' type='checkbox' /><span>On Total</span></label></div>" +
        "</div><br/><br/>" +

        "<br/><br/>" +

        "<div class='align-r'>" +
        "<button id='save-discount-btn' class='ui blue sleak button' onclick='saveDiscount()'>Save discount</button>" +
        "</div><br/>" +

        "<div>" +
        "</div>";

    _page({ class: 'l-margin-t-4', add: page });

    $(".ui.dropdown").dropdown();

    list({con:getElement("lodging-select"),job:'list room category',all:true});

    $('[data-toggle="datepicker"]').datepicker();

    let arg = getArg();
    if(arg != null)
    {
        loadEditDiscount(arg);
    }
}

function DrawDiscountDetail()
{
    _page({ add: pageTop({ icon: "money", text: "Discount details" }), clear: true });
}

function DrawAvailablitCalendar()
{
    let arg = getArg();

    if(arg == null)
    {
        location.hash = "#rooms";
        ShowModal("Invalid room selected");
    }
    else
    {
        $("#min-menue-con").html(
            "<div>" +
            "   <div class='ui menu' style='border-radius: 0; box-shadow: none;'>" +
            "       <div class='header item'>" +
            "          <i class='bed blue icon'></i> Rooms" +
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
            "<div id='menu' class='' style='border-right: 1px solid lightgray;'>" +
            "<div class='ui fluid placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "</div>" +
            "<div id='page' class='pad-2'>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "<div>" +
            "</div>" +
            "</div>" +
            "</div>");

        $("#property-page").removeClass("ui loading form");

        postJson("hms-admin/worker", function(data, status){
            _page({clear:true});
            $("#menu").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {

                    $("#menu").html(
                        "<div class='pad-t'>" +
                        "<h3 class='blue-text' style='font-weight: normal; font-family: varela_roundregular;'>" +
                        "<img src='"+phpvars.CDN_URL+"/images/calendar.png' style='width: 30px;'/> Scheduled availability" +
                        "</h3></div><hr/> " +
                        "<div id='saved-availability-con'></div>");

                    let content = "";

                    if(d.data.length > 0)
                    {
                        for(let i = 0; i < d.data.length; i++)
                        {
                            let dv = document.createElement("div");
                            dv.className = "pad-t";
                            dv.id = d.data[i].Id+"-con";
                            dv.style.position = "relative";
                            dv.innerHTML =
                                "<button id='"+d.data[i].Id+"-btn' class='ui mini circular red icon button' style='position: absolute; bottom: 40px; right: 10px;'" +
                                "onclick=\"removeAvailability('"+d.data[i].Id+"')\">" +
                                "<i class='times icon'></i>" +
                                "</button> " +
                                "<h6 style='font-family: Lato;'><small>"+d.data[i].Startdate.WeekDay+", "+
                                d.data[i].Startdate.MonthName+"/"+d.data[i].Startdate.Day+"/"+d.data[i].Startdate.Year+"&nbsp;&nbsp;&nbsp;-" +
                                "&nbsp;&nbsp;&nbsp;" +
                                d.data[i].Stopdate.WeekDay+", "+
                                d.data[i].Stopdate.MonthName+"/"+d.data[i].Stopdate.Day+"/"+d.data[i].Stopdate.Year+"</small></h6>" +
                                "<h6 style='font-family: varela_roundregular;'>Available: "+d.data[i].Available+" rooms</h6><hr/>";

                            document.getElementById("saved-availability-con").appendChild(dv);
                        }
                    }
                    else
                    {
                        $("#saved-availability-con").html(
                            "<div class='align-c pad-2'>" +
                            "<h1><i class='calendar outline alternate icon' style='color: whitesmoke'></i></h1>" +
                            "<h6 style='font-family: varela_roundregular; color: silver; font-weight: normal;'>" +
                            "Availability schedule is empty</h6>" +
                            "</div>");
                    }

                    _page({add:"<div class='calendar-con' style='margin-left: 20px;'>" +
                            "<h1 style='font-family: varela_roundregular; font-weight: normal; color: dimgray;'>" +
                            "<i class='bed icon'></i> Room Availability</h1><br/>" +
                            "<h2 style='font-family: varela_roundregular; color: dimgray; font-weight: normal; margin: 0;'>" +
                            "<span style='color: silver;'>Room categoty</span>: "+d.room.Name+"</h2>" +
                            "<h5 style='font-family: varela_roundregular; color: dimgray; font-weight: normal; margin-top: 10px;'>" +
                            "<span style='color: silver;'>Standard room price: </span>: <span style='font-family: Lato;'>&&#8358;</span>"+
                            numFormat(Number(d.room.Baseprice).toFixed(2)) +
                            "</h5><br/>" +
                            "<div class='ui input'><input id='availability-calendar' type=''/></div>" +
                            "<div class='ui input'><input id='availability-calendar-end' type='hidden'/></div><br/>" +
                            "" +
                            "<br/>" +
                            "<input id='category-input' type='hidden' value='"+d.room.Id+"'/> " +
                            "<div class='ui large left labeled input'>" +
                            "<label class='ui sleak label'>Available rooms</label>" +
                            "<input id='availability-value' class='wix-textbox' type='number' value='0'/>" +
                            "</div>" +
                            "<br/><br/>" +
                            "<button id='availability-btn' class='ui blue large sleak button' onclick='saveAvailability()'><i class='save icon'></i> Save</button> " +
                            "</div>"});

                    var picker = new Lightpick({
                        field: document.getElementById('availability-calendar'),
                        singleDate: false,
                        inline:true,
                        numberOfColumns:3,
                        numberOfMonths:3,
                        minDate:new Date(),
                        onSelect: function(start, end){
                            var str = '';
                            str += start ? start.format('MMMM DD YYYY') + ' to ' : '';
                            str += end ? end.format('MMMM DD YYYY') : '...';
                            document.getElementById('availability-calendar-end').value = str;
                        }
                    });
                }
                else
                {
                    location.hash = "#rooms";
                    ShowModal(d.messge);
                }
            }
            else
            {
                location.hash = "#rooms";
                ShowModal("Connection error. Check your connection and try again");
            }
        },{category:arg,job:"getcategoryavailability"});
    }
}

function DrawRatesCalendar()
{
    let arg = getArg();

    if(arg == null)
    {
        location.hash = "#rooms";
        ShowModal("Invalid room selected");
    }
    else
    {
        $("#min-menue-con").html(
            "<div>" +
            "   <div class='ui menu' style='border-radius: 0; box-shadow: none;'>" +
            "       <div class='header item'>" +
            "          <i class='bed blue icon'></i> Rooms" +
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
            "<div id='menu' class='' style='border-right: 1px solid lightgray;'>" +
            "<div class='ui fluid placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "</div>" +
            "<div id='page' class='pad-2'>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "<div>" +
            "</div>" +
            "</div>" +
            "</div>");

        $("#property-page").removeClass("ui loading form");

        postJson("hms-admin/worker", function(data, status){
            _page({clear:true});
            $("#menu").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {

                    $("#menu").html(
                        "<div class='pad-t'>" +
                        "<h3 class='blue-text' style='font-weight: normal; font-family: varela_roundregular;'>" +
                        "<img src='"+phpvars.CDN_URL+"/images/calendar.png' style='width: 30px;'/> Scheduled rates" +
                        "</h3></div><hr/> " +
                        "<div id='saved-rates-con'></div>");

                    let content = "";

                    if(d.data.length > 0)
                    {
                        for(let i = 0; i < d.data.length; i++)
                        {
                            let dv = document.createElement("div");
                            dv.className = "pad-t";
                            dv.id = d.data[i].Id+"-con";
                            dv.style.position = "relative";
                            dv.innerHTML =
                                "<button id='"+d.data[i].Id+"-btn' class='ui mini circular red icon button' style='position: absolute; bottom: 40px; right: 10px;'" +
                                "onclick=\"removeRate('"+d.data[i].Id+"')\">" +
                                "<i class='times icon'></i>" +
                                "</button> " +
                                "<h6 style='font-family: Lato;'><small>"+d.data[i].Startdate.WeekDay+", "+
                                d.data[i].Startdate.MonthName+"/"+d.data[i].Startdate.Day+"/"+d.data[i].Startdate.Year+"&nbsp;&nbsp;&nbsp;-" +
                                "&nbsp;&nbsp;&nbsp;" +
                                d.data[i].Stopdate.WeekDay+", "+
                                d.data[i].Stopdate.MonthName+"/"+d.data[i].Stopdate.Day+"/"+d.data[i].Stopdate.Year+"</small></h6>" +
                                "<h6 style='font-family: varela_roundregular;'>Rate: " +
                                "<span style='font-family: Lato;'>&#8358</span>"+numFormat(Number(d.data[i].Rate).toFixed(2))+"</h6><hr/>";

                            document.getElementById("saved-rates-con").appendChild(dv);
                        }
                    }
                    else
                    {
                        $("#saved-rates-con").html(
                            "<div class='align-c pad-2'>" +
                            "<h1><i class='calendar outline alternate icon' style='color: whitesmoke'></i></h1>" +
                            "<h6 style='font-family: varela_roundregular; color: silver; font-weight: normal;'>" +
                            "No scheduled rates</h6>" +
                            "</div>");
                    }

                    _page({add:"<div class='calendar-con' style='margin-left: 20px;'>" +
                            "<h1 style='font-family: varela_roundregular; font-weight: normal; color: dimgray;'>" +
                            "<i class='usd icon'></i> Room Rates</h1><br/>" +
                            "<h2 style='font-family: varela_roundregular; color: dimgray; font-weight: normal; margin: 0;'>" +
                            "<span style='color: silver;'>Room categoty</span>: "+d.room.Name+"</h2>" +
                            "<h5 style='font-family: varela_roundregular; color: dimgray; font-weight: normal; margin-top: 10px;'>" +
                            "<span style='color: silver;'>Standard room price: </span>: <span style='font-family: Lato;'>&#8358;</span>"+
                            numFormat(Number(d.room.Baseprice).toFixed(2)) +
                            "</h5><br/>" +
                            "<div class='ui input'><input id='availability-calendar' type=''/></div>" +
                            "<div class='ui input'><input id='availability-calendar-end' type='hidden'/></div><br/>" +
                            "" +
                            "<br/>" +
                            "<input id='category-input' type='hidden' value='"+d.room.Id+"'/> " +
                            "<div class='ui large left labeled input'>" +
                            "<label class='ui sleak label'>Room rate:&nbsp;&nbsp;&nbsp; <span style='font-family: Lato;'>&#8358</span></label>" +
                            "<input id='availability-value' class='wix-textbox' type='' value='0.0'/>" +
                            "</div>" +
                            "<br/><br/>" +
                            "<button id='availability-btn' class='ui blue large sleak button' onclick='saveRate()'><i class='save icon'></i> Save</button> " +
                            "</div>"});

                    var picker = new Lightpick({
                        field: document.getElementById('availability-calendar'),
                        singleDate: false,
                        inline:true,
                        numberOfColumns:3,
                        numberOfMonths:3,
                        minDate:new Date(),
                        onSelect: function(start, end){
                            var str = '';
                            str += start ? start.format('MMMM DD YYYY') + ' to ' : '';
                            str += end ? end.format('MMMM DD YYYY') : '...';
                            document.getElementById('availability-calendar-end').value = str;
                        }
                    });
                }
                else
                {
                    location.hash = "#rooms";
                    ShowModal(d.messge);
                }
            }
            else
            {
                location.hash = "#rooms";
                ShowModal("Connection error. Check your connection and try again");
            }
        },{category:arg,job:"getroomrate"});
    }
}

function DrawReservations()
{
    $("#menu").html(
        "<div class='w3-col l12 m12 s12 pad-1'>" +

        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/calendar.png' style='width: 40px; margin-top: 0px;'> Reservations" +
        "</h3>" +
        "</div>" +

        "<div class='w3-row'>" +
        "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
        "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
        "<h6 style='text-align: center;'><i class='green calendar alternate outline inverted circular icon'></i></h6>" +
        "</div>" +
        "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
        "<h6 id='due-count' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>0</h6>" +
        "<h6 class='' style='text-align: right; color: dimgray; font-family: varela_roundregular; margin-right: 10px;'>Due today" +
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
        "<h6 id='abandpned-count' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>0</h6>" +
        "<h6 class='' style='text-align: right; color: dimgray; font-family: varela_roundregular; margin-right: 10px;'>No show" +
        "</h6>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>");


    _page({add:"<div class='ui pointing menu'>" +
            "  <a id='all-reservations' class='active item reserve-tab' onclick='switchReserveTab(this)'>" +
            "     <i class='circle dot blue outline icon'></i>  All" +
            "  </a>" +
            "  <a id='paid-reservations' class='item reserve-tab' onclick='switchReserveTab(this)'>" +
            "     <i class='green check circle icon'></i> Paid" +
            "  </a>" +
            "  <a id='unpaid-reservations' class='item reserve-tab' onclick='switchReserveTab(this)'>" +
            "     <i class='red times circle icon'></i> Unpaid" +
            "  </a>" +
            "  <a id='abandoned-reservation' class='item reserve-tab' onclick='switchReserveTab(this)'>" +
            "     <i class='red calendar alternate outline icon'></i> No show" +
            "  </a>" +
            "    <div class='item'>" +
            "      <div class='ui transparent icon input'>" +
            "        <input id='reservation-due-date' type='text' data-toggle='datepicker' " +
            "             placeholder='Date from' onchange='populateReservations();'>" +
            "        <i id='reservation-cancel-btn' class='blue calendar alternate outline icon' onclick='cancelDate()'></i>" +
            "      </div>" +
            "    </div>" +

            "    <div class='item'>" +
            "      <div class='ui transparent icon input'>" +
            "        <input id='reservation-due-date-range' type='text' data-toggle='datepicker' " +
            "             placeholder='Date to' onchange='populateReservations();'>" +
            "        <i id='reservation-cancel-btn' class='blue calendar alternate outline icon' onclick='cancelDate()'></i>" +
            "      </div>" +
            "    </div>" +

            "  <div class='right menu'>" +
            "    <div class='item'>" +
            "      <div class='ui transparent icon input'>" +
            "        <input id='search-txt' type='text' placeholder='Search...' " +
            "         onkeyup='if(event.keyCode == 13){populateReservations()}'/>" +
            "        <i class='search link icon'></i>" +
            "      </div>" +
            "    </div>" +
            "  </div>" +
            "</div>", class:"l-pad-2 s-pad-1 m-pad-1"});

    _page({add: DrawTable(["Reservation Detail", "Total", "Payment", "Date", "Status", "Action"],
            {
                Celled: true, Padded: true, GroupAction: [{ Text: "Cancel reservations", Method: "ConfGroupOrderDelete" }, { Text: "Export CSV", Method: "exportReservationCSV" }]
            }).outerHTML, class: "l-pad-2"});

    $(".ui.dropdown").dropdown();

    new Lightpick({
        field: document.getElementById('reservation-due-date'),
        singleDate: true,
        inline:false,
        format:"MM/DD/YY",
        numberOfColumns:1,
        numberOfMonths:1,
        onSelect: function(date){
            populateReservations();
        }
    });

    new Lightpick({
        field: document.getElementById('reservation-due-date-range'),
        singleDate: true,
        inline:false,
        format:"MM/DD/YY",
        numberOfColumns:1,
        numberOfMonths:1,
        onSelect: function(date){
            populateReservations();
        }
    });
    
    populateReservations();
}

function DrawReservation()
{
    drawReservations();

    _page({add:
            "<div id='error-pane' class='ui w3-row negative message pad-2 l-width-l lift-1' style='display: none; margin: auto; margin-top: 10px;'>" +
            "<div class='w3-col l10 m10 s8'><h6 id='error-pane-text' class='sleak'></h6></div>" +
            "<div class='w3-col l2 m2 s4 align-r'>" +
            "<button class='ui negative sleak button' onclick=\"$('#error-pane').transition('drop out'); " +
            "populateReservation()\">try again</button>" +
            "</div>" +
            "</div>"});


    _page({add:div({add:
        "<div class='w3-col l4 m4 s12'>" +
        "<div class=''>" +


        "<div>" +
        "<h3 id='res-name' class='sleak load-slip' style='margin: 0px; margin-top: 10px;'>Name</h3>" +
        "<small class='load-slip'><span id='res-number'>Booking</span></small>" +
        "</div>" +

        "<div class='pad-1 widget w3-card curve' style='margin-top: 10px;'>" +
        "<a id='see-profile-con' style='float: right; margin-top: 10px;' href=''></a>" +
        "<h6 class='sleak load-slip' style='font-weight: bold; color: steelblue;'>Contact Into</h6><br/>" +
        "<h6 class='load-slip' style='color: dimgray; font-size: 14px;'>" +
        "<i class='mobile icon'></i> <span id='res-phone'>phone</span>" +
        "</h6>" +
        "<h6 class='load-slip' style='color: dimgray; font-size: 14px;'>" +
        "<i class='at icon'></i> <span id='res-email'>email</span>" +
        "</h6>" +
        "</div>" +

        "<div class='pad-1 widget w3-card curve' style='margin-top: 10px;'>" +
        "<span id='pay-status' class='status load-slip'>Status</span>" +
        "<h6 class='sleak load-slip' style='font-weight: bold; color: steelblue;'>" +
        "Payment info </h6><br/>" +
        "<table class='ui very basic no-line table'>" +
        "<tr>" +
        "<th><span class='load-slip'>Subtotal</span></th>" +
        "<td><span class='load-slip'>"+$("#currency-symbol").val()+" <span id='subtotal'>0</span></span></td>" +
        "</tr>" +
        "<tr>" +
        "<th><span class='load-slip'>Discount</span></th>" +
        "<td><span class='load-slip'>"+$("#currency-symbol").val()+" <span id='discount'>0</span></span></td>" +
        "</tr>" +
        "<tr>" +
        "<th><span class='load-slip'>Total</span></th>" +
        "<td><span class='load-slip'>"+$("#currency-symbol").val()+" <span id='total'>0</span></span></td>" +
        "</tr>" +
        "<tr>" +
        "<th><span class='load-slip'>Paid</span></th>" +
        "<td><span class='load-slip'>"+$("#currency-symbol").val()+" <span id='paid'>0</span></span></td>" +
        "</tr>" +
        "</table>" +
        "</div>" +

        "<div class='pad-1 widget w3-card curve' style='margin-top: 10px;'>" +
        "<h6 class='sleak load-slip' style='font-weight: bold; color: steelblue;'>Special request</h6><br/>" +
        "<div id='special-req'></div>" +
        "</div>" +

        "</div>" +
        "</div>" +


        "<div class='w3-col l8 m8 s12'>" +
        "<div class='l-width-8' style='margin: auto;'>" +
        "<div>" +
        "<h6 id='reserve-status' class='status load-slip' style='float: right;'>Status</h6>" +
        "<h4 class='sleak load-slip' style='margin: 0px; margin-top: 10px;'>Reservation details</h4>" +
        "<small class='load-slip'>Created: <span id='res-crested-con'></span></small>" +
        "</div>" +

        "<div class='widget curve w3-card' style='margin-top: 20px;'>" +
        "<div class='pad-t' style='background-color: rgb(250,250,250); border-radius: 4px 4px 0px 0px;'>" +
        "<h6 class='sleak load-slip' style='font-weight: bold; margin-left: 10px; font-size: 14px;'>" +
        "Rooms <span id='room-res-count' style='float: right; margin-right: 10px;'>0</span>" +
        "</h6>" +
        "</div>" +
        "<div id='room-reservations-con'></div>" +
        "</div>" +

        "</div>" +
        "</div>",
    class:"w3-row l-pad-7 m-pad-1 s-pad-1"})});

    populateReservation();
}

function DrawLoging()
{
    $("#menu").html(
        "<div class='w3-row'>" +

        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/group.png' style='width: 40px; margin-top: 0px;'> In house guests" +
        "</h3>" +
        "</div>" +

        "<div class='w3-col l12 m12 s12 pad-1'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
        "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
        "<h6 style='text-align: center;'><i class='green bed inverted circular icon'></i></h6>" +
        "</div>" +
        "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
        "<h6 id='inhouse-count' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>0</h6>" +
        "<h6 style='text-align: right; font-family: varela_roundregular; color: dimgray; margin-right: 10px;'>In house guests" +
        "</h6>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
        "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
        "<h6 style='text-align: center;'><i class='blue calendar inverted alternate outline circular icon'></i></h6>" +
        "</div>" +
        "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
        "<h6 id='todays-checkin-count' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>0</h6>" +
        "<h6 style='text-align: right; font-family: varela_roundregular; color: dimgray; margin-right: 10px;'>Today's check-ins" +
        "</h6>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
        "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
        "<h6 style='text-align: center;'><i class='red calendar inverted alternate outline circular icon'></i></h6>" +
        "</div>" +
        "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
        "<h6 id='todays-checkout-count' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>0</h6>" +
        "<h6 style='text-align: right; font-family: varela_roundregular; color: dimgray; margin-right: 10px;'>Today's check-outs" +
        "</h6>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
        "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
        "<h6 style='text-align: center;'><i class='yellow bed inverted circular icon'></i></h6>" +
        "</div>" +
        "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
        "<h6 id='overdue-stay' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>0</h6>" +
        "<h6 style='text-align: right; font-family: varela_roundregular; color: dimgray; margin-right: 10px;'>Overdue" +
        "</h6>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>");

    _page({add:"<div class='ui pointing menu'>" +
            "  <a id='all-guest-tab' class='active item guest-tab' onclick=\"switchGuestTab(this)\">" +
            "     All" +
            "  </a>" +
            
            "  <a id='due-checkout-tab' class='item guest-tab' onclick='switchGuestTab(this)'>" +
            "     <i class='green calendar alternate outline icon'></i> Due check-out" +
            "  </a>" +

            "  <a id='overdue-tab' class='item guest-tab' onclick='switchGuestTab(this)'>" +
            "     <i class='red calendar times outline icon'></i> Overdue" +
            "  </a>" +

            "    <div class='item'>" +
            "      <div class='ui transparent icon input'>" +
            "        <input id='guest-due-date' type='text' data-toggle='datepicker' " +
            "             placeholder='Date from' onchange='populateGuests();'>" +
            "        <i id='reservation-cancel-btn' class='blue calendar alternate outline icon' onclick='cancelDate()'></i>" +
            "      </div>" +
            "    </div>" +

            "    <div class='item'>" +
            "      <div class='ui transparent icon input'>" +
            "        <input id='guest-due-date-range' type='text' data-toggle='datepicker' " +
            "             placeholder='Date to' onchange='populateGuests();'>" +
            "        <i id='reservation-cancel-btn' class='blue calendar alternate outline icon' onclick='cancelDate()'></i>" +
            "      </div>" +
            "    </div>" +

            "  <div class='right menu'>" +
            "    <div class='item'>" +
            "      <div class='ui transparent icon input'>" +
            "        <input id='search-txt' type='text' placeholder='Search...' onkeyup='if(event.keyCode == 13){populateGuests();}'>" +
            "        <i class='search link icon'></i>" +
            "      </div>" +
            "    </div>" +
            "  </div>" +
            "</div>", class:"l-pad-2 s-pad-1 m-pad-1"})


    _page({
        add: DrawTable(["Guest", "Checkin-checkout", "Room(s)", "Adults", "Payment", "Balances","Bill"],
            {
                Celled: true, Padded: true, GroupAction: [{ Text: "Export CSV", Method: "exportCheckCSV"}]
            }).outerHTML, class: "l-pad-2"
    });


    let referenceCon = document.createElement("div");
    referenceCon.className = "l-pad-2";
    referenceCon.style.backgroundColor = "transparent";

    let refTable = document.createElement("table");
    refTable.className = "ui very basic table";
    refTable.style.backgroundColor = "transparent;"
    refTable.innerHTML = "<tr>" +
        "<td style='border-bottom: none;'><i class='green user circle circular icon' data-content='Guest customer'></i> New guest </td>" +
        "<td><i class='blue refresh circular icon' data-content='Guest customer'></i> Re-lodging </td>" +
        "<td><i class='yellow group circular icon' data-content='Guest customer'></i> Has sub guest </td>" +
        "<td><i class='red bed circular icon' data-content='Repeated customer'></i> Multiple rooms </td>" +
        "<td><i class='blue paw circular icon' data-content='Repeated customer'></i> Has pet </td>" +
        "</tr>";


    //referenceCon.appendChild(refTable);
    //_page({ add: referenceCon });

    $(".ui.dropdown").dropdown();


    new Lightpick({
        field: document.getElementById('guest-due-date'),
        singleDate: true,
        inline:false,
        format:"MM/DD/YY",
        numberOfColumns:1,
        numberOfMonths:1,
        onSelect: function(date){
            populateGuests();
        }
    });

    new Lightpick({
        field: document.getElementById('guest-due-date-range'),
        singleDate: true,
        inline:false,
        format:"MM/DD/YY",
        
        numberOfColumns:1,
        numberOfMonths:1,
        onSelect: function(date){
            populateGuests();
        }
    });

    populateGuests();
}

function DrawCustomers()
{
    $("#menu").html(
        "<div class='w3-row'>" +

        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/group.png' style='width: 40px; margin-top: 0px;'> Customers" +
        "</h3>" +
        "</div>" +

        "<div class='w3-col l12 m12 s12 pad-1'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l12 m12 s12' style='margin-top: 10px;'>" +
        "<div class='widget curve wix-textbox l-width-xl m-width-l' style='border: 1px solid rgb(230,230,230);'>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l4 m4 s4 pad-1' style='border-right: 1px solid lightgray;'>" +
        "<h6 style='text-align: center;'><i class='green users inverted circular icon'></i></h6>" +
        "</div>" +

        "<div id='add-customer-button' title='Add a customer' onclick='addCustomer()'><i class='add inverted icon'></i></div>"+

        "<div class='w3-col l8 m8 s8 pad-t' style=''>" +
        "<h6 id='customers-count' class='sleak' style='text-align: right; font-weight: bold; margin-right: 10px;'>0</h6>" +
        "<h6 style='text-align: right; font-family: varela_roundregular; color: dimgray; margin-right: 10px;'>Customers" +
        "</h6>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>");

    _page({add:DrawSearch({method:"populateCustomers"}).outerHTML, class:"l-pad-2 s-pad-1 m-pad-1"})


    _page({
        add: DrawTable(["Profile img", "Customers info", "Address", "Gender", "Dates", "Action"],
            {
                Celled: true, Padded: true, GroupAction: [{ Text: "Export CSV", Method: "exportCustomerCSV", type: 'customer' }]
            }).outerHTML, class: "l-pad-2"
    });


    let referenceCon = document.createElement("div");
    referenceCon.className = "l-pad-2";
    referenceCon.style.backgroundColor = "transparent";

    let refTable = document.createElement("table");
    refTable.className = "ui very basic table";
    refTable.style.backgroundColor = "transparent;"
    refTable.innerHTML = "<tr>" +
        "<td style='border-bottom: none;'><i class='green user circle circular icon' data-content='Guest customer'></i> New guest </td>" +
        "<td><i class='blue refresh circular icon' data-content='Guest customer'></i> Re-lodging </td>" +
        "<td><i class='yellow group circular icon' data-content='Guest customer'></i> Has sub guest </td>" +
        "<td><i class='red bed circular icon' data-content='Repeated customer'></i> Multiple rooms </td>" +
        "<td><i class='blue paw circular icon' data-content='Repeated customer'></i> Has pet </td>" +
        "</tr>";


    //referenceCon.appendChild(refTable);
    //_page({ add: referenceCon });

    $(".ui.dropdown").dropdown();

    populateCustomers();
}

function DrawCustomerProfile()
{
    $('body').css("background-color", "white");

    let arg = getArg();

    $("#min-menue-con").html(
        "<div>" +
        "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: 0;'>" +
        "       <div class='header blue item' style='border-radius: 0; background-color: rgb(0,100,140);opacity: 0.5; color: white;'>" +
        "           <i class='calendar alternate outline icon'></i> Manage Reservations" +
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
        "   </div>" +
        "</div>");

    $("#property-page").html(
        "<div>" +
        "<div id='menu'></div>" +
        "<div id='page'></div>" +
        "</div>");

    $("#property-page").html("<div id='error-pane' class='ui w3-row negative message pad-2 l-width-l lift-1' style='display: none; margin: auto; margin-top: 10px;'>" +
        "<div class='w3-col l10 m10 s8'><h6 id='error-pane-text' class='sleak'></h6></div>" +
        "<div class='w3-col l2 m2 s4 align-r'>" +
        "<button class='ui negative sleak button' onclick=\"$('#error-pane').transition('drop out'); " +
        "populateCustomer()\">try again</button>" +
        "</div>" +
        "</div>" +


            "<div class='l-width-8' style='margin: auto;'>" +
            "<div class='w3-row l-pad-7 m-pad-1 s-pad-1'>" +
            "<div class='w3-col l3 m3 s12'>" +
            "<div class=''>" +
            "<div class='widget load-slip curve w3-card align-c'>" +
            "<div id='profile-img-con'>" +
            "</div>" +
            "</div>" +
            "<div class='pad-1 widget w3-card curve' style='color: silver; margin-top: 10px;'>" +
            "<h6 class='sleak load-slip' style='font-weight: bold; color: steelblue;'>Account Activity</h6><br/>" +
            phpvars.html.ACCOUNT_ACTIVITY+
            "</div>" +
            // "<div class='pad-1 widget w3-card curve' style='margin-top: 10px;'>" +
            // "<h6 class='sleak load-slip' style='font-weight: bold; color: steelblue;'>Lodging History</h6><br/>" +
            // phpvars.html.LODGING_HISTORY+
            // "</div>" +
            "</div>" +
            "</div>" +


            "<div class='w3-col l9 m9 s12'>" +
            "<div class='l-width-8' style='margin: auto;'>" +
            "<div>" +
            "<h6 class='load-slip status' style='float: right;'>Status</h6>" +
            "<h3 id='customer-name' class='sleak load-slip' style='margin: 0px; margin-top: 10px;'>Full Name</h3>" +
            "<small class='load-slip'>Created: <span id='creation-date' class='load-slip'>date</span></small>" +
            "</div>" +

            "<div style='margin-top: 20px;'>" +
            "<div class='widget pad-t curve w3-card' style='background-color: whitesmoe;' id='customer-profile'>" +
            // "<h6 class='sleak load-slip' style='font-weight: bold; margin-left: 10px; font-size: 14px;'>Reservations</h6>" +
            
            "</div>" +
            "</div>" +

            // "<div style='margin-top: 20px;'>" +
            // "<div class='widget pad-t curve w3-card' style='background-color: whitesmoe;'>" +
            // "<h6 class='sleak load-slip' style='font-weight: bold; margin-left: 10px; font-size: 14px;'>Reservations</h6><br>" +
            // phpvars.html.CUSTOMER_RESERVATION+
            // "</div>" +
            // "</div>" +

            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
    );

    populateCustomer();
}

function getCustomerForm(customer = {guest : {}}, html = '')
{
    return "<div class='l-pad-2 m-pad-1'>" +
    "<div class='w3-row'>" +
    "<div class='w3-col l6 m6 s12'>" +
    "<div class='l-width-xl'>" +
    "<div class='ui fluid left icon input'>" +
    "<i class='user circel icon'></i> " +
    "<input id='guest-name' class='wix-textbox' value='"+(customer.guest.name != null ? customer.guest.name : '')+"' placeholder='Name' type='text'/>" +
    "</div>" +
    "</div>" +
    "</div> " +
    "<div class='w3-col l6 m6 s12'>" +
    "<div class=''>" +
    "<div class='ui fluid left icon input'>" +
    "<i class='icon'></i>" +
    "<input id='guest-surname' class='wix-textbox' value='"+(customer.guest.surname != null ? customer.guest.surname : '')+"' placeholder='Surname' type='text'/>" +
    "</div>" +
    "</div>" +
    "</div> " +
    "</div> " +

    "<div class='w3-row' style='margin-top: 10px;'>" +
    "<div class='w3-col l4 m4 s12'>" +
    "<div class='l-width-xl'>" +
    "<div class='ui fluid left icon input'>" +
    "<i class='mobile icon'></i> " +
    "<input id='guest-phone' class='wix-textbox'  value='"+(customer.guest.phone != null ? customer.guest.phone : '')+"' placeholder='Phone' type='text'/>" +
    "</div>" +
    "</div>" +
    "</div> " +
    "<div class='w3-col l8 m8 s12'>" +
    "<div class=''>" +
    "<div class='ui fluid left icon input'>" +
    "<i class='at icon'></i>" +
    "<input id='guest-email' class='wix-textbox' value='"+(customer.guest.email != null ? customer.guest.email : '')+"' placeholder='Email' type='text'/>" +
    "</div>" +
    "</div>" +
    "</div> " +
    "</div> " +

    "<div class='w3-row' style='margin-top: 10px;'>" +
    "<div class='w3-col l6 m6 s6' style='padding-top: 10px;'>" +
    "<div class='w3-row'>" +
    "<div class='w3-col l6 m6 s6'>" +
    "<label class='user circel icon'> " +
    "<input id='male' class='with-gap' name='gender' type='radio' "+(customer.guest.sex != null ? (customer.guest.sex != "female" ? 'checked' : '') : 'checked')+"/>" +
    "<span>Male</span>" +
    "</label>" +
    "</div>" +
    "<div class='w3-col l6 m6 s6'>" +
    "<label class='user circle icon'> " +
    "<input id='' class='with-gap' name='gender' type='radio' "+(customer.guest.sex != null ? (customer.guest.sex == "female" ? 'checked' : '') : '')+"/>" +
    "<span>Female</span>" +
    "</label>" +
    "</div>" +
    "</div>" +
    "</div> " +
    "<div class='w3-col l6 m6 s6'>" +
    "<div class=''>" +
    "<div class='ui fluid left icon input'>" +
    "<i class='calendar alternate icon'></i>" +
    "<input id='dob' class='wix-textbox' value='"+(customer.guest.dob != null ? customer.guest.dob : '')+"' placeholder='Date of birth' type='text'/>" +
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
    "<input id='guest-state' value='"+(customer.guest.state != null ? customer.guest.state : '')+"' class='wix-textbox' placeholder='State' type='text'/>" +
    "</div>" +
    "</div>" +
    "</div> " +
    "<div class='w3-col l4 m4 s12'>" +
    "<div class=''>" +
    "<div class='ui fluid left icon input'>" +
    "<i class='map icon'></i>" +
    "<input id='guest-city' value='"+(customer.guest.city != null ? customer.guest.city : '')+"' class='wix-textbox' placeholder='City' type='text'/>" +
    "</div>" +
    "</div>" +
    "</div> " +
    "</div> " +

    "<div class='ui fluid form' style='margin-top: 10px;'>" +
    "<textarea id='guest-address' class='wix-textbox' rows='3' placeholder='Address'>"+(customer.guest.address != null ? customer.guest.address : '')+"</textarea>" +
    "</div>" +
    html +
    "</div>";
    
}

function DrawSendMessages()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
            "<div class='l-pad-2 s-pad-1'>" +
            "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
            "<img src='"+phpvars.CDN_URL+"/images/messages.png' style='width: 45px; margin-top: 10px;'> Send Emails" +
            "</h3>" +
            "</div>" +
        "<div class='l-pad-2 s-pad-1'>" +
        "</div>" +
        "</div>");

    _page({add:"<div class='l-width-9' style='margin: auto;'> " +
            "<div class='w3-col l4 m4 s12'>" +
            "<div class='widget wix-textbox l-width-xl m-width-xl curve' style='border: 1px solid rgb(230,230,230);'>" +
            "<div class='pad-2' style='border-radius: 4px 4px 0px 0px;'>" +
            "<div style='float: right;' class='ui right top pointing dropdown'>" +
            "<div class=''><i class='ellipsis vertical icon'></i></div>" +
            "<div class='menu'>" +
            "<div class='item' onclick='importCustomContactList()'>Import custom list</div>" +
            "</div>" +
            "</div> " +
            "<h4 style='display: inline; color: dimgray;' class='sleak'><i class='group icon'></i> Add Contacts</h4>" +
            "</div> " +
            "<div class=''>" +
            "<table class='ui definition table' style='border-radius: 0px;'>" +
            "<tbody id='contact-table-list'>" +
            "<tr>" +
            "<td><label><input id='guests' class='filled-in contact-list-item' type='checkbox'/><span></span></label></td>" +
            "<td><label>All Guests</label></td>" +
            "</tr>" +
            "<tr>" +
            "<td><label><input id='in-house-guest' class='filled-in contact-list-item' type='checkbox'/><span></span></label></td>" +
            "<td><label>In house guest</label></td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "</div> " +
            "<div class='l-pad-1' style=''>" +
            "<div class='ui form'>" +
            "<div class='field'>" +
            "<textarea id='open-contacts' class='wix-textbox' rows='20' style='font-family: Lato;' " +
            "placeholder='Add emails separated with coma (,) or new line'></textarea>" +
            "</div>" +
            "</div>" +
            "</div> " +
            "</div> " +
            "</div>" +
            "<div class='w3-col l8 m8 s12'>" +
            "<div class='widget wix-textbox pad-2 curve' style='border: 1px solid rgb(230,230,230);'>" +
            "<div style='margin-bottom: 10px;'>" +
            "<div class='ui buttons'>" +
            "<button class='ui basic blue-text compact small sleak button' onclick='showMessageTags()'>Message Tags</button>" +
            "</div> " +
            "</div>" +
            "<div class='ui fluid right labeled input'>" +
            "<input id='from-email' class='wix-textbox' placeholder='From Email'/>" +
            "<label id='email-domain-con' class='ui label'></label> " +
            "</div> " +
            "<div class='ui fluid labeled input' style='margin-top: 10px;'>" +
            "<label class='ui sleak label'>From Name</label>" +
            "<input id='from-name' class='wix-textbox' placeholder=''  type='text'/>" +
            "</div> " +
            "<div class='ui fluid labeled input' style='margin-top: 10px;'>" +
            "<label class='ui sleak label'>Reply To</label>" +
            "<input id='reply-to-email' class='wix-textbox' type='text'/>" +
            "</div> " +
            "<div class='ui fluid input' style='margin-top: 10px;'>" +
            "<input id='email-subject' class='wix-textbox' placeholder='Subject' type='text'/>" +
            "</div> " +
            "<div class='ui form' style='margin-top: 10px;'>" +
            "<div class='field'>" +
            "<textarea id='email-body'></textarea>" +
            "</div> " +
            "</div> " +
            "<div style='margin-top: 10px;'>" +
            "<button id='email-attachment-btn' class='ui green-back   icon button' onclick=\"getElement('email-attachment-file').click()\"><i class='linkify icon'></i></button>" +
            "<input id='email-attachment-file' type='file' style='display: none;' onchange='uploadAttachment(this)'/> " +
            "<input id='email-attachment' type='hidden' value=''/> " +
            "<label id='email-attachment-txt'>Click to add attachment</label>" +
            "</div> " +
            "<div style='margin-top: 10px;'>" +
            "<button id='send-email-btn' class='ui blue sleak button'  onclick='sendEmail()'><i class='paper plane icon'></i> Send</button> " +
            "</div> " +
            "</div> " +
            "</div> " +
            "</div>",
        class:"w3-row l-pad-2 s-pad-1"});


    $(".ui.dropdown").dropdown();

    InitEditor(getElement("email-body"));

    $("#email-domain-con").html("@"+location.hostname.toString());
}

function DrawSendSMS()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/sms.png' style='width: 45px; margin-top: 10px;'> Send SMS" +
        "</h3>" +
        "</div>" +
        "<div class='l-pad-2 s-pad-1'>" +
        "</div>" +
        "</div>");

    _page({add:"<div class='l-width-9' style='margin: auto;'> " +
            "<div class='w3-col l4 m4 s12'>" +
            "<div class='widget wix-textbox l-width-xl m-width-xl curve' style='border: 1px solid rgb(230,230,230);'>" +
            "<div class='pad-2' style='border-radius: 4px 4px 0px 0px;'>" +
            "<div style='float: right;' class='ui right top pointing dropdown'>" +
            "<div class=''><i class='ellipsis vertical icon'></i></div>" +
            "<div class='menu'>" +
            "<div class='item' onclick='importCustomContactList()'>Import custom list</div>" +
            "</div>" +
            "</div> " +
            "<h4 style='display: inline; color: dimgray;' class='sleak'><i class='group icon'></i> Add Contacts</h4>" +
            "</div> " +
            "<div class=''>" +
            "<table class='ui definition table' style='border-radius: 0px;'>" +
            "<tbody id='contact-table-list'>" +
            "<tr>" +
            "<td><label><input id='guests' class='filled-in contact-list-item' type='checkbox'/><span></span></label></td>" +
            "<td><label>All Guests</label></td>" +
            "</tr>" +
            "<tr>" +
            "<td><label><input id='in-house-guest' class='filled-in contact-list-item' type='checkbox'/><span></span></label></td>" +
            "<td><label>In house guest</label></td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "</div> " +
            "<div class='l-pad-1' style=''>" +
            "<div class='ui form'>" +
            "<div class='field'>" +
            "<textarea id='open-contacts' class='wix-textbox' rows='5' style='font-family: Lato;' " +
            "placeholder='Add phone numbers sepearted with coma (,) or new line'></textarea>" +
            "</div>" +
            "</div>" +
            "</div> " +
            "</div> " +
            "</div>" +
            "<div class='w3-col l8 m8 s12'>" +
            "<div class='widget pad-2 wix-textbox curve' style='border: 1px solid rgb(230,230,230);'>" +

            "<div style='margin-bottom: 10px;'>" +
            "<div class='ui buttons'>" +
            "<button class='ui basic blue-text compact small sleak button' onclick='showMessageTags()'>Message Tags</button>" +
            "</div> " +
            "</div>" +

            "<div class='ui fluid labeled input' style='margin-top: 10px;'>" +
            "<label class='ui sleak label'>From Name</label>" +
            "<input id='from-name' class='wix-textbox' type='text'/>" +
            "</div> " +

            "<div class='ui form' style='margin-top: 10px;'>" +
            "<div class='field'>" +
            "<textarea class='wix-textbox' rows='5' placeholder='Write message' id='sms-body' onkeyup='countCharacters()' onchange='countCharacters()'></textarea>" +
            "</div> " +
            "<h6 style='font-family: lato; float: right;'><small><span id='char-count'>0</span> of 160</small></h6>" +
            "</div> " +
            "<div style='margin-top: 10px;'>" +
            "<button id='send-sms-btn' class='ui blue sleak button' onclick='sendSMSMessage()'>" +
            "<i class='paper plane icon'></i> Send</button> " +
            "</div> " +
            "</div> " +
            "</div> " +
            "</div>",
        class:"w3-row l-pad-2 s-pad-1"});


    $(".ui.dropdown").dropdown();
}


//--------------------------- STaff and users managment--------------------------//

function DrawAdminUsers()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/admin_user.png' style='width: 50px; margin-top: -10;'> Admin users" +
        "</h3>" +
        "</div>" +
        "<div class='l-pad-2 s-pad-1'>" +
        "<a href='#new-admin-user'><button class='ui blue sleak fluid button'><i class='plus icon'></i> New User</button></a> " +
        "</div>" +
        "</div>");



    let searchCon = div({ add: DrawSearch({ method: "populateUser" }), class: "l-pad-2" });
    searchCon.style.paddingBottom = "0px";
    _page({ add: searchCon });

    _page({
        add: DrawTable(["Name", "Username", "Role", "Status", "Action"],
            {
                GroupAction: [{ Text: "DIVIDER" },
                    { Text: "Delete users", Method: "ConfirmGroupUserDelete" }]
            }).outerHTML, class: "l-pad-2"
    });

    $(".ui.dropdown").dropdown();

    populateUser();
}

function DrawNewAdminUsers()
{
    $('body').css("background-color", "white");

    $("#min-menue-con").html(
        "<div>" +
        "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
        "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
        "           <i class='users icon'></i> Staff" +
        "       </div>" +
        "       <a href='#staff' class='item'>" +
        "           All" +
        "       </a>" +
        "       <a href='#staff/roles' class='item'>" +
        "           Group role" +
        "       </a>" +
        "       <a href='#staff/list' class='item'>" +
        "           Staff List" +
        "       </a>" +
        "       <a href='#staff/departments' class='item'>" +
        "           Departments" +
        "       </a>" +
        "   </div>" +
        "</div>");

    $("#property-page").html(
        "<div>" +
        "<div id='menu'></div>" +
        "<div id='page'></div>" +
        "</div>");


    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/admin_user.png' style='width: 50px; margin-top: -10;'> Create / Edit users" +
        "</h3>" +
        "</div>" +
        "<div class='l-pad-2 s-pad-1'>" +
        "<a href='#staff'><button class='ui blue sleak fluid button' id='btn-name'><i class='users icon'></i> Admin users</button></a> " +
        "</div>" +
        "</div>");


    _page({clear:true});

    _page({
        add: "<br/>" +
            "<div class='l-width-8 widget wix-textbox curve l-pad-2 s-pad-1' style='margin: auto; border: 3px solid rgb(230,230,230); margin-bottom: 50px;'>" +
            "<div class='l-width-8' style='margin: auto;'>" +


            "<input id='adminuserid' type='hidden' value=''/>" +

            "<br/><br/><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>.</label></div></div>" +
            "<div class='w3-col l8 m3 s12'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='use-staff-list-chk' type='checkbox' onchange='from_st_lst(this)'/><span>From Staff list</span></label></div>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +


            "<div>" +
            "<div id='staff-list-con' class='w3-row' style='display:none'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Select staff</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><select id='staff-list' class='ui wix-select fluid search dropdown' onchange='staff_changed(this)'></select></div>" +
            "<br/><br/><br/></div>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Fullname</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i class='user circle green icon'></i><input id='full-name' class='wix-textbox' type='text'/></div></div>" +
            "</div><br/>" +

            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Username</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui fluid input'><input id='username' class='wix-textbox' type='text'/></div></div>" +
            "</div><br/>" +

            "<div id='address'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Select role</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><select id='role-list' class='ui wix-select fluid search dropdown'></select></div>" +
            "</div><br/>" +


            "<br/><br/>" +

            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Password</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i class='lock green icon'></i><input id='admin-user-password' class='wix-textbox' type='password'/></div></div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l4 m3 s12'><div class='l-width-7 l-align-r' style='margin: auto;'><label style='color: gray; font-family: nunitoregular;'>Confirm Password</label></div></div>" +
            "<div class='w3-col l8 m3 s12'><div class='ui left icon fluid input'><i class='unlock green icon'></i><input id='admin-user-password-conf' class='wix-textbox' type='password'/></div></div>" +
            "</div><br/>" +

            "<div class='align-r'>" +
            "<button id='save-admin-user-btn' class='ui blue sleak compact button' onclick='saveAdminUser()'>Submit</button>" +
            "</div><br/>" +

            "<div>" +
            "</div>", class: 'l-margin-t-4'
    });

    list({ con: getElement("staff-list"), job: 'list staff', all: true });
    list({ con: getElement("role-list"), job: 'list role', all: true });

    $(".ui.dropdown").dropdown({allowAdditions:true});

    // load user information
    var hash = location.hash.split('/');

    if (hash.length > 1)
    {
        $("#page").addClass("ui loading form");

        postJson("hms-admin/worker", function(data, status){

            if (status == 'done')
            {
                let d = JSON.parse(data);

                if (d.status == 'success')
                {
                    const user = d.data[0];

                    $('#role-list').dropdown('set selected', user.Role.Id);
                    $('#adminuserid').val(hash[1]);
                    $('#full-name').val(user.Name + ' ' + user.Surname);
                    $('#username').val(user.Username);
                    
                    $("#page").removeClass("ui loading form");
                }
            }
        }, {
            job : 'get admin users',
            Page : 1,
            Perpage : 1,
            Filter : 'search list',
            Filtervalue : hash[1]
        });
    }
}

function DrawAdminGroupRoles()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/access.png' style='width: 50px; margin-top: -10;'> Group roles" +
        "</h3>" +
        "</div>" +
        "<div class='l-pad-2 s-pad-1'>" +
        "<a href='#add-role'><button class='ui blue sleak fluid button'><i class='plus icon'></i> New role</button></a> " +
        "</div>" +
        "</div>");


    _page({clear:true});
    let searchCon = div({ add: DrawSearch({ method: "populateAdminRoles" }), class: "l-pad-2" });
    searchCon.style.paddingBottom = "0px";
    _page({ add: searchCon });

    _page({
        add: DrawTable(["Name", "Access", "Action"],
            {
                Celled: true, Padded: true, GroupAction: [{ Text: "DIVIDER" },
                    { Text: "Delete Roles", Method: "ConfirmGroupRoleDelete" }]
            }).outerHTML, class: "l-pad-2"
    });

    $(".ui.dropdown").dropdown();

    populateAdminRoles();
}


//-----------------------Non Tabbed Pages -----------------------------//
function DrawNewGroupRole()
{
    $('body').css("background-color", "white");

    $("#min-menue-con").html(
        "<div>" +
        "   <div class='ui menu' style='border-radius: 0; box-shadow: none; border: none;'>" +
        "       <div class='header item' style='background-color: rgb(0,100,140); opacity: 0.5; color: white; border-radius: 0;'>" +
        "           <i class='users icon'></i> Staff" +
        "       </div>" +
        "       <a href='#staff' class='item'>" +
        "           All" +
        "       </a>" +
        "       <a href='#staff/roles' class='item'>" +
        "           Group role" +
        "       </a>" +
        "       <a href='#staff/list' class='item'>" +
        "           Staff List" +
        "       </a>" +
        "       <a href='#staff/departments' class='item'>" +
        "           Departments" +
        "       </a>" +
        "   </div>" +
        "</div>");

    $("#property-page").html(
        "<div>" +
        "<div id='menu'></div>" +
        "<div id='page'></div>" +
        "</div>");


    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/access.png' style='width: 50px; margin-top: -10;'> Group roles" +
        "</h3>" +
        "</div>" +
        "<div class='l-pad-2 s-pad-1'>" +
        "<a href='#add-role'><button class='ui blue sleak fluid button'><i class='shield icon'></i>Roles</button></a> " +
        "</div>" +
        "</div>");

    _page({clear:true});

    let access_con = "<div class='w3-row l-width-9' style='margin: auto;'><div class='w3-col l6 m5 s12'><div class='l-pad-1'><div class=''>" +
        "<h6 class='sleak'><i class='unlock green inverted circular icon'></i>Access Role Name</h6>" +
        "<br/><br/>" +
        "<p class='pad-1' style='font-family: Lato; color: dimgray; line-height: 170%;'>" +
        "Create roles and give access to specific areas of the admin dashboard to the users with the role. A read access allows a user view " +
        " data but cannot add, remove or make changes to the data. Write access allows a user change, add or remove data. A \"Write\" access " +
        "without a \"Read\" access is useless." +
        "</p>" +
        "</div></div></div>" +
        "<div class='w3-col l6 m5 s12'>" +

        "<div class='widget lift-1 pad-1'>" +
        "<div class='ui fluid input'><input id='role-name' type='text'/></div>" +
        "<input id='role-id' type='hidden' value=''/>" +
        "</div>" +

        accessWidget("Reservation", "booking") +
        accessWidget("Discount & Coupon", "coupon") +
        accessWidget("Guests", "customer") +
        accessWidget("Rooms", "rooms") +
        /*
        accessWidget("Staff", "staff") +
        accessWidget("Kitchen", "kitchen") +
        accessWidget("Front Desk", "frontdesk") +
        accessWidget("Bakery", "bakery") +
        accessWidget("Bar", "bar") +
        accessWidget("Laundry", "laundry") +
        accessWidget("House Keeping", "housekeeping") +
        accessWidget("Pool", "pool") +
        accessWidget("Store", "store") +
        accessWidget("Event", "event") +
        accessWidget("Finance", "finance") +
        accessWidget("Branch", "branch") +
        accessWidget("Log", "log") +
            */
        accessWidget("Report", "reporting") +
        accessWidget("Messaging", "messaging") +
        //accessWidget("Webfront", "webfront") +
        //accessWidget("Webconfig", "webconfig") +
        accessWidget("Settings", "settings");

    if ($("#system-role-access").val() == "true")
    {
        access_con += "<div class='widget l-pad-2 lift-1 s-pad-1' style='margin-top: 4px;'>" +
            "<h5 class='sleak-b' style='color: gray; font-weight: normal;'>Front Desk</h5>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='frontdesk' class='filled-in' type='checkbox'/><span>Front Desk access</span></label></div>" +
            "</div>" +
            "</div>" +

            "<div class='widget l-pad-2 lift-1 s-pad-1' style='margin-top: 4px;'>" +
            "<h5 class='sleak-b' style='color: gray; font-weight: normal;'>Kitchen POS</h5>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='kitchen-pos' class='filled-in' type='checkbox'/><span>Kitchen POS access</span></label></div>" +
            "</div>" +
            "</div>" +


            "<div class='widget l-pad-2 lift-1 s-pad-1' style='margin-top: 4px;'>" +
            "<h5 class='sleak-b' style='color: gray; font-weight: normal;'>Bar POS</h5>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='bar-pos' class='filled-in' type='checkbox'/><span>Bar POS access</span></label></div>" +
            "</div>" +
            "</div>" +


            "<div class='widget l-pad-2 lift-1 s-pad-1' style='margin-top: 4px;'>" +
            "<h5 class='sleak-b' style='color: gray; font-weight: normal;'>Laundry POS</h5>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='laundry-pos' class='filled-in' type='checkbox'/><span>Laundry POS access</span></label></div>" +
            "</div>" +
            "</div>" +

            "<div class='widget l-pad-2 lift-1 s-pad-1' style='margin-top: 4px;'>" +
            "<h5 class='sleak-b' style='color: gray; font-weight: normal;'>Bakery POS</h5>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='bakery-pos' class='filled-in' type='checkbox'/><span>Bakery POS access</span></label></div>" +
            "</div>" +
            "</div>" +


            "<div class='widget l-pad-2 lift-1 s-pad-1' style='margin-top: 4px;'>" +
            "<h5 class='sleak-b' style='color: gray; font-weight: normal;'>Pool POS</h5>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6'><label><input id='pools-pos' class='filled-in' type='checkbox'/><span>Pools POS access</span></label></div>" +
            "</div>" +
            "</div>";
    }


    access_con += "<div class='widget l-pad-2 lift-1 s-pad-1' style='margin-top: 4px;'>" +
        "<div class=''>" +
        "<button id='role-save-btn' class='ui blue sleak button' onclick='saveRole()'><i class='save icon'></i>Save</button>" +
        "<button class='ui basic sleak button'><i class='arrow left icon'></i>Back</button>" +
        "</div>" +
        "</div>" +


        "</div>" +
        "</div>";


    _page({ add: access_con, class: "l-pad-3" });


    let arg = getArg();
    if(arg != null)
    {
        loadEditRole(arg);
    }
}

function accessWidget(title, ids)
{
    return "<div class='widget l-pad-2 lift-1 s-pad-1' style='margin-top: 4px;'>" +
        "<h5 class='sleak-b' style='color: gray; font-weight: normal;'>" + title + "</h5>" +
        "<div class='w3-row'>" +
        "<div class='w3-col l6 m6 s6'><label><input id='" + ids + "-read' class='filled-in' type='checkbox'/><span>Read access</span></label></div>" +
        "<div class='w3-col l6 m6 s6'><label><input id='" + ids + "-write' class='filled-in' type='checkbox'/><span>Write access</span></label></div>" +
        "</div>" +
        "</div>";
}

function DrawNewStaff()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/admin_user.png' style='width: 50px; margin-top: -10;'> " + (arg == null ? 'New Staff' : 'Edit Staff') +
        "</h3>" +
        "</div>" +
        "<div class='l-pad-2 s-pad-1'>" +
        "<a href='#staff/list'><button class='ui blue sleak fluid button'><i class='users icon'></i>Staff List</button></a> " +
        "</div>" +
        "</div>");

    //_page({ add: pageTop({ icon: "user circle", text: "Add New Staff" }), clear: true });

    _page({
        add:
            "<input id='staff-id' value='' type='hidden'/>"+
            "<div class='w3-row w3-main l-width-9' style='margin: auto;'><div class='w3-col l12 m6 s12'><div class='l-pad-1'><div class=''>" +
            "<h6 class='sleak'><i class='user circle green inverted circular icon'></i>Personal Info</h6>" +
            "</div></div>" +
            "<div class='w3-col l12 m12 s12'>" +

            "<input id='staff-id' type='hidden' value=''/>" +

            "<div class='widget lift-1 l-pad-2 s-pad-1'>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s12'>" +
            "<label>Name</label>" +
            "<div class='ui left icon fluid input l-width-xl'><i class='user circle green icon'></i>" +
            "<input class='wix-textbox' id='staff-name' type='text'/></div>" +
            "</div>" +
            "<div class='w3-col l6 m6 s12'>" +
            "<label>Surname</label>" +
            "<div class='ui fluid input'><input class='wix-textbox' id='staff-surname' type='text'/></div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l5 m5 s12'>" +
            "<label>Phone</label>" +
            "<div class='ui fluid left icon input l-width-xl'><i class='mobile green icon'></i>" +
            "<input class='wix-textbox' id='staff-phone' type='text'/></div>" +
            "</div>" +
            "<div class='w3-col l7 m7 s12'>" +
            "<label>Email</label>" +
            "<div class='ui left icon fluid input'><i class='at green icon'></i>" +
            "<input class='wix-textbox' id='staff-email' type='text'/></div>" +
            "</div>" +
            "</div><br/>" +



            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s12'>" +
            "<div class='l-width-xl'>" +
            "<label>Gender</label>" +
            "<select id='staff-sex' class='wix-select ui fluid dropdown'><option>Male</option><option>Female</option></select>" +
            "</div>" +
            "</div>" +
            "<div class='w3-col l6 m6 s12'>" +
            "<label>Date of birth</label>" +
            "<div class='ui fluid left icon input'><i class='calendar green icon'></i>" +
            "<input class='wix-textbox' data-toggle='datepicker' id='staff-dateofbirth' type='text'/></div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s12'>" +
            "<div class='l-width-xl'>" +
            "<label>Nationality</label>" +
            // "<select id='nationality' class='wix-select ui search fluid dropdown'></select>" +
            countryDropdown()+
            "</div>" +
            "</div>" +
            "<div class='w3-col l6 m6 s12'>" +
            "<label>State of Origin</label>" +
            "<div class='ui fluid input'><input class='wix-textbox' id='staff-state' type='text'/></div>" +
            "</div>" +
            "</div><br/>" +


            "<div class='ui form'>" +
            "<label>Current Address</label>" +
            "<div class='field'>" +
            "<div class=''>" +
            "<textarea id='staff-address' class='wix-textbox' rows='2'></textarea>" +
            "</div>" +
            "</div>" +
            "</div></div><br/>" +



            "</div>" +


            "</div>" +
            "</div>" +


            "<div class='w3-row w3-main l-width-9' style='margin: auto; margin-top: 10px;'>" +
            "<div class='w3-col l12 m12 s12'><div class='l-pad-1'><div class=''>" +
            "<h6 class='sleak'><i class='briefcase green inverted circular icon'></i>Work Info</h6>" +
            "</div></div>" +
            "<div class='w3-col l12 m12 s12'>" +

            "<div class='widget lift-1 l-pad-2 s-pad-1'>" +


            "<div class=''>" +
            "<div class=''>" +
            "<label>Department</label>" +
            "<select id='staff-department' class='ui wix-select fluid dropdown'></select>" +
            "</div>" +
            "</div><br/>" +


            "<div class=''>" +
            "<div class=''>" +
            "<label>Shift (Work hours)</label>" +
            "<select id='staff-shifts' class='ui wix-select fluid dropdown' multiple></select>" +
            "</div>" +
            "</div><br/>" +


            "<div class=''>" +
            "<div class=''>" +
            "<label>Position</label>" +
            "<div class='ui left icon fluid input'><i class='bullseye green icon'></i>" +
            "<input class='wix-textbox' id='staff-position' type='text'/></div>" +
            "</div>" +
            "</div><br/>" +


            "<div class=''>" +
            "<div class=''>" +
            "<label>Salary</label>" +
            "<div class='ui fluid green labeled input'><label class='ui label'>N</label>" +
            "<input class='wix-textbox' id='staff-salary' value='0.00' type='text'/></div>" +
            "</div>" +
            "</div>" +


            "</div></div>" +


            "</div>" +
            "</div>" +




            "<div class='w3-row w3-main l-width-9' style='margin: auto; margin-top: 10px;'>" +
            "<div class='w3-col l12 m12 s12'><div class='l-pad-1'><div class=''>" +
            "<h6 class='sleak'><i class='money green inverted circular icon'></i>Bank Info</h6>" +
            "</div></div>" +
            "<div class='w3-col l12 m12 s12'>" +

            "<div class='widget lift-1 l-pad-2 s-pad-1'>" +


            "<div class=''>" +
            "<div class=''>" +
            "<label>Bank</label>" +
            "<select id='staff-bank' class='ui wix-select fluid dropdown'></select>" +
            "</div>" +
            "</div><br/>" +


            "<div class=''>" +
            "<div class=''>" +
            "<label>Account number</label>" +
            "<div class='ui fluid input'><input class='wix-textbox' id='staff-acc-num' type='text'/></div>" +
            "</div>" +
            "</div><br/>" +


            "<div class=''>" +
            "<div class=''>" +
            "<label>Account Name</label>" +
            "<div class='ui fluid input'><input class='wix-textbox' id='staff-acc-name' type='text'/></div>" +
            "</div>" +
            "</div>" +


            "</div></div>" +


            "</div>" +
            "</div>" +




            "<div class='w3-row w3-main l-width-9' style='margin: auto; margin-top: 10px;'>" +
            "<div class='w3-col l12 m12 s12'><div class='l-pad-1'><div class=''>" +
            "<h6 class='sleak'><i class='male green inverted circular icon'></i>Image Capture</h6>" +
            "</div></div>" +
            "<div class='w3-col l12 m12 s12'>" +

            "<input id='role-id' type='hidden' value=''/>" +

            "<div class='widget lift-1 l-pad-2 s-pad-1'>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s12'>" +
            "<label>Passport</label>" +
            "<div class='l-width-9 align-c'>" +
            "<div class='' style='height: 150px; width: 150px; background-color: whitesmoke; border-radius: 50%; margin: auto;'>" +
            "<img id='passport-photo' src='' style='max-width: 100%; border-radius: 50%;'/>" +
            "</div>" +
            "<button id='passport-btn' class='ui compact sleak blue button' style='margin-top: 5px;' onclick=\"getElement('passport-file').click()\">" +
            "Select from device</button>" +
            "<input id='passport-file' type='file' style='display: none;' onChange='processPassport(this)'/>" +
            "<input id='passport_file' type='hidden' value=''/>" +
            "<button class='ui basic compact sleak button' style='margin-top: 5px;'>Use camera</button>" +
            "</div>" +
            "</div>" +
            "<div class='w3-col l6 m6 s12'>" +
            "<label>Full shot</label>" +
            "<div class=''>" +
            "<div class='' style='min-height: 200px; background-color: whitesmoke;'>" +
            "<img id='fullshot-photo' style='width: 100%;'/>" +
            "</div>" +
            "<button id='fullshot-btn' class='ui compact sleak blue button' style='margin-top: 5px;' onclick=\"getElement('fullshot-file').click()\">" +
            "Select from device</button>" +
            "<input id='fullshot-file' type='file' style='display: none;' onChange='processFullshot(this)'/>" +
            "<input id='fullshot_file' type='hidden' value=''/>" +
            "<button class='ui basic compact sleak button' style='margin-top: 5px;'>Use camera</button>" +
            "</div>" +
            "</div>" +
            "</div></div><br/>" +


            "</div>" +


            "</div>" +
            "</div>" +



            "<div class='w3-row w3-main l-width-9' style='margin: auto; margin-top: 10px;'>" +
            "<div class='w3-col l12 m12 s12'><div class='l-pad-1'><div class=''>" +
            "<h6 class='sleak'><i class='barcode green inverted circular icon'></i>Biometric / Barcode <small>(for attendance tracking)</small></h6>" +
            "</div></div>" +
            "<div class='w3-col l12 m12 s12'>" +

            "<div class='widget lift-1 l-pad-2 s-pad-1'>" +


            "<div class=''>" +
            "<div class=''>" +
            "<label>Barcode / Bio-data</label>" +
            "<div class='ui fluid input'><input id='bio-data' class='wix-textbox' type='text'/></div>" +
            "</div>" +
            "</div><br/>" +


            "<div class=''>" +
            "<div class=''>" +
            "<button id='bar-code-gen-btn' class='ui circular basic button' onclick='generateBarcode()'>Generate bar code</button>" +
            "</div>" +
            "</div>" +


            "</div></div>" +


            "<div class='widget w3-main l-pad-2 lift-1 s-pad-1' style='margin-top: 17px; clear:both'>" +
            "<div class=''>" +
            "<button id='staff-save-btn' class='ui blue sleak button' onclick='saveStaff()'><i class='save icon'></i>Save</button>" +
            "<a href='#staff'><button class='ui basic sleak button'><i class='arrow left icon'></i>Back</button></a>" +
            "</div>" +
            "</div>" +


            "</div>" +
            "</div>", class: "l-pad-3 staff-list-container"
    });

    list({ con: getElement("staff-bank"), job: 'list banks', all: true });
    list({ con: getElement("staff-department"), job: 'list departments' });
    list({ con: getElement("staff-shifts"), job: 'list shifts' });

    $("#country").dropdown({allowAdditions:true});
    

    $('[data-toggle="datepicker"]').datepicker({autoHide:true});

    
    if(arg != null)
    {
        loadEditStaff(arg);
    }
    else
    {
        $("#staff-bank").dropdown();
        $("#staff-department").dropdown();
        $("#staff-shifts").dropdown();
        $("#staff-sex").dropdown();
    }
}

function drawPropertyRules(id, property)
{
    $(id).html(
        "                       <div class='w3-row' style='margin-top: 20px; display:none;'>" +
        "                           <div class='w3-col l6 m6 s12'>" +
        "                               <div class='l-width-9'>" +
        "                                   <h6 class='sleak'>Check in time</h6>" +
        "                                   <div class='ui labeled fluid input'>" +
        "                                       <input class='wix-textbox' id='checkin-h' type='text' value='"+zerofy(property.checkinH)+"'  style='border-radius: 4px 0px 0px 4px;'/>" +
        "                                       <label class='ui label' style='border-radius: 0px;'>:</label>" +
        "                                       <input class='wix-textbox' id='checkin-m' type='text' value='"+zerofy(property.checkinM)+"' style='border-radius: 0px 4px 4px 0px;'/>" +
        "                                   </div>" +
        "                               </div>" +
        "                           </div>" +
        "                           <div class='w3-col l6 m6 s12'>" +
        "                               <h6 class='sleak'>Check out time</h6>" +
        "                               <div class='ui labeled fluid input'>" +
        "                                   <input class='wix-textbox' id='checkout-h' type='text' value='"+zerofy(property.checkoutH)+"' style='border-radius: 4px 0px 0px 4px;'/>" +
        "                                   <label class='ui label' style='border-radius: 0px;'>:</label>" +
        "                                   <input class='wix-textbox' id='checkout-m' type='text' value='"+zerofy(property.checkoutM)+"' style='border-radius: 0px 4px 4px 0px;'/>" +
        "                               </div>" +
        "                           </div>" +
        "                       </div>" +
        "                       <div style='margin-top: 10px;'><br/> " +

        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <span style='font-weight: bold;'>Check in time</span><br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Please specify the check in time for this property. eg. from 12:00 to 1:00." +
        "                           </p><br/>" +
        "                           <div class='ui left labeled small fluid input'>" +
        "                               <label class='ui label'>from</label>" +
        "                               <input id='checkin_start' class='wix-textbox' type='time' value='"+property.checkin_start+"' style='border-radius: 0px;'/>" +
        "                               <label class='ui label' style='border-radius: 0px;'>to</label>" +
        "                               <input id='checkin_end' class='wix-textbox' type='time' value='"+property.checkin_end+"' style='border-radius: 0px 4px 4px 0px;'/>" +
        "                           </div></div>" +
        "                       </div>" +

        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <span style='font-weight: bold;'>Check out time</span><br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Please specify the check out time for this property. eg. from 04:30 to 6:00." +
        "                           </p><br/>" +
        "                           <div class='ui left labeled small fluid input'>" +
        "                               <label class='ui label'>from</label>" +
        "                               <input id='checkout_start' class='wix-textbox' type='time' value='"+property.checkout_start+"' style='border-radius: 0px;'/>" +
        "                               <label class='ui label' style='border-radius: 0px;'>to</label>" +
        "                               <input id='checkout_end' class='wix-textbox' type='time' value='"+property.checkout_end+"' style='border-radius: 0px 4px 4px 0px;'/>" +
        "                           </div></div>" +
        "                       </div>" +


        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <span style='font-weight: bold;'>Payment Methods</span><br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Customers can pay for their booking online at the time of making the reservation, " +
        "                               or pay at the front desk using any of the following payment methods." +
        "                           </p><div class='checkbox-list'>" +
        "                           <label class='checkbox'><input id='online-only' type='checkbox'/><span style=''>" +
        "                               Online</span>" +
        "                           </label><br/>" +
        "                           <label class='checkbox'><input id='cash-only' type='checkbox'/><span style=''>" +
        "                               Cash</span>" +
        "                           </label><br/>" +
        "                           <label class='checkbox'><input id='transfer-deposit' type='checkbox'/><span style=''>" +
        "                               Transfer/Deposit</span>" +
        "                           </label><br/>" +
        "                           <label class='checkbox'><input id='card-pos' type='checkbox'/><span style=''>" +
        "                               Card (POS)</span>" +
        "                           </label><br/>" +
        "                           <label class='checkbox'><input type='checkbox' data-show='get-others'/><span style=''>" +
        "                               Others</span>" +
        "                           </label><br/></div>" +
        "                           <div data-show-at='get-others'><hr/><label style='margin-top:10px; display:block;'><span style='display:block;'>Please specify</span><div class='ui left fluid small input'><input type='text' data-sel='others-val' id='others' class='wix-textbox' placeholder='This field is for you..'/></div></div>"+
        "                       </div>" +


        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <span style='font-weight: bold;'>Customers check-in form</span><br/><br/>" +
        "                           <div class='w3-row'>" +
        "                               <div class='w3-col l6 m6 s12 box-col'>" +
        "                                   <label><input id='simple-form' class='with-gap' type='radio' name='form-type' "+(property.formType == "simple" ? "checked" : "")+"/>" +
    "                                       <span style='font-weight: bold;'>Simple form</span>" +
        "                                   <p  style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                                       Collect just name, phone number and email" +
        "                                   </p></label>" +
        "                               </div>" +
        "                               <div class='w3-col l6 m6 s12 box-col'>" +
        "                                   <label><input id='detailed-form' class='with-gap' type='radio' name='form-type' "+(property.formType == "detailed" ? "checked" : "")+"/>" +
        "                                   <span style='font-weight: bold;'>Detailed form</span>" +
        "                                   <p  style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                                       Collect more detailed data about the customer" +
        "                                   </p></label>" +
        "                               </div>" +
        "                           </div>" +
        "                       </div>" +


        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <label><input id='cancellation' type='checkbox' "+(property.cancellation ? "checked" : "")+" data-show='cancellation'/><span style='font-weight: bold;'>" +
        "                               Booking Cancellation" +
        "                           </span></label><br/><br/><div data-show-at='cancellation'>" +
        "                           <span>Cancellation period before arrival.</span><br/>" +
        "                           <div class='ui left labeled small fluid input'>" +
        "                               <label class='ui label'>days</label>" +
        "                               <input id='cancel-days' class='wix-textbox' type='text' value='"+property.canceldays+"' style='border-radius: 0px;'/>" +
        "                               <label class='ui label' style='border-radius: 0px;'>hrs</label>" +
        "                               <input id='cancel-hours' class='wix-textbox' type='text' value='"+property.cancelhour+"' style='border-radius: 0px 4px 4px 0px;'/>" +
        "                           </div></div>" +
        "                       </div>" +

        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <label><input id='damage-deposite' type='checkbox' "+(property.damagedeposit ? "checked" : "")+" data-show='damage'/><span style='font-weight: bold;'>" +
        "                               Damage deposit</span>" +
        "                           </label><br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Customers deposit some money during booking. In case they need to pay extra fees after their stay." +
        "                           </p><div data-show-at='damage'>" +
        "                           <span>How much is to be deposited</span><br/>" +
        "                           <div class='ui left labeled small fluid input'>" +
        "                               <label class='ui small label'>&#8358;</label>" +
        "                               <input id='damage-amount' class='wix-textbox' type='text' value='"+(property.damageamount)+"'/>" +
        "                           </div></div>" +
        "                       </div>" +


        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <label><input id='early-checkout' type='checkbox' "+(property.earlycheckout ? "checked" : "")+"/>" +
        "                               <span style='font-weight: bold;'>" +
        "                               Early check out</span>" +
        "                           </label><br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Enable early check-out. Guest get a refund for the period they don't stay" +
        "                           </p>" +
        "                       </div>" +

        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <label><input id='partial-payment' type='checkbox' "+(property.partialpayment ? "checked" : "")+" data-show='partial'/>" +
        "                               <span style='font-weight: bold;'>" +
        "                               Partial payment</span>" +
        "                           </label><br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Allow customers make partial payment during booking. They pay the rest at the front desk check they are checking in." +
        "                           </p><div data-show-at='partial'>" +
        "                           <span>How much is to be deposited</span><br/>" +
        "                           <div class='ui left labeled fluid small input'>" +
        "                               <label class='ui small label'>&#8358;</label>" +
        "                               <input id='partial-pay-amount' class='wix-textbox' type='text' value='"+property.partialpayamount+"'/>" +
        "                           </div><br/><br/>" +
        "                           <label><input id='partial-pay-percent' class='filled-in' type='checkbox' "+(property.partialpayment ? "checked" : "")+"/>" +
        "                           <span>Deposit by percentage</span></label><br/></div>" +
        "                       </div>" +

        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <span style='font-weight: bold;'>Children Policy</span>" +
        "                           <br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Any policy on how the property handle things like getting extra bed for children and " +
        "                               other children related matters" +
        "                           </p>" +
        "                           <div class='ui form'>" +
        "                               <textarea class='wix-textbox' id='child-policy' rows='2'>"+property.childpolicy+"</textarea>" +
        "                           </div>" +
        "                       </div>" +

        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <span style='font-weight: bold;'>Extra Child Fee</span>" +
        "                           <br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Does this property charge for extra child? If yes, please specify an amount" +
        "                               in the text box below." +
        "                           </p>" +
        "                           <span>How much to charge for extra child?</span><br/>" +
        "                           <div class='ui left labeled fluid small input'>" +
        "                               <label class='ui small label'>&#8358;</label>" +
        "                               <input id='extra-child-amount' class='wix-textbox' type='text' value='"+property.childfee+"'/>" +
        "                           </div><br/>" +
        "                       </div>" +

        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <span style='font-weight: bold;'>Late Checkout Rule</span>" +
        "                           <br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Here you can specify a time window and a fee to charge checked in guests for any late checkout."+
        "                           </p>" +
        "                           <div class='checkout-rule-form'><input type='text' data-make-time='yes' id='checkout-rule-from' placeholder='Time from'/> <input type='text' data-make-time='yes' id='checkout-rule-to' placeholder='Time to'/> <input type='tel' id='checkout-rule-amount' placeholder='0%'/> <button type='button' id='checkout-rule-btn'><i class='add icon'></i></button></div>"+
        "                           <div class='checkout-rule-body'></div>"+
        "                       </div>" +

        "                       <div class='widget pad-1' style='border: 3px solid rgb(245,245,245);'>" +
        "                           <span style='font-weight: bold;'>Nearby Attractions</span>" +
        "                           <br/><br/>" +
        "                           <p style='color: dimgray; font-family: Lato; line-height: 180%;'>" +
        "                               Help your guests learn about the nearby attractions for this property. Like the park, beach, shopping mall, etc." +
        "                           </p>" +
        "                           <div class='attraction-form'><input type='text' id='attraction-place' placeholder='Place'/> <input type='text' id='attraction-distance' placeholder='Distance to property. eg 1.2 miles'/> <button type='button' id='attraction-btn'><i class='add icon'></i></button></div>"+
        "                           <div class='attraction-body'></div>"+
        "                       </div>" +

        "                       <div id='loaded-rules'></div>" +


        "                       <div id='rules-container'></div>"
        );
}

function drawAttractionDiv(place, distance)
{
    var wrapper = document.createElement('div');
    wrapper.className = 'attraction-body-list';

    // add content
    wrapper.innerHTML = '<ul>\
    <li>\
    <span>Place</span>\
    <input value="'+place+'" type="text" data-attraction="place">\
    </li>\
    <li>\
    <span>Distance</span>\
    <input value="'+distance+'" type="text" data-attraction="distance">\
    </li>\
    </ul>\
    <button type="button" class="remove-attraction">&times;</button>';

    // return node
    return wrapper;
}

function drawContactDiv(name, value, type = ['text','text'])
{
    var wrapper = document.createElement('div');
    wrapper.className = 'contact-body-list';

    // add content
    wrapper.innerHTML = '<ul>\
    <li>\
    <span>Name</span>\
    <input value="'+name+'" type="'+type[0]+'" data-contact="name">\
    </li>\
    <li>\
    <span>Value</span>\
    <input value="'+value+'" type="'+type[1]+'" data-contact="value">\
    </li>\
    </ul>\
    <button type="button" class="remove-contact">&times;</button>';

    // return node
    return wrapper;
}

function drawCheckoutRuleDiv(from, to, amount)
{
    var wrapper = document.createElement('div');
    wrapper.className = 'checkout-body-list';

    // add content
    wrapper.innerHTML = '<ul>\
    <li>\
    <span>Time From</span>\
    <input value="'+from+'" type="text" data-make-time="yes" data-checkout-rule="time-from">\
    </li>\
    <li>\
    <span>Time To</span>\
    <input value="'+to+'" type="text" data-make-time="yes" data-checkout-rule="time-to">\
    </li>\
    <li>\
    <span>Amount</span>\
    <input value="'+amount+'" type="tel" data-checkout-rule="amount">\
    </li>\
    </ul>\
    <button type="button" class="remove-checkout">&times;</button>';

    // return node
    return wrapper;
}

function drawPropertyFacility(facility, checked = false)
{
    let space = document.createElement("div");
    space.className = 'checkbox';
    space.setAttribute('data-facility', facility);
    let idName = facility.replace(/[\s]+/g, '-');
    space.innerHTML =
        "<label><input class='v-feature' id='"+idName+"' type='checkbox'><span>"+facility+"</span></label>";

    // append property
    let pf = document.getElementById("property-facilities")

    // are we good ?
    if (pf != null) pf.appendChild(space);

    // check now
    let idElement = document.querySelector('#'+idName);

    if (idElement !== null) idElement.checked = checked;

}

function drawPropertyGallery(id, property)
{
    $(id).html(
        "<div class=''>" +
        "<div style='border: 1px solid #eee; margin-bottom:20px'>" +
        "<div style='height: 300px; background-color: white; position: relative;'>" +
        "<img id='gallery-image-0' style='width: 100%;' src='"+phpvars.FILES_CDN+"/white-image.png'/>" +
        "<input id='file-image-0' accept='.jpg,.jpeg,.png,.gif' type='file' onchange=\"processGalleryImage(this, '0', false, this.value, 'removeOldPicture');\" style='display: none;'/> " +
        "<input id='gallery-image-name-0' type='hidden' value=''/> " +
        "<button id='gallery-btn-0' class='ui circular large blue icon button' style='position: absolute; bottom: -10px; left: -10px;'" +
        "onclick=\"getElement('file-image-0').click()\">" +
        "<i class='image file icon'></i>" +
        "</button>" +
        "</div>" +
        "</div>" +
        "</div> " +

        "<div id='property-images-con' class='w3-row' style='margin-top: 10px;'>" +
        "<div class='w3-col l6 m6 s12 property-image' id='property-image-1'>" +
        "<div style='border: 1px solid #eee; position: relative;'>" +
        "<button id='close-btn-1' class='ui circular red icon button' " +
        "style='position: absolute; right: -10px; top: -10px; z-index: 100; display:none;' onclick=\"removePropertyImage('1')\">" +
        "<i class='times icon'></i></button> " +
        "<div class='w3-card' style='height: 200px; background-color: white; position: relative;'>" +
        "<img id='gallery-image-1' style='width: 100%;' src='"+phpvars.FILES_CDN+"/white-image.png'/>" +
        "<input id='file-image-1' accept='.jpg,.jpeg,.png,.gif' type='file' onchange=\"processGalleryImage(this, '1', false, this.value, 'removeOldPicture');\" style='display: none;'/> " +
        "<input class='property-image-file property-image-input' id='gallery-image-name-1' type='hidden' value=''/> " +
        "<button id='gallery-btn-1' class='ui circular large blue icon button' style='position: absolute; bottom: -10px; left: -10px;'" +
        "onclick=\"getElement('file-image-1').click()\">" +
        "<i class='image file icon'></i>" +
        "</button>" +
        "</div>" +
        "</div> " +
        "</div> " +

        "</div> "
        );

    for(let i = 0; i < property.images.length; i++)
    {
        if(getElement("gallery-image-"+(i)) == null)
        {
            addPropetyImage(i);
        }

        $("#gallery-image-"+(i)).attr("src", phpvars.FILES_CDN + "/" + property.images[i]);
        $("#gallery-image-name-"+(i)).val(property.images[i]);
        $('#close-btn-'+i).show();
    }
    firstCheckPropertyImages();
}

function DrawContactList()
{
    //_page({ add: pageTop({ icon: "list", text: "Contact List" }), clear: true });
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
            "<div class='l-pad-2 s-pad-1'>" +
            "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
            "<img src='"+phpvars.CDN_URL+"/images/check_book.png' style='width: 45px; margin-top: 10px;'> Contact List" +
            "</h3>" +
            "</div>" +
        "<div class='l-pad-2 s-pad-1'>" +
        "<button class='ui blue sleak fluid button' onclick='launchCustomList()'>Create custom list</button>" +
        "</div>" +
        "</div>");

    _page({add:
            "<input id='custom-list-id' type='hidden' value=''/> " +

            "<div class='l-width-l' style='margin: auto;'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<div class='l-width-l m-width-xl curve l-margin-t-6'>" +

            "<div class='ui secondary vertical menu'>" +
            "      <a id='contact-list-all' class='active item contact-list-menu' onclick='contactListClicked(this)'>" +
            "             All" +
            "      </a>" +
            "      <a id='contact-list-customer' class='item contact-list-menu' onclick='contactListClicked(this)'>" +
            "         Customers" +
            "      </a>" +
            "      <a id='contact-list-staff' class='item contact-list-menu' onclick='contactListClicked(this)'>" +
            "         Staff" +
            "      </a>" +
            "      <a id='contact-list-custom' class='item contact-list-menu' onclick='populateCustomContactList(this)'>" +
                "      Custom list <span class='list-name-con'></span>" +
            "      </a>" +
            "    </div>" +


            "</div> " +
            "</div>" +
            "<div class='w3-col l9 m8 s12'>" +

            div({add: "<div class='w3-row'>" +
                    "<div class='w3-col l5 m5 s12'>" +
                    DrawSearch({method:"populateContactList"}).outerHTML +
                    "</div>" +
                    "<div class='w3-col l7 m7 s12 l-align-r'>" +
                    "<div class='ui buttons'>" +
                    "<button class='ui sleak blue button' onclick='launchAddContact()'>Add Contact</button>" +
                    "<button class='ui sleak basic button' onclick='launchCustomList()'>New custom list</button>" +
                    "</div>" +
                    "</div></div>", class:'l-margin-b-2'}).outerHTML +
                    "<h3 class='sleak' style='margin: 0px; font-weight: normal;'><span class='list-name-con'></span></h3>" +

            DrawTable(["Name", "Contact info", "Action"],
                {GroupAction:[{Text:"Add to custom list",Method:"addGroupContacttoList"},
                        {Text:"Remove from custom list",Method:"removeGroupContactfromList"},{Text:"Delete",Method:"ConfirmGroupContactDelete"}]}).outerHTML +


            "</div></div></div>",
        class:"l-pad-2 s-pad-1"});

    $(".ui.dropdown").dropdown();

    populateContactList();
}

function DrawMessagesTemplate()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/paperplane.png' style='width: 45px; margin-top: 10px;'> Message Template" +
        "</h3>" +
        "</div>" +
    "<div class='l-pad-2 s-pad-1'>" +
    "<button class='ui blue sleak fluid button' onclick='launchCustomList()'>Create custom list</button>" +
    "</div>" +
    "</div>");

    _page({add:
            "<div class='l-width-l' style='margin: auto;'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m5 s12'>" +
            "<div class='widget w3-card l-width-l m-width-xl curve l-margin-t-6'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s6 l-pad-3 align-c' style='border-bottom: 1px solid whitesmoke; border-right: 1px solid whitesmoke;'>" +
            "<h1 id='email-count-con' class='sleak blue-text'>0</h1>" +
            "<h6 class='sleak'>Emails</h6>" +
            "</div>" +
            "<div class='w3-col l6 m6 s6 l-pad-3 align-c' style='border-bottom: 1px solid whitesmoke;'>" +
            "<h1 id='sms-count-con' class='sleak blue-text'>0</h1>" +
            "<h6 class='sleak'>SMS</h6>" +
            "</div>" +
            "</div>" +
            "<div class='pad-1'>" +
            "<h6 class='sleak' style='color: dimgray; text-align: center;'>Schedules and events</h6> " +
            "<br/>" +
            "<label>0%</label> " +
            "<div class='ui blue tiny progress'>" +
            "<div class='bar'></div>" +
            "</div> " +
            "<label>0%</label> " +
            "<div class='ui blue tiny progress'>" +
            "<div class='bar'></div>" +
            "</div> " +
            "<label>0%</label> " +
            "<div class='ui blue tiny progress'>" +
            "<div class='bar'></div>" +
            "</div> " +
            "</div>" +
            "</div> " +
            "</div>" +
            "<div class='w3-col l8 m7 s12'>" +

            div({add: "<div class='w3-row'>" +
                    "<div class='w3-col l5 m5 s12'>" +
                    DrawSearch({method:"populateReceivedMessages"}).outerHTML +
                    "</div>" +
                    "<div class='w3-col l7 m7 s12 l-align-r'>" +
                    "<div class=''>" +
                    "<a href='#messaging/add-message-template'><button class='ui sleak blue-back button'>New Template</button></a>" +
                    "</div>" +
                    "</div></div>", class:'l-margin-b-2'}).outerHTML +

            "<div id='table-body' class=''>" +


            "</div> " +
            "<div class='w3-row widget w3-card curve' style='margin-top: 5px;'>" +

            "<div class='w3-col l2 m1 s12 l-pad-2 s-pad-1' style='border-right: 1px solid lightgray;'>" +
            "<div class='ui icon top left pointing dropdown button'>" +
            "<i class='wrench blue icon'></i>" +
            "<div class='menu'>" +
            "<div class='header'>Group Action</div>" +
            "</div>" +
            "</div>" +
            "</div>" +

            "<div class='w3-col l2 m3 s12 l-pad-2 s-pad-1' style=''>" +
            "<div id='perpage' class='ui inline dropdown' style='margin-top: 10px;'>" +
            "<div class='text sleak'> 25</div>" +
            "<i class='dropdown icon'></i>" +
            "<div class='menu'>" +
            "<div class='header'>Show per page</div>" +
            "<div class='active item' data-text='25'>25</div>" +
            "<div class='item' data-text='50'>50</div>" +
            "<div class='item' data-text='100'>100</div>" +
            "<div class='item' data-text='200'>200</div>" +
            "<div class='item' data-text='300'>300</div>" +
            "<div class='item' data-text='400'>400</div>" +
            "<div class='item' data-text='500'>500</div>" +
            "</div>" +
            "</div>" +
            "</div> " +

            "<div class='w3-col l8 m7 s12 l-pad-2 s-pad-1'>" +
            "      <div id='pages' class='ui right floated pagination tiny compact menu'>" +
            "      </div>" +
            "</div> " +

            "</div>" +
            "</div></div></div>",
        class:"l-pad-2 s-pad-1"});

    $(".ui.dropdown").dropdown();

    populateMessageTemplate();
}

function DrawAddMessagesTemplate()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/email.png' style='width: 45px; margin-top: 10px;'>Email Template" +
        "</h3>" +
        "</div>" +
    "<div class='l-pad-2 s-pad-1'>" +
    "<a href='#messaging/message-template' class='ui blue sleak fluid button'>Message Templates</button>" +
    "</div>" +
    "</div>");
    
    _page({add:"<div class='l-width-9' style='margin: auto;'> " +
            "<div class='ui secondary  menu'>" +
            "  <a class='item active'>" +
            "    <i class='blue at icon'></i> Email template" +
            "  </a>" +
            "  <a href='#messaging/add-sms-template' class='item'>" +
            "    <i class='blue open mobile icon'></i> SMS Template" +
            "  </a>" +
            "</div>" +
            "<input id='messageid' type='hidden' value=''/>" +
            "<input id='email-status' type='hidden' value='true'/>",
        class:"l-pad-2 s-pad-1"});

    _page({add:"<div class='l-width-9' style='margin: auto;'> " +
            "<div class='w3-col l8 m8 s12'>" +
            "<div class='widget w3-card pad-2 l-width-xl m-width-l curve margin-b-1'>" +
            "<div class='ui fluid input'>" +
            "<input id='email-title' class='wix-textbox' placeholder='Message Title'/>" +
            "</div> " +
            "</div>" +
            "<div class='widget w3-card pad-2 l-width-xl m-width-l curve'>" +
            "<div style='margin-bottom: 10px;'>" +
            "<div class='ui buttons'>" +
            "<button class='ui basic compact small sleak button'>Import html template</button> " +
            "</div> " +
            "</div>" +
            "<div class='ui fluid right labeled input'>" +
            "<input id='email-from' class='wix-textbox' placeholder='From Email'/>" +
            "<label id='email-domain-con' class='ui label'></label> " +
            "</div> " +
            "<div class='ui fluid labeled input' style='margin-top: 10px;'>" +
            "<label class='ui sleak label'>From Name</label>" +
            "<input id='email-from-name' class='wix-textbox' placeholder='' type='text'/>" +
            "</div> " +
            "<div class='ui fluid labeled input' style='margin-top: 10px;'>" +
            "<label class='ui sleak label'>Reply To</label>" +
            "<input id='email-reply-to' class='wix-textbox' placeholder='' type='text'/>" +
            "</div> " +
            "<div class='ui fluid input' style='margin-top: 10px;'>" +
            "<input id='email-subject' class='wix-textbox' placeholder='Subject' type='text'/>" +
            "</div> " +
            "<div class='ui form' style='margin-top: 10px;'>" +
            "<div class='field'>" +
            "<textarea id='email-body'></textarea>" +
            "</div> " +
            "</div> " +
            "<div style='margin-top: 10px;'>" +
            "<button id='email-attachment-btn' class='ui green-back   icon button' onclick=\"getElement('email-attachment-file').click()\"><i class='linkify icon'></i></button>" +
            "<input id='email-attachment-file' type='file' style='display: none;' onchange=''/> " +
            "<input id='email-attachment' type='hidden' value=''/> " +
            "<label id='email-attachment-txt'>Click to add attachment</label>" +
            "</div> " +
            "<div style='margin-top: 10px;'>" +
            "<button id='email-template-btn' class='ui blue-back sleak button' onclick='saveEmailTemplate()'><i class='save icon'></i> Save</button> " +
            "</div> " +
            "</div> " +
            "</div> " +
            "<div class='w3-col l4 m4 s12'>" +
            "<div class='widget w3-card curve'>" +

            "<div class='pad-1'>" +
            "<h6 class='sleak'>Message Tags</h6>" +
            "<p>Use these message tags to customize messages with users data. " +
            "Click <a href='' target='_blank'>here</a> to learn more about message tags</p>" +
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
            "<h6 class='m-tag'>{lodge-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total number of lodging </h6>" +
            "<h6 class='m-tag'>{food-order-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total food ordered </h6>" +
            "<h6 class='m-tag'>{pastry-order-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total pastry ordered </h6>" +
            "<h6 class='m-tag'>{laundry-order-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total laundry ordered </h6>" +
            "<h6 class='m-tag'>{pool-order-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total pool side ordering </h6>" +
            "<h6 class='m-tag'>{lodge-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User's deficit for lodging </h6>" +
            "<h6 class='m-tag'>{food-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's deficit for food orders </h6>" +
            "<h6 class='m-tag'>{drinks-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's deficit for drinks order </h6>" +
            "<h6 class='m-tag'>{pastries-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's deficit for patry orders </h6>" +
            "<h6 class='m-tag'>{laundry-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total deficit for laundry orders </h6>" +
            "<h6 class='m-tag'>{pool-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total deficit for pool orders </h6>" +
            "<h6 class='m-tag'>{total-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users to total deficit </h6>" +
            "<h6 class='m-tag'>{last-lodged}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The last time the user lodged </h6>" +
            "</div> " +
            "</div> " +
            "</div>" +
            "</div>",
        class:"w3-row l-pad-2 s-pad-1"});


    $(".ui.dropdown").dropdown();

    InitEditor(getElement("email-body"));

    $("#email-domain-con").html("@"+location.hostname.toString());
}

function DrawAddSMSTemplate()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/phone.png' style='width: 45px; margin-top: 10px;'>SMS Template" +
        "</h3>" +
        "</div>" +
    "<div class='l-pad-2 s-pad-1'>" +
    "<a href='#messaging/message-template' class='ui blue sleak fluid button'>Message Templates</button>" +
    "</div>" +
    "</div>");

    _page({add:"<div class='l-width-9' style='margin: auto;'> " +
            "<div class='ui secondary  menu'>" +
            "  <a href='#messaging/add-message-template' class='item'>" +
            "    <i class='blue at icon'></i> Email template" +
            "  </a>" +
            "  <a class='item active'>" +
            "    <i class='blue open mobile icon'></i> SMS Template" +
            "  </a>" +
            "</div>" +
            "<input id='messageid' type='hidden' value=''/>" +
            "<input id='sms-status' type='hidden' value='true'/>",
        class:"l-pad-2 s-pad-1"});

    _page({add:"<div class='l-width-9' style='margin: auto;'> " +
            "<div class='w3-col l8 m8 s12'>" +
            "<div class='widget w3-card pad-2 l-width-xl m-width-l curve margin-b-1'>" +
            "<div class='ui fluid input'>" +
            "<input id='sms-title' class='wix-textbox' placeholder='Message Title'/>" +
            "</div> " +
            "</div>" +
            "<div class='widget w3-card pad-2 l-width-xl m-width-l curve'>" +
            "<div class='ui fluid labeled input' style='margin-top: 10px;'>" +
            "<label class='ui sleak label'>From Name</label>" +
            "<input id='sms-from-name' class='wix-textbox' placeholder='' type='text'/>" +
            "</div> " +

            "<div class='ui form' style='margin-top: 10px;'>" +
            "<div class='field'>" +
            "<textarea class='wix-textbox' rows='3' placeholder='SMS body' id='sms-body'></textarea>" +
            "</div> " +
            "</div> " +
            "<div style='margin-top: 10px;'>" +
            "<button id='sms-template-btn' class='ui blue-back sleak button' onclick='saveSMSTemplate()'><i class='save icon'></i> Save</button> " +
            "</div> " +
            "</div> " +
            "</div> " +
            "<div class='w3-col l4 m4 s12'>" +
            "<div class='widget curve'>" +

            "<div class='pad-1 w3-card'>" +
            "<h6 class='sleak'>Message Tags</h6>" +
            "<p>Use these message tags to customize messages with users data. " +
            "Click <a href='' target='_blank'>here</a> to learn more about message tags</p>" +
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
            "<h6 class='m-tag'>{lodge-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total number of lodging </h6>" +
            "<h6 class='m-tag'>{food-order-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total food ordered </h6>" +
            "<h6 class='m-tag'>{pastry-order-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total pastry ordered </h6>" +
            "<h6 class='m-tag'>{laundry-order-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total laundry ordered </h6>" +
            "<h6 class='m-tag'>{pool-order-count}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total pool side ordering </h6>" +
            "<h6 class='m-tag'>{lodge-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User's deficit for lodging </h6>" +
            "<h6 class='m-tag'>{food-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's deficit for food orders </h6>" +
            "<h6 class='m-tag'>{drinks-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's deficit for drinks order </h6>" +
            "<h6 class='m-tag'>{pastries-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's deficit for patry orders </h6>" +
            "<h6 class='m-tag'>{laundry-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total deficit for laundry orders </h6>" +
            "<h6 class='m-tag'>{pool-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total deficit for pool orders </h6>" +
            "<h6 class='m-tag'>{total-deficit}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users to total deficit </h6>" +
            "<h6 class='m-tag'>{last-lodged}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The last time the user lodged </h6>" +
            "</div> " +
            "</div> " +
            "</div>" +
            "</div>",
        class:"w3-row l-pad-2 s-pad-1"});

    $(".ui.dropdown").dropdown();
}

function DrawReminders()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/network_file.png' style='width: 45px; margin-top: 10px;'>Message Schedular" +
        "</h3>" +
        "</div>" +
    "<div class='l-pad-2 s-pad-1'>" +
    "<a href='#messaging/message-template' class='ui blue sleak fluid button'>Message Templates</button>" +
    "</div>" +
    "</div>");

    _page({add:
            "<div style='margin: auto;'>" +

            div({add: "<div class=''>" +
                    "<div class='l-align-r'>" +
                    "<div class=''>" +
                    "<a href='#messaging/new-schedule'><button class='ui sleak blue-back button'>New Schedule</button></a>" +
                    "<a href='#messaging/new-event-listener'><button class='ui sleak blue-back button'>New Event</button></a>" +
                    "</div>" +
                    "</div></div>", class:'l-margin-b-2'}).outerHTML +

            "<div class='w3-row'>" +
            "<div class='w3-col l2 m2 s12'>" +
            "<div class='widget l-width-xl m-width-l w3-card l-margin-t-9 curve'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l12 m12 s12 l-pad-3 align-c' style=''>" +
            "<h1 id='schedule-count-con' class='sleak blue-text' style='margin-top: 50px;'>0</h1>" +
            "<h6 class='sleak'>Schedules</h6>" +
            "</div>" +
            "<div class='w3-col l12 m12 s12 l-pad-3 align-c'>" +
            "<h1 id='event-count-con' class='sleak blue-text'>0</h1>" +
            "<h6 class='sleak'>Events</h6>" +
            "</div>" +
            "</div>" +
            "<div class='pad-1 align-c'>" +

            "<span class='chart' id='completed-schedule' data-percent='0' data-scale-color='#ffb400'><span class='percent'></span></span>" +

            "</div>" +
            "<div class='pad-1'>" +
            "<h6 class='sleak' style='color: dimgray; text-align: center; font-weight: bold;'>Executed schedules</h6> " +
            "</div>" +
            "<br/>" +

            "</div> " +
            "</div>" +
            "<div class='w3-col l5 m5 s12'>" +

            "<div class='pad-1 l-width-xl'>" +
            "<h3 class='sleak' style='font-weight: bold; color: dimgray;'>" +
            "<i class='calendar blue alternate outline icon'></i>Schedules</h3>" +
            "<div class='ui secondary pointing menu'>" +
            "  <a id='user-schedule-tab' class='active schedule-tab item' onclick='switchScheduleTab(this)'>" +
            "     <i class='user circle blue-text icon'></i> User schedules" +
            "  </a>" +
            "  <a id='system-schedule-tab' class='schedule-tab item' onclick='switchScheduleTab(this)'>" +
            "     <i class='microchip green-text icon'></i> System Schedules" +
            "  </a>" +
            "</div>" +
            "</div>" +

            "<div id='schedule-table' class='l-width-xl m-width-l'>" +
            "</div> " +

            "<div class='w3-row widget curve w3-card l-width-xl' style='margin-top: 5px;'>" +

            "<div class='w3-col l2 m3 s3 pad-1' style=''>" +
            "<div id='schedule-perpage' class='ui inline dropdown' style='margin-top: 10px;'>" +
            "<div class='text sleak'> 25</div>" +
            "<i class='dropdown icon'></i>" +
            "<div class='menu'>" +
            "<div class='header'>Show per page</div>" +
            "<div class='active item' data-text='25'>25</div>" +
            "<div class='item' data-text='50'>50</div>" +
            "<div class='item' data-text='100'>100</div>" +
            "</div>" +
            "</div>" +
            "</div> " +

            "<div class='w3-col l10 m9 s9 pad-1'>" +
            "      <div id='schedule-pages' class='ui right floated pagination tiny compact menu'>" +
            "      </div>" +
            "</div> " +

            "</div>" +


            "</div>" +
            "<div class='w3-col l5 m5 s12'>" +


            "<div class='pad-1'>" +
            "<h3 class='sleak' style='font-weight: bold; color: dimgray;'>" +
            "<i class='code blue icon'></i>Events</h3>" +
            "<div class='ui secondary pointing menu'>" +
            "  <a id='user-event-tab' class='active event-tab item' onclick='switchEventTab(this)'>" +
            "     <i class='user circle blue-text icon'></i> User events" +
            "  </a>" +
            "  <a id='system-event-tab' class='event-tab item' onclick='switchEventTab(this)'>" +
            "     <i class='microchip green-text icon'></i> System events" +
            "  </a>" +
            "</div>" +
            "</div>" +


            "<div id='event-table'>" +
            "</div>" +


            "<div class='w3-row widget curve w3-card' style='margin-top: 5px;'>" +

            "<div class='w3-col l2 m3 s3 pad-1' style=''>" +
            "<div id='event-perpage' class='ui inline dropdown' style='margin-top: 10px;'>" +
            "<div class='text sleak'> 25</div>" +
            "<i class='dropdown icon'></i>" +
            "<div class='menu'>" +
            "<div class='header'>Show per page</div>" +
            "<div class='active item' data-text='25'>25</div>" +
            "<div class='item' data-text='50'>50</div>" +
            "<div class='item' data-text='100'>100</div>" +
            "</div>" +
            "</div>" +
            "</div> " +

            "<div class='w3-col l10 m9 s9 pad-1'>" +
            "      <div id='event-pages' class='ui right floated pagination tiny compact menu'>" +
            "      </div>" +
            "</div> " +

            "</div>" +

            "</div>" +


            "</div>" +
            "</div>",
        class:"l-pad-2 s-pad-1"});

    $(".ui.dropdown").dropdown();

    populateSchedule();
    populateEvent();
}

function DrawNewEventListner()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/network_file.png' style='width: 45px; margin-top: 10px;'>New Event" +
        "</h3>" +
        "</div>" +
    "<div class='l-pad-2 s-pad-1'>" +
    "<a href='#messaging/schedular' class='ui blue sleak fluid button'>Message Schedulers</button>" +
    "</div>" +
    "</div>");

    let d = new Date();

    let days = "<option value='0'>Every day</option>";
    for(let i = 0; i < 31; i++)
    {
        days += "<option value='"+(i + 1)+"'>"+(i + 1)+"</option>";
    }


    let years = "<option value='0'>Every year</option>";
    for(let j = d.getFullYear(); j < (d.getFullYear() + 10); j++)
    {
        years += "<option value='"+j+"'>"+j+"</option>";
    }


    _page({add:"<br><br><div class='l-width-7' style='margin: auto;'>" +
        "<div class='widget w3-card pad-2'>"+

            "<input id='event-id' type='hidden' value=''/>" +
            "<input id='event-status' type='hidden' value='true'/>" +

            "<br/><br/>" +
            "<div class='l-width-8' style='margin: auto;'>"+

            "<h2 class='sleak' style='font-weight: bold; color: dimgray;'>"+
                "<i class='code icon'></i> Create an event listener" +
            "</h2>" +

            "<label class='sleak' style='font-weight: bold; color: dimgray;'>Event title</label>" +
            "<div class='ui fluid input'><input id='event-title' class='wix-textbox' type='text' placeholder='Event title'/>"+
            "</div><br/>" +

            "<label class='sleak' style='font-weight: bold; color: dimgray;'>Select message</label>" +
            "<select id='message-template' class='ui search fluid wix-select dropdown'>"+
            "<option value=''>Select message</option>" +
            "</select><br/><br/><br/>" +

            "<label class='sleak' style='font-weight: bold; color: dimgray;'>Select event</label>" +
            "<select id='event' class='ui fluid wix-select dropdown'>"+
            "<option value='101'>Guest checked in</option>" +
            "<option value='102'>Guest checked out</option>" +
            "<option value='103'>Guest stays 25%</option>" +
            "<option value='104'>Guest stays 50%</option>" +
            "<option value='105'>Guest stays 75%</option>" +
            "<option value='106'>Guest stays 100%</option>" +
            "<option value='107'>Saff loggedIn</option>" +
            "<option value='108'>Customer loggedIn</option>" +
            "<option value='109'>Customer creates account</option>" +
            "<option value='201'>Staff is added</option>" +
            "<option value='202'>Staff signs in at the hotel</option>" +
            "<option value='203'>Its users birthday</option>" +
            "<option value='204'>Customer completes reservation</option>"+
            "<option value='205'>Customer cancels reservation</option>" +
            "<option value='206'>1 day to Customers arrival</option>" +
            "<option value='207'>2 days to customers arrival</option>" +
            "<option value='208'>1 week to customers arrival</option>" +
            "<option value='209'>Coupon is used</option>" +
            "<option value='301'>Staff logs out</option>" +
            "<option value='302'>Customer logs out</option>" +
            "<option value='303'>User sends message</option>" +
            "<option value='304'>Guest makes order while lodging</option>" +
            "<option value='305'>User Completes review</option>" +
            "<option value='306'>Customer updates info</option>" +
            "<option value='307'>Guest orders food while lodging</option>" +
            "<option value='308'>Guest orders drink while lodging</option>" +
            "<option value='309'>Guest orders pastry while lodging</option>" +
            "<option value='401'>Guest orders laundry while lodging</option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "<option></option>" +
            "</select>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l8 m8 s12'>" +
            "<div class='ui fluid labeled input' style='margin-top: 3px;'>" +
            "<label class='ui sleak blue w3-card-4 label'>Delay for</label>" +
            "<label class='ui sleak blue label' style='border-radius: 0px;'>Hour(s)</label>" +
            "<input id='delay-hours' class='wix-textbox' type='text' value='00' style='border-radius: 0px;'/>" +
            "<label class='ui blue-back sleak label' style='border-radius: 0px;'>Min(s)</label>" +
            "<input id='delay-mins' class='wix-textbox' type='text' value='00' style='border-radius: 0px 4px 4px 0px;'/>" +
            "</div>" +
            "</div>" +
            "</div><br/><br/><br/>" +


            "<h3 class='sleak' style='font-weight: bold;'><i class='address book outline icon'></i>Add Contacts</h5>" +

            "<label class='ui fluid input'><input id='context-user' class='filled-in' type='checkbox'/>"+
            "<span class='sleak' style='color: dimgray; font-weight: bold;'>"+
            "Send to the user in the event context</span></label><br/>" +

            "<div id='contact-list-con'></div>" +

            "<div class='ui fluid blue buttons'>"+
            "<button id='guest-contact-btn' class='ui button' onclick='addContact(this)'><i class='group icon'></i> Guests</button>" +
            "<button id='customers-contact-btn' class='ui button' onclick='addContact(this)'><i class='user circle icon'></i> Customers</button>" +
            "<button id='staff-contact-btn' class='ui button' onclick='addContact(this)'><i class='male icon'></i> Staff</button>" +
            "</div>" +
            "<div class='ui fluid blue buttons' style='margin-top: 3px;'>"+
            "<button id='subscribers-contact-btn' class='ui button' onclick='addContact(this)'><i class='at icon'></i> Subscribers</button>" +
            "<button id='contactus-contact-btn' class='ui button' onclick='addContact(this)'><i class='open envelope icon'></i> Contact form</button>" +
            "<button id='custom-contact-btn' class='ui button' onclick='addContact(this)'><i class='list icon'></i> Custom list</button>" +
            "</div>"+
            "<div class='ui form' style='margin-top: 3px;'>"+
            "<div class='field'>" +
            "<textarea id='contact-collection' rows='2' class='wix-textbox' style='font-family: Lato;'"+
            "placeholder='Add contact list seprated by a coma (,) or a new line'>"+
            "</textarea>" +
            "</div>" +
            "</div>" +

            "<br/><br/>" +


            "<br/><br/>" +
            "<button id='event-btn' class='ui blue sleak button' onclick='saveEvent()'>Save event</button>" +

            "</div>" +
            "<br/>" +
        "</div>" +
        "</div>", class:"l-margin-t-9 l-margin-b-6"});

    $(".ui.dropdown").dropdown();

    list({ con: getElement("message-template"), job: 'list message template', all: true });

    let arg = getArg(1);

    if(arg != null)
    {
        loadEditEvent(arg);
    }
}

function DrawEventDetails()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/network_file.png' style='width: 45px; margin-top: 10px;'>Event details" +
        "</h3>" +
        "</div>" +
    "<div class='l-pad-2 s-pad-1'>" +
    "<a href='#messaging/schedular' class='ui blue sleak fluid button'>Message Schedulers</button>" +
    "</div>" +
    "</div>");

    _page({add:div({add:"<br><div id='event-data-con-1' class='l-margin-t-5 widget pad-2 curve w3-card'></div>",
            class:"l-width-7", style:"margin: auto;"})});

    _page({add:div({add:"<div id='event-data-con-2' class='l-margin-t-t widget pad-2 curve w3-card'></div>",
            class:"l-width-7", style:"margin: auto;"})});

    _page({add:div({add:"<div id='event-data-con-3' class='l-margin-t-t margin-b-7 widget pad-2 curve w3-card'></div>",
            class:"l-width-7", style:"margin: auto; padding-bottom: 20px;"})});

    let arg = getArg(1);
    if(arg != null)
    {
        loadEventData(arg);
    }
    else
    {
        localtion.hash = "#reminders";
        ShowModal("Invalid event id");
    }
}

function DrawScheduleDetail()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/network_file.png' style='width: 45px; margin-top: 10px;'>Schedule details" +
        "</h3>" +
        "</div>" +
    "<div class='l-pad-2 s-pad-1'>" +
    "<a href='#messaging/schedular' class='ui blue sleak fluid button'>Message Schedulers</button>" +
    "</div>" +
    "</div>");

    _page({add:div({add:"<br><div id='event-data-con-1' class='l-margin-t-5 widget pad-2 curve w3-card'></div>",
            class:"l-width-7", style:"margin: auto;"})});

    _page({add:div({add:"<div id='event-data-con-2' class='l-margin-t-t widget pad-2 curve w3-card'></div>",
            class:"l-width-7", style:"margin: auto;"})});

    _page({add:div({add:"<div id='event-data-con-3' class='l-margin-t-t margin-b-7 widget pad-2 curve w3-card'></div>",
            class:"l-width-7", style:"margin: auto; padding-bottom: 20px;"})});

    let arg = getArg(1);
    if(arg != null)
    {
        loadScheduleData(arg);
    }
    else
    {
        localtion.hash = "#reminders";
        ShowModal("Invalid schedule id");
    }
}

function DrawSchedule()
{
    $("#menu").html("<div class='l-width-9' style='margin: auto;'> " +
        "<div class='l-pad-2 s-pad-1'>" +
        "<h3 class='ui header' style='font-family: varela_roundregular; color: dimgray;'>" +
        "<img src='"+phpvars.CDN_URL+"/images/network_file.png' style='width: 45px; margin-top: 10px;'>New Schedule" +
        "</h3>" +
        "</div>" +
    "<div class='l-pad-2 s-pad-1'>" +
    "<a href='#messaging/schedular' class='ui blue sleak fluid button'>Message Schedulers</button>" +
    "</div>" +
    "</div>");

    let d = new Date();

    let days = "<option value='0'>Every day</option>";
    for(let i = 0; i < 31; i++)
    {
        days += "<option value='"+(i + 1)+"'>"+(i + 1)+"</option>";
    }


    let years = "<option value='0'>Every year</option>";
    for(let j = d.getFullYear(); j < (d.getFullYear() + 10); j++)
    {
        years += "<option value='"+j+"'>"+j+"</option>";
    }


    _page({add:"<br><br><div class='l-width-7' style='margin: auto;'>" +
        "<div class='widget w3-card pad-2'>"+

            "<input id='schedule-id' type='hidden' value=''/>" +
            "<input id='schedule-status' type='hidden' value='true'/>" +

            "<br/><br/>" +
            "<div class='l-width-8' style='margin: auto;'>"+

            "<h2 class='sleak' style='font-weight: bold; color: dimgray;'>"+
                "<i class='calendar outline alternate icon'></i> Schedule a message for later" +
            "</h2>" +

            "<label class='sleak' style='font-weight: bold; color: dimgray;'>Schedule title</label>" +
            "<div class='ui fluid input'><input id='schedule-title' class='wix-textbox' type='text' placeholder='Schedule title'/></div><br/><br/>" +

            "<label class='sleak' style='font-weight: bold; color: dimgray;'>Select message</label>" +
            "<select id='message-template' class='ui search fluid wix-select dropdown'>"+
            "<option value=''>Select message</option>" +
            "</select><br/><br/><br/>" +

            "<div class='ui fluid action labeled input'>" +
            "<label class='ui blue w3-card-4 sleak label'>Set year</label>" +
            "<label class='ui sleak blue-back label' style='border-radius: 0px;'>Year</label>" +
            "<select id='schedule-year' class='ui wix-select compact selection dropdown'>"+years+"</select>" +
            "</div><br/>" +

            "<div class='ui fluid action labeled input'>" +
            "<label class='ui blue w3-card-4 sleak label'>Set Day / Month</label>" +
            "<label class='ui sleak blue-back label' style='border-radius: 0px;'>Day</label>" +
            "<select id='schedule-day' class='ui wix-select compact selection dropdown'>"+days+"</select>" +
            "<label class='ui sleak blue-back label' style='border-radius: 0px;'>Month</label>" +
            "<select id='schedule-month' class='ui wix-select compact selection dropdown'>" +
            "<option value='0'>Every month</option>" +
            "<option value='1'>January</option>" +
            "<option value='2'>Febuary</option>" +
            "<option value='3'>March</option>" +
            "<option value='4'>April</option>" +
            "<option value='5'>May</option>" +
            "<option value='6'>June</option>" +
            "<option value='7'>July</option>" +
            "<option value='8'>August</option>" +
            "<option value='9'>September</option>" +
            "<option value='10'>October</option>" +
            "<option value='11'>November</option>" +
            "<option value='12'>December</option>" +
            "</select>" +
            "</div><br/>" +


            "<div class='w3-row'>" +
            "<div class='w3-col l7 m8 s12'>" +
            "<div class='ui fluid action labeled input' style='margin-top: 3px;'>" +
            "<label class='ui sleak blue w3-card-4 label'>Set time</label>" +
            "<select id='schedule-hour' class='ui wix-select compact selection dropdown'>" +
            "<option>01</option>" +
            "<option>02</option>" +
            "<option>03</option>" +
            "<option>04</option>" +
            "<option>05</option>" +
            "<option>06</option>" +
            "<option>07</option>" +
            "<option>08</option>" +
            "<option>09</option>" +
            "<option>10</option>" +
            "<option>11</option>" +
            "<option>12</option>" +
            "</select>" +
            "<label class='ui blue-back label' style='border-radius: 0px;'>:</label>" +
            "<input id='schedule-min' class='wix-textbox' type='text' value='00' style='border-radius: 0px;'/>" +
            "<select id='schedule-gmt' class='ui wix-select compact selection dropdown'>" +
            "<option>am</option>" +
            "<option>pm</option>" +
            "</select>" +
            "</div>" +
            "</div>" +
            "</div><br/><br/><br/>" +

            "<label class='ui fluid input'><input id='indefinit-exec' class='filled-in' type='checkbox' onChange='execNumChanged(this)'/>" +
            "<span>Run indefinitly</span></label>" +
            "<div id='exec-count-con' class='ui labeled input'>"+
            "<label class='ui blue w3-card-4 label'>Number of executions</label>" +
            "<input id='exec-count' class='wix-textbox' type='number'min='1' value='1'/>" +
            "</div><br/><br/><br/>" +

            "<label class='ui fluid input'><input id='auto-delete' class='filled-in' type='checkbox'/><span>Automatically delete on completion</span></label><br/>" +


            "<h3 class='sleak' style='font-weight: bold;'><i class='address book outline icon'></i>Add Contacts</h3>" +

            "<div id='contact-list-con'></div>" +

            "<div class='ui fluid blue buttons'>"+
            "<button id='guest-contact-btn' class='ui button' onclick='addContact(this)'><i class='group icon'></i> Guests</button>" +
            "<button id='customers-contact-btn' class='ui button' onclick='addContact(this)'><i class='user circle icon'></i> Customers</button>" +
            "<button id='staff-contact-btn' class='ui button' onclick='addContact(this)'><i class='male icon'></i> Staff</button>" +
            "</div>" +
            "<div class='ui fluid blue buttons' style='margin-top: 3px;'>"+
            "<button id='subscribers-contact-btn' class='ui button' onclick='addContact(this)'><i class='at icon'></i> Subscribers</button>" +
            "<button id='contactus-contact-btn' class='ui button' onclick='addContact(this)'><i class='open envelope icon'></i> Contact form</button>" +
            "<button id='custom-contact-btn' class='ui button' onclick='addContact(this)'><i class='list icon'></i> Custom list</button>" +
            "</div>"+
            "<div class='ui form' style='margin-top: 3px;'>"+
            "<div class='field'>" +
            "<textarea id='contact-collection' rows='2' class='wix-textbox' style='font-family: Lato;'"+
            "placeholder='Add contact list seprated by a coma (,) or a new line'>"+
            "</textarea>" +
            "</div>" +
            "</div>" +

            "<br/><br/>" +


            "<br/><br/>" +
            "<button id='schedule-btn' class='ui blue sleak button' onclick='saveSchedule()'>Save schedule</button>" +

            "</div>" +
            "<br/>" +
        "</div>" +
        "</div>", class:"l-margin-t-9 l-margin-b-6"});

        $(".ui.dropdown").dropdown();

        list({ con: getElement("message-template"), job: 'list message template', all: true });

    let arg = getArg(1);
    if(arg != null)
    {
        loadEditSchedule(arg);
    }
}

function DrawReceivedMessage()
{
    _page({ add: pageTop({ icon: "envelope open", text: "Received Messages" }), clear: true });

    _page({add:
            "<div class='l-width-l' style='margin: auto;'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<div class='widget l-width-l m-width-xl curve l-margin-t-6'>" +
            "<div class='pad-2' style='border-radius: 4px 4px 0px 0px;'>" +
            "<h3 style='display: inline; font-weight: normal; color: dimgray;' class='sleak'>" +
            "<i class='open envelope icon'></i> Received Messages" +
            "</h3>" +
            "</div><hr style='margin: 0px;'/> " +
            "<div class=''>" +
            "<div id='all-messge-tab' class='minor-menu message-menu-item active pad-1' onclick='selectMessagetab(this)'>" +
            "<label id='all-count-con' class='ui circular label' style='float: right;'>0</label>" +
            "<label><small><i class='blue circle icon'></i></small> All</label>" +
            "</div>" +
            "<div id='unresolved-messge-tab' class='minor-menu message-menu-item pad-1' onclick='selectMessagetab(this)'>" +
            "<label id='unresolved-count-con' class='ui circular label' style='float: right;'>0</label>" +
            "<label><small><i class='red circle icon'></i></small> Unresolved</label>" +
            "</div>" +
            "<div id='resolved-messge-tab' class='minor-menu message-menu-item pad-1' onclick='selectMessagetab(this)'>" +
            "<label id='resolved-count-con' class='ui circular label' style='float: right;'>0</label>" +
            "<label><small><i class='green circle icon'></i></small> Resolved</label>" +
            "</div>" +
            "<div id='stared-messge-tab' class='minor-menu message-menu-item pad-1' onclick='selectMessagetab(this)'>" +
            "<label id='stared-count-con' class='ui circular label' style='float: right;'>0</label>" +
            "<label><small><i class='yellow circle icon'></i></small> Stared</label>" +
            "</div>" +

            "</div> " +
            "</div> " +
            "</div>" +
            "<div class='w3-col l9 m8 s12'>" +

            div({add:DrawSearch({method:"populateReceivedMessages"}).outerHTML, class:'l-margin-b-2'}).outerHTML +

            "<div class='w3-row widget curve'>" +
            "<div class='w3-col l2 m1 s12 l-pad-2 s-pad-1' style='border-right: 1px solid transparent;'>" +
            "<label class=''><input id='main-sel' type='checkbox'  onchange='CheckAll(this)'/><span>SN</span></label> " +
            "</div> " +
            "<div class='w3-col l1 m1 s12 l-pad-2 s-pad-1' style=''>" +
            "<div class='align-c'><i class='star icon' style='color: lightgray;'></i></div> " +
            "</div> " +
            "<div class='w3-col l2 m2 s12 l-pad-2 s-pad-1'>" +
            "<div class=''><label class='status'>Status</label></div> " +
            "</div> " +
            "<div class='w3-col l5 m4 s12 l-pad-2 s-pad-1'>" +
            "<div class=''><label>Body</label></div> " +
            "</div> " +
            "<div class='w3-col l2 m2 s12 l-pad-2 s-pad-1'>" +
            "<div class='align-r'><label>Delete</label></div> " +
            "</div> " +
            "</div>" +
            "<div id='table-body' class=''>" +


            "</div> " +
            "<div class='w3-row widget curve' style='margin-top: 5px;'>" +

            "<div class='w3-col l2 m1 s12 l-pad-2 s-pad-1' style='border-right: 1px solid transparent;'>" +
            "<div class='ui icon top left pointing dropdown button'>" +
            "<i class='wrench blue icon'></i>" +
            "<div class='menu'>" +
            "<div class='header'>Group Action</div>" +
            "<div class='item' onclick='ConfirmGroupMessageDelete()'>Delete</div>" +
            "</div>" +
            "</div>" +
            "</div>" +

            "<div class='w3-col l2 m3 s12 l-pad-2 s-pad-1' style=''>" +
            "<div id='perpage' class='ui inline dropdown' style='margin-top: 10px;'>" +
            "<div class='text sleak'> 25</div>" +
            "<i class='dropdown icon'></i>" +
            "<div class='menu'>" +
            "<div class='header'>Show per page</div>" +
            "<div class='active item' data-text='25'>25</div>" +
            "<div class='item' data-text='50'>50</div>" +
            "<div class='item' data-text='100'>100</div>" +
            "<div class='item' data-text='200'>200</div>" +
            "<div class='item' data-text='300'>300</div>" +
            "<div class='item' data-text='400'>400</div>" +
            "<div class='item' data-text='500'>500</div>" +
            "</div>" +
            "</div>" +
            "</div> " +

            "<div class='w3-col l8 m7 s12 l-pad-2 s-pad-1'>" +
            "      <div id='pages' class='ui right floated pagination tiny compact menu'>" +
            "      </div>" +
            "</div> " +

            "</div>" +
            "</div></div></div>",
        class:"l-pad-2 s-pad-1"});

    $(".ui.dropdown").dropdown();

    populateReceivedMessages();
}

function DrawOpenMessage()
{
    _page({ add: pageTop({ icon: "open envelope", text: "Read Message" }), clear: true });

    _page({add:
            "<div class='l-width-l' style='margin: auto;'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l4 m5 s12'>" +
            "<div id='message-info' class='widget w3-card l-pad-2 s-pad-1 l-width-l m-width-xl curve'>" +


            "</div> " +
            "</div>" +
            "<div class='w3-col l8 m7 s12'>" +
            "<div id='message-body' class='w3-row widget w3-card curve l-pad-2 s-pad-1'>" +

            "</div>" +
            "</div></div></div>",
        class:"l-pad-2 s-pad-1"});

    $(".ui.dropdown").dropdown();

    let arg = getArg();
    if(arg == null)
    {
        location.hash = "#received-message";
        ShowModal("Invalid message");
    }
    else
    {
        loadMessage(arg);
    }
}

function DrawRoomAvailablitCalendar()
{
    // build url
    let baseUrl = phpvars.AVALIABILITY_MODULE + phpvars.property;

    // loader body
    let loaderBody = '<div class="loader-wrapper loader-wrapper-fixed">\
    <div class="loader"></div>\
    </div>';

    // add loader
    document.querySelector('#property-page').innerHTML = loaderBody;

    // create iframe
    let iframe = document.createElement('iframe');
    iframe.id = 'avaliability-iframe';
    iframe.src = baseUrl;

    // add to property page
    document.querySelector('#property-page').appendChild(iframe);

    // work with contentWindow
    iframe.contentWindow.onload = function()
    {
        // hide loader
        let loader = document.querySelector('.loader-wrapper');

        // do we have something
        if (loader !== null)
        {
            // hide children
            setTimeout(()=>{

                [].forEach.call(loader.children, (child, index)=>{
                    setTimeout(()=>{
                        child.style.opacity = '0';
                    }, Math.abs(((index + 1) * 200)));
                });

                // hide loader
                setTimeout(()=>{
                    loader.style.opacity = '0';

                    setTimeout(()=>{
                        loader.style.display = 'none';
                    }, 500);
                }, 300);

            }, 200);
        }
    };
}