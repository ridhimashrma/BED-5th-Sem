let todoContainer=document.querySelector(".todo-container")

function getUsers(URL) {
    fetch(URL)
    .then((res)=>{
        console.log(res)
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        data.forEach((todo) => {
            displayTodo(todo)
        });
    })
    .catch((err)=>{
        console.log(err)
    })
    
}


function displayTodo(todo){
    let li=document.createElement("li")
        li.innerHTML=` <div class="todo-info" style="background-color: lightblue;width: 150px;">
            <h2>${todo.name}</h2>
            <p>${todo.data}</p>   
            </div>
            <div class="todo-btn" style="background-color: lightpink;width: 150px;">
                <button class="complete">😁</button>
                <button class="edit">✎</button>
                <button class="delete">❌</button>
            </div>`
todoContainer.appendChild(li);
}

getUsers("http://localhost:8880/todos")

