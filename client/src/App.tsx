import React from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './flux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {AuthHandler} from "./components/auth/AuthHandler";
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
        console.log(user.fullName);
        this.setState({
            isAuthenticated: true,
            user: user
        })
    }

    logout() : void {
        console.log("Logged out");

        this.setState({
            isAuthenticated: false,
            user: null
        })
    }

    render() :any {
        return (
            <Provider store={store}>
                <div className="App">
                    <AppNavbar />
                    <Container>
                        <ItemModal />
                        <ShoppingList />
                    </Container>
                    <Container>
                        <AuthHandler isAuthenticated={this.state.isAuthenticated}
                                     login={this.login}
                                     logout={this.logout}/>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
