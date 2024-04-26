
function formatDate(inputDate) {    //Given a date YYYY-MM-DD -> <Day of the Week>,<Month> <Day>
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

    return `${dayOfWeek}, ${monthName} ${dayNumber}`;
}

// Function to initialize the task list
function initializeTaskList() {
    const tasksList = document.getElementById("taskList");
    tasksList.innerHTML = "";
    // Read the tasks data from the json file
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            
            
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
                        <label>
                            <input type="checkbox" ${task.status === "complete" ? "checked": ""}>
                            ${task.description}

                        </label>
                        <hr>
                    `;
                    //Append the item to the unordered list
                    dailyTask.appendChild(item);
                });
                tasksList.appendChild(dailyTask);

            });
        })

        // Handle any errors
        .catch(error => console.error("Error", error));

}

//----- For adding new tasks -------
function addTask() {
    document.getElementById("task-popup").style.display = "block";
}

function closeModal() {
    document.getElementById("task-popup").style.display = "none";
}

function updateJsonFile(taskName, taskDate) {
    //TODO: Update json file with new tasks and re-render task list
}

document.getElementById('taskDate').valueAsDate = new Date(); //Sets default date for adding task to current day


document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let taskName = document.getElementById("taskName").value;
    let taskDate = document.getElementById("taskDate").value;
    updateJsonFile(taskName, taskDate);
    closeModal();
});
//------------------------------------

initializeTaskList();
