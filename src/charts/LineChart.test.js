import { render } from "@testing-library/react";
import { goal } from "../testUtils";
import LineChart from "./LineChart";

it("renders without crashing", function () {
  const setProgressData = jest.fn();
  render(<LineChart goalData={goal} setProgressData={setProgressData} />);
});
