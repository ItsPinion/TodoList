class TodoItem {
  constructor(task, done = false) {
    this.task = task;
    this.done = done;
  }
}

class todo {
  constructor() {
    this.todoList = [];
  }

  create(task) {
    const todoItem = new TodoItem(task);
    this.todoList.push(todoItem);
  }

  read(index) {
    return this.todoList[index];
  }

  update(index, task) {
    this.todoList[index].task = task;
  }

  delete(index) {
    this.todoList = [...this.todoList.slice(0, index), ...this.todoList.slice(index + 1)];
  }

  list() {
    return this.todoList;
  }
}

class Storage {
  constructor(todo) {
    this.todo = todo;
  }

  save() {
    localStorage.setItem("todoList", JSON.stringify(this.todo.list()));
  }

  load() {
    this.todo.todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  }
}

class DOMUpdate {
  constructor(todo, storage) {
    this.todo = todo;
    this.storage = storage;
    this.display = document.getElementById("display");
    this.form = document.getElementById("form");
    this.input = document.getElementById("input");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.todo.create(this.input.value);
      this.input.value = "";
      this.storage.save();
      this.updateUI();
    });
  }

  updateUI() {
    this.display.textContent = "";
    this.todo.list().forEach((item, index) => {
      const text = document.createElement("p");
      const dlt = document.createElement("button");

      this.display.appendChild(text);
      this.display.appendChild(dlt);
      this.display.appendChild(document.createElement("br"));

      text.textContent = item.task;
      dlt.textContent = "Delete";

      if (item.done) text.style.backgroundColor = "lime";

      dlt.addEventListener("click", () => {
        this.todo.delete(index);
        this.storage.save();
        this.updateUI();
      });

      text.addEventListener("click", () => {
        item.done = !item.done;
        this.storage.save();
        this.updateUI();
      });
    });
  }
}

const todo = new todo();
const storage = new Storage(todo);
const ui = new DOMUpdate(todo, storage);
storage.load();
ui.updateUI();
