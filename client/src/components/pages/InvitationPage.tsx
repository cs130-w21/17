import React from 'react';
import {
  InvitationPageProps,
  InvitationPageState,
  IUser,
} from '../../types/interfaces';
import { createUserFromServerResponse } from '../utils/utils';
import axios from 'axios';
import InviteeCalender from '../calendar/InviteeCalender';
import { SchedulerDateTime } from '@devexpress/dx-react-scheduler';
import { Confirmation } from '../miscellaneous/Confirmation';
import { Error } from '../miscellaneous/Error';
import { Loading } from '../miscellaneous/Loading';

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
      inviteeName: null,
      success: false,
      error: false,
      isExpired: false,
      isLoading: true,
    };

    this.setSuccess = this.setSuccess.bind(this);
    this.getId = this.getId.bind(this);
    this.sendConfirmation = this.sendConfirmation.bind(this);
  }


  /**
   * This function is called automatically when constructing.
   */

  componentDidMount(): void {
    this.getData();
  }

  /**
   * set the success state to true.
   */
  setSuccess(): void {
    this.setState({ success: true });
  }

  /**
   * get the id string from url.
   */
  getId(): string {
    let search = this.getUrlParams();
    return search.get('id') || '';
  }


  /**
   * get the url string from the website.
   */
  getUrlParams(): URLSearchParams {
    if (!this.props.location.search) return new URLSearchParams();
    return new URLSearchParams(this.props.location.search);
  }

  /**
   * Sends the inviter and invitee's names and emails,
   * as well as the new event info (time and location)
   * to backend.
   *
   * (backend sends confirmation email to inviter and invitee
   * for added event.)
   *
   * @param start event start time
   * @param end event end time
   * @param location name of location
   */
  sendConfirmation(
    start: SchedulerDateTime,
    end: SchedulerDateTime,
    location: string
  ): void {
    const email_info = {
      invitee_name: this.state.inviteeName,
      invitee_email: this.state.inviteeEmail,
      inviter_name: this.state.inviterProfile?.fullName,
      inviter_email: this.state.inviterProfile?.email,
      event_start: start,
      event_end: end,
      event_location: location,
    };

    // sending email_info to backend
    axios
      .post('/api/confirmation/added', email_info)
      .then((res) => {
        console.log('Email confirmation sent');
      })
      .catch((err) => {
        console.log('Error with confirmation backend', err);
      });
  }


  /**
   * create the calendar if the invitation id is valid
   * show the error if the invitation is invalid
   * show the success page after the appointment is added.
   */
  public renderScheduler(): any {
    if (this.state.success) {
      return <Confirmation />;
    } else if (
        this.state.inviterProfile != null &&
        this.state.inviteeEmail != null
    ) {
      return (
        <InviteeCalender
          user={this.state.inviterProfile}
          inviteeProfile={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
          inviteeEmail={this.state.inviteeEmail}
          setSuccess={this.setSuccess}
          getId={this.getId}
          sendConfirmation={this.sendConfirmation}
        />
      );
    } else {
      return <Error message="Internal Server Error" />;
    }
  }


  /**
   * assign the object id to the private variable id.
   */
  getData() {
    const i = {
      id: this.getId(),
    };

    //return info/error to the frontend
    axios
      .post('/api/invitationpage/accessToken', i)
      .then((res) => {
        setTimeout(() => {
          //set expired to ture if the invitation is expired, otherwise set up the inviter's info
          if (res.data.expired === true) {
            this.setState({ isExpired: true, isLoading: false });
          } else {
            const inviter: IUser = createUserFromServerResponse(res);
            this.setState({
              inviterProfile: inviter,
              inviteeEmail: res.data.inviteeEmail,
              inviteeName: res.data.inviteeName,
              isLoading: false,
            });
          }
        }, 5000);
      })
      .catch((err) => {
        this.setState({ error: true, isLoading: false });
        console.log('Error with backend', err);
      });
  }


  /**
   * show the loading page while loading
   * show the error page if errors occured
   * sho the expiration page if the id is expired
   * otherwise display the calendar
   */
  render(): any {
    if (this.state.isLoading) {
      return <Loading />;
    } else if (
      this.state.isExpired ||
      this.state.error ||
      this.state.inviterProfile == null
    ) {
      return <Error message="This invitation is invalid or expired." />;
    } else {
      return <div>{this.renderScheduler()}</div>;
    }
  }
}

export { InvitationPage };
