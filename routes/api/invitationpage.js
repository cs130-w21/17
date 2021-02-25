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

            const email = result.inviter_email;

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
                    profile: userProfile
                });
            });
        }
        catch (e) {
            res.status(400).json({message: e});
        }
    });
});


export default router;