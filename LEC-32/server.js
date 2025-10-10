const { WebSocketServer, WebSocket } = require("ws");

const wss = new WebSocketServer({ port: 8889 });

let rooms = new Map();
// {
//     "1234":[s1,s2,s3],
// }

wss.on("connection", (socket) => {
  console.log("a new user connected");
  socket.on("message", (msg) => {
    //{type:"join"||"chat",payload:{roomId:"Value"}}
    let parsedMessage=JSON.parse(msg);
    if(parsedMessage.type==="join"){
        let roomId=parsedMessage.payload.roomId;
        if(!rooms.get(roomId)){
            //rooms.set(roomId,new Set());
            socket.send("room id does not exist")
        }
        rooms.get(roomId).add(socket);
        socket.roomId=roomId;
        socket.send("you are added to room"+" "+roomId.toString())
        console.log(rooms)

    }
    else if(parsedMessage.type==="chat"){
        let roomId=socket.roomId;
        let message=parsedMessage.payload.message;
        let allClients=rooms.get(roomId);
        allClients.forEach((s)=>{
            s.send(message.toString())
        })
    }
    else if (parsedMessage.type==="create"){
        let roomId=Math.floor(Math.random()*100000000).toString();
        rooms.set(roomId,new Set());
        console.log(rooms)
        socket.send("your room id is"+" "+roomId.toString())
    }
})
})


//download docker-desktop to study redis