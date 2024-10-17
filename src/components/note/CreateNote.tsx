import React, { useState } from "react";

interface CreateNoteRequest {
    title: string;
    content: string;
};

const CreateNote = () => {
    const [note, setNote] = useState<CreateNoteRequest>({ title: "", content: "" });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <p>Create Note</p>
            <form>
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

        </div>
    );
};

export default CreateNote;