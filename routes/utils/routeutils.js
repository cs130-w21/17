const { google } = require('googleapis');
import axios from "axios";
import config from "../../config";

const {OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REDIRECT_URI} = config;
const profileRequestPrefix = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";
const tokenRequestURL = "https://www.googleapis.com/oauth2/v4/token";

/**
 * A helper function which builds a Google OAuth2Client.
 * @returns {OAuth2Client} - The new Oauth2Client.
 */
export function createOauthClient() {
    return new google.auth.OAuth2(
        OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET,
        OAUTH_REDIRECT_URI
    );
}

/**
 * A helper function which gets a user profile from an OAuth2Client.
 * @param accessToken {String} - The access token.
 * @returns {UserProfile} - The user object. No type defined.
 */
export async function getUserProfile(accessToken) {
    const requestURL = `${profileRequestPrefix}${accessToken}`;

    try {
        const response = await axios.get(requestURL);
        return response.data;
    } catch (err) {
        throw err;
    }
}

/**
 * A helper function which takes a refresh token and uses it to retreive an access token.
 * @param refreshToken {String} - The refresh token.
 * @returns accessToken {String} - The new access token.
 */
export async function getAccessToken(refreshToken) {
    const req = {
        client_id: OAUTH_CLIENT_ID,
        client_secret: OAUTH_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
    };

    try {
        const response = await axios.post(tokenRequestURL, req);
        return response.data["access_token"];
    } catch (err) {
        throw err;
    }
}