
import SearchBar from './components/Searchbar';
import HourlyForecast from './components/HourlyForecast';

import { useWeather } from './hooks/useWeather';

import {
    getWeatherDescription,
    getWindDirection,
    getWeatherIcon
} from './utils/weatherUtils';
import DailyForecast from './components/DailyForecast';
import WeatherSkeleton from './components/WeatherSkeleton';

function App() {

    const {
        weather,
        location,
        loading,
        error,
        fetchWeatherByCity,
        fetchWeatherByLocation
    } = useWeather();

    // Weather description
    const weatherDescription = weather
        ? getWeatherDescription(weather.current.weather_code)
        : '';

    // Wind direction
    const windDirection = weather
        ? getWindDirection(weather.current.wind_direction_10m)
        : '';

    // Weather icon
    const weatherIcon = weather
        ? getWeatherIcon(
            weather.current.weather_code,
            weather.current.is_day
        )
        : null;
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">

            <div className="mx-auto max-w-3xl">

                {/* Application Header */}
                <header className="mb-10 text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                        <span>🌤️</span>
                        <span>Weather Dashboard</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Sky<span className="text-blue-400">Cast</span>
                    </h1>

                    <p className="mt-3 text-sm text-slate-400 sm:text-base">
                        Your daily weather, beautifully presented.
                    </p>
                </header>

                {/* Search Component */}
                <SearchBar
                    onSearch={fetchWeatherByCity}
                    loading={loading}
                />

                {/* Current Location Button */}
                <button
                    onClick={fetchWeatherByLocation}
                    disabled={loading}
                    className="mt-4 w-full rounded-xl border border-blue-500 px-4 py-3 text-blue-400 hover:bg-blue-500/10 disabled:opacity-50"
                >
                    {loading ? 'Fetching location...' : 'Use My Location'}
                </button>

                {/* Loading State */}
                {loading && <WeatherSkeleton />}

                {/* Error State */}
                {error && (
                    <p className="mt-8 text-center text-red-400">
                        {error}
                    </p>
                )}

                {/* Weather Information */}
                {weather && location && !loading && (
                    <>
                        {/* Main Weather Card */}
                        <div className="relative mt-10 overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-br from-slate-800 via-slate-800 to-blue-950 p-6 shadow-2xl shadow-blue-950/30 transition duration-300 hover:border-blue-400/30 sm:p-8">

                            {/* Location and Day/Night */}
                            <div className="flex items-center justify-between">

                                <div>
                                    <h2 className="text-xl font-semibold sm:text-2xl">
                                        {location.name}, {location.country}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Current Weather
                                    </p>
                                </div>

                                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-blue-200">
                                    {weather.current.is_day === 1
                                        ? '☀️ Day'
                                        : '🌙 Night'}
                                </span>

                            </div>

                            {/* Main Temperature Section */}
                            <div className="mt-10 flex items-center justify-between gap-4">

                                <div>
                                    <p className="text-7xl font-bold tracking-tighter sm:text-8xl">
                                        {weather.current.temperature_2m}°
                                        <span className="text-3xl">C</span>
                                    </p>

                                    <p className="mt-3 text-lg text-blue-300">
                                        {weatherDescription}
                                    </p>

                                    <p className="mt-2 text-sm text-slate-400">
                                        Feels like {weather.current.apparent_temperature}°C
                                    </p>
                                </div>

                                <div className="text-7xl sm:text-8xl">
                                    {weatherIcon}
                                </div>

                            </div>

                            {/* Weather Details */}
                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

                                {/* Humidity */}
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                                    <p className="text-sm text-slate-400">
                                        💧 Humidity
                                    </p>

                                    <p className="mt-3 text-2xl font-semibold">
                                        {weather.current.relative_humidity_2m}%
                                    </p>
                                </div>

                                {/* Wind Speed */}
                                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                                    <p className="text-sm text-slate-400">
                                        💨 Wind Speed
                                    </p>

                                    <p className="mt-3 text-2xl font-semibold">
                                        {weather.current.wind_speed_10m} km/h
                                    </p>
                                </div>

                                {/* Wind Direction */}
                                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                                    <p className="text-sm text-slate-400">
                                        🧭 Wind Direction
                                    </p>

                                    <p className="mt-3 text-2xl font-semibold">
                                        {windDirection}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Hourly Forecast - Outside Main Weather Card */}
                        <HourlyForecast hourly={weather.hourly} currentTime={weather.current.time} />
                        {/* Daily Forecast */}
                        <DailyForecast daily={weather.daily} />

                    </>
                )}

            </div>
            {/* Footer */}
            <footer className="mt-16 border-t border-white/10 pt-8 pb-4 text-center">

                <p className="text-sm text-slate-400">
                    Built with <span className="text-red-400">♥</span> using React and Tailwind CSS
                </p>

                <p className="mt-2 text-xs text-slate-500">
                    Weather data provided by Open-Meteo
                </p>

                <p className="mt-4 text-sm text-slate-400">
                    Developed by <span className="font-semibold text-blue-400">
                        Soumojit Jati
                    </span>
                </p>

                <p className="mt-2 text-xs text-slate-600">
                    © {new Date().getFullYear()} SkyCast. All rights reserved.
                </p>

            </footer>
        </div>


    );
}

export default App;