import '@babel/polyfill'
jest.mock('react-dom', () => {
    return { render: jest.fn(() => {}) }
})

import React from 'react';
import ReactDOM from 'react-dom';
import { render, shallow } from 'enzyme';
import WeatherApp from '../client/WeatherApp';
import SearchBar from '../client/Misc/SearchBar';
import MapContainer from '../client/Map/MapContainer';

describe('WeatherApp', () => {
    it('renders without error', (done) => {
        const wrapper = render(<WeatherApp />)
        // expect(ReactDOM.render).toHaveBeenCalled()
        done();
    });

    it('has a search bar', (done) => {
        const wrapper = shallow(<WeatherApp />)
        expect(wrapper.find(SearchBar).length).toBe(1);
        done();
    });

    it('has a map', (done) => {
        const wrapper = shallow(<WeatherApp />)
        expect(wrapper.find(MapContainer).length).toBe(1);
        done();
    });
})