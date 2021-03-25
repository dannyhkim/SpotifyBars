const express = require("express");
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
const host = process.env.HOST || 'http://localhost:3000';

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

// Passport Authentication
app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: settings.spotify.scopes,
    showDialog: true,
  })
);

app.get(
  settings.login.callback,
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log("User logged in");
    res.redirect(`${host}`);
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Lyrics
const Lyricist = require("lyricist");

const lyricist = new Lyricist(settings.genius.token);
app.get("/api/fetchLyrics", (req, res) => {
  console.log(`Lyrics search: ${req.query.query}...`);
});

// const song = "whatever";

// lyricist
//   .search({ query: song })
//   .then((results) => {
//     console.log(`${results.length} results found for ${song}`);
//     const resultPromises = [];
//     results.slice(0, 5).forEach((result) => {
//       resultPromises.push(
//         lyricist.song(result.id, { fetchLyrics: true, textFormat: "html" })
//       );
//     });
//     return Promise.all(resultPromises);
//   })
//   .then((results) => {
//     console.log(`Lyrics: ${results.forEach(song => console.log(JSON.stringify(song.lyrics)))} \n`);
//     // res.status(200).json(results);
//   })
//   .catch((error) => {
//     // res.status(500).json({ error });
//     console.log("error" + error);
//   });

// lyricist.song(714198).then((song) => console.log(song.title));

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
