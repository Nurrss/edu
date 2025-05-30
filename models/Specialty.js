const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpecialtySchema = new Schema({
  name: { type: String, required: true },
  code: String, // напр. "6B04101"
  ent_subjects: [{ type: Schema.Types.ObjectId, ref: "ENTSubject" }], // напр. математика, физика
  universities: [{ type: Schema.Types.ObjectId, ref: "University" }],
  degree_type: {
    type: String,
    enum: ["Бакалавриат", "Магистратура", "Докторантура"],
    default: "Бакалавриат",
  },
  description: String,
});

module.exports = mongoose.model("Specialty", SpecialtySchema);
