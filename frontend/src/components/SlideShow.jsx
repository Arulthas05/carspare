import React, { useState, useEffect } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slide.css';
import axios from 'axios';

const fadeImages = [
  {
    url: 'https://images.unsplash.com/photo-1524102724373-bcf6ed410592?q=80&w=2055&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Slide 1'
  },
  {
    url: 'https://img.freepik.com/free-photo/sports-car-driving-asphalt-road-night-generative-ai_188544-8052.jpg?size=626&ext=jpg&ga=GA1.1.256784782.1719222570&semt=ais_hybrid',
    caption: 'Slide 2'
  },
  {
    url: 'https://img.freepik.com/free-photo/cyberpunk-urban-scenery-with-car_23-2150712310.jpg?size=626&ext=jpg&ga=GA1.2.256784782.1719222570&semt=ais_hybrid',
    caption: 'Slide 3'
  },
];

const fetchCarParts = async () => {
  const response = await fetch('http://localhost:3000/api/carparts');
  const data = await response.json();
  return data;
};

const fetchReviews = async () => {
  const response = await fetch('http://localhost:3000/api/reviews');
  const data = await response.json();
  return data;
};

function SlideShow({ cart, setCart, username, userId }) {
  const [carParts, setCarParts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  useEffect(() => {
    const loadCarParts = async () => {
      const parts = await fetchCarParts();
      setCarParts(parts);
    };
    const loadReviews = async () => {
      const reviewsData = await fetchReviews();
      setReviews(reviewsData);
    };
    loadCarParts();
    loadReviews();
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
      const updatedReviews = await fetchReviews(); // Refresh reviews
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <>
      <div className="slide-container">
        <Fade>
          {fadeImages.map((fadeImage, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <img style={{ width: '100vw', height: '100vh' }} src={fadeImage.url} alt={fadeImage.caption} />
            </div>
          ))}
        </Fade>
      </div>

      <div className="product">
          <div className='text'>Latest Products</div>
          <div className="product-list">
            {carParts.map((part, index) => (
              <div key={index} className="product-card">
                <img src={part.image_url} alt={part.name} className="product-image" />
                <div className="product-info">
                  <h2>{part.name}</h2>
                  <p>Brand: {part.brand}</p>
                  <p>Price: ${part.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(part)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="review-btn"
                    onClick={() => handleReviewClick(part)}
                  >
                    Leave a Review
                  </button>
                </div>
              </div>
            ))}
            {showReviewForm && selectedPart && (
              <ReviewForm
                productId={selectedPart.id}
                username={username}
                userId={userId}
                onReviewSubmit={handleReviewSubmit}
                onClose={() => setShowReviewForm(false)}
              />
            )}
          </div>
      </div>

      <div className="review-section">
        <div className='text'>Customer Reviews</div>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <h3>{review.username}</h3>
                <span className="review-rating">Rating: {review.rating}/5</span>
              </div>
              <p className="review-text">{review.review_text}</p>
              <p className="review-date">{new Date(review.created_at).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>


    </>
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

export default SlideShow;
