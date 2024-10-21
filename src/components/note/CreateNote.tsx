import React, { useState } from "react";
import apiClient from "../../api/apiClient";

interface CreateNoteRequest {
    title: string;
    content: string;
};

const CreateNote = () => {
    const [note, setNote] = useState<CreateNoteRequest>({ title: "", content: "" });
    const [error, setError] = useState<string | null>(null);
    const userId = localStorage.getItem('userId');

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
            <p>Create Note</p>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Create</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default CreateNote;