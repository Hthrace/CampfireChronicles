const { cloudinary } = require("../cloudinary");
const Campground = require("../models/campground");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { geocode } = require("../geocoding/censusGovApi");

//Index All Campgrounds
module.exports.index = async (req, res) => {
  const campData = await Campground.find({});
  res.render("campgrounds/index", { campData });
};

//Get Create Campground Form
module.exports.getCreateCamp = (req, res) => {
  res.render("campgrounds/new");
};

//Post Campground Create
module.exports.postCreateCamp = async (req, res) => {
  const { street, city, state } = req.body.campground.address;
  const newCampground = new Campground(req.body.campground);
  newCampground.image = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  const geometry = await geocode(street, city, state);
  newCampground.type = "Feature";
  newCampground.geometry = geometry;
  newCampground.author = req.user._id;
  /* Hey future me stop deleting data variable, its for the redirect. You keep doing it, STOP. */
  const data = await newCampground.save();
  req.flash("success", "You successfully made a new campground!");
  res.redirect(`/campgrounds/${data._id}`);
};

//Campground Edit Form
module.exports.getEditCamp = async (req, res) => {
  const campData = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campData });
};

//Campground Edit Patch
module.exports.patchCamp = async (req, res) => {
  const { street, city, state } = req.body.campground.address;
  const camp = await Campground.findByIdAndUpdate(
    req.params.id,
    { ...req.body.campground },
    {
      runValidators: true,
    }
  );
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  camp.image.push(...imgs);
  const geometry = await geocode(street, city, state);
  camp.geometry = geometry;
  await camp.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await camp.updateOne({
      $pull: { image: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "You successfully updated the campground!");
  res.redirect(`/campgrounds/${req.params.id}`);
};

//Campground Delete
module.exports.deleteCamp = async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  req.flash("success", "Your campground has been deleted!");
  res.redirect("/campgrounds");
};

//Campground Show Individual
module.exports.getShowCamp = async (req, res) => {
  const campData = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: "author",
    })
    .populate("author");
  res.render("campgrounds/show", { campData });
};
