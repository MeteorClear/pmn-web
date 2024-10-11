import apiClient from "../../api/apiClient"

// 로그인시 사용한 username(email)을 받아서 userid를 찾는 함수
// get, /users/email/{email}

const getUserByUsername = async (email: string) => {
    try {
        const response = await apiClient.get(`/users/email/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default getUserByUsername;