import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createMemoryHistory } from "history";
import AppRoutes from "./AppRoutes";
import { UserProvider } from "./testUtils";

it("renders without crashing", function () {
  const history = createMemoryHistory();
  history.push("/");
  render(
    <MemoryRouter history={history}>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </MemoryRouter>
  );
});
