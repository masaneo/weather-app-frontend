import axios from 'axios';

export const BASE_URL = process.env.VUE_APP_API_URL;

export async function fetchForecast(latitude, longitude) {
    return await axios.get(`${BASE_URL}/forecast`, {
        params: {
            latitude,
            longitude
        },
    });
}

export async function fetchWeeklySummary(latitude, longitude) {
    return await axios.get(`${BASE_URL}/weeklySummary`, {
        params: {
            latitude,
            longitude
        },
    });
}