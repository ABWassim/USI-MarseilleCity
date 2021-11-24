const {sendMessage, sendError} = require('./message');


function generateYoutubePageToken(limit, page) {
    let s = 'A'
    let start = 1 + (page - 1)*limit;
    let array = ['A','E','I','M','Q','U','Y','c','g','k','o','s','w',0,4,8];
    return 'C' + String.fromCharCode(s.charCodeAt(0) + Math.floor(start / 16)) + array[(start % 16) - 1] + 'QAA';
}

function getVimeoVideos(vimeoClient, query, page) {
    try {
        return new Promise((resolve, reject) => {
            const pageS = page.toString();
            vimeoClient.request({
                method: 'GET',
                path: '/videos?per_page=10&page=' + pageS + '&query=' + query,
            }, function (error, body, status_code, headers) {
                if (error) {
                    resolve(['error', status_code]) ;
                    return;
                }

                var allVideos = []
                const titles = body.data.map((item) => item.name);
                const uris = body.data.map((item) => item.uri);
                const urlVideos = body.data.map((item) => item.link);
                const channels = body.data.map((item) => item.user.name);
                const urlChannels = body.data.map((item) => item.user.link);
                const dates = body.data.map((item) => item.release_time);
                const thumbnails = body.data.map((item) => item.pictures.base_link + '_1280x720?r=pad');
                const descriptions = body.data.map((item) => item.description);


                for (var i = 0 ; i < titles.length ; i++){
                    allVideos.push({
                        id: (uris[i].split('/'))[2],
                        title : titles[i],
                        urlVideo : urlVideos[i],
                        channel : channels[i],
                        urlChannel : urlChannels[i],
                        date : dates[i],
                        thumbnail : thumbnails[i],
                        description : descriptions[i],
                        provider: 'vimeo'
                    });
                }

                resolve(['ok', allVideos]);
            })
        });
    }
    catch (e) {
        console.log(e)
    }


}

async function getYoutubeVideos(youtubeClient, query, page) {
    try {
        const token = generateYoutubePageToken(10, page)
        const response = await youtubeClient.search.list({
            part: ["snippet"],
            q: query,
            maxResults: 10,
            type: ['video'],
            pageToken: token
        });
    
        const titles = response.data.items.map((item) => item.snippet.title);
        const urlVideos = response.data.items.map((item) => item.id.videoId);
        const channels = response.data.items.map((item) => item.snippet.channelTitle);
        const urlChannels = response.data.items.map((item) => item.snippet.channelId);
        const dates = response.data.items.map((item) => item.snippet.publishedAt);
        const thumbnails = response.data.items.map((item) => item.snippet.thumbnails.high.url);
        const descriptions = response.data.items.map((item) => item.snippet.description);

        var allVideos = []
        for (var i = 0 ; i < titles.length ; i++){
          allVideos.push({
              id : urlVideos[i],
              title : titles[i],
              urlVideo : 'https://www.youtube.com/watch?v=' + urlVideos[i],
              channel : channels[i],
              urlChannel : 'https://www.youtube.com/c/' + urlChannels[i],
              date : dates[i],
              thumbnail : thumbnails[i],
              description : descriptions[i],
              provider: 'youtube'
          });
        }

        return ['ok', allVideos];
    } 
      catch (err) {
        console.log(err);
        return ['error', err];
    }
}

async function getVideos(req, res, youtubeClient, vimeoClient)
{
  if (!req.body.hasOwnProperty('query'))
      return sendError(res, 'No query was provided');

    if (!req.body.hasOwnProperty('page'))
        return sendError(res, 'No page was provided');

  const query = req.body.query;
  const page = req.body.page

  const [msg1, youtubeVideos] = await getYoutubeVideos(youtubeClient, query, page);
  if (msg1 === 'error'){
    return sendError(res, youtubeVideos);
  }

  let [msg2, vimeoVideos] = await getVimeoVideos(vimeoClient, query, page)
  if (msg2 === 'error'){
      vimeoVideos = []
  }

  return sendMessage(res, youtubeVideos.concat(vimeoVideos));
}

module.exports = getVideos;