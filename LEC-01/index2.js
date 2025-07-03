const fs=require("fs");
console.log(fs);
console.log("Start");
setImmediate(()=>{
    console.log("set Immediate")
})
setTimeout(()=>{
    console.log("Settimeout")
},0)
fs.readFile("demo.txt",(data)=>{
    console.log("file read");
    setTimeout(() => {
        console.log("timer 2")
    },0);
    setImmediate(() => {
        console.log("immediate 2")
    });
})

console.log("End");

//set timeout-> callback and timer 
//set timeout is running before set immediate why?
