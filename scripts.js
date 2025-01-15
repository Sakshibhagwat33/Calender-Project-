let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


 const holidays = [
    { month: 0, day: 1, description: "New Year's Day" },     // January 1st
    { month: 1, day: 14, description: "Valentine's Day" },    // February 14th
    { month: 6, day: 4, description: "Independence Day" },    // July 4th
    { month: 11, day: 25, description: "Christmas" },         // December 25th
    // Add more holidays as needed
 ];
 

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;


    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                
                let isHoliday = holidays.some(holiday => holiday.month === month && holiday.day === date);
                if (isHoliday) {
                    cell.classList.add("bg-danger");  // Add a specific class for holidays
                    cell.title = holidays.find(holiday => holiday.month === month && holiday.day === date).description; // Tooltip with holiday description
                }

                
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                }
                if (j === 0) {
                    cell.classList.add("bg-danger");
                    cell.style.color = "white";
                }

                cell.addEventListener('click', function () {
                 
                    let selectedCell = document.querySelector('.selected');
                    if (selectedCell) {
                        selectedCell.classList.remove('selected');
                    }

                    cell.classList.add('selected');

                    alert(`Date: ${date} ${months[month]} ${year}`);
                });
                

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}
