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
});

it("displays correctly", function () {
  const { getByTestId, getByText } = render(
    <UserProvider>
      <MemoryRouter>
        <NewGoalForm />
      </MemoryRouter>
    </UserProvider>
  );
  expect(getByText("Set a new goal 🏋️‍♀️")).toBeInTheDocument();
  expect(getByTestId("new-goal-form")).toBeInTheDocument();
});
