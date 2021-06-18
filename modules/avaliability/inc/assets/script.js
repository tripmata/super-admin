class Availability{
    constructor (element) {
        this.amountOfDays= 11;
        this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.startDate = new Date();

        this.drawHeader(this.startDate);
    }

    drawHeader(date){
        let start = new Date(date);
        let stamp = start.getTime();
		// let stop = new Date(stamp + ((((60 * 60) * 24) * 11) * 1000));

        let tableElem = document.createElement('table');
        tableElem.id = 'myTable';

        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        headerRow.className = 'header';

        // Create empty cell
        let emptyCell = document.createElement('th');
        headerRow.appendChild(emptyCell);

        for(let i = 0; i < this.amountOfDays; i++){
			let date = new Date(stamp);

            let th = document.createElement('th');
            let monthSpan = document.createElement('span');
            let dateSpan = document.createElement('span');
            let daySpan = document.createElement('span');
            
            monthSpan.textContent = this.months[date.getMonth()];
            dateSpan.textContent = date.getDate();
            daySpan.textContent = this.daysOfWeek[date.getDay()];
            th.appendChild(monthSpan);
            th.appendChild(dateSpan);
            th.appendChild(daySpan);

            headerRow.appendChild(th); //appendChild th to row
            // console.log(date.getDate()+"-"+this.daysOfWeek[date.getDay()]+"-"+this.months[date.getMonth()]);

			stamp += (((60 * 60) * 24) * 1000);
        }

        thead.appendChild(headerRow);

        tableElem.appendChild(thead); //appendChild thead to table
        this.drawBody(tableElem, date)
    }

    drawBody(table, date){
        let rooms = ['Basic', 'Standard'];

        for(let i = 0; i < rooms.length; i++){
            let tbody = document.createElement('tbody');

            // Draw Name row
            let nameRow = this.drawRoomName(rooms[i]);

            // Draw Availability row             
            let availabilityRow = this.drawAvailability(date, rooms[i]);

            // Draw Inventory row             
            let inventoryRow = this.drawInventory();

            // Draw booked row             
            let bookedRow = this.drawBooked();

            let roomOnlyRow = this.drawRoomOnly(date, rooms[i]);

            let rateBoxRow = this.drawRateBox();

            let minNightsRow = this.drawMinNights();
            let maxNightsRow = this.drawMaxNights();

            tbody.appendChild(nameRow);
            tbody.appendChild(availabilityRow);
            tbody.appendChild(inventoryRow);
            tbody.appendChild(bookedRow);
            tbody.appendChild(roomOnlyRow);
            tbody.appendChild(rateBoxRow);
            tbody.appendChild(minNightsRow);
            tbody.appendChild(maxNightsRow);

            table.appendChild(tbody);
        }

        document.getElementById('availability-box').innerHTML = ""
        document.getElementById('availability-box').appendChild(table) //appendChild table to document        
    }

    drawRoomName(room){
        // Room Name
        let roomNameRow = document.createElement('tr');
        roomNameRow.className = 'room__name';
        let roomNameCell = document.createElement('td');
        roomNameCell.className = "room_name";

        let roomNameSpan = document.createElement('span');
        let bulkEditCell = document.createElement('a');
        bulkEditCell.href = '#';
        let nameNode = document.createTextNode(room);
        roomNameSpan.appendChild(nameNode);
        let bulkEditNode = document.createTextNode('Bulk edit room');
        bulkEditCell.appendChild(bulkEditNode);

        roomNameCell.appendChild(roomNameSpan);
        roomNameCell.appendChild(bulkEditCell);


        let emptySpan = document.createElement('td');
        emptySpan.colSpan = "11";

        roomNameRow.appendChild(roomNameCell);
        roomNameRow.appendChild(emptySpan);

        return roomNameRow;
    }
    
    drawAvailability(date, room){
        let newDate = new Date(date); 
		let newStamp = newDate.getTime();
        // console.log(newStamp);

        let availabilityRow = document.createElement('tr');
        availabilityRow.className = "availability selectable";       
        let availabilityName = document.createElement('td');
        let availabilityNameNode = document.createTextNode("Availability");
        
        availabilityName.appendChild(availabilityNameNode);
        availabilityRow.appendChild(availabilityName);

        for(let i = 0; i < this.amountOfDays; i++){
            let newdate = new Date(newStamp); 
            let { month, year, day } = this.destructureDate(newdate)
            let td = document.createElement('td');
            td.className = 'selectable_btn';
            td.dataset.calender = `${day}-${month}-${year}`;
            td.dataset.room = room;
            

            let selectable_btn = document.createElement('i');
            selectable_btn.className = 'inner_btn flex-center closed fas fa-times';
            selectable_btn.style.display = 'flex';
            
            td.addEventListener('click', (e) =>{
                let calender = e.target.parentElement.dataset.calender;
                let roomName = e.target.parentElement.dataset.room;
                // console.log(e);
                if(e.target.classList.contains('closed')){
                    e.target.classList.remove('closed');
                    e.target.classList.add('available');
                    
                    e.target.classList.add('fa-check');
                    e.target.classList.remove('fa-times');
                    this.changeAvailability('open', calender, roomName)
                }else{
                    e.target.classList.add('closed');
                    e.target.classList.remove('available');
                   
                    e.target.classList.remove('fa-check');
                    e.target.classList.add('fa-times');

                    this.changeAvailability('close', calender, roomName)
                }
            }, false);
           
            td.appendChild(selectable_btn);

            availabilityRow.appendChild(td);
            
			newStamp += (((60 * 60) * 24) * 1000);
        }

        return availabilityRow;
    }

    drawInventory(){
        let inventoryRow = document.createElement('tr');
        inventoryRow.className = "inventory";       
        let inventoryName = document.createElement('td');
        let inventoryNameNode = document.createTextNode("Inventory");
        
        inventoryName.appendChild(inventoryNameNode);
        inventoryRow.appendChild(inventoryName);

        for(let i = 0; i < this.amountOfDays; i++){
            let td = document.createElement('td');
            let tdNode = document.createTextNode('2');
            td.appendChild(tdNode);
            inventoryRow.appendChild(td);
        }
        return inventoryRow;
    }

    drawBooked(){
        let bookedRow = document.createElement('tr');
        bookedRow.className = "booked";       
        let bookedName = document.createElement('td');
        let bookedNameNode = document.createTextNode("Booked");
        
        bookedName.appendChild(bookedNameNode);
        bookedRow.appendChild(bookedName);

        for(let i = 0; i < this.amountOfDays; i++){
            let td = document.createElement('td');
            let tdNode = document.createTextNode('0');
            td.appendChild(tdNode);
            bookedRow.appendChild(td);
        }
        return bookedRow;
    }

    drawRoomOnly(date, room){
        let newDate = new Date(date); 
        let newStamp = newDate.getTime();
        
        let roomOnlyRow = document.createElement('tr');
        roomOnlyRow.className = "room_only selectable";       
        let roomOnlyName = document.createElement('td');
        let roomOnlyNameNode = document.createTextNode("Room Only(S)");

        

        roomOnlyName.appendChild(roomOnlyNameNode);
        roomOnlyRow.appendChild(roomOnlyName);

        for(let i = 0; i < this.amountOfDays; i++){
            let newdate = new Date(newStamp); 
            let { month, year, day } = this.destructureDate(newdate)

            let td = document.createElement('td');
            td.className = 'selectable_btn closed';
            td.dataset.calender = `${day}-${month}-${year}`;
            td.dataset.room = room;

            let selectable_btn = document.createElement('i');
            selectable_btn.className = 'inner_btn flex-center closed';
            selectable_btn.style.display = 'flex';

            td.appendChild(selectable_btn)

            roomOnlyRow.appendChild(td);
			newStamp += (((60 * 60) * 24) * 1000);

        }

        return roomOnlyRow;
    }

    drawRateBox(){
        let rateBoxRow = document.createElement('tr');
        rateBoxRow.className = 'rate_box'; 
        let rateBox = document.createElement('td');
        let tdNode = document.createTextNode('Rate (USD)');
        rateBox.appendChild(tdNode);
        rateBoxRow.appendChild(rateBox);

        for(let i = 0; i < this.amountOfDays; i++){
            let td = document.createElement('td');
            let input = document.createElement('input'); 
            input.placeholder = "50";           
            td.appendChild(input);

            rateBoxRow.appendChild(td);
        }
        return rateBoxRow;
    }

    drawMinNights(){
        let minNightsRow = document.createElement('tr');
        minNightsRow.className = 'rate_box'; 
        let minNights = document.createElement('td');
        let tdNode = document.createTextNode('Minimum nights');
        minNights.appendChild(tdNode);
        minNightsRow.appendChild(minNights);

        for(let i = 0; i < this.amountOfDays; i++){
            let td = document.createElement('td');
            let input = document.createElement('input'); 
            input.placeholder = "1";           
            td.appendChild(input);

            minNightsRow.appendChild(td);
        }
        return minNightsRow;
    }

    drawMaxNights(){
        let maxNightsRow = document.createElement('tr');
        maxNightsRow.className = 'rate_box'; 
        let maxNights = document.createElement('td');
        let tdNode = document.createTextNode('Maximum nights');
        maxNights.appendChild(tdNode);
        maxNightsRow.appendChild(maxNights);

        for(let i = 0; i < this.amountOfDays; i++){
            let td = document.createElement('td');
            let input = document.createElement('input'); 
            input.placeholder = "7";           
            td.appendChild(input);

            maxNightsRow.appendChild(td);
        }
        return maxNightsRow;
    }
    changeAvailability(type, calender, roomName){
        
        let allRoomOnly = document.querySelectorAll(".room_only td");
        allRoomOnly.forEach(item => {
            // console.log(item.dataset.calender);
            if(calender == item.dataset.calender && roomName == item.dataset.room){
                // console.log(item.firstElementChild)
                
                if(item.firstElementChild.classList.contains('closed')){
                    item.firstElementChild.classList.remove('closed');
                    item.firstElementChild.classList.add('available');    
                    item.firstElementChild.classList.add('fas');
                    item.firstElementChild.classList.add('fa-check');                                    
                }else{
                    item.firstElementChild.classList.add('closed');
                    item.firstElementChild.classList.remove('available');  
                    item.firstElementChild.classList.remove('fas');
                    item.firstElementChild.classList.remove('fa-check');                   
                }

            }
        })
    }

    destructureDate(date){
        return {
            month: date.getMonth(),
            year: date.getFullYear(),
            day: date.getDate()
        }
    }
}





