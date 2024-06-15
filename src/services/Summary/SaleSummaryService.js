


const SalesModel = require("../../models/sales/SalesModel");

const SalesSummary = async (req) => {
    try {
        const userEmail = req.headers.email;

        let data = await SalesModel.aggregate([
            { $match: { userEmail: userEmail } },
            {
                $facet: {
                    total: [
                        { $group: { _id: 0, totalAmount: { $sum: "$grandTotal" } } }
                    ],
                    last30days: [
                        {
                            $match: { createdDate: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } } // Filter last 30 days
                        },
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdDate" } },
                                totalAmount: { $sum: "$grandTotal" }
                            }
                        },
                        { $sort: { _id: -1 } } // Sort by date in descending order
                    ]
                }
            }
        ]);

        // If there are no purchases, ensure totalAmount is 0
        if (data[0].total.length === 0) {
            data[0].total.push({ _id: 0, totalAmount: 0 });
        }

        return { status: "success", data: data[0] };

    } catch (error) {
        return { status: "failed", data: error.message };
    }
};

module.exports = SalesSummary;