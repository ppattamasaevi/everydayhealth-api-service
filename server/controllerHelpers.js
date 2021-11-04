// Extracts date string ('yyyy-mm-dd') from a Date object
const getDateString = (dateObj) => {
  return JSON.stringify(dateObj).slice(1, 11);
};

// Async-fetches all daily activities based on provided user/NL id, and returns date-formatted results object
const getTotalCountsByDate = async (id, callback) => {
  const results = { data: {} };
  const actions = await callback(id);
  if (!actions.length) return null;
  for (const action of actions) {
    const actionDate = getDateString(action.activity_date);
    results.data[actionDate] = ++results.data[actionDate] || 1;
  }
  return results;
};

const isIdValid = (req, res, next) => {
  const id = req.params.nlId || req.params.userId;
  if (Number.isNaN(Number(id))) {
    res.status(400).json("400: Queried ID must be a number.");
  }
  next();
};

module.exports = { getDateString, getTotalCountsByDate, isIdValid };
