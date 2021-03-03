import React from 'react';
import {InvitationPageProps, InvitationPageState, IUser} from "../../types/interfaces";
import { createUserFromServerResponse } from "../utils/utils";
import axios from "axios";
import SyncedCalender from "../calendar/SyncedCalender";
/**
 * This class serves as the invitation page for the application.
 * The invitee will be able to view the inviter's schedule here.
 */
class InvitationPage extends React.Component<InvitationPageProps, InvitationPageState> {
    constructor(props : InvitationPageProps) {
        super(props);
        this.state = {
            inviterProfile: null,
            inviteeProfile: this.props.user,
            isExpired: false
        }
    }

    componentDidMount() : void {
        this.getData();
    }

    getId(): string {
        let search = this.getUrlParams();
        return search.get("id") || "";
    }

    getUrlParams(): URLSearchParams {
        if (!this.props.location.search) return new URLSearchParams();
        return new URLSearchParams(this.props.location.search);
    }

    public renderScheduler(): any {
        if(this.state.inviterProfile != null){
            return(
                <SyncedCalender
                    user={this.state.inviterProfile}
                    isAuthenticated = {this.props.isAuthenticated}
                />
            );
        } else {
            return <div/>
        }
    }

    getData(){
        const i = {
            id : this.getId()
        }

        axios
            .post('/api/invitationpage/accessToken', i)
            .then((res) => {
                setTimeout(() => {
                    //set expired to ture if the invitation is expired, otherwise set up the inviter's info
                   if(res.data.expired === true){
                       console.log(res.data.expired);
                       this.setState({isExpired: true})
                    }else{

                    const inviter : IUser = createUserFromServerResponse(res);
                    this.setState({inviterProfile: inviter});
                    }
                }, 5000);

            })
            .catch(err => {
                console.log('Error with backend', err);
            });
    }

    render() : any {
        if(this.state.isExpired || this.state.inviterProfile == null){
        return (
            <div>
                This Invitation has been expired. Please make another one.
            </div>
        );
        }
        else{
        return (
            <div>
                {this.renderScheduler()}
            </div>
        );
        }
    }
}

export {InvitationPage};