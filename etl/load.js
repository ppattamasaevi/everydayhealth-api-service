const { parse } = require("fast-csv");
const fs = require("fs");
const { saveOne } = require("../db/methods");

const csvStream = fs.createReadStream("../data/user_nl-tracking-data.csv");
const csvParser = parse({ headers: true })
  .on("data", (row) => {
    console.log(row);
    saveOne(row);
  })
  .on("error", (error) => console.error(error.message))
  .on("end", (rowCount) => console.log(`Finished parsing ${rowCount} rows`));

csvStream.pipe(csvParser);
