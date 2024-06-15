
const CreateParentChildService = require("../services/common/CreateParentChildService");
const ParentModel = require("../models/purchase/PurchaseModel");
const ChildModel = require("../models/purchase/PurchaseProductModel");
const ListOneService = require("../services/common/ListOneService");
const DeleteParentChildService = require("../services/common/DeleteParentChildService");


exports.CreatePurchase = async (req, res) => {
    try {
        const result = await CreateParentChildService(req, ParentModel, ChildModel, "purchaseId");
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in purchase creation:", error);
        res.status(200).json({ error: "Internal server error" });
    }
};
exports.PurchaseList = async (req, res) => {
    try {
        let searchRegex = { $regex: req.params.searchText, $options: "i" };

        let JoinOneStage = {$lookup: { from: "suppliers",localField: "supplierId",foreignField: "_id", as: "supplier"}};

        let Array = [ { "supplier.name": searchRegex }, { "supplier.email": searchRegex }, { "supplier.phone": searchRegex }, { "supplier.address": searchRegex }];

        let result = await ListOneService(req, ParentModel, Array, JoinOneStage);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error in product list retrieval:", error);
        res.status(200).json({ status: 'failed', message: "Internal server error", error: error.message });
    }
};
exports.PurchaseDelete = async(req,res) => {
    try {
        const result = await DeleteParentChildService(req, ParentModel, ChildModel, "purchaseId");
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in purchase deletion:", error);
        res.status(200).json({ error: "Internal server error" });
    }
}

