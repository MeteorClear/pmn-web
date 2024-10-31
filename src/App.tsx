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
import styles from './App.module.css';

/**
 * 앱의 루트 컴포넌트.
 * 인증 여부 관리 및 경로별 네이게이션 정의.
 * 
 * @compoent
 * @returns {JSX.Element} 메인 App 컴포넌트.
 */
const App = () => {
    // 인증 여부.
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    // 인코딩된 사용자 경로.
    const [encodedUserPath, setEncodedUserPath] = useState<string | null>(null);

    /**
     * 로그인 성공시 인증 상태 true.
     */
    const handleLogin = () => {
        setIsAuthenticated(true);
    }

    /**
     * 로그아웃시 인증 상태 false.
     * 사용자 경로 초기화.
     */
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
                            <div className={styles.container}>
                                <div className={styles.userContainer}>
                                    <UserDetail />
                                    <Logout onLogout={handleLogout} />
                                </div>
                                <div className={styles.noteContainer}>
                                    <NoteList />
                                </div>
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

                {/* 기본 경로는 비인증시 로그인 페이지로 아닌 경우 사용자 페이지로 */}
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
