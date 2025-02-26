
import connectDB from './mongoDB.js';

import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your User model
import User from "./Models/userModel.js";
import File from "./Models/fileModel.js"
import userRoutes from './routes/userRoutes.js';

dotenv.config(); 

//const express = require("express");
//const cors = require("cors");
//const helmet = require("helmet")
//require("dotenv").config(); 



const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// using secure middlewares
app.use(helmet())   // add security headers
app.use(cors())
app.use(express.json()); 
     


// API Route 
app.get("/", (req, res) => {
  res.send("Server is running...");
}); 

//api to fetch user upload
// app.get("/uploads", async (req, res) => {
//   try {
//     // req.user is set by verifyToken; assume it contains a `userId`
//     console.log(req.user)
//     const userUploads = await File.find({ userId: req.user.userId });
//     res.json({ files: userUploads });
//   } catch (error) {
//     console.error("Error fetching uploads:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
 
// api end-points 
app.use('/api/file',userRoutes)
app.use('/api/user',userRoutes)

 
// Start Server 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
