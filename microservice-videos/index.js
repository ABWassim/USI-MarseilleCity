const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(cookieParser())

const {google} = require('googleapis')
const apiKey = "AIzaSyDLgaECqp4fWTyG34025iTzjtu8maEWy3o"
const youtubeClient = google.youtube({
    version: "v3",
    auth: apiKey,
})

let Vimeo = require('vimeo').Vimeo;
let vimeoClient = new Vimeo("71dfd459a0c891822b0bcdd1a572fff6d7f57354", 
"xpwQoTsadoZyYCRguAkPdXd5zAq3iuTmw+7Dtr3Qw+ngN6wTouE6+U/vQtUaWgWGZh4OS5cTF0DVj3sCJQse9zkA7FUHH/tB1ZZDuXTotzyChjnTMjoLmqgQ4byFOHCA", 
"8584df442529a718b12c6a2298d73476");

const getVideos = require ('./getVideos');
app.post('/getVideos', (req, res) => {getVideos(req, res, youtubeClient, vimeoClient);});
app.listen(3001, () => {console.log ('videos listening on port 3001')});

