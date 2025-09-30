const {PrismaClient} = require("./generated/prisma")
let prisma=new PrismaClient();
async function addUser(email,name){
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
// addUser("ridhima@example.com","Ridhima")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))


async function getUser(email){
    let user=await prisma.user.findUnique({
        where:{
            email:email,
        }
    })
    return user
}
// getUser("ridhima@example.com")
// .then((data)=>console.log(data))


async function updateUser(email,name){
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
// updateUser("ridhima@example.com","Ridhima")
// .then((data)=>console.log(data))


// async function deleteUser(email){
//     const deletedUser=await prisma.user.delete({
//         where:{
//             email:email,
//         }
//     })
//     return deletedUser
// }
// updateUser("ridhima@example.com")
// .then((data)=>console.log(data))




async function addTweet(userId,body){
try{
    let newTweet =await prisma.tweet.create({
        data:{
            userId:Number(userId),
            body:body
        }
    })
    return newTweet;
}
catch(error){
    throw new Error(error.message)
}
}
// addTweet("1","my first tweet")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))

async function updateTweet(id,userId,updateBody){
    let tweet = await prisma.tweet.findFirst({
        where:{
            id:Number(id),
            userId:Number(userId)
        }
    })
    if (tweet){
        console.log(tweet)
    }
    if(!tweet){
        return "something wrong"
    }
    await prisma.tweet.update({
        where:{
            id:Number(id)
        },
        data:{
            body:updateBody
        }

    })
    return "tweet updated"

}
// updateTweet("1","1","update my tweet")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))

async function deleteUser(id){
    await prisma.user.delete({
        where:{
            id:Number(id)
        }
    })
    return "user deleted"
}
deleteUser("1")
.then((data)=>console.log(data))