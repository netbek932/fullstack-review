const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {type: Number, unique: true},
  repo_url: String,
  repo_name: String,
  owner_id: Number,
  user_name: String,
  stargazers_count: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for (var i = 0; i < repos.length; i++) {
    var repo = repos[i];
    var newRepo = new Repo({
      repo_id: repo.id,
      repo_url: repo.html_url,
      repo_name: repo.name,
      owner_id: repo.owner.id,
      user_name: repo.owner.login,
      stargazers_count: repo.stargazers_count
    })
    .then((savedRepo) => {
      //use the retured user document for something?
      res.redirect("/");
    })
    .catch((error) => {
      console.log(err);
      res.send(400, "Repo could not be saved");
    });
  }
}

module.exports.save = save;