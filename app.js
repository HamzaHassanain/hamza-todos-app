const head = document.querySelector(".head");
const addFormToggler = document.querySelector(".todo-add-btn");
const addTodosForm = document.querySelector(".add-todo");
const todosForm = document.querySelector("form");
const todosContainer = document.querySelector(".todos");
const filter = document.querySelector("select");

changeHead();
document.addEventListener("DOMContentLoaded", setItemsFromLCS);
addFormToggler.addEventListener("click", (e) =>
  addTodosForm.classList.toggle("active")
);
filter.addEventListener("change", chabgeVal);
todosForm.addEventListener("submit", addTodos);
todosContainer.addEventListener("click", handleBtnClick);

function addTodos(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList = "todo";
  todoDiv.innerHTML = `
    <li>${todosForm.querySelector("input").value}</li>
    <button class="done"><i class="fas fa-check"></i></button>
    <button class="rem"><i class="fas fa-trash"></i></button>
  `;
  addToLCS(todoDiv);
  todosForm.querySelector("input").value = "";
  todosContainer.append(todoDiv);
  changeHead();
}
function handleBtnClick(e) {
  let element = e.target.parentElement;

  if (e.target.classList[0] === "done") {
    element.classList.toggle("todo-done");
    let todos = JSON.parse(localStorage.getItem("todos"));
  } else if (e.target.classList[0] === "rem") {
    element.classList.add("todo-rem");
    removeItemFromLCS(element.children[0].innerText);
    element.addEventListener("transitionend", (e) => {
      element.remove();
      changeHead();
    });
  }
}
function changeHead() {
  if (!todosContainer.children.length) head.innerText = "No Toodos!";
  else {
    head.innerText = `You have ${todosContainer.children.length} Todos`;
  }
}
function chabgeVal(e) {
  const todos = todosContainer.children;
  for (let i = 0; i < todos.length; i++) {
    switch (e.target.value) {
      case "all":
        todos[i].style.display = "flex";
        break;
      case "comp":
        if (todos[i].classList.contains("todo-done"))
          todos[i].style.display = "flex";
        else todos[i].style.display = "none";
        break;
      case "uncomp":
        if (todos[i].classList.contains("todo-done"))
          todos[i].style.display = "none";
        else todos[i].style.display = "flex";
        break;
    }
  }
}
function addToLCS(todo) {
  let todos;
  if (localStorage.getItem("todos") == null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));
  todos.push({
    text: todo.children[0].innerText,
    isDone: todo.classList.contains("todo-done"),
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function setItemsFromLCS() {
  let todos;
  if (localStorage.getItem("todos") == null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");

    todoDiv.classList = todo.isDone ? "todo todo-done" : "todo";
    todoDiv.innerHTML = `
      <li>${todo.text}</li>
      <button class="done"><i class="fas fa-check"></i></button>
      <button class="rem"><i class="fas fa-trash"></i></button>
    `;
    todosContainer.append(todoDiv);
    changeHead();
  });
}
function removeItemFromLCS(todo) {
  let todos;
  if (localStorage.getItem("todos") == null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(todos.indexOf(todo), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function changeTodoState(todo, todos) {
  let selected = todos.filter((n) => (n.text = todo.text));
  todo.isDone = todo.isDone ? false : true;
  return todo;
}
