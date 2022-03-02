import { render } from "@testing-library/react";
import BarChart from "./BarChart";

global.ResizeObserver = require("resize-observer-polyfill");

it("renders without crashing", function () {
  render(<BarChart />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<BarChart />);
  expect(asFragment()).toMatchSnapshot();
});
