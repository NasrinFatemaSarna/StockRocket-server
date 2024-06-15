
const mongoose = require("mongoose");
const SalesProductModel = require("../../models/sales/SalesProductModel");

const SalesReportService = async (req) => {
  try {
    let userEmail = req.headers.email;
    let formDate = req.body.formDate;
    let toDate = req.body.toDate;

    let data = await SalesProductModel.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdDate: { $gte: new Date(formDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          total: [{ $group: { _id: null, totalAmount: { $sum: "$total" } } }],
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
            { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: "categories",
                localField: "product.categoryId",
                foreignField: "_id",
                as: "category",
              },
            },
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
          ],
        },
      },
    ]);

    let totalAmount = data[0].total.length > 0 ? data[0].total[0].totalAmount : 0;

    return {
      status: "success",
      data: {
        total: totalAmount,
        data: data[0].data,
      },
    };
  } catch (error) {
    return { status: "failed", data: error.message };
  }
};

module.exports = SalesReportService;
