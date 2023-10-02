import { addTodo, deleteTodo, editTodo, toggleDone } from "./script";

const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("input") as HTMLInputElement;
  
  const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");

  const newList = addTodo(todoList, input.value);
  localStorage.setItem("todoList", JSON.stringify(newList));

  input.value = "";

  updateUI(0);
});

function updateUI(i: number) {
  const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");

  if (i >= todoList.length) return;

  const display = document.getElementById("display") as HTMLElement;
  if (i == 0) display.textContent = "";

  const text = document.createElement("p");
  const edit = document.createElement("button");
  const dlt = document.createElement("button");

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

    const newList = editTodo(todoList, i);
    localStorage.setItem("todoList", JSON.stringify(newList));

    updateUI(0);
  });

  dlt.addEventListener("click", () => {
    display.textContent = "";

    const newList = deleteTodo(todoList, i);
    localStorage.setItem("todoList", JSON.stringify(newList));

    updateUI(0);
  });

  text.addEventListener("click", () => {
    const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");
    const newList = toggleDone(todoList, i);
    localStorage.setItem("todoList", JSON.stringify(newList));

    updateUI(0);
  });

  return updateUI(i + 1);
}
updateUI(0);
