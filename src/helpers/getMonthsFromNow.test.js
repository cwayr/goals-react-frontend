import getMonthsFromNow from "./getMonthsFromNow";

it("works properly", function () {
  let d = new Date();
  let sixMonthsLater = d.setMonth(d.getMonth() + 6);

  let result = getMonthsFromNow(6);

  expect(result.targetDate).toBeCloseTo(sixMonthsLater);
});
