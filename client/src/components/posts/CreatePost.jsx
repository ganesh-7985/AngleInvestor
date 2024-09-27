import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createPost } from '../../services/api';

const CreatePost = () => {
  const { register, handleSubmit, errors } = useForm();
  const [file, setFile] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (file) {
      formData.append('media', file);
    }
// 
    try {
      console.log("The form data that is given to createPost is: ", formData);
      await createPost(formData);
      // Handle successful post creation (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Content"
          rows="4"
          {...register('content', { required: true })}
        ></textarea>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
