async function adverts(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("adverts").find(doc).project({_userId: 0, _id: 0}).toArray(function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

async function insertAdvert(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("adverts").insertOne(doc, function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

async function rmAdvert(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("adverts").deleteOne(doc, function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

async function upAdvert(db, query, update) {
    return new Promise((resolve, reject) => {
        db.collection("adverts").updateOne(query, update ,function(err, res) {
            if (err) reject(['error', err]);
            resolve(['ok', res]);
        });
    });
}

module.exports = {adverts, insertAdvert, rmAdvert, upAdvert}