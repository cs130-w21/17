import { Schema, model } from 'mongoose';

/**
 * @class Schema representing a User
 *      contains user's name, email, and a refreshToken which allows us
 *      to call Google API's on their behalf even when they are offline.
 *
 *
 * @type {module:mongoose.Schema<Document, Model<Document>, undefined>}
 */
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
