const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Story = require("../models/story")
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      console.log("Received data:", { username, password });
  
      if (!username || !password) {
        return res.status(400).json({
          errorMessage: "Username and password are required",
        });
      }
  

  
      const userDetails = await User.findOne({ username });
  
      if (userDetails) {
        return res.status(409).json({ errorMessage: "Username already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const userData = new User({
        username,
        password: hashedPassword,
      });
  
      await userData.save();
      res.json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.json({ errorMessage: "Something went wrong" , error});
    }
  };
  

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        errorMessage: "Username and password are required",
      });
    }

    const userDetails = await User.findOne({ username });

    if (!userDetails) {
      return res.status(401).json({
        errorMessage: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res.status(401).json({
        errorMessage: "Invalid credentials",
      });
    }

    let token = jwt.sign({userId : userDetails._id} , process.env.SECRET_CODE , {expiresIn : "3h"});

  // Fetch the stories posted by the user
  const stories = await Story.find({ username });

    res.json({ message: "User logged in successfully", username: userDetails.username , token : token, userId : userDetails._id, userBookmarks : userDetails.bookmarks});
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: "Something went wrong" });
  }
};




module.exports = { registerUser, loginUser };
