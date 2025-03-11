
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const collection = require("./mongodb");
const pdfCollection = require("./pdfModel");
const cors = require("cors");
const { truncate } = require("fs");
const templatePath = path.join(__dirname, '../templates');


app.use(
    cors({
      origin: "http://127.0.0.1:5000", 
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: ["Content-Type", "Authorization"], 
      credentials: true,
    })
  );
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/api/file/upload", (req, res) => {
    console.log("File upload request received");
    res.json({ message: "File uploaded successfully!" });
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "your_secret_key", 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));






app.set("view engine", "hbs");
app.set("views", templatePath);

app.use(express.static(path.join(__dirname, '../public')));


app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.use(express.static(path.join(__dirname, "../../frontend")));



app.post("/login", async (req, res) => {
    try {
        console.log("Login request received:", req.body);

        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).send("Name and Password are required!");
        }

        const user = await collection.findOne({ name });

        if (!user) {
            console.log("User not found.");
            return res.status(400).send("Invalid Credentials");
        }

        if (user.password === password) {
            console.log("Login successful for:", user.name);
            req.session.user = { _id: user._id, name: user.name, email: user.email };

           
            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).send("Session error");
                }
                res.redirect("/profile");  
            });
        } else {
            console.log("Invalid password attempt for:", name);
            return res.status(400).send("Invalid Credentials");
        }
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).send("Internal Server Error");
    }
});




const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login"); 
    }
    next();
};
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





app.get("/profile", async (req, res) => {
    console.log("Session Data:", req.session.user);  

    if (!req.session.user) {
        return res.redirect("/login");  
    }

    try {
        const user = req.session.user;
        const pdfs = await pdfCollection.find({ userId: user._id });

        res.render("profile", { user, pdfs }); 
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



app.post("/test", (req, res) => {
    console.log("Test request received:", req.body);
    res.json({ receivedBody: req.body });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});



