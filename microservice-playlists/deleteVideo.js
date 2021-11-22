const {sendMessage, sendError} = require('./message');
const playlist = require('./mongodb_requests/playlistRequests').playlists
const rmVideo = require('./mongodb_requests/playlistRequests').rmVideo
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');

async function deleteVideo(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('name'))
        return sendError(res, 'No playlist name was provided');

    if (!req.body.hasOwnProperty('videoId'))
        return sendError(res, 'No video Id was provided');

    const _name = req.body.name;
    const _videoId = req.body.videoId;

    const [code1, existingPlaylist] = await playlist(db,
        {_userId: ObjectId(userId)}
    );

    if (code1 === 'error'){
        return sendError(res, existingPlaylist);
    }

    nameArray = []
    for (let i = 0 ; i < existingPlaylist.length ; i++){
        nameArray.push(existingPlaylist[i].name);
    }

    if (!nameArray.includes(_name)){
        return sendError(res, 'Playlist does not exist');
    }

    const query = {
        _userId: ObjectId(userId),
        name: _name,
    };

    const update = {
        $pull: {videos: {id: _videoId}}
    }

    console.log(query);
    console.log(update);

    const [code2, ack] = await rmVideo(db, query, update);
    if (code2 === 'error'){
        return sendError(res, ack);
    }

    return sendMessage(res, ack);
}

module.exports = deleteVideo