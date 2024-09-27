import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5050/api/auth/login', data);
      console.log(response.data);
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      if (role === 'Founder') {
        navigate('/founderdashboard');
      } else if (role === 'Investor') {
        navigate('/investordashboard');
      } else {
        console.error('Unknown role:', role);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800 text-center">Login to Investr</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          className="w-full p-3 border border-indigo-300 rounded-md bg-white text-indigo-600 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span className="text-indigo-600 text-sm">{errors.email.message}</span>}
        
        <input
          className="w-full p-3 border border-indigo-300 rounded-md bg-white text-indigo-600 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span className="text-indigo-600 text-sm">{errors.password.message}</span>}
        
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md hover:from-indigo-600 hover:to-purple-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <a href="#" className="text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out">Forgot your password?</a>
      </div>
    </div>
  );
};

export default Login;