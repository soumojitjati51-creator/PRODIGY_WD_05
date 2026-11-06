
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getCoordinates(city) {
    const params = new URLSearchParams({
        name: city,
        count: '5',
        language: 'en',
        format: 'json'
    });

    const response = await fetch(`${GEO_URL}?${params}`);

    // Check HTTP response
    if (!response.ok) {
        throw new Error(
            `Geocoding service error (${response.status}). Please try again.`
        );
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error('City not found');
    }

    const cityData = data.results[0];

    // Validate coordinates
    if (
        !Number.isFinite(cityData.latitude) ||
        !Number.isFinite(cityData.longitude)
    ) {
        throw new Error('Invalid location data received.');
    }

    return cityData;
}
export async function getCurrentWeather(latitude, longitude) {
    // Validate coordinates before making the request
    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
    ) {
        throw new Error('Invalid geographical coordinates.');
    }
    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'weather_code',
            'wind_speed_10m',
            'wind_direction_10m',
            'is_day'
        ].join(','),
        hourly: [
            'temperature_2m',
            'weather_code',
            'precipitation_probability'
        ].join(','),
        forecast_hours: '24',
        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_probability_max'
        ].join(','),

        forecast_days: '7',
        timezone: 'auto'
    });

    const response = await fetch(`${WEATHER_URL}?${params}`);

    // Check HTTP response
    if (!response.ok) {
        throw new Error(
            `Weather service error (${response.status}). Please try again.`
        );
    }

    const data = await response.json();
    // Validate the received weather data
    if (!data.current || !data.hourly || !data.daily) {
        throw new Error('Incomplete weather data received from the server.');
    }

    // Check whether forecast arrays are available
    if (
        !Array.isArray(data.hourly.time) ||
        !Array.isArray(data.daily.time)
    ) {
        throw new Error('Invalid forecast data received.');
    }

    return data;
}