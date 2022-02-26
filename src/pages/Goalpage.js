import "./Goalpage.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GoalsAPI from "../api/api";
import { Container, Button, Grid, Paper } from "@mui/material";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";
import ProgressBar from "../charts/ProgressBar";
import NewProgressForm from "../forms/NewProgressForm";
import LoadingSpinner from "../common/LoadingSpinner";

function Goalpage({ createProgress }) {
  const navigate = useNavigate();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [goal, setGoal] = useState(null);
  const [progressData, setProgressData] = useState([]); // progress data used to populate LineChart

  console.log(goal);
  const initialState = {
    date: 0,
    orm: 0,
  };

  const [startingProgress, setStartingProgress] = useState(initialState); // first progress recorded
  const [latestProgress, setLatestProgress] = useState(initialState); // most recent progress recorded
  const [ormPercentage, setOrmPercentage] = useState(0); // percentage of goal reached
  const [datePercentage, setDatePercentage] = useState(0); // percentage of time passed

  const { goal_id } = useParams();

  /** Load goal data from API */
  useEffect(
    function loadGoal() {
      async function getGoal() {
        try {
          const goalData = await GoalsAPI.getGoal(goal_id);
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
    [goal_id]
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
    <div className="Goalpage">
      <Container maxWidth="xl">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/home")}
          sx={{ position: "absolute", right: 100, mr: 4 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => deleteGoal(goal_id)}
          sx={{ position: "absolute", right: 0, mr: 4 }}
        >
          Delete
        </Button>
        <h1>{goal.name}</h1>
        <Grid container>
          <Grid item xs={7} p={2} mt={-2}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <LineChart
                goalData={goal}
                progressData={progressData}
                setProgressData={setProgressData}
              />
            </Paper>
            <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
              <NewProgressForm
                goal_id={goal_id}
                setProgressData={setProgressData}
                createProgress={createProgress}
                startingProgress={startingProgress}
                setStartingProgress={setStartingProgress}
                latestProgress={latestProgress}
                setLatestProgress={setLatestProgress}
                setOrmPercentage={setOrmPercentage}
                setDatePercentage={setDatePercentage}
                targetWeight={goal.target_weight}
                endDate={goal.end_date}
              />
            </Paper>
          </Grid>
          <Grid item xs={5} p={2} mt={-2}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <BarChart
                ormPercentage={ormPercentage}
                datePercentage={datePercentage}
              />
            </Paper>
            <Grid container>
              <Grid item xs={6}>
                <Paper elevation={2} sx={{ p: 4, mt: 4, mr: 2 }}>
                  <div className="orm-display">
                    <h1
                      className={
                        latestProgress.orm >= goal.target_weight
                          ? "green"
                          : null
                      }
                    >
                      {Math.round(latestProgress.orm)}
                    </h1>
                    <p>Current 1RM</p>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={2} sx={{ p: 4, mt: 4, ml: 2 }}>
                  <div className="orm-display">
                    <h1>{goal.target_weight}</h1>
                    <p>Target 1RM</p>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Paper elevation={2} sx={{ p: 4, pt: 2, mt: 4 }}>
              <ProgressBar
                ormPercentage={ormPercentage}
                lbsImproved={Math.round(
                  latestProgress.orm - startingProgress.orm
                )}
                lbsLeft={Math.round(goal.target_weight - latestProgress.orm)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Goalpage;
