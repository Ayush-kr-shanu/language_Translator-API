const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const express = require('express');
const app = express();
const path = require('path');

// Initialize i18next configuration
i18next
  .use(Backend)
  .init({
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
    },
    fallbackLng: 'en',
    preload: ['en', 'es', 'fr'],
    saveMissing: true, 
  });

// Middleware to set language based on user preferences
function setLanguage(req, res, next) {
  const language = req.query.language || 'en'; // Check query parameter for language, default to English
  req.language = language;
  next();
}

// Serve static files from public directory
app.use(express.static('public'));

// Example of translating a collection of strings
app.get('/strings', setLanguage, function(req, res) {
  const strings = {
    greeting: i18next.t('greeting', { lng: req.language }),
    farewell: i18next.t('farewell', { lng: req.language }),
    error: i18next.t('error', { lng: req.language }),
  };
  res.send(strings);
});

// <p data-i18n="greeting">Hello World</p>
// i18next.init(function() {
//   $('body').i18n();
// });


// Start the server
app.listen(4500, () => {
  console.log('Server is running on port 3000');
});


