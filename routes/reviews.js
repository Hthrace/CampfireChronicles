const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncHandler = require("../utilities/asyncHandler");
const reviews = require("../controllers/reviews");
const { isLoggedIn, reviewValidate, isReviewAuthor } = require("../middleware");

//Routes--------------------------------------------------------------

//Post Create New Review
router.post(
  "/",
  isLoggedIn,
  reviewValidate,
  asyncHandler(reviews.postCreateReview)
);

//Delete Reviews
router.delete(
  "/:reviewsId",
  isLoggedIn,
  isReviewAuthor,
  asyncHandler(reviews.deleteReview)
);

module.exports = router;
