//how insert new element in dom (html)

//1.) create a new element ----> createElement
//2. add require data in that element using innerText or innerHtml
//3. add that element in parent container using apprendChild() or append()

let todo= {
    id:"123",
    title:"todo4"
}
let ul=document.querySelector(".todolist")
function addTodo() {
    let li=document.createElement("li");
    li.setAttribute("id",`${todo.id}`)
    
    li.innerHTML=`<div>
                <input type="checkbox" name=" " id="checkbox">
                <h1>${todo.title}</h1>
                <div>
                    <button class="edit">✎</button>
                    <button class="delete">❌</button>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, atque.</p>
                </div>
            </div>`

        ul.appendChild(li);
}

addTodo();