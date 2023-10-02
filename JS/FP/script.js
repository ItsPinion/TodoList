export function addTodo(task) {
  const todoItem = {
    task: task,
    done: false,
  };
  return todoItem;
}

export function deleteTodo(todoList, index) {
  const newList = [...todoList.slice(0, index), ...todoList.slice(index + 1)];
  
  return newList;
}

export function toggleDone(todoList, index) {
  const todoItem = {
    task: todoList[index].task,
    done: !todoList[index].done,
  };

  const newList = [
    ...todoList.slice(0, index),
    todoItem,
    ...todoList.slice(index + 1),
  ];

  return newList;
}
