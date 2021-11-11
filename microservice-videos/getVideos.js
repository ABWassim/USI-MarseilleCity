const { query } = require('express');
const {sendMessage, sendError} = require('./message');

function getVimeoVideos(vimeoClient, query) {

  return new Promise((resolve, reject) => {
      vimeoClient.request({
        method: 'GET',
        path: '/videos?per_page=10&sort=relevant&query=' + query,
      }, function (error, body, status_code, headers) {
        if (error) {
          reject(error) 
        }

        const titles = body.data.map((item) => item.name);
        const urlVideos = body.data.map((item) => item.link);
        const channels = body.data.map((item) => item.user.name);
        const urlChannels = body.data.map((item) => item.user.link);
        const dates = body.data.map((item) => item.release_time);
        const thumbnails = body.data.map((item) => item.pictures.base_link + '_1280x720?r=pad');
        const descriptions = body.data.map((item) => item.description);

        var allVideos = []
        for (var i = 0 ; i < titles.length ; i++){
          allVideos.push({
            title : titles[i],
            urlVideo : urlVideos[i],
            channel : channels[i],
            urlChannel : urlChannels[i],
            date : dates[i],
            thumbnail : thumbnails[i],
            description : descriptions[i]
          });
        }
        resolve(allVideos);
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
            title : titles[i],
            urlVideo : 'https://www.youtube.com/watch?v=' + urlVideos[i],
            channel : channels[i],
            urlChannel : 'https://www.youtube.com/c/' + urlChannels[i],
            date : dates[i],
            thumbnail : thumbnails[i],
            description : descriptions[i]
          });
        }

        return allVideos;
    } 
      catch (err) {
        return -1;
    }
}

async function getVideos(req, res, youtubeClient, vimeoClient)
{
  if (!req.body.hasOwnProperty('query'))
      return sendError(res, 'Vous n\'avez pas la query');

  const query = req.body.query;

  const youtubeVideos = await getYoutubeVideos(youtubeClient, query);
  if (youtubeVideos === -1){
    return sendError(res, 'Erreur Youtube');
  }
  const vimeoVideos = await getVimeoVideos(vimeoClient, query);

  sendMessage(res, youtubeVideos.concat(vimeoVideos));
}

module.exports = getVideos;