// Setup request mocking
let requestCallback = (obj, callback) => { callback(null, null, null) };
jest.mock('request');

import apiv1 from '../routes/apiv1.js';
import request from 'request';

let reqMock = {};
let resMock = {
    status: jest.fn(() => resMock).mockName('status'),
    send: jest.fn(() => resMock).mockName('send'),
    end: jest.fn(() => resMock)
};

describe('Get Weather', function () {
    it('with without query', function () {
        reqMock = {
            query: {

            }
        };

        apiv1.getWeather(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(400);
    });

    it('with valid city and lat lon', function () {
        reqMock = {
            query: {
                city: 'Auckland',
                lat: -36.84,
                lon: 174.76
            }
        };

        apiv1.getWeather(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(400);
    });

    it('with only lon and no lat', function () {
        reqMock = {
            query: {
                lon: 174.76
            }
        };

        apiv1.getWeather(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(400);
    });

    it('with valid city and error from request call', function () {
        reqMock = {
            query: {
                city: 'Auckland'
            }
        };

        request.mockImplementation((obj, callback) => { callback("error", null, null) });

        apiv1.getWeather(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledWith('Failed to get the data');
    });

    it('with incomplete city', function () {
        reqMock = {
            query: {
                city: 'Auckl'
            }
        };

        request.mockImplementation((obj, callback) => { callback(null, null, {}) });

        apiv1.getWeather(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledWith({msg: 'Failed'});
    });

    it('with valid city', function () {
        reqMock = {
            query: {
                city: 'Auckland'
            }
        };

        var body = {
            cod: 200,
            name: 'Auckland',
            weather: [
                {
                    main: 'cold'
                }
            ],
            main: {
                temp: 18
            },
            coord: {"lon":174.77,"lat":-36.85}
        };

        request.mockImplementation((obj, callback) => { callback(null, null, body) });

        apiv1.getWeather(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalledWith({
            city: 'Auckland',
            weather: 'Conditions are cold and temperature is 18 C',
            coord: {"lon":174.77,"lat":-36.85}
        });
    });

    it('with valid lat lon', function() {
        reqMock = {
            query: {
                lat: -36.84,
                lon: 174.76
            }
        };

        var body = {
            cod: 200,
            name: 'Auckland',
            weather: [
                {
                    main: 'cold'
                }
            ],
            main: {
                temp: 18
            },
            coord: {"lon":174.76,"lat":-36.84}
        };

        request.mockImplementation((obj, callback) => { callback(null, null, body) });

        apiv1.getWeather(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalledWith({
            city: 'Auckland',
            weather: 'Conditions are cold and temperature is 18 C',
            coord: {"lon":174.76,"lat":-36.84}
        });
    });
});
