let {WebSocketServer}=require ("ws")
let wss=new WebSocketServer({port:4001})
let {subscriber}=require ("../shared/index")
let allSockets=[];
wss.on("connection",(socket)=>{
    allSockets.push(socket);
    console.log("new user connected")
    async function bookUpdate(){
        await subscriber.connect();
        subscriber.SUBSCRIBE("book:update",(message)=>{
            console.log(message)
            broadcast(JSON.parse(message))
        })
    }
    bookUpdate()
})

function broadcast(data){
    allSockets.forEach((s)=>{
        s.send(JSON.stringify(data))
    })
}