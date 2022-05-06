import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://da38-138-59-236-239.ngrok.io',
})