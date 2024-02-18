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

const songByID = async (req, res, next, id) => {
  console.log("id before tryin songbyid", id);
  try {
    let song = await Song.findById(id);
    console.log("song is found in songbyId", song);
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

module.exports = { create, list, read, update, remove, songByID };
