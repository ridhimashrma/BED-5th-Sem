let todoInput = document.querySelector("#todoInput");
let todoForm = document.querySelector(".input-group");
let todoList = document.querySelector("#todoList");

let todoArray = []
fetch("http://localhost:4343/todos")
.then((response)=> response.json())
.then((data)=>{
    todoArray=data
    showAllTodos(todoArray)})
todoForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    let value = inputValue();
    let newTodo = {
        id: Math.floor(Math.random() * 10000),
        title: value
    }
    addTodo(newTodo);
    todoArray.push(newTodo);
    showAllTodos(todoArray);
    todoInput.value = ""; 
})

function inputValue() {
    return todoInput.value;
}

function showAllTodos(todoArray) {
    todoList.innerHTML = ""; 
    todoArray.forEach(todo => addTodo(todo));
}

function addTodo(todo) {
    let li = document.createElement("li"); 
    li.setAttribute("id", `${todo.id}`);
    li.innerHTML = `<div>
                <input type="checkbox" name="" id="checkbox" >
                <h1>${todo.title}</h1>
                <div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, laudantium.</p>
                </div>
            </div>`
    todoList.appendChild(li)
}