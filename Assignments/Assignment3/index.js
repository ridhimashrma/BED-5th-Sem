const todoItemsContainer = document.getElementById("todoItemsContainer");
const addTodoButton = document.getElementById("addTodoButton");
const todoUserInput = document.getElementById("todoUserInput");

let todoList = [
    { text: "Todo 1"},
    { text: "todo 2"},
];

function renderTodos() {
  todoItemsContainer.innerHTML = "";

  todoList.forEach((todo, index) => {
    const li = document.createElement("li");

    if (todo.isEditing) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.text;
      editInput.className = "edit-input";

      editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          todo.text = editInput.value.trim() || todo.text;
          todo.isEditing = false;
          renderTodos();
        }
      });

      li.appendChild(editInput);

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.onclick = () => {
        todo.text = editInput.value.trim() || todo.text;
        todo.isEditing = false;
        renderTodos();
      };
      li.appendChild(saveBtn);

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = () => {
        todo.isEditing = false;
        renderTodos();
      };
      li.appendChild(cancelBtn);

    } else {
      const span = document.createElement("span");
      span.textContent = todo.text;
      span.className = "todo-text";
      li.appendChild(span);

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        todo.isEditing = true;
        renderTodos();
      };
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        todoList.splice(index, 1);
        renderTodos();
      };
      li.appendChild(deleteBtn);
    }

    todoItemsContainer.appendChild(li);
  });
}

addTodoButton.onclick = () => {
  const userInputValue = todoUserInput.value.trim();
  if (userInputValue === "") {
    alert("Please enter a task.");
    return;
  }
  todoList.push({ text: userInputValue, isEditing: false });
  todoUserInput.value = "";
  renderTodos();
};

// Initial render
renderTodos();
