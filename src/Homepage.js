import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/userContext";

function Homepage({ logout }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="Homepage">
      <h1>This is the home page</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Homepage;
