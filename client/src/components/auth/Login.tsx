import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { IUser, ILoginProps, ILoginState } from '../../types/interfaces';
import { OAUTH_CLIENT_ID } from './AuthConstants';
import { createUserFromServerResponse } from '../utils/utils';
import axios from 'axios';

/**
 * Handles logging in and creates the user object, which is passed up
 * to parent components. Acts as an Adapter for the react-google-login
 * GoogleLogin component.
 */
class Login extends React.Component<ILoginProps, ILoginState> {
  /**
   * Calls super constructor and binds class methods.
   * @param props - Contains the login callback function.
   */
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      failedLogin: false,
    };

    this.successfulGoogleLogin = this.successfulGoogleLogin.bind(this);
    this.failedGoogleLogin = this.failedGoogleLogin.bind(this);
  }

  /**
   * Handles a successful Google Login. Creates the user through a backend call if
   * it is the first time they've logged in, otherwise it just gets an access token.
   * Uses the login callback from props to update application state.
   * @param response {GoogleLoginResponseOffline} - Contains an authorization code
   *    which can be used to get an access token and refresh token. The parameter
   *    will never be of type GoogleLoginResponse because we are only requesting
   *    Offline access, but it is required to define it like
   *    this because the API from the GoogleLogin button specifies it this way.
   */
  successfulGoogleLogin(
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void {
    this.setState({
      failedLogin: false,
    });

    const req = { code: response.code };

    axios
      .post('/api/auth/register', req)
      .then((res) => {
        const user: IUser = createUserFromServerResponse(res);

        this.props.login(user);
      })
      .catch((err) => {
        console.log('an error occurred ' + err);
      });
  }

  /**
   * Handles a failed Login attempt. Updates the state
   */
  failedGoogleLogin() {
    this.setState({
      failedLogin: true,
    });
  }

  /**
   * Renders the GoogleLogin component. Conditionally renders
   * a failure message if the Login fails.
   */
  render(): any {
    return (
      <GoogleLogin
        clientId={OAUTH_CLIENT_ID}
        buttonText="Login"
        scope="https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
        onSuccess={this.successfulGoogleLogin}
        onFailure={this.failedGoogleLogin}
        cookiePolicy={'single_host_origin'}
        responseType="code"
        accessType="offline"
      />
    );
  }
}

export { Login };
