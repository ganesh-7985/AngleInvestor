const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { fullName, email, password, typeOfUser, companyName, mentorshipFee } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      fullName,
      email,
      password: hashedPassword,
      typeOfUser,
      companyName: typeOfUser === 'Founder' ? companyName : null,
      mentorshipFee: typeOfUser === 'Investor' ? mentorshipFee : null,
    });

    await user.save();
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600000 // 1 hour in milliseconds
    });

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({msg:'Server error', error});
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000 // 1 hour
    });

    // Include the user's role in the response
    res.status(200).json({ 
      message: 'Logged in successfully', 
      token, 
      role: user.typeOfUser // Return the role to the frontend (either 'Founder' or 'Investor')
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};