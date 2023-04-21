const express = require('express');

const app = express();

app.use(express.json());

//API for handeling translate
app.use(express.json());

app.post('/translate', async (req, res) => {
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



app.listen(4500, () => {
  console.log('Server is running on port 4500');
});

