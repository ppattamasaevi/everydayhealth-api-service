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
  getUserActions: async (userId) => {
    try {
      const allActionsByUser = await UserActions.find({ user_id: userId }).sort(
        { activity_date: 1 }
      );
      console.log(`Found ${allActionsByUser.length} user activity docs`);
      return allActionsByUser;
    } catch (err) {
      console.error(err.message);
      return err;
    }
  },
  // returns array of all actions against a single newsletter
  getNLActions: async (nlId) => {
    try {
      const allNewsletterActions = await UserActions.find({
        newsletter_id: nlId,
      }).sort({ activity_date: 1 });
      console.log(
        `Found ${allNewsletterActions.length} newsletter activity docs`
      );
      return allNewsletterActions;
    } catch (err) {
      console.error(err.message);
      return err;
    }
  },
};
