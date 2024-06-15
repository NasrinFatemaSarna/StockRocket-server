


const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  details: { type: String, required: true },
  images: [{ type: String, required: true }], // This should be an array of strings
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }
});

module.exports = mongoose.model('Products', ProductSchema);






// const mongoose = require("mongoose");

// const productsSchema = new mongoose.Schema({

//    userEmail:{type: String},
//    name:{type: String},
//    unit:{type: String},
//    details:{ type: String},
//    images:{ type: String},
//    categoryId:{type: mongoose.Schema.Types.ObjectId},

//    brandId:{type: mongoose.Schema.Types.ObjectId},

//    createdDate:{type: Date, default: Date.now ()},
// },{versionKey: false});


// const ProductsModel = mongoose.model("products", productsSchema);
// module.exports = ProductsModel