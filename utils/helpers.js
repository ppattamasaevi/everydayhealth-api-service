// Extracts date string ('yyyy-mm-dd') from a Date object
module.exports.getDateString = (dateObj) => {
  return JSON.stringify(dateObj).slice(1, 11);
};
