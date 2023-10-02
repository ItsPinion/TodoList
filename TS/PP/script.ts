let todoList = JSON.parse(localStorage.getItem("todoList") || "[]");
const display = document.getElementById("display") as HTMLElement;
const input = document.getElementById("input") as HTMLInputElement;
const form = document.querySelector("form") as HTMLFormElement;

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

function deleteTodo(index:number) {
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function toggleDone(index:number) {
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
    display.appendChild(text);
    display.appendChild(dlt);
    display.appendChild(document.createElement("br"));

    text.textContent = todoList[i].task;
    dlt.textContent = "Delete";

    if (todoList[i].done) text.style.backgroundColor = "lime";

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
