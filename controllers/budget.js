const express = require("express");
const router = express.Router();
const { Budget } = require("../models/model");

// Create a new budget
const createBudget = async (req, res) => {
  try {
    const budget = await Budget.create(req.body);
    console.log("budget", budget);
    res.status(201).send(budget);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all budgets
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).send(budgets);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a budget by ID
const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).send();
    }
    res.status(200).send(budget);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a budget by ID
const updateBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!budget) {
      return res.status(404).send();
    }
    res.status(200).send(budget);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a budget by ID
const deleteBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) {
      return res.status(404).send();
    }
    res.status(200).send(budget);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById,
};
