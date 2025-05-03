import express from 'express';
import { getProfile, loginUser, registerUser, updateProfile } from '../controllers/UserController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const UserRouter = express.Router();

UserRouter.post("/register",registerUser);
UserRouter.post("/login",loginUser);
UserRouter.get("/get-profile",authUser,getProfile);
UserRouter.patch("/update-profile",upload.single("image"),authUser,updateProfile);

export default UserRouter;