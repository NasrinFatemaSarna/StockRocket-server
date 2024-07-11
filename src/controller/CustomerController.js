
const CustomersModel = require("../models/customer/CustomersModel");
const CreateService = require("../services/common/CreateService");
const DetailsService = require("../services/common/DetailsService");
const DropDownService = require("../services/common/DropDownService");
const ListService = require("../services/common/ListService");
const UserUpdateService = require("../services/user/UserUpdateService");
const DeleteService = require("../services/common/DeleteService");
const mongoose = require("mongoose");
const AssociateVerificationService = require("../services/common/AssociateVerificationService");
const ProductModel = require("../models/product/ProductModel");

exports.CreateCustomer = async (req, res) => {
    try {
        const result = await CreateService(req, CustomersModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in customer creation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.CustomerDetailsById = async (req, res) => {
    try {
        const result = await DetailsService(req, CustomersModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in fetching customer details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.CustomerUpdateById = async (req, res) => {
    try {
        const result = await UserUpdateService(req, CustomersModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in updating customer details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.CustomerDropDown = async (req, res) => {
    try {
        const result = await DropDownService(req, CustomersModel, { _id: 1, customerName: 1 });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in fetching customer dropdown:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.CustomerList = async (req, res) => {
    try {
        let searchRegex = {$regex : req.params.searchText, $options : "i"}
        let array = [{customerName:searchRegex}, {email:searchRegex}, {phone:searchRegex},{address:searchRegex}];
        let result = await ListService(req.CustomersModel,array)
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in fetching customer list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};





















// // // // const CustomersModel = require("../models/Customer/CustomersModel");
// // // // const CreateService = require("../services/common/CreateService");
// // // // const DetailsService = require("../services/common/DetailsService");
// // // // const DropDownService = require("../services/common/DropDownService");
// // // // const ListService = require("../services/common/ListService");
// // // // const UserUpdateService = require("../services/user/UserUpdateService");
// // // // const DeleteService  = require("../services/common/DeleteService");
// // // // const mongoose = require("mongoose");
// // // // const AssociateVerificationService = require("../services/common/AssociateVerificationService");
// // // // const ProductModel = require("../models/product/ProductModel");


// // // // exports.CreateCustomer = async (req, res) => {
// // // //     try {
// // // //         const result = await CreateService(req, CustomersModel);
// // // //         res.status(200).json(result);
// // // //     } catch (error) {
// // // //         console.error("Error in customer creation:", error);
// // // //         res.status(200).json({ error: "Internal server error" });
// // // //     }
// // // // };

// // // // exports.CustomerDetailsById = async (req, res) => {
// // // //     try {
// // // //         const result = await DetailsService(req, CustomersModel);
// // // //         res.status(200).json(result);
// // // //     } catch (error) {
// // // //         console.error("Error in customer details:", error);
// // // //         res.status(200).json({ error: "Internal server error" });
// // // //     }
// // // // }

// // // // exports.CustomerUpdateById = async (req, res) => {
// // // //     try {
// // // //         const result = await UserUpdateService(req, CustomersModel);
// // // //         res.status(200).json(result);
// // // //     } catch (error) {
// // // //         console.error("Error in customer details:", error);
// // // //         res.status(200).json({ error: "Internal server error" });
// // // //     }
// // // // }

// // // // exports.CustomerDropDown = async (req, res) => {
// // // //     try {
// // // //         const result = await DropDownService(req, CustomersModel, {_id: 1, customerName: 1});
// // // //         res.status(200).json(result);
// // // //     } catch (error) {
// // // //         console.error("Error in customer details:", error);
// // // //         res.status(200).json({ error: "Internal server error" });
// // // //     }
// // // // }

// // // // exports.CustomerList = async (req, res) => {
// // // //     try {
// // // //       let searchRegex = { $regex: req.params.searchText, $options: "i" };
// // // //       let array =[{ customerName: searchRegex }, { email: searchRegex }, { phone: searchRegex }, {address: searchRegex }];
// // // //         let result = await ListService(req, CustomersModel, array);
// // // //         res.status(200).json(result);
        
// // // //     } catch (error) {
// // // //         console.error("Error in customer details:", error);
// // // //         res.status(200).json({ error: "Internal server error" });
// // // //     }
// // // // }

// // // // exports.DeleteCustomer = async (req, res) => {
// // // //     try {
// // // //         const objectId = mongoose.Types.ObjectId;
// // // //         const deleteId = req.params.id;

// // // //         // Validate mongoose ID
// // // //         if (!objectId.isValid(deleteId)) {
// // // //             return res.status(400).json({ status: "failed", data: "Invalid ID" });
// // // //         }

// // // //         const id = new objectId(deleteId);

// // // //         // Check if supplier is associated with any product
// // // //         const checkAssociation = await AssociateVerificationService({ customerId: id }, ProductModel);
// // // //         if (checkAssociation) {
// // // //             return res.status(400).json({ status: "failed", data: "Customer is associated with a product" });
// // // //         } 

// // // //         // Perform the delete operation
// // // //         const result = await DeleteService(req, CustomersModel);
// // // //         if (!result || result.deletedCount === 0) {
// // // //             return res.status(404).json({ status: "failed", data: "Customer not found" });
// // // //         }

// // // //         return res.status(200).json({ status: "success", data: "Customer deleted successfully" });

// // // //     } catch (error) {
// // // //         console.error("Error in customer deletion:", error);
// // // //         return res.status(500).json({ status: "failed", data: "Internal server error", error: error.message });
// // // //     }
// // // // };

