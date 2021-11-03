const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/user-nl-tracking")
  .catch((error) => console.error(error.message));

const userActions = new mongoose.Schema({
  user_id: { type: Number, required: true },
  newsletter_id: { type: Number, required: true },
  action: { type: String, required: true },
  activity_date: { type: Date, required: true },
});

module.exports.UserActions = mongoose.model("UserActions", userActions);
