import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const initialState = {
    full_name: "",
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
    await signup(formData);
    navigate("/home");
  }

  return (
    <div className="Signup Form">
      <h1>This is the signup form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
          Sign up
        </button>
      </form>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default SignupForm;
