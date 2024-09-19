import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home({ cart, setCart,username,userId }) {
  const [carParts, setCarParts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const partsResponse = await axios.get("http://localhost:3000/api/carparts");
        setCarParts(partsResponse.data);

        const reviewsResponse = await axios.get("http://localhost:3000/api/reviews");
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleAddToCart = (part) => {
    const existingItem = cart.find((item) => item.id === part.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...part, quantity: 1 }]);
    }
  };

  const handleReviewClick = (part) => {
    setSelectedPart(part);
    setShowReviewForm(true);
  };

  const handleReviewSubmit = async (review) => {
    try {
      await axios.post('http://localhost:3000/api/reviews', review);
      alert('Review submitted successfully!');
      setShowReviewForm(false);
      const updatedReviews = await axios.get('http://localhost:3000/api/reviews');
      setReviews(updatedReviews.data);
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <div className="home-container">
      <div className="product-list">
        {carParts.map((part, index) => (
          <div key={index} className="car-part-card">
            <img src={part.image_url} alt={part.name} className="car-part-image" />
            <h3 className="car-part-name">{part.name}</h3>
            <p className="car-part-brand">Brand: {part.brand}</p>
            <p className="car-part-model">Model: {part.model}</p>
            <p className="car-part-year">Year: {part.year}</p>
            <p className="car-part-price">Price: ${part.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(part)}>
              Add to Cart
            </button>
            <button className="review-btn" onClick={() => handleReviewClick(part)}>
              Leave a Review
            </button>
          </div>
        ))}
      </div>

      

      {showReviewForm && selectedPart && (
        <ReviewForm
          productId={selectedPart.id}
          username={username} // Replace with actual username from your context
          userId={userId} // Replace with actual user ID from your context
          onReviewSubmit={handleReviewSubmit}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
}

const ReviewForm = ({ productId, username, userId, onReviewSubmit, onClose }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('Excellent car part!');

  const handleSubmit = (e) => {
    e.preventDefault();
    onReviewSubmit({
      user_id: userId,
      username: username,
      car_part_id: productId,
      rating,
      review_text: reviewText,
    });
  };

  return (
    <div className="review-form-container">
      <div className="review-form-overlay" onClick={onClose}></div>
      <div className="review-form">
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reviewText">Review Text:</label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Submit Review</button>
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Home;
