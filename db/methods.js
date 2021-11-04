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
        console.log(
          `Retrieved ${results.length} user actions summary documents`
        );
        return results;
      }
    });
  },
  // returns array of all actions against a single newsletter
  getNLActions: (nlId) => {
    UserActions.find({ newsletter_id: nlId }, (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `Retrieved ${results.length} newsletter actions summary documents`
        );
        return results;
      }
    });
  },
};
