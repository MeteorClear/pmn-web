import React from "react";
import apiClient from "../../api/apiClient";
import styles from './DeleteNote.module.css';

/**
 * DeleteNote 컴포넌트의 props 정의.
 * 
 * @property {function} onNoteListUpdate 노트 목록 업데이트 함수.
 * @property {number} noteId 노트 고유번호.
 */
interface DeleteNoteProps {
    onNoteListUpdate: () => void;
    noteId: number;
};

/**
 * DeleteNote 컴포넌트
 * 특정 노트를 삭제 요청 및 처리 담당.
 * 
 * @component
 * @param {DeleteNoteProps} props 노트 리스트 갱신 함수와 노트 ID를 포함.
 * @returns {JSX.Element} DeleteNote 컴포넌트.
 */
const DeleteNote = ({ onNoteListUpdate, noteId }: DeleteNoteProps ) => {

    /**
     * noteId 에 해당하는 노트 삭제 함수.
     * `/notes/${noteId}` 에 delete 요청.
     * 
     * @async
     */
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Do you really want to delete?');
        if (!confirmDelete) return;

        try {
            await apiClient.delete(`/notes/${noteId}`);

            // NoteList.tsx 노트 목록 업데이트
            onNoteListUpdate();
        } catch (error_) {
            console.error("[ERROR] DeleteNote.tsx ::", error_);
        }
    }

    return (
        <>
            <button className={styles.button} onClick={handleDelete}>Delete</button>
        </>
    );
};

export default DeleteNote;