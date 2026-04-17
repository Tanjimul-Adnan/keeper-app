import express from "express";
import Note from "../models/note.js";

const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new note
router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (req.body.title) note.title = req.body.title;
    if (req.body.content) note.content = req.body.content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;