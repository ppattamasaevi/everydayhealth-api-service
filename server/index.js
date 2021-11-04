require("dotenv").config();
const express = require("express");
const { getUserActions, getNLActions } = require("../db/methods");
const { getDateString } = require("../utils/helpers");

const app = express();

// Provided valid NL id, route returns object with daily counts of actions against a newsletter
// Satisfies GetNLSummary requirement
app.get("/nlsummary/:nlId", async (req, res, next) => {
  const nlId = req.params.nlId;
  const results = {};
  try {
    const nlActions = await getNLActions(nlId);
    for (const action of nlActions) {
      const actionDate = getDateString(action.activity_date);
      results[actionDate] = ++results[actionDate] || 1;
    }
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Provided valid userId, route returns object with daily counts of actions taken by user
// Satisfies GetUserSummary requirement
app.get("/usersummary/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const results = {};
  try {
    const userActions = await getUserActions(userId);
    for (const action of userActions) {
      const actionDate = getDateString(action.activity_date);
      results[actionDate] = ++results[actionDate] || 1;
    }
    res.json(results);
  } catch (err) {
    next(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
