import calculate1RM from "./calculate1RM";

it("works correctly", function () {
  let oneRepResult = calculate1RM(100, 1);
  expect(oneRepResult).toEqual(100);

  let multiRepResult = calculate1RM(50, 10);
  expect(multiRepResult).toEqual(66.7);
});
