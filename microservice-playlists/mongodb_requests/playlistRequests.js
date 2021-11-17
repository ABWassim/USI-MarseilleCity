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

module.exports = {playlists, videosFromPlaylist, newPlaylist, getPlaylistNameById}