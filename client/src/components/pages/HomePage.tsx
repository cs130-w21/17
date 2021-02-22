import React, { ReactNode, SyntheticEvent } from 'react';
import { HomePageProps, HomePageState } from '../../types/interfaces';
import axios from 'axios';
import { calendar } from 'googleapis/build/src/apis/calendar';
import { Demo } from '../calendar/Demo';
/**
 * This class serves as the Home Page of the application.
 */
class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderschedular = this.renderschedular.bind(this);
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
  public renderschedular() {
    if (this.props.isAuthenticated) {
      return <Demo></Demo>;
    } else {
      return <div></div>;
    }
  }
  render(): any {
    return <div>{this.renderschedular()}</div>;
  }
}

export { HomePage };
