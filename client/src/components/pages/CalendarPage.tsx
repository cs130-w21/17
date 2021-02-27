import React from 'react';
import { CalendarPageProps, CalendarPageState } from '../../types/interfaces';
import SyncedCalender from '../calendar/SyncedCalender';
import {LinkFormModal} from "../LinkFormModal";
import {Redirect} from 'react-router-dom';

/**
 * This class serves as the Calendar Page. It is for users to log in
 * and view/modify their schedule.
 */
class CalendarPage extends React.Component<CalendarPageProps, CalendarPageState> {
    constructor(props: CalendarPageProps) {
        super(props);

        this.state = {};

        this.renderScheduler = this.renderScheduler.bind(this);
    }

    /**
     * Renders the calendar if the user is logged in, and a redirect otherwise.
     */
    public renderScheduler() {
        if (this.props.isAuthenticated) {
            return (
                <div>
                    <LinkFormModal user={this.props.user}/>
                    <SyncedCalender
                    user={this.props.user}
                    isAuthenticated={this.props.isAuthenticated}
                    />
                </div>
            );
        } else {
            return <Redirect to="/" />;
        }
    }
    render(): any {
        return <div>{this.renderScheduler()}</div>;
    }
}

export { CalendarPage };
