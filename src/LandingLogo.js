import { Container, Box } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

function LandingLogo() {
  return (
      <Container>
        <FitnessCenterIcon
          color="disabled"
          sx={{
            position: "absolute",
            fontSize: 750,
            top: -160,
            left: -160,
          }}
        />
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Box sx={{ fontSize: 40, mb: -8 }}>
            <h1>GOALS</h1>
          </Box>
          <Box sx={{ fontSize: 20 }}>
            <p>Track your workout progress</p>
          </Box>
        </Box>
      </Container>
  );
}

export default LandingLogo;
