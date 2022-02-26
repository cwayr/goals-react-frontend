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
