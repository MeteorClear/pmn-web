import React from "react";

interface DeleteNoteProps {
    noteId: number;
};

const DeleteNote = ({ noteId }: DeleteNoteProps ) => {
    
    return (
        <div>
            <button>Delete</button>
        </div>
    );
};

export default DeleteNote;