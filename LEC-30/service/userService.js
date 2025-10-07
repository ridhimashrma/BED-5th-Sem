const {PrismaClient} = require("./generated/prisma")
let prisma=new PrismaClient();

class User{
    static async addUser(email,name){
        //User user=new User("","");
        //user.save();
    
        const newUser=await prisma.user.create({
            data:{
                email:email,
                name:name
            }
        })
        return "User added"
    }
    static async getUser(email){
        let user=await prisma.user.findUnique({
            where:{
                email:email,
            }
        })
        return user
    }    
    static async deleteUser(email){
        const deletedUser=await prisma.user.delete({
            where:{
                email:email,
            }
        })
        return deletedUser
    }
    static async updateUser(email,name){
        const updateUser=await prisma.user.update({
            where:{
                email:email,
            },
            data:{
                name:"Ridhima Sharma",
            }
        })
        return updateUser
    }
}
Module.exports=User;