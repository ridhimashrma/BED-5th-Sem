const User=require('./model/userSchema')
const request=require("supertest")
const app=require("./server")
jest.mock('./model/userSchema')

describe("POST /api/users/register",()=>{
    it("should return user Exist if he tries to register with email which are already present in database",async ()=>{
        User.findOne.mockResolvedValueOnce(true)
        let response=await request(app).post("/api/users/register").send({
            name:"Ridhima",
            email:"ridhima@gmail.com",
            password:"ridhima123"
        })
        expect(response.body.message).toBe("User already exists")
    })
    it("should create a new user with email ridhima@gmail.com",async ()=>{
        User.findOne.mockResolvedValueOnce(false);
        User.create.mockResolvedValueOnce({
            name:"Ridhima",
            email:"ridhima@gmail.com",
            password:"ridhima123"
        })
        let response= await request(app).post("/api/users/register").send({
            name:"Ridhima",
            email:"ridhima@gmail.com",
            password:"ridhima123"
        })
        expect(response.body.message).toBe("User registered successfully!!!!")
        expect(response.body.data).toEqual({ name:"Ridhima",
            email:"ridhima@gmail.com",
            password:"ridhima123"
        })
    })
})