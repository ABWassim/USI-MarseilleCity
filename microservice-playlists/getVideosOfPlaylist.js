const {sendMessage, sendError} = require('./message');
const videosFromPlaylist = require('./mongodb_requests/playlistRequests').videosFromPlaylist
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function getVideosOfPlaylist(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('name'))
        return sendError(res, 'No playlist name was provided');

    const doc = {
        _userId: ObjectId(userId),
        name: req.body.name
    };

    const [code, log] = await videosFromPlaylist(db, doc);

    if (code === 'error'){
        return sendError(res, log);
    }
    else {
        return sendMessage(res, log[0].videos);
    }
}

module.exports = getVideosOfPlaylist