import React, { useEffect, useState } from 'react';
import { fetchWeatherByCords } from '../services/WeatherService';
import UnitToggle from '../components/UnitToggle';

const WeatherDisplay = () => {
    const [weather , setWeather] = useState(null);
    const [coords , setCoords] = useState({lat: null, lon: null});
    const [unit, setUnit] = useState('c');

    const toggleUnit = () => {
        setUnit((prev) => (prev==='c' ? 'f':'c'));
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setCoords({ lat: latitude, lon: longitude });
        });
    }, []);

    useEffect(() => {
        if (coords.lat && coords.lon) {
            fetchWeatherByCords(coords.lat, coords.lon)
            .then(setWeather)
            .catch(console.error);
        }
    }, [coords, unit]);

    if (!weather) return <div className="text-center mt-5">Loading....</div>

    const temp = weather.current[`temp_${unit}`];
    const symbol = unit.toUpperCase();
    return (
        <div className = "card text-center p-4">
            <h3 className = "card-title">{weather.location.name}</h3>
            <h1 className = "display-4">{temp} °{symbol}</h1>
            <p className = "lead">{weather.current.condition.text}</p>
            <img src = {`https:${weather.current.condition.icon}`} alt = "weather icon" width = "80" />
            <div className="mt-3">
                <UnitToggle onToggle = {toggleUnit} temperatureCelsius = {temp} />
            </div>
        </div>
    );
};

export default WeatherDisplay;