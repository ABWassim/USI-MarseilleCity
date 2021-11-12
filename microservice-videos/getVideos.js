const {sendMessage, sendError} = require('./message');

function getVimeoVideos(vimeoClient, query) {

  return new Promise((resolve, reject) => {
      vimeoClient.request({
        method: 'GET',
        path: '/videos?per_page=10&sort=relevant&query=' + query,
      }, function (error, body, status_code, headers) {
        if (error) {
          reject(['error', error]) ;
        }

        const titles = body.data.map((item) => item.name);
        const uris = body.data.map((item) => item.uri);
        const urlVideos = body.data.map((item) => item.link);
        const channels = body.data.map((item) => item.user.name);
        const urlChannels = body.data.map((item) => item.user.link);
        const dates = body.data.map((item) => item.release_time);
        const thumbnails = body.data.map((item) => item.pictures.base_link + '_1280x720?r=pad');
        const descriptions = body.data.map((item) => item.description);

        var allVideos = []
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

async function getYoutubeVideos(youtubeClient, query) {
    try {
        const response = await youtubeClient.search.list({
          part: "snippet",
          q: query,
          regionCode: "FR",
          maxResults: 10,
          type: 'video',
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
      return sendError(res, 'Vous n\'avez pas la query');

  const query = req.body.query;

  const [msg1, youtubeVideos] = await getYoutubeVideos(youtubeClient, query);
  if (msg1 === 'error'){
    return sendError(res, youtubeVideos);
  }

  const [msg2, vimeoVideos] = await getVimeoVideos(vimeoClient, query);
  if (msg2 === 'error'){
      return sendError(res, vimeoVideos);
  }

  sendMessage(res, youtubeVideos.concat(vimeoVideos));
}

module.exports = getVideos;