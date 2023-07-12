const User = require("../models/user");
const Campground = require("../models/campground");

//Get Register New Users
module.exports.getRegisterUser = (req, res) => {
  res.render("users/register");
};

//Post Register New Users
module.exports.postRegisterUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body.register;
    const newUser = new User({ username, email });
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Welcome ${username}`);
      res.redirect("/campgrounds");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

//Get Login
module.exports.getLogin = (req, res) => {
  res.render("users/login");
};

//Post Login
module.exports.postLogin = (req, res) => {
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  req.flash("success", `Welcome back ${req.body.username}`);
  res.redirect(redirectUrl);
};

//Get Logout
module.exports.getLogout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash(
      "success",
      `You are now logged out! So long, and thanks for all the fish`
    );
    res.redirect("/campgrounds");
  });
};

//Get Profile
module.exports.getProfile = async (req, res) => {
  const userData = await User.findById(req.params.id);
  const post = await Campground.find({ author: req.params.id})
  const user = {
    id: userData._id,
    username: userData.username,
    about: userData.about,
    contact: userData.contact,
  };
  if (!user) {
    req.flash("error", "User does not exist!");
    res.redirect("/campgrounds");
  } else {
    res.render("users/profile", { user, post });
  }
};

//Get Profile Edit
module.exports.getEditProfile = async (req, res) => {
  const userData = await User.findById(req.params.id);
  const user = {
    id: userData._id,
    username: userData.username,
    about: userData.about,
    contact: userData.contact,
  };
  res.render("users/editProfile", { user });
};

//Patch Profile
module.exports.patchProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    ...req.body.profile,
  });
  await user.save();
  res.redirect(`/profile/${req.params.id}`);
};
