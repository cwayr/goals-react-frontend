import { render } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

it("renders without crashing", function () {
  render(<ProgressBar />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<ProgressBar />);
  expect(asFragment()).toMatchSnapshot();
});

it("displays correctly", function () {
  const { getByText } = render(<ProgressBar />);
  expect(getByText("Progress")).toBeInTheDocument();
});
