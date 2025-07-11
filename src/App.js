import React, { useState, useEffect } from "react";
import Head from "./header"; // Your header component with Add Note button
import NoteInput from "./noteinput"; // The note input modal component
import "./App.css"; // Your CSS file for styles

function App() {
    const [notes, setNotes] = useState([]);  // Initialize notes state as an empty array
    const [isInputVisible, setInputVisible] = useState(false);  // Controls the visibility of the input modal

    // Load notes from localStorage when the component mounts
    useEffect(() => {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes)); // Parse the saved notes from localStorage and set them in state
        }
    }, []);  // Empty dependency array ensures this runs only once on mount

    // Function to add new note
    function addNewNote(newNote) {
        const updatedNotes = [...notes, newNote];  // Add the new note to the existing notes array
        setNotes(updatedNotes);  // Update the state with the new notes array
        localStorage.setItem("notes", JSON.stringify(updatedNotes));  // Save updated notes to localStorage
    }

    // Function to toggle the visibility of the note input modal
    function toggleInput() {
        setInputVisible(!isInputVisible);
    }

    return (
        <div></div>
    );
}

export default App;
