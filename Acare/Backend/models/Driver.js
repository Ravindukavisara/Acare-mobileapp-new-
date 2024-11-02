// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const driverSchema = new Schema({
//     userId: {
//         type : String,
//         required: true,
//     },
//     driver_name: {
//         type : String,
//         required: true
//     },
//     hospitalId : {
//         type : String,
//         required: true
//     },
//     contact_no : {
//         type : Number,
//         required: true
//     }
// });

// const Driver = mongoose.model('Driver', driverSchema);
// module.exports = Driver;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const driverSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Driver ID is required'],
    unique: true,
    trim: true
  },
  hospitalId: {
    type: String,
    required: [true, 'Hospital ID is required'],
    trim: true
  },
  driver_name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  nicNumber: {
    type: String,
    trim: true,
    sparse: true
  },
  contact_no: {
    type: String,
    trim: true,
    sparse: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    sparse: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  isRegistered: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

driverSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

driverSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Driver', driverSchema);