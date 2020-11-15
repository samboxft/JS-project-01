function getAllTasksFromLocalStorage() {
    let allTasks = [];
    let tasksJson = localStorage.getItem("allTasks"); // return null if there is no array!
    if (tasksJson) {
        allTasks = JSON.parse(tasksJson); // המרה של מחרוזת למשהו אחר
    }
    return allTasks;
}

function saveAllTasksToLocalStorage(allTasks) {
    const tasksJson = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", tasksJson);
}

function addTaskToLocalStorage(task) {

    const allTasks = getAllTasksFromLocalStorage();

    // Add the new task to the array:
    allTasks.push(task);

    saveAllTasksToLocalStorage(allTasks);
}

function deleteTaskFromLocalStorage(i) {

    const allTasks = getAllTasksFromLocalStorage();

    // Remove task #i
    allTasks.splice(i, 1);

    saveAllTasksToLocalStorage(allTasks);
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

    // clear container
    container.innerHTML = "";

    let allTasks = getAllTasksFromLocalStorage();

    // display 
    for (let i = 0; i < allTasks.length; i++) {

        // create container div: 
        const note = document.createElement("div");
        note.classList.add("notes", "col-xs-3");

        const top = document.createElement("div");
        top.classList.add("top");

        // delete button, set attributes:{ "type", "class bootstrap", "onclickDeleteB" } add del event 
        const deleteB = document.createElement("button");
        deleteB.classList.add("deleteB", "btn", "btn-info", "btn-sm");
        deleteB.setAttribute("type", "button");
        deleteB.setAttribute("onclick", `deleteB(${i})`);

        // span for glyph icon
        const span = document.createElement("span");
        span.classList.add("glyphicon", "glyphicon-remove");

        // display note
        const p = document.createElement("p");
        p.innerHTML = allTasks[i].todo;

        // Div for date and time
        const bottom = document.createElement("div");
        bottom.classList.add("dateNTime");
        bottom.innerHTML = `Finish by: ${allTasks[i].date}<br>To be exact: ${allTasks[i].time}`;

        // Connect all the elements to each other and add them to the document.
        deleteB.appendChild(span);
        top.appendChild(deleteB);
        note.appendChild(top)
        note.appendChild(p)
        note.appendChild(bottom);
        container.appendChild(note);
    }
}

function deleteB(i) {
    deleteTaskFromLocalStorage(i);
    displayAllTasks();
}

displayAllTasks();
