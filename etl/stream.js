const { parse } = require("fast-csv");
const fs = require("fs");

const output = [];

const csvStream = fs.createReadStream("../data/test-data.csv");
const csvParser = parse({ headers: true })
  .on("data", (row) => {
    console.log(row);
    output.push(row);
  })
  .on("error", (error) => console.error(error.message))
  .on("end", (rowCount) =>
    console.log(`Finished parsing ${rowCount} rows: ${JSON.stringify(output)}`)
  );

csvStream.pipe(csvParser);
