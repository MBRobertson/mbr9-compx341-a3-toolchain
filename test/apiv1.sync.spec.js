// Setup request mocking
let requestCallback = (obj, callback) => { callback(null, null, null) };
jest.mock('request');

// Setup database mocking

jest.mock('../cloudant_db.js', () => {
    let mockInsert = jest.fn().mockName('insert');
    let mockGet = jest.fn(() => {
        return { _id: 'locations', _rev: 'a', weatherData: [] }
    }).mockName('get');
    return {
        getDB: () => {
            return {
                insert: mockInsert,
                get: mockGet
            }
        }
    }
}
);

import apiv1 from '../routes/apiv1.js';
import request from 'request';
import dbdriver from '../cloudant_db.js';

let reqMock = {};
let resMock = {
    status: jest.fn(() => resMock).mockName('status'),
    send: jest.fn(() => resMock).mockName('send'),
    end: jest.fn(() => resMock)
};

describe('Location Sync', function () {
    it('gets locations', async function (done) {
        reqMock = { query: {} };

        await apiv1.getLocations(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send.mock.calls[resMock.send.mock.calls.length - 1][0].success).toBe(true);
        expect(dbdriver.getDB().get).toHaveBeenCalled();

        done();
    });

    it('sets locations with data', async function (done) {
        reqMock = { body: {
            weatherData: [{}]
        } };

        await apiv1.updateLocations(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(dbdriver.getDB().get).toHaveBeenCalled();
        expect(dbdriver.getDB().insert).toHaveBeenCalled();
        expect(resMock.send.mock.calls[resMock.send.mock.calls.length - 1][0].success).toBe(true);

        done();
    });

    it('fails to set locations without data', async function (done) {
        reqMock = { body: {} };

        await apiv1.updateLocations(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(dbdriver.getDB().insert).not.toHaveBeenCalled();
        expect(resMock.send.mock.calls[resMock.send.mock.calls.length - 1][0].success).toBe(false);

        done();
    });

    it('fails to get locations without database error', async function (done) {
        reqMock = { body: {} };

        dbdriver.getDB().get.mockImplementation(() => { throw "Unexpected error" })

        await apiv1.getLocations(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send.mock.calls[resMock.send.mock.calls.length - 1][0].success).toBe(false);

        done();
    });

    it('fails to set locations without database error', async function (done) {
        reqMock = { body: {} };

        dbdriver.getDB().get.mockImplementation(() => { throw "Unexpected error" })

        await apiv1.updateLocations(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(dbdriver.getDB().insert).not.toHaveBeenCalled();
        expect(resMock.send.mock.calls[resMock.send.mock.calls.length - 1][0].success).toBe(false);

        done();
    });
});
