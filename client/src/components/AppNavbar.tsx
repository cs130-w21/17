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

class AppNavbar extends React.Component<INavbarProps, INavbarState> {
    constructor(props : INavbarProps) {
        super(props);

        this.state = {
            isOpen: true
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() : void {
        this.setState({
        isOpen: !this.state.isOpen
      });
    }

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