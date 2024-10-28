import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import DeleteNote from "./DeleteNote";

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
    noteId: number;
};

const NoteDetail = ({ noteId }: NoteDetailProps) => {
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
                    updatedAt: new Date().toISOString,
                };

                await apiClient.put(`/notes/${noteId}`, updatedNote);
                setUpdateError(null);
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
        <div>
            <div>
                <input 
                    type="text"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    placeholder="Note title"
                    required
                />
            </div>
            <div>
                {note.createdAt}
                {note.updatedAt}
            </div>
            <div>
                <textarea 
                    name="content"
                    value={note.content}
                    onChange={handleChange}
                    placeholder="Note Content"
                />
            </div>
            <button onClick={handleUpdate}>Save</button>
            {loadError && <p>{loadError}</p>}
            {updateError && <p>{updateError}</p>}
            <DeleteNote noteId={note.id} />
        </div>
    );
};

export default NoteDetail;