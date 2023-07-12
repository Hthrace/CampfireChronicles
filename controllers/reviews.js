const Reviews = require("../models/reviews");
const Campground = require("../models/campground");

//Post Create New Review
module.exports.postCreateReview = async (req, res) => {
  const camp = await Campground.findById(req.params.id);
  const newReview = new Reviews(req.body.review);
  newReview.author = req.user._id;
  camp.reviews.push(newReview);
  await newReview.save();
  await camp.save();
  req.flash("success", "Your review has been added!");
  res.redirect(`/campgrounds/${req.params.id}`);
};

//Delete Review
module.exports.deleteReview = async (req, res) => {
  const { id, reviewsId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
  await Reviews.findByIdAndDelete(reviewsId);
  req.flash("success", "Your review has been deleted!");
  res.redirect(`/campgrounds/${id}`);
};
