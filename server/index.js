require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const { getUserActions, getNLActions } = require("../db/methods");
const {
  getDateString,
  getTotalCountsByDate,
  isIdValid,
} = require("./controllerHelpers");

const app = express();
app.use(morgan("dev"));

// ROUTES //

// Provided valid NL id, returns object with daily counts of actions against a newsletter
// Satisfies GetNLSummary requirement
app.get("/nlsummary/:nlId", isIdValid, async (req, res, next) => {
  const nlId = req.params.nlId;
  try {
    const results = await getTotalCountsByDate(nlId, getNLActions);
    if (!results) {
      throw createError(400, "No documents found for requested ID");
    }
    results.description = `Summary of daily activities for newsletter ID:${nlId}`;
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Provided valid userId, returns object with daily counts of actions taken by user
// Satisfies GetUserSummary requirement
app.get("/usersummary/:userId", isIdValid, async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const results = await getTotalCountsByDate(userId, getUserActions);
    if (!results) {
      throw createError(400, "No documents found for requested ID");
    }
    results.description = `Summary of daily activities by user ID:${userId}`;
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Provided valid NL id, returns object with daily open and click counts against a newsletter
// Satistfies GetNLActionSummary
app.get("/nlactionsummary/:nlId", isIdValid, async (req, res, next) => {
  const nlId = req.params.nlId;
  try {
    const results = { data: {} };
    const allActivities = await getNLActions(nlId);
    if (!allActivities.length) {
      throw createError(400, "No documents found for requested ID");
    }
    for (const activity of allActivities) {
      const resultsData = results.data;
      const date = getDateString(activity.activity_date);
      const { action } = activity;
      if (resultsData[date]) {
        resultsData[date][action] = ++resultsData[date][action];
      } else {
        resultsData[date] = { open: 0, click: 0 };
        resultsData[date][action] = ++resultsData[date][action];
      }
    }
    results.description = `Summary of daily 'open' and 'click' activities for newsletter ID:${nlId} by all users`;
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Invalid endpoint handler
app.use((req, res, next) => {
  next(createError(404, "Resource not found"));
});

// ERROR HANDLING //

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    status: error.status || 500,
    message: error.message,
    stack: error.stack,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
