// const express=require("express")
// const mongoose=require('mongoose')
// const cors=require("cors")
// const UserModel=require('./models/User')
// const ProductModel=require("./models/Products")
// const multer=require("multer")
// const OrderModel = require("./models/Orders");
// // const nodemailer=require("nodemailer")
// require("dotenv").config();
// const crypto = require("crypto");
// const CartModel = require("./models/Cart");

// const Razorpay = require("razorpay");


// const { v2: cloudinary } = require("cloudinary");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "products",
//   },
// });



// const app=express()
// app.use(express.json())
// app.use(cors())
// app.use('/uploads', express.static('uploads'))



// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// mongoose
// .connect(process.env.MONGO_URI)
// .then(()=>console.log("MongoDB connected successfully"))
// .catch((err)=>console.error("MongoDB connection error: ",err));





// //sendgrid email setup
// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendOrderEmail = async (email, status, orderId, total, method) => {
//   const msg = {
//     to: email,
//     from: "keerthananaik64@gmail.com", // IMPORTANT: must be verified in SendGrid
//     subject: "Order Update - Be Boydwise",
//     html: `
//       <h2>Order ${status}</h2>
//       <p>Your order has been <b>${status}</b>.</p>
//       <p><strong>Order ID:</strong> ${orderId}</p>
//       <p><strong>Total:</strong> ₹${total}</p>
//       <p><strong>Payment Method:</strong> ${method}</p>
//       <br/>
//       <p>Thank you for shopping with us ❤️</p>
//     `,
//   };

//   await sgMail.send(msg);
// };







// const upload = multer({ storage: storage });

// //login


// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   UserModel.findOne({ email: email })
//     .then(user => {
//       if (user) {
//         if (user.password === password) {
          
//           res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone
//           });

//         } else {
//           res.json("the password is incorrect");
//         }
//       } else {
//         res.json("No record existed");
//       }
//     });
// });





// //register
// app.post('/register',(req,res) => {
//     UserModel.create(req.body)
//     .then(users=>res.json(users))
//     .catch(err=>res.json(err))

// })


// //addproduct
// app.post('/products', upload.single("image"), (req,res)=>{
//     const productDetail = {
//   imageUpload: req.file.path,
//   title: req.body.title,
//   category: req.body.category,
//   price: req.body.price,
//   quantity: req.body.quantity,
//   rating: req.body.rating,
  
// };

// ProductModel.create(productDetail)
// .then(product => res.json(product))
// .catch(err => res.json(err));
// })


// //fetch 
// app.get('/products',async(req,res)=>{
//     ProductModel.find({})
//     .then(data => res.json(data))
//     .catch(err => res.status(500).json(err))
// })
  
// //delete the product
// const fs = require("fs");
// const path = require("path");

// app.delete("/products/:id", async (req, res) => {
//   try {

//     const product = await ProductModel.findById(req.params.id);

//     if (!product) {
//       return res.json("Product not found");
//     }

  
    
//     await ProductModel.findByIdAndDelete(req.params.id);

//     res.json("Product deleted successfully");

//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// });

// //getting single product 

// app.get('/products/:id',async(req,res)=>{
//     try{
//         const product = await ProductModel.findById(req.params.id);

//         if(!product){
//             return res.status(404).json({message:"Product not found"});
//         }

//         res.json(product);
//     }
//     catch(err){
//         console.log(err);
//         res.json(err);
//     }
// });


// //update product



// app.put('/products/:id', upload.single("image"), async(req,res)=>{
//     try{

//         const {title,category,price,quantity,rating} = req.body;

//         const updateData = {
//             title,
//             category,
//             price,
//             quantity,
//             rating
//         };

//         if(req.file){
//             updateData.imageUpload = req.file.path;
//         }

//         const updated = await ProductModel.findByIdAndUpdate(
//             req.params.id,
//             updateData,
//             { new:true }
//         );

//         res.json(updated);

//     }
//     catch(err){
//         console.log(err);
//         res.json(err);
//     }
// })






// app.post("/cart", async (req, res) => {
//   try {
//     const { userId, productId, count } = req.body;

//     const existingItem = await CartModel.findOne({
//       userId,
//       productId,
//     });

//     if (existingItem) {
//       existingItem.count += count; 
//       await existingItem.save();
//       return res.json(existingItem);
//     }

//     const newItem = new CartModel({
//       userId,
//       productId,
//       count,
//     });

//     await newItem.save();
//     res.json(newItem);

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// app.get("/cart/:userId", async (req, res) => {
//   try {
//     const cart = await CartModel.find({
//       userId: req.params.userId,
//     }).populate("productId");

//     res.json(cart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




// app.put("/cart/:id", async (req, res) => {
//   try {
//     const updated = await CartModel.findByIdAndUpdate(
//       req.params.id,
//       { count: req.body.count },
//       { new: true }
//     ).populate("productId");

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //delete one item
// app.delete("/cart/:id", async (req, res) => {
//   try {
//     await CartModel.findByIdAndDelete(req.params.id);
//     res.json({ message: "Item removed" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// //clear full cart
// app.delete("/cart/user/:userId", async (req, res) => {
//   try {
//     await CartModel.deleteMany({ userId: req.params.userId });
//     res.json({ message: "Cart cleared" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });





// //order api
// app.post("/payment", async (req, res) => {
//   try {
  
//     const {
//       productId,
//       productName,
//       quantity,
//       total,
//       phone,
//       address,
//       method,
//       upiId,
//       email, paymentId
//     } = req.body;

//     if (!method) {
//       return res.status(400).json({ message: "Method required" });
//     }

//     if (!email) {
//       return res.status(400).json({ message: "Email required" });
//     }

//     const order = new OrderModel({
//       productId,
//       productName,
//       quantity,
//       total,
//       phone,
//       address,
//       method,
//       upiId,
//       email, paymentId
//     });

//     await order.save();
    
//     await sendOrderEmail(
//   email,
//   "Pending",
//   order._id,
//   total,
//   method
// );

//     res.json({ message: "Order saved successfully" });

//   } catch (err) {
//     console.log("ERROR:", err);  
//     res.status(500).json({ message: "Server error" });
//   }
// });



// app.get('/orders',(req,res)=>{
//     OrderModel.find({})
//     .then(data => res.json(data))
//     .catch(err => res.status(500).json(err))
// })




// app.put("/orders/:id", async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const updated = await OrderModel.findByIdAndUpdate(
//       orderId,
//       { status: req.body.status },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Order not found" });
//     }
 
//     if (updated.email) {
     
//       await sendOrderEmail(
//   updated.email,
//   updated.status,
//   orderId,
//   updated.total,
//   updated.method
// );
//     }

//     res.json(updated);

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// //search api
// app.get("/products/search/:key",async(req,res)=>{
//   try{
//    const result = await ProductModel.find({
//     $or:[
//       {title: { $regex: req.params.key, $options: "i" }},
//       {category:{$regex: req.params.key, $options: "i" }},

//     ]
  
// });
//      res.json(result);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json(err);
//   }
// })



// //deleting the order details by admin
// app.delete("/orders/:id", async (req, res) => {
//   await OrderModel.findByIdAndDelete(req.params.id);
//   res.json("Order deleted");
// });


// //razorpay order
// app.post("/create-order", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100, 
//       currency: "INR",
//       receipt: "order_rcptid_" + Date.now()
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);

//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// //verification



// app.post("/verify-payment", async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//           razorpay_payment_id,
//              razorpay_signature
//     } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSign = crypto
      
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (razorpay_signature === expectedSign) {
//       res.json({ success: true, message: "Payment verified" });
//     } else {
//       res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Verification failed" });
//   }
// });



// //shop by category

// app.get("/products/category/:type", async (req, res) => {
//   try {
//     const { type } = req.params;

//     const products = await ProductModel.find({
//       category: type.toLowerCase(),   
//     });

//     res.json(products);
//   } catch (err) {
//     console.log(err);   
//     res.status(500).json({ error: err.message });
//   }
// });


// //order page for specific user
// app.get("/my-orders/:email", (req, res) => {
//   OrderModel.find({ email: req.params.email })
//     .then(data => res.json(data))
//     .catch(err => res.status(500).json(err));
// });


// //admin dashboard
// app.get("/api/admin/dashboard", async (req, res) => {
//   try {

//     const users = await UserModel.find();
//     const orders = await OrderModel.find();

//     const totalUsers = users.length;
//     const totalOrders = orders.length;

//     let totalSales = 0;
//     let totalPayments = 0;

//     const salesMap = {};
//     const signupMap = {};
//     const paymentMap = {};

//     orders.forEach(order => {

//       const amount = order.total || 0;

     
//       totalSales += amount;

//       if (order.paymentId) {
//         totalPayments += amount;
//       }

//       const date = new Date(order.createdAt).toLocaleDateString();

//       if (!salesMap[date]) {
//         salesMap[date] = 0;
//       }
//       salesMap[date] += amount;

     
//       if (order.paymentId) {
//         if (!paymentMap[date]) {
//           paymentMap[date] = 0;
//         }
//         paymentMap[date] += amount;
//       }

//     });

//     users.forEach(user => {
//       const date = new Date(user.createdAt).toLocaleDateString();

//       if (!signupMap[date]) {
//         signupMap[date] = 0;
//       }

//       signupMap[date] += 1;
//     });

    

//     const salesData = Object.keys(salesMap).map(date => ({
//       date,
//       amount: salesMap[date]
//     }));

//     const signupData = Object.keys(signupMap).map(date => ({
//       date,
//       users: signupMap[date]
//     }));

//     const paymentData = Object.keys(paymentMap).map(date => ({
//       date,
//       amount: paymentMap[date]
//     }));


   
//     res.json({
//       totalUsers,
//       totalOrders,
//       totalSales,
//       totalPayments,
//       salesData,
//       signupData,
//       paymentData
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });





// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const UserModel=require('./models/User')
const ProductModel=require("./models/Products")
const multer=require("multer")
const OrderModel = require("./models/Orders");

require("dotenv").config();
const crypto = require("crypto");
const CartModel = require("./models/Cart");

const Razorpay = require("razorpay");


const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
  },
});



const app=express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully"))
.catch((err)=>console.error("MongoDB connection error: ",err));



//sendgrid email setup
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PDFDocument = require("pdfkit");

const sendOrderEmail = async (
  email,
  status,
  orderId,
  total,
  method,
  productName,
  quantity,
  address,
  phone
) => {
  const doc = new PDFDocument({ margin: 50 });

  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  doc.on("end", async () => {
    const pdfData = Buffer.concat(buffers);

    const msg = {
      to: email,
      from: "keerthananaik64@gmail.com",
      subject: "Invoice - Be Bodywise",
      text: "Your invoice is attached",

      attachments: [
        {
          content: pdfData.toString("base64"),
          filename: `invoice-${orderId}.pdf`,
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(msg);
  });

  // ================= HEADER =================
  doc.fontSize(20).text("Be Bodywise", { align: "left" });
  doc.fontSize(10).text("Corporate Office:", { align: "right" });
  doc.text("Be Bodywise Pvt Ltd", { align: "right" });
  doc.text("Mangalore, Karnataka, India", { align: "right" });

  doc.moveDown();
  doc.moveTo(50, 120).lineTo(550, 120).stroke();

  // ================= TITLE =================
  doc.moveDown();
  doc.fontSize(16).text("OFFICIAL RECEIPT");

  doc.moveDown();

  // ================= ORDER DETAILS =================
  doc.fontSize(10);
  doc.text(`Invoice #: INV-${orderId}`);
  doc.text(`Order ID: ${orderId}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.text(`Payment: ${method}`);
  doc.text(`Status: ${status}`);

  doc.moveDown();

  // ================= SHIPPING =================
  doc.text("Shipping: Standard Delivery");
  doc.text("Estimated: 3-5 Days");
  doc.text("Shipping Cost: Free");
  doc.text(`Phone: ${phone}`);

  doc.moveDown();

  // ================= ADDRESS =================
  doc.text("Billed To:");
  doc.text(`${address?.name}`);
  doc.text(`${address?.address}, ${address?.city}`);
  doc.text(`${address?.state} - ${address?.pincode}`);

  doc.moveDown();

  // ================= TABLE HEADER =================
  const tableTop = doc.y;
  const itemX = 50;
  const qtyX = 250;
  const priceX = 300;
  const baseX = 360;
  const cgstX = 420;
  const sgstX = 470;
  const totalX = 520;

  doc.fontSize(10).text("Item", itemX, tableTop);
  doc.text("Qty", qtyX, tableTop);
  doc.text("Price", priceX, tableTop);
  doc.text("Base", baseX, tableTop);
  doc.text("CGST", cgstX, tableTop);
  doc.text("SGST", sgstX, tableTop);
  doc.text("Total", totalX, tableTop);

  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  // ================= CALCULATIONS =================
  const base = total;
  const gst = base * 0.04; 
  const cgst = gst / 2;
  const sgst = gst / 2;
  const grandTotal = base + gst;

  const rowY = tableTop + 25;

  doc.text(productName, itemX, rowY);
  doc.text(quantity, qtyX, rowY);
  doc.text(base.toFixed(2), priceX, rowY);
  doc.text(base.toFixed(2), baseX, rowY);
  doc.text(cgst.toFixed(2), cgstX, rowY);
  doc.text(sgst.toFixed(2), sgstX, rowY);
  doc.text(grandTotal.toFixed(2), totalX, rowY);

  doc.moveDown(3);

  // ================= SUMMARY =================
  doc.text(`Taxable Subtotal: ${base.toFixed(2)}`, { align: "right" });
  doc.text(`Total Tax (GST): ${gst.toFixed(2)}`, { align: "right" });
  doc.text(`Shipping: FREE`, { align: "right" });

  doc.moveDown();

  doc.rect(350, doc.y, 200, 20).fill("#eeeeee").stroke();
  doc.fillColor("black").text(
    `Grand Total: ${grandTotal.toFixed(2)}`,
    360,
    doc.y + 5
  );

  doc.moveDown(2);

  doc.text("Thank you for shopping with Be Bodywise!", {
    align: "center",
  });

  doc.end();
};







const upload = multer({ storage: storage });

//login


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
          });

        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("No record existed");
      }
    });
});





//register
app.post('/register',(req,res) => {
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})


//addproduct
app.post('/products', upload.single("image"), (req,res)=>{
    const productDetail = {
  imageUpload: req.file.path,
  title: req.body.title,
  category: req.body.category,
  price: req.body.price,
  quantity: req.body.quantity,
  rating: req.body.rating,
  
};

ProductModel.create(productDetail)
.then(product => res.json(product))
.catch(err => res.json(err));
})


//fetch 
app.get('/products',async(req,res)=>{
    ProductModel.find({})
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})
  
//delete the product
const fs = require("fs");
const path = require("path");

app.delete("/products/:id", async (req, res) => {
  try {

    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.json("Product not found");
    }

  
    
    await ProductModel.findByIdAndDelete(req.params.id);

    res.json("Product deleted successfully");

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//getting single product 

app.get('/products/:id',async(req,res)=>{
    try{
        const product = await ProductModel.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        res.json(product);
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
});


//update product



app.put('/products/:id', upload.single("image"), async(req,res)=>{
    try{

        const {title,category,price,quantity,rating} = req.body;

        const updateData = {
            title,
            category,
            price,
            quantity,
            rating
        };

        if(req.file){
            updateData.imageUpload = req.file.path;
        }

        const updated = await ProductModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new:true }
        );

        res.json(updated);

    }
    catch(err){
        console.log(err);
        res.json(err);
    }
})






app.post("/cart", async (req, res) => {
  try {
    const { userId, productId, count } = req.body;

    const existingItem = await CartModel.findOne({
      userId,
      productId,
    });

    if (existingItem) {
      existingItem.count += count; 
      await existingItem.save();
      return res.json(existingItem);
    }

    const newItem = new CartModel({
      userId,
      productId,
      count,
    });

    await newItem.save();
    res.json(newItem);

  } catch (err) {
    res.status(500).json(err);
  }
});


app.get("/cart/:userId", async (req, res) => {
  try {
    const cart = await CartModel.find({
      userId: req.params.userId,
    }).populate("productId");

    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});




app.put("/cart/:id", async (req, res) => {
  try {
    const updated = await CartModel.findByIdAndUpdate(
      req.params.id,
      { count: req.body.count },
      { new: true }
    ).populate("productId");

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete one item
app.delete("/cart/:id", async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json(err);
  }
});


//clear full cart
app.delete("/cart/user/:userId", async (req, res) => {
  try {
    await CartModel.deleteMany({ userId: req.params.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json(err);
  }
});





//order api
app.post("/payment", async (req, res) => {
  try {
  
    const {
      productId,
      productName,
      quantity,
      total,
      phone,
      address,
      method,
      upiId,
      email, paymentId
    } = req.body;

    if (!method) {
      return res.status(400).json({ message: "Method required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const order = new OrderModel({
      productId,
      productName,
      quantity,
      total,
      phone,
      address,
      method,
      upiId,
      email, paymentId
    });

    await order.save();
    // await sendOrderEmail(email, "Pending", order._id);
    await sendOrderEmail(
  email,
  "Pending",
  order._id,
  total,
  method,
  productName,
  quantity,
  address,
  phone
);

    res.json({ message: "Order saved successfully" });

  } catch (err) {
    console.log("ERROR:", err);  
    res.status(500).json({ message: "Server error" });
  }
});



app.get('/orders',(req,res)=>{
    OrderModel.find({})
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})




app.put("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const updated = await OrderModel.findByIdAndUpdate(
      orderId,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }
 
    if (updated.email) {
      // await sendOrderEmail(updated.email, updated.status, orderId);
      await sendOrderEmail(
  updated.email,
  updated.status,
  orderId,
  updated.total,
  updated.method,
  updated.productName,
  updated.quantity,
  updated.address,
  updated.phone
);
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json(err);
  }
});



//search api
app.get("/products/search/:key",async(req,res)=>{
  try{
   const result = await ProductModel.find({
    $or:[
      {title: { $regex: req.params.key, $options: "i" }},
      {category:{$regex: req.params.key, $options: "i" }},

    ]
  
});
     res.json(result);
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})



//deleting the order details by admin
app.delete("/orders/:id", async (req, res) => {
  await OrderModel.findByIdAndDelete(req.params.id);
  res.json("Order deleted");
});


//razorpay order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: "order_rcptid_" + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (err) {
    res.status(500).send(err);
  }
});

//verification



app.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
          razorpay_payment_id,
             razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Verification failed" });
  }
});



//shop by category

app.get("/products/category/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const products = await ProductModel.find({
      category: type.toLowerCase(),   
    });

    res.json(products);
  } catch (err) {
    console.log(err);   
    res.status(500).json({ error: err.message });
  }
});


//order page for specific user
app.get("/my-orders/:email", (req, res) => {
  OrderModel.find({ email: req.params.email })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});


//admin dashboard
app.get("/api/admin/dashboard", async (req, res) => {
  try {

    const users = await UserModel.find();
    const orders = await OrderModel.find();

    const totalUsers = users.length;
    const totalOrders = orders.length;

    let totalSales = 0;
    let totalPayments = 0;

    const salesMap = {};
    const signupMap = {};
    const paymentMap = {};

    orders.forEach(order => {

      const amount = order.total || 0;

     
      totalSales += amount;

      if (order.paymentId) {
        totalPayments += amount;
      }

      const date = new Date(order.createdAt).toLocaleDateString();

      if (!salesMap[date]) {
        salesMap[date] = 0;
      }
      salesMap[date] += amount;

     
      if (order.paymentId) {
        if (!paymentMap[date]) {
          paymentMap[date] = 0;
        }
        paymentMap[date] += amount;
      }

    });

    users.forEach(user => {
      const date = new Date(user.createdAt).toLocaleDateString();

      if (!signupMap[date]) {
        signupMap[date] = 0;
      }

      signupMap[date] += 1;
    });

    

    const salesData = Object.keys(salesMap).map(date => ({
      date,
      amount: salesMap[date]
    }));

    const signupData = Object.keys(signupMap).map(date => ({
      date,
      users: signupMap[date]
    }));

    const paymentData = Object.keys(paymentMap).map(date => ({
      date,
      amount: paymentMap[date]
    }));


   
    res.json({
      totalUsers,
      totalOrders,
      totalSales,
      totalPayments,
      salesData,
      signupData,
      paymentData
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});





const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
