const add = document.querySelector("#add");
add.addEventListener("click", addTask);

const input = document.getElementById("task-input");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  if (document.querySelector("#new-task input").value.length == 0) {
    alert("Kindly Enter a Task Name!!");
  } else {
    document.querySelector("#tasks").innerHTML += `
            <div class="task" draggable="true">
                <span id="task-name">
                    ${document.querySelector("#new-task input").value}
                </span>
                <div class="task-btns">
                    <button class="delete-btn"></button>
                    <button type="submit" id="edit-button" class="edit-btn"></button>
                    <button type="submit" id="end-editing" class="end-btn" hidden></button>
                </div>
            </div>
        `;
    input.value = "";
    // console.log(`${document.querySelector("#new-task input").value}`);

    var current_tasks = document.querySelectorAll(".delete-btn");
    for (var i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.parentNode.remove();
      };
    }

    const edit = document.getElementById("edit-button");
    const end = document.getElementById("end-editing");
    const text = document.getElementById("task-name");
    edit.addEventListener("click", function () {
      text.contentEditable = true;
      end.removeAttribute("hidden");
    });

    end.addEventListener("click", function () {
      end.remove();
      text.contentEditable = false;
    });
  }
}
