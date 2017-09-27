var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var request = require('request');

var youtube = {
  web: 'https://www.googleapis.com/youtube/v3/search',
  accessToken: 'YOUR_ACCESS_TOKEN'
}

var app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/grab', (req, res) => {
  console.log(req.body)
  var query = JSON.parse(req.body.query);
  console.log(query)
  db.selectAllFromPlaylist(query, (err, response)=> {
    if (err) {
      res.json(err);
    } 
    res.json(response);
  })
})

app.post('/search', (req, res) => {
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
        response.body = JSON.parse(response.body)
        var videos = [];
        response.body.items.forEach(item => {
          var vid = {};
          vid.title = item.snippet.title;
          vid.description = item.snippet.description;
          vid.id = item.id.videoId;
          videos.push(vid);
        })
        res.json(videos);
      }
  });
});

app.get('/playlists', (req, res) => {
  db.selectAllPlaylists((err, playlists) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(playlists)
      res.json(playlists);
    }
  });

})

app.post('/playlists', (req, res) => {
  var playlist = JSON.stringify(req.body.playlist);
  var video = JSON.stringify(req.body.video);

  db.updatePlaylist(playlist, video, (err, response)=>{
    if (err) {
      res.json(err);
    }
    console.log('response from db on update:', response)
    res.json('updated playlist with video');
  })

})


app.post('/videos', (req, res) => {
  var playlist = req.body.playlist;
  var video = req.body.video;
  var data = {};
  data.playlist = playlist;
  data.video = video;
  data = JSON.stringify(data);

  db.createPlaylist(data, (err, response) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(response)
      res.json('successful post');
    }
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

