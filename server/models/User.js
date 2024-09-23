const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    typeOfUser: { type: String, enum: ['Founder', 'Investor'], required: true },
    companyName: String,
    bio: String,
    location: String,
    avatar: String,
    coFounders: [String], // Array of co-founders for Founders
    mentorshipFee: Number, // Only for Investors
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
