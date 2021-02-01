import React from "react";
import {IAuthHandlerProps, IAuthHandlerState} from "../../types/interfaces";
import {Login} from "./Login";
import {Logout} from "./Logout";


/**
 * A class which handles rendering the login and logout buttons.
 */
class AuthHandler extends React.Component<IAuthHandlerProps, IAuthHandlerState> {
    constructor(props : IAuthHandlerProps) {
        super(props);

        this.state = {}
    }

    render() : any {
        return (
            <div>
                {this.props.isAuthenticated ?
                    <Logout logout={this.props.logout}/>
                    :
                    <Login login={this.props.login}/>
                }
            </div>
        );
    }
}

export { AuthHandler };