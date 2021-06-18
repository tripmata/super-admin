// toggle box
function loadToggleBox() {
    
    // load all toggle boxes
    let toggleBox = document.querySelectorAll('.toggle-box');

    // are we good 
    if (toggleBox.length > 0)
    {
        [].forEach.call(toggleBox, (element)=>{

            // listen for click event
            element.addEventListener('click', ()=>{

                // @var bool status
                let status = false;

                // has active class
                if (element.classList.contains('active'))
                {
                    element.classList.remove('active');
                }
                else
                {
                    element.classList.add('active');

                    // update status
                    status = true;
                }

                // make query to server
                // get the parent
                let parent = element.parentNode;

                // create form data
                let formData = new FormData();

                // load form data
                formData.append('category', parent.getAttribute('data-category'));
                formData.append('roomid', parent.getAttribute('data-roomid'));
                formData.append('timestamp', parent.getAttribute('data-timestamp'));
                formData.append('value', status);

                send_http_request(formData, (res)=>{console.log(res)});
                
            }); 
        });
    }
}

// load table preloader
function tablePreloader() {

    // load table header
    let tableHeader = document.querySelectorAll('.month-calendar .scrollable table th');

    // has table header
    if (tableHeader != null && tableHeader.length > 0)
    {
        [].forEach.call(tableHeader, (header)=>{
            header.innerHTML = '<span class="table-preloader"></span>';
        });
    }

    // load table body
    let tableBody = document.querySelectorAll('.month-calendar .scrollable table tbody .not-empty-cells td');

    // has table body
    if (tableBody != null && tableBody.length > 0)
    {
        [].forEach.call(tableBody, (body)=>{
            body.innerHTML = '<span class="table-preloader"></span>';
        });
    }
}

// handle input field submission
function handleInputField() {

    // get all input fields
    let inputFields = document.querySelectorAll('.input-field');

    // do we have something
    if (inputFields.length > 0)
    {
        [].forEach.call(inputFields, (element)=>{

            // enter key pressed
            element.addEventListener("keypress", (e)=>{
                if (e.key == 'Enter' || e.keyCode == 13){
                    inputFieldHelper(element);
                }
            });

            // element changed
            element.addEventListener('blur', ()=>{
                inputFieldHelper(element);
            });
        });

        // helper function for input elements
        function inputFieldHelper(element) {
            
            // get the parent
            let parent = element.parentNode;

            // check for data value
            if (element.getAttribute('data-value') != element.value)
            {
                // create form data
                let formData = new FormData();

                // load form data
                formData.append('category', parent.getAttribute('data-category'));
                formData.append('roomid', parent.getAttribute('data-roomid'));
                formData.append('timestamp', parent.getAttribute('data-timestamp'));
                formData.append('value', element.value);

                // add value
                element.setAttribute('data-value', element.value);

                // replace with preloader
                parent.innerHTML = '<span class="table-preloader"></span>';

                // send request
                send_http_request(formData, (response)=>{

                    // replace inner
                    parent.innerHTML = element.outerHTML;

                    // update input
                    parent.querySelector('input').value = element.value;

                    // handle 
                    handleInputField();
                });
            }
        }
    }
}

// start autoloader
function autoloader() {
    
    // handle input fields
    handleInputField();

    // load toggle box
    loadToggleBox();
}

// send http request to server
function send_http_request(data, callback) {

    // get the current URL
    let url = location.href;
    
    // has ?
    url = url.match(/[?]/g) ? url.substr(0, url.indexOf('?')) : url;

    // build http
    let http = window.ActiveXObject ? window.ActiveXObject('XMLHTTP.Microsoft') : new XMLHttpRequest();

    // make get request
    http.open('POST', url + '?query=update_server', true);
    http.onreadystatechange = function()
    {
        if (http.readyState == 4 && http.status == 200)
        {
            // load callback
            callback.call(this, http.responseText);
        }
    }
    http.send(data);
}

// init light picker
(function(){

    // load calendar picker function
    function loadCalendarPicker()
    {
        (new Lightpick({
            field: document.getElementById('calendar-span'),
            singleDate: true,
            inline:false,
            format:"MM/DD/YY",
            numberOfColumns:1,
            numberOfMonths:1,
            onSelect: function(date){

                // load preloader
                tablePreloader();

                // draw date format
                document.getElementById('date-txt').innerHTML = date.format('Do MMMM YYYY');
    
                // get the current URL
                let url = location.href;
    
                // has ?
                url = url.match(/[?]/g) ? url.substr(0, url.indexOf('?')) : url;
    
                // build http
                let http = window.ActiveXObject ? window.ActiveXObject('XMLHTTP.Microsoft') : new XMLHttpRequest();
    
                // make get request
                http.open('GET', url + '?date=' + date.format('DD-MM-YYYY'), true);
                http.onreadystatechange = function()
                {
                    if (http.readyState == 4 && http.status == 200)
                    {
                        // build an iframe
                        let iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
    
                        // add child
                        document.body.appendChild(iframe);
    
                        // work with contentWindow
                        iframe.contentWindow.document.open();
                        iframe.contentWindow.document.write(http.responseText);
                    
                        // update dom
                        document.querySelector('.scrollable').innerHTML = iframe.contentWindow.document.body.querySelector('.scrollable').innerHTML;
    
                        // close iframe
                        iframe.contentWindow.document.close();

                        // recall autoloader
                        autoloader();
    
                        // remove child
                        document.body.removeChild(iframe);
                    }
                };
                http.send(null);
            }, 
        }));
    }

    // call calendar picker function
    loadCalendarPicker();

    // load autoloader
    autoloader();
    
})();  