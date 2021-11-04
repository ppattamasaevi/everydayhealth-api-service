const { saveOne, getUserActions, getNLActions } = require("./methods.js");

getUserActions(5).then((data) => console.log(data));

// getNLActions(102);
