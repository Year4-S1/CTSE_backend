const Note = require("../models/note-model");

const updateNote = async (req, res) => {
  await Note.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        noteTittle: req.body.noteTittle,
        noteMessage: req.body.noteMessage,
      },
    },
    { upsert: true }
  )
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

module.exports = {
  updateNote,
};