// define UI variabels
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// function load all event listeners
loadEventListeners();

// function loadEventListeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);   // add task event
  taskList.addEventListener('click', removeTask); // remove task item
  clearBtn.addEventListener('click', clearTasks ); // clear all the tasks
  filter.addEventListener('keyup', filterTasks); // filter through tasks
}


// FUNCTION getTasks from local storage
function getTasks() {
  let tasks;
    if (localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element 
    const link = document.createElement('a');
    // add class to link element
    link.className = 'delete-item secondary-content';
    // add icon to link element
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to the LI
    li.appendChild(link);
    // append LI to UL
    taskList.appendChild(li);
  });
}

// FUNCTION addTask 
function addTask(e) {
  if(taskInput.value === '') {
    alert('add a task');
  }
  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element 
  const link = document.createElement('a');
  // add class to link element
  link.className = 'delete-item secondary-content';
  // add icon to link element
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to the LI
  li.appendChild(link);
  // append LI to UL
  taskList.appendChild(li);
  // store in local storage
  storeTaskInLocalStorage(taskInput.value);
  // clear the user input
  taskInput.value = '';
  e.preventDefault();
}

// FUNCTION storeTaskInLocalStorage
function storeTaskInLocalStorage(task) {
  let tasks;
    if (localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// FUNCTION removeTask
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove(); // remove from front end list
      removeTaskFromLocalStorage(e.target.parentElement.parentElement); // remove from Local storage
    }
  }
}

// FUNCTION removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
    if (localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  tasks.forEach(function(task, index){
    if (taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// FUNCTION clearTasks
function clearTasks(){
  // taskList.innerHTML = ''; // easier way
  while (taskList.firstChild) {  // faster way
    taskList.removeChild(taskList.firstChild);
  } 
  clearTasksFromLocalStorage();
}

// FUNCTION clearTasksFromLocalStorage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}


// FUNCTION filterTasks
function filterTasks(e){
  const text = e.target.value.toLowerCase(); // what is the value being entered and set it to lower case
  document.querySelectorAll('.collection-item').forEach( // check for all the items with a .collection-item tag, loop through them all and execute the function task
    function(task){
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1){ // if the user input has similarities with one of the items that have a .collection item tag then show those specific tasks
        task.style.display = 'block';
      } else { // if not then show no tasks
        task.style.display = 'none';
      }
  });
}