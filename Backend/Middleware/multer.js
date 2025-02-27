import multer from "multer";
import dotenv from "dotenv";


dotenv.config();


const storage = multer.diskStorage({
  filename : function (req,file,callback) {
      callback(null,file.originalname)
  }
})



// File filter to accept only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Define the upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

// Handle errors globally (to return a proper response when fileFilter rejects)
const uploadMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default upload;
