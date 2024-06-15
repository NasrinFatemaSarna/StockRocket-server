
const BrandModel = require("../models/brand/BrandModel");
const CreateService  = require("../services/common/CreateService");
const DetailsService  = require("../services/common/DetailsService");
const DropDownService = require("../services/common/DropDownService");
const UserUpdateService  = require("../services/common/UserUpdateService");
const ListService  = require("../services/common/ListService");
const DeleteService  = require("../services/common/DeleteService");
const mongoose = require("mongoose");
const AssociateVerificationService = require("../services/common/AssociateVerificationService");
const ProductModel = require("../models/product/ProductModel");



exports.CreateBrand = async (req, res) => {
    try {
        const result = await CreateService(req, BrandModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand creation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.BrandDetailsById = async (req, res) => {
    try {
        const result = await DetailsService(req, BrandModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
exports.BrandUpdateById = async (req, res) => {
    try {
        const result = await UserUpdateService(req, BrandModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.BrandDropDown = async (req, res) => {
    try {
        const result = await DropDownService(req, BrandModel, {_id: 1, name: 1});
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.BrandList = async (req, res) => {
    try {
      let searchRegex = { $regex: req.params.searchText, $options: "i" };
      let array =[{ name: searchRegex }];
        let result = await ListService(req, BrandModel, array);
        res.status(200).json(result);
        
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.DeleteBrand = async (req, res) => {
    try {
        let objectId = mongoose.Types.ObjectId;
        let deleteId = req.params.id;

        // Validate mongoose ID
        if (!objectId.isValid(deleteId)) {
            return res.status(200).json({ status: "failed", data: "Invalid ID" });
        }

        const id = new objectId(deleteId);

        // Check if brand is associated with any product
        let checkAssociation = await AssociateVerificationService({ brandId: id }, ProductModel);
        if (checkAssociation) {
            return res.status(200).json({ status: "failed", data: "Brand is associated with a product" });
        } else {
            // Perform the delete operation
            let result = await DeleteService(req, BrandModel);
            res.status(200).json(result);
        }

    } catch (error) {
        console.error("Error in brand deletion:", error);
        res.status(200).json({ status: "failed", data: "Internal server error" });
    }
}