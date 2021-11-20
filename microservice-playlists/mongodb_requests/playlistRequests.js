async function playlists(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("playlists").find(doc).project({name: 1, _id: 0}).toArray(function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

async function videosFromPlaylist(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("playlists").find(doc).project({videos: 1, _id: 0}).toArray(function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

async function newPlaylist(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("playlists").insertOne(doc, function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

async function getPlaylistNameById(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("playlists").find(doc).project({name: 1, _id: 0}).toArray(function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

async function dlPlaylist(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("playlists").deleteOne(doc, function(err, obj) {
            if (err) reject(['error', err]);
            resolve(['ok', obj]);
        });
    });
}

async function pushVideo(db, query, update) {
    return new Promise((resolve, reject) => {
        db.collection("playlists").updateOne(query, update ,function(err, res) {
            if (err) reject(['error', err]);
            resolve(['ok', res]);
        });
    });
}

async function rmVideo(db, query, update) {
    return new Promise((resolve, reject) => {
        db.collection("playlists").update(query, update ,function(err, res) {
            if (err) reject(['error', err]);
            resolve(['ok', res]);
        });
    });
}


module.exports = {playlists, videosFromPlaylist, newPlaylist, getPlaylistNameById, dlPlaylist, pushVideo, rmVideo}