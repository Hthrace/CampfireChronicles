const mongoose = require("mongoose");
const dbName = "campfireChronicles";
const campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
mongoose.set("strictQuery", true);
dbConnect(dbName);

async function dbConnect(db) {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${db}`);
    console.log(`${db} database online and connected boss!`);
  } catch (err) {
    console.log(`${db} database knackered boss!`);
    console.log(`Error: ${err}`);
  }
}

function random(arry) {
  return arry[Math.floor(Math.random() * arry.length)];
}

async function seedDB(num) {
  await campground.deleteMany({});
  for (let i = 0; i < num; i++) {
    const location = random(cities);
    const newCampground = new campground({
      type: "Feature",
      geometry: {
        type: "Point",
        //Grandfather Mountain coordinates
        coordinates: [location.longitude, location.latitude],
      },
      location: `${location.city}, ${location.state}`,
      address: {
        street: `101 Wysteria St`,
        city: `${location.city}`,
        state: `${location.state}`,
      },
      title: `${random(descriptors)} ${random(places)}`,
      image: [
        {
          url: "/imgs/defaultImgOne.jpg",
          filename: null,
        },
        {
          url: "/imgs/defaultImgTwo.jpg",
          filename: null,
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi atque consequatur voluptates cum enim neque reprehenderit, corporis consequuntur tempore, voluptatem architecto nihil quidem repudiandae recusandae? Nulla autem delectus nesciunt quaerat. Perferendis aperiam dolores assumenda velit, deserunt vitae possimus delectus minima earum eveniet nulla? Quas voluptas suscipit minima. Voluptates, vitae ea in, similique incidunt non ipsa quos reiciendis optio, corporis perspiciatis?",
      price: Math.floor(Math.random() * 20) + 10,
      author: "6430ae680db1308cebbd9f3d",
    });
    await newCampground.save();
  }
}

seedDB(50).then(() => {
  mongoose.connection.close();
  console.log(`Job Done, ${dbName} DB Seeded & Disconnected Boss!!`);
});
