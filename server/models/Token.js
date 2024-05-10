const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    //accessToken: String,
    refreshToken: { type: String, required: true },
    //exporesIn: Number,
  },
  { timestamps: true },
);

module.exports = model('Token', schema);
