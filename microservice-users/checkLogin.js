const {sendMessage, sendError} = require('./message');
const getUser = require('./mongodb_requests/userRequests').getUser
const auth = require('./auth.js');

async function checkLogin(req, res, db)
{
    if (!req.body.hasOwnProperty('email'))
        return sendError(res, 'No email was provided');

    if (!req.body.hasOwnProperty('password'))
        return sendError(res, 'No password was provided');

    const doc = {
        email: req.body.email,
        password: req.body.password
    };

    const [code, log] = await getUser(db, doc);


    if (code === 'error'){
        return sendError(res, log);
    }
    else if (log.length === 0){
        return sendError(res, 'Wrong mail/password combination');
    }
    else if (log[0].valid === 0){
        return sendError(res, 'Account suspended');
    }
    else {
        const _userId = log[0]._id;
        auth.setSessionCookie(req, res, {userId: _userId});
        sendMessage(res, 'Authenticated');
    }
}

module.exports = checkLogin