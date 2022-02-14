import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GoalsAPI from "../api/api";
import { Container, Button, Grid } from "@mui/material";
import LineChart from "../LineChart";
import NewProgressForm from "../forms/NewProgressForm";
import LoadingSpinner from "../LoadingSpinner";

function Goalpage({ createProgress }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [goal, setGoal] = useState(null);

  /** Load goal data from API */
  useEffect(function loadGoal() {
    async function getGoal() {
      try {
        console.log(location.state.id);
        const goalData = await GoalsAPI.getGoal(location.state.id);
        console.log("d", goalData);
        setGoal(goalData);
      } catch (err) {
        console.error("Error loading goal:", err);
        setGoal(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getGoal();
  }, []);

  function deleteGoal(goal_id) {
    GoalsAPI.deleteGoal(goal_id);
    navigate("/home");
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg">
      {console.log("goal", goal)}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/home")}
        sx={{ position: "absolute", right: 100, mr: 5 }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => deleteGoal(location.state.id)}
        sx={{ position: "absolute", right: 0, mr: 5 }}
      >
        Delete
      </Button>
      <h1>{goal.name}</h1>
      <Grid container>
        <Grid item xs={8}>
          <LineChart goalData={goal} />
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
