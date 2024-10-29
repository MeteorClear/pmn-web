import React, { useCallback, useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import NoteDetail from "./NoteDetail";
import CreateNote from "./CreateNote";
import styles from './NoteList.module.css';

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const NoteList = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<number | null>(null);
    const [createdNote, setCreatedNote] = useState<boolean>(false);
    const userId = localStorage.getItem('userId');

    // 노트 목록 가져오기
    const fetchNotes = useCallback(async () => {
        try {
            const response = await apiClient.get(`/notes/user/${userId}`);
            setNotes(response.data);
        } catch (error) {
            console.error('[ERROR] NoteList.tsx ::', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleSelectNote = (id: number) => {
        setCreatedNote(false);
        setSelectedNote(id);
    }

    const handleCreateNote = () => {
        setSelectedNote(null);
        setCreatedNote(true);
    }

    const handleNoteListUpdate = () => {
        fetchNotes();
    }

    return (
        <div className={styles.container}>
            <div className={styles.noteListBox}>
                {notes.map((note) => (
                    <div 
                        className={styles.noteItem} 
                        key={note.id} 
                        role='button' 
                        onClick={() => handleSelectNote(note.id)}
                    >
                        {note.title}
                        <br />
                        {note.createdAt}
                    </div>
                ))}
                <div 
                    className={styles.noteItem} 
                    role='button' 
                    onClick={handleCreateNote}
                >
                    + Create Note
                </div>
            </div>
            <div className={styles.noteBox}>
                { createdNote && <CreateNote /> }
                { selectedNote && <NoteDetail onNoteListUpdate={handleNoteListUpdate} noteId={selectedNote} /> }
            </div>
        </div>
    );
};

export default NoteList;