const express = require("express");
const router = express.Router();
const { Expense } = require("../models/model");

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({ message: "Created expnese", expense });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json({ message: "expense_List", expenses });
  } catch (error) {
    res.status(500).json({ message: "error is ", error });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "error is", error });
    }
    res.status(200).json({ message: "expense is ", expense });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return res.status(404).json({ message: "error is", error });
    }
    res.status(200).json({ message: "expense is ", expense });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteExpenseById = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json({ message: "expense deleted is", expense });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Server error", error });
  }
};
module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
};
