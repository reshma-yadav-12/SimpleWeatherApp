import axios from 'axios';
import { fetchWeatherByCity } from '../weatherService';

jest.mock('axios');

test('fetch weather by city', async () => {
    const city = 'Pune'
    const unit = 'metric'
    const mockData = {name: 'Pune', ,main: {temp : 40}};

    axios.get.mockResolvedValueOnce({data: mockData});

    const result = await fetchWeatherByCity(city, unit);
    expect (result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
        expect.StringContaining('/weather'),
        expect.objectContaining({
            params: expect.objectContaining({city: city, units: unit}),
        })
    };
});