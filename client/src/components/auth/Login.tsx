import React from "react";
import {GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {IUser, ILoginProps, ILoginState} from "../../types/interfaces";
import {OAUTH_CLIENT_ID} from "./AuthConstants";


/**
 * Handles logging in and creates the user object, which is passed up
 * to parent components.
 */
class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props : ILoginProps) {
        super(props);

        this.googleResponse = this.googleResponse.bind(this);
    }

    googleResponse (response : GoogleLoginResponse | GoogleLoginResponseOffline) : void {
        //checking if GoogleLoginResponse
        if ("getBasicProfile" in response) {
            const profile = response.getBasicProfile();

            const user : IUser = {
                id: profile.getId(),
                fullName : profile.getName(),
                givenName : profile.getGivenName(),
                familyName : profile.getFamilyName(),
                imageURL : profile.getImageUrl(),
                email : profile.getEmail()
            };

            this.props.login(user);
        }
    }

    render() : any {
        return (
            <GoogleLogin
                clientId={OAUTH_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
                cookiePolicy={'single_host_origin'}
            />
        );
    }
}



export { Login };


