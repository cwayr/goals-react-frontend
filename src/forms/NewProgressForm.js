import { useState, useContext } from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import ProgressContext from "../context/progressContext";
import calculate1RM from "../helpers/calculate1RM";

function NewProgressForm({ createProgress, goal_id }) {
  const { setProgressData } = useContext(ProgressContext);
  const initialState = {
    goal_id: goal_id,
    weight: 0,
    reps: 0,
    date: "",
  };

  const [formData, setFormData] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    formData.orm = +calculate1RM(formData.weight, formData.reps);
    formData.date = Date.now();
    setProgressData((progressData) => [
      ...progressData,
      { x: formData.date, y: formData.orm },
    ]);
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
          <Grid item xs={6} my={1} pr={1}>
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
          <Grid item xs={6} my={1} pl={1}>
            <TextField
              label="Reps"
              name="reps"
              type="number"
              value={formData.reps}
              onChange={handleChange}
              sx={{ width: 1 / 1 }}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Container>
  );
}

export default NewProgressForm;
