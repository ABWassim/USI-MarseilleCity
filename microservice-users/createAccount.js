const {sendMessage, sendError} = require('./message');
const getUser = require('./mongodb_requests/userRequests').getUser
const insertUser = require('./mongodb_requests/userRequests').insertUser
const auth = require('./auth.js');
const sha256 = require('sha256')

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

    const [code1, existingUser] = await getUser(db, {email: req.body.email});
    if (code1 === 'error'){
        return sendError(res, existingUser);
    }
    if (existingUser.length !== 0){
        return sendError(res, 'Email already used');
    }

    const doc = {
        email : req.body.email,
        password: sha256(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        valid: 1
    }

    const [code2, newUserId] = await insertUser(db, doc);
    if (code2 === 'error'){
        return sendError(res, newUserId);
    }
    auth.setSessionCookie(req, res, {userId: newUserId});
    sendMessage(res, 'Account created and user authenticated');
}

module.exports = createAccount