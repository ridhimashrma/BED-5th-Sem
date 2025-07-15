const fs=require("fs")

fs.readFile("../demo.txt","utf-8",function (err,data) {
    if (err) return console.log(err)
        let data1=data;
    fs.readFile("../b.txt","utf-8",function (err,data) {
        if (err) return console.log(err)
        let data2=data;
        let res= data1.split(" ")+ data2.split(" ")
        fs.writeFile("./result.txt",res,function(err){
            if(err){
                return console.log(err);
            }
            console.log("success");
            //console.log(res)
        })
        
    })
})

console.log(process.argv)

//closure

//hw remove spaces

//hw -> 1.) write data in file demo.txt, data will be passed using terminal 
//terminal me data pass karo (input from terminal), read it and write it in file
//process.arg mein input aata hai