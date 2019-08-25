const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    local:{
        username:{
            type: String,
            require: true
        },
        password:{
            type: String,
            require: true
        }
    }
})


UserSchema.pre("save", function(next) {
    const user = this;
    if (!user.local.isModified()) return next();
    bcrypt.hash(user.local.password, 12, (err, hashedPassword) => {
      if (err) return next(err);
      user.local.password = hashedPassword;
      next();
    });
  });

module.exports = mongoose.model('User', UserSchema);