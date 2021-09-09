const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const Notificaion = require("../models/notification");

// Auth using passport
// find user and auth them
// used inrouters
// MW
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true, // allows first arg as req
    },
    function (req, email, password, done) {
      console.log("in passport-locals");
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }
        if (!user) {
          req.flash("error", "email is wrong");
          return done(null, false);
        }
        if (!user.validPassword(password)) {
          req.flash("error", "password is wrong");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
// browser part
passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user.id);
});

// deserializing the user from the key in the cookies
// server part
passport.deserializeUser(function (id, done) {
  console.log("deserializeUser");
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

// MW set users for views
passport.setAuthUser = async function (req, res, next) {
  console.log("setAuthUser");
  if (req.isAuthenticated()) {
    // Passport fun
    console.log("In--setAuthUser");
    // locals for the views
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    // res.locals.user = req.user;
    // req.user is already handled by passport
    res.locals.user = await User.findById(req.user._id).populate(
      "notifications"
    );
  }
  next();
};

// check user auth by our own middleware fun

passport.checkAuthentication = function (req, res, next) {
  console.log("checkAuthentication");
  if (req.isAuthenticated()) {
    // Passport fun
    return next(); // pass to controllers
  } else {
    return res.redirect("/signup");
  }
};

module.exports = passport;
