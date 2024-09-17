import React, { useState, useEffect } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slide.css';  // Make sure the path to your CSS file is correct
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

// Sample reviews
const sampleReviews = [
    {
        user_name: 'Alice Johnson',
        user_image_url: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: 'Great product! Really satisfied with the quality and delivery.',
        rating: 5
    },
    {
        user_name: 'Bob Smith',
        user_image_url: 'https://randomuser.me/api/portraits/men/45.jpg',
        text: 'The product was okay, but I expected better durability.',
        rating: 3
    },
    {
        user_name: 'Carla Davis',
        user_image_url: 'https://randomuser.me/api/portraits/women/46.jpg',
        text: 'Excellent customer service. The item arrived on time and in perfect condition.',
        rating: 4
    }
];

function SlideShow() {
    const [carParts, setCarParts] = useState([]);
    const [reviews, setReviews] = useState(sampleReviews);

    useEffect(() => {
        const loadCarParts = async () => {
            const parts = await fetchCarParts();
            setCarParts(parts);
        };
        loadCarParts();
    }, []);

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
                        </div>
                    </div>
                ))}
            </div>

            <div className="review-section">
                <h2>Customer Reviews</h2>
                <div className="review-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-user">
                                <img src={review.user_image_url} alt={review.user_name} className="review-user-image" />
                                <p className="review-user-name">{review.user_name}</p>
                            </div>
                            <div className="review-content">
                                <p>{review.text}</p>
                                <div className="review-rating">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

           
        </>
    );
}

export default SlideShow;
