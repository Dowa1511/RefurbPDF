const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/Backend"; 

mongoose.connect(mongoURI)
    .then(() => console.log( "MongoDB Connected Successfully"))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); 
    });

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    });

const collection = mongoose.model("users", userSchema);

module.exports = collection;


