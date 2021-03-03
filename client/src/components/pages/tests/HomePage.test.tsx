import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { HomePage } from '../HomePage';
import {BrowserRouter as Router, Route} from "react-router-dom";



configure({ adapter: new Adapter() });

describe('<HomePage/> Test', () => {
    it('Renders without errors', () => {
        const wrapper = shallow(
            <Router>
                <Route
                    path='/'
                    render={(props) => (
                        <HomePage
                            {...props}
                            user={null}
                            isAuthenticated={false}
                        />
                    )}
                />
            </Router>
        );
    });
});
