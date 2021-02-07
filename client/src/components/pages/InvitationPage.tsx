import React from 'react';
import {InvitationProps, InvitationState} from "../../types/interfaces";


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