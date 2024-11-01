import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './UpdateUser.module.css';

/**
 * 사용자 정보 필드 정의
 * 
 * @property {string} id 사용자 고유번호.
 * @property {string} email 사용자 이메일.
 * @property {string} username 사용자 닉네임.
 * @property {string} createdAt 사용자 계성 생성일.
 */
interface User {
    id: number;
    email: string;
    password: string
    username: string;
};

/**
 * User 정보 수정 컴포넌트.
 * 사용자 정보를 수정 및 저장 담당.
 * 
 * @component
 * @returns {JSX.Element} UpdateUser 컴포넌트.
 */
const UpdateUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId') as string, 10) : null;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * 저장된 사용자 ID를 기반으로 사용자 정보를 불러오는 함수.
         * `/users/${userId}` 에 get 요청.
         */
        const fetchUser = async () => {
            if (!userId) {
                alert('User load failed, please relogin');
                console.error('[ERROR] UpdateUser.tsx:: no userId found');
                navigate('/login');
                return;
            }

            try {
                const response = await apiClient.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('[ERROR] UserDetail.tsx ::', error);
            }
            
        };
        fetchUser();
    }, [userId, navigate]);

    /**
     * 입력 필드의 값이 변경될 때 상태 업데이트 함수.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 입력 이벤트.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    /**
     * 변경된 사용자 정보를 기반으로 변경 요청을 보내는 함수.
     * `/api/users/${user.id}` 에 put 요청.
     * 성공시 메인 페이지로 이동.
     * 
     * @param {React.FormEvent} e 폼 제출 이벤트.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user) {
            if (!user.username || !user.password) {
                setError('There are empty items');
                return;
            }

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

    /**
     * 메인 페이지로 돌아가는 함수.
     */
    const handleBackToMain = () => {
        const currentPath = location.pathname;
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        navigate(parentPath);
    }

    /**
     * 사용자 삭제 페이지로 이동하는 함수.
     */
    const handleDeleteUser = () => {
        navigate(`${location.pathname}/delete`);
    }

    if (!user) {
        return (
            <div>
                Loading user data...
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.updateBox}>
                <p className={styles.title}>Change User Info</p>
                <p className={styles.inputPlaceholder}>Username</p>
                <input 
                    className={styles.inputBox}
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                <p className={styles.inputPlaceholder}>Password</p>
                <input 
                    className={styles.inputBox}
                    type="password"
                    name="password"
                    value=""
                    onChange={handleChange}
                    required
                />
                <button className={styles.button} onClick={handleSubmit}>Save</button>
                <button className={styles.button} onClick={handleBackToMain}>Back</button>
                <button className={styles.deleteButton} onClick={handleDeleteUser}>Delete</button>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default UpdateUser;