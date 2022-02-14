/** Returns the current date and a date a user-set amount of months from the current date
 *
 * Returns { current_date, target_date }
 */

function getMonthsFromNow(monthsLater) {
  let d = new Date();
  let currentDate = d.getTime();

  d.setMonth(d.getMonth() + monthsLater);
  let targetDate = d.getTime();

  return { currentDate, targetDate };
}

export default getMonthsFromNow;
