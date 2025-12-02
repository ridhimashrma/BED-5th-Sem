// class principal{
//     principalInstance=null;
//     _constructor(name){
//         this.name=name;
//     }
//     static getPrincipal(){
//         if(!principalInstance){
//             let principal=new principal("samiya");
//             principalInstance=principal;
//         }
        
//         return principalInstance;
//     }

//     resticateStudent(name){

//     }
//     suspend(name){

//     }
//     removeSuspension(name){

//     }
//     notify(message){

//     }
// }


class principal{
    principalInstance=new Map();
    _constructor(school){
        this.school=school;
    }
    static getPrincipal(){
        if(!principalInstance.get(school)){
            let principal=new principal("school");
            principalInstance.set(school,principal);
        }
        
        return principalInstance.get(school);
    }

    resticateStudent(name){

    }
    suspend(name){

    }
    removeSuspension(name){

    }
    notify(message){

    }
}