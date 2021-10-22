const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Cannot be empty'],
    },
    password: {
      type: String,
      required: [true, 'Cannot be empty'],
    },
    email: {
      type: String,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
