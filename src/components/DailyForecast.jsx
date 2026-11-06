
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherUtils';

const DailyForecast = ({ daily }) => {

    return (
        <section className="mt-8 rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-xl shadow-black/10">

            {/* Heading */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">
                    7-Day Forecast
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                    Weather outlook for the coming days
                </p>
            </div>

            {/* Daily Forecast Rows */}
            <div className="space-y-3">

                {daily.time.map((date, index) => {

                    // Convert API date into a local date
                    const [year, month, day] = date.split('-').map(Number);
                    const dateObject = new Date(year, month - 1, day);

                    const dayName = index === 0
                        ? 'Today'
                        : dateObject.toLocaleDateString('en-US', {
                            weekday: 'short'
                        });

                    const formattedDate = dateObject.toLocaleDateString(
                        'en-US',
                        {
                            day: 'numeric',
                            month: 'short'
                        }
                    );

                    const weatherCode = daily.weather_code[index];
                    const maxTemp = daily.temperature_2m_max[index];
                    const minTemp = daily.temperature_2m_min[index];
                    const precipitation =
                        daily.precipitation_probability_max[index];

                    return (
                        <div
                            key={date}
                            className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10"
                        >

                            {/* Day and Date */}
                            <div>
                                <div className="flex items-center justify-end gap-3">
                                    <span className="font-semibold">
                                        {Math.round(maxTemp)}°
                                    </span>

                                    <span className="text-slate-400">
                                        {Math.round(minTemp)}°
                                    </span>
                                </div>
                            </div>

                            {/* Weather Condition */}
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">
                                    {getWeatherIcon(weatherCode)}
                                </span>

                                <span className="hidden text-xs text-slate-400 sm:block">
                                    {getWeatherDescription(weatherCode).replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\uFE0F?\s*/u, '')}
                                </span>
                            </div>

                            {/* Temperatures and Rain */}
                            <div className="text-right">
                                <p className="font-semibold">
                                    {Math.round(maxTemp)}°C
                                    <span className="ml-2 text-slate-400">
                                        {Math.round(minTemp)}°C
                                    </span>
                                </p>

                                <p className="mt-1 text-xs text-blue-300">
                                    💧 {precipitation ?? 0}%
                                </p>
                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
};

export default DailyForecast;
