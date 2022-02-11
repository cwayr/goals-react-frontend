import { Link } from "react-router-dom";
import { Grid, Paper, Button } from "@mui/material";

function Goal({ data }) {
  return (
    <Link to={`/${data.id}`}>
      <Paper elevation={6} sx={{ height: 100, p: 2 }}>
        <Grid container>
          <Grid item xs={12} top={0}>
            <h3>{data.name}</h3>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
}

export default Goal;
