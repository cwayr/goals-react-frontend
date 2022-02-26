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
