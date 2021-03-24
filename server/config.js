const spotify = {
  clientId: '13020ef7b35e4e4ea69a9d2a305b5aa9',
  secret: 'bee6683c50df412b813d8ddf11560a58',
  scopes: ['user-read-playback-state']
};

const login = {
  callback: "http://localhost:3000/auth/spotify/callback"
};

const genius = {
  token: '5CHktMcPL60XzGAETfUhO7AKsBKL0LgSpv8RYnl8oAQp5wQDd3kk23FfGuKZ9Nw8'
};

module.exports = {
  spotify,
  login,
  genius
};
