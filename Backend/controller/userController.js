import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addUser = async(req,res) => {
    try {
        const {username,password} = req.body

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

         // Check if user already exists
         const existingUser = await User.findOne({ username });
         if (existingUser) {
             return res.status(400).json({ message: "User already exists." });
         }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Server error" });
    }
    
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expires in 1 hour
        );
       
        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const logoutUser = async (req, res) => {
    try {
        
        // Clear the token cookie (if you're storing it in cookies)
        res.clearCookie("token", { path: "/" });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export {addUser,getAllUsers,loginUser,logoutUser};