import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, MapPin, BellOff, MessageSquare, UserCircle, Lock, Menu } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/handshake.png';


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold text-indigo-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Investr
          </motion.h1>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-6 h-6 text-indigo-600" />
            </button>
          </div>
          <motion.div 
            className={`${isMenuOpen ? 'block' : 'hidden'} md:flex  md:space-y-0 md:space-x-6  md:flex-row absolute md:relative bg-white md:bg-transparent w-full md:w-auto shadow-md md:shadow-none`}
          >
            
            <Link to="/signup" className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600 transition-colors duration-300">SignUp</Link>
            <Link to="/login" className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600 transition-colors duration-300">LogIn</Link>
            
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={fadeIn}>
            <h2 className="text-4xl font-bold mb-4 text-indigo-800">A Smarter Way to Connect Founders and Investors</h2>
            <p className="text-xl mb-6 text-indigo-600">We're here to help innovative founders find the right investors for their groundbreaking ideas.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/signup" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-md text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg">Get Started</Link>
            </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2" variants={fadeIn}>
            <img src={logo} alt="Founders and investors collaborating" className="rounded-lg " />
          </motion.div>
        </motion.div>

        <motion.section 
          className="mt-16"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h3 className="text-2xl font-semibold mb-6 text-indigo-800" variants={fadeIn}>Why Choose Investr?</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-8 h-8 text-indigo-500" />, title: 'Smart Matching', description: 'Our AI-driven algorithm ensures founders connect with the most suitable investors.' },
              { icon: <UserCircle className="w-8 h-8 text-indigo-500" />, title: 'Verified Profiles', description: 'All users go through a verification process to ensure authenticity.' },
              { icon: <Lock className="w-8 h-8 text-indigo-500" />, title: 'Secure', description: 'Your data and ideas are protected with state-of-the-art security measures.' },
              { icon: <MessageSquare className="w-8 h-8 text-indigo-500" />, title: 'Direct Communication', description: 'Connect directly with potential partners through our platform.' },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                {item.icon}
                <h4 className="text-xl font-semibold mt-4 mb-2 text-indigo-700">{item.title}</h4>
                <p className="text-indigo-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="mt-16"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h3 className="text-2xl font-semibold mb-6 text-indigo-800" variants={fadeIn}>Features</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              { icon: <BellOff className="w-8 h-8 text-indigo-500" />, title: 'Do Not Disturb Mode', description: 'Set your availability and manage interruptions on your terms.' },
              { icon: <MessageSquare className="w-8 h-8 text-indigo-500" />, title: 'Secure Messaging', description: 'Communicate safely within the platform using our encrypted messaging system.' },
              { icon: <UserCircle className="w-8 h-8 text-indigo-500" />, title: 'Detailed Profiles', description: 'Showcase your project or investment portfolio with rich, customizable profiles.' },
              { icon: <Lock className="w-8 h-8 text-indigo-500" />, title: 'Privacy Controls', description: 'Manage your visibility and control who can view your information.' },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                {item.icon}
                <h4 className="text-xl font-semibold mt-4 mb-2 text-indigo-700">{item.title}</h4>
                <p className="text-indigo-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="mt-16 text-center"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <h3 className="text-2xl font-semibold mb-6 text-indigo-800">Ready to revolutionize your funding journey?</h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/signup" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-md text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg inline-block">Join Investr Today</Link>
          </motion.div>
        </motion.section>
      </main>

      <footer className="bg-indigo-800 text-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2024 Investr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;