import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user === null) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    if (!user?.email) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, попробуйте еще раз" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Успешный вход",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        name: user.name,
        avatar: user.avatar
          ? user.avatar
          : "/uploads/avatars/" + randomNumber(1, 5) + ".jpg",
      },
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: "Произошла ошибка при входе" });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const findUserByEmail = await User.findOne({ email });
  if (findUserByEmail) {
    return res.status(400).json({
      success: false,
      message: "Пользователь с такой почтой уже есть",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res
    .status(200)
    .json({ success: true, message: "Пользователь успешно зарегистрирован" });
};

export const logoutUser = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Вы вышли из аккаунта" });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Пользователь не найден" });
  }
  res.status(200).json({ success: true, user });
};
