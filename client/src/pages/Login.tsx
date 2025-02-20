import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../interfaces/UserLogin";
import LightThemeLogo from "../assets/LightThemeLogo.png";
import "../styles/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  // State variable to manage Login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });

  // State variable for error messages
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Handle changes in the input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // useNavigate function to direct users to Movies page after successful sign up
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(JSON.stringify(data));
    } catch (err) {
      console.error("Failed to login", err);
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="login-container">
      <img
        className="mb-4"
        src={LightThemeLogo}
        alt="Light theme logo"
        width="172"
        height="172"
      />
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="form-floating">
          <input
            type="text"
            name="username"
            className="form-control"
            id="floatingInput"
            placeholder="username"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        {/* Password Field */}
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
      {/* Conditionally render error message */}
      {errorMsg && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMsg}
        </div>
      )}
      <p className="mt-5 mb-3 text-body-secondary">© 2025 CineTracker, Inc</p>
      <hr />
      {/* Sign Up Page Link */}
      <h3 className="container text-center mt-5">Don't have an account?</h3>
      <div className="text-center">
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/SignUp")}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
