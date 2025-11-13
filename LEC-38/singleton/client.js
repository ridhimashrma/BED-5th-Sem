const Principal = require("./principal");
function suspendStudent(name){
    //let principal=new Principal("Ridhima")
    let principal=Principal.getPrincipal()
    principal.suspend(name)
}
function removeSuspend(name){
    //let principal=new Principal("Ridam")
    let principal=Principal.getPrincipal()
    principal.removeSuspend(name)
}