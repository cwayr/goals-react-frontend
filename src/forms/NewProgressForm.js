import { useState, useContext } from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ProgressContext from "../context/progressContext";
import calculate1RM from "../helpers/calculate1RM";

function NewProgressForm({
  goal_id,
  createProgress,
  setOrmPercentage,
  setDatePercentage,
  targetWeight,
  endDate,
}) {
  const {
    setProgressData,
    startingProgress,
    setStartingProgress,
    latestProgress,
    setLatestProgress,
  } = useContext(ProgressContext);
  const initialState = {
    goal_id: goal_id,
    weight: 0,
    reps: 0,
    date: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [date, setDate] = useState();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    formData.orm = +calculate1RM(formData.weight, formData.reps);
    formData.date = date ? Date.parse(date) : Date.now();

    setProgressData((progressData) => [
      ...progressData,
      { x: formData.date, y: formData.orm },
    ]);

    // if this is the first recorded workout, use form data to set starting progress
    // form data also must then be used for the following percentage calculations
    const firstRecord = startingProgress.date === 0;

    if (firstRecord) {
      setStartingProgress({
        date: formData.date,
        orm: formData.orm,
      });
    }

    setLatestProgress({
      date: formData.date,
      orm: formData.orm,
    });

    setOrmPercentage(
      ((formData.orm - (firstRecord ? formData.orm : startingProgress.orm)) /
        (targetWeight - (firstRecord ? formData.orm : startingProgress.orm))) *
        100
    );

    setDatePercentage(
      ((formData.date - (firstRecord ? formData.date : startingProgress.date)) /
        (+endDate - (firstRecord ? formData.date : startingProgress.date))) *
        100
    );

    await createProgress(formData);
    setFormData(initialState);
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 3, mt: 6, mb: -4 }}>
        <h3>Record workout 🏋️‍♀️</h3>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container p={3}>
          <Grid item xs={4} my={1} pr={1}>
            <TextField
              label="Weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              sx={{ width: 1 / 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">lb</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={4} my={1} px={0.5}>
            <TextField
              label="Reps"
              name="reps"
              type="number"
              value={formData.reps}
              onChange={handleChange}
              sx={{ width: 1 / 1 }}
            />
          </Grid>
          <Grid item xs={4} my={1} pl={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                name="date"
                value={date}
                minDate={+latestProgress.date}
                onChange={(date) => setDate(date)}
                renderInput={(params) => <TextField {...params} />}
                xs={{ width: 1 / 1 }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} my={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onSubmit={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default NewProgressForm;
