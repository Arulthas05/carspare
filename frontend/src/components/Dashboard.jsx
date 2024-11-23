import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Dashboard.css";

function Dashboard() {
  const [carParts, setCarParts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    stock: "",
    image_url: "",
  });
  const [reviewData, setReviewData] = useState({
    id: "",
    username: "",
    rating: "",
    review_text: "",
    car_part_id: "",
  });
  const [blogsData, setBlogsData] = useState({
    id: "",
    title: "",
    content: "",
    image_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isReviewEditing, setIsReviewEditing] = useState(false);
  const [isBlogsEditing, setIsBlogsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState("carParts");

  // Fetch car parts and reviews data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const partsResponse = await axios.get("http://localhost:3000/api/carparts");
        setCarParts(partsResponse.data);

        const reviewsResponse = await axios.get("http://localhost:3000/api/reviews");
        setReviews(reviewsResponse.data);

        const blogsResponse = await axios.get("http://localhost:3000/api/blogs");
        setBlogs(blogsResponse.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  // Handle form data change for car parts
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

  // Handle Blogs form data change
  const handleBlogsChange = (e) => {
    const { name, value } = e.target;
    setBlogsData({
      ...blogsData,
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
        window.location.reload();
      } catch (error) {
        console.error("There was an error updating the car part!", error);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/api/carparts", formData);
        Swal.fire("Added!", "The car part has been added.", "success");
        window.location.reload();
      } catch (error) {
        console.error("There was an error adding the car part!", error);
      }
    }
    setFormData({
      id: "",
      name: "",
      brand: "",
      model: "",
      year: "",
      price: "",
      stock: "",
      image_url: "",
    });
    setIsEditing(false);
    fetchData();
  };

  // Handle add/edit review form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (isReviewEditing) {
      try {
        await axios.put(`http://localhost:3000/api/review/${reviewData.id}`, reviewData);
        Swal.fire("Updated!", "The review has been updated.", "success");
        window.location.reload();
      } catch (error) {
        console.error("There was an error updating the review!", error);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/api/reviews", reviewData);
        Swal.fire("Added!", "The review has been added.", "success");
        window.location.reload();
      } catch (error) {
        console.error("There was an error adding the review!", error);
      }
    }
    setReviewData({
      id: "",
      username: "",
      rating: "",
      review_text: "",
      car_part_id: "",
    });
    setIsReviewEditing(false);
    fetchData();
  };

  // Handle add/edit review form submission
  const handleBlogsSubmit = async (e) => {
    e.preventDefault();
    if (isBlogsEditing) {
      try {
        await axios.put(`http://localhost:3000/api/blogs/${blogsData.id}`, blogsData);
        Swal.fire("Updated!", "The review has been updated.", "success");
        window.location.reload();
      } catch (error) {
        console.error("There was an error updating the review!", error);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/api/blogs", blogsData);
        Swal.fire("Added!", "The review has been added.", "success");
        window.location.reload();
      } catch (error) {
        console.error("There was an error adding the review!", error);
      }
    }
    setBlogsData({
      id: "",
      title: "",
      content: "",
      image_url: "",
    });
    setIsBlogsEditing(false);
    fetchData();
  };

  // Handle edit click for car parts
  const handleEditClick = (part) => {
    setFormData(part);
    setIsEditing(true);
  };

  // Handle delete for car parts
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/carpart/${id}`);
      Swal.fire("Deleted!", "The car part has been deleted.", "success");
      window.location.reload();
      fetchData();
    } catch (error) {
      console.error("There was an error deleting the car part!", error);
    }
  };

  // Handle edit click for reviews
  const handleReviewEditClick = (review) => {
    setReviewData(review);
    setIsReviewEditing(true);
  };

  // Handle delete for reviews
  const handleReviewDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/review/${id}`);
      Swal.fire("Deleted!", "The review has been deleted.", "success");
      window.location.reload();
      fetchData();
    } catch (error) {
      console.error("There was an error deleting the review!", error);
    }
  };
  
   // Handle edit click for reviews
   const handleBlogsEditClick = (review) => {
    setBlogsData(review);
    setIsBlogsEditing(true);
  };

  // Handle delete for reviews
  const handleBlogsDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/blogs/${id}`);
      Swal.fire("Deleted!", "The review has been deleted.", "success");
      window.location.reload();
      fetchData();
    } catch (error) {
      console.error("There was an error deleting the review!", error);
    }
  };
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          <ul>
            <li onClick={() => setSelectedSection("carParts")}>
              Car Parts Management
            </li>
            <li onClick={() => setSelectedSection("reviews")}>
              Review Management
            </li>

            <li onClick={() => setSelectedSection("blogs")}>
              Blog Management
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        {selectedSection === "carParts" && (
          <>
            <h2>Car Parts Management</h2>
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
                      <img src={part.image_url} alt={part.name} />
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(part)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteClick(part.id)}
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
          </>
        )}

        {selectedSection === "reviews" && (
          <>
            <h2>Review Management</h2>
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
                        onClick={() => handleReviewEditClick(review)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleReviewDeleteClick(review.id)}
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
              <input
                type="text"
                name="car_part_id"
                placeholder="Car Part ID"
                value={reviewData.car_part_id}
                onChange={handleReviewChange}
                required
              />
              <button type="submit">
                {isReviewEditing ? "Update Review" : "Add Review"}
              </button>
            </form>
          </>
        )}

        {selectedSection === "blogs" && (
          <>
            <h2>Blogs Management</h2>
            {/* Blogs Table */}
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>title</th>
                  <th>content</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.id}</td>
                    <td>{blog.title}</td>
                    <td>{blog.content}</td>
                    {/* <td>{blog.image_url}</td> */}
                    <td>
                      <img src={blog.image_url} width={100} alt={blog.title} />
                    </td>
                    {/* <td>{review.car_part_id}</td> */}
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleBlogsEditClick(blog)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleBlogsDeleteClick(blog.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Review Add/Edit Form */}
            <form className="review-form" onSubmit={handleBlogsSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={blogsData.title}
                onChange={handleBlogsChange}
                required
              />
              <input
                type="text"
                name="image_url"
                placeholder="image_url"
                value={blogsData.image_url}
                onChange={handleBlogsChange}
                required
              />
              <textarea
                name="content"
                placeholder="blog content"
                value={blogsData.content}
                onChange={handleBlogsChange}
                required
              />
              <button type="submit">
                {isBlogsEditing ? "Update Blogs" : "Add Blogs"}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
