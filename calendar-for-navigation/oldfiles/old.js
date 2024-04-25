// Function to populate the calendar with dates
function populateCalendar() {
    // Read the JSON file and get the necessary data
    fetch('data.JSON')
        .then(response => response.json())
        .then(jsonData => {

            // Get the table body element
            var tableBody = document.querySelector('tbody');

            // Clear the table body
            tableBody.innerHTML = '';

            // Loop through the rows and use the JSON data to start putting numbers once
            // the start day is reached and until all the days in that month are added
            for (var i = 0, dayCounter = 1; i < 6; i++) {
                // Create a new row
                var row = document.createElement('tr');
                // Counter to figure out when to start the date
                var startCounter = 0;
                // Loop through the columns
                for (var j = 0; j < 7; j++) {
                    // Create a new cell
                    var cell = document.createElement('td');
                    if (startCounter >= jsonData.start && dayCounter <= jsonData.length) {
                        // Create a new text node with the date
                        var cellText = document.createTextNode(dayCounter);
                        // Append the text node to the cell
                        cell.appendChild(cellText);
                        dayCounter++;
                    }
                    // Append the cell to the row
                    row.appendChild(cell);
                    startCounter++;
                }
                // Append the row to the table body
                tableBody.appendChild(row);
            }
        }).catch(error => console.error('Error:', error));
}

