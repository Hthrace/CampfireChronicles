const mongoose = require("mongoose");
const Reviews = require("./reviews");
const { string } = require("joi");
const { campSchema } = require("../schemas");

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200,c_scale");
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new mongoose.Schema(
  {
    type: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    title: String,
    image: [ImageSchema],
    price: Number,
    description: String,
    address: {
      street: String,
      city: String,
      state: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<a href="/campgrounds/${this._id}">${this.title}</a> 
  <br> ${this.address.city}, ${this.address.state} 
  <br> $${this.price}`;
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Reviews.deleteMany({ _id: { $in: doc.reviews } });
  } else {
    return;
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
