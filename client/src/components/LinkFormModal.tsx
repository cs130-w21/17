import React, {Component} from 'react';
import axios from 'axios';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

import {IAppState, InvitationProps, InvitationState} from '../types/interfaces';

/**
 * A class which handles the modal form for the client to
 * generate and send an invitation link.
 *
 * Has a button to open the modal,
 * the modal that has the form text fields,
 * the submit button,
 * and alerts to notify the client if the invitation was sent successfully.
 *
 * The class deals with rendering, states, and props
 * and sends data to the backend.
 */
class LinkFormModal extends React.Component<InvitationProps, InvitationState, IAppState>{
    constructor(props: InvitationProps){
        super(props);

        this.state = {
            modal_opened: false,
            invitee_name: '',
            invitee_email:'',
            submitted: false,
            invite_sent: false
        };


        this.toggle = this.toggle.bind(this);
        this.onChange= this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAlertDismiss = this.onAlertDismiss.bind(this);
    }

    /**
     * Opens/Closes Modal
     */
    toggle(): void {
        this.setState({
            modal_opened: !this.state.modal_opened
        });
    }

    /**
     * Closes invite status alert,
     * resets invite_sent & submitted state to false,
     * and resets invitee_name and invitee_email to empty strings
     */
    onAlertDismiss():void{
        this.setState({
            invite_sent: false, // email sent successfully
            submitted: false,   // form submitted
            invitee_name: "",
            invitee_email: ""
        });
    }

    /**
     * Changes values of invitee_name and invitee_email based on user input
     * @param event text values for invitee_name and invitee_email
     */
    onChange(event: any): void{
        this.setState({ [event.target.name]: event.target.value}
        );
        this.setState({
            invite_sent: false
        });

    };

    /**
     * Sends invitation data to backend to be processed,
     * closes modal, and sets submitted state to true
     *
     *  (backend: adds invitation to database and sends invitation link)
     *
     * @param event user presses enter/submit button
     */
    onSubmit (event:any): void{
        event.preventDefault();

        // data to send to backend
        const newInvitation = {
            invitee_name: this.state.invitee_name,
            invitee_email: this.state.invitee_email,
            inviter_name: this.props.user?.fullName,
            inviter_email: this.props.user?.email
        }

        // sending information to backend
        axios.post('/api/invitations/add', newInvitation)
            .then(res => {
                // no errors with adding to database/sending email
                this.setState({
                    invite_sent: true
                });
            })

            //error found
            .catch(err => console.log('Error', err));


        // close modal
        this.toggle();

        this.setState({
            submitted: true
        });
    }


    /**
     * Displays modal form for client to input data to generate invitation
     */
    render():any{
        return(
            <div>
                {/*Button to open modal*/}
                <Button onClick={this.toggle} >
                    Generate Invitation
                </Button>

                {/*Alert: appears if invite sent successfully */}
                <Alert color="info" isOpen={this.state.invite_sent} toggle={this.onAlertDismiss}>
                    Invite sent to {this.state.invitee_email}!
                </Alert>

                {/*Alert: appears if invite NOT sent successfully */}
                <Alert color="danger" isOpen={this.state.submitted && !this.state.invite_sent} toggle={this.onAlertDismiss}>
                    Error sending invite. Please check your inputs.
                </Alert>

                {/* MODAL/FORM: Opens if button clicked*/}
                <Modal
                    isOpen={this.state.modal_opened}
                    toggle = {this.toggle}
                >

                    <ModalHeader toggle={this.toggle}>Send an Invitation Link</ModalHeader>
                    <ModalBody>
                        Please enter the information of the invitee below.


                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="invitee_name">Invitee: </Label>
                                <Input type="text" name="invitee_name" id="invitee_name"
                                       placeholder="Name" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="invitee_email">Email</Label>
                                <Input type="email" name="invitee_email" id="invitee_email"
                                       placeholder="email@gmail.com" onChange={this.onChange} />
                            </FormGroup>

                            {/*Submits form*/}
                            <Button >
                                Send invitation!
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export {LinkFormModal};