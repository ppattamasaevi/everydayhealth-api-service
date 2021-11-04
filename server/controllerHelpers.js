// Extracts date string ('yyyy-mm-dd') from a Date object
const getDateString = (dateObj) => {
  return JSON.stringify(dateObj).slice(1, 11);
};

// Async-fetches all daily activities based on provided user/NL id, and returns date-formatted results object
const getTotalCountsByDate = async (id, callback) => {
  const results = {};
  const actions = await callback(id);
  for (const action of actions) {
    const actionDate = getDateString(action.activity_date);
    results[actionDate] = ++results[actionDate] || 1;
  }
  return results;
};

module.exports = { getDateString, getTotalCountsByDate };
