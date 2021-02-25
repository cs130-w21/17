import { Router } from 'express';
import * as routeutils from "../utils/routeutils";
import User from "../../models/User";

const router = Router();


/**
 * Registers a user if they don't exist and returns user info with access token.
 *
 * @name Register
 * @route {POST} api/users
 */

router.post('/register', async (req, res) => {
  try {
    const oauth2Client = routeutils.createOauthClient();
    const code = req.body["code"];
    console.log("code: " + code);

    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const refreshToken = tokens.refresh_token;
    const accessToken = tokens.access_token;

    console.log("refresh " + refreshToken);
    console.log("access " + tokens.access_token);

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

      console.log("saving new user");

      //Save user to db
      newUser.save()
          .then(() => console.log("Successfully added user."))
          .catch(err => {
            console.log(err);
          });
    }

    console.log("got here");
    console.log(userProfile);

    res.status(200).json({
        accessToken: tokens.access_token,
        profile: userProfile
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ data: e.message });
  }
});


export default router;
