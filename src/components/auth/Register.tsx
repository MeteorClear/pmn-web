import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

interface UserRegisterRequest {
    email: string;
    password: string;
    username: string;
};

const Register = () => {
    const [user, setUser] = useState<UserRegisterRequest>({
        email: '',
        password: '',
        username: ''
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await apiClient.post('/users', user);
            setError(null);
            alert('register succeeded');
            navigate('/login');
        } catch (error_) {
            console.error("DEBUG::Register.tsx::", error_);
            setError('register failed');
        }
    };

    return (
        <div>
            <p>Register</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
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
                <input 
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Register;