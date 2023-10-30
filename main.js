// let inputbox=document.querySelector("#input-box");
// let listcontainer=document.querySelector("#list-container");
// function Addtask(){
//     if(inputbox.value===''){
//         alert("you must write something");}
//         else{
//            let li=document.createElement("li");
//            li.innerHTML=inputbox.value;
//            listcontainer.appendChild(li);
//            let deletee=document.createElement("span");
//            deletee.innerHTML="\u00d7";
//            li.appendChild(span);
//            let edit=document.createElement("a");
//            edit.innerHTML="edit";
//            li.appendChild(button);
//            inputbox.value='';

//         }
        
//     }
var taskList = [];

function addTask() {
  var taskInput = document.getElementById('taskInput');
  var taskListElement = document.getElementById('taskList');
if(taskInput.value === ''){
    alert("enter text")
}

  if (taskInput.value !== '') {
    var task = {
      text: taskInput.value,
       completed: false
    };

    taskList.push(task);
    saveData();

    var taskItem = document.createElement('li');
    var taskText = document.createTextNode(task.text);
    taskItem.appendChild(taskText);

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', function() {
      removeTask(task);
      saveData();
      renderTasks();
    });

    var editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.classList.add('editButton');
    editButton.addEventListener('click', function() {
      editTask(task);
    });

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);
    taskListElement.appendChild(taskItem);

    taskInput.value = '';
  }
}

function removeTask(task) {
  var index = taskList.indexOf(task);
  if (index > -1) {
    taskList.splice(index, 1);
  }
}

function editTask(task) {
  var newText = prompt('Enter new task text:', task.text);
  if (newText !== null && newText !== '') {
    task.text = newText;
    saveData();
    renderTasks();
  }
}

function renderTasks() {
  var taskListElement = document.getElementById('taskList');
  taskListElement.innerHTML = '';

  for (var i = 0; i < taskList.length; i++) {
    var task = taskList[i];

    var taskItem = document.createElement('li');
    var taskText = document.createTextNode(task.text);
    taskItem.appendChild(taskText);

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', (function(task) {
      return function() {
        removeTask(task);
        saveData();
        renderTasks();
      };
    })(task));

    var editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.classList.add('editButton');
    editButton.addEventListener('click', (function(task) {
      return function() {
        editTask(task);
      };
    })(task));

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);
    taskListElement.appendChild(taskItem);
  }
}

function saveData() {
  var data = JSON.stringify(taskList);
  localStorage.setItem('taskList', data);
}

function loadData() {
  var data = localStorage.getItem('taskList');
  if (data) {
    taskList = JSON.parse(data);
  }
}

loadData();
renderTasks();
