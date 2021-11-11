async function getUser(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("users").find(doc).toArray(function(err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function insertUser(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("users").insertOne(doc, function(err, res) {
            if (err) reject(err);
            resolve(res.insertedId);
        });
    });
}

module.exports = {getUser, insertUser}