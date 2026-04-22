import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Unable to load notes", error);
    }
  }

  async function addNote(newNote) {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote)
      });
      if (!response.ok) throw new Error("Failed to save note");
      const savedNote = await response.json();
      setNotes(prevNotes => [...prevNotes, savedNote]);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteNote(id) {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete note");
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function updateNote(id, updatedNote) {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote)
      });
      if (!response.ok) throw new Error("Failed to update note");
      const savedNote = await response.json();
      setNotes(prevNotes =>
        prevNotes.map(note => (note._id === id ? savedNote : note))
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(noteItem => (
        <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;