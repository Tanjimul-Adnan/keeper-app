import React from "react";
import "./note.css";
import Head from "./header"


function Note({ title, content, onDelete, onEdit }) {

    return (
        <div className="notebody">
            <h1 className="notetitle">{title}</h1>
            <p className="notecontent">{content}</p>
            {/* <button >Edit</button> */}
            <div className="noteButtons">  {/* Button container */}
                <button onClick={onDelete} className="deleteBtn">Delete</button>
                <button onClick={onEdit} className="updateBtn">Update</button>
            </div>

        </div>
    );
}

export default Note;
