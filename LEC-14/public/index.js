let userContainer=document.querySelector(".user-container")

function getUsers(URL) {
    //send request to this url to get user data
    fetch(URL)
    .then((res)=>{
        console.log(res)
        return res.json() //PROMISE CHAINING
    })
    .then((data)=>{
        console.log(data)
        data.forEach((user) => {
            displayUser(user)
        });
    })
    .catch((err)=>{
        console.log(err)
    })
    
}
// getUsers("https://jsonplaceholder.typicode.com/users")



function displayUser(user){
    let li=document.createElement("li")
        li.innerHTML=` <div class="user-info">
                <h1>${user.name}</h1>
            <p>${user.username}</p>           
         </div>
                <div class="user-btn">
                    <button class="edit">✎</button>
                    <button class="delete">❌</button>
                </div>`
userContainer.appendChild(li);
}

getUsers("http://localhost:7880/users")

// //Task-->> 10 users data-> on frontend -> name and username -> name in h1 and username in paragraph






// function getUsers(URL) {
//     fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         let usersDiv = document.getElementById("users");

//         data.forEach(user => {
//             usersDiv.innerHTML += `<h1>${user.name}</h1> <p>${user.username}</p>`;
//         });
//     })
//     .catch(error => console.log(error));
// }

// getUsers("https://jsonplaceholder.typicode.com/users");
