const mongoose = require("mongoose");
//schema
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      enum: ["Trial", "Free", "Basic", "Premium"],
      required: true,
    },

    amount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

//!Compile to form the model
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
