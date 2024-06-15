const ExpenseModel = require("../../models/Expenses/ExpenseModel.js");

const ExpenseSummary = async (req) => {
    try {
        const userEmail = req.headers.email;

        let data = await ExpenseModel.aggregate([
            { $match: { userEmail: userEmail } },
            {
                $facet: {
                    total: [
                        { $group: { _id: 0, totalAmount: { $sum: "$amount" } } }
                    ],
                    last30days: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdDate" } },
                                totalAmount: { $sum: "$amount" }
                            }
                        },
                        { $sort: { _id: -1 } }, // Sort by date in descending order
                        { $limit: 30 } // Limit to the last 30 days
                    ]
                }
            }
        ]);

        return { status: "success", data: data };
        
    } catch (error) {
        return { status: "failed", data: error.message };
    }
};

module.exports = ExpenseSummary;

