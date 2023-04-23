const express = require('express');
const { translateRoute } = require('./routes/translate');
const { videoRouter } = require('./routes/video');
const { messageRoute } = require('./routes/message');

const app = express();

app.use(express.json());


app.use(express.json());
app.use("/",translateRoute)
app.use("/", videoRouter)

//Back button hhandler
app.get('/back', (req, res) => {
  res.redirect('back');
});


app.use("/", messageRoute)



app.listen(4500, () => {
  console.log('Server is running on port 4500');
});

