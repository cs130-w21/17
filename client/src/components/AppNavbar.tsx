import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    Container
} from 'reactstrap';

import { Link } from 'react-router-dom';

import { INavbarProps, INavbarState } from '../types/interfaces';
import { AuthHandler } from "./auth/AuthHandler";
import { PAGES } from "./pages/PageConstants";

/**
 * The navbar of the app. Contains the login button as well
 * as links to different pages.
 */
class AppNavbar extends React.Component<INavbarProps, INavbarState> {
    /**
     * Call super constructor and initialize state. Setting isOpen to
     * true so that the navbar won't be collapsed like a mobile app.
     * @param props - Contains information about the user.
     */
    constructor(props : INavbarProps) {
        super(props);

        this.state = {
            isOpen: true
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    /**
     * Handles the toggling of the navbar. Opens/closes it.
     */
    handleToggle() : void {
        this.setState({
        isOpen: !this.state.isOpen
      });
    }

    /**
     * Renders the Login/Logout button as well as the various link.
     * Conditionally renders some links depending on whether user
     * is logged in/out.
     */
    render() : any {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="navbar">
                    <Container>
                        <NavbarToggler onClick={this.handleToggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <AuthHandler isAuthenticated={this.props.isAuthenticated}
                                         login={this.props.login}
                                         logout={this.props.logout}
                            />
                            <Link to={PAGES.HOME_PAGE}>Home</Link>
                            {this.props.isAuthenticated? <Link to={PAGES.CALENDAR_PAGE}>My Calendar</Link> : ''}
                            <Nav className="ml-auto" navbar>
                                <p>{this.props.isAuthenticated && this.props.user ? `Welcome, ${this.props.user.givenName}` : ''}</p>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export { AppNavbar };