const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    fileName: String,
    filePath: String,
});

const pdfCollection = mongoose.model("pdfs", pdfSchema);

module.exports = pdfCollection;
