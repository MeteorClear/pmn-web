import React, { useState } from "react";
import apiClient from "../../api/apiClient";
import styles from './CreateNote.module.css';

/**
 * 사용자 필요 필드 정의
 */
interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    createdAt: string;
}

/**
 * 노트 생성 요청 필요 필드 정의
 */
interface CreateNoteRequest {
    id: number;
    user: User;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

/**
 * CreateNote 컴포넌트의 props 정의.
 */
interface CreateNoteProps {
    onNoteListUpdate: () => void;
};

/**
 * CreateNote 컴포넌트
 * 새로운 노트를 작성하고 저장 담당.
 * 
 * @component
 * @param {CreateNoteProps} props 노트 목록 갱신 함수를 포함.
 * @returns {JSX.Element} CreateNote 컴포넌트.
 */
const CreateNote = ({ onNoteListUpdate }: CreateNoteProps ) => {
    const userId = Number(localStorage.getItem('userId'));
    const [note, setNote] = useState<CreateNoteRequest>({
        id: 0,
        user: {
            id: userId,
            email: '',
            password: '',
            username: '',
            createdAt: ''
        },
        title: "",
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    const [error, setError] = useState<string | null>(null);
    
    /**
     * 입력 필드의 값이 변경될 때 상태 업데이트 함수.
     * 
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e 입력값 변경 이벤트.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    /**
     * 노트 생성 함수.
     * 입력된 내용을 기반으로 노트 생성 요청.
     * `/notes/user/${userId}` 에 post 요청.
     * 
     * @param {React.FormEvent} e 폼 이벤트.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await apiClient.post(`/notes/user/${userId}`, note);
            setError(null);
            onNoteListUpdate();
        } catch (error_) {
            console.error("[ERROR] CreateNote.tsx ::", error_);
            setError('note creation failed');
        }
    }

    return (
        <div className={styles.container}>
            <input 
                className={styles.titleBox}
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="Title"
                spellCheck="false"
                required
            />
            <textarea 
                className={styles.contentBox}
                name="content"
                value={note.content}
                onChange={handleChange}
                placeholder="Content"
                spellCheck="false"
                required
            />
            <div className={styles.buttonBox}>
                {error && <p>{error}</p>}
                <button className={styles.button} onClick={handleSubmit}>Create</button>
            </div>
        </div>
    );
};

export default CreateNote;