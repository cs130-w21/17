import React from 'react';
import { AppNavbar } from './components/AppNavbar';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {IAppProps, IAppState, IUser} from "./types/interfaces";

class App extends React.Component<IAppProps, IAppState> {

    constructor(props : IAppProps) {
        super(props);

        this.state = {
            isAuthenticated: false,
            user: null
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(user : IUser) : void {
        this.setState({
            isAuthenticated: true,
            user: user
        })
    }

    logout() : void {
        this.setState({
            isAuthenticated: false,
            user: null
        })
    }

    render() : any {
        return (
            <div className="App">
                <AppNavbar isAuthenticated={this.state.isAuthenticated}
                           user={this.state.user}
                           login={this.login}
                           logout={this.logout}
                />
                <Container>
                    <h1>Hello, world!</h1>
                </Container>
            </div>
        );
    }
}

export default App;
