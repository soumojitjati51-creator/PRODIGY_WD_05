
export function getWeatherDescription(code) {
    switch (code) {
        case 0:
            return '☀️ Clear sky';

        case 1:
            return '🌤️ Mainly clear';

        case 2:
            return '⛅ Partly cloudy';

        case 3:
            return '☁️ Overcast';

        case 45:
        case 48:
            return '🌫️ Foggy';

        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return '🌦️ Drizzle';

        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return '🌧️ Rainy';

        case 71:
        case 73:
        case 75:
        case 77:
            return '❄️ Snowy';

        case 80:
        case 81:
        case 82:
            return '🌦️ Rain showers';

        case 85:
        case 86:
            return '🌨️ Snow showers';

        case 95:
        case 96:
        case 99:
            return '⛈️ Thunderstorm';

        default:
            return '🌡️ Unknown weather condition';
    }
}

export function getWindDirection(degrees) {
    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'
    ];

    const index = Math.round(degrees / 22.5) % 16;

    return directions[index];
}
export function getWeatherIcon(code, isDay = 1) {

    if (code === 0) {
        return isDay ? '☀️' : '🌙';
    }

    if (code === 1) {
        return isDay ? '🌤️' : '🌙';
    }

    if (code === 2) {
        return isDay ? '⛅' : '☁️';
    }

    if (code === 3) return '☁️';

    switch (code) {
        case 45:
        case 48:
            return '🌫️';

        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return '🌦️';

        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return '🌧️';

        case 71:
        case 73:
        case 75:
        case 77:
            return '❄️';

        case 80:
        case 81:
        case 82:
            return '🌦️';

        case 85:
        case 86:
            return '🌨️';

        case 95:
        case 96:
        case 99:
            return '⛈️';

        default:
            return '🌡️';
    }
}