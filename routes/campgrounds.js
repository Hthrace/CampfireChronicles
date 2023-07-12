const express = require("express");
const router = express.Router();
const asyncHandler = require("../utilities/asyncHandler");
const campgrounds = require("../controllers/campgrounds");
const {
  isLoggedIn,
  isCampAuthor,
  isCamp,
  campValidate,
} = require("../middleware");

//Multer-----------------------------------
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

//Routes--------------------------------------------------------------

router
  .route("/")
  //Index All Campgrounds
  .get(asyncHandler(campgrounds.index))
  //Post Campground Create
  .post(
    isLoggedIn,
    upload.array("image"),
    campValidate,
    asyncHandler(campgrounds.postCreateCamp)
  );

//Get Create Campground Form
router.get("/new", isLoggedIn, campgrounds.getCreateCamp);

router
  .route("/:id")
  //Campground Show Individual
  .get(isCamp, asyncHandler(campgrounds.getShowCamp))
  //Campground Edit Patch
  .patch(
    isLoggedIn,
    isCamp,
    isCampAuthor,
    upload.array("image"),
    campValidate,
    asyncHandler(campgrounds.patchCamp)
  )
  //Campground Delete
  .delete(
    isLoggedIn,
    isCamp,
    isCampAuthor,
    asyncHandler(campgrounds.deleteCamp)
  );

//Campground Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isCamp,
  isCampAuthor,
  asyncHandler(campgrounds.getEditCamp)
);

module.exports = router;
