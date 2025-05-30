const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ENTSubjectSchema = new Schema({
  name: { type: String, required: true }, // напр. "Математика", "Биология"
});

module.exports = mongoose.model("ENTSubject", ENTSubjectSchema);
