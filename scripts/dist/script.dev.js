"use strict";

var todoTasks = document.getElementById("tasks");
var addTaskBtn = document.getElementById("add");
var inputText = document.getElementById("task-input");
var taskList = []; // Adding Task Function

addTaskBtn.addEventListener("click", addTask);
inputText.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  if (inputText.value == "") {
    alert("Kindly Enter a Task Name!!");
    return;
  }

  console.log(inputText.value); //   Create div for the new added task

  var newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.classList.add("draggable");
  newTask.draggable = true;
  taskList.push(newTask);
  console.log(taskList);
  todoTasks.appendChild(newTask); // Add checkbox to each task

  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  newTask.appendChild(checkBox);
  var checkMark = document.createElement("span");
  checkMark.classList.add("checkmark");
  newTask.appendChild(checkMark);
  checkBox.addEventListener("change", function () {
    if (checkBox.checked == true) {
      textField.classList.add("completed"); //   textField.classList.remove("task-text");
    } else {
      //   textField.classList.add("task-text");
      textField.classList.remove("completed");
    }
  }); // Add task input

  var textField = document.createElement("input");
  textField.type = "text";
  textField.classList.add("task-text");
  textField.readOnly = true;
  textField.value = inputText.value;
  newTask.appendChild(textField); //Blur task

  textField.addEventListener("blur", function () {
    if (textField.value == "") {
      newTask.remove();
    }

    textField.readOnly = true;
  }); //Create div for holding buttons

  var btnDiv = document.createElement("div");
  btnDiv.classList.add("action-btn");
  newTask.appendChild(btnDiv); //Add edit button

  var editBtn = document.createElement("button");
  editBtn.classList.add("edit"); //   editBtn.innerHTML =
  //     '<img src="../assets/imgs/edit-icon.svg" alt="edit task" />';

  btnDiv.appendChild(editBtn);
  editBtn.addEventListener("click", function () {
    textField.readOnly = false;
    textField.focus();
  }); //Add delete button

  var deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete"); //   deleteBtn.innerHTML =
  //     '<img src="../assets/imgs/delete-icon.svg" alt="delete task" />';

  btnDiv.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function () {
    var removedTask = taskList.indexOf(newTask);
    taskList.splice(removedTask, 1);
    newTask.remove();
    console.log(taskList);
  });
  inputText.value = "";
} //Drag and Drop Implementation
//# sourceMappingURL=script.dev.js.map
