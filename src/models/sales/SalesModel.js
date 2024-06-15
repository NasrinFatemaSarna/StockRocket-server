const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
    userEmail: { type: String},
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true,ref: "Customer"  },
    vatTax: { type: Number,default: 0 },
    discount: { type: Number, default: 0 },
    otherCost: { type: Number,default: 0},
    grantTotal: { type: Number, default: 0 },
    shippingCost: {  type: Number,default: 0 },
    details: { type: String },
    createdDate: { type: Date,  default: Date.now }

}, { versionKey: false });

const SalesModel = mongoose.model("Sales", SalesSchema);

module.exports = SalesModel;
