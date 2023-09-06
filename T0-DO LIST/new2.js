const inputBox = document.getElementById("input-box");
const listContain = document.getElementById("list-container");
const datewise = document.getElementById("due-date") ; 
let tasks = [];

function init() {
    showList();
    loadTasksFromLocalStorage(); 
    renderTasks(); // Ensure that tasks are displayed on initial load
}


function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}


init();
function createTask() {
    if (inputBox.value === '') {
      alert("You must write something.");
    } else {
        let task = {
            text: inputBox.value,
            dueDate: datewise.value,
            category: document.getElementById("category-select").value,
            completed: false,
        };

      tasks.push(task);
      
      renderTasks();
      savedata();
    }
    inputBox.value = "";
}


function renderTasks() {
    listContain.innerHTML = "";
    tasks.forEach((task, index) => {
      let li = document.createElement("li");
      li.textContent = task.text;
  
      let date1 = document.createElement("date1");
      date1.textContent = task.dueDate;
  
      let categorySpan = document.createElement("span");
      categorySpan.textContent = task.category;
  
      let edit = document.createElement("span"); // Create the edit icon element
      edit.textContent = "📝"; // Unicode for the pencil icon
      
      let cross = document.createElement("span");
      cross.textContent = "\u00d7";
  
      li.appendChild(date1);
      li.appendChild(categorySpan);
      li.appendChild(edit);
      li.appendChild(cross);
  
      if (task.completed) {
        li.classList.add("checked");
      }
  
      cross.addEventListener("click", function () {
        tasks.splice(index, 1);
        renderTasks();
        savedata();
      });
      
      edit.addEventListener("click", function () {
        editTask(index);
      });
  
      li.addEventListener("click", function () {
        toggleTaskCompletion(index);
        savedata();
      });
  
      listContain.appendChild(li);
    });
}

  

  listContain.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      const index = Array.from(listContain.children).indexOf(e.target);
      toggleTaskCompletion(index);
      savedata();
    }
    else if (e.target.tagName === "CROSS") {
        e.target.parentElement.remove() ; 
        savedata() ; 
    }   
    
    sortTasksByDate() ; 

},false) ; //??

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText !== "") {
      tasks[index].text = newText;
      renderTasks();
      savedata();
    }
}

//Saving data in local storage

function savedata() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the tasks array
}

      
      
    function showList() {
        listContain.innerHTML = localStorage.getItem("data");
  }
showList() ; 

  //Sorting 

  function sortTasksByDate() {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    renderTasks();
  }
  

//Search
  const searchBox = document.getElementById("search-box");

  function filterTasks(searchQuery) {
    const taskItems = document.querySelectorAll("li");
    taskItems.forEach(item => {
      const taskText = item.textContent.toLowerCase(); 
      if (taskText.includes(searchQuery.toLowerCase())) {
        item.style.display = "block"; // Show matching tasks
      } else {
        item.style.display = "none";  // Hide non-matching tasks
      }
    });
  }
  
  searchBox.addEventListener("input", function() {
    filterTasks(searchBox.value);
  });
 
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    savedata();
  }
