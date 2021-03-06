import { Router } from 'express';
import Invitation from '../../models/Invitation';
import User from '../../models/User';
import * as routeutils from "../utils/routeutils";
const router = Router();

/**
 * Get object id of invitation, and use the id to search the refresh token from the database.
 *
 * @route   {POST} api/invitationpage
 * @access  public
 */
router.route('/accessToken').post(async (req, res) => {
    //get objectid from front end
    const id = req.body.id;

    /**
    * use id to find the email from mongodb database.
    */
    Invitation.findOne({'_id': String(id)}, async (err, result) => {
        try {
            if(err) {
                throw err;
            }
            //check if the invitation still exists
            if(result == null){
                res.status(200).json({
                    accessToken: null,
                    profile: null,
                    expired: true
                });
                return;
            }

            if(Date.now() >= result.expiration_date)
            {
                /**
                 * if the invitation is expired, delete the invitation from the database.
                 */
                Invitation.deleteOne({'_id': String(id)}, async (err, result) => {
                    if(err) {
                        throw err;
                    }
                });
                res.status(200).json({
                    accessToken: null,
                    profile: null,
                    expired: true
                });
                return;
            }
            const email = result.inviter_email;
            const invitee_email = result.invitee_email;
            const invitee_name = result.invitee_name;

            /**
             * use email to find token
             */
            User.findOne({'email': String(email)}, async (err, result) => {
                if(err) {
                    throw err;
                }
                if(result == null){
                    /**
                     * If we cannot find such a user using the id, delete the invitation from the database.
                     */
                    Invitation.deleteOne({'_id': String(id)}, async (err, result) => {
                        if(err) {
                            throw err;
                        }
                    });
                    res.status(200).json({
                        accessToken: null,
                        profile: null,
                        expired: true
                    });
                    return;
                }
                const token = result.refreshToken;
                const accessToken = await routeutils.getAccessToken(token);
                const userProfile = await routeutils.getUserProfile(accessToken);
                //construct the return body
                res.status(200).json({
                    accessToken: accessToken,
                    profile: userProfile,
                    inviteeEmail: invitee_email,
                    inviteeName: invitee_name,
                    expired: false
                });
            });
        }
        catch (e) {
            res.status(400).json({message: e});
        }
    });
});


export default router;