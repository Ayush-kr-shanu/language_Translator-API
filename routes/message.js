const express = require('express');
const { Message, Friend } = require('../models/messagemodel');
const messageRoute=express.Router()



messageRoute.post('/messages', async (req, res) => {
    const { sender, receiver, message } = req.body;
    try {
      // check if the users are friends
      const areFriends = await Friend.exists({ user1: sender, user2: receiver });
      if (areFriends) {
        // send the message
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();
        res.json({ message: 'Message sent successfully', newMessage });
      } else {
        // check if the users have enough diamonds
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);
        if (senderUser.diamonds >= 10 && receiverUser.diamonds >= 10) {
          // deduct the diamonds from both users
          senderUser.diamonds -= 10;
          await senderUser.save();
          await receiverUser.save();
          // send the message
          const newMessage = new Message({ sender, receiver, message });
          await newMessage.save();
          res.json({ message: 'Message sent successfully', newMessage });
        } else {
          res.status(400).json({ error: 'Not enough diamonds' });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while sending the message' });
    }
  });
  

  module.exports={
    messageRoute
  }