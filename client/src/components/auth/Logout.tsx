import React from 'react';
import {ILogoutProps, ILogoutState} from '../../types/interfaces';

import { GoogleLogout } from 'react-google-login';
import {OAUTH_CLIENT_ID} from "./AuthConstants";

/**
 * Handles logging out a user, and updates the app's state through
 * the logout prop passed to it.
 */
class Logout extends React.Component<ILogoutProps, ILogoutState> {
    constructor(props : ILogoutProps) {
        super(props);

        this.state = {};
    }

    /**
     * Renders the GoogleLogout component.
     * Passes the logout callback function as a prop to
     * the logout component so that it can notify the app.
     */
    render () : any {
        return (
            <GoogleLogout
                clientId={OAUTH_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.logout}
            />
        );
    }
}

export { Logout };