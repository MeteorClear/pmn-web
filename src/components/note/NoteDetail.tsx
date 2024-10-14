import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const NoteDetail = (noteId: number) => {
    const [note, setNote] = useState<Note | null>(null);

    // 노트 정보 Fetch
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const respnse = await apiClient.get(`/notes/${noteId}`);
                setNote(respnse.data);
            } catch (error) {
                console.error('[ERROR] NoteDetail.tsx ::', error);
            }
        };
        fetchNote();
    }, [noteId]);

    if (!note) {
        return (
            <>
                loading
            </>
        )
    }

    return (
        <div>
            <div>
                {note.title}
            </div>
            <div>
                {note.createdAt}
            </div>
            <div>
                {note.content}
            </div>
        </div>
    );
};

export default NoteDetail;