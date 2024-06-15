

const ExpenseService = require("../services/expenses/ExpenseModel");

exports.CreateExpense = async (req, res) => {
    try {
        const result = await ExpenseService(req);

        if (result.status === "success") {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(500).json({ status: "failed", message: "Internal server error", data: error.message });
    }
};
 exports.ExpenseList = async (req, res) => {
    try {
        const result = await ExpenseService(req);
        if (result.status === "success") {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(500).json({ status: "failed", message: "Internal server error", data: error.message });
    }
}