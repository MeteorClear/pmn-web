import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import styles from './Register.module.css';

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

        if (!user.email || !user.password || !user.username) {
            setError('There are empty items');
            return;
        }

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
        <div className={styles.container}>
            <div className={styles.registerBox}>
                <p>Register</p>
                <input 
                    className={styles.inputBox}
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input 
                    className={styles.inputBox}
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input 
                    className={styles.inputBox}
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                {error && <p>{error}</p>}
                <button className={styles.button} onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
};

export default Register;