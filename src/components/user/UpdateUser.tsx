import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

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

            try {
                const response = await apiClient.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('[ERROR] UserDetail.tsx ::', error);
            }
        };
        fetchUser();
    }, [navigate]);

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
                navigate(-1);
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
            <form onSubmit={handleSubmit}>
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