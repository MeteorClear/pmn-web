import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import UserDetail from './components/user/UserDetail';
import NoteList from './components/note/NoteList';
import Logout from './components/auth/Logout';
import Register from './components/auth/Register';
import UpdateUser from './components/user/UpdateUser';
import DeleteUser from './components/user/DeleteUser';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const [encodedUserPath, setEncodedUserPath] = useState<string | null>(null);

    // 로그인 성공시 true
    const handleLogin = () => {
        setIsAuthenticated(true);
    }

    // 로그아웃시 false
    const handleLogout = () => {
        setIsAuthenticated(false);
        setEncodedUserPath(null);
    }

    return (
        <Router>
            <Routes>
                {/* 로그인 페이지 경로 */}
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} setEncodedUserPath={setEncodedUserPath} />}
                />

                {/* 회원가입 페이지 경로 */}
                <Route
                    path='/register'
                    element={ <Register /> }
                />

                {/* 메인 페이지 경로 (인증된 상태) */}
                <Route 
                    path={`/${encodedUserPath}`}
                    element={
                        isAuthenticated ? (
                            <div>
                                <Logout onLogout={handleLogout} />
                                <UserDetail />
                                <NoteList />
                            </div>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* 사용자 정보 업데이트 페이지 경로 */}
                <Route
                    path={`/${encodedUserPath}/change`}
                    element={
                        isAuthenticated ? (
                            <UpdateUser />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* 사용자 삭제 페이지 경로 */}
                <Route
                    path={`/${encodedUserPath}/change/delete`}
                    element={
                        isAuthenticated ? (
                            <DeleteUser />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to={`/${encodedUserPath}`} replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* 로그인하지 않았을 때 모든 경로에서 로그인 페이지로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
