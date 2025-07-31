const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.static(__dirname+"/public"));
app.get("/todos", (req, res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
        
        if (err) {
            console.error("Error:",err);
            return res.json(mes,"no users");
        }
        try {
            const users = JSON.parse(data);
            res.json(users)
        } catch (e) {
            console.error("Error:",e)
            res.json(error, "err")
        }
    });
});


app.listen(4343, () => {
    console.log("Server started on port 4343");
});