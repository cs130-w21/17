import React from 'react';
import {InvitationProps, InvitationState} from "../../types/interfaces";

/**
 * This class serves as the invitation page for the application.
 * The invitee will be able to view the inviter's schedule here.
 */
class InvitationPage extends React.Component<InvitationProps, InvitationState> {
    constructor(props : InvitationProps) {
        super(props);

        this.state = {}
    }

    render() : any {
        return (
            <h1>Invitation Page!</h1>
        );
    }
}


export { InvitationPage };