import { useState,useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { fetchWeatherByCity } from '../services/WeatherService';
import { fetchForecast } from '../services/WeatherService';
import UnitToggle from '../components/UnitToggle';

const SearchBar = () => {
    const [query, setQuery ] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [unit, setUnit] = useState('c');
    const[error, setError] = useState('');

    const toggleUnit = () => {
        setUnit((prev) => (prev==='c' ? 'f':'c'));
    };

    const handleSearch = async () => {
        try
        {
            const current = await fetchWeatherByCity(query);
            const forecastData = await fetchForecast(query);
            setWeather(current);
            setError('');
            setForecast(forecastData.forecast.forecastday);
        } catch(err) {
            setWeather(null);
            setForecast(null);
            setError(err.message);
        }
    };

    return (
        <div>
            <div className="input-group my-3">
                <input value={query} onChange = {(e) => setQuery(e.target.value)} className="form-control" placeholder = 'Enter City'/>
                <button onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {weather && (
                <div className="card text-center mb-4">
                    <div className="card-body">
                        <h5 className="card-title">{weather.location.name}</h5>
                        <p className="display-4">{ weather.current[`temp_${unit}`]}</p>
                        <img src = {`https:${weather.current.condition.icon}`} alt="icon" width = "80" />
                        <p>{weather.current.condition.text}</p>
                    </div>
                </div>
            )}

            {forecast && (
                <>
                <h5 className="text-center">Forecast</h5>
                <div className="row">
                    {forecast.map((day, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card text-center mb-3">
                                <div className="card-body">
                                    <h6>{day.date}</h6>
                                    <p>High: {day.day.maxtemp_c} °{unit === 'metric' ? 'C' : 'F'} </p>
                                    <p>Low: {day.day.mintemp_c} °{unit === 'metric' ? 'C' : 'F'} </p>
                                    <img src = {`https:${day.day.condition.icon}`} alt="icon" width = "80" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            )}
        </div>
    );
};

export default SearchBar;