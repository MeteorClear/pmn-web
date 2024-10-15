import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

interface User {
    id: number;
    email: string;
    username: string;
    createdAt: string;
};

const UserDetail = () => {
    const [user, setUser] = useState<User | null>(null);
    const userId = localStorage.getItem('userId');

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

    if (!user) {
        return (
            <div>
                Loading user data...
            </div>
        );
    }

    return (
        <div>
            <p>{user.id}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <p>{user.createdAt}</p>
        </div>
    );
};

export default UserDetail;