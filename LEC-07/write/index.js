// const fs=require("fs");
// let users=[{
//     id:1,
//     name:"samiya",
//     age:"20"
// },{
//     id:2,
//     name:"romeo",
//     age:"21"
// },
// ]

// fs.writeFile("../users.txt",JSON.stringify(users),function(err){
//     if(err) return console.log(err);
//     console.log("users writen")
// })


const fs=require("fs");
let users=[{
    id:1,
    name:"sonam",
    age:"20"
},{
    id:2,
    name:"yuvika",
    age:"21"
},
]

fs.writeFile("../users2.txt",JSON.stringify(users),function(err){
    if(err) return console.log(err);
    console.log("users writen")
})