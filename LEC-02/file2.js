let file3=require("./file3.js")
console.log(file3)
let res=file3.mul(3,4)
console.log(res)
function div(a,b){
    return (a/b);
}
module.exports.div=div;