import axios from 'axios';

export const BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchForecast(latitude, longitude) {
    return await axios.get(`${BASE_URL}/forecast`, {
        params: {
            latitude,
            longitude
        },
    });
}