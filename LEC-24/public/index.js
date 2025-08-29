//signup feature 
const signupForm=document.querySelector("#SignUp");
const signupUsername=document.querySelector("#signup-username");
let signupEmail=document.querySelector("#signup-email");
let signupPassword=document.querySelector("#signup-password");

const loginForm=document.querySelector("#login-form");
let loginEmail=document.querySelector("#login-email");
let loginpPassword=document.querySelector("#login-password");

loginForm.addEventListener("submit",async function (e) {
    e.preventDefault();
    let email=loginEmail.value;
    let password=loginpPassword.value;
    let response=await fetch("api/auth/login",{
        method:"POST",
        body:JSON.stringify({
            email:email,
            password:password
        }),
        headers:{
            "content-type":"application/json"
        }
    })
    let data=await response.json()
    console.log(data)
    if(data.success){
        let token=data.token;
        localStorage.setItem("token",token)
        alert("login successful")
        loginForm.reset();
    }
    else{
        alert("error logging in")
    }
} )

signupForm.addEventListener("submit",async function(e){
    e.preventDefault();
    let username=signupUsername.value;
    let email=signupEmail.value;
    let password=signupPassword.value;
    let response=await fetch("api/users/",{
        method:"POST",
        body:JSON.stringify({
            email:email,
            username:username,
            password:password
        }),
        headers:{
            "content-type":"application/json"
        }
    })
    let data=await response.json();
    console.log(data)
    if(data.success){
        alert("signup successful, login to continue")
    }
    else{
        alert("something went wrong")
    }
    //signupForm.reset();
})