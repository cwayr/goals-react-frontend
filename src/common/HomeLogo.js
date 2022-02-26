import { Container } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

function HomeLogo() {
  return (
    <Container>
      <FitnessCenterIcon
        color="disabled"
        sx={{
          position: "absolute",
          fontSize: 750,
          bottom: -160,
          right: -160,
        }}
      />
    </Container>
  );
}

export default HomeLogo;
