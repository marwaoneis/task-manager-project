"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var tasksContainer = document.getElementById("tasks");
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
  console.log(taskList); //Add Date Label

  var currentDateLabel = document.createElement("span");
  currentDateLabel.classList.add("label", "date");
  currentDateLabel.innerText = "Date: " + getCurrentDate();
  newTask.appendChild(currentDateLabel);

  function getCurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    return "".concat(year, "-").concat(month < 10 ? "0" + month : month, "-").concat(day < 10 ? "0" + day : day);
  } //Add Priority Label


  var priorityDropdown = document.getElementById("priorityDropdown");
  var selectedPriority = priorityDropdown.value;
  var priorityLabel = document.createElement("span");
  priorityLabel.classList.add("label", "priority", selectedPriority);
  priorityLabel.innerText = capitalizeFirstLetter(selectedPriority) + " Priority";
  console.log(selectedPriority);
  newTask.appendChild(priorityLabel);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } // Add checkbox to each task


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
  }); //Drag and Drop Implementation

  var draggedTask = null;
  tasksContainer.addEventListener("dragstart", function (e) {
    if (e.target.classList.contains("task")) {
      draggedTask = e.target;
      draggedTask.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    }
  });
  tasksContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
    var afterElement = getDragAfterElement(tasksContainer, e.clientY);
    var draggable = document.querySelector(".task.dragging");

    if (draggable) {
      if (afterElement == null) {
        tasksContainer.appendChild(draggable);
      } else {
        tasksContainer.insertBefore(draggable, afterElement);
      }
    }
  });
  tasksContainer.addEventListener("dragend", function () {
    if (draggedTask) {
      draggedTask.classList.remove("dragging");
      draggedTask = null;
    }
  });

  function getDragAfterElement(container, y) {
    var draggableElements = _toConsumableArray(container.querySelectorAll(".task:not(.dragging)"));

    return draggableElements.reduce(function (closest, child) {
      var box = child.getBoundingClientRect();
      var offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: child
        };
      } else {
        return closest;
      }
    }, {
      offset: Number.NEGATIVE_INFINITY
    }).element;
  }

  tasksContainer.appendChild(newTask);
  inputText.value = "";
}
//# sourceMappingURL=script.dev.js.map
