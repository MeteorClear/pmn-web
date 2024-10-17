import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
};

interface UpdateNoteRequest {
    title: string;
    content: string;
};

interface NoteDetailProps {
    noteId: number;
};

const NoteDetail = ({ noteId }: NoteDetailProps) => {
    const [note, setNote] = useState<Note | null>(null);
    const [loadError, setloadError] = useState<string | null>(null);
    const [updateError, setupdateError] = useState<string | null>(null);

    // 노트 정보 Fetch
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const respnse = await apiClient.get(`/notes/${noteId}`);
                setNote(respnse.data);
                setloadError(null);
            } catch (error) {
                console.error('[ERROR] NoteDetail.tsx ::', error);
                setloadError('note loading failed');
            }
        };
        fetchNote();
    }, [noteId]);

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
                {note.title}
            </div>
            <div>
                {new Date(note.createdAt).toLocaleDateString()}
            </div>
            <div>
                {note.content}
            </div>
        </div>
    );
};

export default NoteDetail;