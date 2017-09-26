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
  quantity: Number,
  description: String,
  clicks: Number
});

var videos = mongoose.model('video', videoSchema);

var selectAll = function(callback) {
  videos.find({}, function(err, videos) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, videos);
    }
  });
};

module.exports.selectAll = selectAll;