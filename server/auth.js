const passport = require("passport");
const localStrategie = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("./models/user");

// local strategy
passport.use(
  new localStrategie(async (username, password, done) => {
    try {
      const user = await User.findOne({ "local.username": username });
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      
      // console.log('password', password)
      // console.log('user.password', user.local.password)

      const isMatch = await bcrypt.compare(password, user.local.password);
      // console.log('--------------------------------------------------------')
      // console.log('ismatch =', isMatch)
      return isMatch
        ? done(null, user)
        : done(null, false, { message: "Incorrect username or password" });
    } catch (error) {
      console.error(error)
      done(error);
    }
  })
);

module.exports = function() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) return done(err);
      done(null, user);
    });
  });
};
