import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

function Dashboard() {
  const [carParts, setCarParts] = useState([]);
  const navigate = useNavigate();

  // Fetch car parts data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/carparts")
      .then((response) => {
        setCarParts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the car parts!", error);
      });
  }, []);

  // Handle edit button click
  const handleEdit = (part) => {
    // Show SweetAlert confirmation before navigating to edit
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to edit this car part?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/manage", { state: { carPart: part } });
      }
    });
  };

  const handleDelete = (id) => {
    // Show SweetAlert confirmation before deleting
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/carpart/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", "The car part has been deleted.", "success");
            window.location.reload(); // Refresh the page after deletion
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "There was an error deleting the car part.", "error");
          });
      }
    });
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>About</Link>
          </li>
          <li>
            <Link to={"/manage"}>Manage</Link>
          </li>
          <li>
            <Link to={"/services"}>Services</Link>
          </li>
          <li>
            <Link to={"/"}>Contact</Link>
          </li>
        </ul>
      </aside>
      <div className="main-content">
        <header className="header">
          <h1>Welcome to Your Dashboard</h1>
        </header>
        <div className="content">
          <table className="car-parts-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carParts.map((part) => (
                <tr key={part.id}>
                  <td>{part.id}</td>
                  <td>{part.name}</td>
                  <td>{part.brand}</td>
                  <td>{part.model}</td>
                  <td>{part.year}</td>
                  <td>{part.price}</td>
                  <td>{part.stock}</td>
                  <td>
                    <img src={part.image_url} alt="" />
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(part)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(part.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
