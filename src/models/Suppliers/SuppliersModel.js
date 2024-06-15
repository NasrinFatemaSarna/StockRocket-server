const mongoose = require('mongoose');


const suppliersSchema = new mongoose.Schema({
    userEmail: { type: String},
    supplierName: { type: String },
    phone: { type: String, unique: true },
    email: { type: String },
    address: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });


const SuppliersModel = mongoose.model('suppliers', suppliersSchema)

module.exports = SuppliersModel  