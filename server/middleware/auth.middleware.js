import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ msg: "Unauthorized Access!" });

    // Verify Token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(400).json({ msg: "Invalid token format!" });
        } else if (err.name === "TokenExpiredError") {
          return res.status(401).json({ msg: "Token expired! Please log in again." });
        } else {
          return res.status(403).json({ msg: "Token verification failed!" });
        }
      }
      // store user detail on request
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log('Error while implementing middleware\nError: ', error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

export default authMiddleware;