import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SignupForm from "./SignupForm";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays correctly", function () {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );
  expect(getByText("Sign up for account")).toBeInTheDocument();
  expect(getByTestId("signup-form")).toBeInTheDocument();
});
