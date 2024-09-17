import React, { useState, useEffect } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slide.css';
import Footer from './Footer';
import NavBar from './NavBar';

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

function SlideShow({ cart, setCart }) {
  const [carParts, setCarParts] = useState([]);

  useEffect(() => {
    const loadCarParts = async () => {
      const parts = await fetchCarParts();
      setCarParts(parts);
    };
    loadCarParts();
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

      <div className="product-list">
        <div className='text'>Latest Products</div>
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SlideShow;
