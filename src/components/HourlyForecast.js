const HourlyForecast = (
{ hourly, unit }) => {
    if (!hourly || hourly.length === 0) return null;

    return (
        <div className = "mt-5">
            <h4>Hourly Forecast</h4>
            <div className = "d-flex overflow-auto gap-3">
                {hourly.slice(0, 6).map((hour, index) => {
                    const temp = unit === 'c'?hour.temp_c : hour.temp_f;
                    const time = new Date (hour.time).getHours();

                return (
                    <div key={index} className="card text-center p-2" style={{minWidth: '100px'}}>
                        <p>{time}: 00 </p>
                        <img src = {`https:${hour.condition.icon}`} width = "40" />
                        <p>{Math.round(temp)}° {unit.toUpperCase()}</p>
                    </div>
                );
            })}
            </div>
        </div>
    );
};

export default HourlyForecast;