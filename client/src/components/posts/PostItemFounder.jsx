import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const PostItemFounder = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);

  const handleLike = async () => {
    try {
      await axios.post(`/api/posts/${post._id}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

//   const handleComment = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`/api/posts/${post._id}/comment`, { content: newComment });
//       setComments([...comments, response.data]);
//       setNewComment('');
//     } catch (error) {
//       console.error('Error commenting on post:', error);
//     }
//   };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>
      {post.mediaUrl && (
        <img src={post.mediaUrl} alt="Post media" className="w-full h-64 object-cover mb-4 rounded" />
      )}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handleLike} className="text-blue-500 hover:text-blue-700">
          Like ({likes})
        </button>
        <span>{comments.length} comments</span>
      </div>
      {/* <div className="border-t pt-4">
        <h4 className="font-semibold mb-2">Comments</h4>
        {comments.map((comment, index) => (
          <p key={index} className="text-sm text-gray-600 mb-2">{comment.content}</p>
        ))}
      </div> */}
      {/* {user && (
        <form onSubmit={handleComment} className="mt-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Post Comment
          </button>
        </form>
      )} */}
    </div>
  );
};

export default PostItemFounder;
