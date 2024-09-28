const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require("../utils/cloudinary")
const { v4: uuidv4 } = require('uuid');  // UUID for unique identifier

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
  try {
    const { title, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "An image or video file is required" });
    }

    const filePath = req.file.path;
    const publicId = `post_${uuidv4()}`;

    let uploadResult;

    try {
      // Try uploading the file to Cloudinary
      uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        resource_type: 'auto',  // Automatically detect file type
      });
    } catch (cloudinaryError) {
      console.error("Cloudinary upload error:", cloudinaryError.message);
      return res.status(500).json({ error: "Error uploading file to Cloudinary", details: cloudinaryError.message });
    }

    const mediaUrl = uploadResult.secure_url;
    console.log("Cloudinary upload successful:", mediaUrl);

    // Alternative method: use Post.create() to create and save in one step
    const newPost = await Post.create({
      title,
      content,
      mediaUrl
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Error creating post", error: error.message });
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
