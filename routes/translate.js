const express = require('express');
const translateRoute=express.Router()

translateRoute.post('/translate', async (req, res) => {
    const { text, from, to } = req.body;
    try {
      const { default: translate } = await import("translate");
      const translatedText = await translate(text, { from, to });
      res.json({ translatedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while translating the text' });
    }
  });

  module.exports={translateRoute}