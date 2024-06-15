

const ExpenseReportService = require("../services/Report/ExpenseReportService");
const PurchaseReportService = require("../services/Report/PurchaseReportService");
const ReturnReportService = require("../services/Report/ReturnReport");
const SalesReportService = require("../services/Report/SalesReportService");

exports.ExpenseReportByDate = async (req, res) => {
    try {
        let result = await ExpenseReportService(req);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in expense report retrieval:", error);
        res.status(200).json({ status: 'failed', message: "Internal server error", error: error.message });
    }
};

exports.SalesReportByDate = async (req, res) => {
    try {
        let result = await SalesReportService(req);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in expense report retrieval:", error);
        res.status(200).json({ status: 'failed', message: "Internal server error", error: error.message });
    }
};
exports.PurchaseReportByDate = async (req, res) => {
    try {
        let result = await PurchaseReportService(req);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in expense report retrieval:", error);
        res.status(200).json({ status: 'failed', message: "Internal server error", error: error.message });
    }
};

exports.ReturnReportByDate = async (req, res) => {
    try {
        let result = await ReturnReportService(req);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in expense report retrieval:", error);
        res.status(200).json({ status: 'failed', message: "Internal server error", error: error.message });
    }
};