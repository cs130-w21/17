import { Router } from 'express';
import * as routeutils from "../utils/routeutils";
import User from "../../models/User";

const router = Router();


/**
 * Registers a user if they don't exist and returns user info with access token.
 *
 * @name Register
 * @route {POST} api/auth
 * @routeparam {request} req - Should contain a single field of code, which is the access code
 *    given by the GoogleResponseOffline from the Google Login component. Will be exchanged for
 *    an access token, and if it is the user's first time logging in, a refresh token.
 */

router.post('/register', async (req, res) => {
  try {
    const oauth2Client = routeutils.createOauthClient();
    const code = req.body["code"];

    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const refreshToken = tokens.refresh_token;
    const accessToken = tokens.access_token;

    const userProfile = await routeutils.getUserProfile(accessToken);

    //If refresh token exists, then this is a new user.
    if(refreshToken) {
      const firstName = userProfile.given_name;
      const lastName = userProfile.family_name;
      const email = userProfile.email;

      const newUser = new User({
        firstName,
        lastName,
        email,
        refreshToken
      });

      //Save user to db
      newUser.save()
          .then(() => console.log("Successfully added user."))
          .catch(err => {
            console.log(err);
          });
    }

    res.status(200).json({
        accessToken: tokens.access_token,
        profile: userProfile
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ data: e.message });
  }
});


/**
 * Exchanges a refresh token for an access token.
 *
 * @name accessToken
 * @route {POST} api/auth
 * @routeparam {request} req - Should contain a single field of refreshToken.
 *    Should be retreived from the database. Exchanges it for an access token.
 */
router.post('/accessToken', async (req, res) => {
  try {
    const refreshToken = req.body["refreshToken"];

    const accessToken = await routeutils.getAccessToken(refreshToken);

    res.status(200).json({accessToken: accessToken});
  } catch(e) {
    res.status(400).json({ data: e.message });
  }
});


export default router;
