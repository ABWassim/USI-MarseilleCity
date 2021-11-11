function sendMessage (res, _data) {
    res.json({ status: 'ok', data: _data });
}

function sendError (res, _reason) {
    res.json({ status: 'error', data: {reason: _reason}});
}

module.exports = { sendMessage, sendError };
