import React from 'react';
import {InvitationPageProps, InvitationPageState, InvitationState} from "../../types/interfaces";
import axios from "axios";
/**
 * This class serves as the invitation page for the application.
 * The invitee will be able to view the inviter's schedule here.
 */
class InvitationPage extends React.Component<InvitationPageProps, InvitationPageState> {
    constructor(props : InvitationPageProps) {
        super(props);
        this.state = {
            id: ''
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

    render() : any {
        const i = {
            id : this.getId()
        }
        //let id = this.getId();

        axios.post('/api/invitationpage/token', i)

        return (
            <div>
                id is:
            </div>
            //<h1>Invitation Page!</h1>
        );
    }
}

export {InvitationPage};