const username = sessionStorage.getItem("username");
if (!username) {
  window.location.href = "login.html"; 
}

const workContainer = document.querySelector(".workcontainer");
const todoForm = document.getElementById("todoForm");

function loadTodos() {
  fetch(`/todos?user=${username}`)
    .then(res => res.json())
    .then(data => {
      workContainer.innerHTML = "";
      data.forEach(showTodo);
    });
}

function showTodo(todo) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${todo.title}</strong>: ${todo.description}`;
  workContainer.appendChild(li);
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, title, description })
  })
    .then(res => res.json())
    .then((data) => {
      showTodo(data);
      todoForm.reset();
    });
});

loadTodos();
