const CreateService = require("../services/common/CreateService");
const CategoryModel = require("../models/brand/CategoryModel");
const DetailsService = require("../services/common/DetailsService");
const DropDownService = require("../services/common/DropDownService");
const UserUpdateService = require("../services/common/UserUpdateService");
const ListService = require("../services/common/ListService");
const DeleteService  = require("../services/common/DeleteService");
const mongoose = require("mongoose");
const AssociateVerificationService = require("../services/common/AssociateVerificationService");
const ProductModel = require("../models/product/ProductModel");




exports.CreateCategory= async (req, res) => {
    try {
        const result = await CreateService(req, CategoryModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.CategoryDetailsById = async (req, res) => {
    try {
        const result = await DetailsService(req, CategoryModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
exports.CategoryUpdateById = async (req, res) => {
    try {
        const result = await UserUpdateService(req, CategoryModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.CategoryDropDown = async (req, res) => {
    try {
        const result = await DropDownService(req, CategoryModel, {_id: 1, name: 1});
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.CategoryList = async (req, res) => {
    try {
      let searchRegex = { $regex: req.params.searchText, $options: "i" };
      let array =[{ name: searchRegex }];
        let result = await ListService(req, CategoryModel, array);
        res.status(200).json(result);
        
    } catch (error) {
        console.error("Error in brand details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.DeleteCategory = async (req, res) => {
    try {
        let objectId = mongoose.Types.ObjectId;
        let deleteId = req.params.id;

        // Validate mongoose ID
        if (!objectId.isValid(deleteId)) {
            return res.status(200).json({ status: "failed", data: "Invalid ID" });
        }

        const id = new objectId(deleteId);

        // Check if the category exists
        let category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(200).json({ status: "failed", data: "Category not found" });
        }

        // Check if category is associated with any product
        let checkAssociation = await AssociateVerificationService({ categoryId: id }, ProductModel);
        if (checkAssociation) {
            return res.status(200).json({ status: "failed", data: "Category is associated with a product" });
        }

        // Perform the delete operation
        let result = await DeleteService(req, CategoryModel);
        return res.status(200).json(result);

    } catch (error) {
        console.error("Error in category deletion:", error);
        return res.status(200).json({ status: "failed", data: "Internal server error" });
    }
}