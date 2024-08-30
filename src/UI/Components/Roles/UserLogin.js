import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'; // Import Modal and Form from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setRole } from '../../../UI/Redux/UserSlice';
import './UserLogin.css';

const UserLogin = () => {
  const [show, setShow] = useState(true);  // Control visibility of modal
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Login and Sign Up
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

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

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Please fill out all fields");
    } else if (errorMessage || emailError) {
      return;
    } else {
      dispatch(setRole('user'));
      alert("User logged in successfully!");
      navigate('/dashboard'); // Redirect to the dashboard
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (email === "" || password === "" || confirmPassword === "") {
      setErrorMessage("Please fill out all fields");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else if (errorMessage || emailError) {
      return;
    } else {
      dispatch(setRole('user'));
      alert("User signed up successfully!");
      navigate('/dashboard'); // Redirect to the dashboard
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp); // Toggle between Sign Up and Login forms
    setErrorMessage(""); // Reset any error messages
  };

  return (
      <Modal show={show} >
        <Modal.Header>
          <Modal.Title>{isSignUp ? "Sign Up" : "User Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={isSignUp ? handleSignUp : handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword" className="password-input-container">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={handleTogglePasswordVisibility}
              />
            </Form.Group>

            {/* Show Confirm Password only if it's Sign Up */}
            {isSignUp && (
              <Form.Group controlId="formConfirmPassword" className="password-input-container">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className="password-toggle-icon"
                  onClick={handleTogglePasswordVisibility}
                />
              </Form.Group>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <Button variant="primary" type="submit" className="btn">
              {isSignUp ? "SIGN UP" : "LOGIN"}
            </Button>
          </Form>

          {/* Toggle between Login and Sign Up */}
          <p className="toggle-link" onClick={toggleSignUp}>
            {isSignUp ? "Already a user? Login" : "New user? Sign Up"}
          </p>
        </Modal.Body>
      </Modal>
  );
};

export default UserLogin;


// // src/components/UserLogin.js
// import React, { useState } from "react";
// import { Button, Modal, Form } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { setAdmin, setUser } from '../../Redux/UserSlice';
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//   const [role, setRole] = useState(''); // Track whether the user is admin or user
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = (event) => {
//     event.preventDefault();

//     if (role === 'admin') {
//       dispatch(setAdmin());
//     } else {
//       dispatch(setUser());
//     }
//     navigate('/');
//     window.alert(`${role} logged in successfully!`);
//   };

//   return (
//     <Modal show={true}>
//       <Modal.Header>
//         <Modal.Title>User Login</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleLogin}>
//           {/* Role Selection */}
//           <Form.Group>
//             <Form.Label>Select Role</Form.Label>
//             <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="">Choose...</option>
//               <option value="admin">Admin</option>
//               <option value="user">User</option>
//             </Form.Control>
//           </Form.Group>

//           <Button variant="primary" type="submit">Login</Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UserLogin;

