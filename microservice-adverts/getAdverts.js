const {sendMessage, sendError} = require('./message');
const adverts = require('./mongodb_requests/advertRequests').adverts
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function getAdverts(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'Advertiser is not authenticated');

    const doc = {
        _userId: ObjectId(userId)
    };

    const [code, log] = await adverts(db, doc);

    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log);
}

module.exports = getAdverts