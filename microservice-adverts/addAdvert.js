const {sendMessage, sendError} = require('./message');
const insertAdvert = require('./mongodb_requests/advertRequests').insertAdvert
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function addAdvert(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'Advertiser is not authenticated');

    if (!req.body.hasOwnProperty('title')){
        return sendError (res, 'Title is missing');
    }
    if (!req.body.hasOwnProperty('description')){
        return sendError (res, 'Description is missing');
    }
    if (!req.body.hasOwnProperty('image')){
        return sendError (res, 'Image is missing');
    }

    const doc = {
        _userId: ObjectId(userId),
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    };

    const [code, log] = await insertAdvert(db, doc);

    if (code === 'error'){
        return sendError(res, log);
    }

    const addedAdvert = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    }

    return sendMessage(res, addedAdvert);
}

module.exports = addAdvert