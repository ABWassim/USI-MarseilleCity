async function adverts(db, doc) {
    return new Promise((resolve, reject) => {
        db.collection("adverts").find(doc).project({_userId: 0, _id: 0}).toArray(function(err, result) {
            if (err) reject(['error', err]);
            resolve(['ok', result]);
        });
    });
}

module.exports = {adverts}