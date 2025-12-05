const mongoose = require('mongoose');
let {MongoMemoryServer} = require('mongodb-memory-server');
let User=require('./model/user.model');
const request = require('supertest');
const app = require('./server.js');


let mongoServer;

beforeAll(async()=>{
    mongoServer=await MongoMemoryServer.create();
    let url=mongoServer.getUri();
    await mongoose.connect(url)
    });
afterAll(async()=>{
    await User.deleteMany({});
})
afterAll(async()=>{
    await mongoose.disconnect();
    await mongoServer.stop();
})
describe("POST /api/users/register",()=>{
    it ("should return user aldready exist if email is john123@gmail.com",async()=>{
        await User.create({
            name:"John Doe",
            email:"john123@gmail.com",
            password:"john123"
        });
    let response=await
        request(app).post("/api/users/register")
        .send({
            name:"John Doe",
            email:"john123@gmail.com",
            password:"john123"
    })
    expect(response.body.message).toBe("User already exists");
})
it("should create a new user with email john123@gmail.com",async()=>{
    let response=await
        request(app).post("/api/users/register")
        .send({
            name:"sfs",
            email:"john@gmail.com",
            password:"john123"
    })
    expect(response.body.message).toBe("User registered successfully"); 
})
        
})