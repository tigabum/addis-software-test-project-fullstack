const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  album: {
    type: String,
  },
  artist: {
    type: String,
  },
  genre: {
    type: String,
  },
});

module.exports = Song = mongoose.model("song", SongSchema);
