import React from 'react';
import {
  InvitationPageProps,
  InvitationPageState,
  IUser,
} from '../../types/interfaces';
import { createUserFromServerResponse } from '../utils/utils';
import axios from 'axios';
import InviteeCalender from '../calendar/InviteeCalender';
/**
 * This class serves as the invitation page for the application.
 * The invitee will be able to view the inviter's schedule here.
 */

class InvitationPage extends React.Component<
  InvitationPageProps,
  InvitationPageState
> {
  constructor(props: InvitationPageProps) {
    super(props);
    this.state = {
      inviterProfile: null,
      inviteeProfile: this.props.user,
      inviteeEmail: null,
      success: false,
      error: false,
      isExpired: false,
      isLoading: true
    };

    this.setSuccess = this.setSuccess.bind(this);
    this.getId = this.getId.bind(this);
  }

  componentDidMount(): void {
    this.getData();
  }
  setSuccess(): void {
    this.setState({ success: true });
  }
  /**
   * Search and get the object id from the invitationpage url.
   */
  getId(): string {
    let search = this.getUrlParams();
    return search.get('id') || '';
  }
  /**
   * get the url.
   */
  getUrlParams(): URLSearchParams {
    if (!this.props.location.search) return new URLSearchParams();
    return new URLSearchParams(this.props.location.search);
  }

  /**
   * show the loading page
   * show the calendar if the invitation id is valid
   * show the error if the invitation id is invalid
   * show the success page after the appointment is added
   */
  public renderScheduler(): any {
    if (this.state.success) {
      return <p>Successfully added an event to the calender.</p>;
    } else if (
      this.state.inviterProfile != null &&
      this.state.inviteeEmail != null
    ) {
      return (
        <InviteeCalender
          user={this.state.inviterProfile}
          isAuthenticated={this.props.isAuthenticated}
          inviteeEmail={this.state.inviteeEmail}
          setSuccess={this.setSuccess}
          getId={this.getId}
        />
      );
    } else if (this.state.error) {
      return <p>invalid invite Link</p>;
    } else {
      return <p>Loading...</p>;
    }
  }

  getData() {
    const i = {
      id: this.getId(),
    };

    axios
      .post('/api/invitationpage/accessToken', i)
      .then((res) => {
        setTimeout(() => {
          //set expired to ture if the invitation is expired, otherwise set up the inviter's info
          this.setState({isLoading: false});
          if (res.data.expired === true) {
            this.setState({ isExpired: true });
          } else {
            const inviter: IUser = createUserFromServerResponse(res);
            this.setState({
              inviterProfile: inviter,
              inviteeEmail: res.data.inviteeEmail,
            });

          }
        }, 5000);
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log('Error with backend', err);
      });
  }

  /**
   * call the the renderscheduler if the invitation is valid and not expired.
   */
  render(): any {
    if(this.state.error == true){
      return <div>Invalid Invitation ID.</div>;
    }
    if(this.state.isLoading == true){
      return <div>loading...</div>;
    }
    if (this.state.isExpired || this.state.inviterProfile == null) {

      return <div>This Invitation is invalid or expired. Please make another one.</div>;
    } else {
      return <div>{this.renderScheduler()}</div>;
    }
  }
}

export { InvitationPage };
