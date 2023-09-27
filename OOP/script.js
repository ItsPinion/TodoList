class TodoItem {
  constructor(task, done) {
    this.task = task;
    this.done = false;
  }
}

class Storage {
  constructor(newList) {
    this.newList = newList;
  }
  save() {
    localStorage.setItem("todoList", JSON.stringify(this.newList));
  }
}

class DOMItem{
    constructor(){
        this.input = document.getElementById("input")
        this.form = form.addEventListener("submit",(e)=>{
            e.preventDefault()
        this.todoItem = this.input.value 
        })

    }
    remove(){
        this.input.value = ""
    }
}
const c = new DOMItem
