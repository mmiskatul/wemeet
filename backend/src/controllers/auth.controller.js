import User from "../models/User.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be 6 characters " });
    }
    //email validation chack
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // chaeck exixtence of the user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists,please use a different one",
      });
    }
    // take a random avatar
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomavatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    // create a user
    const newuser = await User.create({
      email,
      fullName,
      password,
      profilepic: randomavatar,
    });
// Create an user on the steam

    // generate jwt token

    const token = jwt.sign(
      { userId: newuser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 100,
      httpOnly: true, //prevent Xss attack
      sameSite: "strict", //prevent CSRF attack
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      success: true,
      user: newuser,
    });
  } catch (error) {
    console.log("error in signup controller ",error);
    res.status(500).json({
      message:"Server Error"
    })
  }
}

export async function login(req, res) {
  res.send("Login Route");
}

export function logout(req, res) {
  res.send("Logout Route");
}
