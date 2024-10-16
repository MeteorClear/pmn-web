import React, { useState } from 'react';
import './App.css';
import Login from './components/auth/Login';
import UserDetail from './components/user/UserDetail';
import NoteList from './components/note/NoteList';
import Logout from './components/auth/Logout';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

    // 로그인 성공시 true
    const handleLogin = () => {
        setIsAuthenticated(true);
    }

    // 로그아웃시 false
    const handleLogout = () => {
        setIsAuthenticated(false);
    }

    return (
        <div>
            {!isAuthenticated ? 
                <Login onLogin={handleLogin} /> : 
                <div>
                    <Logout onLogout={handleLogout} />
                    <UserDetail />
                    <NoteList />
                </div>
            }
        </div>
    );
};

export default App;
