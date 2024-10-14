import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const NoteList = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const userId = localStorage.getItem('userId');

    // 노트 목록 표시
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await apiClient.get(`/notes/user/${userId}`);
            } catch (error) {
                console.error('[ERROR] NoteList.tsx ::', error);
            }
        };
        fetchNotes();
    }, [userId]);

    // 목록 중 클릭한 노트 번호 추출

    return (
        <div>
            Note List...
        </div>
    )
}