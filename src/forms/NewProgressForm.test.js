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

it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <NewProgressForm latestProgress={latest_progress} />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
