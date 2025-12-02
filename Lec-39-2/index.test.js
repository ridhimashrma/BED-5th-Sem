const app=require("./index")
const request=require("supertest");

describe("POST /sum",()=>{
    it("it should return addition of two numbers",async()=>{     //alternative of test->it
        let response=await request(app).post("/sum").send({
            a:1,
            b:2
        })
        expect(response.body.data).toBe(3)
    })

    it("should return invalid arguments if one of the argument is missing or undefined",async()=>{
        let response=await request(app).post("/sum").send({
            a:1
        })
        expect(response.body.message).toBe("invalid argument")
    })
})

describe("POST /mul",()=>{
    it("it should return multiplication of two numbers",async()=>{     //alternative of test->it
        let response=await request(app).post("/mul").send({
            a:1,
            b:2
        })  
        expect(response.body.data).toBe(2)
    })

    it("should return invalid arguments if one of the argument is missing or undefined",async()=>{
        let response=await request(app).post("/mul").send({
            a:1
        })
        expect(response.body.message).toBe("invalid argument")
    })
})