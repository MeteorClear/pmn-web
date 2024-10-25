import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './UpdateUser.module.css';

interface User {
    id: number;
    email: string;
    password: string
    username: string;
};

const UpdateUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const storedUserId = localStorage.getItem('userId')
            if (!storedUserId) {
                alert('User load failed, please relogin');
                console.error('[ERROR] UpdateUser.tsx:: no userId found');
                navigate('/login');
                return;
            }

            setUserId(Number(storedUserId));
            if (userId) {
                try {
                    const response = await apiClient.get(`/users/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    console.error('[ERROR] UserDetail.tsx ::', error);
                }
            }
        };
        fetchUser();
    }, [userId, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user) {
            if (!user.username || !user.password) {
                setError('There are empty items');
                return;
            }

            try {
                await apiClient.put(`/api/users/${user.id}`, user);
                setError(null);

                handleBackToMain();
            } catch (error_) {
                console.error("[ERROR] UpdateUser.tsx ::", error);
                setError("user info update failed");
            }
        }
    };

    const handleBackToMain = () => {
        const currentPath = location.pathname;
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        navigate(parentPath);
    }

    const handleDeleteUser = () => {
        navigate(`${location.pathname}/delete`);
    }

    if (!user) {
        return (
            <div>
                Loading user data...
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.updateBox}>
                <p className={styles.title}>Change User Info</p>
                <p className={styles.inputPlaceholder}>Username</p>
                <input 
                    className={styles.inputBox}
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                <p className={styles.inputPlaceholder}>Password</p>
                <input 
                    className={styles.inputBox}
                    type="password"
                    name="password"
                    value=""
                    onChange={handleChange}
                    required
                />
                <button className={styles.button} onClick={handleSubmit}>Save</button>
                <button className={styles.button} onClick={handleBackToMain}>Back</button>
                <button className={styles.deleteButton} onClick={handleDeleteUser}>Delete</button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default UpdateUser;