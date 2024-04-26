const monthSelector = document.getElementById('current-month');
// const calendarEvents = document.getElementById('calendarEvents');
const inputText = document.getElementById('inputText');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const selectedDateH3 = document.getElementById('selectedDateH3');
// selected-date contains clones of the span elements in the <li>
// use this map to link the clone and original together to delete/edit
let cloneSpanMap = new Map();

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
                listItem.dataset.value = counter;
                // calendarEvents is the text below the calendar
                // currentListItem is to keep track which day the user pressed
                listItem.addEventListener('click', (event) => {
                    // calendarEvents.textContent = listItem.textContent;
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

nextButton.addEventListener('click', () => {
    // Makes the last month you selected hidden
    document.getElementById(currentMonth).classList.add('hidden');

    if(currentMonth === "December") {
        document.getElementById("January").classList.remove('hidden');
        monthSelector.value = "January";
        currentMonth = "January";
    }
    else {
        // Set currentMonth to newly selected month and make it unhidden
        const nextIndex = (monthSelector.selectedIndex + 1) % monthSelector.options.length;
        currentMonth = monthSelector.options[nextIndex].value;
        monthSelector.value = currentMonth;
        document.getElementById(currentMonth).classList.remove('hidden');
    }
    firstDay = calculateFirstDay();
    addGridListElements(currentMonth, firstDay);
})

prevButton.addEventListener('click', () => {
    // Makes the last month you selected hidden
    document.getElementById(currentMonth).classList.add('hidden');

    if(currentMonth === "January") {
        document.getElementById("December").classList.remove('hidden');
        monthSelector.value = "December";
        currentMonth = "December";
    }
    else {
        // Set currentMonth to newly selected month and make it unhidden
        const prevIndex = (monthSelector.selectedIndex - 1 + monthSelector.options.length) % monthSelector.options.length;
        currentMonth = monthSelector.options[prevIndex].value;
        monthSelector.value = currentMonth;
        document.getElementById(currentMonth).classList.remove('hidden');
    }
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
        let textEntry = event.target.value.trim(); // Trim whitespace
        
        if (textEntry !== "" && !(editEntryButton.classList.contains('active'))) {
            let category = document.getElementById("categorySelect").value;
            let legendItem = document.querySelector(`.legend-square.${category}`);
            let computedStyle = window.getComputedStyle(legendItem);
            let color = computedStyle.getPropertyValue('background-color');
            
            // Check if there are existing spans with different categories
            let existingSpans = paragraph.querySelectorAll('span');
            let hasDifferentCategory = Array.from(existingSpans).some(span => {
                return span.dataset.category !== category;
            });

            // If there are no existing spans with different categories, create a new one
            if (!hasDifferentCategory) {
                // Create a new <span> element for the text entry
                let newTextSpan = document.createElement('span');
                newTextSpan.textContent = textEntry;
                newTextSpan.style.color = "black";
                newTextSpan.style.display = "block";
                newTextSpan.style.backgroundColor = color;
                newTextSpan.dataset.category = category; 
                
                // Append the new text entry to the existing <p> element
                paragraph.appendChild(newTextSpan);
            } else {
                // If there are existing spans with different categories, append the text directly
                paragraph.innerHTML += `<span style="color: black; background-color: ${color}; display: block;" data-category="${category}">${textEntry}</span>`;
            }

            // Clear the input field after adding the text entry
            event.target.value = "";
            const selectedDate = document.getElementById('selected-date');
            selectedDateH3.textContent = "Selected Date: " + currentListItem.dataset.value;
            selectedDate.textContent = "";
            let listOfSpanElements = currentListItem.querySelectorAll('span');
            listOfSpanElements.forEach( spanElement => {
                let clone = spanElement.cloneNode(true);
                cloneSpanMap.set(clone, spanElement);
                selectedDate.appendChild(clone);
            });
        }
        
        // Update the calendar events text
        // calendarEvents.textContent = currentListItem.textContent;


        // testing edit-entry
        if (editEntryButton.classList.contains('active')) {
            selectedDate = document.getElementById('selected-date');
            let listOfSpanElements = selectedDate.querySelectorAll('span');
            let category = document.getElementById("categorySelect").value;
            let legendItem = document.querySelector(`.legend-square.${category}`);
            let computedStyle = window.getComputedStyle(legendItem);
            let color = computedStyle.getPropertyValue('background-color');

            listOfSpanElements.forEach(spanElement => {
                if (spanElement.classList.contains('selectedSpan')) {
                    spanElement.textContent = textEntry;
                    spanElement.style.color = "black";
                    spanElement.style.display = "block";
                    spanElement.style.backgroundColor = color;
                    spanElement.dataset.category = category;
                    cloneSpanMap.get(spanElement).textContent = textEntry;
                    cloneSpanMap.get(spanElement).style.color = "black";
                    cloneSpanMap.get(spanElement).style.display = "block";
                    cloneSpanMap.get(spanElement).style.backgroundColor = color;
                    cloneSpanMap.get(spanElement).dataset.category = category;
                }
            })
        }
    }
});


document.getElementById('grid7x6').addEventListener('click', (event) => {
    // Check if the clicked element is a list item
    if (event.target.tagName === 'LI') {
        const selectedItem = event.target;
        // Remove any existing background color from previously selected items
        document.querySelectorAll('#grid7x6 ul li').forEach(li => {
            li.classList.remove('selected');
        });
        // Add background color to the clicked item
        selectedItem.classList.add('selected');
        
        // Update currentListItem to the clicked list item
        currentListItem = selectedItem;

        const selectedDate = document.getElementById('selected-date');
        selectedDateH3.textContent = "Selected Date: " + currentListItem.dataset.value;
        selectedDate.textContent = "";
        let listOfSpanElements = currentListItem.querySelectorAll('span');
        listOfSpanElements.forEach( spanElement => {
            let clone = spanElement.cloneNode(true);
            cloneSpanMap.set(clone, spanElement);
            selectedDate.appendChild(clone);
        });
    }
});

// Delete Entry and Edit Entry buttons
deleteEntryButton = document.getElementById('delete-entry');
function deleteEntryActiveClickListener() {
    this.remove();
    cloneSpanMap.get(this).remove();
}
deleteEntryButton.addEventListener('click', (event) => {
    if (deleteEntryButton.classList.contains('inactive') === true) {
        deleteEntryButton.classList.add('active');
        deleteEntryButton.classList.remove('inactive');
        selectedDate = document.getElementById('selected-date');
        let listOfSpanElements = selectedDate.querySelectorAll('span');
        listOfSpanElements.forEach( spanElement => {
            // spanElement.addEventListener('click', () => {
            //     spanElement.remove();
            //     cloneSpanMap.get(spanElement).remove();
            // })
            spanElement.addEventListener('click', deleteEntryActiveClickListener);
        });
    }
    else if (deleteEntryButton.classList.contains('active') === true) {
        deleteEntryButton.classList.remove('active');
        deleteEntryButton.classList.add('inactive');
        selectedDate = document.getElementById('selected-date');
        let listOfSpanElements = selectedDate.querySelectorAll('span');
        listOfSpanElements.forEach( spanElement => {
            spanElement.removeEventListener('click', deleteEntryActiveClickListener);
        });
    }
})

editEntryButton = document.getElementById('edit-entry');
function editEntryActiveClickListener() {
    this.classList.add('selectedSpan');
    inputText.value = this.textContent;

    selectedDate = document.getElementById('selected-date');
    let listOfSpanElements = selectedDate.querySelectorAll('span');
    listOfSpanElements.forEach( spanElement => {
        if (spanElement != this) {
            spanElement.classList.remove('selectedSpan');
        }
    });
}
editEntryButton.addEventListener('click', (event) => {
    if (editEntryButton.classList.contains('inactive') === true) {
        editEntryButton.classList.add('active');
        editEntryButton.classList.remove('inactive');
        selectedDate = document.getElementById('selected-date');
        let listOfSpanElements = selectedDate.querySelectorAll('span');
        listOfSpanElements.forEach( spanElement => {
            // spanElement.addEventListener('click', () => {
            //     spanElement.classList.add('selectedSpan');
            //     inputText.value = spanElement.textContent;
            // })
            spanElement.addEventListener('click', editEntryActiveClickListener);
        });
    }
    else if (editEntryButton.classList.contains('active') === true) {
        editEntryButton.classList.remove('active');
        editEntryButton.classList.add('inactive');
        selectedDate = document.getElementById('selected-date');
        let listOfSpanElements = selectedDate.querySelectorAll('span');
        listOfSpanElements.forEach( spanElement => {
            spanElement.removeEventListener('click', editEntryActiveClickListener);
        });
    }
})

//Broken code, check Issues

// 
// let entries = {
//     "2024-01-15": ["Meeting at noon", "Lunch with team"],
//     "2024-01-16": ["Project deadline"]
// };

// document.getElementById('grid7x6').addEventListener('click', (event) => {
//     if (event.target.tagName === 'LI' && event.target.textContent.trim() !== "") {
//         const selectedDay = event.target.textContent.trim();
//         const selectedMonth = monthSelector.value;
//         const selectedYear = document.getElementById('current-year').textContent;
//         const dateKey = `${selectedYear}-${selectedMonth}-${selectedDay}`;
//         displayEntries(dateKey);
//     }
// });

// function displayEntries(dateKey) {
//     const entryList = document.getElementById('entry-list');
//     const selectedDateDisplay = document.getElementById('selected-date');
//     selectedDateDisplay.textContent = dateKey;
//     entryList.innerHTML = '';  // Clear previous entries

//     if (entries[dateKey]) {
//         entries[dateKey].forEach(entry => {
//             const li = document.createElement('li');
//             li.textContent = entry;
//             entryList.appendChild(li);
//         });
//         document.getElementById('delete-entry').style.display = 'inline';
//         document.getElementById('edit-entry').style.display = 'inline';
//     } else {
//         entryList.innerHTML = '<li>No entries for this date.</li>';
//         document.getElementById('delete-entry').style.display = 'none';
//         document.getElementById('edit-entry').style.display = 'none';
//     }
// }

// document.getElementById('edit-entry').addEventListener('click', () => {
//     const currentEntries = entries[document.getElementById('selected-date').textContent];
//     const newText = prompt("Edit entry:", currentEntries.join(", "));
//     if (newText !== null) {
//         entries[document.getElementById('selected-date').textContent] = newText.split(",");
//         displayEntries(document.getElementById('selected-date').textContent);
//     }
// });

// document.getElementById('delete-entry').addEventListener('click', () => {
//     const confirmDelete = confirm("Are you sure you want to delete all entries for this date?");
//     if (confirmDelete) {
//         delete entries[document.getElementById('selected-date').textContent];
//         displayEntries(document.getElementById('selected-date').textContent);
//     }
// });