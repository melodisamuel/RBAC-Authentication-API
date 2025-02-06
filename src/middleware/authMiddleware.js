const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

// SignToken function
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
2
// Create and send the JWT token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.role); // Pass the user's role

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};


// Middleware for Authentication
const authMiddleware = async (req, res, next) => {
  try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
          token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
          return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch the user from the database to ensure correct role
      const user = await User.findById(decoded.id);

      if (!user) {
          return res.status(401).json({ message: "User no longer exists" });
      }

      req.user = user; // Ensure the correct role is assigned
      next();
  } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


// Sign Up function
const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role, // Make sure this is coming from the request body
  });
  createSendToken(newUser, 201, res);
});

// Login function
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // Check if user exists in the User schema and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.correctPassword(password, user.password))) {
    // If user found in the User schema
    // Send token to client
    createSendToken(user, 200, res);
    return;
  }

  // If user not found in either schema or password is incorrect
  return next(new AppError("Incorrect email or password!", 401));
});

// Exporting functions and middleware
module.exports = {
  authMiddleware,
  signUp,
  login,
};
