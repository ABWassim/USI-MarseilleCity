const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3000

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));

const uri = "mongodb+srv://root:twRRQWwuHUuEl3Ts@db-users.avxcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let db
 
MongoClient.connect(uri, function(err, client) {
  db = client.db("users");
});

const checkLogin = require ('./checkLogin');
const createAccount = require('./createAccount')
app.post('/checkLogin', (req, res) => {checkLogin(req, res, db);});
app.post('/createAccount', (req, res) => {createAccount(req, res, db);});


app.listen(3000, () => {console.log ('users listening on port 3000')});