const {sendMessage, sendError} = require('./message');
const dlPlaylist = require('./mongodb_requests/playlistRequests').dlPlaylist
const playlists = require('./mongodb_requests/playlistRequests').playlists
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function deletePlaylist(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('name'))
        return sendError(res, 'No playlist name was provided');

    const _name = req.body.name;

    const doc1 = {
        _userId: ObjectId(userId)
    };

    const [code1, log1] = await playlists(db, doc1);

    if (code1 === 'error'){
        return sendError(res, log1);
    }

    nameArray = []
    for (let i = 0 ; i < log1.length ; i++){
        nameArray.push(log1[i].name);
    }

    if (!nameArray.includes(_name)){
        return sendError(res, 'Playlist does not exist');
    }

    const doc = {
        _userId: ObjectId(userId),
        name: _name
    };

    const [code, log] = await dlPlaylist(db, doc);
    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log);
}

module.exports = deletePlaylist