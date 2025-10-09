const {WebSocketServer}=require('ws');
const wss=new WebSocketServer({port:8080});
// wss.on("connection",function(socket){
//     console.log("a new user connected")
//     socket.send("welcome")
//     setInterval(()=>{
//         socket.send("Reliance stock price is "+Math.random())
//     },1000)
// })

// Ping Pong Application
// wss.on("connection",function(socket){
//     console.log("a new user connected")
//     socket.send("welcome")
//     socket.on("message",function(msg){
//         console.log(msg.toString())
//         if(msg.toString()==="ping"){
//             socket.send("pong")
//         }
//         else{
//             socket.send("not a ping message")
//         }
//     })
// })



//Broadcasting 
let allSockets=[]

wss.on("connection",function(socket){
    console.log("a new user connected")
    allSockets.push(socket)
    //console.log(allSockets)
    socket.on("message",function(msg){
        allSockets.forEach((s)=>{
            s.send(msg.toString())
        })
    })
    
})