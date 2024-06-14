import React, { useState } from "react";
import "../Login/LoginModal.css";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const LoginModal = ({ showSignup }) => {
  const [mode, setMode] = useState(showSignup ? "signUp" : "login");

  const titleOptions = {
    login: "LOG IN",
    signUp: "SIGN UP"
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleRedirectToSignup = () => {
    handleModeChange("signUp");
  };

  const handleRedirectToLogin = () => {
    handleModeChange("login");
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
    window.alert("Logged in successfully!");
  };

  const handleSignup = () => {
    navigate('/');
    window.alert("Signed up successfully!");
  };

  return (
    <div className="form-container">
      <form className="form">
        <div className="form-content">
          <h3 className="form-title">{titleOptions[mode]}</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          {mode === "signUp" && (
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Confirm password"
              />
            </div>
          )}
          <div className="form-footer">
            <p className="forgot-password">
              <a href="#">Forgot password?</a>
            </p>
            {mode === "login" && (
              <p className="need-to-register" onClick={handleRedirectToSignup}>
                New member?  <a href="#">register</a>
              </p>
            )}
            {mode === "signUp" && (
              <p className="already-have-account" onClick={handleRedirectToLogin}>
                Already a member? <a href="#">LogIn</a>
              </p>
            )}
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="light bg-color" type="submit" onClick={mode === "login" ? handleLogin : handleSignup}>
              {mode === "login" ? "Log In" : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
