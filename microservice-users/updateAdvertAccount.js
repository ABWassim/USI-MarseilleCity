const {sendMessage, sendError} = require('./message');
const auth = require('./auth.js');
const {ObjectId} = require('mongodb');
const updateUser = require('./mongodb_requests/userRequests').updateUser
const getInfos = require('./mongodb_requests/userRequests').getInfos
const sha256 = require('sha256')

async function updateAdvertAccount(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('newFirstName'))
        return sendError(res, 'No new First Name was provided');

    if (!req.body.hasOwnProperty('newLastName'))
        return sendError(res, 'No new Last Name was provided');

    if (!req.body.hasOwnProperty('newNationality'))
        return sendError(res, 'No new Nationality was provided');

    if (!req.body.hasOwnProperty('newCompany'))
        return sendError(res, 'No new company was provided');

    if (!req.body.hasOwnProperty('oldPassword'))
        return sendError(res, 'No old Password was provided');

    if (!req.body.hasOwnProperty('newPassword'))
        return sendError(res, 'No new Password was provided');

    const newFirstName = req.body.newFirstName;
    const newLastName = req.body.newLastName;
    const newNationality = req.body.newNationality;
    const newCompany = req.body.newCompany;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const query = {
        _id : ObjectId(userId)
    }

    if (oldPassword !== ''){
        const [code, log] = await getInfos(db, query);
        if (code === 'error'){
            return sendError(res, log);
        }
        if (log[0].password !== sha256(oldPassword)){
            return sendError(res, 'Old password incorrect');
        }
    }

    let _update = {}

    if (newFirstName !== ''){
        _update.firstName = newFirstName;
    }
    if (newLastName !== ''){
        _update.lastName = newLastName;
    }
    if (newNationality !== ''){
        _update.nationality = newNationality;
    }
    if (newCompany !== ''){
        _update.company = newCompany;
    }
    if (newPassword !== ''){
        _update.password = sha256(newPassword);
    }

    const update = { $set: _update };

    const [code, log] = await updateUser(db, query, update);
    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log);
}

module.exports = updateAdvertAccount;