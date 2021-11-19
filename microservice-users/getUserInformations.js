const {sendMessage, sendError} = require('./message');
const getInfos = require('./mongodb_requests/userRequests').getInfos
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function getUserInformations(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    const query = {
        _id : ObjectId(userId)
    }

    const [code, log] = await getInfos(db, query);
    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log[0]);
}

module.exports = getUserInformations;