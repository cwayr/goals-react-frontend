import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Goalpage from "./Goalpage";
import { UserProvider } from "../testUtils";
import { createMemoryHistory } from "history";

it("renders without crashing", function () {
  const history = createMemoryHistory();
  history.push("/1");
  render(
    <UserProvider>
      <MemoryRouter history={history}>
        <Goalpage />
      </MemoryRouter>
    </UserProvider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <MemoryRouter>
        <Goalpage />
      </MemoryRouter>
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
