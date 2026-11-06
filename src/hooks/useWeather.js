
import { useState } from 'react';

import {
    getCoordinates,
    getCurrentWeather
} from '../services/weatherService';

export function useWeather() {

    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');

    // Convert technical errors into user-friendly messages
    const getErrorMessage = (err) => {

        if (err instanceof TypeError) {
            return 'Network error. Please check your internet connection.';
        }

        const message = err.message?.toLowerCase() || '';

        if (message.includes('not found')) {
            return 'City not found. Please enter a valid city name.';
        }

        if (
            message.includes('network') ||
            message.includes('fetch')
        ) {
            return 'Unable to connect to the server. Please check your internet connection.';
        }

        return 'Something went wrong while fetching weather data. Please try again.';
    };

    // Fetch weather using city name
    const fetchWeatherByCity = async (city) => {

        try {
            setLoading(true);
            setError('');
            setWeather(null);
            setLocation(null);

            // Step 1: Get geographical coordinates
            const cityData = await getCoordinates(city);

            // Step 2: Fetch weather using coordinates
            const weatherData = await getCurrentWeather(
                cityData.latitude,
                cityData.longitude
            );

            // Step 3: Update React states
            setLocation(cityData);
            setWeather(weatherData);

        } catch (err) {

            setError(getErrorMessage(err));

        } finally {

            setLoading(false);

        }
    };

    // Fetch weather using current location
    const fetchWeatherByLocation = () => {

        // Check browser geolocation support
        if (!navigator.geolocation) {
            setWeather(null);
            setLocation(null);
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setLoading(true);
        setError('');
        setWeather(null);
        setLocation(null);

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {
                    // Get coordinates from browser
                    const { latitude, longitude } = position.coords;

                    // Fetch weather using coordinates
                    const weatherData = await getCurrentWeather(
                        latitude,
                        longitude
                    );

                    setWeather(weatherData);

                    setLocation({
                        name: 'Your Current Location',
                        country: '',
                        latitude,
                        longitude
                    });

                } catch (err) {

                    setError(getErrorMessage(err));

                } finally {

                    setLoading(false);

                }
            },

            (geoError) => {

                // Handle different geolocation errors
                switch (geoError.code) {

                    case 1:
                        setError(
                            'Location permission denied. Please allow location access in your browser settings.'
                        );
                        break;

                    case 2:
                        setError(
                            'Your current location is unavailable. Please try again.'
                        );
                        break;

                    case 3:
                        setError(
                            'Location request timed out. Please try again.'
                        );
                        break;

                    default:
                        setError(
                            'Unable to retrieve your current location.'
                        );
                }

                setLoading(false);

            },

            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 60000
            }

        );
    };

    return {
        weather,
        location,
        loading,
        error,
        fetchWeatherByCity,
        fetchWeatherByLocation
    };

}
