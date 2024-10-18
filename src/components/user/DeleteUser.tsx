import React, { useState } from "react";
import apiClient from "../../api/apiClient";

interface DeleteNoteProps {
    noteId: number;
};

const DeleteUser = ({ noteId }: DeleteNoteProps ) => {
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Do you really want to delete?');
        if (!confirmDelete) return;

        try {
            await apiClient.delete(`/notes/${noteId}`);
            setError(null);
        } catch (error_) {
            console.error("[ERROR] DeleteNote.tsx ::", error);
            setError("note delete failed");
        }
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default DeleteUser;