import axios from "axios";

const API_BASE = 'http://localhost:3001';

const loginToSpotify = () => {
    window.location = `${API_BASE}/login`;
}

const exchangeCodeForToken = async (code) => {
    const response = await axios.post(`${API_BASE}/callback`, { code });
    return response.data;
}

const getUserProfile = async (accessToken) => {
    try {
        const respone = await axios.get("http://localhost:3001/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return respone.data;
    } catch (error) {
        console.error("Failed to fetch profile:", error.response.data);
        throw error;
    }
}

const getUserPlaylists = async (accessToken) => {
    try {
        const response = await axios.get(`${API_BASE}/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user's playlists:", error.response.data);
        throw error;
    }
}

const getUserTopArtists = async (token) => {
    try {
        const response = await axios.get(`${API_BASE}/top-artists`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user's Top Artists:", error.response.data);
        throw error;
    }
}

const searchSpotify = async (token, query, type = 'artist') => {
    try {
        const response = await axios.get(`${API_BASE}/search`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { q: query, type }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Search Spotify:", error.response.data);
        throw error;
    }
}

export { loginToSpotify, exchangeCodeForToken, getUserProfile, getUserPlaylists, getUserTopArtists, searchSpotify }