import { model, Schema } from 'mongoose';

const schoolSchema = new Schema(
  {
    schoolName: {
      type: String,
      required: [true, 'School name is required'],
      maxLength: [500, 'School name cannot exceed more than 500 characters'],
      index: true,
      trim: true,
    },
    schoolEmail: {
      type: String,
      required: [true, 'School email is required'],
      maxLength: [255, 'Email cannot exceed more than 255 characters'],
      trim: true,
      lowercase: true,
      index: true,
    },
    district: {
      type: String,
      required: [true, 'District name is required'],
      maxLength: [120, 'District name cannot exceed more than 120 characters'],
      index: true,
      trim: true,
    },
    street: {
      type: String,
      required: [true, 'Street address is required'],
      maxLength: [500, 'Street address cannot exceed more than 500 characters'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      maxLength: [120, 'City name cannot exceed more than 120 characters'],
      trim: true,
      index: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      maxLength: [120, 'State name cannot exceed more than 120 characters'],
      trim: true,
      index: true,
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      maxLength: [6, 'Pincode must be 6 digits'],
      minLength: [6, 'Pincode must be 6 digits'],
      trim: true,
    },
    board: {
      type: String,
      required: [true, 'Board name is required'],
      maxLength: [120, 'Board name cannot exceed more than 120 characters'],
      index: true,
      trim: true,
    },
    authorizedPersonName: {
      type: String,
      required: [true, 'Authorized person name is required'],
      maxLength: [120, 'Authorized person name cannot exceed more than 120 characters'],
      index: true,
      trim: true,
    },
    authorizedPersonEmail: {
      type: String,
      required: [true, 'Authorized person email is required'],
      maxLength: [255, 'Email cannot exceed more than 255 characters'],
      trim: true,
      lowercase: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      maxLength: [120, 'Designation cannot exceed more than 120 characters'],
      trim: true,
    },
    phoneNo: {
      type: String,
      required: [true, 'Phone number is required'],
      maxLength: [10, 'Phone number cannot exceed more than 10 characters'],
      minLength: [10, 'Phone number must be 10 digits'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const School = model('School', schoolSchema);
export default School;
