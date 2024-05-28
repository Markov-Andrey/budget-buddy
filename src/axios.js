import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL + 'api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

export default instance;
