import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Grid, Button, TextField } from "@mui/material";
import LandingLogo from "../LandingLogo";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    console.log(formData);
    e.preventDefault();
    await login(formData);
    navigate("/home");
  }

  return (
    <div className="LoginForm">
      <LandingLogo />
      <Container maxWidth="xs">
        <Box sx={{ textAlign: "center", mt: 5, mb: -2 }}>
          <h1>Log in to account</h1>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container p={3}>
            <Grid item xs={12} my={1}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                sx={{ width: 1 / 1 }}
              />
            </Grid>
            <Grid item xs={12} my={1}>
              <TextField
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ width: 1 / 1 }}
              />
            </Grid>
            <Box></Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              onSubmit={handleSubmit}
              sx={{ mt: 2, width: 1 / 1 }}
            >
              Log in
            </Button>
            <Button
              variant="text"
              size="small"
              color="secondary"
              onClick={() => navigate("/signup")}
              sx={{ mt: 2, width: 1 / 1 }}
            >
              Sign up for new account
            </Button>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default LoginForm;
