import axios from 'axios';

const API_KEY = '0380b971bfba4b55afd133434253004';
const BASE_URL = 'https://api.weatherapi.com/v1';


export const fetchWeatherByCords = async (lat, lon) => {
    try{
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {key: API_KEY, q: `${lat},${lon}`}
        });
        return response.data;
    } catch(error){
        console.error('Error fetching weather by coordinates.', error.message);
        throw error;
    }
};

export const fetchWeatherByCity = async (city) => {
    try{
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {key: API_KEY, q: city}
        });
        return response.data;
    } catch(error){
        if (error.response && error.response.status === 400)
        {
            throw new Error('City not found.')
        }
        else
        {
            throw new Error('Error fetching weather by city.');
        }
    }
};

export const fetchForecast = async(query, days=5) => {
    try{
        const response = await axios.get(`${BASE_URL}/forecast.json`, {
            params: {key: API_KEY, q: query, days: days, aqi: 'no', alerts: 'no'}
        });
        return response.data;
    } catch(error){
        console.error('Error fetching forecast.', error.message);
        throw error;
    }
}