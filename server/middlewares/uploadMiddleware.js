const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name in Cloudinary where images will be uploaded
    allowed_formats: ['jpg', 'png', 'mp4'], // Allowed file types
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`, // Filename in Cloudinary
  },
});

const upload = multer({ storage: storage });

// Middleware to upload a single file
module.exports = upload
