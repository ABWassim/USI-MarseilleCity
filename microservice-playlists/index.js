const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3002

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));

const uri = "mongodb+srv://root:07tIGVyBaUWKjdPW@usi-cluster.9ehpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let db;

MongoClient.connect(uri, function(err, client) {
  db = client.db("playlists");
});

const getPlaylists = require ('./getPlaylists');
const getVideosOfPlaylist = require('./getVideosOfPlaylist');
const addPlaylist = require('./addPlaylist');
const deletePlaylist = require('./deletePlaylist');
const addVideo = require('./addVideo');
const deleteVideo = require('./deleteVideo');
const renamePlaylist = require('./renamePlaylist');


app.post('/getPlaylists', (req, res) => {getPlaylists(req, res, db);});
app.post('/getVideosOfPlaylist', (req, res) => {getVideosOfPlaylist(req, res, db);});
app.post('/addPlaylist', (req, res) => {addPlaylist(req, res, db);});
app.post('/deletePlaylist', (req, res) => {deletePlaylist(req, res, db);});
app.post('/addVideo', (req, res) => {addVideo(req, res, db);});
app.post('/deleteVideo', (req, res) => {deleteVideo(req, res, db);});
app.post('/renamePlaylist', (req, res) => {renamePlaylist(req, res, db);});


app.listen(port, () => {console.log ('playlists listening on port 3002')});