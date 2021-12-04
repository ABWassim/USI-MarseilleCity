const {sendMessage, sendError} = require('./message');
const rmAdvert = require('./mongodb_requests/advertRequests').rmAdvert
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function deleteAdvert(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('title'))
        return sendError(res, 'No advert title was provided');

    const _title = req.body.title;

    const doc = {
        _userId: ObjectId(userId),
        title: _title
    };

    const [code, log] = await rmAdvert(db, doc);
    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log);
}

module.exports = deleteAdvert