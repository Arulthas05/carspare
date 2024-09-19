import React from "react";
import "./Blog.css";

const samplePosts = [
  {
    id: 1,
    title: "The Future of Technology",
    date: "2024-09-15",
    excerpt: "Exploring the upcoming trends in technology and how they might shape our world.",
    image_url: "https://images.unsplash.com/photo-1524102724373-bcf6ed410592?q=80&w=2055&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Travel Adventures in Sri Lanka",
    date: "2024-08-20",
    excerpt: "A guide to the most exciting travel destinations in Sri Lanka.",
    image_url: "https://img.freepik.com/free-photo/sports-car-driving-asphalt-road-night-generative-ai_188544-8052.jpg?size=626&ext=jpg&ga=GA1.1.256784782.1719222570&semt=ais_hybrid"
  },
  {
    id: 3,
    title: "Healthy Living Tips",
    date: "2024-07-10",
    excerpt: "Practical advice on how to live a healthier and happier life.",
    image_url: "https://img.freepik.com/free-photo/cyberpunk-urban-scenery-with-car_23-2150712310.jpg?size=626&ext=jpg&ga=GA1.2.256784782.1719222570&semt=ais_hybrid"
  }
];

function Blog() {
  return (
    <div className="blog-page">
      <header className="blog-header">
        <h1>My Blog</h1>
        <p>Welcome to my blog! Here you'll find my latest articles and updates.</p>
      </header>
      <div className="blog-content">
        <main className="blog-posts">
          {samplePosts.map((post) => (
            <article key={post.id} className="blog-post">
              <img src={post.image_url} alt={post.title} className="blog-post-image" />
              <h2 className="blog-post-title">{post.title}</h2>
              <p className="blog-post-date">{new Date(post.date).toLocaleDateString()}</p>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <a href={`/blog/${post.id}`} className="read-more">Read More</a>
            </article>
          ))}
        </main>
        <aside className="blog-sidebar">
          <h2>Categories</h2>
          <ul>
            <li><a href="#">Technology</a></li>
            <li><a href="#">Lifestyle</a></li>
            <li><a href="#">Travel</a></li>
            <li><a href="#">Health</a></li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default Blog;
