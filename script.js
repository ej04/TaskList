var form = document.getElementById("task-form");
var filter = document.getElementById("filter");
var taskInput = document.getElementById("task");
var taskList = document.querySelector(".collection");
var clearBtn = document.querySelector(".clear-tasks");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTasks);
filter.addEventListener("keyup", filterFunction);
document.addEventListener("DOMContentLoaded", getTasks);

function getTasks() {
  var tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const a = document.createElement("a");
    a.className = "delete-item secondary-content";
    a.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(a);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value == "") {
    alert("Please enter some text");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));
    const a = document.createElement("a");
    a.className = "delete-item secondary-content";
    a.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(a);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
  }
}
/* Storing in local storage */
function storeTaskInLocalStorage(task) {
  var tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
/* End of Storing in local storage */

function removeTask(e) {
  console.log(e.target);
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeItemFromStorage(e.target.parentElement.parentElement);
  }
}

function removeItemFromStorage(taskItem) {
  var tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent == task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(e) {
  while (taskList.firstChild) {
    removeItemFromStorage(taskList.firstChild);
    taskList.removeChild(taskList.firstChild);
  }
}

function filterFunction(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  var tasks = document.querySelectorAll(".collection-item");
  tasks.forEach(function (item) {
    const liText = item.firstChild.textContent;
    if (liText.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
