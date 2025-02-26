
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const collection = require("./mongodb");
const pdfCollection = require("./pdfModel");
const cors = require("cors");
const { truncate } = require("fs");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));




const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(session({
    secret: "your_secret_key", 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

app.set("view engine", "hbs");
app.set("views", templatePath);

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.static(path.join(__dirname, "../../frontend")));



app.get("/login", (req, res) => {
    res.render("login"); 
});



app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/login", async (req, res) => {
    try {
        console.log("Login request received:", req.body);
        const check = await collection.findOne({ name: req.body.name });

        if (check) {
            console.log("User found:", check.name);
        } else {
            console.log("User not found.");
        }

        if (check && check.password === req.body.password) {
            console.log("Login successful for:", check.name);
            req.session.user = check;

            return res.redirect("/index.html");  
        } else {
            console.log("Invalid password attempt for:", req.body.name);
            return res.send("Invalid Password");
        }
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).send("Internal Server Error");
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


const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login"); 
    }
    next();
};


app.get("/profile", async (req, res) => {
    console.log("Session Data:", req.session.user);  
    if (!req.session.user) {
        return res.json({ loggedIn: false });
    }

    try {
        const user = req.session.user;
        const pdfs = await pdfCollection.find({ userId: user._id });
        res.json({ loggedIn: true });
    } catch (error) {
        console.error("Error loading profile:", error);
        res.status(500).send("Error loading profile");
    }
});



app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Error logging out.");
        res.redirect("/"); 
    });
});
app.delete("/delete-pdf/:id", async (req, res) => {
    try {
        const pdfId = req.params.id;
        await pdfCollection.findByIdAndDelete(pdfId);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting PDF:", error);
        res.status(500).json({ success: false });
    }
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
