import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

interface User {
    id: number;
    email: string;
    password: string
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    if (!user) {
        return (
            <div>
                Loading user data...
            </div>
        );
    }

    return (
        <div>
            Change User Info
            <form>
                <input 
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input 
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default UpdateUser;