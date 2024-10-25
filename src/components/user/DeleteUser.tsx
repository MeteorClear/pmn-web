import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

const DeleteUser = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const storedUserId = localStorage.getItem('userId')
            if (!storedUserId) {
                alert('User load failed, please relogin');
                console.error('[ERROR] DeleteUser.tsx:: no userId found');
                navigate('/login');
                return;
            }

            setUserId(Number(storedUserId));
        };
        fetchUser();
    }, [userId, navigate]);

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