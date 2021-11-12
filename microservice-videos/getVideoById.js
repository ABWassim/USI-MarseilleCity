const {sendMessage, sendError} = require('./message');

function getVimeoVideoById(vimeoClient, _id) {

    return new Promise((resolve, reject) => {
        vimeoClient.request({
            method: 'GET',
            path: '/videos/' + _id,
        }, function (error, body, status_code, headers) {
            if (error) {
                reject(['error', error])
            }

            const _title = body.name;
            const _urlVideo = body.link;
            const _channel = body.user.name;
            const _urlChannel = body.user.link;
            const _date = body.release_time;
            const _thumbnail = body.pictures.base_link + '_1280x720?r=pad';
            const _description = body.description

            const video = {
                id: _id,
                title : _title,
                urlVideo : _urlVideo,
                channel : _channel,
                urlChannel : _urlChannel,
                date : _date,
                thumbnail : _thumbnail,
                description : _description,
                provider : 'vimeo'
            }

            resolve(['ok', video]);
        })
    });

}

async function getYoutubeVideoById(youtubeClient, _id) {
    try {
        const response = await youtubeClient.videos.list({
            "part": ["snippet"],
            "id" : [_id]
        });

        const _title = response.data.items[0].snippet.title;
        const _urlVideo = 'https://www.youtube.com/watch?v=' + _id;
        const _channel = response.data.items[0].snippet.channelTitle;
        const _urlChannel = 'https://www.youtube.com/c/' + response.data.items[0].snippet.channelId;
        const _date = response.data.items[0].snippet.publishedAt;
        const _thumbnail = response.data.items[0].snippet.thumbnails.high.url;
        const _description = response.data.items[0].snippet.description;

        const video = {
            id: _id,
            title : _title,
            urlVideo : _urlVideo,
            channel : _channel,
            urlChannel : _urlChannel,
            date : _date,
            thumbnail : _thumbnail,
            description : _description,
            provider : 'youtube'
        }

        return ['ok', video];
    }
    catch (err) {
        return ['error', err];
    }
}

async function getVideoById(req, res, youtubeClient, vimeoClient)
{
    if (!req.body.hasOwnProperty('id'))
        return sendError(res, 'No video id was provided');
    if (!req.body.hasOwnProperty('provider'))
        return sendError(res, 'No service provider was given');

    const id = req.body.id;
    const provider = req.body.provider;

    if (provider === 'youtube'){
        const [msg, video] = await getYoutubeVideoById(youtubeClient, id);
        if (msg === 'error'){
            return sendError(res, video);
        }
        sendMessage(res, video);
    }
    else {
        const [msg, video] = await getVimeoVideoById(vimeoClient, id);
        if (msg === 'error'){
            return sendError(res, video);
        }
        sendMessage(res, video);
    }
}

module.exports = getVideoById;