import { render } from "@testing-library/react";
import { UserProvider, latest_progress } from "../testUtils";
import NewProgressForm from "./NewProgressForm";

it("renders without crashing", function () {
  render(
    <UserProvider>
      <NewProgressForm latestProgress={latest_progress} />
    </UserProvider>
  );
});

it("displays correctly", function () {
  const { getByTestId, getByText } = render(
    <UserProvider>
      <NewProgressForm latestProgress={latest_progress} />
    </UserProvider>
  );
  expect(getByText("Record workout")).toBeInTheDocument();
  expect(getByTestId("new-progress-form")).toBeInTheDocument();
});
