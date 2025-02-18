import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json({ msg: "All fields Required!" });

    const user = await User.findOne({ username: username });

    if (!user) return res.status(401).json({ msg: "Username does not exists!" });

    const isMatched = await bcrypt.compare(password, user.password);

    // not matched
    if (!isMatched) return res.status(401).json({ msg: "Invalid Credentials!" });

    const payload = {
      userId: user._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"], // Stores browser details
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });

    res.cookie("token", token, {
      httpOnly: true,         // prevent access from js
      secure: true,           // only send over https
      sameSite: "None",     // Prevents CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ msg: "Logged In Successfully!" });
  } catch (error) {
    console.log("Error while logging in\nError: ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

export const checkAuth = async (req, res) => {
  try {
    const token = req?.cookies?.token;  // Get token from cookies
    if (!token) return res.json({ isAuthenticated: false });
    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if cookies is not compremise or not
    if (decoded.ip !== req.ip || decoded.userAgent !== req.headers["user-agent"]) {
      return res.json({ isAuthenticated: false });
    }

    return res.status(200).json({ isAuthenticated: true, userId: decoded.userId });
  } catch (error) {
    console.log('Error: ', error);
    return res.status(401).json({ isAuthenticated: false });
  }
};

export const logoutAuth = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,   // prevent access from js
    secure: true,     // only send over https
    sameSite: "None", // Prevents CSRF
  });

  return res.status(200).json({ msg: "Logged Out Successfully!" });
};
