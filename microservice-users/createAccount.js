const {sendMessage, sendError} = require('./message');
const getUser = require('./mongodb_requests/userRequests').getUser
const insertUser = require('./mongodb_requests/userRequests').insertUser
const auth = require('./auth.js');

async function createAccount(req, res, db)
{
    if (!req.body.hasOwnProperty('email'))
        return sendError(res, 'No email was provided');

    if (!req.body.hasOwnProperty('password'))
        return sendError(res, 'No password was provided');

    if (!req.body.hasOwnProperty('firstName'))
        return sendError(res, 'No firstName was provided');

    if (!req.body.hasOwnProperty('lastName'))
        return sendError(res, 'No lastName was provided');

    if (!req.body.hasOwnProperty('nationality'))
        return sendError(res, 'No nationality was provided');

    const existingUser = await getUser(db, {email: req.body.email});
    if (existingUser.length !== 0){
        return sendError(res, 'Email already used');
    }

    const doc = {
        email : req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        valid: 1
    }

    const newUserId = await insertUser(db, doc);
    auth.setSessionCookie(req, res, {userId: newUserId});
    sendMessage(res, 'Account created and user authenticated');
}

module.exports = createAccount