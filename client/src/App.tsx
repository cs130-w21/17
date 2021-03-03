import React from 'react';
import { AppNavbar } from './components/AppNavbar';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { IAppProps, IAppState, IUser } from './types/interfaces';

import { PAGES } from './components/pages/PageConstants';
import { HomePage } from './components/pages/HomePage';
import { InvitationPage } from './components/pages/InvitationPage';
import { CalendarPage } from "./components/pages/CalendarPage";

/**
 * The super component for the entire application. Handles passing
 * state to all components, such as user login/logout. Also handles
 * setting up the router for routing to different links depending on
 * the current URL.
 */
class App extends React.Component<IAppProps, IAppState> {
    /**
     * Call super constructor and set initial state such that
     * there is no user. Bind methods.
     * @param props - Default props passed in by React.
     */
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  /**
   * Logs in a user by setting the overall state of the app.
   * @param user - the user to be logged in.
   */
  login(user: IUser): void {
    this.setState({
      isAuthenticated: true,
      user: user,
    });
  }

  /**
   * Logs a user out by changing the state of the app.
   */
  logout(): void {
    this.setState({
      isAuthenticated: false,
      user: null,
    });
  }

  /**
   * Handles rendering which page depending on the URL. Also
   * renders the Navbar. Handles state by passing in information
   * about the user to all components.
   */
  render(): any {
    return (
      <div className="App">
          <Router>
            <AppNavbar
                isAuthenticated={this.state.isAuthenticated}
                user={this.state.user}
                login={this.login}
                logout={this.logout}
            />
            
                <Route
                  exact
                  path={PAGES.HOME_PAGE}
                  render={(props) => (
                    <HomePage
                      {...props}
                      user={this.state.user}
                      isAuthenticated={this.state.isAuthenticated}
                    />
                  )}
                />
            <Container>
                <Route
                  exact
                  path={PAGES.INVITATION_PAGE}
                  render={(props) => (
                      <InvitationPage
                          {...props}
                          user={this.state.user}
                          isAuthenticated={this.state.isAuthenticated}
                      />
                  )}
                />
                <Route
                    exact
                    path={PAGES.CALENDAR_PAGE}
                    render={(props) => (
                        <CalendarPage
                            {...props}
                            user={this.state.user}
                            isAuthenticated={this.state.isAuthenticated}
                        />
                    )}
                />
            </Container>
          </Router>
      </div>
    );
  }
}

export default App;
