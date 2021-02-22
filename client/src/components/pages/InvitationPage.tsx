import React from 'react';
import {InvitationPageProps, InvitationPageState, InvitationState} from "../../types/interfaces";
/**
 * This class serves as the invitation page for the application.
 * The invitee will be able to view the inviter's schedule here.
 */
class InvitationPage extends React.Component<InvitationPageProps, InvitationPageState> {
    constructor(props : InvitationPageProps) {
        super(props);
        this.state = {}
    }
    getId(): string {
        let search = this.getUrlParams();
        return search.get("id") || "";
    }

    getUrlParams(): URLSearchParams {
        if (!this.props.location.search) return new URLSearchParams();
        return new URLSearchParams(this.props.location.search);
    }

    findEmail(): string {

    }
    render() : any {
        let id = this.getId();
        return (
            <div>
                id is: {id}
            </div>
            //<h1>Invitation Page!</h1>
        );
    }
}

export {InvitationPage};