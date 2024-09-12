import React, { useState, useEffect } from "react";
import "./Manage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

function Manage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [carPart, setCarPart] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    stock: "",
    image_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Check if we're editing an existing car part
  useEffect(() => {
    if (location.state && location.state.carPart) {
      setCarPart(location.state.carPart); // Load car part data into the form
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarPart({
      ...carPart,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // If editing, send a PUT request to update the car part
      try {
        const response = await axios.put(
          `http://localhost:3000/api/carpart/${carPart.id}`,
          carPart
        );
        console.log("Car part updated successfully:", response.data);
        
        // Show SweetAlert success message after update
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "The car part has been updated successfully.",
        }).then(() => {
          navigate("/"); // Redirect to dashboard after alert is closed
        });

      } catch (error) {
        console.error("There was an error updating the car part!", error);
      }
    } else {
      // If creating, send a POST request to add a new car part
      try {
        const response = await axios.post(
          "http://localhost:3000/api/carparts",
          carPart
        );
        console.log("Data submitted successfully:", response.data);
        
        // Show SweetAlert success message after adding
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "The car part has been added successfully.",
        }).then(() => {
          navigate("/"); // Redirect to dashboard after alert is closed
        });
        
      } catch (error) {
        console.error("There was an error submitting the data!", error);
      }
    }
  };

  return (
    <>
      <form className="car-part-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={carPart.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={carPart.brand}
          onChange={handleChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={carPart.model}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={carPart.year}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={carPart.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={carPart.stock}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={carPart.image_url}
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? "Update Car Part" : "Add Car Part"}</button>
      </form>
    </>
  );
}

export default Manage;
