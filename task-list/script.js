function formatDate(inputDate) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const dateParts = inputDate.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month indexes are 0-based
    const day = parseInt(dateParts[2]);

    const date = new Date(year, month, day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
// `
    return `${dayOfWeek}, ${monthName} ${dayNumber}`;
}

// Function to initialize the task list
function initializeTaskList() {
    // Read the tasks data from the json file
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const tasksList = document.getElementById("taskList");
            
            // Iterate over every element
            data.journal.forEach(entry => {
                const formattedDate = formatDate(entry.date);
                // Create a new div for each day's tasks
                const dailyTask = document.createElement("div");
                dailyTask.className = "task-container";
                
                // Create a new list element for the date
                const date = document.createElement("h3");
                date.innerHTML = formattedDate;
                
                // Append the date to the dailyTask div
                dailyTask.appendChild(date);

                // Loop through each task
                entry.tasks.forEach(task => {
                    // Create a new list element for the task
                    const item = document.createElement("li");
                    item.innerHTML = `
                        <label class=${task.status === 'complete' ? 'strikethrough' : ''}>
                            <input type="checkbox" onclick="taskOnClick(event)" ${task.status === "complete" ? "checked": ""}>
                            ${task.description}

                        </label>
                        <hr>
                    `;
                    //Append the item to the unordered list
                    dailyTask.appendChild(item);
                });
		    
                tasksList.appendChild(dailyTask);

	// Adding Extra tasks to the date.
		const addButton = document.createElement("button");
                addButton.textContent = "Add Task";
                addButton.onclick = function() {
                const newTaskDescription = prompt("Enter New task:");
                    if (newTaskDescription.trim() !== "") {
                        const newItem = document.createElement("li");
                        newItem.innerHTML = `
                        <label> <input type="checkbox" onclick="taskOnClick(event)">
                        ${newTaskDescription}
                        </label>
                        <hr>
                        `;
                    dailyTask.appendChild(newItem);
                    } else {
                        alert("Task description cannot be empty!");
                    }
                };

            tasksList.appendChild(addButton);

            });
        })
//Functionality for Adding Extra Tasks Ends here. 
	
        // Handle any errors
        .catch(error => console.error("Error", error));

}

function taskOnClick(event) {
	if (event.target.checked) {
		event.target.parentElement.classList.add("strikethrough");
	} else {
		event.target.parentElement.classList.remove("strikethrough");
	}
}

initializeTaskList();
