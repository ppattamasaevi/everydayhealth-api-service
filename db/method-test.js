const { saveOne, getUserActions, getNLActions } = require("./methods.js");

getUserActions("a").then((data) => console.log(data));

// getNLActions(102);
