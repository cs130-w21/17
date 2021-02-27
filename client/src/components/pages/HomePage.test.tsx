import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { HomePage } from './HomePage';
import SyncedCalender from "../calendar/SyncedCalender";


configure({ adapter: new Adapter() });

describe('<HomePage/> Test', () => {
    it('when logged out, no calendar is shown', () => {
        const wrapper = shallow(<HomePage user={null} isAuthenticated={false} />);
        expect(wrapper.containsMatchingElement(<SyncedCalender user={null} isAuthenticated={false}/>)).toBe(false);
    });

    it('when logged in, calendar is displayed', () => {
        const wrapper = shallow(<HomePage user={null} isAuthenticated={true} />);
        expect(wrapper.containsMatchingElement(<SyncedCalender user={null} isAuthenticated={true}/>)).toBe(true);
    });
});
