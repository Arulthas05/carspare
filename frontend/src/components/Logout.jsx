import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Ensure correct path

function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Call logout function from context
    navigate("/"); // Redirect to login page after logout
  }, [logout, navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.message}>Logging out...</h2>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "'Jost', sans-serif",
    background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
    color: "#fff",
  },
  message: {
    fontSize: "1.5em",
  },
};

export default Logout;
