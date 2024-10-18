import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

interface User {
    id: number;
    email: string;
    password: string
    username: string;
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user) {
            try {
                await apiClient.put(`/api/users/${user.id}`, user);
                setError(null);
            } catch (error_) {
                console.error("[ERROR] UpdateUser.tsx ::", error);
                setError("user info update failed");
            }
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
            {error && <p>{error}</p>}
        </div>
    );
};

export default UpdateUser;