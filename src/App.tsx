import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import UserDetail from './components/user/UserDetail';
import NoteList from './components/note/NoteList';
import Logout from './components/auth/Logout';
import Register from './components/auth/Register';

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
        <Router>
            <Routes>
                {/* 로그인 페이지 경로 */}
                <Route
                    path="/login"
                    element={
                        <div>
                            <Login onLogin={handleLogin} />
                            <Register />
                        </div>
                    }
                />

                {/* 메인 페이지 경로 (인증된 상태) */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <div>
                                <Logout onLogout={handleLogout} />
                                <UserDetail />
                                <NoteList />
                            </div>
                        ) : (
                            <Login onLogin={handleLogin} />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
