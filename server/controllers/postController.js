const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require("../utils/cloudinary")

// Create a new post
// exports.createPost = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const user = req.user.id;
//     let mediaUrl = req.file ? req.file.path : null;

//     console.log('Creating post with data:', { title, content, user, mediaUrl });

//     const newPost = new Post({ user, title, content, mediaUrl });
//     const post = await newPost.save();
    
//     // Optional: You can update the user's posts list if needed.
//     await User.findByIdAndUpdate(user, { $push: { posts: post._id } });

//     res.status(201).json(post);
//   } catch (error) {
//     console.error('Error creating post:', error.message);
//     res.status(500).json({ message: 'Error creating post', error: error.message });
//   }
// };

exports.createPost = async (req, res) => {
  const { title, content, userId } = req.body;

  if (!req.file) {
    return res.status(400).json({
      error: "An image or video file is required"
    });
  }

  const filePath = req.file.path; // Path to the uploaded file (could be image or video)
  const fileType = req.file.mimetype.split('/')[0]; // Determine if it's image or video
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  let mediaUrl = "";

  try {
    // Upload the file to Cloudinary with resource_type based on file type
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: fileType === 'image' ? 'image' : 'video'
    });

    mediaUrl = uploadResult.secure_url; // Get the Cloudinary URL

    // Create a new post in the database
    const newPost = new Post({
      user: userId,
      title,
      content,
      mediaUrl, // Save the Cloudinary URL to the post
    });

    await newPost.save();

    // Update the user's posts list
    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error uploading file (this is the catch block):", error);
    res.status(500).json({ message: "Error uploading file", error: error.message });
  }
};

// Get all posts with user details
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'fullName');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Update a post by ID
// exports.updatePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const { title, content } = req.body;

//     let post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     // Check if the logged-in user is the owner of the post
//     if (post.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     post.title = title || post.title;
//     post.content = content || post.content;
//     post = await post.save();

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating post', error });
//   }
// };

// Update a post by ID
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    let post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    let mediaUrl = post.mediaUrl; // Keep existing media URL unless a new file is uploaded

    if (req.file) {
      // Upload new file to Cloudinary and replace the mediaUrl
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto', // Automatically handle image or video
      });
      mediaUrl = uploadResult.secure_url;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.mediaUrl = mediaUrl;

    post = await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};


// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    let post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.remove();
    await User.findByIdAndUpdate(req.user.id, { $pull: { posts: postId } });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;  // Use req.params.id instead of req.body.postId

    let post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the user has already liked the post
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
};

// Comment on a post
exports.commentPost = async (req, res) => {
  try {
    const postId = req.params.id;  // Use req.params.id instead of req.body.postId
    const { content } = req.body;  // Use content instead of text for consistency

    let post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      user: req.user.id,
      content,
      createdAt: Date.now(),
    };

    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error commenting on post', error });
  }
};
