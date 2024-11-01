import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import DeleteNote from "./DeleteNote";
import styles from './NoteDetail.module.css';

/**
 * 사용자 필요 필드 정의.
 * 
 * @property {number} id 사용자 고유번호.
 * @property {string} email 사용자 이메일.
 * @property {string} password 사용자 비밀번호.
 * @property {string} username 사용자 닉네임.
 * @property {string} createdAt 사용자 계정 생성일.
 */
interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    createdAt: string;
}

/**
 * 노트 필요 필드 정의.
 * 
 * @property {number} id 노트 고유 번호.
 * @property {User} user 노트 소유 사용자.
 * @property {string} title 노트 제목.
 * @property {string} content 노트 내용.
 * @property {string} createdAt 노트 생성일.
 * @property {string} updatedAt 노트 수정일.
 */
interface Note {
    id: number;
    user: User;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

/**
 * NoteDetail 컴포넌트의 props 정의.
 * 
 * @property {function} onNoteListUpdate 노트 목록 업데이트 함수.
 * @property {number} noteId 노트 고유번호.
 */
interface NoteDetailProps {
    onNoteListUpdate: () => void;
    noteId: number;
};

/**
 * NoteDetail 컴포넌트.
 * 선택된 노트의 상세 정보를 표시 및 수정, 삭제 기능 담당.
 *
 * @component
 * @param {NoteDetailProps} props 노트 리스트 업데이트 함수와 선택된 노트 ID를 포함.
 * @returns {JSX.Element} NoteDetail 컴포넌트.
 */
const NoteDetail = ({ onNoteListUpdate, noteId }: NoteDetailProps) => {
    const [note, setNote] = useState<Note | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);

    useEffect(() => {
        /**
         * props의 노트 ID를 기반으로 노트 정보를 불러오는 함수.
         * `/notes/${noteId}` 에 get 요청.
         * 
         * @async
         */
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

    /**
     * 입력 필드의 값이 변경될 때 상태 업데이트 함수.
     * 
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e 입력값 변경 이벤트.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (note) {
            setNote({ ...note, [e.target.name]: e.target.value });
        }
    };

    /**
     * 노트 업데이트 함수.
     * 변경된 내용을 기반으로 노트 정보 업데이트.
     * `/notes/${noteId}` 에 put 요청.
     * 
     * @async
     */
    const handleUpdate = async () => {
        if (!note) {
            setUpdateError('note not found');
            return;
        }

        try {
            const updatedNote = {
                ...note,
                updatedAt: new Date().toISOString(),
            };

            await apiClient.put(`/notes/${noteId}`, updatedNote);
            setUpdateError(null);
            
            // NoteList.tsx 노트 목록 업데이트
            onNoteListUpdate();
        } catch (error) {
            console.error('[ERROR] NoteDetail.tsx ::', error);
            setUpdateError('note save failed');
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
                <button className={styles.button} onClick={handleUpdate}>Save</button>
                <DeleteNote onNoteListUpdate={onNoteListUpdate} noteId={note.id} />
            </div>
        </div>
    );
};

export default NoteDetail;