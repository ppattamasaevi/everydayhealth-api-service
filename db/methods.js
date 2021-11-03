const { UserActions } = require("./index");

module.exports = {
  // save a document to collection
  saveOne: (data) => {
    const newEntry = new UserActions(data);
    newEntry.save((err) => {
      if (err) console.error(err);
    });
  },
  // returns array of all actions by a single user
  getUserActions: (userId) => {
    UserActions.find({ user_id: userId }, (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
        return results.length;
      }
    });
  },
};
