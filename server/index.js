require("dotenv").config();
const express = require("express");
const { getUserActions, getNLActions } = require("../db/methods");

const app = express();

app.get("/useractions/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const results = {};
  try {
    const userActions = await getUserActions(userId);
    for (const action of userActions) {
      const actionDate = JSON.stringify(action.activity_date).slice(1, 11);
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
