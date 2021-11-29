const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const cookieParser = require('cookie-parser');
const routes = require("./sendImage");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));

app.use('', routes);

const mongoURI = 'mongodb+srv://wass:aCtH7W3fisbwrze@adverts.t3hmq.mongodb.net/adverts?retryWrites=true&w=majority';
let db;
MongoClient.connect(mongoURI, function(err, client) {
    db = client.db("adverts");
});

const port = 3003;
app.listen(port, () => console.log(`Server started on port ${port}`));