import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import NewGoalForm from "./NewGoalForm";

it("renders without crashing", function () {
  render(
    <UserProvider>
      <MemoryRouter>
        <NewGoalForm />
      </MemoryRouter>
    </UserProvider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <MemoryRouter>
        <NewGoalForm />
      </MemoryRouter>
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
})