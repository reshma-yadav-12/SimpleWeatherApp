import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchForecast } from '../services/WeatherService';

const DailyForecast = ({ location , unit}) =>{
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        if (location) {
            fetchForecast(location)
            .then(data => setForecastData(data.forecast.forecastday))
            .catch(console.error);
        }
    }, [location]);


    return (
        <div className="mt-5">
            <h4>5-Day Forecast</h4>
            <div className="row">
                { forecastData ? (
                    forecastData.slice(0,5).map((day, index) => {
                        const max_temp = unit === 'c' ? day.day['maxtemp_c'] : day.day['maxtemp_f'];
                        const min_temp = unit === 'c' ? day.day['mintemp_c'] : day.day['mintemp_f'];
                        const symbol = unit.toUpperCase();
                        return(
                        <div key={index} className="col-md-2 col-6 mb-3">
                            <div className="card text-center p-2">
                                <p>{ day.date }</p>
                                <img src = {`https:${day.day.condition.icon}`} alt="icon" width = "40" />
                                <p>High: {max_temp} °{symbol}</p>
                                <p>Low: {min_temp} °{symbol}</p>
                            </div>
                        </div>
                        );
                    })
                ):(<p>Loading forecast.....</p>)}
            </div>
        </div>
    );
};

export default DailyForecast;