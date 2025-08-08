// function getCommentData(){
//     axios.get("https://jsonplaceholder.typicode.com/comments")
//     .then((res)=>{
//         console.log(res.data)
//     })
//     .catch((err)=>{
//         console.log(err.message)
//     })
// }
// getCommentData();

async function getCommentData(){
    try{
        const res = await axios.get("https://jsonplaceholder.typicode.com/comments")
        console.log(res.data)
    }
    catch(err){
        console.log(err.message)
    }
}
getCommentData();

function addUser(email,password){
axios.post('http://localhost:7890/user', {
    email: email,
    password: password
    })
    .then((res)=>{
        console.log(res.data)
    })
    .catch((err)=>{
        console.log(err.message)
    })
}
addUser("abc@gmail.com","1234")