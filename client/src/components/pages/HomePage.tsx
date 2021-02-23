import React from 'react';
import { HomePageProps, HomePageState } from '../../types/interfaces';
import SyncedCalender from '../calendar/SyncedCalender';
/**
 * This class serves as the Home Page of the application.
 */
class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.renderschedular = this.renderschedular.bind(this);
    this.state = {};
  }

  public renderschedular() {
    if (this.props.isAuthenticated) {
      return (
        <SyncedCalender
          user={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
        ></SyncedCalender>
      );
    } else {
      return <div></div>;
    }
  }
  render(): any {
    return <div>{this.renderschedular()}</div>;
  }
}

export { HomePage };
