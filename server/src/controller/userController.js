import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

export const registerUser = async (req, res) => {
  const { name, email, password } = await req.body;
  if (!name)
    return res.status(200).json({ errCode: 1, message: "Invalid username..." });
  if (!email || !validator.isEmail(email))
    return res
      .status(200)
      .json({ errCode: 2, message: "Invalid useremail..." });
  if (!password)
    return res
      .status(200)
      .json({ errCode: 3, message: "Invalid userpassword..." });
  if (password.length < 6)
    return res
      .status(200)
      .json({ errCode: 3, message: "Password must be at least 6 characters" });
  const userExist = await User.findOne({
    email,
  });
  if (userExist)
    return res.status(200).json({
      errCode: 4,
      message: "User already exists",
    });
  const hash = bcrypt.hashSync(password, 10);
  const user = await User.create({ name, email, password: hash });
  if (!user)
    return res
      .status(200)
      .json({ errCode: 5, message: "Created user fail..." });
  const token = jwt.sign({ userId: user._id }, "123456789", {
    expiresIn: "1d",
  });
  return res.status(200).json({
    errCode: 0,
    message: "User already registered",
    user: { name, email, token },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = await req.body;
  if (!email || !validator.isEmail(email))
    return res
      .status(200)
      .json({ errCode: 1, message: "Invalid useremail..." });
  if (!password)
    return res
      .status(200)
      .json({ errCode: 2, message: "Invalid userpassword..." });
  if (password.length < 6)
    return res
      .status(200)
      .json({ errCode: 2, message: "Password must be at least 6 characters" });
  const user = await User.findOne({
    email,
  });
  if (!user)
    return res.status(200).json({ errCode: 3, message: "User not existed!" });
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch)
    return res.status(200).json({ errCode: 3, message: "Password incorrect." });
  const token = jwt.sign({ userId: user._id }, "123456789", {
    expiresIn: "1d",
  });
  return res.status(200).json({
    errCode: 0,
    message: "User already registered",
    user: { name: user.name, email, token },
  });
};
