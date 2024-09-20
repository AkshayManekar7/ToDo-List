const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from local storage on page load
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `${task.text} (Created at: ${task.createdAt})`;
        taskList.appendChild(taskItem);

        // Add a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            deleteTaskFromStorage(task.text);
        });
        taskItem.appendChild(deleteBtn);
    });
}

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value;
    if (taskText !== "") {
        const taskItem = document.createElement("li");
        const createdAt = new Date().toISOString();
        taskItem.textContent = `${taskText} (Created at: ${createdAt})`;
        taskList.appendChild(taskItem);

        // Add a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            deleteTaskFromStorage(taskText);
        });
        taskItem.appendChild(deleteBtn);

        // Save the task to local storage
        saveTaskToStorage({ text: taskText, createdAt });

        taskInput.value = "";
    }
});

function saveTaskToStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.filter(t => t.text !== task);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}