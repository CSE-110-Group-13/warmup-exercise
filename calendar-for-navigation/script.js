// Function to populate the calendar with dates
function populateCalendar() {
    // Read the JSON file and get the necessary data
    var jsonData = JSON.parse(data.JSON);

    // Get the table body element
    var tableBody = document.querySelector('tbody');

    // Clear the table body
    tableBody.innerHTML = '';

    // TODO: Check this and add functionalty for hyperlinks
    // Loop through the rows and use the JSON data to start putting numbers once
    // the start day is reached and until all the days in that month are added
    for (var i = 0; i < 5; i++) {
        // Create a new row
        var row = document.createElement('tr');
        // Counter to figure out when to start the date
        var startCounter = 0;
        var dayCounter = 1;
        // Loop through the columns
        for (var j = 0; j < 7; j++) {
            if (startCounter >= jsonData.start) {
                if (dayCounter >= jsonData.length) {
                    break;
                }
                // Create a new cell
                var cell = document.createElement('td');
                // Create a new text node with the date
                var cellText = document.createTextNode(dayCounter + 1);
                // Append the text node to the cell
                cell.appendChild(cellText);
                dayCounter++;
            }
            startCounter++;
        }
        // Append the row to the table body
        tableBody.appendChild(row);
    }
}

