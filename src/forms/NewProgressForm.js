import { useState } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Alert,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import calculate1RM from "../helpers/calculate1RM";

function NewProgressForm({
  goal_id,
  setProgressData,
  createProgress,
  startingProgress,
  setStartingProgress,
  latestProgress,
  setLatestProgress,
  setOrmPercentage,
  setDatePercentage,
  targetWeight,
  endDate,
}) {
  const initialState = {
    goal_id: goal_id,
    weight: null,
    reps: null,
    date: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState([]);
  const [date, setDate] = useState();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormErrors([]);
    setFormSuccess([]);
    formData.orm = +calculate1RM(formData.weight, formData.reps);
    formData.date = date ? Date.parse(date) : Date.now();

    let result = await createProgress(formData);

    if (result.success) {
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
          (targetWeight -
            (firstRecord ? formData.orm : startingProgress.orm))) *
          100
      );

      setDatePercentage(
        ((formData.date -
          (firstRecord ? formData.date : startingProgress.date)) /
          (+endDate - (firstRecord ? formData.date : startingProgress.date))) *
          100
      );

      setFormData(initialState);

      setFormSuccess([
        `Successfully recorded workout for ${new Date(
          formData.date
        ).toDateString()}`,
      ]);
    } else {
      setFormErrors(result.err[0]);
    }
  }

  return (
    <Container maxWidth="xl" xs={{ pt: -2 }}>
      <h3>Record workout</h3>
      <form onSubmit={handleSubmit}>
        <Grid container>
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
                defaultValue={+latestProgress.date}
                value={date}
                minDate={+latestProgress.date}
                onChange={(date) => setDate(date)}
                renderInput={(params) => <TextField {...params} />}
                xs={{ width: 1 / 1 }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2} my={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onSubmit={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={9} my={1}>
            {formErrors.length ? (
              <Alert severity="error">{formErrors}</Alert>
            ) : null}
            {formSuccess.length ? (
              <Alert severity="success">{formSuccess}</Alert>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default NewProgressForm;
