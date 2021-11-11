const {sendMessage, sendError} = require('./message');
const getUser = require('./mongodb_requests/getUser')
const auth = require('./auth.js');

async function checkLogin(req, res, db)
{
    if (!req.body.hasOwnProperty('email'))
        return sendError(res, 'Vous n\'avez pas le mail');

    if (!req.body.hasOwnProperty('password'))
        return sendError(res, 'Vous n\'avez pas le password');

    const email = req.body.email;
    const password = req.body.password;
    const log = await getUser(db, email, password)

    if (log.length === 0){
        return sendError(res, 'Mail et/ou mot de passe incorrect');
    }
    else{
        auth.setSessionCookie(req, res, {userId: log[0]._id})
        sendMessage(res, 'Authentification reusie');
    }
}

module.exports = checkLogin