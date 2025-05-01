import { useEffect, useState,useContext } from 'react';
import WeatherDisplay from '../components/WeatherDisplay';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import { WeatherContext } from '../context/WeatherContext';
import { fetchWeatherByCords } from '../services/WeatherService';
import { fetchForecast } from '../services/WeatherService';
import {Link} from 'react-router-dom';

const Home = () => {
    const {unit} = useContext(WeatherContext);
    const [ weather, setWeather ] = useState(null);
    const [ forecast, setForecast ] = useState(null);
    const [location, setLocation ] = useState('');


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const {latitude, longitude} = position.coords;
            const data = await fetchWeatherByCords(latitude, longitude, unit);
            const forecastData = await fetchForecast(latitude, longitude, unit);
            setWeather(data);
            setForecast(forecastData);
            setLocation(data.location.name)
        });

    }, [unit]);

    if (!weather) return <p>Loading ..... </p>;

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Current Weather</h2>
                <Link to="/search" className="btn btn-primary">Search by City</Link>
            </div>

            <WeatherDisplay weather={weather} />
            {forecast && (
                <>
                 <HourlyForecast hourly={forecast.forecast.forecastday[0].hour} unit = {unit}/>
                 <DailyForecast location ={location} unit = {unit} />
                </>
            )}
        </div>
    );
};

export default Home;

