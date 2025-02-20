import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
import { signUp } from "../api/authAPI";
import { UserSignUp } from "../interfaces/UserSignUp";
import LightThemeLogo from "../assets/LightThemeLogo.png";

const SignUp = () => {
  // State variable to manage Sign Up form data
  const [signUpData, setSignUpData] = useState<UserSignUp>({
    username: "",
    email: "",
    password: "",
  });

  // State variable for error messages
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // useNavigate function to direct users to Movies page after successful sign up
  const navigate = useNavigate();

  // Handle form submission for singup
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signUp(signUpData);
      Auth.login(data.token);
      navigate("/Movies");
    } catch (err) {
      console.error("Failed to sign up", err);
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="form-container">
      <img
        className="mb-4"
        src={LightThemeLogo}
        alt="Light theme logo"
        width="172"
        height="172"
      />
      <form className="form sign-up-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* Username Field */}
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={signUpData.username || ""}
            onChange={handleChange}
          />
        </div>
        {/* Email Field */}
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-input"
            type="text"
            name="email"
            value={signUpData.email || ""}
            onChange={handleChange}
          />
        </div>
        {/* Password Field */}
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={signUpData.password || ""}
            onChange={handleChange}
          />
        </div>
        {/* Submit button */}
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      {/* Conditionally render error message */}
      {errorMsg && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default SignUp;
