
    function DrawHome()
    {
        let propertyBtn = "                             <a href='#home'>" +
            "                            <div id='properties-listing' class='pad-2 partner-inner-menu'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='building green icon'></i> Properties\n" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                        <small style='color: dimgray;'>Listed properties</small>" +
            "                                    </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                            </a>" ;

        let vehicleBtn =
            "                        <a href='#home/cars-list'>" +
            "                            <div id='car-listing' class='pad-2 partner-inner-menu'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='taxi yellow icon'></i> Vehicles" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                        <small style='color: dimgray;'>Listed vehicles</small>" +
            "                                    </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                           </a>";

        let leaseBtn =
            "                           <a href='#home/leasing'>" +
            "                            <div id='lease-listing' class='pad-2 partner-inner-menu'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='bed red icon'></i> Leased properties" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                       <small  style='color: dimgray;'>My Investments</small>" +
            "                                   </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                           </a>";

        let shownProperty = false, shownVehicle = false, shownLease = false;

        let rangement = "";

        if(Number($("#listed-property").val()) === 1)
        {
            rangement += propertyBtn;
            shownProperty = true;
        }
        else if(Number($("#listed-vehicle").val()) === 1)
        {
            rangement += vehicleBtn;
            shownVehicle = true;
        }
        else if(Number($("#leased").val()) === 1)
        {
            rangement += leaseBtn;
            shownLease = true;
        }
        else
        {
            rangement += propertyBtn;
            shownProperty = true;
        }

        rangement += "<hr style='margin-top: 10px; margin-bottom: 10px;'/>";

        if((!shownProperty) && (Number($("#listed-vehicle").val()) === 1) && (Number($("#leased").val()) !== 1))
        {
            rangement += propertyBtn;
            shownProperty = true;
        }
        else if((Number($("#listed-vehicle").val()) === 1) && (!shownVehicle))
        {
            rangement += vehicleBtn;
            shownVehicle = true;
        }
        else if((Number($("#leased").val()) === 1) && (!shownLease))
        {
            rangement += leaseBtn;
            shownLease = true;
        }
        else
        {
            if(!shownVehicle)
            {
                rangement += vehicleBtn;
                shownVehicle = true;
            }
        }

        rangement += "<hr style='margin-top: 10px; margin-bottom: 10px;'/>";

        if(!shownProperty)
        {
            rangement += propertyBtn;
            shownProperty = true;
        }
        else if(!shownVehicle)
        {
            rangement += vehicleBtn;
            shownVehicle = true;
        }
        else if(!shownLease)
        {
            rangement += leaseBtn;
            shownLease = true;
        }

        $("#page-1").html(
            "           <div id='page-top-1' class='w3-row' style='border-bottom: 1px solid rgb(230,230,230);'>" +
            "                <div class='w3-col l6 m6 s12 pad-1'>" +
            "                   <a href='"+phpvars.TRIP_MATA_URL+"/listing'>" +
            "                       <button class='ui compact blue button' style='font-family: quicksandregular; cursor: pointer;'>" +
            "                           <i class='plus icon'></i> List a property / vehicle" +
            "                       </button>" +
            "                   </a>" +
            "                </div>" +
            "                <div class='w3-col l6 m6 s12 align-r pad-1'>" +


            "                       <h3 style='margin-right: 20px; display: inline;" +
            "                           font-family: Lato; font-weight: normal;'>" +
            "                           " +
            "                       </h3>" +

            "                   <div class='ui top right pointing dropdown' style='margin-top: 7px;'>" +
            "                       <h4 style='margin-right: 10px; display: inline;" +
            "                           font-family: Lato; font-weight: normal;'>" +
            "                           <i class='user circle icon'></i> " +
                                        $("#customer-name").val()+" "+$("#customer-sname").val() +
            "                           <i class='caret down icon'></i>" +
            "                       </h4>" +
            "                       <div class='menu'>" +
            "                           <a href='home' class='item'>Home</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='account' class='item'><i class='user circle icon'></i> Travellers account</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='#settings' class='item'><i class='cog icon'></i> Settings</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='#sign-out' class='item'><i class='sign out icon'></i> Log out</a>" +
            "                       </div>" +
            "                   </div>" +
            "                </div>" +
            "            </div>" +
            "            <div id='page-top-2' class='pad-2' style='background-color: rgb(249,249,249); border-bottom: 1px solid rgb(230,230,230);'>" +
            "                <div>" +
            "                    <h3 id='listing-tab-detail' style='color: dimgray; font-family: quicksandregular; font-weight: normal;'>" +
            "                        <i class='building blue icon'></i> My Listing" +
            "                    </h3>" +
            "                </div>" +
            "            </div>" +
            "            <div class='w3-row'>" +
            "                <div class='w3-col l3 m3 s12''>" +
            "                    <div id='partner-menu-2' class='l-width-9' style='background-color: rgb(249,249,249); border-right: 1px solid rgb(210,210,210);'>" +
            "                        <div class='pad-2'>" +

                                            rangement +

            "                        </div>" +
            "                    </div>" +
            "                </div>" +
            "                <div class='w3-col l9 m9 s12'>" +
            "                    <div id='page-gig' style='overflow-y: scroll;'>" +

            "                    </div>" +
            "                </div>" +
            "           </div>"
            );

            let x = $(document).outerHeight() - (($("#page-top-1").outerHeight() + $("#page-top-2").outerHeight()) + 3);
            $("#partner-menu-2").height(x);
            $("#page-gig").height(x);

            let arg = getArg();

            let homeTag = "properties";

            if(arg === "cars-list")
            {
                $("#car-listing").addClass("active");
                $("#listing-tab-detail").html("<i class='taxi blue icon'></i> Vehicles");
                drawVehicleListing();
            }
            else if(arg === "leasing")
            {
                $("#lease-listing").addClass("active");
                $("#listing-tab-detail").html("<i class='money blue icon'></i> Leased properties");
                drawLeasing();
            }
            else
            {
                $("#properties-listing").addClass("active");
                $("#listing-tab-detail").html("<i class='globe blue icon'></i> My Listing");
                drawPropertiesListing();
            }

            $(".ui.dropdown").dropdown();
    }

    function DrawWallet()
    {
        $("#page-1").html(
            "           <div id='page-top-1' class='w3-row' style='border-bottom: 1px solid rgb(230,230,230);'>" +
            "                <div class='w3-col l6 m6 s12 pad-2'>" +
            "                    <h3 style='font-family: varela_roundregular; color: dimgray; font-weight: normal;'>" +
            "                        <i class='money blue icon'></i> My wallet" +
            "                    </h3>" +
            "                </div>" +
            "                <div class='w3-col l6 m6 s12 align-r pad-1'>" +


            "                       <h3 style='margin-right: 20px; display: inline;" +
            "                           font-family: Lato; font-weight: normal;'>" +
            "                           <i class='bell blue-text icon'></i> " +
            "                       </h3>" +

            "                   <div class='ui top right pointing dropdown' style='margin-top: 7px;'>" +
            "                       <h4 style='margin-right: 10px; display: inline;" +
            "                           font-family: Lato; font-weight: normal;'>" +
            "                           <i class='user circle icon'></i> " +
            $("#customer-name").val()+" "+$("#customer-sname").val() +
            "                           <i class='caret down icon'></i>" +
            "                       </h4>" +
            "                       <div class='menu'>" +
            "                           <a href='home' class='item'>Home</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='account' class='item'><i class='user circle icon'></i> Travellers account</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='#settings' class='item'><i class='cog icon'></i> Settings</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='#sign-out' class='item'><i class='sign out icon'></i> Log out</a>" +
            "                       </div>" +
            "                   </div>" +


            "                </div>" +
            "            </div>" +
            "            <div class='w3-row'>" +
            "                <div class='w3-col l2 m3 s12''>" +
            "                    <div id='partner-menu-2' class='' style='background-color: rgb(249,249,249); border-right: 1px solid rgb(210,210,210);'>" +
            "                             <a href='#wallet'>" +
            "                            <div id='wallet-activities' class='pad-2 partner-inner-menu' " +
            "                                   style='border-radius: 0px; border-bottom:  1px solid lightgray;'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='usd green icon'></i> Balance" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                        <small style='color: dimgray;'>See remaining balance and activities on your account</small>" +
            "                                    </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                            </a>" +
            "                        <a href='#wallet/fund'>" +
            "                            <div id='wallet-funding' class='pad-2 partner-inner-menu'" +
            "                                   style='border-radius: 0px; border-bottom:  1px solid lightgray;'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='arrow down yellow icon'></i> Fund Wallet" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                        <small style='color: dimgray;'>Add money to your wallet, enable quick " +
            "                                       and easy payments on centurion</small>" +
            "                                    </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                           </a>" +
            "                        <a href='#wallet/withdraw'>" +
            "                            <div id='wallet-withdraw' class='pad-2 partner-inner-menu' " +
            "                                   style='border-radius: 0px; border-bottom:  1px solid lightgray;'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='arrow up yellow icon'></i> Withdraw Fund" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                        <small style='color: dimgray;'>Send cash from your wallet to your bank account</small>" +
            "                                    </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                           </a>" +
            "                    </div>" +
            "                </div>" +
            "                <div class='w3-col l10 m9 s12'>" +
            "                    <div style='overflow-y: scroll;'>" +
            "                       <div id='wallet-page-gig'>" +


            "                       </div>" +
            "                    </div>" +
            "                </div>" +
            "           </div>"
        );

        let x = $(document).outerHeight() - ($("#page-top-1").outerHeight() + 2);
        $("#partner-menu-2").height(x);
        $("#wallet-page-gig").height(x);

        let arg = getArg();

        let homeTag = "activities";

        if(arg === "fund")
        {
            $("#wallet-funding").addClass("active");
            drawFundWallet();
        }
        else if(arg === "withdraw")
        {
            $("#wallet-withdraw").addClass("active");
            drawWalletWithdraw()
        }
        else
        {
            $("#wallet-activities").addClass("active");
            drawWalletBalance();
        }
        $(".ui.dropdown").dropdown();
    }
    
    function DrawAnalytics()
    {
        $("#page-1").html(
            "           <div id='page-top-1' class='w3-row' style='border-bottom: 1px solid rgb(230,230,230);'>" +
            "                <div class='w3-col l6 m6 s12 pad-2'>" +
            "                    <h3 style='font-family: varela_roundregular; color: dimgray; font-weight: normal;'>" +
            "                        <i class='pie chart blue icon'></i> Business analytics" +
            "                    </h3>" +
            "                </div>" +
            "                <div class='w3-col l6 m6 s12 align-r pad-1'>" +

            "                       <h3 style='margin-right: 20px; display: inline;" +
            "                           font-family: Lato; font-weight: normal;'>" +
            "                           <i class='bell blue-text icon'></i> " +
            "                       </h3>" +

            "                   <div class='ui top right pointing dropdown' style='margin-top: 7px;'>" +
            "                       <h4 style='margin-right: 10px; display: inline;" +
            "                           font-family: Lato; font-weight: normal;'>" +
            "                           <i class='user circle icon'></i> " +
            $("#customer-name").val()+" "+$("#customer-sname").val() +
            "                           <i class='caret down icon'></i>" +
            "                       </h4>" +
            "                       <div class='menu'>" +
            "                           <a href='home' class='item'>Home</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='account' class='item'><i class='user circle icon'></i> Travellers account</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='#settings' class='item'><i class='cog icon'></i> Settings</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='#sign-out' class='item'><i class='sign out icon'></i> Log out</a>" +
            "                       </div>" +
            "                   </div>" +


            "                </div>" +
            "            </div>" +
            "            <div class='w3-row'>" +
            "                <div class='w3-col l2 m3 s12''>" +
            "                    <div id='partner-menu-2' class='' style='background-color: rgb(249,249,249); border-right: 1px solid rgb(210,210,210);'>" +
            "                             <a href='#analytics'>" +
            "                            <div id='customers-analytics' class='pad-2 partner-inner-menu' " +
            "                                   style='border-radius: 0px; border-bottom:  1px solid lightgray;'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='users green icon'></i> Customers" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                        <small style='color: dimgray;'>See visits and conversion rates</small>" +
            "                                    </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                            </a>" +
            "                        <a href='#analytics/finance'>" +
            "                            <div id='finance-analytics' class='pad-2 partner-inner-menu'" +
            "                                   style='border-radius: 0px; border-bottom:  1px solid lightgray;'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='usd yellow icon'></i> Finance" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                        <small style='color: dimgray;'>  " +
            "                                           See overall financial data" +
            "                                       </small>" +
            "                                    </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                           </a>" +
            "                        <a href='#analytics/general'>" +
            "                            <div id='general-analytics' class='pad-2 partner-inner-menu' " +
            "                                   style='border-radius: 0px; border-bottom:  1px solid lightgray;'>" +
            "                                <div>" +
            "                                    <h5 style='font-family: varela_roundregular; color: dimgray;'>" +
            "                                        <i class='pie chart red icon'></i> General analytics" +
            "                                    </h5>" +
            "                                    <h6 style='margin: 0; font-family: Lato;'>" +
            "                                        <small style='color: dimgray;'>General system data</small>" +
            "                                    </h6>" +
            "                                </div>" +
            "                            </div>" +
            "                           </a>" +
            "                    </div>" +
            "                </div>" +
            "                <div class='w3-col l10 m9 s12'>" +
            "                    <div id='page-gig' style='overflow-y: scroll;'>" +
            "                       <div>" +


            "                       </div>" +
            "                    </div>" +
            "                </div>" +
            "           </div>"
        );

        let x = $(document).outerHeight() - ($("#page-top-1").outerHeight() + 2);
        $("#partner-menu-2").height(x);
        $("#page-gig").height(x);

        let arg = getArg();

        let homeTag = "customers";

        if(arg === "finance")
        {
            $("#finance-analytics").addClass("active");
        }
        else if(arg === "general")
        {
            $("#general-analytics").addClass("active");
        }
        else
        {
            $("#customers-analytics").addClass("active");
        }
        $(".ui.dropdown").dropdown();
    }

    function DrawSettings()
    {
        $("#page-1").html(
            "           <div id='page-top-1' class='w3-row' style='border-bottom: 1px solid rgb(230,230,230);'>" +
            "                <div class='w3-col l6 m6 s12 pad-2'>" +
            "                    <h3 style='font-family: varela_roundregular; color: dimgray; font-weight: normal;'>" +
            "                        <i class='cog blue icon'></i> Settings" +
            "                    </h3>" +
            "                </div>" +
            "                <div class='w3-col l6 m6 s12 align-r pad-1'>" +


            "                       <h3 style='margin-right: 20px; display: inline;" +
            "                           font-family: Lato; font-weight: normal;'>" +
            "                           <i class='bell blue-text icon'></i> " +
            "                       </h3>" +

            "                   <div class='ui top right pointing dropdown' style='margin-top: 7px;'>" +
            "                       <h4 style='margin-right: 10px; display: inline;" +
            "                           font-family: Lato; font-weight: normal;'>" +
            "                           <i class='user circle icon'></i> " +
            $("#customer-name").val()+" "+$("#customer-sname").val() +
            "                           <i class='caret down icon'></i>" +
            "                       </h4>" +
            "                       <div class='menu'>" +
            "                           <a href='home' class='item'>Home</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='account' class='item'><i class='user circle icon'></i> Travellers account</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='#settings' class='item'><i class='cog icon'></i> Settings</a>" +
            "                           <div class='divider'></div>" +
            "                           <a href='#sign-out' class='item'><i class='sign out icon'></i> Log out</a>" +
            "                       </div>" +
            "                   </div>" +


            "                </div>" +
            "            </div>" +
            "            <div class='w3-row'>" +
            "                <div class='w3-col l3 m3 s12'>" +
            "                    <div id='partner-menu-2' class='' style='background-color: rgb(249,249,249); border-right: 1px solid rgb(210,210,210);'>" +
            "                       <div class='l-pad-2 s-pad-1'>" +
        "                               <div class='ui secondary fluid vertical menu'>" +
            "                               <a id='general-settings-set' href='#settings' class='item' style='font-family: Lato;'>General settings</a>" +
            "                               <a id='notification-set' href='#settings/notification' class='item' style='font-family: Lato;'>Notifications</a>" +
            "                               <a id='profile-set' href='#settings/profile' class='item' style='font-family: Lato;'>My Profile</a>" +
            "                               <a id='faq-set' href='#settings/faq' class='item' style='font-family: Lato;'>Faq</a>" +
            "                               <a id='ticket-set' href='#settings/ticket' class='item' style='font-family: Lato;'>Support ticket</a>" +
            "                               <a id='contact-us-set' href='#settings/contact-us' class='item' style='font-family: Lato;'>Contact us</a>" +
            "                           </div>" +
            "                       </div>" +
            "                    </div>" +
            "                </div>" +
            "                <div class='w3-col l9 m9 s12'>" +
            "                    <div id='page-gig' style='overflow-y: scroll;'>" +

            "                       <div id='page-top-2' class='pad-2' style='background-color: rgb(249,249,249); border-bottom: 1px solid rgb(230,230,230);'>" +
            "                           <div>" +
            "                               <h3 id='settings-tab-detail' style='color: dimgray; font-family: quicksandregular; font-weight: normal;'>" +
            "                                   <i class='cogs blue icon'></i> General settings" +
            "                               </h3>" +
            "                           </div>" +
            "                       </div>" +
            "                           <div id='settings-main-page' style='overflow-y: auto;'>" +
            "                           </div>" +
            "                       </div>" +
            "                </div>" +
            "           </div>");

        let x = $(document).outerHeight() - ($("#page-top-1").outerHeight() + 2);
        $("#partner-menu-2").height(x);
        $("#page-gig").height(x);

        let arg = getArg();

        let homeTag = "properties";

        if(arg === "bank-account")
        {
            $("#bank-account-set").addClass("active");
            $("#settings-tab-detail").html("<i class='money blue icon'></i> Bank Account");
            drawBankAccount();
        }
        else if(arg === "notification")
        {
            $("#notification-set").addClass("active");
            $("#settings-tab-detail").html("<i class='bell blue icon'></i> Notifications");
            drawNotification();
        }
        else if(arg === "profile")
        {
            $("#profile-set").addClass("active");
            $("#settings-tab-detail").html("<i class='user circle blue icon'></i> My profile");
            drawProfile();
        }
        else if(arg === "password")
        {
            $("#password-set").addClass("active");
            $("#settings-tab-detail").html("<i class='shield blue icon'></i> Change password");
            drawChangePassword();
        }
        else if(arg === "blog")
        {
            $("#blog-set").addClass("active");
            $("#settings-tab-detail").html("<i class='list blue icon'></i> Our Blog");
            drawBlog();
        }
        else if(arg === "faq")
        {
            $("#faq-set").addClass("active");
            $("#settings-tab-detail").html("<i class='question circle blue icon'></i> Frequently Asked Questions");
            drawFaq();
        }
        else if(arg === "ticket")
        {
            $("#ticket-set").addClass("active");
            $("#settings-tab-detail").html("<i class='ticket blue icon'></i> Support ticket");
            drawTicket();
        }
        else if(arg === "contact-us")
        {
            $("#contact-us-set").addClass("active");
            $("#settings-tab-detail").html("<i class='headphones blue icon'></i> Contact us");
            drawContactUs();
        }
        else if(arg === "new-ticket")
        {
            $("#ticket-set").addClass("active");
            $("#settings-tab-detail").html("<i class='ticket blue icon'></i> Support ticket");
            DrawNewTicket();
        }
        else if(arg === "open-ticket")
        {
            $("#ticket-set").addClass("active");
            $("#settings-tab-detail").html("<i class='ticket blue icon'></i> Support ticket");
            DrawOpenTicket();
        }
        else
        {
            $("#general-settings-set").addClass("active");
            $("#settings-tab-detail").html("<i class='cogs blue icon'></i> General settings");
            drawGeneralSettings();
        }

        $(".ui.dropdown").dropdown();
    }

    function drawPropertiesListing()
    {
        $("#page-gig").html(
            "<div class='l-width-xl' style='margin-top: 10px;'> " +
            "<table class='ui structured padded table' style='border: none;'>" +
            "<tbody id='properties-body'></tbody>" +
            "</table>" +
            "</div>");
        
        $("#properties-body").html(tableLoader(5));

        postJson(api+"/myproperties", function(data, status){
            $("#properties-body").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    if(d.data.length === 0)
                    {
                        $("#page-gig").html(
                            "<div class='align-c'>" +
                            "<div style='margin-top: 90px;'>" +
                            "<img src='images/property.png' style='width: 100px;'/><br/>" +
                            "<h2 style='color: rgb(230,230,230); font-family: quicksandregular; font-weight: normal;'>" +
                            "You have no listed properties yet" +
                            "</h2><br/>" +
                            "<a href='"+phpvars.TRIP_MATA_URL+"/listing#property-type' target='_blank' onclick='return showIframe(event);'> " +
                            "<button class='ui basic sleak button' data-url='yes' style='font-weight: bold;'>List a property</button>" +
                            "</a> " +
                            "</div>" +
                            "</div>");
                    }
                    else
                    {
                        for(let i = 0; i < d.data.length; i++)
                        {
                            let row = document.createElement("tr");
                            row.setAttribute('data-href', 'property/'+d.data[i].Id);

                            let td1 = document.createElement("td");
                            td1.className = 'image-wrapper';
                            td1.innerHTML = "<img src='"+phpvars.FILES_CDN+"/"+d.data[i].Banner+"' style='width: 80px; border-radius: 4px;'/>";

                            let td2 = document.createElement("td");
                            td2.innerHTML = "<h6 style='font-family: varela_roundregular; text-transform:uppercase;'>"+d.data[i].Name+"</h6>" +
                            "<span style='color: silver;'>"+d.data[i].Cityname+",</span><br/>" +                
                            "<span style='color: silver;'>"+d.data[i].Statename+"</span><br/>";

                            let td3 = document.createElement("td");
                            td3.innerHTML = 
                                "<span style='color: silver;'> Room(s):</span> <span class=''>"+d.data[i].Rooms+"</span><br/>" +
                                "<span style='margin-top: 10px;'><span style='color: silver;'>Rating: </span> "+d.data[i].Rating+"</span><br/>";

                            let td4 = document.createElement("td");
                            td4.innerHTML = "" +
                                "<span style='color: silver;'> Reservation(s):</span> <span class=''>"+d.data[i].Reservations+"</span><br/>" +
                                "<span style='color: silver;'> View(s):</span> <span class=''>"+d.data[i].Views+"</span><br/>";

                            let td5 = document.createElement("td");
                            td5.innerHTML = (d.data[i].Approved ? "<span class='green-back status'>Approved</span>": "<span class='yellow-back status'>Pending approval</span>");

                            row.appendChild(td1);
                            row.appendChild(td2);
                            row.appendChild(td3);
                            row.appendChild(td4);
                            row.appendChild(td5);

                            document.getElementById("properties-body").appendChild(row);

                            // load href
                            loadDataHref(row);
                        }
                    }
                }
                else
                {
                    $("#page-gig").html(
                        "<div class='align-c'>" +
                        "<div style='margin-top: 90px;'>" +
                        "<h1 class='ui header'><i class='bug icon' style='color: rgba(255,0,0,0.1);'></i></h1><br/>" +
                        "<h3 style='color: silver; font-family: quicksandregular; font-weight: normal;'>" +
                        d.message +
                        "</h3><br/>" +
                        "<button class='ui basic sleak button' style='font-weight: bold;' " +
                        "onclick='drawPropertiesListing()'>" +
                        "Try again</button>" +
                        "</div>" +
                        "</div>");
                }
            }
            else
            {
                $("#page-gig").html(
                    "<div class='align-c'>" +
                    "<div style='margin-top: 90px;'>" +
                    "<h1 class='ui header'><i class='signal icon' style='color: rgba(255,0,0,0.1);'></i></h1><br/>" +
                    "<h3 style='color: silver; font-family: quicksandregular; font-weight: normal;'>" +
                    "Connection error. Check your connection" +
                    "</h3><br/>" +
                    "<button class='ui basic sleak button' style='font-weight: bold;' " +
                    "onclick='drawPropertiesListing()'>" +
                    "Try again</button>" +
                    "</div>" +
                    "</div>");
            }
        },{});
    }

    function drawVehicleListing()
    {
        $("#page-gig").html(
            "<div class='l-width-xl' style='margin-top: 10px;'> " +
            "<table class='ui structured padded table' style='border: none;'>" +
            "<tbody id='vehicles-body'></tbody>" +
            "</table>" +
            "</div>");
        $("#vehicles-body").html(tableLoader(5));

        postJson(api+"/myvehicles", function(data, status){
            $("#vehicles-body").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    if(d.data.length === 0)
                    {
                        $("#page-gig").html(
                            "<div class='align-c'>" +
                            "<div style='margin-top: 100px;'>" +
                            "<img src='"+phpvars.CDN_URL+"images/taxi.png' style='width: 100px;'/><br/>" +
                            "<h2 style='color: rgb(230,230,230); font-family: quicksandregular; font-weight: normal;'>" +
                            "You have no leased vehicle yet" +
                            "</h2><br/>" +
                            "<a href='"+phpvars.TRIP_MATA_URL+"/listing#select-type' target='_blank' onclick='return showIframe(event);'> " +
                            "<button class='ui basic sleak button' data-url='yes' style='font-weight: bold;'>Start listing</button>" +
                            "</a> " +
                            "</div>" +
                            "</div>");
                    }
                    else
                    {
                        for(let i = 0; i < d.data.length; i++)
                        {
                            let row = document.createElement("tr");
                            row.setAttribute('data-href', (d.data[i].Approved ? 'vehicle/'+d.data[i].Id : ''));

                            let td1 = document.createElement("td");
                            td1.className = 'image-wrapper';
                            td1.innerHTML = "<img src='"+phpvars.FILES_CDN+"/"+d.data[i].Image1+"' style='width: 80px; border-radius: 4px;'/>";

                            let td2 = document.createElement("td");
                            td2.innerHTML = "<h6 style='margin-bottom: 15px;'>"+
                                d.data[i].Color+" "+d.data[i].Brand+" "+d.data[i].Model+" "+d.data[i].Type+"</h6>"+
                                "<span style='color: silver;'>"+d.data[i].Cityname+",</span><br/>" +                
                                "<span style='color: silver;'>"+d.data[i].Statename+"</span><br/>";

                            let td3 = document.createElement("td");
                            td3.innerHTML =
                                "<span><span style='color: silver;'>Rating: </span>"+d.data[i].Rating+"</span>";

                            let td4 = document.createElement("td");
                            td4.innerHTML = "<span style='color: silver;'> Seats:</span> <span class=''>"+d.data[i].Seats+"</span><br/>" +
                                "<span style='color: silver;'> Views(s):</span> <span class=''>"+d.data[i].Views+"</span><br/>";

                            let td5 = document.createElement("td");
                            td5.innerHTML = (d.data[i].Approved ? "<span class='green-back status'>Approved</span>": "<span class='yellow-back status'>Pending approval</span>");


                            row.appendChild(td1);
                            row.appendChild(td2);
                            row.appendChild(td3);
                            row.appendChild(td4);
                            row.appendChild(td5);

                            document.getElementById("vehicles-body").appendChild(row);

                            // load href
                            loadDataHref(row);
                        }

                    }
                }
                else
                {
                    $("#page-gig").html(
                        "<div class='align-c'>" +
                        "<div style='margin-top: 90px;'>" +
                        "<h1 class='ui header'><i class='bug icon' style='color: rgba(255,0,0,0.1);'></i></h1><br/>" +
                        "<h3 style='color: silver; font-family: quicksandregular; font-weight: normal;'>" +
                        d.message +
                        "</h3><br/>" +
                        "<button class='ui basic sleak button' style='font-weight: bold;' " +
                        "onclick='drawVehicleListing()'>" +
                        "Try again</button>" +
                        "</div>" +
                        "</div>");
                }
            }
            else
            {
                $("#page-gig").html(
                    "<div class='align-c'>" +
                    "<div style='margin-top: 90px;'>" +
                    "<h1 class='ui header'><i class='signal icon' style='color: rgba(255,0,0,0.1);'></i></h1><br/>" +
                    "<h3 style='color: silver; font-family: quicksandregular; font-weight: normal;'>" +
                    "Connection error. Check your connection" +
                    "</h3><br/>" +
                    "<button class='ui basic sleak button' style='font-weight: bold;' " +
                    "onclick='drawVehicleListing()'>" +
                    "Try again</button>" +
                    "</div>" +
                    "</div>");
            }
        },{});
    }

    function drawLeasing()
    {
        $("#page-gig").html(
            "<div class='l-width-xl' style='margin-top: 10px;'> " +
            "<table class='ui structured padded table' style='border: none;'>" +
            "<tbody id='leasing-body'></tbody>" +
            "</table>" +
            "</div>");
        $("#leasing-body").html(tableLoader(5));

        postJson(api+"/mylease", function(data, status){
            $("#leasing-body").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    if(d.data.length === 0)
                    {
                        $("#page-gig").html(
                            "<div class='align-c'>" +
                            "<div style='margin-top: 90px;'>" +
                            "<img src='"+phpvars.CDN_URL+"images/lease.png' style='width: 100px;'/><br/>" +
                            "<h2 style='color: rgb(230,230,230); font-family: quicksandregular; font-weight: normal;'>" +
                            "You have no leased properties" +
                            "</h2><br/>" +
                            "<button class='ui basic sleak button' style='font-weight: bold;'>See our catalogue</button> " +
                            "<br/>" +
                            "<a href=''><h6>Learn more</h6></a>" +
                            "</div>" +
                            "</div>");
                    }

                    for(let i = 0; i < d.data.length; i++)
                    {
                        let row = document.createElement("tr");

                        let td1 = document.createElement("td");
                        td1.innerHTML = "<img src='"+phpvars.FILES_CDN+"/"+d.data[i].Banner+"' style='width: 80px; border-radius: 4px;'/>";

                        let td2 = document.createElement("td");
                        td2.innerHTML = "<h6 style='font-family: varela_roundregular;'>"+d.data[i].Name+"</h6>" +
                            (d.data[i].Approved ?
                                "<span class='green-back status'>Approved</span>" :
                                "<span class='yellow-back status'>Pending approval</span>" );

                        let td3 = document.createElement("td");
                        td3.innerHTML = "<span class=''>"+d.data[i].Cityname+"</span><br/>" +
                            "<span class=''>"+d.data[i].Statename+"</span><br/>" +
                            "<span class=''>"+d.data[i].Address+"</span><br/>" +
                            "<span style='margin-top: 10px;'><span style='color: silver;'>Rating: </span> "+d.data[i].Rating+"</span><br/>";

                        let td4 = document.createElement("td");
                        td4.innerHTML = "<span style='color: silver;'> Room(s):</span> <span class=''>0</span><br/>" +
                            "<span style='color: silver;'> Reservations(s):</span> <span class=''>0</span><br/>" +
                            "<span style='color: silver;'> Views(s):</span> <span class=''>0</span><br/>";

                        let td5 = document.createElement("td");
                        td5.innerHTML = (d.data[i].Approved ?
                            "<a href='property/"+d.data[i].Id+"'> " +
                            "<button class='ui basic circular icon button' style='margin-top: 20px;'>" +
                            "<i class='magic icon' title='canel request'></i> Manage" +
                            "</button>" +
                            "</a>" :
                            "<button class='ui basic circular disabled icon button' style='margin-top: 20px;'>" +
                            "<i class='magic icon' title='canel request'></i> Manage" +
                            "</button>");

                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);

                        document.getElementById("leasing-body").appendChild(row);
                    }
                }
                else
                {
                    $("#page-gig").html(
                        "<div class='align-c'>" +
                        "<div style='margin-top: 90px;'>" +
                        "<h1 class='ui header'><i class='bug icon' style='color: rgba(255,0,0,0.1);'></i></h1><br/>" +
                        "<h3 style='color: silver; font-family: quicksandregular; font-weight: normal;'>" +
                        d.message +
                        "</h3><br/>" +
                        "<button class='ui basic sleak button' style='font-weight: bold;' " +
                        "onclick='drawPropertiesListing()'>" +
                        "Try again</button>" +
                        "</div>" +
                        "</div>");
                }
            }
            else
            {
                $("#page-gig").html(
                    "<div class='align-c'>" +
                    "<div style='margin-top: 90px;'>" +
                    "<h1 class='ui header'><i class='signal icon' style='color: rgba(255,0,0,0.1);'></i></h1><br/>" +
                    "<h3 style='color: silver; font-family: quicksandregular; font-weight: normal;'>" +
                    "Connection error. Check your connection" +
                    "</h3><br/>" +
                    "<button class='ui basic sleak button' style='font-weight: bold;' " +
                    "onclick='drawPropertiesListing()'>" +
                    "Try again</button>" +
                    "</div>" +
                    "</div>");
            }
        },{});
    }

    function DrawSignOut()
    {

    }

    function drawGeneralSettings()
    {
        $("#settings-main-page").html(
            "<div class='l-width-xl' style='margin: auto;'> " +
            "<div id='error-pane' class='ui w3-row negative message pad-2 lift-1' style='display: none; margin-top: 10px;'>" +
            "<div class='w3-col l10 m10 s8'><h6 id='error-pane-text' class='sleak'></h6></div>" +
            "<div class='w3-col l2 m2 s4 align-r'>" +
            "<button class='ui negative sleak button' onclick=\"$('#error-pane').transition('drop out'); " +
            "populateMessageSettings()\">try again</button>" +
            "</div>" +
            "</div>" +


            "<div class='l-margin-t-2'>" +
            "<div class='w3-col l6 m6 s12'>" +

            "<h6 class='sleak' style='font-weight: bold;'><small>SMS Units</small></h6> " +
            "<div class='l-width-l w3-container w3-card widget pad-1 curve'>" +
            "<div class='w3-col l4 m6 s12'>" +
            "<div class='ui small statistics' style='margin-top: 20px;'>" +
            "<div class='statistic'>" +
            "<div id='sms-unti-con' class='value sleak'>0</div>" +
            "<div class='label sleak'><span class='settings-text'>Units</span></div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='w3-col l8 m6 s12'>" +
            "<div class=''>" +
            "<p class='sleak' style=''>" +
            "<span class='settings-text'>2 units is charged for every SMS sent by the system. </span>" +
            "<span class='settings-text'>Emailing is completely free</span></p>" +
            "<a id='buy_units_link' target='_blank'>" +
            "<button class='ui compact settings-control w3-button green button'>Buy Units</button>" +
            "</a>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +


            "<h6 class='sleak' style='font-weight: bold;'>" +
            "<small>" +
            "<i class='building green icon'></i> Bank Account Details" +
            "</small>" +
            "</h6> " +
            "<div class='l-width-l widget wix-textbox w3-card curve']>" +
            "<div class='pad-1 w3-container '>" +


                "<p class='sleak' style='line-height: 170%; color: dimgray;'>" +
                "<span class='settings-text'>For improved security, once your bank account info is set, it cannot be changed </span>" +
                "<span class='settings-text'>by you. To make changes, </span>" +
                "<span class='settings-text'>raise a ticket with the new information. </span>" +
                "</p>"  +

            "<div class='ui fluid input'>" +
            "<input id='bank' class='wix-textbox settings-control' type='text' " +
            "placeholder='Bank' value='"+$('#user-bank').val()+"' "
            +(($('#user-bank').val() != "") ? "disabled" : "")+"/>" +
            "</div>" +
            "<div class='ui fluid input' style='margin-top: 10px;'>" +
            "<input id='account-name' class='wix-textbox settings-control' type='text' " +
            "placeholder='Account name' value='"+$('#account-name').val()+"' " +
            (($('#account-name').val() != "") ? "disabled" : "")+"/>" +
            "</div>" +
            "<div class='ui fluid input' style='margin-top: 10px;'>" +
            "<input id='account-number' class='wix-textbox settings-control' type='text' " +
            "placeholder='Account number' value='"+$('#account-number').val()+"' " +
            (($('#account-number').val() != "") ? "disabled" : "")+"/>" +
            "</div>" +

            "<div id='account-btn-con'>" +
            ((($('#user-bank').val() != "") || ($('#account-name').val() != "") || ($('#account-number').val() != "")) ?
                "<button id='account-tck-btn' class='ui sleak basic button' style='margin-top: 10px;' " +
                "onclick=\"location.hash = '#settings/new-ticket'; changeBankDetails()\">" +
                "Raise change ticket" +
                "</button>" :

                "<button id='save-btn' class='ui sleak blue button' style='margin-top: 10px;' " +
                "onclick='saveBankDetails()'>" +
                "<i class='save icon'></i> Save" +
                "</button>") +
            "</div>" +


            "</div>" +
            "</div><br/>" +




            "<h6 class='sleak' style='font-weight: bold;'>" +
            "<small>" +
            "<i class='unlock green icon'></i> Change password" +
            "</small>" +
            "</h6> " +
            "<div class='l-width-l widget w3-card wix-textbox curve'>" +
            "<div class='pad-1 w3-container '>" +
            "<div class='ui fluid input' style='margin-top: 10px;'>" +
            "<input id='old-password' class='wix-textbox settings-control' type='password' " +
            "placeholder='Old password'/>" +
            "</div>" +
            "<div class='ui fluid input' style='margin-top: 10px;'>" +
            "<input id='new-password' class='wix-textbox settings-control' type='password' " +
            "placeholder='New password'/>" +
            "</div>" +
            "<div class='ui fluid input' style='margin-top: 10px;'>" +
            "<input id='confirm-password' class='wix-textbox settings-control' type='password' " +
            "placeholder='Confirm password'/>" +
            "</div>" +
            "<button id='pass-btn' class='ui blue sleak button' style='margin-top: 10px;' " +
            "onclick='savePassword()'>" +
            "Save password" +
            "</button>" +
            "</div>" +
            "</div><br/><br/>" +


            "</div>" +



            "<div class='w3-col l6 m6 s12'>" +
            "<h6 class='sleak' style='font-weight: bold;'><small>Low unit alert</small></h6> " +
            "<div class='w3-container w3-card widget pad-1 curve'>" +
            "<h6 class='sleak' style='color: dimgray;'>" +
            "<small>" +
            "<span class='settings-text'>Get notified when your sms units gets low to avoid delays </span>" +
            "<span class='settings-text'>in sending SMS </span></small></h6><br/> " +
            "<div class='ui small labeled input'>" +
            "<label class='ui blue sleak label'>Low point</label>" +
            "<input id='low-uint-point' class='wix-textbox settings-control' type='number' min='0' value='1' onchange='saveGeneralSettings(this)'/>" +
            "</div><br/><br/>" +
            "<h6 class='sleak' style='font-weight: bold; color: dimgray;'>" +
            "<small><span class='settings-text'>Phone number to notify</span></small>" +
            "</h6> " +
            "<div class='ui input'>" +
            "<input id='low-unit-phone' class='wix-textbox settings-control' type='text' placeholder='Phone number' onchange='saveGeneralSettings(this)'/>" +
            "</div>" +
            "</div>" +


            "<br/>" +
            "<h6 class='sleak' style='font-weight: bold;'><small>Handle unresolved message tags</small></h6> " +
            "<div class='w3-card widget curve'>" +
            "<div class='pad-t'>" +
            "<label>" +
            "<input id='remove-tag' class='with-gap settings-control' name='tag-handle' type='radio' onchange='saveGeneralSettings(this)'/>" +
            "<span><span class='settings-text'>Remove tag</span></span>" +
            "</label>" +
            "</div>" +
            "<hr style='margin: 0px;'/>" +
            "<div class='pad-t'>" +
            "<label>" +
            "<input id='leave-tag' class='with-gap settings-control' name='tag-handle' type='radio' onchange='saveGeneralSettings(this)'/>" +
            "<span><span class='settings-text'>Leave tag in place</span></span>" +
            "</label>" +
            "</div>" +
            "<hr style='margin: 0px;'/>" +
            "<div class='pad-t'>" +
            "<label>" +
            "<input id='cancel-tag' class='with-gap settings-control' name='tag-handle' type='radio' onchange='saveGeneralSettings(this)'/>" +
            "<span><span class='settings-text'>Don't send message</span></span>" +
            "</label>" +
            "</div>" +

            "</div>" +

            "</div>" +
            "</div>" +
            "</div>");
    }

    function saveBankDetails()
    {
        let request = {
            bank:$("#bank").val(),
            accountName:$("#account-name").val(),
            accountNumber:$("#account-number").val()
        };

        if(request.bank === "")
        {
            errorButton({btn:"save-btn", msg:"Bank is empty"});
        }
        else if(request.accountName === "")
        {
            errorButton({btn:"save-btn", msg:"Account name is empty"});
        }
        else if(request.accountNumber === "")
        {
            errorButton({btn:"save-btn", msg:"Account name is empty"});
        }
        else
        {
            loadingButton({btn:"save-btn"});
            postJson(api+"/savebank", function (data, status) {
                loadingButton({btn:"save-btn", loading: false});
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {
                        $("#save-btn").addClass("disabled positive");
                        $("#save-btn").html("<i class='check icon'></i> Saved");

                        setTimeout(function () {

                            $("#save-btn").removeClass("disabled positive");
                            $("#save-btn").html("<i class='save icon'></i> Save");

                            if(d.changeStatus === false)
                            {
                                $('#bank').prop('disabled', true);
                                $('#account-number').prop('disabled', true);
                                $('#account-name').prop('disabled', true);

                                $("#account-btn-con").html(
                                    "<button id='account-tck-btn' class='ui sleak basic button' style='margin-top: 10px;' " +
                                    "onclick='changeBankDetails()'>" +
                                    "Raise change ticket" +
                                    "</button>");
                            }
                        }, 3000);
                    }
                    else
                    {
                        errorButton({btn:"save-btn", msg:d.message});
                    }
                }
                else
                {
                    errorButton({btn:"save-btn", msg:"Connection error"});
                }
            }, request);
        }
    }

    function savePassword()
    {
        let request = {
            old:$("#old-password").val(),
            newpassword:$("#new-password").val(),
            confirmpassword: $("#confirm-password").val()
        };

        if(request.old === "")
        {
            errorButton({btn:"pass-btn", msg:"old password is required"});
        }
        else if(request.newpassword === "")
        {
            errorButton({btn:"pass-btn", msg:"invalid new password"});
        }
        else if(request.newpassword.length < 6)
        {
            errorButton({btn:"pass-btn", msg:"password is too short"});
        }
        else if(request.confirmpassword !== request.newpassword)
        {
            errorButton({btn:"pass-btn", msg:"password's don't match"});
        }
        else
        {
            loadingButton({btn:"pass-btn"});
            postJson(api+"/savepassword", function(data, status){
                loadingButton({btn:"pass-btn", loading:false});
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {
                        $("#old-password").val("");
                        $("#new-password").val("");
                        $("#confirm-password").val("");

                        $("#pass-btn").addClass("disabled positive");
                        $("#pass-btn").html("<i class='check icon'></i> Saved");

                        setTimeout(function () {
                            $("#pass-btn").removeClass("disabled positive");
                            $("#pass-btn").html("Save password");
                        }, 3000);
                    }
                    else
                    {
                        errorButton({btn:"pass-btn", msg:d.message});
                    }
                }
                else
                {
                    errorButton({btn:"pass-btn", msg:"connection error"});
                }
            }, request);
        }
    }

    function drawFaq()
    {
        $("#settings-main-page").html(
            "<div class='l-pad-2 s-pad-1'>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "</div>"
        );

        postJson(api+"/partner-faq", function (data, status) {
            $("#settings-main-page").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    let cat  = document.createElement("ul");
                    cat.style.margin = "0px";
                    cat.style.paddingLeft = "0px";
                    cat.className = "collapsible";

                    for(let i = 0; i < d.data.length; i++)
                    {
                        let li = document.createElement("li");
                        li.className = "faq-item";
                        li.style.display = "none";
                        li.style.listStyle = "none";
                        li.style.paddingLeft = "0px";
                        li.style.marginLeft = "0px";
                        li.innerHTML =
                            "<div class='collapsible-header'><h6 style='font-family: nunitoregular, serif;'>"+d.data[i].Question+"</h6></div>" +
                            "<div class='collapsible-body'><span><p style='line-height: 170%; font-size: 16px;'>"+d.data[i].Answer+"</p></span></div>";

                        cat.appendChild(li);
                    }
                    getElement("settings-main-page").appendChild(cat);

                    $(".faq-item").transition({animation: 'fade up in', duration: 800, interval: 200});
                    $('.collapsible').collapsible();
                }
                else
                {
                    $("#settings-main-page").html(
                        "<div style='margin-top: 50px;'>" +
                        "<div class='align-c'>" +
                        "<h1 class='ui header'><i class='ban icon' style='color: rgba(255,0,0,0.1);'></i></h1>" +
                        "<h3 style='font-family: varela_roundregular; color: silver;'>"+d.message+"</h3>" +
                        "<br/>" +
                        "<button class='ui basic sleak button' onclick='drawFaq()'>Try again</button>" +
                        "</div>" +
                        "</div>");
                }
            }
            else
            {
                $("#settings-main-page").html(
                    "<div style='margin-top: 50px;'>" +
                    "<div class='align-c'>" +
                    "<h1 class='ui header'><i class='ban icon' style='color: rgba(255,0,0,0.1);'></i></h1>" +
                    "<h3 style='font-family: varela_roundregular; color: silver;'>"+d.message+"</h3>" +
                    "<br/>" +
                    "<button class='ui basic sleak button' onclick='drawFaq()'>Try again</button>" +
                    "</div>" +
                    "</div>");
            }
        },{});
    }

    function drawBankAccount()
    {
        $("#settings-main-page").html(
            "<div class='w3-row' style='margin-top: 30px;'>" +
            "<div class='w3-col l4 m4 s12 l-pad-3 s-pad-1'>" +
            "<h3 class='sleak' style='color: dimgray;'>" +
            "<i class='money green icon'></i> Bank Account" +
            "</h3>" +
            "<p style='color: silver; font-family: Lato; line-height: 170%;'>" +
            "All withdrawals will be sent to the account detail below" +
            "</p>" +
            "</div> " +
            "<div class='w3-col l5 m6 s12 l-pad-3 s-pad-1'>" +
            "<form action='' method='' onsubmit='return savePartnerPassword()'>" +
            "<div>" +
            "<select class='ui search fluid dropdown'>" +
            "<option value=''>Select bank</option>" +
            "<option>Diamond</option>" +
            "<option>Sky</option>" +
            "<option>Polaris</option>" +
            "<option>UBA</option>" +
            "<option>GT Bank</option>" +
            "<option>First Bank</option>" +
            "<option>Access Bank</option>" +
            "<option>Keystone Bank</option>" +
            "<option>Zenith Bank</option>" +
            "<option>Jaiz Bank</option>" +
            "<option>High Street MFB</option>" +
            "<option>Consumer MFB</option>" +
            "</select>" +
            "<br/> " +
            "</div> " +
            "<div class='ui fluid input' style='margin-top: 5px;'>" +
            "<input id='old-password' class='wix-textbox' type='text' placeholder='Account number'/> " +
            "</div> " +
            "<div class='ui fluid input' style='margin-top: 5px;'>" +
            "<input id='new-password' class='wix-textbox' type='text' placeholder='Account Name'/> " +
            "</div> " +
            "<br/><br/>" +
            "<button id='partner-pass-btn' class='ui basic sleak button' style='margin-top: 5px;'>" +
            "<i class='sync icon'></i> Change account details" +
            "</button>" +
            "</form>" +
            "</div> " +
            "</div>");

        $(".ui.dropdown").dropdown({allowAdditions:true});
    }


    //---------------------------------ticket logic---------------------------------------
    function drawTicket()
    {
        $("#settings-main-page").html("");
        let p = document.createElement("div");
        p.className = "l-pad-3 m-pad-2 s-pad-t";
        p.style.margin = "auto";
        p.innerHTML = "<div class='w3-row'>" +
            "<div class='w3-col l6 m4 s12'>" +
            "<h4 class='s-pad-1' style='font-size: 20px; color: dimgray; font-family: varela_roundregular; vertical-align: middle;'>" +
            "<img class='image' src='"+phpvars.CDN_URL+"images/ticket_3.png' style='width: 40px;'/>" +
            "My Tickets</h4></div>" +
            "<div class='w3-col l3 m3 s12 s-pad-1'>" +
            "<div class='ui fluid input'>" +
            "<input class='wix-textbox' id='search-txt' type='text' placeholder='search' onkeyup=\"if(event.keyCode == 13){searchTicket();}\"></div> " +
            "</div>" +
            "<div class='w3-col l3 m3 s12 s-pad-1'>" +
            "<a href='#settings/new-ticket'>" +
            "<button class='ui right floated sleak green button'>New Ticket</button>" +
            "</a>" +
            "</div>" +
            "</div>" +


            "<div class='w3-row margin-t-3 margin-b-5'>" +
            "<div class='w3-col l10 m10 s12'>" +
            "<div class='l-width-xl'>" +
            "<div class='w3-row'>" +
            "<div class='w3-col l3 m3 s6'>" +
            "<h6 class='sleak pad-1' style='color: dimgray; font-weight: bold;'>Ticket Id</h6>" +
            "</div>" +
            "<div class='w3-col l5 m3 s6'>" +
            "<h6 class='sleak pad-1' style='color: dimgray; font-weight: bold;'>Subject</h6>" +
            "</div>" +
            "<div class='w3-col l2 m3 s6'>" +
            "<h6 class='sleak pad-1' style='color: dimgray; font-weight: bold;'>Status</h6>" +
            "</div>" +
            "<div class='w3-col l2 m3 s6'>" +
            "<h6 class='sleak pad-1 l-align-r' style='color: dimgray; font-weight: bold;'>Created</h6>" +
            "</div>" +
            "</div>" +
            "<div class='-pad-1' id='ticket-con'>" +

            "</div>" +
            "</div></div> " +
            "<div class='w3-col l2 m2 s12 s-hide'>" +



            "<div class='ui vertical right fluid menu'>" +
            "  <a id='all-ticket' class='active item ticket-filter' onclick='switchTicketTab(this)'>" +
            "      <label id='all-label' class='ui blue sleak label'>0</label>  All" +
            "  </a>" +
            "  <a id='pending-ticket' class='item ticket-filter' onclick='switchTicketTab(this)'>" +
            "      <label id='pending-label' class='ui blue sleak label'>0</label>  Pending" +
            "  </a>" +
            "  <a id='opened-ticket' class='item ticket-filter' onclick='switchTicketTab(this)'>" +
            "      <label id='opened-label' class='ui blue sleak label'>0</label>  Opened" +
            "  </a>" +
            "  <a id='closed-ticket' class='item ticket-filter' onclick='switchTicketTab(this)'>" +
            "      <label id='closed-label' class='ui blue sleak label'>0</label>  Closed" +
            "  </a>" +
            "</div>" +

            "</div> " +
            "</div>" +


            "<div id='pages' class='ui pagination tiny compact menu'>" +
            "</div>";

        document.getElementById("settings-main-page").appendChild(p);

        populateTickets();
    }

    function populateTickets(page)
    {
        let request = {
            term:$("#search-txt").val(),
            Page:1,
            Perpage:15,
            Filter: 'search list',
            filter: 'all'
        };

        if($("#pending-ticket").hasClass("active"))
        {
            request.filter = "pending";
        }
        if($("#opened-ticket").hasClass("active"))
        {
            request.filter = "opened";
        }
        if($("#closed-ticket").hasClass("active"))
        {
            request.filter = "closed";
        }

        if(Number(page) > 0)
        {
            request.Page = Number(page);
        }


        $("#ticket-con").html("<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>" +
            "<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>");

        postJson(api+"/gettickets", function(data, status){
            if(status == "done")
            {
                let d = JSON.parse(data);

                $("#ticket-con").html("");

                if(d.status === "success")
                {
                    $("#pages").html(Paginate(Number(d.Page), Number(d.Total), Number(d.Perpage), "populateTickets"));

                    $("#all-label").html(d.total);
                    $("#pending-label").html(d.pending);
                    $("#opened-label").html(d.opened);
                    $("#closed-label").html(d.closed);

                    if(d.data.length === 0)
                    {
                        $("#ticket-con").html(
                            "<div id='no-ticket' style='display: none;'><br/><br/>" +
                            "<div class='align-c margin-b-8'>" +
                            "<img src='"+phpvars.CDN_URL+"images/ticket_2.png' style='width: 70px;'/>" +
                            "<h6 style='color: lightgray; font-family: montserratregular;'>" +
                            "Empty ticket list returned</h6></div></div>");

                        $("#no-ticket").transition({animation:'fade right in', duration:600});
                    }

                    for(var i = 0; i < d.data.length; i++)
                    {
                        let status = "";

                        if(d.data[i].Ticket.Status == 1)
                        {
                            status = "<span class='status yellow-back'>Pending</span>";
                        }
                        else if(d.data[i].Ticket.State == 2)
                        {
                            status = "<span class='status green-back'>Opened</span>";
                        }
                        else if(d.data[i].Ticket.State == 3)
                        {
                            status = "<span class='status blue-back'>Closed</span>";
                        }
                        else
                        {
                            status = "<span class='status red-back'>Unknown</span>";
                        }

                        let dd = document.createElement("div");
                        dd.className = "s-width-xl ticket-strip";
                        dd.style.margin = "auto";
                        dd.style.marginTop = "5px";
                        dd.style.display = "none";
                        dd.innerHTML =
                            "<a href='#settings/open-ticket/"+d.data[i].Ticket.Id+"'>" +
                            "<div class='w3-row widget hoverable z-depth-1'>" +
                            "<div class='w3-col l3 m3 s6'>" +
                            "<h6 class='sleak pad-1' style='color: dimgray;'>" +
                            "<small><i class='circle green icon'></i></small> " +
                            "#"+ d.data[i].Ticket.Ticket_number +"</h6>" +
                            "</div>" +
                            "<div class='w3-col l5 m3 s6'>" +
                            "<h6 class='sleak pad-1' style='color: dimgray;'>"+d.data[i].Ticket.Subject+"</h6>" +
                            "</div>" +
                            "<div class='w3-col l2 m3 s6'>" +
                            "<h6 class='sleak pad-1' style='color: dimgray;'>"+status+"</h6>" +
                            "</div>" +
                            "<div class='w3-col l2 m3 s6'>" +
                            "<h6 class='sleak-b pad-1' style='color: dimgray;'><small>" + d.data[i].Ticket.Created.MonthName +", " +
                            d.data[i].Ticket.Created.Day +"/"+d.data[i].Ticket.Created.Year +
                            "</small></h6></div></div></a>";

                        document.getElementById("ticket-con").appendChild(dd);
                    }
                    $(".ticket-strip").transition({animation:'fade up in', duration:500, interval:200});
                }
                else if(d.status == "access denied")
                {
                    $("#ticket-con").html("<div class='align-c'>" +
                        "<h1 class='ui header'>" +
                        "<i class='bug icon' style='color: rgba(255,2,0,0.1);'></i>" +
                        "</h1><h6 style='color: gray;'>Try reloading page. " +
                        "<span style='color: blue; cursor: pointer;' onclick='location.reload();'>" +
                        "reload</span></h6> </div>");
                }
            }
            else
            {
                $("#ticket-con").html("<div class='align-c'>" +
                    "<h1 class='ui header'>" +
                    "<i class='ban icon' style='color: rgba(255,2,0,0.1);'></i>" +
                    "</h1><h6 style='color: gray;'>Network Error. " +
                    "<span style='color: blue; cursor: pointer;' onclick='populateTickets()'>" +
                    "try again</span></h6> </div>");
            }
        },request);
    }

    function DrawNewTicket()
    {
        $("#settings-main-page").html("");
        let p = document.createElement("div");
        p.className = "l-width-6 m-width-8 s-width-l s-margin-t-4";
        p.style.margin = "auto";
        p.innerHTML = "<div class='w3-row'>" +
            "<div class='w3-col l12 m12 s12'>" +
            "<h5 style='font-size: 20px; color: dimgray; font-family: varela_roundregular;'><br/><br/>" +
            "<img class='image' src='"+phpvars.CDN_URL+"images/ticket_3.png' style='width: 40px;'/>" +
            "What's the problem ?</h5>" +
            "<h6 style='font-size: 14px; color: silver;'>We're always here for you</h6>" +
            "</div>" +
            "</div>" +

            "<div class='w3-row margin-t-3'>" +
            "<label style='font-weight: normal; font-family: Lato; color: lightgray;'>Subject for your ticket</label>" +
            "<div class='ui fluid input'><input class='wix-textbox' id='subject' class='lift-1' type='text'/></div>" +

            "<div class='margin-t-1'>" +
            "<div class='ui form'>" +
            "<div class='field' style='margin-top: 20px;'>" +
            "<label style='font-weight: normal; font-family: Lato; color: lightgray;'>What's bothering you?</label>" +
            "<textarea id='body' class='wix-textbox' placeholder='Tell us about the problems and if possible, the steps that led you " +
            "to the issue so that we can replicate it' style='font-family: Lato;'></textarea>" +
            "</div> " +
            "</div>" +
            "<div class='w3-container margin-t-2 align-r'>" +
            "<button id='file-up-btn' class='ui icon yellow-back circular button' " +
            "onclick=\"document.getElementById('ticket-file-sel').click();\"><i class='plus icon'></i></button>" +
            "<span id='ticket-file-txt'>Attach a File</span>" +
            "<input id='ticket-file-sel' type='file' style='display: none;' onchange='uploadTicketFile(this)'/> " +
            "<input id='ticket-file' type='hidden' value=''/> " +
            "</div> " +
            "<br/><button id='ticket-save-btn' class='ui small sleak green-back button' onclick='SaveTicket()' l>" +
            "<i class='paper plane icon'></i>Send Ticket</button><div id='ticket-pulse' style='margin-left: 20px;'></div> " +
            "</div> " +
            "</div><br/><br/>";

        document.getElementById("settings-main-page").appendChild(p);

        pageInit();
    }

    function uploadTicketFile(e)
    {

        $("#file-up-btn").addClass("loading");

        uploadImage(e.files[0], "scripts/uploadticketfile.php", function (data, status, name) {
            $("#file-up-btn").removeClass("loading");
            if(status == "done")
            {
                let d = JSON.parse(data);

                if(d.Status == "SUCCESS")
                {
                    $("#file-up-btn").html("<i class='check icon'></i>");
                    $("#ticket-file-txt").html(name+"<span style='color: gray;'>" +
                        " has been added </span><span style='color: blue; cursor: pointer;' " +
                        "onclick='removeTicketFile()'>Remove</span>");
                    $("#ticket-file").val(d.Data.Name);
                }
                else if(d.Status == "FAILED")
                {
                    ShowModal(d.Message);
                }
                else
                {
                    ShowModal("File upload failed. Refresh the page abd try again");
                }
            }
            else
            {
                ShowModal("Check your connection and try again");
            }
        });
    }

    function removeTicketFile()
    {
        $("#file-up-btn").html("<i class='plus icon'></i>");
        $("#ticket-file-txt").html("Attach a File");
        $("#ticket-file").val("");
    }

    function SaveTicket()
    {
        let request = {};
        request.Subject = $("#subject").val();
        request.Body = $("#body").val();
        request.File = $("#ticket-file").val();

        let error = false;

        if(request.Body == "")
        {
            error = true;
            $("#ticket-save-btn").removeClass("green-back");
            $("#ticket-save-btn").addClass("negative");
            $("#ticket-save-btn").html("Write a message");
            setTimeout(function () {
                $("#ticket-save-btn").addClass("green-back");
                $("#ticket-save-btn").removeClass("negative");
                $("#ticket-save-btn").html("<i class='paper plane icon'></i>Send Ticket");
            }, 2000);
        }
        if(request.Subject == "")
        {
            error = true;
            $("#ticket-save-btn").removeClass("green-back");
            $("#ticket-save-btn").addClass("negative");
            $("#ticket-save-btn").html("Subject is empty");
            setTimeout(function () {
                $("#ticket-save-btn").addClass("green-back");
                $("#ticket-save-btn").removeClass("negative");
                $("#ticket-save-btn").html("<i class='paper plane icon'></i>Send Ticket");
            }, 2000);
        }

        if(error === false)
        {
            $("#ticket-save-btn").removeClass("green-back");
            $("#ticket-save-btn").addClass("disabled");
            $("#ticket-pulse").addClass("pulse");

            postJson(api+"/saveticket", function(data, status){

                $("#ticket-save-btn").addClass("green-back");
                $("#ticket-save-btn").removeClass("disabled");
                $("#ticket-pulse").removeClass("pulse");

                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {
                        $("#settings-main-page").html("");
                        let p = document.createElement("div");
                        p.id = "ticket-success-con";
                        p.style.display = "none";
                        p.className = "l-width-6 m-width-8 s-width-l s-margin-t-4";
                        p.style.margin = "auto";
                        p.innerHTML = "<div class='align-c' style='margin-top: 30px;'>" +
                            "<img src='images/check_office.png' width='70px;'/>" +
                            "<h3 style='font-family: nunitoregular; color: dimgray;'>" +
                            "Ticket sent successfully.</h3> " +
                            "</div>";
                        document.getElementById("settings-main-page").appendChild(p);

                        $("#ticket-success-con").transition({animation:'fade up in', duration:800, onComplete:function () {
                                setTimeout(function () {
                                    location.href = "#settings/ticket";
                                }, 5000);
                            }});
                    }
                    else
                    {
                        ShowModal(d.message);
                    }
                }
                else
                {
                    ShowModal("Connection Error. Check your connection and try again");
                }
            }, request);
        }
    }

    function DrawOpenTicket()
    {
        $("#settings-main-page").html("");
        let p = document.createElement("div");
        p.className = "l-pad-3 m-pad-1 s-pad-t";
        p.style.margin = "auto";
        p.innerHTML = "<div class='w3-row l-pad-3 m-pad-2 s-pad-t'>" +
            "<div class='w3-col l6 m4 s12'>" +
            "<h4 style='font-size: 20px; color: dimgray; font-family: nunitoregular;'>" +
            "<img class='image' src='"+phpvars.CDN_URL+"images/ticket_3.png' style='width: 50px;'/>" +
            "Ticket</h4></div>" +
            "</div>" +

            "<div class='w3-row margin-t-3'>" +
            "<div class='w3-col l9 m9 s12'>" +
            "<div class='l-width-xl'>" +
            "<div id='tick-con'>." +

            "</div>" +
            "</div></div> " +
            "<div class='w3-col l3 m3 s12 s-hide'>" +
            "<div id='tick-detail-con' class='pad-1  widget'>" +

            "</div>" +
            "</div> " +
            "</div>";

        document.getElementById("settings-main-page").appendChild(p);

        if(getArg() == null)
        {
            location.hash = "#settings/ticket";
        }
        else
        {
            fetchTicket(getArg());
        }
    }

    function fetchTicket(e)
    {
        $("#tick-detail-con").html("<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>" +
            "<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>");
        $("#tick-con").html("<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>" +
            "<div class='ui placeholder'><div class='line'></div><div class='line'></div></div>");

        let arg = getArg(1);

        if(arg != null)
        {
            postJson(api+"/getticket", function(data, status){
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {
                        let status = "";

                        if(d.data.Status == 1)
                        {
                            status = "<span class='status yellow-back'>Pending</span>";
                        }
                        else if(d.data.State == 2)
                        {
                            status = "<span class='status green-back'>Opened</span>";
                        }
                        else if(d.data.State == 3)
                        {
                            status = "<span class='status blue-back'>Closed</span>";
                        }
                        else
                        {
                            status = "<span class='status red-back'>Unknown</span>";
                        }

                        let replies = "";

                        for(let i = 0; i < d.replies.length; i++)
                        {
                            replies +=
                                "<div style='margin-top: 30px;'>" +
                                "<h6 style='font-family: "+$('#system-font').val()+"; margin: 0; color: silver;'>"+
                                (d.replies[i].Source === "customer" ?
                                    "<span style='color: "+$('#system-color').val()+";'><i class='user circle icon'></i>Me</span>" :
                                    "<span style='color: lightgray;'><i class='headphones icon'></i> Support</span>") +
                                "</h6>" +
                                "<p style='font-size: 16px; color: dimgray; margin-top: 10px; font-family: Lato;'>"+d.replies[i].Body+"</p>" +
                                "</div>";
                        }

                        $("#tick-con").html(
                            "<div>" +
                            "<h6 style='font-family: "+$('#system-font').val()+"; margin: 0; color: silver;'>Subject</h6>" +
                            "<h3 style='margin-top: 9px; font-family: "+$('#system-font').val()+";'>"+d.data.Subject+"</h3>" +
                            "<br/>" +
                            "</div>" +
                            "<div>" +
                            "<h6 style='font-family: "+$('#system-font').val()+"; margin: 0; color: silver;'>Body</h6>" +
                            "<p style='font-size: 16px; color: dimgray; margin-top: 10px; font-family: Lato;'>"+d.data.Body+"</p>" +
                            "</div>" +
                            "<hr/>" +

                            "<div id='replies-con'>" +
                            replies +
                            "</div>" +

                            "<hr/>" +
                            "<div class='ui form'>" +
                            "<textarea id='reply-txt' class='wix-textbox' rows='3' placeholder='You can reply this ticket'></textarea>" +
                            "<button id='reply-btn' class='ui blue sleak button' style='margin-top: 10px;' " +
                            "onclick=\"saveTicketReply('"+d.data.Id+"')\">" +
                            "<i class='paper plane icon'></i> Send reply" +
                            "</button>" +
                            "</div>");

                        $("#tick-detail-con").html(
                            "<div>" +
                            "<h6 style='color: dimgray; font-family: "+$('#system-font').val()+"; margin: 0; color: dimgray;'>Created</h6>" +
                            "<h6 style='color: dimgray; font-family: "+$('#system-font').val()+"; margin-top: 10px;'>"+
                            d.data.Created.WeekDay+", "+d.data.Created.Day+"/"+d.data.Created.Month+"/"+d.data.Created.Year+
                            "</h6><br/><br/>" +
                            "<h6 style='color: dimgray; font-family: "+$('#system-font').val()+"; margin: 0;'>Status</h6>" +
                            "<h6 style='color: dimgray; font-family: "+$('#system-font').val()+"; margin-top: 10px;'>"+
                            status +
                            "</h6><br/><br/>" +
                            "</div>");


                    }
                    else
                    {
                        location.hash = "#settings/ticket";
                        ShowModal(d.message);
                    }
                }
                else
                {
                    location.hash = "#settings/ticket";
                    ShowModal("Connection error. Unable to retrieve ticket. Check your connection and try again");
                }
            }, {ticket:arg});
        }
        else
        {
            location.hash = "#settings/ticket";
        }
    }

    function saveTicketReply(tckid)
    {
        let request = {
            reply:$("#reply-txt").val(),
            ticket:tckid
        };

        loadingButton({btn:""});
        postJson(api+"/saveticketreply", function(data, status){
            loadingButton({btn:"", loading:false});
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    $("#reply-txt").val("");

                    $("#reply-btn").addClass("positive disabled");
                    $("#reply-btn").html("<i class='check icon'></i> sent!");

                    setTimeout(function () {
                        $("#reply-btn").removeClass("positive disabled");
                        $("#reply-btn").html("<i class='paper plane icon'></i> Send reply");
                    }, 3000);

                    let div = document.createElement("div");
                    div.id = "new-reply";
                    div.style.display = "none";
                    div.innerHTML = "<div style='margin-top: 30px;'>" +
                        "<h6 style='font-family: "+$('#system-font').val()+"; margin: 0; color: silver;'>"+
                        "<span style='color: "+$('#system-color').val()+";'><i class='user circle icon'></i>Me</span>" +
                        "</h6>" +
                        "<p style='font-size: 16px; color: dimgray; margin-top: 10px; font-family: Lato;'>"+d.data.Body+"</p>" +
                        "</div>";
                    document.getElementById("replies-con").appendChild(div);

                    $("#new-reply").transition({animaton:'fade up in',duration:800, onComplete:function () {
                            div.id = "";
                        }});
                }
                else
                {
                    errorButton({btn:"reply-btn", msg:d.message});
                }
            }
            else
            {
                errorButton({btn:"reply-btn", msg:"Connection error"});
            }
        },request);
    }

    function switchTicketTab(e)
    {
        $(".ticket-filter").removeClass("active");
        $(e).addClass("active");
        populateTickets();
    }
    
    function searchTicket()
    {
        switchTicketTab(document.getElementById("all-ticket"));
        populateTickets();
    }

    //-------------------------------------------- End of ticket logic------------------------------





    function drawProfile()
    {
        $("#settings-main-page").html(
            "<div class='l-width-7' style='margin: auto;'> " +

            "<div class='w3-row' style='margin-top: 50px;'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<label style='font-family: "+$('#system-font').val()+";'>Name</label>" +
            "</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            "<div class='ui fluid left icon input'>" +
            "<i class='user circle icon'></i> " +
            "<input id='name' class='profile-input profile-editing' type='text' value='"+($('#customer-name').val())+"' disabled/>" +
            "</div> " +
            "</div> " +
            "</div> " +

            "<div class='w3-row' style='margin-top: 10px;'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<label style='font-family: "+$('#system-font').val()+";'>Surname</label>" +
            "</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            "<div class='ui fluid input'>" +
            "<input id='sname' class='profile-input profile-editing' type='text'  value='"+($('#customer-sname').val())+"' disabled/>" +
            "</div> " +
            "</div> " +
            "</div> " +


            "<div class='w3-row' style='margin-top: 10px;'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<label style='font-family: "+$('#system-font').val()+";'>Phone</label>" +
            "</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            "<div class='ui fluid left icon input'>" +
            "<i class='mobile icon'></i> " +
            "<input id='phone' class='profile-input profile-editing' type='text'  value='"+($('#customer-phone').val())+"' disabled/>" +
            "</div> " +
            "</div> " +
            "</div> " +


            "<div class='w3-row' style='margin-top: 10px;'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<label style='font-family: "+$('#system-font').val()+";'>Email</label>" +
            "</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            "<div class='ui fluid left icon input'>" +
            "<i class='at icon'></i> " +
            "<input id='email' class='profile-input' type='text' value='"+($('#customer-email').val())+"' disabled/>" +
            "</div> " +
            "</div> " +
            "</div> " +


            "<div class='w3-row' style='margin-top: 10px;'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<label style='font-family: "+$('#system-font').val()+";'>Gender</label>" +
            "</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            "<select id='gender' class='ui profile-input profile-editing fluid dropdown' disabled>" +
            "<option value=''>Select gender</option>" +
            "<option value='male'>Male</option>" +
            "<option value='female'>Female</option>" +
            "</select> " +
            "</div> " +
            "</div> " +


            "<div class='w3-row' style='margin-top: 50px;'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<label style='font-family: "+$('#system-font').val()+";'>Country</label>" +
            "</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            country_dropdown +
            "</div> " +
            "</div> " +
            "</div> " +


            "<div class='w3-row' style='margin-top: 10px;'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<label style='font-family: "+$('#system-font').val()+";'>State</label>" +
            "</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            "<div class='ui fluid left icon input'>" +
            "<i class='map marker icon'></i> " +
            "<input id='state' class='profile-input profile-editing' type='text' value='"+($('#customer-state').val())+"' disabled/>" +
            "</div> " +
            "</div> " +
            "</div> " +


            "<div class='w3-row' style='margin-top: 10px;'>" +
            "<div class='w3-col l3 m4 s12'>" +
            "<label style='font-family: "+$('#system-font').val()+";'>City</label>" +
            "</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            "<div class='ui fluid left icon input'>" +
            "<i class='map icon'></i> " +
            "<input id='city' class='profile-input profile-editing' type='text' value='"+($('#customer-city').val())+"' disabled/>" +
            "</div> " +
            "</div> " +
            "</div> " +


            "<div class='w3-row' style='margin-top: 40px;'>" +
            "<div class='w3-col l3 m4 s12' style='color: transparent;'>.</div> " +
            "<div class='w3-col l5 m8 s12'>" +
            "<button id='profile-btn' class='ui blue sleak button' onclick='beginProfileEdit()'><i class='pencil icon'></i> Edit</button> " +
            "</div> " +
            "</div> " +


            "</div>"
        );
        $("#country").dropdown('set selected', $("#customer-country").val());
        $("#gender").dropdown('set selected', $("#customer-sex").val());
        $("#country").addClass('fluid');

    }

    function beginProfileEdit()
    {
        if($("#profile-btn").hasClass("save"))
        {

            let request = {
                name:$("#name").val(),
                sname:$("#sname").val(),
                phone:$("#phone").val(),
                gender:$("#gender").val(),
                country:$("#country").dropdown('get value'),
                state:$("#state").val(),
                city:$("#city").val()
            };

            loadingButton({btn:"profile-btn"});
            postJson(api+"/saveprofile", function(data, status){
                loadingButton({btn:"profile-btn", loading:false});
                if(status === "done")
                {
                    let d = JSON.parse(data);

                    if(d.status === "success")
                    {
                        $(".profile-editing").removeClass("wix-textbox");
                        $(".profile-editing").addClass("profile-input");
                        $(".profile-editing").attr("disabled", true);
                        $(".profile-editing").addClass("disabled");

                        $("#profile-btn").html("<i class='pencil icon'></i> Edit");
                        $("#profile-btn").removeClass("save");
                    }
                    else
                    {
                        errorButton({btn:"profile-btn", msg:d.message});
                    }
                }
                else
                {
                    errorButton({btn:"profile-btn", msg:"Connection error"});
                }
            }, request);
        }
        else
        {
            $(".profile-editing").addClass("wix-textbox");
            $(".profile-editing").removeClass("profile-input");
            $(".profile-editing").attr("disabled", false);
            $(".profile-editing").removeClass("disabled");

            $("#profile-btn").html("<i class='save icon'></i> Save");
            $("#profile-btn").addClass("save");
        }
    }

    function drawNotification()
    {
        $("#settings-main-page").html(
            "<div class='align-c' style='margin-top: 100px;'>" +
            "<h5 class='ui icon header' style='color: whitesmoke;'><i class='bell icon'></i> </h5> " +
            "<h3 style='font-family: "+$('#system-font').val()+"; color: lightgray;'>You have no notifications</h3> " +
            "</div>");

    }

    function drawContactUs()
    {
        $("#settings-main-page").html(
            "<div class='l-pad-2 s-pad-1'>" +
            "<div class='ui placeholder'>" +
            "<div class='line'></div> " +
            "<div class='line'></div> " +
            "</div>" +
            "</div>"
        );

        postJson(api+"/main-contactus", function (data, status) {
            $("#settings-main-page").html("");
            if(status === "done")
            {
                let d = JSON.parse(data);

                if(d.status === "success")
                {
                    $("#settings-main-page").html(d.data);

                    $(".contact-us-data").transition({animation:'fade right in', duration:800, interval:300});
                }
                else
                {
                    $("#settings-main-page").html(
                        "<div style='margin-top: 50px;'>" +
                        "<div class='align-c'>" +
                        "<h1 class='ui header'><i class='ban icon' style='color: rgba(255,0,0,0.1);'></i></h1>" +
                        "<h3 style='font-family: varela_roundregular; color: silver;'>"+d.message+"</h3>" +
                        "<br/>" +
                        "<button class='ui basic sleak button' onclick='drawContactUs()'>Try again</button>" +
                        "</div>" +
                        "</div>");
                }
            }
            else
            {
                $("#settings-main-page").html(
                    "<div style='margin-top: 50px;'>" +
                    "<div class='align-c'>" +
                    "<h1 class='ui header'><i class='ban icon' style='color: rgba(255,0,0,0.1);'></i></h1>" +
                    "<h3 style='font-family: varela_roundregular; color: silver;'>Connection error</h3>" +
                    "<br/>" +
                    "<button class='ui basic sleak button' onclick='drawContactUs()'>Try again</button>" +
                    "</div>" +
                    "</div>");
            }
        },{});
    }
    
    function drawWalletBalance()
    {
        $("#wallet-page-gig").html(
            "<div class='w3-row'>" +
            "<div class='w3-col l6 m6 s12' style='border-right: 1px solid lightgray; min-height: 100%;'>" +
            "<div class='pad-1'> " +
            "<select id='wallet-filter' class='ui small sleak dropdown wix-select' onchange='populateWalletData()'>" +
            "<option>All</option>" +
            "<option>Properties</option>" +
            "<option>Vehicles</option>" +
            "<option>Leased properties</option>" +
            "</select>" +
            "</div>" +
            "<div class='l-pad-2'>" +
            "   <div class='w3-col l6 m6 s12'>" +
            "       <div class=''>" +
            "           <h3 id='total-balance' class='sleak load-con'><span style='font-family: Lato;'> &#8358;</span>" +
            "           <span> 0.00</h3>" +
            "           <label class='label' style='color: silver;'>Total Balance</label>" +
            "       </div>" +
            "   </div>" +
            "   <div class='w3-col l6 m6 s12'>" +
            "       <div class=''>" +
            "           <h3 id='withdrawable-balane' class='sleak load-con'><span style='font-family: Lato;'> &#8358;</span>" +
            "           <span> 0.00</h3>" +
            "           <label class='label' style='color: silver;'>Withdrawable Balance</label>" +
            "       </div>" +
            "   </div>" +
            "</div>" +
            "<div class='pad-2' style='margin-top: 50px;'>" +
            "   <table class='ui very basic padded table'>" +
            /*
            "       <tr>" +
            "           <td>Total Investment</td>" +
            "           <td>&#8358;<span>0.00</span></td>" +
            "       </tr>" +
             */
            "       <tr>" +
            "           <td>Total Revenue</td>" +
            "           <td id='total-revenue' class='load-con'>&#8358;<span id=''>0.00</span></td>" +
            "       </tr>" +
            "       <tr>" +
            "           <td>Total Withdrawn</td>" +
            "           <td id='total-withdrawal' class='load-con'>&#8358;<span id=''>0.00</span></td>" +
            "       </tr>" +
            "       <tr>" +
            "           <td>Total Earnings</td>" +
            "           <td id='total-earnings' class='load-con'>&#8358;<span id=''>0.00</span></td>" +
            "       </tr>" +
            "       <tr>" +
            "           <td>Total Available</td>" +
            "           <td id='available-total' class='load-con'>&#8358;<span  id=''>0.00</span></td>" +
            "       </tr>" +
            "   </table> " +
            "</div>" +
            "</div> " +
            "<div class='w3-col l6 m6 s12'>" +
            "<div class='pad-1' style='background-color: rgb(250,250,250);'>" +
            "<h6 class='sleak'><i class='arrow alternate blue circle down outline icon'></i> Wallet activities</h6>" +
            "</div>" +
            "<div id='wallet-activity-log'>" +

            /*
            "<div class='w3-row' style='border-bottom: 1px solid whitesmoke;'>" +
            "<div class='w3-col l4 m4 s4 pad-2'><i class='arrow red up icon'></i> Debit</div>" +
            "<div class='w3-col l4 m4 s4 pad-2'>&#8358;<span>0.00</span></div>" +
            "<div class='w3-col l4 m4 s4 pad-2'><span>tue 14/apr/2020</span></div>" +
            "</div>" +

            "<div class='w3-row' style='border-bottom: 1px solid whitesmoke;'>" +
            "<div class='w3-col l4 m4 s4 pad-2'><i class='arrow green down icon'></i> Credit</div>" +
            "<div class='w3-col l4 m4 s4 pad-2'>&#8358;<span>0.00</span></div>" +
            "<div class='w3-col l4 m4 s4 pad-2'><span>tue 14/apr/2020</span></div>" +
            "</div>" +
             */

            "</div>" +
            "</div> " +
            "</div>"
        );

        populateWalletData();
    }
    
    function drawWalletWithdraw()
    {
        $("#wallet-page-gig").html(
            "<div class='w3-row'>" +
            "<div class='w3-col l3 m3 s12' style='border-right: 1px solid lightgray; min-height: 100%;'>" +
            "<div class='pad-1'>" +
            "   <div class=''>" +
            "       <div style='margin-top: 20px;'>" +
            "           <h4 style='font-family: varela_roundregular; color: dimgray;'>" +
            "               <i class='arrow green up icon'></i>" +
            "               <span> Request for payout</span>" +
            "           </h4>" +
            "       </div>" +
            "   </div>" +
            "   <div class='' style='margin-top: 30px;'>" +
            "       <select id='withdraw-source' class='ui fluid wix-select dropdown' onchange='loadWithdrawItem(this)'>" +
            "           <option value=''>Select source</option>" +
            "           <option value='property'>property</option>" +
            "           <option value='vehicle'>vehicle</option>" +
            "           <option value='leased-property'>leased property</option>" +
            "       </select>" +
            "       <div id='withdraw-item-con' style='margin-top: 15px;'>" +
            "           <p style='margin-top: 20px; color: lightgray; line-height: 180%; font-family: Lato;'>" +
            "               Select the property, vehicle or lease you want to withdraw from to proceed.<br/>" +
            "           </p>" +
            "       </div>" +
            "   </div>" +
            "</div>" +
            "</div> " +
            "<div class='w3-col l9 m9 s12'>" +
            "<div class='pad-1' style='background-color: rgb(250,250,250);'>" +
            "<h6 class='sleak'>" +
            "   <i class='arrow up green icon'></i> Payout request log" +
            "</h6>" +
            "</div>" +
            "<div>" +
            "<table class='ui structured padded table' style='border: none;'>" +
            "<tbody id='table-body'>" +
            "</tbody>" +
            "</table> " +
            "</div>" +
            "</div> " +
            "</div>"
        );

        $(".ui.dropdown").dropdown();

        populateWithdrawRequest();
    }

    function drawFundWallet()
    {
        $("#page-gig").html();

        $("#wallet-page-gig").html(
            "<div class='w3-row'>" +
            "<div class='w3-col l3 m3 s12' style='border-right: 1px solid lightgray; min-height: 100%;'>" +
            "<div class='pad-1'>" +
            "   <div class=''>" +
            "       <div style='margin-top: 20px;'>" +
            "           <h4 style='font-family: varela_roundregular; color: dimgray;'>" +
            "               <i class='arrow yellow down icon'></i>" +
            "               <span> Fund your wallet</span>" +
            "           </h4>" +
            "       </div>" +
            "   </div>" +
            "   <div class='' style='margin-top: 30px;'>" +
            "       <select id='funding-method' class='ui fluid wix-select dropdown' onchange='loadFundMethod(this)'>" +
            "           <option value=''>Select method</option>" +
            "           <option value='card'>debit / credit card</option>" +
            "           <option value='transfer'>bank transfer</option>" +
            "           <option value='deposit'>bank deposit</option>" +
            "       </select>" +
            "       <div id='fund-item-con' style='margin-top: 15px;'>" +
            "           <p style='margin-top: 20px; color: lightgray; line-height: 180%; font-family: Lato;'>" +
            "               Select a payment method to add money to your wallet.<br/>" +
            "           </p>" +
            "       </div>" +
            "   </div>" +
            "</div>" +
            "</div> " +
            "<div class='w3-col l9 m9 s12'>" +
            "<div class='pad-1' style='background-color: rgb(250,250,250);'>" +
            "<h6 class='sleak'>" +
            "   <i class='arrow down yellow icon'></i> Funding transaction log" +
            "</h6>" +
            "</div>" +
            "<div>" +
            "<table class='ui structured padded table' style='border: none;'>" +
            "<tbody id='table-body'>" +
            "</tbody>" +
            "</table> " +
            "</div>" +
            "</div> " +
            "</div>"
        );

        $(".ui.dropdown").dropdown();

        populatePayinRequest();
    }

