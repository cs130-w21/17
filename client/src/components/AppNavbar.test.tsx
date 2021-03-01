import React from 'react';

import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AppNavbar} from "./AppNavbar";
import {IUser} from "../types/interfaces";
import { BrowserRouter as Router} from 'react-router-dom';


configure({ adapter: new Adapter() });

function mockLogin(user : IUser) : void {}
function mockLogout() : void {}

const testUser :IUser = {
    id: '',
    fullName: 'Test User',
    givenName: 'Test',
    familyName: 'User',
    imageURL: '',
    email: 'testemail',
    accessToken: ''
}

describe('<AppNavbar /> Test', () => {
    it('when logged out, no message shown', () => {
        const wrapper = mount(<Router><AppNavbar isAuthenticated={false} user={null} login={mockLogin} logout={mockLogout} /></Router>);
        expect(wrapper.text().includes(`Welcome, ${testUser.givenName}`)).toBe(false);
    });

    it('when logged in, displays message with users name', () => {
        const wrapper = mount(<Router><AppNavbar isAuthenticated={true} user={testUser} login={mockLogin} logout={mockLogout} /></Router>);
        expect(wrapper.text().includes(`Welcome, ${testUser.givenName}`)).toBe(true);
    });
})
