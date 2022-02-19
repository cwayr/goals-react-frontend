import "./Goal.css";
import { Link } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

function Goal({ data }) {
  return (
    <div className="Goal">
      <Link to={`/${data.id}`} state={{ id: data.id }}>
        <div className="paper">
          <Paper elevation={3} sx={{ height: 100, p: 2 }}>
            <Grid container>
              <Grid item xs={12} top={0}>
                <h3>{data.name}</h3>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Link>
    </div>
  );
}

export default Goal;
