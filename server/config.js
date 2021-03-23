const spotify = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_SECRET,
  scopes: ['user-read-playback-state']
};

const login = {
  callback: process.env.CALLBACK_URL
};

const genius = {
  token: '5CHktMcPL60XzGAETfUhO7AKsBKL0LgSpv8RYnl8oAQp5wQDd3kk23FfGuKZ9Nw8'
};

module.exports = {
  spotify,
  login,
  genius
};
