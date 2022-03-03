import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./context/userContext";
import Homepage from "./pages/Homepage";
import Goalpage from "./pages/Goalpage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import NewGoalForm from "./forms/NewGoalForm";

function AppRoutes({ login, signup, logout, createGoal, createProgress }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Routes">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={currentUser === null ? "login" : "home"} />}
        />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/home" element={<Homepage logout={logout} />} />
        <Route
          path="/:goal_id"
          element={<Goalpage createProgress={createProgress} />}
        />
        <Route
          path="/create"
          element={<NewGoalForm createGoal={createGoal} />}
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
