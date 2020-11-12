function getAllTasksFromLocalStorage() {
    let allTasks = [];
    let tasksJson = localStorage.getItem("allTasks"); // return null if there is no array!
    if (tasksJson) {
        allTasks = JSON.parse(tasksJson); // המרה של מחרוזת למשהו אחר
    }
    return allTasks;
}

function addTaskToLocalStorage(task) {
    // Load all tasks from local storage: 
    let allTasks = [];
    let tasksJson = localStorage.getItem("allTasks"); // return null if there is no array!
    if (tasksJson) {
        allTasks = JSON.parse(tasksJson); // המרה של מחרוזת למשהו אחר
    }
   

    // Add the new task to the array:
    allTasks.push(task);

    // Save the new array back to local storage: 
    tasksJson = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", tasksJson);
}

function deleteTaskFromLocalStorage(i) {
    let allTasks = [];
    let tasksJson = localStorage.getItem("allTasks"); // return null if there is no array!
    if (tasksJson) {
        allTasks = JSON.parse(tasksJson); // המרה של מחרוזת למשהו אחר
    }

    // Remove task #i
    allTasks.splice(i, 1);

    // Write the task array back to local storage.
    tasksJson = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", tasksJson);
}

function saveTask() {
    // Take todoM objects:
    const todoBox = document.getElementById("todoBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    // Take todo values: 
    const todo = todoBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    // Create task object: 
    const task = { todo, date, time };

    addTaskToLocalStorage(task);

    displayAllTasks();

    // Clear all text boxes: 
    todoBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    todoBox.focus();
}

function displayAllTasks() {

    // Get container todoM object: 
    const container = document.getElementById("container");

    let allTasks = getAllTasksFromLocalStorage();

    //clear container
    container.innerHTML = "";

    //display 
    for (let i = 0; i < allTasks.length; i++) {
        //get container
        const container = document.getElementById("container");

        //  create container div: 
        const notes = document.createElement("div");
        notes.setAttribute("class", "notes");
        container.appendChild(notes);

        const top = document.createElement("div");
        top.setAttribute("class", "top");

        //delete button, set attributes:{ "type", "class bootstrap", "onclickDeleteB" } add del event 
        const deleteB = document.createElement("button");
        deleteB.setAttribute("type", "button");
        deleteB.setAttribute("class", "deleteB btn btn-info btn-sm");
        deleteB.setAttribute("onclick", "deleteB(" + i + ")");
        top.appendChild(deleteB);

        //span for glyph icon
        const span = document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-remove");
        deleteB.appendChild(span);

        //display note
        const p = document.createElement("p");
        top.appendChild(p)
        p.innerHTML = allTasks[i].todo + "<br>";
        //add top div to container
        notes.appendChild(top)

        // Div for date and time
        const bottom = document.createElement("div");
        bottom.setAttribute("class", "dateNTime");
        bottom.innerHTML = "Finish by: " + allTasks[i].date + "<br>" + "To be exact: " + allTasks[i].time;
        top.appendChild(bottom);
    }
}

function deleteB(i) {
    deleteTaskFromLocalStorage(i);
    displayAllTasks();
}

displayAllTasks();
