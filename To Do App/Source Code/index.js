let myTasks = [];

// Check if LocalStorage has data
if (localStorage.getItem('myTasks')) {
    // Parse the stored JSON string back into an array
    myTasks = JSON.parse(localStorage.getItem('myTasks'));

    // Iterate through the retrieved tasks and create card elements
    myTasks.forEach(function (task) {
        createCard(task, task.taskId);
    });
}


function Card(title, description, dueDate, taskId) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.taskId = taskId;
}

const newTaskBtn = document.querySelector("#new-task");
const popup = document.querySelector("#popup");

newTaskBtn.addEventListener("click", function () {
    popup.style.visibility = "visible";
});

const closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", function () {
    document.querySelector("#form").reset();
    popup.style.visibility = "hidden";
});

document.querySelector("#form").addEventListener("submit", function (event) {
    event.preventDefault();
    newTask();
    document.querySelector("#form").reset();
});

function newTask() {
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;
    let dueDate = document.querySelector("#due-date").value;

    let taskId = Math.random();

    let NewToDo = new Card(title, description, dueDate, taskId);
    myTasks.push(NewToDo);
    createCard(NewToDo, taskId);
    popup.style.visibility = "hidden";
    localStorage.setItem('myTasks', JSON.stringify(myTasks));

}

function createCard(item, taskId) {
    const content = document.querySelector(".content");

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `card-${taskId}`);
    content.appendChild(card);

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerText = `${item.title}`;
    card.appendChild(title);

    const description = document.createElement("div");
    description.classList.add("description");
    description.innerText = `${item.description}`;
    card.appendChild(description);

    const dueDate = document.createElement("div");
    dueDate.classList.add("due-date");
    dueDate.innerText = `${item.dueDate}`;
    card.appendChild(dueDate);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    card.appendChild(buttons);

    const editBtn = document.createElement("button");
    editBtn.setAttribute("id", "edit-button");
    editBtn.textContent = "Edit";
    buttons.appendChild(editBtn);
    editBtn.addEventListener("click", function () {
        openEditForm(item, taskId);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-button");
    deleteBtn.setAttribute("id", `delete-button-${taskId}`);
    deleteBtn.textContent = "Delete";
    buttons.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function () {
        deleteTask(taskId);
    });
}

function deleteTask(taskId) {
    const index = myTasks.findIndex(item => item.taskId === taskId);

    if (index !== -1) {
        myTasks.splice(index, 1);

        const cardElement = document.getElementById(`card-${taskId}`);
        if (cardElement) {
            cardElement.remove();
        }
    }
    localStorage.setItem('myTasks', JSON.stringify(myTasks));

}

function openEditForm(item, taskId) {
    const editForm = document.querySelector("#edit-form");
    editForm.style.visibility = "visible";

    // Populate the edit form with the current task details
    document.querySelector("#edit-title").value = item.title;
    document.querySelector("#edit-description").value = item.description;
    document.querySelector("#edit-due-date").value = item.dueDate;

    // Add an event listener to the edit form's submit button
    document.querySelector("#edit-submit").addEventListener("click", function (event) {
        event.preventDefault();
        editTask(taskId);
        editForm.style.visibility = "hidden";
    });
}

function editTask(taskId) {
    let title = document.querySelector("#edit-title").value;
    let description = document.querySelector("#edit-description").value;
    let dueDate = document.querySelector("#edit-due-date").value;

    const index = myTasks.findIndex(item => item.taskId === taskId);

    if (index !== -1) {
        myTasks[index].title = title;
        myTasks[index].description = description;
        myTasks[index].dueDate = dueDate;

        // Update the task card with the edited details
        const cardElement = document.getElementById(`card-${taskId}`);
        if (cardElement) {
            cardElement.querySelector(".title").innerText = title;
            cardElement.querySelector(".description").innerText = description;
            cardElement.querySelector(".due-date").innerText = dueDate;
        }
    }
    localStorage.setItem('myTasks', JSON.stringify(myTasks));

}
