let {WebSocketServer} = require('ws');
const wss = new WebSocketServer({port:4001});
let {subscriber} = require("../shared/index");

let allSocket=[];

wss.on("connection" , (socket) => {
    console.log("new user connected");
    allSocket.push(socket);
    async function bookUpdate () {
        await subscriber.connect();
        subscriber.SUBSCRIBE("book : update" , (message) => {
            console.log(message);
            broadcast(JSON.stringify(message));
        })
    }
    bookUpdate();
})

function broadcast(data) {
    allSocket.forEach((s) => {
        s.send(data);
    })
}