import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getPosts = () => api.get('/posts');
export const createPost = (postData) => api.post('/posts', postData);
export const likePost = (postId) => api.post(`/posts/${postId}/like`);
export const commentOnPost = (postId, content) => api.post(`/posts/${postId}/comment`, { content });

export const getProfile = () => api.get('/auth/user');
export const updateProfile = (profileData) => api.put('/auth/user', profileData);

export const getMentors = () => api.get('/mentorship/mentors');
export const purchaseMentorship = (mentorId) => api.post(`/mentorship/purchase/${mentorId}`);
export const getComments = () => api.get('/posts/comments');