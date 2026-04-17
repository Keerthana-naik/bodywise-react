

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
           
  productId: String,         
  productName: String,      
  quantity: Number,
  total: Number,
  phone: String,

  address: {
    address:String,
    city: String,
    state: String,
    pincode: String
  },

  method: String,            
  upiId: String,
   paymentId:{
    type: String
   },

  email: {
  type: String,
  required: true
},

  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Orders", OrderSchema);