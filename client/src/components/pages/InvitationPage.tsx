import React from 'react';
import {InvitationPageProps, InvitationPageState, InvitationState, IUser} from "../../types/interfaces";
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
            //id: '',
            token : ''
        }
    }

    getId(): string {
        let search = this.getUrlParams();
        return search.get("id") || "";
    }

    getUrlParams(): URLSearchParams {
        if (!this.props.location.search) return new URLSearchParams();
        return new URLSearchParams(this.props.location.search);
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

    render() : any {
        const i = {
            id : this.getId()
        }
        let token: any;
        let token_s = '';
        //return axios.post('/api/invitationpage/token', i)
         axios
            .post('/api/invitationpage/token', i)
            .then((response) => {
                setTimeout(() => {
                   //const c = response.data;
                    console.log(response.data);
                    token = response.data;
                    this.setState({token : token.t});
                    console.log(token.t);
                    }, 600);
                });
        return (

            <div>
                This is the token: {this.state.token}
                {this.renderschedular()}
            </div>
            //<h1>Invitation Page!</h1>
        );
    }
}

export {InvitationPage};