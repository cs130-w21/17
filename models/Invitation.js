import { Schema, model } from 'mongoose';

/**
 * @class Schema representing an Invitation
 *      includes invitee_name, invitee_email, inviter_email
 *      and expiration_date (defaulted to a week from now)
 *
 * MONGODB automatically creates an id for Invitation documents
 *
 * @type {module:mongoose.Schema<Document, Model<Document>, undefined>}
 */
const InvitationSchema = new Schema({
    invitee_name: {
        type: String,
        required: true
    },
    invitee_email:{
        type: String,
        required: true
    },
    inviter_email:{
        type: String,
        required: true
    },
    expiration_date: {
        type: Date,
        default: Date.now() + 6.048e+8
    }
});

const Invitation = model('Invitation', InvitationSchema);

export default Invitation;
