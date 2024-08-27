import React, { useState } from "react";
import { ROLES } from "../Roles/Roles"; // Import the roles
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../Login/LoginModal.css";

const LoginModal = ({ showSignup }) => {
  const [mode, setMode] = useState(showSignup ? "signUp" : "login");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState(ROLES.USER); // Default role

  const titleOptions = {
    login: "LOG IN",
    signUp: "SIGN UP"
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setErrorMessage(""); // Clear error on mode change
    setEmailError("");   // Clear email error on mode change
  };

  const handleRedirectToSignup = () => {
    handleModeChange("signUp");
  };

  const handleRedirectToLogin = () => {
    handleModeChange("login");
  };

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
    } else {
      setErrorMessage("");
    }
  };

  const validateEmail = (email) => {
    const validDomains = [".com", ".net", ".org"];
    if (!validDomains.some((domain) => email.endsWith(domain))) {
      setEmailError("Please enter a valid email address ending with .com, .net, or .org");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const emailInput = event.target.elements.email.value;
    const passwordInput = event.target.elements.password.value;

    validateEmail(emailInput);
    validatePassword(passwordInput);

    if (!emailError && !errorMessage) {
      // Redirect based on role
      if (role === ROLES.ADMIN) {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
      window.alert("Logged in successfully!");
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();

    const emailInput = event.target.elements.email.value;
    const passwordInput = event.target.elements.password.value;
    const confirmPasswordInput = event.target.elements.confirmPassword?.value;

    validateEmail(emailInput);
    validatePassword(passwordInput);

    if (passwordInput !== confirmPasswordInput) {
      setErrorMessage("Passwords do not match");
    } else if (!emailError && !errorMessage) {
      navigate('/');
      window.alert("Signed up successfully!");
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    validateEmail(emailValue); // Validate in real-time
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue); // Validate in real-time
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    if (password !== confirmPasswordValue) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={mode === "login" ? handleLogin : handleSignup}>
        <div className="form-content">
          <h3 className="form-title">{titleOptions[mode]}</h3>
          {mode === "login" && (
            <div className="form-group mt-3">
              <div className="role-buttons">
              </div>
            </div>
          )}
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleEmailChange} // Real-time validation
              required
            />
            {emailError && <p className="error-message email-error">{emailError}</p>}
          </div>
          <div className="form-group mt-3 password-container">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={handleTogglePasswordVisibility}
              />
            </div>
          </div>
          {mode === "signUp" && (
            <div className="form-group mt-3 password-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="confirmPassword"
                  className="form-control mt-1"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
            </div>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-footer">
            <p className="forgot-password">
              <a href="#">Forgot password?</a>
            </p>
            {mode === "login" && (
              <p className="need-to-register" onClick={handleRedirectToSignup}>
                New member? <a href="#">Register</a>
              </p>
            )}
            {mode === "signUp" && (
              <p className="already-have-account" onClick={handleRedirectToLogin}>
                Already a member? <a href="#">Log in</a>
              </p>
            )}
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="light bg-color" type="submit">
              {mode === "login" ? "Log In" : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
