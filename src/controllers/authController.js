const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ username }).select('+password');
    console.log("user : " , user )
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken({ userId: user._id, username: user.username });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        firstName:user.firstName , 
        lastName : user.lastName , 
        roles : user.roles , 
        image:user.profileImageUrl , 
        score:user.score , 
        devOps: user.devOps , 
        userProject:user.userProject
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      devOps,
      security,
      qualityAssurance
    } = req.body;

    // ✅ Validate inputs
    if (!username || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'تمام فیلدهای الزامی باید پر شوند.' });
    }

    // ✅ Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'نام کاربری قبلاً ثبت شده است.' });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Handle uploaded profile image (from multer)
    let profileImageUrl = '';
    if (req.file) {
      // Normalize the file path to be web-accessible
      profileImageUrl = path.join('upload/users/profile', req.file.filename);
    }

    // ✅ Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      devOps: devOps === 'true' || devOps === true,
      security: security === 'true' || security === true,
      qualityAssurance: qualityAssurance === 'true' || qualityAssurance === true,
      profileImageUrl,
    });

    // ✅ Save user
    await newUser.save();

    // ✅ Response
    res.status(201).json({
      message: 'ثبت‌نام با موفقیت انجام شد.',
      user: {
        id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        devOps: newUser.devOps,
        security: newUser.security,
        qualityAssurance: newUser.qualityAssurance,
        profileImageUrl: newUser.profileImageUrl,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'خطا در ثبت‌نام کاربر.' });
  }
};


const logout = async (req , res )=>{

  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out successfully.' });

}


module.exports = {
  login, registerUser , logout
};
