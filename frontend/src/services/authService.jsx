import axios from 'axios';
const API_URL = import.meta.env.VITE_BE_API_URL;

export const registerUser = async (username, password, isAdmin) => {
    try {
        console.log(`${API_URL}/register`);
        const response = await axios.post(`${API_URL}/auth/register`, { username, password, isAdmin });
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};

// Login user
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};