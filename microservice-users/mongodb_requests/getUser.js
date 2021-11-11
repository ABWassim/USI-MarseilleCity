async function getUser(db, _mail, _password) {
    return new Promise((resolve, reject) => {
        const query = {email: _mail, password: _password}
        db.collection("users").find(query).toArray(function(err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = getUser