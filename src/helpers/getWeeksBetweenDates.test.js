import { setUncaughtExceptionCaptureCallback } from "process";
import getWeeksBetweenDates from "./getWeeksBetweenDates";

it("works correctly", function () {
  const now = Date.now();

  let d = new Date();
  let then = d.setMonth(d.getMonth() + 6);

  let weeks = Math.floor((then - now) / 604_800_100);

  let result = getWeeksBetweenDates(6);

  expect(result).toEqual(weeks);
});
