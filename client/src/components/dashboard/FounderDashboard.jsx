import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostListFounder from '../posts/PostListFounder';
import { useAuth } from '../../hooks/useAuth';

const FounderDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const profileRes = await axios.get('http://localhost:5050/api/auth/user', { headers });
        setProfile(profileRes.data);

        const postsRes = await axios.get('http://localhost:5050/api/posts', { headers });
        setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);

        const commentsRes = await axios.get('http://localhost:5050/api/posts/comments', { headers });
        setComments(Array.isArray(commentsRes.data) ? commentsRes.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">Founder Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {profile && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Profile</h2>
            <p className="text-indigo-600 mb-2"><strong>Name:</strong> {profile.fullName}</p>
            <p className="text-indigo-600 mb-4"><strong>Company:</strong> {profile.companyName}</p>
            <Link to="/edit-profile" className="text-indigo-500 hover:text-indigo-600 transition duration-300">
              Edit Profile
            </Link>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Your Posts</h2>
          <PostListFounder posts={posts} />
          <Link to="/create-post" className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-700 transition duration-300">
            Create New Post
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Recent Comments</h2>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="mb-4 p-4 bg-indigo-50 rounded-lg">
                <p className="font-semibold text-indigo-600">{comment.user.fullName} commented:</p>
                <p className="text-indigo-800 mt-2">{comment.content}</p>
                <p className="text-sm text-indigo-500 mt-2">On post: {comment.post.title}</p>
              </div>
            ))
          ) : (
            <p className="text-indigo-600">No comments available.</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/messages" className="block w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full text-center hover:from-indigo-600 hover:to-purple-700 transition duration-300">
              Messages
            </Link>
            <Link to="/video-call" className="block w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full text-center hover:from-indigo-600 hover:to-purple-700 transition duration-300">
              Start Video Call
            </Link>
            <Link to="/find-mentors" className="block w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full text-center hover:from-indigo-600 hover:to-purple-700 transition duration-300">
              Find Mentors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;