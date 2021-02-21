import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { IUser, ILoginProps, ILoginState } from '../../types/interfaces';
import { OAUTH_CLIENT_ID } from './AuthConstants';
import { Container } from 'reactstrap';

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
   * Handles a successful Google Login. Creates the user,
   * and uses the login callback from props to update application state.
   * @param response - Contains information about the Google User.
   *          passed in via the GoogleLogin component.
   */
  successfulGoogleLogin(
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void {
    this.setState({
      failedLogin: false,
    });

    //checking if GoogleLoginResponse
    if ('getBasicProfile' in response) {
      const profile = response.getBasicProfile();

      const user: IUser = {
        id: profile.getId(),
        fullName: profile.getName(),
        givenName: profile.getGivenName(),
        familyName: profile.getFamilyName(),
        imageURL: profile.getImageUrl(),
        email: profile.getEmail(),
        refreshToken: response.accessToken,
      };

      this.props.login(user);
    }
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
      <>
        <GoogleLogin
          clientId={OAUTH_CLIENT_ID}
          buttonText="Login"
          scope="https://www.googleapis.com/auth/calendar"
          onSuccess={this.successfulGoogleLogin}
          onFailure={this.failedGoogleLogin}
          cookiePolicy={'single_host_origin'}
        />
        {this.state.failedLogin ? (
          <p className="loginfail">Login failed...</p>
        ) : (
          ''
        )}
      </>
    );
  }
}

export { Login };
