const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  //Find the user
  const user = await User.findById(req?.user?.id);
  if (!user) {
    return res.status(404).json({ message: "Not authorized" });
  }
  let requestLimit = 0;
  //check if the user is on trail period
  if (user?.trailActive) {
    requestLimit = user?.monthlyRequestCount;
  }
  if (user?.apiRequestCount >= requestLimit) {
    throw new Error("Monthly limit reached pls subscribe");
  }
  next();
});
module.exports = checkApiRequestLimit;
