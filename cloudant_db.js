let cfenv = require('cfenv');
let CLOUDANT = require('@cloudant/cloudant');
let path = require('path');

let appEnv = cfenv.getAppEnv({ vcapFile: path.join(__dirname, 'vcap-local.json') });
let cloudant;

// Initialize database with credentials
if (appEnv.services['cloudantNoSQLDB']) {
    cloudant = CLOUDANT(appEnv.services['cloudantNoSQLDB'][0].credentials);
} else {
    cloudant = CLOUDANT(appEnv.getService(/cloudant/).credentials);
}

let dbName = 'compx341-a3';
async function getDB() {
    try {
        await cloudant.db.create(dbName);
    } catch (err) {}
    return cloudant.use(dbName);
}

module.exports = { getDB, getDB };
