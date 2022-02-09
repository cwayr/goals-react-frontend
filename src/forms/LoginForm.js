import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <h1>This is the login form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" onSubmit={handleSubmit}>
          Log in
        </button>
      </form>
      <button onClick={() => navigate("/signup")}>Sign up</button>
    </div>
  );
}

export default LoginForm;
