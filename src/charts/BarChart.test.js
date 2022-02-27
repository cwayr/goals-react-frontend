import { render } from "@testing-library/react";
import BarChart from "./BarChart";

it("renders without crashing", function () {
  render(<BarChart />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<BarChart />);
  expect(asFragment()).toMatchSnapshot();
});
