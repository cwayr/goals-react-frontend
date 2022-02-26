import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginForm from "./LoginForm";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});
