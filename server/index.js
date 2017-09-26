var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var request = require('request');

var youtube = {
  web: 'https://www.googleapis.com/youtube/v3/search',
  accessToken: 'AIzaSyAHd7WF54c_qnvYiSTRP9N_6EEzNUMmttk'
}

var app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/../react-client/dist'));


app.post('/search', (req, res) => {
  console.log('query', req.body.query)
  var query = req.body.query;
  var params = {
    'part': 'snippet',
    key: youtube.accessToken,
    type: 'video',
    maxResults: 5,
    q: query,
    videoEmbeddable: true
  };
  request(
    {
      url: youtube.web, 
      method: 'GET',
      qs: params,
    },

    (err, response, body) => {
      if(err) {
        console.log('err', err);
      } else {
        console.log('response', response.body)
      }
  });

});

app.get('/videos', (req, res) => {
  db.selectAll((err, videos) => {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(videos);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

