/** Returns the number of weeks between two dates */

const MILLISECONDS_PER_WEEK = 604_800_100;

function getWeeksBetweenDates(monthsLater) {
  const now = Date.now();

  const d = new Date();
  const then = d.setMonth(d.getMonth() + monthsLater);

  let weeks = Math.floor((then - now) / MILLISECONDS_PER_WEEK);

  return weeks;
}

export default getWeeksBetweenDates;
