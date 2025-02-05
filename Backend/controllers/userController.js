import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/user.model.js";

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    // checking user exists or not

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist try to register",
      });
    }

    // Checking password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Ivalid credentilas" });
    }

    const token = createToken(user._id);

    res.json({ success: true, message: "Suucessfully logged in", token });
    //
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in Log in" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking user exists or not
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists try to Login",
      });
    }
    //validating email format & storng password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    // password can not be less than 8 character
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password can not be less than 8 character",
      });
    }

    // hashing user password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a instance of new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // finally saving
    const user = await newUser.save();

    // Creatting token
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in registering user",
    });
  }
};

export { loginUser, registerUser };
