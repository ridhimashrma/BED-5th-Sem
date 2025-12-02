const principal=require("./principal")
function suspendStudent(name){
    // let principal=new principal("samiya");
    let principal=principal.getPrincipal();
    principal.suspend(name);
}
function removeSuspension(name){
    // let principal=new principal("sam");
    let principal=principal.getPrincipal();
    principal.removeSuspension(name);
}