import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Grid, Button, TextField, Alert } from "@mui/material";
import LandingLogo from "../common/LandingLogo";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const initialState = {
    username: undefined,
    password: undefined,
  };
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      navigate("/home");
    } else {
      setFormErrors(result.err[0]);
    }
  }

  async function handleGuestSubmit(e) {
    let result = await login({ username: "guest", password: "guest" });
    if (result.success) {
      navigate("/home");
    } else {
      setFormErrors(result.err[0]);
    }
  }

  return (
    <div className="LoginForm">
      <LandingLogo />
      <Container maxWidth="xs">
        <Box sx={{ textAlign: "center", mt: 5, mb: -2 }}>
          <h1>Log in to account</h1>
        </Box>
        <form onSubmit={handleSubmit} data-testid="login-form">
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
              data-testid="login-form-submit"
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
            <Button
              variant="text"
              size="small"
              color="primary"
              onClick={() => handleGuestSubmit()}
              sx={{ mt: 2, width: 1 / 1 }}
            >
              Log in to guest account
            </Button>
          </Grid>
        </form>
        {formErrors.length > 0 ? (
          <Alert severity="error">{formErrors}</Alert>
        ) : null}
      </Container>
      <div className="info">
        This app created by <b>Caleb Waymeyer</b>. Check out the source code{" "}
        <a
          href="https://github.com/cwaymeyer/goals-react-frontend"
          target="_blank"
        >
          here
        </a>
        .
      </div>
    </div>
  );
}

export default LoginForm;
