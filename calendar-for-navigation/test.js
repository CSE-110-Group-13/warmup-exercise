// Fill grid with divs
const monthSelector = document.getElementById('current-month');
let currentMonth = "January";
let firstDay = -1;

let alreadyGenerated = {
    "January": false,
    "February": false,
    "March": false,
    "April": false,
    "May": false,
    "June": false,
    "July": false,
    "August": false,
    "September": false,
    "October": false,
    "November": false,
    "December": false
}

const monthsDays = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
}

function addGridListElements(currentMonth, firstDay) {
    const monthGrid = document.getElementById(currentMonth);
    console.log(monthGrid);
    if (alreadyGenerated[currentMonth] === false) {
        alreadyGenerated[currentMonth] = true;

        let numberOfDays = monthsDays[currentMonth]
        if (year % 4 === 0 && currentMonth === "February") {
            numberOfDays = numberOfDays + 1;
        }

        let counter = 0;
        for (let i = 0; i < 42; i++) {
            
            if (i >= (firstDay - 1) && counter < numberOfDays) {
                counter++;
                let listItem = document.createElement('li');
                let detailItem = document.createElement('details');
                let summaryItem = document.createElement('summary');
                listItem.textContent = counter;
                monthGrid.appendChild(listItem);
                detailItem.textContent = "blah blahblah blahblah blahblah blah";
                summaryItem.textContent = "task";
                listItem.appendChild(detailItem);
                detailItem.appendChild(summaryItem);
            } else {
                let listItem = document.createElement('li');
                listItem.textContent = "";
                monthGrid.appendChild(listItem);
            }
        }
    }
}

// Change the month
monthSelector.addEventListener('change', (event) => {
    document.getElementById(currentMonth).classList.add('hidden');

    currentMonth = event.target.value;

    document.getElementById(currentMonth).classList.remove('hidden');

    firstDay = calculateFirstDay();
    addGridListElements(currentMonth, firstDay);
})

// Calculate the day of the week the first day lands on
const year = 2024; 
monthKeyValue = {
    "January": 1,
    "February": 4,
    "March": 4,
    "April": 0,
    "May": 2,
    "June": 5,
    "July": 0,
    "August": 3,
    "September": 6,
    "October": 1,
    "November": 4,
    "December": 6 
}
function calculateFirstDay() {
    // https://cs.uwaterloo.ca/~alopez-o/math-faq/node73.html
    // Take the last two digits of the year.
    const lastTwoDigits = year % 100;
    // Divide by 4, discarding any fraction.
    const divBy4 = Math.floor((lastTwoDigits / 4))
    // Add the day of the month.
    const addDayOfMonth = divBy4 + 1;
    // Add the month's key value: JFM AMJ JAS OND 144 025 036 146
    let addKeyValue = addDayOfMonth + monthKeyValue[currentMonth];
    // Subtract 1 for January or February of a leap year.
    if (year % 4 === 0 && (currentMonth === "January" || currentMonth === "February" )) {
        addKeyValue = addKeyValue - 1;
    }
    // For a Gregorian date, add 0 for 1900's, 6 for 2000's, 4 for 1700's, 2 for 1800's; for other years, add or subtract multiples of 400.
    let gregorianDate = addKeyValue + 6;
    // Add the last two digits of the year.
    gregorianDate = gregorianDate + lastTwoDigits;
    // Divide by 7 and take the remainder.
    gregorianDate = gregorianDate % 7;
    console.log(gregorianDate);
    return gregorianDate;
}

// const loadCalendar = document.getElementById('load');
// let loaded = false;
// Load the calendar
// loadCalendar.addEventListener('click', () => {
//     if (loaded === false) {
//         addGridListElements();
//         loaded = true;
//     }
// });