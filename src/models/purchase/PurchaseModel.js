
const mongoose = require("mongoose");

// Define the purchase schema
const purchaseSchema = new mongoose.Schema({
    userEmail: { type: String, required: true }, // Added required constraint for userEmail
    supplierId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Added required constraint for supplierId
    vatTax: { type: Number, default: 0 }, // Added default value for vatTax
    discount: { type: Number, default: 0 }, // Added default value for discount
    otherCost: { type: Number, default: 0 }, // Added default value for otherCost
    grandTotal: { type: Number, default: 0 }, // Added default value for grandTotal
    shippingCost: { type: Number, default: 0 }, // Added default value for shippingCost
    details: { type: String, default: "" }, // Added default value for details
    createdDate: { type: Date, default: Date.now } // Removed immediate invocation of Date.now()
}, { versionKey: false });

// Create the PurchaseModel from the schema
const PurchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = PurchaseModel;
