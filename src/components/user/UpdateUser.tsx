import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";

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

            try {
                const response = await apiClient.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('[ERROR] UserDetail.tsx ::', error);
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

    if (!user) {
        return (
            <div>
                Loading user data...
            </div>
        );
    }

    return (
        <div>
            <div>
                Change User Info
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
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleBackToMain}>Back</button>
                <button onClick={handleSubmit}>Save</button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default UpdateUser;