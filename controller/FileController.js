import multer from 'multer';
import File from '../Models/fileModel.js'; 


const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Save file metadata to MongoDB
    const newFile = new File({
      filename: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      size: req.file.size,
      mimetype: req.file.mimetype,
      userId: req.user ? req.user.userId : null, // Attach userId if authenticated
    });

    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully!", file: newFile });

  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export {uploadFile};
