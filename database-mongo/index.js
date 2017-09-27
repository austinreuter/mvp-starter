var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var videoSchema = mongoose.Schema({
  playlist: String,
  videos: Array,
  quantity: Number,
  description: String,
  clicks: Number,
  name: String
});

var userSchema = mongoose.Schema({
  name: String,
  totalLikes: Number
});

var playlist = mongoose.model('video', videoSchema);


var updatePlaylist = function(pl, video, callback) {
  //todo: add to quantity
  pl = JSON.parse(pl);
  video = JSON.parse(video);
  playlist.findOneAndUpdate(
    {playlist: pl},
    {$push: {videos: video}},
    {'new': true, upsert: true},
    (err, res) => callback(err, res)
  );

};

var createPlaylist = function(video, callback) {
  video = JSON.parse(video);

  if (video.playlist) {
    var newPlaylist = new playlist({
      playlist: video.playlist,
      videos: [video.video],
      quantity: 1
    });
    newPlaylist.save((err, data) => {
      console.log('save in db')
      callback(err, data);
    })
  }
}

var selectAllFromPlaylist = function(pl, callback) {
  pl = JSON.parse(pl);
  playlist.find({playlist: pl}, function(err, videos) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, videos);
    }
  });
};

var selectAllPlaylists = function(callback) {
  playlist.find({}, function(err, videos) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, videos);
    }
  });
}

//module.exports.selectAllVideos = selectAllVideos;
module.exports.selectAllPlaylists = selectAllPlaylists;
module.exports.createPlaylist = createPlaylist;
module.exports.selectAllFromPlaylist = selectAllFromPlaylist;
module.exports.updatePlaylist = updatePlaylist;