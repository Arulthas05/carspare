import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

function Dashboard() {
  const [carParts, setCarParts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    stock: "",
    image_url: "",
  });
  const [isEditing, setIsEditing] = useState(false); // For switching between add and edit
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

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle edit button click
  const handleEdit = (part) => {
    // Show SweetAlert confirmation before editing
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to edit this car part?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(part); // Populate the form with existing data
        setIsEditing(true); // Set editing mode
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/carpart/${formData.id}`,
          formData
        );
        Swal.fire("Updated!", "The car part has been updated.", "success");
        window.location.reload(); // Refresh the page after editing
      } catch (error) {
        console.error("There was an error updating the car part!", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/carparts",
          formData
        );
        Swal.fire("Added!", "The car part has been added.", "success");
        window.location.reload(); // Refresh the page after adding
      } catch (error) {
        console.error("There was an error submitting the data!", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        {/* <h2>Dashboard</h2> */}
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

          {/* Add/Edit Form below the table */}
          <form className="car-part-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? "Edit Car Part" : "Add Car Part"}</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={handleChange}
            />
            <button type="submit">
              {isEditing ? "Update Car Part" : "Add Car Part"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
