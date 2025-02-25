
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));


app.use("/dashboard", express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.redirect("/dashboard/index.html");  // 
        } else {
            res.send("Invalid Password");
        }
    } catch (error) {
        res.send("Invalid Details");
    }
});

app.post("/signup", async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).send("Name, email, and password are required!");
        }

        
        const existingUser = await collection.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("Email is already registered!");
        }

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        await collection.insertMany([data]);

        console.log("User added successfully!");
        res.redirect("/");  

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
