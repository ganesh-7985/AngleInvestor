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
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Sign Up for Investr</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">User Type</label>
          <select
            className="w-full p-2 border rounded"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="Founder">Founder</option>
            <option value="Investor">Investor</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            {...register('fullName', { required: 'Full name is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        {userType === 'Founder' && (
          <div>
            <label className="block mb-1">Company Name</label>
            <input
              type="text"
              {...register('companyName', { required: 'Company name is required for founders' })}
              className="w-full p-2 border rounded"
            />
            {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName.message}</span>}
          </div>
        )}

        {userType === 'Investor' && (
          <div>
            <label className="block mb-1">Mentorship Fee ($ per hour)</label>
            <input
              type="number"
              {...register('mentorshipFee', { 
                required: 'Mentorship fee is required for investors',
                min: {
                  value: 0,
                  message: 'Mentorship fee cannot be negative'
                }
              })}
              className="w-full p-2 border rounded"
            />
            {errors.mentorshipFee && <span className="text-red-500 text-sm">{errors.mentorshipFee.message}</span>}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
