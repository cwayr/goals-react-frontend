import "./ProgressBar.css";
import { Grid } from "@mui/material";

function ProgressBar({ ormPercentage, lbsImproved, lbsLeft }) {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <h3>Progress</h3>
        </Grid>
        <Grid item xs={6}>
          <h4>
            Increased {lbsImproved} lbs &nbsp;&nbsp;|&nbsp;&nbsp; {lbsLeft} lbs
            to go
          </h4>
        </Grid>
        <progress id="goalpage-progress-bar" value={ormPercentage} max="100">
          {ormPercentage}
        </progress>
      </Grid>
    </>
  );
}

export default ProgressBar;
