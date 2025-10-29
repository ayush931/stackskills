import { model, Schema } from "mongoose";

const studentSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    maxLength: [120, 'Name cannot exceed more than 120 characters'],
    trim: true,
    index: true
  },
  email: {
    type: String,
    maxLength: [255, 'Email cannot exceed more than 255 characters'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    maxLength: [10, 'Phone number cannot exceed more than 10 characters'],
    minLength: [10, 'Phone number must be 10 digits'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  school: {
    type: String,
    required: [true, 'School name is required'],
    maxLength: [500, 'School name cannot exceed more than 500 characters'],
    index: true,
    trim: true
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    maxLength: [20, 'Grade cannot exceed more than 20 characters'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxLength: [500, 'Address cannot exceed more than 500 characters'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    maxLength: [120, 'City name cannot exceed more than 120 characters'],
    trim: true,
    index: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    maxLength: [120, 'State name cannot exceed more than 120 characters'],
    trim: true,
    index: true
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    maxLength: [6, 'Pincode must be 6 digits'],
    minLength: [6, 'Pincode must be 6 digits'],
    trim: true
  },
}, {
  timestamps: true
})

const Student = model('Student', studentSchema);
export default Student;