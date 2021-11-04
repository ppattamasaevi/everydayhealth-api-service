require("dotenv").config();
const express = require("express");
const { getUserActions, getNLActions } = require("../db/methods");
const { getTotalCountsByDate } = require("./controllerHelpers");

const app = express();

// Provided valid NL id, returns object with daily counts of actions against a newsletter
// Satisfies GetNLSummary requirement

app.get("/nlsummary/:nlId", async (req, res, next) => {
  const nlId = req.params.nlId;
  try {
    const results = await getTotalCountsByDate(nlId, getNLActions);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Provided valid userId, returns object with daily counts of actions taken by user
// Satisfies GetUserSummary requirement
app.get("/usersummary/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const results = {};
  try {
    const results = await getTotalCountsByDate(userId, getUserActions);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Provided valid NL id, returns object with daily open and click counts against a newsletter
// Satistfies GetNLActionSummary
app.get("nlactionsummary/:nlId", (req, res, next) => {
  const nlId = req.params.nlId;
  const results = {};
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
