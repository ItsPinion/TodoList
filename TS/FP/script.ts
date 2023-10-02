export function addTodo(task: string) {
  const todoItem = {
    task: task,
    done: false,
  };
  return todoItem;
}

type todotype = {
  task: string;
  done: boolean;
}[];

export function deleteTodo(todoList:todotype, index:number) {
  const newList = [...todoList.slice(0, index), ...todoList.slice(index + 1)];

  return newList;
}

export function toggleDone(todoList:todotype, index:number) {
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

// sideEffect.js

