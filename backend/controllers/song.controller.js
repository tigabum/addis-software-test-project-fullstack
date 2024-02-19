const Song = require("../models/song.model");

const create = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json({ msg: "Song Added Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const read = async (req, res) => {
  try {
    // const song = await Song.findById(req.params.id);
    res.json(req.song);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    // let updateID = req.params.id;
    const song = await Song.findByIdAndUpdate(req.params.songId, req.body, {
      new: true,
    });
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.songId);
    res.status(204).json({ msg: "Song is successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const statistics = async (req, res) => {
  console.log("request arrived statistics");
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct("artist").countDocuments();
    const totalAlbums = await Song.distinct("album").countDocuments();
    const totalGenres = await Song.distinct("genre").countDocuments();

    const genresCount = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const artistsInfo = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songCount: { $sum: 1 },
          albumCount: { $addToSet: "$album" },
        },
      },
    ]);

    const albumsInfo = await Song.aggregate([
      { $group: { _id: "$album", songCount: { $sum: 1 } } },
    ]);

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genresCount,
      artistsInfo,
      albumsInfo,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const songByID = async (req, res, next, id) => {
  console.log("id before tryin songbyid", id);
  try {
    let song = await Song.findById(id);
    if (!song)
      return res.status(400).json({
        error: "Song not found",
      });
    req.song = song;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retrieve song",
    });
  }
};

module.exports = { create, list, read, update, remove, statistics, songByID };
