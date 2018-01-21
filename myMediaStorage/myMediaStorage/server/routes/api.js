const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

db = 'mongodb://root:root@ds263707.mlab.com:63707/saved-media';

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
  if(err) {
    console.error('Error! ' + err);
  }
});

router.get('/', (req, res) => {
  res.send('api works');
});

//////////////////////
// Video Routes
//////////////////////

// Find all videos
router.get('/videos', function(req, res) {
  console.log('Get request for all videos');
  Video.find({})
  .exec(function(err, videos) {
    if(err) {
      console.log('Error retrieving videos');
    } else {
      res.json(videos);
    }
  })

});

// Find one video
router.get('/videos/:id', function(req, res) {
  console.log('Get request for one video');
  Video.findById(req.params.id)
  .exec(function(err, video) {
    if(err) {
      console.log('Error retrieving video');
    } else {
      res.json(video);
    }
  })

});

// Save a video
router.post('/video', function(req, res) {
  console.log('Post a video');
  const newVideo = new Video();
  newVideo.title = req.body.title,
  newVideo.description = req.body.description,
  newVideo.imageUrl = req.body.imageUrl,
  newVideo.videoUrl = req.body.videoUrl,
  newVideo.publishedAt = req.body.publishedAt
  newVideo.save(function(err, insertedVideo) {
      if(err) {
        console.log('Error saving video');
      } else {
        res.json(insertedVideo);
      }
  });
});

// Delete a video
router.delete('/video/:id', function(req, res) {
  console.log('Deleting a video');
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
    if(err) {
      res.send('Error deleting video');
    } else {
      res.json(deletedVideo);
    }
  });
});

module.exports = router;
