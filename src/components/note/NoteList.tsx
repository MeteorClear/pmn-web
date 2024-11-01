import React, { useCallback, useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import NoteDetail from "./NoteDetail";
import CreateNote from "./CreateNote";
import styles from './NoteList.module.css';

/**
 * 노트 필요 필드 정의
 */
interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * NoteList 컴포넌트.
 * 사용자의 노트 목록 및 선택된 노트, 새로운 노트 표시 담당.
 * 
 * @component
 * @returns {JSX.Element} NoteList 컴포넌트
 */
const NoteList = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<number | null>(null);
    const [createdNote, setCreatedNote] = useState<boolean>(false);
    const userId = localStorage.getItem('userId');

    /**
     * 노트 목록을 서버에서 가져오는 함수
     * `/notes/user/${userId}` 에 get 요청
     */
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

    /**
     * 특정 노트를 선택시 해당 노트의 세부 정보를 표시하는 함수.
     * 
     * @param {number} id 선택한 노트의 ID
     */
    const handleSelectNote = (id: number) => {
        setCreatedNote(false);
        setSelectedNote(id);
    }

    /**
     * 새로운 노트를 생성시 노트 생성 화면을 표시하는 함수.
     */
    const handleCreateNote = () => {
        setSelectedNote(null);
        setCreatedNote(true);
    }

    /**
     * 노트가 업데이트 된 경우, 목록을 새로 가져오는 함수.
     */
    const handleNoteListUpdate = () => {
        fetchNotes();
        setCreatedNote(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.noteListBox}>
                <div 
                    className={styles.noteItem} 
                    role='button' 
                    onClick={handleCreateNote}
                >
                    + Create Note
                </div>
                {notes.map((note) => (
                    <div 
                        className={styles.noteItem} 
                        key={note.id} 
                        role='button' 
                        onClick={() => handleSelectNote(note.id)}
                    >
                        <p className={styles.noteTitle}>{note.title}</p>
                        {note.createdAt}
                    </div>
                ))}
            </div>
            <div className={styles.noteBox}>
                { createdNote && <CreateNote onNoteListUpdate={handleNoteListUpdate} /> }
                { selectedNote && <NoteDetail onNoteListUpdate={handleNoteListUpdate} noteId={selectedNote} /> }
            </div>
        </div>
    );
};

export default NoteList;