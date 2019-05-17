var REQUEST = require('request');

var request = REQUEST.defaults({
    strictSSL: false
});

var appUrl = process.env.APP_URL;

describe('Location Sync', function () {

    it('with valid city', function (done) {
        if (!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
            method: 'GET',
            url: appUrl + '/api/v1/locations'
        }, function (err, resp, body) {
            expect(err).toBeNull();
            expect(resp.statusCode).toBe(200);
            var pbody = JSON.parse(body);
            expect(pbody.success).toBe(true);
            done();
        });
    });

});