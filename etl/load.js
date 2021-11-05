require("dotenv").config();
const { parse } = require("fast-csv");
const fs = require("fs");
const { saveOne } = require("../db/methods");

const filePath = process.env.csvFilePath || "./data/data.csv";

const csvStream = fs.createReadStream(filePath);
const csvParser = parse({ headers: true })
  .on("data", (row) => {
    saveOne(row);
  })
  .on("error", (error) => console.error(error.message))
  .on("end", (rowCount) => {
    console.log(`Finished processing ${rowCount} rows of CSV data`);
  });

csvStream.pipe(csvParser);
