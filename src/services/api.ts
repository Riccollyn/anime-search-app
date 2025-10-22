import axios from 'axios';

const API_BASE_URL = 'https://api.jikan.moe/v4';

export const fetchAnimeSearchResults = async (query: string, page: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/anime`, {
            params: {
                q: query,
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching anime search results');
    }
};

export const fetchAnimeDetails = async (id: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/anime/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching anime details');
    }
};