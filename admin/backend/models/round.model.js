const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoundSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Cannot be empty'],
    },
    content: { 
        type: String,
        unique: true,
        required: [true, 'Cannot be empty'],
    },
    description:{
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },
    order : {
        type: Number,
        required : [true, 'Cannot be empty'],
    },
    answer: {
      type: String
    }
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Round', RoundSchema);
