import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CalendarPage } from './CalendarPage';
import {BrowserRouter as Router, Route} from "react-router-dom";
import SyncedCalender from "../calendar/SyncedCalender";
import {IUser} from "../../types/interfaces";

configure({ adapter: new Adapter() });

const testUser :IUser = {
    id: '',
    fullName: 'Test User',
    givenName: 'Test',
    familyName: 'User',
    imageURL: '',
    email: 'testemail',
    accessToken: ''
}

describe('<CalendarPage/> Test', () => {
    it('No calendar appears if user is not logged in.', () => {
        const wrapper = shallow(
            <Router>
                <Route
                    path='/'
                    render={(props) => (
                        <CalendarPage
                            {...props}
                            user={null}
                            isAuthenticated={false}
                        />
                    )}
                />
            </Router>
        );

        expect(wrapper.containsMatchingElement(<SyncedCalender user={null} isAuthenticated={false}/>)).toBe(false);
    });

    it('Calendar appears if user is logged in.', () => {
        const wrapper = shallow(
            <Router>
                <Route
                    path='/'
                    render={(props) => (
                        <CalendarPage
                            {...props}
                            user={testUser}
                            isAuthenticated={true}
                        />
                    )}
                />
            </Router>
        );

        expect(wrapper.containsMatchingElement(<SyncedCalender user={testUser} isAuthenticated={true}/>)).toBe(false);
    });
});
