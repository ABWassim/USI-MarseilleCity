const {sendMessage, sendError} = require('./message');
const playlist = require('./mongodb_requests/playlistRequests').playlists
const newPlaylist = require('./mongodb_requests/playlistRequests').newPlaylist
const getPlaylistNameById = require('./mongodb_requests/playlistRequests').getPlaylistNameById
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function addPlaylist(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('name'))
        return sendError(res, 'No playlist name was provided for the new playlist');

    const [code1, existingPlaylist] = await playlist(db,
        {_userId: ObjectId(userId)}
    );

    if (code1 === 'error'){
        return sendError(res, existingPlaylist);
    }

    for (let i = 0 ; i < existingPlaylist.length ; i++){
        if (existingPlaylist[i].name === req.body.name){
            return sendError(res, 'Playlist already existing with this name');
        }
    }

    const doc = {
        _userId: ObjectId(userId),
        name: req.body.name,
        videos: []
    };

    const [code2, ack] = await newPlaylist(db, doc);
    if (code2 === 'error'){
        return sendError(res, ack);
    }

    const [code3, log] = await getPlaylistNameById(db, {_id: ObjectId(ack.insertedId)});
    if (code3 === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log[0].name);
}

module.exports = addPlaylist