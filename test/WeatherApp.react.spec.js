import '@babel/polyfill'
jest.mock('react-dom', () => {
    return { render: jest.fn(() => {}) }
})

import React from 'react';
import ReactDOM from 'react-dom';
import { render, shallow } from 'enzyme';
import WeatherApp from '../client/WeatherApp';
import CityInfo from '../client/CityInfo/CityInfo';

describe('WeatherApp', () => {
    it('renders without error', (done) => {
        const wrapper = render(<WeatherApp />)
        // expect(ReactDOM.render).toHaveBeenCalled()
        done();
    });

    it('renders four city info boxes', (done) => {
        const wrapper = shallow(<WeatherApp />)
        expect(wrapper.find(CityInfo).length).toBe(4);
        done();
    });
})