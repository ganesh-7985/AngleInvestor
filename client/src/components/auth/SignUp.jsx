import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userType, setUserType] = useState('Founder');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5050/api/auth/register', {
        ...data,
        typeOfUser: userType
      });
      localStorage.setItem('token', response.data.token);
      navigate(userType === 'Founder' ? '/founderdashboard' : '/investordashboard');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800 text-center">Sign Up for Investr</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-indigo-700">User Type</label>
          <select
            className="w-full p-3 border border-indigo-300 rounded-md bg-white text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="Founder">Founder</option>
            <option value="Investor">Investor</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1 text-indigo-700">Full Name</label>
          <input
            type="text"
            {...register('fullName', { required: 'Full name is required' })}
            className="w-full p-3 border border-indigo-300 rounded-md bg-white text-indigo-600 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
          {errors.fullName && <span className="text-indigo-600 text-sm">{errors.fullName.message}</span>}
        </div>

        <div>
          <label className="block mb-1 text-indigo-700">Email</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full p-3 border border-indigo-300 rounded-md bg-white text-indigo-600 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your email"
          />
          {errors.email && <span className="text-indigo-600 text-sm">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block mb-1 text-indigo-700">Password</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              }
            })}
            className="w-full p-3 border border-indigo-300 rounded-md bg-white text-indigo-600 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your password"
          />
          {errors.password && <span className="text-indigo-600 text-sm">{errors.password.message}</span>}
        </div>

        {userType === 'Founder' && (
          <div>
            <label className="block mb-1 text-indigo-700">Company Name</label>
            <input
              type="text"
              {...register('companyName', { required: 'Company name is required for founders' })}
              className="w-full p-3 border border-indigo-300 rounded-md bg-white text-indigo-600 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your company name"
            />
            {errors.companyName && <span className="text-indigo-600 text-sm">{errors.companyName.message}</span>}
          </div>
        )}

        {userType === 'Investor' && (
          <div>
            <label className="block mb-1 text-indigo-700">Mentorship Fee ($ per hour)</label>
            <input
              type="number"
              {...register('mentorshipFee', { 
                required: 'Mentorship fee is required for investors',
                min: {
                  value: 0,
                  message: 'Mentorship fee cannot be negative'
                }
              })}
              className="w-full p-3 border border-indigo-300 rounded-md bg-white text-indigo-600 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your mentorship fee"
            />
            {errors.mentorshipFee && <span className="text-indigo-600 text-sm">{errors.mentorshipFee.message}</span>}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md hover:from-indigo-600 hover:to-purple-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;