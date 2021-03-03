import { Router } from 'express';
import Invitation from '../../models/Invitation';
import User from '../../models/User';
import * as routeutils from "../utils/routeutils";
const router = Router();


router.route('/accessToken').post(async (req, res) => {
    //get objectid from front end
    const id = req.body.id;

    //use id to find the email from mongodb database.
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
            //check the dates to see if it is expired
            if(Date.now() >= result.expiration_date)
            {

                res.status(200).json({
                    accessToken: null,
                    profile: null,
                    expired: true
                });
                return;
            }
            const email = result.inviter_email;
            const invitee_email = result.invitee_email;
            //use email to find token
            User.findOne({'email': String(email)}, async (err, result) => {
                if(err) {
                    throw err;
                }

                const token = result.refreshToken;
                const accessToken = await routeutils.getAccessToken(token);
                const userProfile = await routeutils.getUserProfile(accessToken);

                res.status(200).json({
                    accessToken: accessToken,
                    profile: userProfile,
                    inviteeEmail: invitee_email,
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