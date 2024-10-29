import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import DeleteNote from "./DeleteNote";
import styles from './NoteDetail.module.css';

interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    createdAt: string;
}

interface Note {
    id: number;
    user: User;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

interface NoteDetailProps {
    onNoteListUpdate: () => void;
    noteId: number;
};

const NoteDetail = ({ onNoteListUpdate, noteId }: NoteDetailProps) => {
    const [note, setNote] = useState<Note | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);

    // 노트 정보 Fetch
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const respnse = await apiClient.get(`/notes/${noteId}`);
                setNote(respnse.data);
                setLoadError(null);
            } catch (error) {
                console.error('[ERROR] NoteDetail.tsx ::', error);
                setLoadError('note loading failed');
            }
        };
        fetchNote();
    }, [noteId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (note) {
            setNote({ ...note, [e.target.name]: e.target.value });
        }
    };

    const handleUpdate = async () => {
        if (note) {
            try {
                const updatedNote = {
                    ...note,
                    updatedAt: new Date().toISOString(),
                };

                await apiClient.put(`/notes/${noteId}`, updatedNote);
                setUpdateError(null);
                onNoteListUpdate();
            } catch (error) {
                console.error('[ERROR] NoteDetail.tsx ::', error);
                setUpdateError('note save failed');
            }
        }
    }

    if (!note) {
        return (
            <div>
                {loadError && <p>{loadError}</p>}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <input 
                className={styles.titleBox}
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="Note title"
                spellCheck="false"
                required
            />
            <div className={styles.dateBox}>
                <p className={styles.createdDate}>Created: {note.createdAt}</p>
                <p className={styles.modifiedDate}> Modefied: {note.updatedAt}</p>
            </div>
            <textarea 
                className={styles.contentBox}
                name="content"
                value={note.content}
                onChange={handleChange}
                placeholder="Note Content"
                spellCheck="false"
            />
            <div className={styles.buttonBox}>
                {loadError && <p>{loadError}</p>}
                {updateError && <p>{updateError}</p>}
                <button onClick={handleUpdate}>Save</button>
                <DeleteNote noteId={note.id} />
            </div>
        </div>
    );
};

export default NoteDetail;