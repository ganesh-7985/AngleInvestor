import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItemFounder from './PostItemFounder';

const PostListFounder = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/posts');
        // Ensure the data is an array
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // If there's an error, set posts to an empty array
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      {posts.length > 0 ? (
        posts.map(post => (
          <PostItemFounder key={post._id} post={post} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostListFounder;
