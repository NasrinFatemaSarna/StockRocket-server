const mongoose = require('mongoose');


const customersSchema = new mongoose.Schema({
    userEmail: { type: String},
    customerName: { type: String },
    phone: { type: String, unique: true },
    email: { type: String },
    address: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });


const CustomersModel = mongoose.model('customers', customersSchema)

module.exports = CustomersModel  



