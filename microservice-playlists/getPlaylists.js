const {sendMessage, sendError} = require('./message');
const playlists = require('./mongodb_requests/playlistRequests').playlists
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function getPlaylists(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    const doc = {
        _userId: ObjectId(userId)
    };

    const [code, log] = await playlists(db, doc);

    if (code === 'error'){
        return sendError(res, log);
    }

    nameArray = []
    for (let i = 0 ; i < log.length ; i++){
        nameArray.push(log[i].name);
    }

    return sendMessage(res, nameArray);
}

module.exports = getPlaylists