if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const AppError = require("./utilities/appError");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratey = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/users");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/campfireChronicles";
const MongoStore = require("connect-mongo");

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(mongoSanitize());

//Session-----------------------------------------------------------------------

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //secure: true,
    sameSite: "strict",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

//Helmet-----------------------------------------------------------------------
app.use(helmet());

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'"],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://tile.openstreetmap.org/",
        "https://res.cloudinary.com/dzdrll9rz/",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

//Passport----------------------------------------------------------------------

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratey(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes------------------------------------------------------------------------

app.use((req, res, next) => {
  res.locals.returnTo = req.session.returnTo;
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

//Views--------------------------------------------------------------------------

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
mongoose.set("strictQuery", true);

// Express & MongoDB Connect-----------------------------------------------------

main(port, dbUrl);

async function main(num, name) {
  await serverConnect(num);
  await dbConnect(name);
}

async function serverConnect(num) {
  try {
    app.listen(num, () => {
      console.log(`Express server started on port:${num}`);
    });
  } catch (err) {
    console.log(`Express Server on port ${port} knackered boss!`);
    console.log(`Error: ${err}`);
  }
}

async function dbConnect(db) {
  try {
    await mongoose.connect(db);
    console.log(`Database online and connected boss!`);
  } catch (err) {
    console.log(`Database knackered boss!`);
    console.log(`Error: ${err}`);
  }
}

//Misc.----------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.render('home')
});

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Someting Went Wrong, Try Again!" } = err;
  res.status(statusCode).render("error", { message, statusCode });
  next();
});


