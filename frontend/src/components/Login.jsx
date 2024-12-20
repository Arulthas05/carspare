// Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext"; // Ensure correct path
import "./Login.css"

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);  // Access the login function
  const navigate = useNavigate();

  // Handle input changes for login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle input changes for registration
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  // SweetAlert for success
  const showSuccessAlert = (message) => {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  // SweetAlert for error
  const showErrorAlert = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  // Submit login form
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        showSuccessAlert("Login successful!");
        login(result.user.username, result.user.id);  // Pass username from result to login function
        // Redirect based on role
        if (result.user.email === "admin123@gmail.com") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        showErrorAlert(result.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      showErrorAlert("Error during login");
    }
  };

  // Submit registration form
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();
      if (response.ok) {
        showSuccessAlert("Registration successful!");
      } else {
        showErrorAlert(result.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      showErrorAlert("Error during registration");
    }
  };

  return (
    <div className="body">
      <style>{`
        /* Your existing styles */
.main {
	width: 350px;
	height: 500px;
	background: red;
	overflow: hidden;
	background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/cover;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
  }

  #chk {
	display: none;
  }

  .signup {
	position: relative;
	width: 100%;
	height: 100%;
  }

  label {
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 50px;
	font-weight: bold;
	cursor: pointer;
	transition: 0.5s ease-in-out;
  }

  input {
	width: 60%;
	height: 10px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 12px;
	border: none;
	outline: none;
	border-radius: 5px;
  }

  button {
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #573b8a;
	font-size: 1em;
	font-weight: bold;
	margin-top: 30px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: 0.2s ease-in;
	cursor: pointer;
  }

  button:hover {
	background: #6d44b8;
  }

  .login {
	height: 460px;
	background: #eee;
	border-radius: 60% / 10%;
	transform: translateY(-180px);
	transition: 0.8s ease-in-out;
  }

  .login label {
	color: #573b8a;
	transform: scale(0.6);
  }

  #chk:checked ~ .login {
	transform: translateY(-500px);
  }

  #chk:checked ~ .login label {
	transform: scale(1);
  }

  #chk:checked ~ .signup label {
	transform: scale(0.6);
  }
        
          
      `}</style>

      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="username"
              placeholder="User name"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
