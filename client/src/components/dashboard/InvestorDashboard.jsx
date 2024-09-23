import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PostListInvestor from '../posts/PostListInvestor';
import { useAuth } from '../../hooks/useAuth';
import { getPosts, getProfile, getMentors, purchaseMentorship, likePost, commentOnPost } from '../../services/api';

const InvestorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [mentorships, setMentorships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();

  const postsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, mentorshipsRes] = await Promise.all([
          getProfile(),
          getMentors()
        ]);

        setProfile(profileRes.data);
        setMentorships(Array.isArray(mentorshipsRes.data) ? mentorshipsRes.data : []);
        
        fetchPosts(1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchPosts = async (page) => {
    try {
      const postsRes = await getPosts({ page, limit: postsPerPage });
      setPosts(postsRes.data.posts);
      setTotalPages(postsRes.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const searchRes = await getPosts({ term: searchTerm, page: 1, limit: postsPerPage });
      setPosts(searchRes.data.posts);
      setTotalPages(searchRes.data.totalPages);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, likes: [...post.likes, user._id] } : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const res = await commentOnPost(postId, comment);
      setPosts(posts.map(post =>
        post._id === postId ? { ...post, comments: [...post.comments, res.data] } : post
      ));
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Left Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            className="w-64 bg-white border-r p-4 fixed md:static inset-y-0 left-0 z-30 overflow-y-auto"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <h1 className="text-2xl font-bold mb-6">Investor Dashboard</h1>
            <nav className="space-y-2">
              <Link to="/" className="block p-2 hover:bg-gray-200 rounded transition duration-200">Home</Link>
              <Link to="/explore" className="block p-2 hover:bg-gray-200 rounded transition duration-200">Explore</Link>
              <Link to="/notifications" className="block p-2 hover:bg-gray-200 rounded transition duration-200">Notifications</Link>
              <Link to="/messages" className="block p-2 hover:bg-gray-200 rounded transition duration-200">Messages</Link>
              <Link to="/profile" className="block p-2 hover:bg-gray-200 rounded transition duration-200">Profile</Link>
            </nav>
            <motion.button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              New Post
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 md:flex md:space-x-4 p-4">
        {/* Middle Section - Posts */}
        <div className="md:w-2/3 space-y-6">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2">Search Founders</h2>
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for founders or projects..."
                className="flex-grow p-2 border rounded-l"
              />
              <motion.button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">Founder Posts</h2>
            <PostListInvestor
              posts={posts} 
              onLike={handleLike} 
              onComment={handleComment}
            />
            
            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => fetchPosts(page)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="md:w-1/3 space-y-6">
          {profile && (
            <motion.div
              className="bg-white rounded-lg p-4 shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-2">Profile</h2>
              <p><strong>Name:</strong> {profile.fullName}</p>
              <p><strong>Mentorship Fee:</strong> ${profile.mentorshipFee}</p>
              <Link to="/profile" className="text-blue-500 hover:underline mt-2 inline-block transition duration-200">
                Edit Profile
              </Link>
            </motion.div>
          )}

          <motion.div
            className="bg-white rounded-lg p-4 shadow-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">Active Mentorships</h2>
            {mentorships.length > 0 ? (
              mentorships.map(mentorship => (
                <motion.div
                  key={mentorship._id}
                  className="mb-4 bg-gray-50 p-3 rounded shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p><strong>Founder:</strong> {mentorship.founder.fullName}</p>
                  <p><strong>Company:</strong> {mentorship.founder.companyName}</p>
                  <p><strong>Start Date:</strong> {new Date(mentorship.startDate).toLocaleDateString()}</p>
                  <Link 
                    to={`/chat/${mentorship.chatId}`}
                    className="text-blue-500 hover:underline mt-1 inline-block transition duration-200"
                  >
                    Open Chat
                  </Link>
                </motion.div>
              ))
            ) : (
              <p>No active mentorships found.</p>
            )}
          </motion.div>

          <motion.div
            className="bg-white rounded-lg p-4 shadow-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/chat" 
                  className="bg-green-500 text-white px-4 py-2 rounded text-center block hover:bg-green-600 transition duration-200"
                >
                  Messages
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/videocall" 
                  className="bg-purple-500 text-white px-4 py-2 rounded text-center block hover:bg-purple-600 transition duration-200"
                >
                  Start Video Call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
