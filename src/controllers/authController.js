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

const changePassword = async (req, res) => {
  try {
    console.log("req.body : " , req.body )

    const { currentPassword, newPassword, confirmPassword , userId  } = req.body.formData ;
    
    console.log("curren : " ,currentPassword , "\n new pass : " , newPassword , "\n confirm : " ,confirmPassword , "\n userID : " , userId )
    // اعتبارسنجی فیلدهای ورودی
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'تمام فیلدها الزامی هستند'
      });
    }

    // بررسی طول رمز عبور جدید
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'رمز عبور جدید باید حداقل ۶ کاراکتر باشد'
      });
    }

    // بررسی تطابق رمز عبور جدید و تکرار آن
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'رمز عبور جدید و تکرار آن مطابقت ندارند'
      });
    }

    // بررسی اینکه رمز عبور جدید با رمز فعلی متفاوت باشد
    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: 'رمز عبور جدید باید با رمز عبور فعلی متفاوت باشد'
      });
    }

    // دریافت کاربر از طریق توکن (فرض می‌کنیم middleware احراز هویت کاربر را به req اضافه کرده)
    // const userId = req.user.id;
    
    // پیدا کردن کاربر در دیتابیس
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد'
      });
    }

    // بررسی رمز عبور فعلی
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'رمز عبور فعلی نادرست است'
      });
    }

    // هش کردن رمز عبور جدید
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // بروزرسانی رمز عبور در دیتابیس
    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    
    await user.save();

    // پاسخ موفقیت‌آمیز
    res.status(200).json({
      success: true,
      message: 'رمز عبور با موفقیت تغییر یافت'
    });

  } catch (error) {
    console.error('Error in changePassword:', error);
    
    // مدیریت خطاهای خاص
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'داده‌های ارسالی نامعتبر هستند'
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'شناسه کاربر نامعتبر است'
      });
    }

    // خطای عمومی سرور
    res.status(500).json({
      success: false,
      message: 'خطای سرور. لطفا بعدا تلاش کنید'
    });
  }
};


module.exports = {
  login, registerUser , logout , changePassword
};
