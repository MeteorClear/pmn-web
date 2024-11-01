import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './UserDetail.module.css';

/**
 * 사용자 정보 필드 정의
 * 
 * @property {number} id 사용자 고유번호.
 * @property {string} email 사용자 이메일.
 * @property {string} username 사용자 닉네임.
 * @property {string} createdAt 사용자 계성 생성일.
 */
interface User {
    id: number;
    email: string;
    username: string;
    createdAt: string;
};

/**
 * 사용자 세부 정보를 보여주는 컴포넌트.
 * 사용자 정보 조회 및 변경 페이지 이동 담당.
 * 
 * @component
 * @returns {JSX.Element} UserDetail 컴포넌트.
 */
const UserDetail = () => {
    const [user, setUser] = useState<User | null>(null);
    const userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId') as string, 10) : null;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * 저장된 사용자 ID를 기반으로 사용자 정보를 불러오는 함수.
         * `/users/${userId}` 에 get 요청.
         * 
         * @async
         */
        const fetchUser = async () => {
            try {
                const response = await apiClient.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('[ERROR] UserDetail.tsx ::', error);
            }
        };
        fetchUser();
    }, [userId]);

    /**
     * 사용자 정보 수정 페이지로 이동하는 함수.
     */
    const handleUpdateUser = () => {
        navigate(`${location.pathname}/change`);
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
            <p className={styles.userInfo}>{user.id}</p>
            <p className={styles.userInfo}>{user.email}</p>
            <p className={styles.userInfo}>{user.username}</p>
            <p className={styles.userInfo}>{user.createdAt}</p>
            <button className={styles.button} onClick={handleUpdateUser}>Change User Info</button>
        </div>
    );
};

export default UserDetail;