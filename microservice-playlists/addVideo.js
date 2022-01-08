const {sendMessage, sendError} = require('./message');
const playlist = require('./mongodb_requests/playlistRequests').playlists
const pushVideo = require('./mongodb_requests/playlistRequests').pushVideo
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');
const {checkVideoInPlaylist} = require("./mongodb_requests/playlistRequests");

async function addVideo(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('name'))
        return sendError(res, 'No playlist name was provided');

    if (!req.body.hasOwnProperty('video'))
        return sendError(res, 'No new video was provided');

    const _name = req.body.name;
    const _video = req.body.video;

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

    const properties = ['id', 'title', 'urlVideo', 'channel', 'urlChannel', 'date', 'thumbnail', 'description', 'provider'];
    for (const p of properties){
        if (!_video.hasOwnProperty(p)){
            return sendError(res, 'Video object is missing property ' + p);
        }
    }

    const doc = {
        _userId: ObjectId(userId),
        name: _name,
        videos: {$elemMatch: { id: _video.id }}
    }

    const [c, existingVideo] = await checkVideoInPlaylist(db, doc);

    if (c === 'error'){
        return sendError(res, existingVideo);
    }

    if (existingVideo.length !== 0){
        return sendError(res, 'Video already in playlist');
    }

    const query = {
        _userId: ObjectId(userId),
        name: _name,
    };

    const update = {
        $push: {videos: _video}
    }

    const [code2, ack] = await pushVideo(db, query, update);
    if (code2 === 'error'){
        return sendError(res, ack);
    }

    return sendMessage(res, ack);
}

module.exports = addVideo