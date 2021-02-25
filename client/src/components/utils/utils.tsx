import { IUser } from "../../types/interfaces";

/**
 * Helper function which creates a user from a server response.
 * Expects the response to be in the format shown below.
 * @param res {any} - The response from the server.
 */
export function createUserFromServerResponse(res: any) {
    const user: IUser = {
        id: res.data.profile.id,
        fullName: `${res.data.profile.given_name} ${res.data.profile.family_name}`,
        givenName: res.data.profile.given_name,
        familyName: res.data.profile.family_name,
        email: res.data.profile.email,
        imageURL: res.data.profile.picture,
        accessToken: res.data.accessToken
    };

    return user;
}