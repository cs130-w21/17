import React, { ReactNode, SyntheticEvent } from 'react';
import { HomePageProps, HomePageState } from '../../types/interfaces';
import axios from 'axios';
/**
 * This class serves as the Home Page of the application.
 */
class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderbutton = this.renderbutton.bind(this);
    this.state = {};
  }
  public handleItemClick(event: SyntheticEvent<any>, name: string): void {
    if (name === 'add-event') {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const body = JSON.stringify({ token: this.props.user?.refreshToken });
      axios.post('/api/calendar/action', body, config);
    }
  }
  public renderbutton() {
    if (this.props.isAuthenticated) {
      return (
        <button onClick={(e) => this.handleItemClick(e, 'add-event')}>
          add-event
        </button>
      );
    } else {
      return <div></div>;
    }
  }
  render(): any {
    return (
      <div>
        <h1>HomePage!</h1>
        <div>{this.renderbutton()}</div>
      </div>
    );
  }
}

export { HomePage };
