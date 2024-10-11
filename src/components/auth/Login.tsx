import React, { useState } from 'react';

// 로그인 컴포넌트

interface JwtRequest {
    username: string;
    password: string;
};

const Login = () => {
    const [credentials, setCredentials] = useState<JwtRequest>({ username: '', password: '' });
    const [error, setError] = useState<string>('');

    // form 변화에 따른 값 변화

    // 로그인 요청 (POST, /auth/login)

    return (
        <>
            <p>Login</p>
            <form>id/pw/submit</form>
        </>
    );
};