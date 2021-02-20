import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App /> Test', () => {
    it('renders without errors', () => {
        const app = render(<App/>);
    });
});