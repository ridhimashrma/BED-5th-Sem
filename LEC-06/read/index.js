const fs = require("fs");

fs.readFile("../demo.txt","utf-8",function(err,data){
    if(err) return console.log(err);
    console.log(data)
})
fs.readFile("../b.txt","utf-8",function(err,data){
    if(err) return console.log(err)
    console.log(data)
})




//BY DEFAULT tarika to read binary data --->>>  <Buffer 68 65 6c 6c 6f 21 21>
// ascii,binary give the same value as utf 8 