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
            expect(pbody.coord).toEqual({"lon":174.77,"lat":-36.85});
            done();
        });
    });

    it('with valid lat lon', function (done) {
        if (!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
            method: 'GET',
            url: appUrl + '/api/v1/getWeather?lat=-36.84&lon=174.76'
        }, function (err, resp, body) {
            expect(err).toBeNull();
            expect(resp.statusCode).toBe(200);
            var pbody = JSON.parse(body);
            expect(pbody.city).toBe('Auckland');
            expect(pbody.coord).toEqual({"lon":174.76,"lat":-36.84});
            done();
        });
    });

    it('with city and lat lon', function (done) {
        expect(appUrl).not.toBeNull();

        request({
            method: 'GET',
            url: appUrl + '/api/v1/getWeather?lat=-36.84&lon=174.76&city=Auckland'
        }, /* @callback */ function (err, resp, body) {
            expect(err).toBeNull();
            expect(resp.statusCode).toBe(400);
            done();
        });
    });

    it('without city or lat lon', function (done) {
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
            expect(pbody.coord).toEqual({"lon":175.28,"lat":-37.79});
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

describe('Web App Client', function() {
    it('can be accessed', function(done) {
        expect(appUrl).not.toBeNull();

        request({
            method: 'GET',
            url: appUrl + '/'
        }, function (err, resp, body) {
            expect(err).toBeNull();
            expect(resp.statusCode).toBe(200);
            expect(body).not.toBeNull();
            done();
        });
    });
})