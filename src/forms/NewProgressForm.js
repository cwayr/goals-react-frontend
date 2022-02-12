import { useState } from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

function NewProgressForm({ createProgress, goal_id }) {
  const initialState = {
    goal_id: goal_id,
    weight: null,
    reps: null,
    date: "",
  };

  const [formData, setFormData] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    formData.date = Date.now();
    await createProgress(formData);
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
