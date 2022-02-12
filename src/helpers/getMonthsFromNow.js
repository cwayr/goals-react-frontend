/** Returns the current date and a date a user-set amount of months from the current date
 *
 * Returns { current_date, target_date }
 */

function getMonthsFromNow(monthsLater) {
  let d = new Date();
  let currentDate = d.toLocaleDateString();

  d.setMonth(d.getMonth() + monthsLater);
  let targetDate = d.toLocaleDateString();

  return { currentDate, targetDate };
}

export default getMonthsFromNow;
