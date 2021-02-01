import React from 'react';
import {ILogoutProps, ILogoutState} from '../../types/interfaces';

import { GoogleLogout } from 'react-google-login';
import {OAUTH_CLIENT_ID} from "./AuthConstants";

class Logout extends React.Component<ILogoutProps, ILogoutState> {
    constructor(props : ILogoutProps) {
        super(props);

        this.state = {}
    }

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