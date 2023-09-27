import { addTodo, deleteTodo, toggleDone } from "./script";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("input");
  const todoItem = addTodo(input.value);

  const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  localStorage.setItem("todoList", JSON.stringify([...todoList, todoItem]));

  input.value = "";

  updateUI(0);
});

function updateUI(i) {

  const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

  if (i >= todoList.length) return;

  const display = document.getElementById("display");
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

    const newList = deleteTodo(todoList, i);
    localStorage.setItem("todoList", JSON.stringify(newList));

    updateUI(0);
  });

  text.addEventListener("click", () => {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    const newList = toggleDone(todoList, i);
    localStorage.setItem("todoList", JSON.stringify(newList));

    updateUI(0);
  });
  
  return updateUI(i + 1);
}
updateUI(0);
