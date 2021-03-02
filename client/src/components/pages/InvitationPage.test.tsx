import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { InvitationPage } from './InvitationPage';
import SyncedCalender from "../calendar/SyncedCalender";
import {BrowserRouter as Router, Route} from 'react-router-dom';


configure({ adapter: new Adapter() });


describe('<InvitationPage/> Test', () => {

    it('Given invalid link, no calendar is shown', () => {
        const wrapper = shallow(
            <Router>
                <Route
                    exact
                    path='/'
                    render={(props) => (
                        <InvitationPage
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
});