
const mongoose = require("mongoose");
const ExpenseModel = require("../../models/Expenses/ExpenseModel");

const createExpense = async (req) => {
    try {
        // Extract data from the request
        const { expenseTypeId, amount, description } = req.body;
        const userEmail = req.headers.email; // Assuming user email is passed in the headers

        // Validate required fields
        if (!expenseTypeId || !amount || !description || !userEmail) {
            return { status: "failed", data: "All fields are required." };
        }

        // Convert expenseTypeId to ObjectId using the 'new' keyword
        const expenseTypeObjectId = new mongoose.Types.ObjectId(expenseTypeId);

        // Create a new expense document
        const newExpense = new ExpenseModel({
            expenseTypeId: expenseTypeObjectId,
            amount,
            description,
            userEmail
        });

        // Save the expense to the database
        const savedExpense = await newExpense.save();

        return { status: "success", data: savedExpense };
    } catch (error) {
        // Handle any errors
        console.error("Error saving expense:", error);
        return { status: "failed", data: error.message };
    }
};

module.exports = createExpense;
