var assert = require('chai').assert;
var sinon = require('sinon');
var rewire = require('rewire');
var sinon = require('sinon');
var apiv1 = rewire('../routes/apiv1.js');

resMock = {
    status: () => resMock,
    send: () => resMock,
    end: () => resMock
};
sinon.spy(resMock, 'status');
sinon.spy(resMock, 'send');

describe('Get Weather', function () {
    it('with without city', function () {
        reqMock = {
            query: {

            }
        };

        apiv1.getWeather(reqMock, resMock);
        assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
    });

    it('with valid city and error from request call', function () {
        reqMock = {
            query: {
                city: 'Auckland'
            }
        };

        apiv1.__set__("request", (obj, callback) => {
            callback("error", null, null);
        });

        apiv1.getWeather(reqMock, resMock);

        assert(resMock.status.lastCall.calledWith(400), 'Unexpected response: ' + resMock.status.lastCall.args);
        assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response: ' + resMock.send.lastCall.args);
    });

    it('with incomplete city', function () {
        reqMock = {
            query: {
                city: 'Auckl'
            }
        };

        var request = function (obj, callback) {
            callback(null, null, {});
        };

        apiv1.__set__("request", request);

        apiv1.getWeather(reqMock, resMock);

        assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
        assert(resMock.send.lastCall.args[0].msg === 'Failed', 'Unexpected response:' + resMock.send.lastCall.args);
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
            }
        };

        var request = function (obj, callback) {
            callback(null, null, body);
        };

        apiv1.__set__("request", request);

        apiv1.getWeather(reqMock, resMock);

        assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
        assert(resMock.send.lastCall.args[0].city === 'Auckland', 'Unexpected response:' + resMock.send.lastCall.args[0].city);
        assert(resMock.send.lastCall.args[0].weather === 'Conditions are cold and temperature is 18 C', 'Unexpected response:' + resMock.send.lastCall.args[0].weather);
    });
});
