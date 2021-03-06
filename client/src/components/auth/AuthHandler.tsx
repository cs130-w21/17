import React from "react";
import {IAuthHandlerProps, IAuthHandlerState} from "../../types/interfaces";
import {Login} from "./Login";
import {Logout} from "./Logout";


/**
 * A class which handles rendering the login and logout buttons.
 * Deals with conditionally rendering the Login/Logout and passing
 * the correct props to them.
 */
class AuthHandler extends React.Component<IAuthHandlerProps, IAuthHandlerState> {
    /**
     * Call super constructor and initialize empty state.
     * @param props - Contains information about the user, as
     * well as callback functions for setting the App state.
     */
    constructor(props : IAuthHandlerProps) {
        super(props);

        this.state = {};
    }

    /**
     * Conditionally renders the Login/Logout components.
     * If the user is logged in, render the Logout button.
     * Otherwise, renders a Login button.
     */
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