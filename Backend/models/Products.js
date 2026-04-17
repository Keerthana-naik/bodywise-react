const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  imageUpload: Object,
  title: String,
  category: String,
  price: Number,
  quantity:Number,
  rating: Number
})

const ProductModel = mongoose.model("products", ProductSchema)

module.exports = ProductModel