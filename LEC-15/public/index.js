const signupForm=document.querySelector("#signup")
const email=document.querySelector("#email")
const password=document.querySelector("#password")
function addUser(email,password){
    let newUser={
        email:email,
        password:password
    }
    fetch("/login",{
        method:"POST",
        body: JSON.stringify(newUser),
        headers:{
            "content-type":"application/json"
        }
    }).then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
        if(data.success){
            alert(data.message)
        }
        else{
            alert(data.error)
        }
        signupForm.reset();
    })
    .catch((err)=>{
        console.log(err)
    })
}

signupForm.addEventListener("submit",function(e){
    e.preventDefault();
    addUser(email.value , password.value)
})


//addUser("abc@gmail.com","12345");
//content types in header ; application/urlencoded,/json,/multipart