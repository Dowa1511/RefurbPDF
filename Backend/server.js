
import connectDB from './mongoDB.js';

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import userRoutes from './routes/userRoutes.js';

dotenv.config(); 



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


 
// api end-points 
app.use('/api/file',userRoutes)
app.use('/api/user',userRoutes)

 
// Start Server 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
