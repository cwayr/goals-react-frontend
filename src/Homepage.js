import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/userContext";
import { Container, Button } from "@mui/material";

function Homepage({ logout }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Container maxWidth="sm">
      <h1>Hello!</h1>
      <Button
        variant="contained"
        size="small"
        color="warning"
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Container>
  );
}

export default Homepage;
