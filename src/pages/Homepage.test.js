import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Homepage from "./Homepage";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays correctly", function () {
  const { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
  expect(getByText("Hello, demouser")).toBeInTheDocument();
  expect(getByText("Create new goal")).toBeInTheDocument();
});
