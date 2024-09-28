import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PostListInvestor from '../posts/PostListInvestor';
import { useAuth } from '../../hooks/useAuth';
// import { getPosts, getProfile, getMentors, purchaseMentorship, likePost, commentOnPost } from '../../services/api';

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

  const navigate = useNavigate();

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
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Left Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            className="w-64 bg-white border-r border-indigo-200 p-4 fixed md:static inset-y-0 left-0 z-30 overflow-y-auto"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <h1 className="text-2xl font-bold mb-6 text-indigo-800">Investor Dashboard</h1>
            <nav className="space-y-2">
              <Link to="/" className="block p-2 hover:bg-indigo-100 rounded transition duration-200 text-indigo-600">Home</Link>
              <Link to="/explore" className="block p-2 hover:bg-indigo-100 rounded transition duration-200 text-indigo-600">Explore</Link>
              <Link to="/notifications" className="block p-2 hover:bg-indigo-100 rounded transition duration-200 text-indigo-600">Notifications</Link>
              <Link to="/messages" className="block p-2 hover:bg-indigo-100 rounded transition duration-200 text-indigo-600">Messages</Link>
              <Link to="/profile" className="block p-2 hover:bg-indigo-100 rounded transition duration-200 text-indigo-600">Profile</Link>
            </nav>
            <motion.button
              className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full w-full hover:from-indigo-600 hover:to-purple-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/createpost')}
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
            <h2 className="text-xl font-semibold mb-2 text-indigo-800">Search Founders</h2>
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for founders or projects..."
                className="flex-grow p-2 border border-indigo-300 rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <motion.button
                onClick={handleSearch}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-r hover:from-indigo-600 hover:to-purple-700 transition duration-300"
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
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">Founder Posts</h2>
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
                  className={`px-3 py-1 rounded ${currentPage === page ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'bg-white text-indigo-600 border border-indigo-300'}`}
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
              <h2 className="text-xl font-semibold mb-2 text-indigo-800">Profile</h2>
              <p className="text-indigo-600"><strong>Name:</strong> {profile.fullName}</p>
              <p className="text-indigo-600"><strong>Mentorship Fee:</strong> ${profile.mentorshipFee}</p>
              <Link to="/profile" className="text-indigo-500 hover:text-indigo-600 mt-2 inline-block transition duration-200">
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
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">Active Mentorships</h2>
            {mentorships.length > 0 ? (
              mentorships.map(mentorship => (
                <motion.div
                  key={mentorship._id}
                  className="mb-4 bg-indigo-50 p-3 rounded shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className="text-indigo-600"><strong>Founder:</strong> {mentorship.founder.fullName}</p>
                  <p className="text-indigo-600"><strong>Company:</strong> {mentorship.founder.companyName}</p>
                  <p className="text-indigo-600"><strong>Start Date:</strong> {new Date(mentorship.startDate).toLocaleDateString()}</p>
                  <Link 
                    to={`/chat/${mentorship.chatId}`}
                    className="text-indigo-500 hover:text-indigo-600 mt-1 inline-block transition duration-200"
                  >
                    Open Chat
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-indigo-600">No active mentorships found.</p>
            )}
          </motion.div>

          <motion.div
            className="bg-white rounded-lg p-4 shadow-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">Quick Actions</h2>
            <div className="flex flex-col space-y-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/chat" 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded text-center block hover:from-indigo-600 hover:to-purple-700 transition duration-300"
                >
                  Messages
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/videocall" 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded text-center block hover:from-indigo-600 hover:to-purple-700 transition duration-300"
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