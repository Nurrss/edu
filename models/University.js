const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
  name: { type: String, required: true },
  city: { type: Schema.Types.ObjectId, ref: "City", required: true },
  description: String,
  website: String,
  type: {
    type: String,
    enum: ["Государственный", "Частный"],
    default: "Государственный",
  },
});

module.exports = mongoose.model("University", UniversitySchema);
