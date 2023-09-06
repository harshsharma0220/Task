const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // ADDING TO LOCAL STORAGE with initial completion status as false
    saveLocalTodos(todoInput.value, false); 
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    updateCompletionStatus(todo);
}

function updateCompletionStatus(todo) {
    let todos = getLocalTodos();
    const todoIndex = Array.from(todoList.children).indexOf(todo);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todoText, completed) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push({ text: todoText, completed: completed });
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo.text; // Use todo.text to get the task text
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>'; // Correct the HTML structure
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // Correct the HTML structure
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        if (todo.completed) {
            todoDiv.classList.add("completed");
        }

        todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoText = todo.querySelector(".todo-item").innerText; // Get task text from <li> element
    const todoIndex = todos.findIndex(item => item.text === todoText); // Find index based on task text
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// ... Your existing code ...

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchTodo);

function searchTodo() {
    const searchText = searchInput.value.toLowerCase();
    const todos = todoList.childNodes;

    todos.forEach(function (todo) {
        const todoText = todo.querySelector(".todo-item").innerText.toLowerCase();
        if (todoText.includes(searchText)) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
        setInterval(showTime, 1000);
 
        // Defining showTime funcion
        function showTime() {
            // Getting current time and date
            let time = new Date();
            let hour = time.getHours();
            let min = time.getMinutes();
            let sec = time.getSeconds();
            am_pm = "AM";
         
            // Setting time for 12 Hrs format
            if (hour >= 12) {
                if (hour > 12) hour -= 12;
                am_pm = "PM";
            } else if (hour == 0) {
                hr = 12;
                am_pm = "AM";
            }
         
            hour =
                hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
         
            let currentTime =
                hour +
                ":" +
                min +
                ":" +
                sec +
                am_pm;
         
            // Displaying the time
            document.getElementById(
                "clock"
            ).innerHTML = currentTime;
        }
         
        showTime();
    })
}