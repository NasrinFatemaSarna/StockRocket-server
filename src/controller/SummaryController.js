

const PurchaseSummaryService = require("../services/Summary/PurchaseSummaryService");
const ReturnSummaryService = require("../services/Summary/ReturnSummaryService");
const SalesSummaryService = require("../services/Summary/SaleSummaryService");
const ExpenseSummaryService = require('../services/Summary/ExpenseSummaryService');


exports.ExpenseSummary = async (req,res) => {
   let result = await ExpenseSummaryService(req);
   res.status(200).json(result);
}
exports.PurchaseSummary = async (req,res) => {
    let result = await PurchaseSummaryService(req);
    res.status(200).json(result);
 }
 exports.SalesSummary = async (req,res) => {
    let result = await SalesSummaryService(req);
    res.status(200).json(result);
 }
 exports.ReturnSummary = async (req,res) => {
    let result = await ReturnSummaryService(req);
    res.status(200).json(result);
 }