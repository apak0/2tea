import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", OrderSchema);

export default Order;
