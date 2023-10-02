let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let display = document.getElementById("display");
let input = document.getElementById("input");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
  updateUI();
});

function addTodo() {
  const todoItem = {
    task: input.value,
    done: false,
  };

  input.value = "";

  todoList.push(todoItem);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function editTodo(index) {
  const newTask = prompt("Enter task:");
  const todoItem = {
    task: newTask || todoList[index].task,
    done: todoList[index].done,
  };

  todoList.splice(index, 1, todoItem);

  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function toggleDone(index) {
  const todoItem = {
    task: todoList[index].task,
    done: !todoList[index].done,
  };

  todoList.splice(index, 1, todoItem);

  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function updateUI() {
  for (let i = 0; i < todoList.length; i++) {
    if (i == 0) display.textContent = "";

    const text = document.createElement("p");
    const dlt = document.createElement("button");
    const edit = document.createElement("button");

    display.appendChild(text);
    display.appendChild(edit);
    display.appendChild(dlt);
    display.appendChild(document.createElement("br"));

    text.textContent = todoList[i].task;
    edit.textContent = "Edit";
    dlt.textContent = "Delete";

    if (todoList[i].done) text.style.backgroundColor = "lime";

    edit.addEventListener("click", () => {
      display.textContent = "";
      editTodo(i);
      updateUI();
    });

    dlt.addEventListener("click", () => {
      display.textContent = "";
      deleteTodo(i);
      updateUI();
    });

    text.addEventListener("click", () => {
      toggleDone(i);
      updateUI();
    });
  }
}

updateUI();
