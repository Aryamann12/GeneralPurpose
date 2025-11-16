import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export const login = async (
  username: string,
  password: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    const { access_token, username: userUsername } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('username', userUsername);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed',
    };
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

