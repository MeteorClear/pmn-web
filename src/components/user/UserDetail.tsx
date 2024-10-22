import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

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
        <div style={{border: '2px solid black'}}>
            <p>{user.id}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <p>{user.createdAt}</p>
            <div>
                {userId !== null && <UpdateUser userId={userId} />}
                {userId !== null && <DeleteUser userId={userId} />}
            </div>
        </div>
    );
};

export default UserDetail;