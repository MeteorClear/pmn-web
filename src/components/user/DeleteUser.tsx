import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './DeleteUser.module.css';

const DeleteUser = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
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

    const handleBackToMain = () => {
        const currentPath = location.pathname;
        const cutPosition = currentPath.substring(0, currentPath.lastIndexOf('/'));
        const parentPath = cutPosition.substring(0, cutPosition.lastIndexOf('/'));
        navigate(parentPath);
    }

    return (
        <div className={styles.container}>
            <div className={styles.deleteBox}>
                <p className={styles.title}>Delete User</p>
                <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
                {error && <p>{error}</p>}
                <button className={styles.button} onClick={handleBackToMain}>Back</button>
            </div>
        </div>
    );
};

export default DeleteUser;