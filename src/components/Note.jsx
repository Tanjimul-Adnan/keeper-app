import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title);
  const [editContent, setEditContent] = useState(props.content);

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    props.onUpdate(props.id, {
      title: editTitle,
      content: editContent
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(props.title);
    setEditContent(props.content);
    setIsEditing(false);
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Content"
          />
          <button onClick={handleSave}>
            <SaveIcon />
          </button>
          <button onClick={handleCancel}>
            <CancelIcon />
          </button>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleEdit}>
            <ModeIcon />
          </button>
          <button onClick={handleClick}>
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default Note;