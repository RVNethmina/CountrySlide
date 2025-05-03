import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "../models/UserModel.js";


// API to register user
const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !password || !email) {
        return res.json({ success: false, message: "Missing Details!" });
      }
  
      //validating email format
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Enter a Valid Email!" });
      }
  
      //validating strong password
      if (password.length < 8) {
        return res.json({ success: false, message: "Enter a Strong Password!" });
      }
  
      //Hasing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const userData = {
        name,
        email,
        password: hashedPassword,
      };
  
      const newUser = new UserModel(userData);
      const user = await newUser.save();
  
      res.json({ success: true,user});
      
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  //API for user login
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.json({ success: false, message: "User doesn't exit" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
      } else {
        res.json({ success: false, message: "Invalid Credentials!" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
};
  
  //API to get user profile data
  
  const getProfile = async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(400).json({ success: false, message: "Missing user ID" });
      }
      
      const userData = await UserModel.findById(userId).select("-password");
  
      res.json({ success: true, userData });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  //API to update user profile
  
  const updateProfile = async (req, res) => {
    try {
      const { userId, name, phone, address, dob, gender } = req.body;
  
      const imageFile = req.file;
  
      if (!name || !phone || !dob || !gender) {
        return res.json({ success: false, message: "Data Missing!" });
      }
  
      await UserModel.findByIdAndUpdate(userId, {
        name,
        phone,
        address: JSON.parse(address),
        dob,
        gender,
      });
  
      if (imageFile) {
        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        const imageURL = imageUpload.secure_url;
  
        await UserModel.findByIdAndUpdate(userId, { image: imageURL });
      }
  
      res.json({ success: true, message: "Profile Updated!" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
};

  export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
  }