import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, getPosts, getComments } from '../../services/api';
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
        const profileRes = await getProfile();
        setProfile(profileRes.data);

        const postsRes = await getPosts();
        setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);

        const commentsRes = await getComments();
        setComments(Array.isArray(commentsRes.data) ? commentsRes.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Founder Dashboard</h1>
      
      {profile && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <p><strong>Name:</strong> {profile.fullName}</p>
          <p><strong>Company:</strong> {profile.companyName}</p>
          <Link to="/profile" className="text-blue-500 hover:underline mt-2 inline-block">
            Edit Profile
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
          <PostListFounder posts={posts} />
          <Link 
            to="/createpost" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 inline-block"
          >
            Create New Post
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Comments</h2>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <p className="font-semibold">{comment.user.fullName} commented:</p>
                <p>{comment.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  On post: {comment.post.title}
                </p>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link 
            to="/chat" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Messages
          </Link>
          <Link 
            to="/videocall" 
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Start Video Call
          </Link>
          <Link 
            to="/mentorship" 
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Find Mentors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
