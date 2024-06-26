export function addTodo(todoList,task) {
  const todoItem = {
    task: task,
    done: false,
  };
  const newList = [...todoList, todoItem];
  return newList;
}

export function deleteTodo(todoList, index) {
  const newList = [...todoList.slice(0, index), ...todoList.slice(index + 1)];

  return newList;
}

export function editTodo(todoList, index) {
  const todoItem = {
    task: prompt("Enter task:") || todoList[index].task,
    done: todoList[index].done,
  };

  const newList = [
    ...todoList.slice(0, index),
    todoItem,
    ...todoList.slice(index + 1),
  ];

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
