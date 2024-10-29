import React, { useState } from "react";
import apiClient from "../../api/apiClient";

interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    createdAt: string;
}

interface CreateNoteRequest {
    id: number;
    user: User;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

const CreateNote = () => {
    const userId = Number(localStorage.getItem('userId'));
    const [note, setNote] = useState<CreateNoteRequest>({
        id: 0, // 초기 ID 설정
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
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await apiClient.post(`/notes/user/${userId}`, note);
            setError(null);
        } catch (error_) {
            console.error("[ERROR] CreateNote.tsx ::", error_);
            setError('note creation failed');
        }
    }

    return (
        <div>
            <input 
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea 
                name="content"
                value={note.content}
                onChange={handleChange}
                placeholder="Content"
                required
            />
            <div>
                {error && <p>{error}</p>}
                <button onClick={handleSubmit}>Create</button>
            </div>
        </div>
    );
};

export default CreateNote;