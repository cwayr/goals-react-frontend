import { MemoryRouter } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays correctly", function () {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(getByText("Log in to account")).toBeInTheDocument();
  expect(getByTestId("login-form")).toBeInTheDocument();
});
