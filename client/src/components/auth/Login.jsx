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
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        
        <input
          className="w-full p-2 border rounded"
          placeholder="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
