const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Cannot be empty'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rounds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Game', GameSchema);
