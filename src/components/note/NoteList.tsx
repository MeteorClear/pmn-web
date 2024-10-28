import React, { useEffect, useState } from "react";
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

    // 노트 목록 표시
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await apiClient.get(`/notes/user/${userId}`);
                setNotes(response.data);
            } catch (error) {
                console.error('[ERROR] NoteList.tsx ::', error);
            }
        };
        fetchNotes();
    }, [userId]);

    const handleSelectNote = (id: number) => {
        setCreatedNote(false);
        setSelectedNote(id);
    }

    const handleCreateNote = () => {
        setSelectedNote(null);
        setCreatedNote(true);
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
            <div>
                { createdNote && <CreateNote /> }
                { selectedNote && <NoteDetail noteId={selectedNote} /> }
            </div>
        </div>
    );
};

export default NoteList;