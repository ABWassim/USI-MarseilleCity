const {sendMessage, sendError} = require('./message');
const changeStatus = require('./mongodb_requests/userRequests').changeStatus;
const auth = require('./auth.js');

async function changeStatusAccount(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    if (!req.body.hasOwnProperty('email')){
        return sendError(res, 'Email is missing');
    }
    if (!req.body.hasOwnProperty('valid')){
        return sendError(res, 'Valid is missing');
    }

    const _email = req.body.email;
    const _valid = (req.body.valid + 1)%2;

    const query = {
        email: _email
    }

    const update = {
        $set: {valid: _valid}
    }

    const [code, log] = await changeStatus(db, query, update);
    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, {email: _email, valid: _valid});
}

module.exports = changeStatusAccount;