import React, { useState } from "react";
import apiClient from "../../api/apiClient";

interface DeleteNoteProps {
    noteId: number;
};

const DeleteNote = ({ noteId }: DeleteNoteProps ) => {

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Do you really want to delete?');
        if (!confirmDelete) return;

        try {
            await apiClient.delete(`/notes/${noteId}`);
        } catch (error_) {
            console.error("[ERROR] DeleteNote.tsx ::", error_);
        }
    }

    return (
        <>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
};

export default DeleteNote;