const Note = require("../models/note.model");
exports.create = (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  newNote
    .save()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => res.send(notes))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then((note) => {
      if (!note) {
        res.status(404).send({ message: "invalid ID" });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind == "ObjectId") {
        res.status(404).send({ message: "invalid  object ID" });
      }
      res.status(500).send({ message: err.message });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  Note.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        res.status(404).send({ message: "invalid ID" });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind == "ObjectId") {
        res.status(404).send({ message: "invalid  object ID" });
      }
      res.status(500).send({ message: "Unable to update" });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Note.findByIdAndRemove(id)
    .then((note) => {
      if (!note) {
        res.status(404).send({ message: "invalid ID" });
      }
      res.send({ message: "Note deleted" });
    })
    .catch((err) => {
      if (err.kind == "ObjectId") {
        res.status(404).send({ message: "invalid  object ID" });
      }
      res.status(500).send({ message: "Unable to delete" });
    });
};
