import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import "./Dashboard.css";

function Dashboard() {
  const [carParts, setCarParts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    stock: "",
    image_url: "",
  });
  const [reviewData, setReviewData] = useState({
    username: "",
    rating: "",
    review_text: "",
    car_part_id: "",
  });
  const [isEditing, setIsEditing] = useState(false); // For switching between add and edit
  const [isReviewEditing, setIsReviewEditing] = useState(false); // For switching between add and edit review
  const [selectedCarPart, setSelectedCarPart] = useState(null); // Selected car part for review
  const [selectedReview, setSelectedReview] = useState(null); // Selected review for editing

  // Fetch car parts and reviews data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const partsResponse = await axios.get("http://localhost:3000/api/carparts");
        setCarParts(partsResponse.data);

        const reviewsResponse = await axios.get("http://localhost:3000/api/reviews");
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle review form data change
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  // Handle add/edit car part form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:3000/api/carpart/${formData.id}`, formData);
        Swal.fire("Updated!", "The car part has been updated.", "success");
      } catch (error) {
        console.error("There was an error updating the car part!", error);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/api/carparts", formData);
        Swal.fire("Added!", "The car part has been added.", "success");
      } catch (error) {
        console.error("There was an error adding the car part!", error);
      }
    }
    window.location.reload(); // Refresh the page after adding or editing
  };

  // Handle edit button click for car parts
  const handleEdit = (part) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to edit this car part?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(part);
        setIsEditing(true);
      }
    });
  };

  // Handle delete button click for car parts
  const handleDelete = (id) => {
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
          .then(() => {
            Swal.fire("Deleted!", "The car part has been deleted.", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "There was an error deleting the car part.", "error");
          });
      }
    });
  };

  // Handle review form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (isReviewEditing) {
      try {
        await axios.put(`http://localhost:3000/api/review/${selectedReview.id}`, reviewData);
        Swal.fire("Updated!", "The review has been updated.", "success");
      } catch (error) {
        console.error("There was an error updating the review!", error);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/api/reviews", reviewData);
        Swal.fire("Added!", "The review has been added.", "success");
      } catch (error) {
        console.error("There was an error adding the review!", error);
      }
    }
    window.location.reload(); // Refresh the page after adding or editing review
  };

  // Handle edit button click for reviews
  const handleReviewEdit = (review) => {
    setReviewData({
      username: review.username,
      rating: review.rating,
      review_text: review.review_text,
      car_part_id: review.car_part_id,
    });
    setSelectedReview(review);
    setIsReviewEditing(true);
  };

  // Handle delete button click for reviews
  const handleReviewDelete = (id) => {
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
          .delete(`http://localhost:3000/api/review/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The review has been deleted.", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "There was an error deleting the review.", "error");
          });
      }
    });
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        {/* Sidebar content */}
      </aside>
      <div className="main-content">
        <header className="header">
          <h1>Welcome to Your Dashboard</h1>
        </header>
        <div className="content">
          {/* Car Parts Table */}
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

          {/* Car Part Add/Edit Form */}
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

          {/* Reviews Table */}
          <table className="reviews-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Car Part ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.username}</td>
                  <td>{review.rating}</td>
                  <td>{review.review_text}</td>
                  <td>{review.car_part_id}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleReviewEdit(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleReviewDelete(review.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Review Add/Edit Form */}
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h2>{isReviewEditing ? "Edit Review" : "Add Review"}</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={reviewData.username}
              onChange={handleReviewChange}
              required
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={reviewData.rating}
              onChange={handleReviewChange}
              required
            />
            <textarea
              name="review_text"
              placeholder="Review Text"
              value={reviewData.review_text}
              onChange={handleReviewChange}
              required
            />
            <select
              name="car_part_id"
              value={reviewData.car_part_id}
              onChange={handleReviewChange}
              required
            >
              <option value="">Select Car Part</option>
              {carParts.map((part) => (
                <option key={part.id} value={part.id}>
                  {part.name}
                </option>
              ))}
            </select>
            <button type="submit">
              {isReviewEditing ? "Update Review" : "Add Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
