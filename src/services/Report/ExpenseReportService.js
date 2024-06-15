


const mongoose = require("mongoose");
const ExpenseModel = require("../../models/Expenses/ExpenseModel");

const ExpenseReportService = async (req) => {
    try {
        // Extract request parameters
        let userEmail = req.headers.email;
        let formDate = req.body.formDate;
        let toDate = req.body.toDate;

        // Perform data aggregation
        let data = await ExpenseModel.aggregate([
            { 
                $match: { 
                    userEmail: userEmail, 
                    createdDate: { $gte: new Date(formDate), $lte: new Date(toDate) }
                } 
            },
            {
                $lookup: {
                    from: "expenseTypes",
                    localField: "expenseTypeId",
                    foreignField: "_id",
                    as: "type"
                }
            },
            {
                $facet: {
                    total: [{ $group: { _id: 0, totalAmount: { $sum: "$amount" } } }],
                    data: [{ $skip: 0 }]  // Return all matched documents
                }
            }
        ]);

        // Construct response
        let result = {
            status: "success",
            data: {
                total: data[0].total || [],
                data: data[0].data || []
            }
        };

        return result;
    } catch (error) {
        // Handle errors
        return { status: "failed", data: error.message };
    }
};

module.exports = ExpenseReportService;
