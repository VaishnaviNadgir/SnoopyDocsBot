// import React, { useState } from "react";
// import { Button, Modal, Form } from 'react-bootstrap'; // Import Modal and Form from react-bootstrap
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from "react-router-dom";
// import '../Roles/AdminLogin.css'

// const AdminLogin = () => {
//   const [show, setShow] = useState(true);  // Control visibility of modal
//   const [errorMessage, setErrorMessage] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const navigate = useNavigate();

//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       setErrorMessage("Password must be at least 8 characters long");
//     } else {
//       setErrorMessage("");
//     }
//   };

//   const validateEmail = (email) => {
//     const validDomains = [".com", ".net", ".org"];
//     if (!validDomains.some((domain) => email.endsWith(domain))) {
//       setEmailError("Please enter a valid email address ending with .com, .net, or .org");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handleEmailChange = (e) => {
//     const emailValue = e.target.value;
//     setEmail(emailValue);
//     validateEmail(emailValue); // Validate in real-time
//   };

//   const handlePasswordChange = (e) => {
//     const passwordValue = e.target.value;
//     setPassword(passwordValue);
//     validatePassword(passwordValue); // Validate in real-time
//   };

//   const handleTogglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();
//     if (email === "" || password === "") {
//       setErrorMessage("Please fill out all fields");
//     } else if (errorMessage || emailError) {
//       // If there are validation errors, do not proceed
//       return;
//     } else {
//       // Proceed with successful login
//       alert("Admin logged in successfully!");
//       navigate('/dashboard'); // Redirect to the dashboard
//     }
//   };

//   return (
//       <Modal show={show} >
//         <Modal.Header>
//           <Modal.Title>Admin Login</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleLogin}>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 required
//               />
//               {emailError && <p className="error-message">{emailError}</p>}
//             </Form.Group>

//             <Form.Group controlId="formPassword" className="password-input-container">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 required
//               />
//               <FontAwesomeIcon
//                 icon={passwordVisible ? faEyeSlash : faEye}
//                 className="password-toggle-icon"
//                 onClick={handleTogglePasswordVisibility}
//               />
//             </Form.Group>

//             {errorMessage && <p className="error-message">{errorMessage}</p>}

//             <Button variant="primary" type="submit" className="btn">
//               LOGIN
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//   );
// };


// export default AdminLogin;


// src/Roles/AdminLogin.js
import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setRole } from '../../../UI/Redux/UserSlice'; // Import the action
import '../Roles/AdminLogin.css';

const AdminLogin = () => {
  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    validateEmail(emailValue);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
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
      // Dispatch the role to the Redux store
      dispatch(setRole('admin'));
      alert("Admin logged in successfully!");
      navigate('/dashboard');
    }
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Admin Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <Button variant="primary" type="submit" className="btn">
            LOGIN
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AdminLogin;
