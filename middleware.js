const asyncHandler = require("./utilities/asyncHandler");
const Campground = require("./models/campground");
const Reviews = require("./models/reviews");
const AppError = require("./utilities/appError");
const { campSchema, reviewSchema } = require("./schemas");
const User = require("./models/user")

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must login first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isCampAuthor = asyncHandler(async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${req.params.id}`);
  }
  next();
});

module.exports.isCamp = asyncHandler(async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash("error", "Sorry, cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  next();
});

module.exports.campValidate = (req, res, next) => {
  const { error } = campSchema.validate(req.body);
  if (error) {
    const msg = error.details
      .map((e) => {
        return e.message;
      })
      .join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

module.exports.reviewValidate = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details
      .map((e) => {
        return e.message;
      })
      .join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = asyncHandler(async (req, res, next) => {
  const reviews = await Reviews.findById(req.params.reviewsId);
  if (!reviews.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${req.params.id}`);
  }
  next();
});

module.exports.isUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user._id.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/profile/${user._id}`);
  }
  next();
});
