import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";

interface User {
    id: number;
    email: string;
    username: string;
    createdAt: string;
};

const UserDetail = () => {
    const [user, setUser] = useState<User | null>(null);
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('[ERROR] UserDetail.tsx ::', error);
            }
        };
        fetchUser();
    }, [userId]);

    const handleUpdateUser = () => {
        navigate(`${location.pathname}/change`);
    }

    if (!user) {
        return (
            <div>
                Loading user data...
            </div>
        );
    }

    return (
        <div style={{border: '2px solid black'}}>
            <p>{user.id}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <p>{user.createdAt}</p>
            <button onClick={handleUpdateUser}>Change User Info</button>
        </div>
    );
};

export default UserDetail;