
const express = require("express");
const cors = require("cors");
const helmet = require("helmet")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// using secure middlewares
app.use(helmet())   // add security headers
app.use(cors())
app.use(express.json()); 

// API Route 
app.get("/", (req, res) => {
  res.send("Server is running...");
}); 

 
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
