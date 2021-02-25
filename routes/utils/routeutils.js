const {google} = require('googleapis');
import axios from "axios";
import config from "../../config";

/**
 * A helper function which builds a Google OAuth2Client.
 * @returns {OAuth2Client}
 */
export function createOauthClient() {
    const {OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REDIRECT_URI} = config;

    return new google.auth.OAuth2(
        OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET,
        OAUTH_REDIRECT_URI
    );
}

/**
 * A helper function which gets a user profile from an OAuth2Client.
 * @param accessToken {string} - The Oauth2Client.
 * @returns {User object} - The user object. No type defined.
 */
export async function getUserProfile(accessToken) {
    const requestPrefix = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";
    const requestURL = `${requestPrefix}${accessToken}`;
    console.log("URL " + requestURL);

    const req = axios.get(requestURL);

    try {
        const response = await axios.get(requestURL);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}