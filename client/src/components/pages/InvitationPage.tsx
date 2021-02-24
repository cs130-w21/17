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
            user : null,
            token : null
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

    public renderschedular() {
        if(this.state.token != null){
            return(
                <SyncedCalender
                    user={this.state.user}
                    isAuthenticated = {this.props.isAuthenticated}
                ></SyncedCalender>
            )}else{return <div></div>}
    }


    getData(){
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
                    token = response.data;
                    const tempuser: IUser = {
                        id: '',
                        fullName: '',
                        givenName: '',
                        familyName: '',
                        imageURL: '',
                        email: '',
                        refreshToken: token.t,
                    };
                    this.setState({user: tempuser, token: token.t});
                }, 3000);

            })
            .catch(err => {
                console.log('Error with backend', err);
            });
    }
    render() : any {
        this.getData();
        //console.log("asdadaddasdsa")
        return (

            <div>
                {this.renderschedular()}
            </div>
            //<h1>Invitation Page!</h1>
        );

    }
}

export {InvitationPage};