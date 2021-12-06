const {sendMessage, sendError} = require('./message');
const adverts = require('./mongodb_requests/advertRequests').adverts
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function getSpecificAdvert(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'Advertiser is not authenticated');

    if(!req.body.hasOwnProperty('title')){
        return sendError (res, 'Advert title is missing');
    }

    const doc = {
        _userId: ObjectId(userId),
        title: req.body.title
    };

    const [code, log] = await adverts(db, doc);

    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log[0]);
}

module.exports = getSpecificAdvert