var REQUEST = require('request');

var request = REQUEST.defaults({
    strictSSL: false
});

var appUrl = process.env.APP_URL;

describe('Get Weather', function () {

    it('with valid city', function (done) {
        if (!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
            method: 'GET',
            url: appUrl + '/api/v1/getWeather?city=Auckland'
        }, function (err, resp, body) {
            expect(err).toBeNull();
            expect(resp.statusCode).toBe(200);
            var pbody = JSON.parse(body);
            expect(pbody.city).toBe('Auckland');
            done();
        });
    });

    it('without city', function (done) {
        expect(appUrl).not.toBeNull();

        request({
            method: 'GET',
            url: appUrl + '/api/v1/getWeather'
        }, /* @callback */ function (err, resp, body) {
            expect(err).toBeNull();
            expect(resp.statusCode).toBe(400);
            done();
        });
    });

    it('with another valid city', function (done) {
        expect(appUrl).not.toBeNull();

        request({
            method: 'GET',
            url: appUrl + '/api/v1/getWeather?city=Hamilton'
        }, function (err, resp, body) {
            expect(err).toBeNull();
            expect(resp.statusCode).toBe(200);
            var pbody = JSON.parse(body);
            expect(pbody.city).toBe('Hamilton');
            done();
        });
    });

    it('with city from outside NZ', function (done) {
        expect(appUrl).not.toBeNull();

        request({
            method: 'GET',
            url: appUrl + '/api/v1/getWeather?city=Sydney'
        }, function (err, resp, body) {
            expect(err).toBeNull();
            expect(resp.statusCode).toBe(400);
            done();
        });
    });
});
