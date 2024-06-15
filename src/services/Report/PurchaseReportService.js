
const mongoose = require("mongoose");
const PurchaseProductModel = require("../../models/purchase/PurchaseProductModel");
const PurchaseReportService = async (req) => {
  try {
    let userEmail = req.headers.email;
    let formDate = req.body.formDate;
    let toDate = req.body.toDate;

    let data = await PurchaseProductModel.aggregate([
      {$match: {userEmail: userEmail,createdDate: { $gte: new Date(formDate), $lte: new Date(toDate),},},},
      {
        $facet: {
          total: [{ $group: { _id: 0, totalAmount: { $sum: "$total" } } }],
          data: [ {$lookup: {from: "products",localField: "productId", foreignField: "_id", as: "product",},},
            {$unwind: "$product"},
            {$lookup: {from: "brands", localField: "product.brandId",foreignField: "_id", as: "brand",},},
            {$unwind: "$brand"},
            {$lookup: {from: "categories",localField: "product.categoryId",foreignField: "_id", as: "category", }, },
            {$unwind: "$category"},
          ],
        },},
]);

    return {status: "success",data: data[0],}; // Ensure to return the first element which contains 'total' and 'data'
  } catch (error) {
    return {status: "failed",data: error.message,};
  }
};

module.exports = PurchaseReportService;


