import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./context/userContext";
import Homepage from "./Homepage";
import Goalpage from "./Goalpage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import NewGoalForm from "./forms/NewGoalForm";

function AppRoutes({ login, signup, createGoal }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Routes">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={currentUser === null ? "login" : currentUser.username}
            />
          }
        />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/:username" element={<Homepage />} />
        <Route path="/:username/:goal_id" element={<Goalpage />} />
        <Route
          path="/:username/create"
          element={<NewGoalForm createGoal={createGoal} />}
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
