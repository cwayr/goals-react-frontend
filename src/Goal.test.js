import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider, goal } from "./testUtils";
import Goal from "./Goal";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Goal data={goal} />
      </UserProvider>
    </MemoryRouter>
  );
});
