const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const SpotifyStrategy = require('passport-spotify').Strategy;
const bodyParser = require('body-parser');
const production = process.env.NODE_ENV == 'production';

// setting up the Spotify API
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: '',
  clientSecret: '',
  scope: ''
});

// Spotify Login
const app = express();
app.use(cookieParser());

if (production) {
  app.use(express.static('./dist'));
} else {
  app.use(express.static('./client/public'));
}

// Set up Passport

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
