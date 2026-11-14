require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');

const seedAdmin = async () => {
  try {
    await connectDB();
    const adminEmail = process.env.ADMIN_EMAIL || 'uniquedental200@gmail.com';
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'unique123';

    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      admin = await User.create({
        name: 'Unique Dental Admin',
        email: adminEmail,
        password: adminPassword,
        phone: '+9779800000000',
        role: 'admin',
      });
      console.log('✅ Admin user created successfully!');
    } else {
      admin.role = 'admin';
      admin.password = adminPassword;
      await admin.save();
      console.log('✅ Existing admin user updated with new password!');
    }

    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
