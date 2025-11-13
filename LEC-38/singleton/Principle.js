// class Principal{
//     principalInstance=null;
//     _constructor(name){
//         this.name = name;
//     }
//     static getPrincipal(){
//         if(!principalInstance){
//             let principal=new Principal("Ridhima");
//             principalInstance=principal;
//         }
//         return principalInstance;
//     }

//     resticateStudent(name){

//     }
//     suspend(name){

//     }
//     removeSuspend(name){

//     }
//     notify(name){

//     }

// }
// module.exports=Principal;






class Principal{
    principalInstance=new Map();

    /*{
    school1:Object<Principal>
    }
    */




    _constructor(school){
        this.school=school;
    }
    static getPrincipal(school){
        if(!principalInstance.get(school)){
            let principal=new Principal(school);
            principalInstance.set(school,principal);
        }
        return principalInstance;
    }

    resticateStudent(name){

    }
    suspend(name){

    }
    removeSuspend(name){

    }
    notify(name){

    }

}
module.exports=Principal;


