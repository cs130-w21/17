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
      inviteeName:null,
      success: false,
      error: false,
      isExpired: false,
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
  getId(): string {
    let search = this.getUrlParams();
    return search.get('id') || '';
  }

  getUrlParams(): URLSearchParams {
    if (!this.props.location.search) return new URLSearchParams();
    return new URLSearchParams(this.props.location.search);
  }

  sendConfirmation(): void{
    console.log("sending Confirmation function");

    const email_info={
      invitee_name: this.state.inviteeName,
      invitee_email: this.state.inviteeEmail,
      inviter_name: this.state.inviterProfile?.fullName,
      inviter_email: this.state.inviterProfile?.email
      // How do I access calendar info?
    }

    console.log("email info");
    console.log(email_info);


    axios.post('/api/confirmation/added', email_info)
        .then((res) => {
          console.log('email confirmation sent');
        })
        .catch(err => {
          console.log('Error with confirmation backend', err);
        });

  }

  public renderScheduler(): any {
    if (this.state.success) {
      this.sendConfirmation()
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
          if (res.data.expired === true) {
            console.log(res.data.expired);
            this.setState({ isExpired: true });
          } else {
            const inviter: IUser = createUserFromServerResponse(res);
            this.setState({
              inviterProfile: inviter,
              inviteeEmail: res.data.inviteeEmail,
              inviteeName: res.data.inviteeName
            });
          }
        }, 5000);
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log('Error with backend', err);
      });
  }

  render(): any {
    if (this.state.isExpired || this.state.inviterProfile == null) {
      return <div>This Invitation has expired. Please make another one.</div>;
    } else {
      return <div>{this.renderScheduler()}</div>;
    }
  }
}

export { InvitationPage };
