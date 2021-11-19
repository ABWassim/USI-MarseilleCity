async function getUser(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("users").find(doc).toArray(function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

async function insertUser(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("users").insertOne(doc, function(err, res) {
            if (err) reject(['error', err]);
            resolve(['ok', res.insertedId]);
        });
    });
}

async function updateUser(db, query, update) {
    return new Promise((resolve, reject) => {
        db.collection("users").updateOne(query, update ,function(err, res) {
            if (err) reject(['error', err]);
            resolve(['ok', res]);
        });
    });
}

async function getInfos(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("users").find(doc).project({_id: 0}).toArray(function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

module.exports = {getUser, insertUser, updateUser, getInfos}