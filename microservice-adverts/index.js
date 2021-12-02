const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));

const mongoURI = 'mongodb+srv://wass:aCtH7W3fisbwrze@adverts.t3hmq.mongodb.net/adverts?retryWrites=true&w=majority';
let db
MongoClient.connect(mongoURI, function(err, client) {
    db = client.db("adverts");
});

const getAdverts = require ('./getAdverts');

app.post('/getAdverts', (req, res) => {getAdverts(req, res, db);});

const port = 3003;
app.listen(port, () => console.log(`Server started on port ${port}`));