import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GoalsAPI from "../api/api";
import { Container, Button, Grid } from "@mui/material";
import ProgressContext from "../context/progressContext";
import LineChart from "../LineChart";
import BarChart from "../BarChart";
import NewProgressForm from "../forms/NewProgressForm";
import LoadingSpinner from "../LoadingSpinner";

function Goalpage({ createProgress }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [goal, setGoal] = useState(null);
  const [progressData, setProgressData] = useState([]); // progress data used to populate LineChart

  const initialState = {
    date: 0,
    orm: 0,
  };

  const [startingProgress, setStartingProgress] = useState(initialState); // first progress recorded
  const [latestProgress, setLatestProgress] = useState(initialState); // most recent progress recorded
  const [ormPercentage, setOrmPercentage] = useState(0); // percentage of goal reached
  const [datePercentage, setDatePercentage] = useState(0); // percentage of time passed

  console.log("ORM PERCENTAGE", ormPercentage);
  console.log("DATE PERCENTAGE", datePercentage);
  console.log("g", goal);
  console.log("sp", startingProgress);
  console.log("lp", latestProgress);

  /** Load goal data from API */
  useEffect(
    function loadGoal() {
      async function getGoal() {
        try {
          const goalData = await GoalsAPI.getGoal(location.state.id);
          setGoal(goalData);
        } catch (err) {
          console.error("Error loading goal:", err);
          setGoal(null);
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getGoal();
    },
    [location.state.id]
  );

  /** Set starting and latest progress data once goal is loaded */
  useEffect(
    function setStartingandLatestProgress() {
      if (goal) {
        try {
          setStartingProgress({
            date: +goal.starting_progress.date,
            orm: +goal.starting_progress.orm,
          });

          setLatestProgress({
            date: +goal.latest_progress.date,
            orm: +goal.latest_progress.orm,
          });

          setOrmPercentage(
            ((+goal.latest_progress.orm - +goal.starting_progress.orm) /
              (goal.target_weight - +goal.starting_progress.orm)) *
              100
          );

          setDatePercentage(
            ((+goal.latest_progress.date - +goal.starting_progress.date) /
              (+goal.end_date - +goal.starting_progress.date)) *
              100
          );
        } catch (err) {
          console.error("Error setting starting and latest progress", err);
        }
      }
    },
    [goal]
  );

  function deleteGoal(goal_id) {
    GoalsAPI.deleteGoal(goal_id);
    navigate("/home");
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <ProgressContext.Provider
      value={{
        progressData,
        setProgressData,
        startingProgress,
        setStartingProgress,
        latestProgress,
        setLatestProgress,
      }}
    >
      <Container maxWidth="lg">
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
          <Grid item xs={4} height={1 / 1}>
            <BarChart
              ormPercentage={ormPercentage}
              datePercentage={datePercentage}
            />
          </Grid>
          <Grid item xs={6}>
            <NewProgressForm
              goal_id={location.state.id}
              createProgress={createProgress}
              setOrmPercentage={setOrmPercentage}
              setDatePercentage={setDatePercentage}
              targetWeight={goal.target_weight}
              endDate={goal.end_date}
            />
          </Grid>
          <Grid item xs={3} padding={4}>
            <h3>Progress</h3>
            <progress value="65" max="100" />
          </Grid>
        </Grid>
      </Container>
    </ProgressContext.Provider>
  );
}

export default Goalpage;
