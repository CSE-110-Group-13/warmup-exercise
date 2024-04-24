// Fill grid with divs
const loadCalendar = document.getElementById('load');
const gridList = document.getElementById('gridCalendar');
const monthSelector = document.getElementById('current-month');
let loaded = false;
let currentMonth = "January";

function addGridListElements() {
    for (let i = 0; i < 42; i++) {
        let listItem = document.createElement('li');
        listItem.textContent = "day";
        gridList.appendChild(listItem);
    }
}

// Load the calendar
loadCalendar.addEventListener('click', () => {
    if (loaded === false) {
        addGridListElements();
        loaded = true;
    }
});

// Change the month
monthSelector.addEventListener('change', (event) => {
    currentMonth = event.target.value;
    calculateFirstDay();
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

    return gregorianDate;
}