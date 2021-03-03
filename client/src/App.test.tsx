import React from 'react';
import App from './App';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {HomePage} from "./components/pages/HomePage";
import {IUser} from "./types/interfaces";
import {InvitationPage} from "./components/pages/InvitationPage";
import {CalendarPage} from "./components/pages/CalendarPage";
import {PAGES} from "./components/pages/PageConstants";

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

describe('<App /> Test', () => {
    it('renders without errors', () => {
        shallow(<App/>);
    });

    it('renders HomePage properly', () => {
        const app = mount(
            <App />
        );

        expect(app.find(HomePage).length).toBe(1);
        expect(app.find(InvitationPage).length).toBe(0);
        expect(app.find(CalendarPage).length).toBe(0);
    });

    it('renders InvitationPage properly', () => {
        window.history.pushState({}, 'Invitation', PAGES.INVITATION_PAGE);

        const app = mount(
            <App />
        );

        expect(app.find(HomePage).length).toBe(0);
        expect(app.find(InvitationPage).length).toBe(1);
        expect(app.find(CalendarPage).length).toBe(0);
    });
});