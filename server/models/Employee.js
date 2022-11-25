const mongoose = require("mongoose");
const validator = require("validator");

const Employee = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This email is  already exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("This email is not valid");
      }
    },
  },
  number: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 10,
  },
  reg: {
    type: String,
    minlength: 5,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Employee", Employee);
