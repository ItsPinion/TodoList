interface ITodoItem {
  task: string;
  done: boolean;
}

class TodoItem implements ITodoItem {
  task: string;
  done: boolean;
  constructor(task: string, done: boolean = false) {
    this.task = task;
    this.done = done;
  }
}

interface IDataModel {
  todoList: ITodoItem[];
  addTodo(task: string): void;
  deleteTodo(index: number): void;
  toggleDone(index: number): void;
  editTodo(index: number): void;
  list(): ITodoItem[];
}

class DataModel implements IDataModel {
  todoList: ITodoItem[];
  constructor() {
    this.todoList = [];
  }

  addTodo(task: string) {
    const todoItem = new TodoItem(task);
    this.todoList.push(todoItem);
  }

  deleteTodo(index: number) {
    this.todoList = [
      ...this.todoList.slice(0, index),
      ...this.todoList.slice(index + 1),
    ];
  }

  editTodo(index: number) {
    this.todoList[index].task = prompt("Enter Task:")||this.todoList[index].task;
  }

  toggleDone(index: number) {
    this.todoList[index].done = !this.todoList[index].done;
  }

  list() {
    return this.todoList;
  }
}

interface IStorage {
  dataModel: IDataModel;
  save(): void;
  load(): void;
}

class Storage implements IStorage {
  dataModel: IDataModel;
  constructor(dataModel: IDataModel) {
    this.dataModel = dataModel;
  }

  save() {
    localStorage.setItem("todoList", JSON.stringify(this.dataModel.list()));
  }

  load() {
    this.dataModel.todoList =
      JSON.parse(localStorage.getItem("todoList") || "[]");
  }
}

class UI {
  dataModel: IDataModel;
  storage: IStorage;
  display: HTMLElement;
  input: HTMLInputElement;
  form: HTMLFormElement;

  constructor() {
    this.dataModel = new DataModel();
    this.storage = new Storage(this.dataModel);
    this.display = document.getElementById("display") as HTMLElement;
    this.input = document.getElementById("input") as HTMLInputElement;
    this.form = document.querySelector("form") as HTMLFormElement;

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
      const edit = document.createElement("button");

      this.display.appendChild(text);
      this.display.appendChild(edit);
      this.display.appendChild(dlt);
      this.display.appendChild(document.createElement("br"));

      text.textContent = item.task;
      dlt.textContent = "Delete";
      edit.textContent = "Edit";


      if (item.done) text.style.backgroundColor = "lime";

      edit.addEventListener("click", () => {
        this.dataModel.editTodo(index);
        this.storage.save();
        this.updateUI();
      });

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

export default {}