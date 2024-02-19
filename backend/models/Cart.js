import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    // unique: true,
  },
  product: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  checkout: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("product", CartSchema);
