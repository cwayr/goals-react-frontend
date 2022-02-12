import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { Container, Button, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoadingSpinner from "../LoadingSpinner";
import GoalList from "../GoalList";

function Homepage({ logout }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (!currentUser) return <LoadingSpinner />;

  return (
    <Container maxWidth="md">
      <Grid container>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={handleLogout}
          sx={{ position: "absolute", right: 0, mr: 5, mt: 5 }}
        >
          Log out
        </Button>
        <Grid item xs={12} fontSize={30}>
          <h1>Hello, {currentUser.username}</h1>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/create")}
          >
            Create new goal
          </Button>
        </Grid>
        <GoalList />
      </Grid>
    </Container>
  );
}

export default Homepage;