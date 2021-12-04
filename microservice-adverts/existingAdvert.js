const {sendMessage, sendError} = require('./message');
const adverts = require('./mongodb_requests/advertRequests').adverts
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function existingAdvert(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'Advertiser is not authenticated');

    if (!req.body.hasOwnProperty('title')){
        return sendError (res, 'No title was provided');
    }

    let doc = {
        _userId: ObjectId(userId),
        title: req.body.title
    }

    const [code, log] = await adverts(db, doc);

    if (code === 'error'){
        return sendError(res, log);
    }

    if (log.length !== 0){
        return sendMessage(res, 1);
    }
    else {
        return sendMessage(res, 0);
    }
}

module.exports = existingAdvert