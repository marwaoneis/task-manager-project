const tasksContainer = document.getElementById("tasks");
const addTaskBtn = document.getElementById("add");
const inputText = document.getElementById("task-input");
const completedTasksColumn = document.getElementById("completedTasksColumn");

let taskList = [];

// Adding Task Function
addTaskBtn.addEventListener("click", addTask);
inputText.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  if (inputText.value == "") {
    alert("Kindly Enter a Task Name!");
    return;
  }
  console.log(inputText.value);

  //   Create div for the new added task
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.classList.add("draggable");
  newTask.draggable = true;
  taskList.push(newTask);
  console.log(taskList);

  // Add checkbox to each task
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  newTask.appendChild(checkBox);
  const checkMark = document.createElement("span");
  checkMark.classList.add("checkmark");
  newTask.appendChild(checkMark);

  checkBox.addEventListener("change", function () {
    if (checkBox.checked == true) {
      textField.classList.add("completed");
      completeTask(this);
    } else {
      textField.classList.remove("completed");
    }
  });

  function completeTask(button) {
    const task = button.parentElement;
    task.classList.add("completed");
    button.remove(); // Remove the "Mark as Completed" button
    completedTasksColumn.appendChild(task);
  }

  //Add Priority Label
  const priorityDropdown = document.getElementById("priorityDropdown");
  const selectedPriority = priorityDropdown.value;
  const priorityLabel = document.createElement("span");
  priorityLabel.classList.add("label", "priority", selectedPriority);
  priorityLabel.innerText =
    capitalizeFirstLetter(selectedPriority) + " Priority";
  console.log(selectedPriority);
  newTask.appendChild(priorityLabel);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Add task input
  const textField = document.createElement("input");
  textField.type = "text";
  textField.classList.add("task-text");
  textField.readOnly = true;
  textField.value = inputText.value;
  newTask.appendChild(textField);

  //Blur task
  textField.addEventListener("blur", function () {
    if (textField.value == "") {
      newTask.remove();
    }
    textField.readOnly = true;
  });

  //Create div for holding buttons
  const btnDiv = document.createElement("div");
  btnDiv.classList.add("action-btn");
  newTask.appendChild(btnDiv);

  //Add Date Label
  const currentDateLabel = document.createElement("span");
  currentDateLabel.classList.add("label", "date");
  currentDateLabel.innerHTML =
    ' <i class="fas fa-flag"></i>' + getCurrentDate();
  btnDiv.appendChild(currentDateLabel);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  }

  //Add edit button
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  //   editBtn.innerHTML =
  //     '<img src="../assets/imgs/edit-icon.svg" alt="edit task" />';
  btnDiv.appendChild(editBtn);

  editBtn.addEventListener("click", function () {
    textField.readOnly = false;
    textField.focus();
  });

  //Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  //   deleteBtn.innerHTML =
  //     '<img src="../assets/imgs/delete-icon.svg" alt="delete task" />';
  btnDiv.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", function () {
    const removedTask = taskList.indexOf(newTask);
    taskList.splice(removedTask, 1);
    newTask.remove();
    console.log(taskList);
  });

  //Drag and Drop Implementation
  let draggedTask = null;

  tasksContainer.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("task")) {
      draggedTask = e.target;
      draggedTask.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    }
  });

  tasksContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(tasksContainer, e.clientY);
    const draggable = document.querySelector(".task.dragging");

    if (draggable) {
      if (afterElement == null) {
        tasksContainer.appendChild(draggable);
      } else {
        tasksContainer.insertBefore(draggable, afterElement);
      }
    }
  });

  tasksContainer.addEventListener("dragend", () => {
    if (draggedTask) {
      draggedTask.classList.remove("dragging");
      draggedTask = null;
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".task:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  tasksContainer.appendChild(newTask);
  inputText.value = "";
}
