import { model, Schema, models } from "mongoose";

const organizationSchema = new Schema({
  organizationName: {
    type: String,
    required: [true, 'Organization name is required'],
    maxLength: [500, 'Organization name cannot exceed more than 500 characters'],
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxLength: [255, 'Email cannot exceed more than 255 characters'],
    trim: true,
    lowercase: true,
    index: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    maxLength: [10, 'Phone number cannot exceed more than 10 characters'],
    minLength: [10, 'Phone number must be 10 digits'],
    trim: true
  },
  website: {
    type: String,
    maxLength: [500, 'Website URL cannot exceed more than 500 characters'],
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
  contactPersonName: {
    type: String,
    required: [true, 'Contact person name is required'],
    maxLength: [120, 'Contact person name cannot exceed more than 120 characters'],
    trim: true,
    index: true
  },
  contactPersonDesignation: {
    type: String,
    required: [true, 'Contact person designation is required'],
    maxLength: [120, 'Designation cannot exceed more than 120 characters'],
    trim: true
  },
  contactPersonEmail: {
    type: String,
    required: [true, 'Contact person email is required'],
    maxLength: [255, 'Email cannot exceed more than 255 characters'],
    trim: true,
    lowercase: true
  },
  contactPersonPhone: {
    type: String,
    required: [true, 'Contact person phone is required'],
    maxLength: [10, 'Phone number cannot exceed more than 10 characters'],
    minLength: [10, 'Phone number must be 10 digits'],
    trim: true
  }
}, {
  timestamps: true
})

const Organization = model('Organization', organizationSchema);
export default Organization;