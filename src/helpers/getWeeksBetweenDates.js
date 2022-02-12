/** Returns the number of weeks between two dates */

function getWeeksBetweenDates(monthsLater) {
  const now = Date.now();

  const d = new Date();
  const then = d.setMonth(d.getMonth() + monthsLater);

  let millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  let weeks = Math.floor((then - now) / millisecondsPerWeek);

  return weeks;
}

export default getWeeksBetweenDates;
