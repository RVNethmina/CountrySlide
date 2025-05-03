import jwt from "jsonwebtoken";

//user authentication middleware

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized, Login again!" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request (don't modify req.body directly)
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
