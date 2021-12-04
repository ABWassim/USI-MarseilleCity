const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const routes = require('./sendImage');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'uploads')));

const mongoURI = 'mongodb+srv://wass:aCtH7W3fisbwrze@adverts.t3hmq.mongodb.net/adverts?retryWrites=true&w=majority';
let db
MongoClient.connect(mongoURI, function(err, client) {
    db = client.db("adverts");
});

cloudinary.config({  //Your Cloudinary API Data
    cloud_name: 'dao4eq5ux',
    api_key: '167163516826751',
    api_secret: 'N7yNLqVHVrF769e9KDprse0lO_s'
});

const getAdverts = require ('./getAdverts');
const existingAdvert = require('./existingAdvert');
const addAdvert = require('./addAdvert');

app.post('/getAdverts', (req, res) => {getAdverts(req, res, db);});
app.post('/existingAdvert', (req, res) => {existingAdvert(req, res, db);});
app.post('/addAdvert', (req, res) => {addAdvert(req, res, db);});


const port = 3003;
app.listen(port, () => console.log(`Server started on port ${port}`));