import axios from 'axios';

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'https://frontend-take-home-service.fetch.com',
        withCredentials: true,       
        headers: {
            'fetch-api-key': $FETCH_TAKEHOME_API_KEY
        },
    });
};