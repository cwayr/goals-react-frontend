import "./NewGoalForm.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import getMonthsFromNow from "../helpers/getMonthsFromNow";
import getWeeksBetweenDates from "../helpers/getWeeksBetweenDates";
import {
  Container,
  Box,
  Grid,
  Button,
  FormControl,
  Select,
  InputLabel,
  TextField,
  InputAdornment,
  MenuItem,
  Alert,
} from "@mui/material";

function NewGoalForm({ createGoal }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const initialState = {
    name: undefined,
    target_weight: undefined,
    timeline: undefined,
  };
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);

  /** Generate goal data from form data
   *
   * Returns { name, username, start_weight, target_weight, timeline, start_date, end_date }
   */
  function setGoalData(data) {
    let goalData = {};

    goalData.name = data.name;
    goalData.username = currentUser.username;
    goalData.start_weight = null;
    goalData.target_weight = data.target_weight;

    let { currentDate, targetDate } = getMonthsFromNow(data.timeline);
    goalData.timeline = getWeeksBetweenDates(data.timeline);
    goalData.start_date = currentDate;
    goalData.end_date = targetDate;

    return goalData;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let goalData = setGoalData(formData);
    let result = await createGoal(goalData);
    if (result.success) {
      navigate("/home");
    } else {
      setFormErrors(result.err[0]);
    }
  }

  return (
    <div className="NewGoalForm">
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mt: 5, mb: -2 }}>
          <h1>Set a new goal 🏋️‍♀️</h1>
        </Box>
        <form onSubmit={handleSubmit} data-testid="new-goal-form">
          <Grid container p={3}>
            <Grid item xs={12} my={1}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ width: 1 / 1 }}
              />
            </Grid>
            <Grid item xs={6} my={1} pr={1}>
              <TextField
                label="Target weight"
                name="target_weight"
                value={formData.target_weight}
                onChange={handleChange}
                sx={{ width: 1 / 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">lb</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} my={1} pl={1}>
              <FormControl fullWidth>
                <InputLabel id="timeline-btn">Timeline</InputLabel>
                <Select
                  labelId="timeline-btn-label"
                  name="timeline"
                  label="Timeline"
                  onChange={handleChange}
                  id="timeline-btn"
                  sx={{ width: 1 / 1 }}
                  size="large"
                >
                  <MenuItem value={3}>3 months</MenuItem>
                  <MenuItem value={6}>6 months</MenuItem>
                  <MenuItem value={9}>9 months</MenuItem>
                  <MenuItem value={12}>1 year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              Create goal
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/home")}
              sx={{ mt: 2, ml: 2 }}
            >
              Back
            </Button>
          </Grid>
        </form>
        {formErrors.length > 0 ? (
          <Alert severity="error">{formErrors}</Alert>
        ) : null}
      </Container>
    </div>
  );
}

export default NewGoalForm;
