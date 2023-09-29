class TodoItem {
  constructor(task, done = false) {
    this.task = task;
    this.done = done;
  }
}

class DataModel {
  constructor() {
    this.todoList = [];
  }

  addTodo(task) {
    const todoItem = new TodoItem(task);
    this.todoList.push(todoItem);
  }

  deleteTodo(index) {
    this.todoList = [
      ...this.todoList.slice(0, index),
      ...this.todoList.slice(index + 1),
    ];
  }

  toggleDone(index) {
    this.todoList[index].done = !this.todoList[index].done;
  }

  list() {
    return this.todoList;
  }
}

class Storage {
  constructor(dataModel) {
    this.dataModel = dataModel;
  }

  save() {
    localStorage.setItem("todoList", JSON.stringify(this.dataModel.list()));
  }

  load() {
    this.dataModel.todoList =
      JSON.parse(localStorage.getItem("todoList")) || [];
  }
}

class UI {
  constructor() {
    this.dataModel = new DataModel();
    this.storage = new Storage(this.dataModel);
    this.display = document.getElementById("display");
    this.input = document.getElementById("input");
    this.form = document.querySelector("form");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.dataModel.addTodo(this.input.value);
      this.input.value = "";
      this.storage.save();
      this.updateUI();
    });
  }

  updateUI() {
    this.display.textContent = "";
    this.dataModel.list().forEach((item, index) => {
      const text = document.createElement("p");
      const dlt = document.createElement("button");

      this.display.appendChild(text);
      this.display.appendChild(dlt);
      this.display.appendChild(document.createElement("br"));

      text.textContent = item.task;
      dlt.textContent = "Delete";

      if (item.done) text.style.backgroundColor = "lime";

      dlt.addEventListener("click", () => {
        this.dataModel.deleteTodo(index);
        this.storage.save();
        this.updateUI();
      });

      text.addEventListener("click", () => {
        this.dataModel.toggleDone(index);
        this.storage.save();
        this.updateUI();
      });
    });
  }
}

const ui = new UI();
ui.storage.load();
ui.updateUI();
