import React, { HtmlHTMLAttributes, useState } from "react";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <p>Register</p>
            <form>
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
        </div>
    );
};