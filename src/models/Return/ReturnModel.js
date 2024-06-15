const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
    userEmail: { type: String},
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true,ref: "Customer"  },
    vatTax: { type: Number,default: 0 },
    discount: { type: Number, default: 0 },
    otherCost: { type: Number,default: 0},
    grandTotal: { type: Number,required: true },
    shippingCost: {  type: Number,default: 0 },
    details: { type: String },
    createdDate: { type: Date,  default: Date.now }

}, { versionKey: false });

const ReturnModel = mongoose.model("Returns", ReturnSchema);

module.exports = ReturnModel;