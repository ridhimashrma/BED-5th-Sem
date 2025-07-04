let file1=require("./file1.js")
console.log(file1)
function mul(a,b){
    return (a*b);
}
function div(a,b){
    return (a/b);
}
module.exports.mul=mul;
module.exports.div=div;