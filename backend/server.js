const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Note = require('./model/Note'); // Import the Note model

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Define API routes
app.get('/api/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/api/notes', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const newNote = new Note({ title, content });
    await newNote.save();
    res.json(newNote);
});

app.delete('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // alert("Note Deleted Sucessfully");
        console.log("Deleting Note ID:", id); // Log the received ID
        
        const result = await Note.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).send({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send({ error: 'Failed to delete note' });
    }
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true } // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Failed to update note' });
    }
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
