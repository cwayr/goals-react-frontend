/** Returns the current date and a date a user-set amount of months from the current date
 *
 * Returns { current_date, target_date }
 */

function getMonthsFromNow(monthsLater, now = new Date()) {
  let d = new Date();

  let current_date = d.toLocaleDateString();

  d.setMonth(d.getMonth() + monthsLater);
  let target_date = d.toLocaleDateString();

  return { current_date, target_date };
}

export default getMonthsFromNow;
