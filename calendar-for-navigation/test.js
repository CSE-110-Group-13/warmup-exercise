const monthSelector = document.getElementById('current-month');
const calendarEvents = document.getElementById('calendarEvents');
const inputText = document.getElementById('inputText');

// Variables that are updated by eventListeners and functions
let currentMonth = "January";
let firstDay = -1;
let currentListItem = "";

// Dictionary to prevent creation of <li> elements more than once
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

// Days of the months
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

// Appends <li> elements to the <ul> elements in grid7x6
function addGridListElements(currentMonth, firstDay) {
    // Only does this once for each month
    if (alreadyGenerated[currentMonth] === false) {
        // Get the selected month <ul> tag
        const monthGrid = document.getElementById(currentMonth);
        alreadyGenerated[currentMonth] = true;

        // Check if leap year for February
        let numberOfDays = monthsDays[currentMonth]
        if (year % 4 === 0 && currentMonth === "February") {
            numberOfDays = numberOfDays + 1;
        }

        // Counter to start the days on the right day of the week up to number of days in the month
        let counter = 0;
        // Creates 42 list elements, some empty, some for the days
        for (let i = 0; i < 42; i++) {
            // firstDay - 1 because the formulas used to calculate the first day of the week is 1-Sunday 2-Monday
            if (i >= (firstDay - 1) && counter < numberOfDays) {
                counter++;
                // Creates an <li> which has a <p> nested
                // <p> contains the calendar contents, <li> contains the day number
                let listItem = document.createElement('li');
                let paragraphItem = document.createElement('p');
                // calendarEvents is the text below the calendar
                // currentListItem is to keep track which day the user pressed
                listItem.addEventListener('click', (event) => {
                    calendarEvents.textContent = listItem.textContent;
                    inputText.value = paragraphItem.textContent;
                    currentListItem = listItem;
                })
                // <li>24 </li>
                listItem.textContent = counter + " ";
                // <li>24 <p>ExampleText</p></li>
                listItem.appendChild(paragraphItem);
                monthGrid.appendChild(listItem);
            } else {
                // Empty <li> for flexbox purposes
                let listItem = document.createElement('li');
                listItem.textContent = "";
                monthGrid.appendChild(listItem);
            }
        }
    }
}

// Change the month with the selector
monthSelector.addEventListener('change', (event) => {
    // Makes the last month you selected hidden
    document.getElementById(currentMonth).classList.add('hidden');

    // Set currentMonth to newly selected month and make it unhidden
    currentMonth = event.target.value;
    document.getElementById(currentMonth).classList.remove('hidden');

    firstDay = calculateFirstDay();
    addGridListElements(currentMonth, firstDay);
})

// Calculate the day of the week the first day lands on
// Hard coded year, can change to whichever (Implement?)
const year = 2024; 
// Dictionary for formula
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

// Change the <p> in <li> to newly entered events
inputText.addEventListener('keydown', (event) => {
    // Prevents accidental enter presses from causing changes
    if (event.key === "Enter" && document.activeElement === inputText) {
        let paragraph = currentListItem.querySelector('p');
        paragraph.textContent = event.target.value;
        calendarEvents.textContent = currentListItem.textContent;
    }
})