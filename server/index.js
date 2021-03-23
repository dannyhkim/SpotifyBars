const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const SpotifyStrategy = require("passport-spotify").Strategy;
const bodyParser = require("body-parser");
const production = process.env.NODE_ENV == "production";
const { getLyrics, getSong } = require('genius-lyrics-api');


let settings = {};

// grab tokens from config
if (production) {
  settings = require("./config.prod");
} else {
  settings = require("./config");
}

// setting up the Spotify API
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
  clientId: "",
  clientSecret: "",
  scope: "",
});

// Spotify Login setup
const app = express();
app.use(cookieParser());

if (production) {
  app.use(express.static("./dist"));
} else {
  app.use(express.static("./client/public"));
}

// Set up Passport

// Lyrics
const Lyricist = require("lyricist");

const lyricist = new Lyricist(settings.genius.token);
app.get("/api/fetchLyrics", (req, res) => {
  console.log(`Lyrics search: ${req.query.query}...`);
});

const song = 'whatever';

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
	title: 'Loyal',
	artist: 'Chris Brown',
	optimizeQuery: true
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

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
