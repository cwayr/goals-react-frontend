import { render } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

it("renders without crashing", function () {
  render(<LoadingSpinner />);
});
