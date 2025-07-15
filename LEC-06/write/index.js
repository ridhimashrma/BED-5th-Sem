const fs=require("fs");


fs.writeFile("../demo.txt","hello!!",function(err,data){
    if(err){
        return console.log(err);
    }
    console.log("success");
})
fs.writeFile("../b.txt","hello!! This is file-2",function(err,data){
    if(err){
        return console.log(err);
    }
    console.log("success");
})