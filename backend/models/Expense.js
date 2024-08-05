const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
