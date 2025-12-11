// import jwt from "jsonwebtoken";

// export const isAuth = (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     console.log("AUth Hit",token);
    

//     if (!token)
//       return res.status(401).json({ message: "Not logged in" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.userId = decoded.userId;
//     next();

//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };


import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
