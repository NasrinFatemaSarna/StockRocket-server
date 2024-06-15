const SuppliersModel = require("../models/Suppliers/SuppliersModel");
const CreateService = require("../services/common/CreateService");
const DetailsService = require("../services/common/DetailsService");
const DropDownService = require("../services/common/DropDownService");
const ListService = require("../services/common/ListService");
const UserUpdateService = require("../services/user/UserUpdateService");
const DeleteService  = require("../services/common/DeleteService");
const mongoose = require("mongoose");
const AssociateVerificationService = require("../services/common/AssociateVerificationService");
const ProductModel = require("../models/product/ProductModel");


exports.CreateSupplier = async (req, res) => {
    try {
        const result = await CreateService(req, SuppliersModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in supplier creation:", error);
        res.status(200).json({ error: "Internal server error" });
    }
};

exports.SupplierDetailsById = async (req, res) => {
    try {
        const result = await DetailsService(req, SuppliersModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in supplier details:", error);
        res.status(200).json({ error: "Internal server error" });
    }
}

exports.SupplierUpdateById = async (req, res) => {
    try {
        const result = await UserUpdateService(req, SuppliersModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in supplier details:", error);
        res.status(200).json({ error: "Internal server error" });
    }
}

exports.SupplierDropDown = async (req, res) => {
    try {
        const result = await DropDownService(req, SuppliersModel, {_id: 1, supplierName: 1});
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in supplier details:", error);
        res.status(200).json({ error: "Internal server error" });
    }
}

exports.SupplierList = async (req, res) => {
    try {
      let searchRegex = { $regex: req.params.searchText, $options: "i" };
      let array =[{ supplierName: searchRegex }, { email: searchRegex }, { phone: searchRegex }, {address: searchRegex }];
        let result = await ListService(req, SuppliersModel, array);
        res.status(200).json(result);
        
    } catch (error) {
        console.error("Error in supplier details:", error);
        res.status(200).json({ error: "Internal server error" });
    }
}

exports.DeleteSupplier = async (req, res) => {
    try {
        const objectId = mongoose.Types.ObjectId;
        const deleteId = req.params.id;

        // Validate mongoose ID
        if (!objectId.isValid(deleteId)) {
            return res.status(400).json({ status: "failed", data: "Invalid ID" });
        }

        const id = new objectId(deleteId);

        // Check if supplier is associated with any product
        const checkAssociation = await AssociateVerificationService({ supplierId: id }, ProductModel);
        if (checkAssociation) {
            return res.status(400).json({ status: "failed", data: "Supplier is associated with a product" });
        } 

        // Perform the delete operation
        const result = await DeleteService(req, SuppliersModel);
        if (!result || result.deletedCount === 0) {
            return res.status(404).json({ status: "failed", data: "Supplier not found" });
        }

        return res.status(200).json({ status: "success", data: "Supplier deleted successfully" });

    } catch (error) {
        console.error("Error in supplier deletion:", error);
        return res.status(500).json({ status: "failed", data: "Internal server error", error: error.message });
    }
};