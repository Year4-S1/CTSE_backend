const Note = require("../models/note-model");

const viewNotes = async (req, res) => {
  await Note.find({})
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const viewNoteById = async (req, res) => {
  if (req.params && req.params.id) {
    await Note.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

module.exports = {
  viewNotes,
  viewNoteById,
};