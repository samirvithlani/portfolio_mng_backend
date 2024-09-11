const userSchema = require("../models/UserModel");
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const savedUser = await userSchema.create(req.body);
    if (savedUser) {
      res
        .status(201)
        .json({ message: "User created successfully", data: savedUser });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await userSchema.find();
    if (user) {
      res
        .status(200)
        .json({ message: "User fetched successfully", data: user });
    } else {
      res.status(400).json({ message: "Failed to fetch user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (user) {
      res
        .status(200)
        .json({ message: "User fetched successfully", data: user });
    } else {
      res.status(400).json({ message: "Failed to fetch user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const findUserByEmail = await userSchema.findOne({ email: req.body.email });
    if (findUserByEmail) {
      const matchPassword = findUserByEmail.password === req.body.password;
      console.log(matchPassword);
      if (matchPassword) {
        console.log("User logged in successfully");
        res.status(200).json({ message: "User logged in successfully", data: findUserByEmail });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser, getUser, getUserById, loginUser };
