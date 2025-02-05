import jwt from "jsonwebtoken";

// next is crucial function for controlling flow of middleware functions

const authMiddelware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorizied, Login again",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in auth api",
    });
  }
};
export default authMiddelware;
