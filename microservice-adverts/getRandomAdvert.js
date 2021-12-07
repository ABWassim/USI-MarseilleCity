const {sendMessage, sendError} = require('./message');
const randomAdvert = require('./mongodb_requests/advertRequests').randomAdvert
const auth = require('./auth.js');

async function getRandomAdvert(req, res, db)
{
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);

    if (userId === -1)
        return sendError (res, 'Not authenticated');

    const [code, log] = await randomAdvert(db);

    if (code === 'error'){
        return sendError(res, log);
    }

    return sendMessage(res, log[0]);
}

module.exports = getRandomAdvert