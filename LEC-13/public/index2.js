const { response } = require("express");
fetch("http://localhost:4343/todos")
.then((response)=> response.json())
.then((data)=>console.log(data))