import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import GoalsAPI from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import UserContext from "./context/userContext";
import AppRoutes from "./AppRoutes";
import LoadingSpinner from "./common/LoadingSpinner";

// Key name for storing token in local storage
export const TOKEN_STORAGE_ID = "goals-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /** Load user info from API.
   * Doesn't run until a user is logged in with a token.
   * Only re-runs on token change.
   */
  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            GoalsAPI.token = token;
            let currentUser = await GoalsAPI.getCurrentUser(username);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error("Error loading user info:", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** Site-wide login */
  async function login(loginData) {
    try {
      let token = await GoalsAPI.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  /** Site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Site-wide signup */
  async function signup(signupData) {
    try {
      let token = await GoalsAPI.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  }

  /** Site-wide create goal */
  async function createGoal(goalData) {
    try {
      let goal = await GoalsAPI.createGoal(goalData);
      return { success: true, goal };
    } catch (err) {
      console.error("goal creation failed", err);
      return { success: false, err };
    }
  }

  /** Site-wide create progress */
  async function createProgress(progressData) {
    try {
      let progress = await GoalsAPI.createProgress(progressData);
      return { success: true, progress };
    } catch (err) {
      console.error("progress creation failed", err);
      return { success: false, err };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <ScopedCssBaseline>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="App">
            <AppRoutes
              login={login}
              signup={signup}
              logout={logout}
              createGoal={createGoal}
              createProgress={createProgress}
            />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </ScopedCssBaseline>
  );
}

export default App;
