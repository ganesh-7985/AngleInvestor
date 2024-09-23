import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, MessageSquare, Handshake } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const HowItWorksPage = () => {
  const steps = [
    { icon: <UserPlus className="w-12 h-12 text-indigo-500" />, title: 'Create Your Profile', description: 'Sign up and create a detailed profile showcasing your project or investment interests.' },
    { icon: <Search className="w-12 h-12 text-indigo-500" />, title: 'Get Matched', description: 'Our AI algorithm matches you with potential partners based on your profile and preferences.' },
    { icon: <MessageSquare className="w-12 h-12 text-indigo-500" />, title: 'Connect and Communicate', description: 'Reach out to your matches through our secure messaging system.' },
    { icon: <Handshake className="w-12 h-12 text-indigo-500" />, title: 'Collaborate and Grow', description: 'Meet, discuss ideas, and form partnerships to drive your business forward.' },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen pt-20">
      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-indigo-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How Investr Works
        </motion.h1>
        <motion.p 
          className="text-xl text-indigo-600 mb-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Learn how to use Investr to connect with the right partners and grow your business:
        </motion.p>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex items-start mb-12"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white p-4 rounded-full shadow-lg mr-6">
                {step.icon}
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-indigo-700">{step.title}</h2>
                <p className="text-indigo-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="/signup" className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg hover:bg-indigo-700 transition-colors duration-300">Start Your Journey</a>
        </motion.div>
      </main>
    </div>
  );
};

export default HowItWorksPage;