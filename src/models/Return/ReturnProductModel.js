

const mongoose = require("mongoose");

const returnProductSchema = new mongoose.Schema({
    userEmail: { type: String},
    returnId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    quantity: { type: Number },
    unitCost: { type: Number},
    total: { type: Number },
    createdDate: { type: Date, default: Date.now }

}, { versionKey: false });

const ReturnProductModel = mongoose.model("returnProducts", returnProductSchema);

module.exports = ReturnProductModel;