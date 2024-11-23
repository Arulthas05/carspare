import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blogs");
      setBlogs(response.data.length ? response.data : samplePosts);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(true);
      // setBlogs(samplePosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load blogs. Showing sample data.</p>;

  return (
    <div className="blog-page">
      <header className="blog-header">
        <h1>My Blog</h1>
        <p>Welcome to my blog! Here you'll find my latest articles and updates.</p>
      </header>
      <div className="blog-content">
        <main className="blog-posts">
          {blogs.map((post) => (
            <article key={post.id} className="blog-post">
              <img src={post.image_url} alt={post.title} className="blog-post-image" />
              <h2 className="blog-post-title">{post.title}</h2>
              {/* <p className="blog-post-date">{new Date(post.date).toLocaleDateString()}</p> */}
              <p className="blog-post-excerpt">{post.content}</p>
              <a href={`#`} className="read-more">Read More</a>
            </article>
          ))}
        </main>
        <aside className="blog-sidebar">
          <h2>Categories</h2>
          <ul>
            <li><a href="/blogs?category=technology">Technology</a></li>
            <li><a href="/blogs?category=lifestyle">Lifestyle</a></li>
            <li><a href="/blogs?category=travel">Travel</a></li>
            <li><a href="/blogs?category=health">Health</a></li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
