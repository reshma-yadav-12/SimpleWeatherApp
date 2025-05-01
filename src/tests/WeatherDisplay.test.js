import { render, screen } from '@testing-library/react';
import WeatherDisplay from '../WeatherDisplay';
import { WeatherContext } from '../../context/WeatherContext';

const mockWeather = {
    name: 'Pune',
    main: {temp: 46},
    weather: [{description: 'Sunny', icon: '01d'}],
};

test('renders weather display correctly', ()
    render(
        <WeatherContext.Provider value = {{ unit: 'c', setUnit: jest.fn() }}>
            <WeatherDisplay weather={mockWeather} />
        </WeatherContext.Provider>
    );

    expect(screen.getByText('Pune')).toBeInTheDocument();
    expect(screen.getByText('46 C')).toBeInTheDocument();
    expect(screen.getByText('/Sunny/i')).toBeInTheDocument();
)