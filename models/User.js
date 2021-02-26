import { Schema, model } from 'mongoose';

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  refreshToken: {
    type: String,
    required: true
  }
});

const User = model('user', UserSchema);

export default User;
