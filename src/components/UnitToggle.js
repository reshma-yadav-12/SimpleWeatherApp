import React, {  useState } from 'react';

const UnitToggle = ({temperatureCelsius, OnToggle }) =>{

    const [unit, setUnit] = useState('c');
    const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32;
    const displayedTemperature = unit === 'Celsius' ? temperatureCelsius : convertToFahrenheit(temperatureCelsius);

    return (
        <button className="btn btn-outline-primary" onClick = {() => setUnit(unit === 'c' ? 'f' : 'c')}>
            Switch to {unit === 'c' ? 'Fahrenheit': 'Celsius'}
        </button>
    );
};

export default UnitToggle;