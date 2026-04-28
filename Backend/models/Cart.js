

const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",   
  },
  count: Number,
});

module.exports = mongoose.model("Cart", CartSchema);

