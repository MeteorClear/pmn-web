import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

interface User {
    id: number;
    email: string;
    username: string;
    createdAt: string;
};

interface UpdateUserProps {
    userId: number;
};

const UpdateUser = ({ userId }: UpdateUserProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div>

        </div>
    );
};

export default UpdateUser;