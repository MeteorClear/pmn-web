import React from "react";
import apiClient from "../../api/apiClient";
import styles from './DeleteNote.module.css';

interface DeleteNoteProps {
    onNoteListUpdate: () => void;
    noteId: number;
};

const DeleteNote = ({ onNoteListUpdate, noteId }: DeleteNoteProps ) => {

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Do you really want to delete?');
        if (!confirmDelete) return;

        try {
            await apiClient.delete(`/notes/${noteId}`);
            onNoteListUpdate();
        } catch (error_) {
            console.error("[ERROR] DeleteNote.tsx ::", error_);
        }
    }

    return (
        <>
            <button className={styles.button} onClick={handleDelete}>Delete</button>
        </>
    );
};

export default DeleteNote;