import React from 'react';
import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AuthHandler} from "./AuthHandler";
import {IUser} from "../../types/interfaces";
import {Login} from "./Login";
import {Logout} from "./Logout";


configure({ adapter: new Adapter() });

function mockLogin(user : IUser) : void {}
function mockLogout() : void {}

describe('<App /> Test', () => {
    it('when logged out, login displayed', () => {
        const wrapper = shallow(<AuthHandler isAuthenticated={false} login={mockLogin} logout={mockLogout}/>);
        expect(wrapper.containsMatchingElement(<Login login={mockLogin}/>)).toBe(true);
        expect(wrapper.containsMatchingElement(<Logout logout={mockLogout}/>)).toBe(false);
    });

    it('when logged in, logout displayed', () => {
        const wrapper = shallow(<AuthHandler isAuthenticated={true} login={mockLogin} logout={mockLogout}/>);
        expect(wrapper.containsMatchingElement(<Login login={mockLogin}/>)).toBe(false);
        expect(wrapper.containsMatchingElement(<Logout logout={mockLogout}/>)).toBe(true);
    });
})

