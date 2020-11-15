function saveTask() {

    // Take todoM objects:
    const todoBox = document.getElementById("todoBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    addTask({
        todo: todoBox.value,
        date: dateBox.value,
        time: timeBox.value,
    });

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

    //clear container
    container.innerHTML = "";

    // Load Tasks from local storage
    const allTasks = getAllTasks();

    //display 
    for (let i = 0; i < allTasks.length; i++) {

        // create container div: 
        const notes = document.createElement("div");
        notes.setAttribute("class", "notes");
        container.appendChild(notes);

        const top = document.createElement("div");
        top.setAttribute("class", "top");

        //delete button, set attributes:{ "type", "class bootstrap", "onclickDeleteB" } add del event 
        const deleteB = document.createElement("button");
        deleteB.setAttribute("type", "button");
        deleteB.setAttribute("class", "deleteB btn btn-info btn-sm");
        deleteB.setAttribute("onclick", `deleteB(${i})`);
        top.appendChild(deleteB);

        //span for glyph icon
        const span = document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-remove");
        deleteB.appendChild(span);

        //display note
        const p = document.createElement("p");
        top.appendChild(p);
        p.innerHTML = `${allTasks[i].todo}<br>`;
        //add top div to container
        notes.appendChild(top);

        // Div for date and time
        const bottom = document.createElement("div");
        bottom.setAttribute("class", "dateNTime");
        bottom.innerHTML = `Finish by: ${allTasks[i].date}<br>To be exact: ${allTasks[i].time}`;
        top.appendChild(bottom);
    }
}

function deleteB(i) {
    deleteTask(i);
    displayAllTasks();
}

/**
 * Add a new task object to local storage.
 * @param {*} task New task object.
 */
function addTask(task) {
    const allTasks = getAllTasks();
    // Add the new task to the array:
    allTasks.push(task);
    saveAllTasks(allTasks);
}

/**
 * Remove a task from local storage.
 * @param {number} i Index of the task to delete.
 */
function deleteTask(i) {
    const allTasks = getAllTasks();
    // Remove task #i from the array:
    allTasks.splice(i, 1);
    saveAllTasks(allTasks);
}

/**
 * Read the task array from local storage.
 * @returns {[*]} An array of tasks.
 */
function getAllTasks() {
    const tasksJson = localStorage.getItem("allTasks"); // return null if there is no array!
    return tasksJson ? JSON.parse(tasksJson) : [];
}

/**
 * Write the task array back to local storage.
 * @param {[*]} allTasks The new array.
 */
function saveAllTasks(allTasks) {
    // Save the new array back to local storage: 
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

displayAllTasks();
