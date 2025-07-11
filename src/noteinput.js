import React, { useState, useEffect } from "react";
import "./noteinput.css"; // Your CSS for the input modal

function NoteInput({ onClose, addNewNote, existingNote }) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (existingNote) {
            setTitle(existingNote.title);
            setContent(existingNote.content);
        }
    }, [existingNote]);

    // Handle form submission to add new note
    function handleAddNote() {
        if (title && content) {
            const newNote = {
                title,
                content,
            };

            // Add the new note
            addNewNote(newNote);

            // Clear the input fields
            setTitle("");
            setContent("");
            onClose(); // Close the input form
        }
    }

    return (
        <div className="noteInputContainer">
            <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="titleInput"
            />
            <textarea
                placeholder="Enter Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="contentInput"
            />
            <button onClick={handleAddNote} className="submitBtn">
                {existingNote ? "Update" : "Submit"}
            </button>
            <button onClick={onClose} className="closeBtn">
                Close
            </button>
        </div>
    );
}

export default NoteInput;
