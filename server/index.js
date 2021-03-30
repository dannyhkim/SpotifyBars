const express = require("express");
const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const SpotifyStrategy = require("passport-spotify").Strategy;
const bodyParser = require("body-parser");
const production = process.env.NODE_ENV == "production";
const { getLyrics, getSong } = require("genius-lyrics-api");

let settings = {};

// grab tokens from config
if (production) {
  settings = require("./config.prod");
} else {
  settings = require("./config");
}
const host = process.env.HOST || "http://localhost:3000";

// setting up the Spotify API
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
  clientId: settings.spotify.clientId,
  clientSecret: settings.spotify.secret,
  scope: settings.spotify.scopes,
});

// Spotify Login setup
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

if (production) {
  app.use(express.static("./dist"));
} else {
  app.use(express.static("./client/public"));
}

// middleware required to initialize Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Passport setup
passport.use(
  "spotify",
  new SpotifyStrategy(
    {
      clientID: settings.spotify.clientId,
      clientSecret: settings.spotify.secret,
      callbackURL: settings.login.callback,
      scope: settings.spotify.scopes,
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      const userResponse = {
        accessToken,
        refreshToken,
        expires_in,
        ...profile,
      };
      return done(null, userResponse);
    }
  )
);

// we gonna need access token and refresh token and then we can use spotifyApi to get current track data
app.get('/api/fetchSong', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  const cookies = req.cookies;
  console.log("Cookies working now?" + JSON.stringify(req.cookies));
  const token = cookies['user.token'];
  const refresh = cookies['user.refresh'];

  if (token) {
    spotifyApi.setAccessToken(token);
    spotifyApi.setRefreshToken(refresh);

    spotifyApi
      .getMyCurrentPlayingTrack({})
      .then((result) => {
        res.status(200).send({ result });
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          res.redirect(`${host}/auth/refresh`);
        }
      });
  } else {
    res.status(200).send({ error: 'No access token' });
  }
});

// Passport Authentication
app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: settings.spotify.scopes,
    showDialog: true,
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/'
  }),
  (req, res) => {
    console.log('User logged in...');
    res.cookie('loggedIn', true, {
      maxAge: 1000*60*60*24*7,
      httpOnly: false
    });
    res.cookie('user.token', req.user.accessToken, {
      maxAge: 1000*60*60*24*7,
      httpOnly: true
    });
    res.cookie('user.refresh', req.user.refreshToken, {
      maxAge: 1000*60*60*24*7,
      httpOnly: true
    });
    res.send();
    res.redirect(`${host}/mainmenu`);
  }
);

app.get('/auth/refresh', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  console.log("Refreshing token...");
  const cookies = req.cookies;
})

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Lyrics
// const Lyricist = require("lyricist");
// const lyricist = new Lyricist(settings.genius.token);


app.get("/api/fetchLyrics", (req, res) => {
  console.log('Searching for lyrics...');

  const options = {
    apiKey: settings.genius.token,
    title: req.song.title,
    artist: req.song.artist,
    optimizeQuery: true,
  }
  getLyrics(options)
    .then(lyrics => {
      res.status(200).json(lyrics);
    })
    .catch(err => {
      res.status(500).json({ err });
    })
});

// trying different api
const options = {
  apiKey: settings.genius.token,
  title: "Loyal",
  artist: "Chris Brown",
  optimizeQuery: true,
};

getLyrics(options).then((lyrics) => console.log(lyrics));

getSong(options).then((song) =>
  console.log(`
	${song.id}
	${song.url}
	${song.albumArt}
	${song.lyrics}`)
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
