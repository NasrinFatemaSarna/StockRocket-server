


const mongoose = require("mongoose");
const ReturnProductModel = require("../../models/Return/ReturnProductModel");

const ReturnReportService = async (req) => {
  try {
    let userEmail = req.headers.email;
    let formDate = req.body.formDate;
    let toDate = req.body.toDate;

    let data = await ReturnProductModel.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdDate: { $gte: new Date(formDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          total: [
            {
              $group: {
                _id: 0,
                totalAmount: { $sum: { $multiply: ["$quantity", "$unitCost"] } },
              },
            },
          ],
          data: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
              },
            },
            { $unwind: "$product" },
            {
              $lookup: {
                from: "brands",
                localField: "product.brandId",
                foreignField: "_id",
                as: "brand",
              },
            },
            { $unwind: "$brand" },
            {
              $lookup: {
                from: "categories",
                localField: "product.categoryId",
                foreignField: "_id",
                as: "category",
              },
            },
            { $unwind: "$category" },
          ],
        },
      },
    ]);

    if (data[0].total.length === 0) {
      data[0].total.push({ _id: 0, totalAmount: 0 });
    }

    return { status: "success", data: data[0] }; // Return the first element which contains 'total' and 'data'
  } catch (error) {
    return { status: "failed", data: error.message };
  }
};

module.exports = ReturnReportService;
