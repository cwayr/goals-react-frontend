import UserContext from "./context/userContext";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const progress = [
  {
    id: 10,
    goal_id: 1,
    weight: 50,
    reps: 5,
    orm: "56.3",
    date: "1645477469350",
  },
  {
    id: 11,
    goal_id: 1,
    weight: 50,
    reps: 6,
    orm: "58.1",
    date: "1645477669350",
  },
];

const starting_progress = {
  orm: "56.3",
  date: "1645477269350",
};

const latest_progress = {
  orm: "58.1",
  date: "1645477669350",
};

const goal = {
  id: "1",
  name: "Test Goal",
  username: "demoUser",
  start_weight: null,
  target_weight: 100,
  timeline: 3,
  start_date: "1645477269350",
  end_date: "1653163269350",
  progress: progress,
  starting_progress: starting_progress,
  latest_progress: latest_progress,
};

const demoUser = {
  username: "demoUser",
  password: "password",
  goals: [goal],
};

const UserProvider = ({ children, currentUser = demoUser }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

export {
  UserProvider,
  renderWithRouter,
  goal,
  starting_progress,
  latest_progress,
};
