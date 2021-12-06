const {sendMessage, sendError} = require('./message');
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');
const upAdvert = require('./mongodb_requests/advertRequests').upAdvert
const adverts = require('./mongodb_requests/advertRequests').adverts

async function updateAdvert(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('oldTitle'))
        return sendError(res, 'No old title was provided');

    if (!req.body.hasOwnProperty('newTitle'))
        return sendError(res, 'No new title was provided');

    if (!req.body.hasOwnProperty('newDescription'))
        return sendError(res, 'No new description was provided');

    if (!req.body.hasOwnProperty('newImage'))
        return sendError(res, 'No new image was provided');


    const oldTitle = req.body.oldTitle;
    const newTitle = req.body.newTitle;
    const newDescription = req.body.newDescription;
    const newImage = req.body.newImage;

    const query = {
        _userId: ObjectId(userId),
        title: oldTitle
    }

    let _update = {}

    if (newTitle !== ''){
        _update.title = newTitle;
    }
    if (newDescription !== ''){
        _update.description = newDescription;
    }
    if (newImage !== ''){
        _update.image = newImage;
    }

    const update = { $set: _update };

    const [code, log] = await upAdvert(db, query, update);
    if (code === 'error'){
        return sendError(res, log);
    }

    if (newTitle === ''){
        const doc = {
            _userId: ObjectId(userId),
            title: oldTitle
        }
        const [code2, log2] = await adverts(db, doc);
        if (code2 === 'error'){
            return sendError(res, log2);
        }
        return sendMessage(res, log2[0]);
    }
    else {
        const doc = {
            _userId: ObjectId(userId),
            title: newTitle
        }
        const [code2, log2] = await adverts(db, doc);
        if (code2 === 'error'){
            return sendError(res, log2);
        }
        return sendMessage(res, log2[0]);
    }
}

module.exports = updateAdvert;