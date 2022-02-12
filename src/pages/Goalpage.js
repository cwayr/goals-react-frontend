import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GoalsAPI from "../api/api";
import { Container, Button, Grid } from "@mui/material";
import createLineChart from "../helpers/createLineChart";
import NewProgressForm from "../forms/NewProgressForm";

function Goalpage({ createProgress }) {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {}), [];

  function deleteGoal(goal_id) {
    GoalsAPI.deleteGoal(goal_id);
    navigate("/home");
  }

  return (
    <Container maxWidth="lg">
      <Button
        variant="contained"
        color="warning"
        onClick={() => deleteGoal(location.state.id)}
        sx={{ position: "absolute", right: 0, mr: 5 }}
      >
        Delete
      </Button>
      <h1>This is the goal page</h1>
      <Grid container>
        <Grid item xs={8}>
          {createLineChart()}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <NewProgressForm
            createProgress={createProgress}
            goal_id={location.state.id}
          />
        </Grid>
        <Grid item xs={3} padding={4}>
          <h3>Progress</h3>
          <progress value="65" max="100" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Goalpage;
