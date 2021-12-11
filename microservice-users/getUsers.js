const {sendMessage, sendError} = require('./message');
const getEveryUser = require('./mongodb_requests/userRequests').getEveryUser
const auth = require('./auth.js');

async function getUsers(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'User is not authenticated');

    const [code, log] = await getEveryUser(db);
    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log);
}

module.exports = getUsers;