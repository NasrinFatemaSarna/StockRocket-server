const CreateParentChildService = require("../services/common/CreateParentChildService");
const ParentModel = require("../models/sales/SalesModel");
const ChildModel = require("../models/sales/SalesProductModel");
const ListOneService = require("../services/common/ListOneService");
const DeleteParentChildService = require("../services/common/DeleteParentChildService");

exports.CreateSales = async (req, res) => {
    try {
        const result = await CreateParentChildService(req, ParentModel, ChildModel, "salesId");
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in sales creation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.SalesList = async (req, res) => {
    try {
        let searchRegex = { $regex: req.params.searchText, $options: "i" };

        let JoinOneStage = {$lookup: { from: "customers",localField: "customerId",foreignField: "_id", as: "customer"}};

        let Array = [ { "customer.name": searchRegex }, { "customer.email": searchRegex }, { "customer.phone": searchRegex }, { "customer.address": searchRegex }];

        let result = await ListOneService(req, ParentModel, Array, JoinOneStage);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error in product list retrieval:", error);
        res.status(200).json({ status: 'failed', message: "Internal server error", error: error.message });
    }
};

exports.SalesDelete = async(req,res) => {
    try {
        const result = await DeleteParentChildService(req, ParentModel, ChildModel, "salesId");
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in purchase deletion:", error);
        res.status(200).json({ error: "Internal server error" });
    }
}