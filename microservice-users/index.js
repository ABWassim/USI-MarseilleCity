const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3000

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

const uri = "mongodb+srv://root:twRRQWwuHUuEl3Ts@db-users.avxcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let db
 
MongoClient.connect(uri, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db("users");
});


app.post('/test', (req, res) => {
  db.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.listen(3000, () => {console.log ('users listening on port 3000')});