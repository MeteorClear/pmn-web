import React, { useState } from "react";
import apiClient from "../../api/apiClient";

interface DeleteUserProps {
    userId: number;
};

const DeleteUser = ({ userId }: DeleteUserProps ) => {
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Do you really want to delete?');
        if (!confirmDelete) return;

        try {
            await apiClient.delete(`/users/${userId}`);
            setError(null);
        } catch (error_) {
            console.error("[ERROR] DeleteNote.tsx ::", error);
            setError("user delete failed");
        }
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default DeleteUser;