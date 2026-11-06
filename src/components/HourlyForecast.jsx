
import { getWeatherIcon } from '../utils/weatherUtils';

const HourlyForecast = ({ hourly,currentTime  }) => {

    // Get the next 24 forecast hours
    const forecastHours = hourly.time
    .map((time, index) => ({ time, index }))
    .filter(item => item.time >= currentTime)
    .slice(0, 24);

    return (
        <section className="mt-8 rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-xl shadow-black/10">

            {/* Section Heading */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Hourly Forecast
                </h2>

                <span className="text-sm text-slate-400">
                    Next 24 hours
                </span>
            </div>

            {/* Horizontally Scrollable Forecast */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">

                {forecastHours.map(({time, index}) => {

                    const hour = Number(time.split('T')[1].slice(0, 2));

                    const formattedTime = new Date(2000, 0, 1, hour)
                        .toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            hour12: true
                        });

                    const temperature = hourly.temperature_2m[index];
                    const weatherCode = hourly.weather_code[index];
                    const precipitation =
                        hourly.precipitation_probability[index];

                    return (
                        <div
                            key={time}
                            className="flex w-24 shrink-0 snap-start flex-col items-center rounded-2xl border border-white/10 bg-slate-700/30 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/10"
                        >

                            {/* Time */}
                            <p className="text-sm text-slate-400">
                                {formattedTime}
                            </p>

                            {/* Weather Icon */}
                            <p className="my-4 text-3xl">
                                {getWeatherIcon(weatherCode)}
                            </p>

                            {/* Temperature */}
                            <p className="text-lg font-semibold">
                                {temperature}°C
                            </p>

                            {/* Precipitation */}
                            <p className="mt-2 text-xs text-blue-300">
                                💧 {precipitation ?? 0}%
                            </p>

                        </div>
                    );
                })}

            </div>

            <p className="mt-1 text-center text-xs text-slate-500">
                Scroll horizontally to see more
            </p>

        </section>
    );
};

export default HourlyForecast;
