const express = require('express');
let app = express();
const { getReposByUsername } = require('../helpers/github');
const { save } = require('../database/index');
const { getRepos } = require('../database/index');
const { Repo } = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  var username = req.body.user;
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // 1. in this route, you'll use your getReposByUsername function to fetch the specified user's GitHub repos,
  getReposByUsername(username)
  // 2. then use your save function to store the repo information into your database.
  .then((repos) => {
    save(repos)
  })
  .then((repos) => {
    res.end()
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  //console.log('In the get request')
  getRepos()
  .then((repos) => {
    res.send(JSON.stringify(repos))
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

