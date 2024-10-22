import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import NoteDetail from "./NoteDetail";
import CreateNote from "./CreateNote";

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const NoteList = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<number | null>(null);
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

    // 목록 중 클릭한 노트 번호 추출

    return (
        <div style={{border: '2px solid black'}}>
            <div>
                <p>Note List...</p>
                {notes.map((note) => (
                    <div key={note.id} onClick={() => setSelectedNote(note.id)}>
                        {note.title}
                    </div>
                ))}
            </div>
            <div>
                <CreateNote />
            </div>
            <div>
                {selectedNote && <NoteDetail noteId={selectedNote} />}
            </div>
        </div>
    );
};

export default NoteList;