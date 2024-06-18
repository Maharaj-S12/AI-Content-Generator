// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// //----IsAuthenticated middleware
// const isAuthenticated = asyncHandler(async (req, res, next) => {
//   if (req.cookies.token) {
//     //! Verify the token
//     const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET); //the actual login user
//     //add the user to the req obj
//     req.user = await User.findById(decoded?.id).select("-password");
//     return next();
//   } else {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// });

// module.exports = isAuthenticated;

//fixed code
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = isAuthenticated;
