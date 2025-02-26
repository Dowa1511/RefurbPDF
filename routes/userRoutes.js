import express from 'express';
import { addUser, getAllUsers,loginUser, logoutUser } from '../controller/userController.js';
import { uploadFile } from '../controller/FileController.js';
import upload from '../Middleware/multer.js';

const userRoutes = express.Router();

userRoutes.post('/register',addUser);
userRoutes.get('/users',getAllUsers)
userRoutes.post("/login", loginUser);
userRoutes.get('/logout',logoutUser)
userRoutes.post('/uploads',upload.single("file"),uploadFile)

export default userRoutes;