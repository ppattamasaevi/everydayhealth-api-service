require("dotenv").config();
const express = require("express");
const { getUserActions, getNLActions } = require("../db/methods");

const app = express();

app.get("/useractions/:userId", async (req, res) => {
  const userId = req.params.userId;
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
