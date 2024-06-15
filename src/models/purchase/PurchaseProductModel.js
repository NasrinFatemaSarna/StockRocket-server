
const mongoose = require("mongoose");

const purchaseProductSchema = new mongoose.Schema({
    userEmail: { type: String},
    purchaseId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    quantity: { type: Number },
    unitCost: { type: Number},
    total: { type: Number },
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false });

const PurchaseProductModel = mongoose.model("PurchaseProduct", purchaseProductSchema);

module.exports = PurchaseProductModel;

