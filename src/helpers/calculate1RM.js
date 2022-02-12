/** Calculate one-rep-maximum based on inputed weight and reps.
 * Uses the Brzycki Formula.
 */

function calculate1RM(weight, reps) {
  oneRepMax = weight * (36 / (37 - reps));
  return Math.round(oneRepMax * 10) / 10;
}

export default calculate1RM;
