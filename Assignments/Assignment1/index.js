//Assignment 1 
//WRITE DATA IN FILE DEMO.TXT ,INPUT WILL BE PASSED USING TERMINAL

const fs = require("fs");
const data = process.argv.slice(2).join(' ');

if(data){
    fs.writeFile("Demo.txt",data,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        } 
    });
}else{
        console.log("data not provided");
    }
