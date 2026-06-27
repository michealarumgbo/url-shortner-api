import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10d",
  },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
