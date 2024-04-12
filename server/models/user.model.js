const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  roleId: {
    type: Number,
    enum: [0, 1, 2],
    required: [true, "Role should be Admin, Nurse, or Patient!"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter password!"],
    minlength: [6, "Password should have atleast 6 characters!"],
  },
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuth = await bcrypt.compare(password, user.password);
    if (isAuth) {
      return user;
    }
    throw Error("Incorrect password!");
  } else {
    throw Error("Incorrect email!");
  }
};

module.exports = mongoose.model("user", userSchema);
