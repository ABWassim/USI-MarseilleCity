const {sendMessage, sendError} = require('./message');
const playlists = require('./mongodb_requests/playlistRequests').playlists
const rnPlaylist = require('./mongodb_requests/playlistRequests').rnPlaylist
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function renamePlaylist(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('nameOld'))
        return sendError(res, 'No old name was specified');

    if (!req.body.hasOwnProperty('nameNew'))
        return sendError(res, 'No new name was specified');

    const nameOld = req.body.nameOld;
    const nameNew = req.body.nameNew;


    const [code1, existingPlaylist] = await playlists(db,
        {_userId: ObjectId(userId)}
    );

    if (code1 === 'error'){
        return sendError(res, existingPlaylist);
    }

    nameArray = []
    for (let i = 0 ; i < existingPlaylist.length ; i++){
        nameArray.push(existingPlaylist[i].name);
    }

    if (!nameArray.includes(nameOld)){
        return sendError(res, 'Playlist does not exist');
    }

    const query = {
        _userId: ObjectId(userId),
        name: nameOld
    };

    const update = {$set: {name: nameNew}};

    const [code2, ack] = await rnPlaylist(db, query, update);
    if (code2 === 'error'){
        return sendError(res, ack);
    }

    return sendMessage(res, nameNew);
}

module.exports = renamePlaylist