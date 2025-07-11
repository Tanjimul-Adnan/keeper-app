import React, { useState, useEffect } from "react";
import axios from "axios";
import "./header.css";
import NoteInput from "./noteinput";
import Note from "./note";

function Head() {
    const [isInputVisible, setInputVisible] = useState(false);
    const [notes, setNotes] = useState([]); // State to manage notes array
    const [editNote, setEditNote] = useState(null); // NEW

    // Fetch notes from the backend when the component mounts
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/notes") // Ensure this endpoint is correct
            .then((response) => {
                setNotes(response.data); // Set the notes from the backend
            })
            .catch((error) => console.error("Error fetching notes:", error));
    }, []);

    // Toggle the visibility of the note input
    function toggleInput() {
        setInputVisible(!isInputVisible);
    }

    function displayNote(){
        return (
            <div className="notesContainer">
                {notes.map((note) => (
                    <Note 
                        key={note._id} 
                        title={note.title} 
                        content={note.content}
                        onDelete={() => deleteNoteHandler(note._id)}
                        onEdit={() => editNoteHandler(note)}
                         />
                ))}
            </div>
        );
    }

    // Function to add a new note to the backend and update the frontend state
    // function addNewNote(newNote) {
    //     axios
    //         .post("http://localhost:5000/api/notes", newNote) // Post new note to backend
    //         .then((response) => {
    //             setNotes((prevNotes) => [...prevNotes, response.data]); // Update frontend state with the new note
    //         })
    //         .catch((error) => console.error("Error adding note:", error));
    // }

    function addNewNote(newNote) {
        if (editNote) {
            // UPDATE note
            axios
                .put(`http://localhost:5000/api/notes/${editNote._id}`, newNote)
                .then((response) => {
                    const updated = notes.map((note) =>
                        note._id === editNote._id ? response.data : note
                    );
                    setNotes(updated);
                    setEditNote(null);
                    toggleInput();
                })
                .catch((error) => console.error("Error updating note:", error));
        } else {
            // ADD new note
            axios
                .post("http://localhost:5000/api/notes", newNote)
                .then((response) => {
                    setNotes((prev) => [...prev, response.data]);
                    toggleInput();
                })
                .catch((error) => console.error("Error adding note:", error));
        }
    }


    function deleteNoteHandler(noteId) {
        console.log("Delete Request for Note ID:", noteId);
        axios
            .delete(`http://localhost:5000/api/notes/${noteId}`)
            .then((response) => {
                console.log("API Response:", response.data); // Log API response
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
            })
            .catch((error) => console.error("Error deleting note:", error));
    }
    
    function editNoteHandler(note) {
        setEditNote(note);
        setInputVisible(true);
    }

    return (
        <div>
            {/* Navbar */}
            <header>
                <h1 className="title">Keeper</h1>
                <button className="add-note-btn" onClick={toggleInput}>
                    Add Note
                </button>
            </header>

            {/* Note Input Component */}
            {isInputVisible && (
                // <NoteInput onClose={toggleInput} addNewNote={addNewNote} />
                <NoteInput onClose={toggleInput} addNewNote={addNewNote} existingNote={editNote} />

            )}

            {/* Notes Display */}
            {displayNote()}

            
        </div>
    );
}

export default Head;
