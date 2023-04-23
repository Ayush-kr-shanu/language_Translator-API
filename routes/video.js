const express=require("express");
const { Video } = require("../models/videomodel");
const videoRouter=express.Router()

videoRouter.get('/videos/:id/duration', async (req, res) => {
    const { id } = req.params;
    try {
      const video = await Video.findById(id); 
      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }
      const { duration } = video;
      res.json({ duration });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while getting the video duration' });
    }
  });
  
  
  videoRouter.post('/videos/:id/like', async (req, res) => {
    const { id } = req.params;
    try {
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }
  
      let { likes, clicks } = await getLikesAndClicksForVideo(id, req.session.userId);
  
      // check if the user has clicked twice
      if (clicks < 2) {
        clicks++;
        await updateClicksForVideo(id, req.session.userId, clicks);
        return res.json({ message: 'One more click required to like the video' });
      }

      likes++;
      clicks=0
      await updateLikesAndClicksForVideo(id, req.session.userId, likes, clicks);
  
      video.likes = likes;
      await video.save();
  
      res.json({ message: 'Video liked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while liking the video' });
    }
  });

  //video Editor 
  videoRouter.post('/videos/:id/edit', async (req, res) => {
    const { id } = req.params;
    const { crop, text, compress, mirror } = req.body;
    try {
      // get the video data from the database
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }
      // edit the video
      if (crop) {
        video.crop = crop;
      }
      if (text) {
        video.text = text;
      }
      if (compress) {
        video.compress = compress;
      }
      if (mirror) {
        video.mirror = mirror;
      }
      // save the updated video data to the database
      await video.save();
      res.json({ message: 'Video edited successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while editing the video' });
    }
  });
  
  
  
  videoRouter.get('/search', async (req, res) => {
    const { user } = req.query;
    try {
      // find videos based on the user's profile
      const videos = await Video.find({ user });
      res.json({ videos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for videos' });
    }
  });
  

  module.exports={videoRouter}