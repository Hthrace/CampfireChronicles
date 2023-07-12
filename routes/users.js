const express = require("express");
const router = express.Router();
const asyncHandler = require("../utilities/asyncHandler");
const passport = require("passport");
const users = require("../controllers/users");
const { isLoggedIn, isUser } = require("../middleware");

router
  .route("/register")
  //Get Register New Users
  .get(users.getRegisterUser)
  //Post Register New Users
  .post(asyncHandler(users.postRegisterUser));

router
  .route("/login")
  //Get Login
  .get(users.getLogin)
  //Post Login
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.postLogin
  );

//Get Logout
router.get("/logout", users.getLogout);

module.exports = router;
