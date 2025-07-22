const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "data.json"));
// });
app.get("/", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        
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

app.post("/add-user", (req, res) => {
    const { name, email } = req.body;
    const newUser = { name, email };

    fs.readFile("data.json", "utf8", (err, data) => {
        let users = [];

        if (!err && data) {
            try {
                users = JSON.parse(data);
            } catch (e) {
                users = [];
            }
        }

        users.push(newUser);

        fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.send("Failed to store data in file.");
            }
            res.send("User data stored");
        });
    });
});


app.post("/login", (req, res) => {
    const { email } = req.body;

    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.send("Error");
        }

        try {
            const users = JSON.parse(data);
            const user = users.find(u => u.email === email);

            if (user) {
                res.send("Login successful");
            } else {
                res.send("Invalid email");
            }
        } catch (e) {
            console.error("Error parsing file:", e);
            res.send("error");
        }
    });
});


app.listen(3333, () => {
    console.log("Server started on port 3333");
});
