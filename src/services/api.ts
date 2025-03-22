import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081',
});

export const getNavigation = async () => {
    const response = await api.get('/nav');
    return response.data;
};

export const saveNavigation = async (navItems: any) => {
    await api.post('/nav', navItems);
};

export const trackNavChange = async (id: number, from: number, to: number) => {
    await api.post('/track', { id, from, to });
};

export default api;
