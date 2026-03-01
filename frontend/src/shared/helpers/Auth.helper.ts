export const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt_token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};
