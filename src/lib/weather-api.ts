import { WeatherData, CurrentWeather, ForecastItem, City, AirPollutionData } from './types';

const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const AIR_POLLUTION_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

interface WeatherApiParams {
  lat: number;
  lon: number;
  apiKey: string;
  units: 'metric' | 'imperial';
}

const formatTime = (timestamp: number, timezone: number, options: Intl.DateTimeFormatOptions) => {
  // Convert timezone offset from seconds to milliseconds
  const timezoneOffset = timezone * 1000;
  // Adjust timestamp to local time
  const localTimestamp = (timestamp * 1000) + timezoneOffset;
  const date = new Date(localTimestamp);
  
  // Format time using UTC methods to avoid double-offsetting
  return date.toLocaleTimeString('en-US', { ...options, timeZone: 'UTC' });
};

const formatDate = (timestamp: number, timezone: number, options: Intl.DateTimeFormatOptions) => {
    const timezoneOffset = timezone * 1000;
    const localTimestamp = (timestamp * 1000) + timezoneOffset;
    const date = new Date(localTimestamp);

    return date.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });
};

const transformWeatherData = (currentData: any, forecastData: any, units: 'metric' | 'imperial'): Omit<WeatherData, 'air'> => {
    const timezone = forecastData.city.timezone;

    const current: Omit<CurrentWeather, 'city'> = {
        temperature: Math.round(currentData.main.temp),
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(units === 'metric' ? currentData.wind.speed * 3.6 : currentData.wind.speed), // m/s to km/h or mph
        time: formatTime(currentData.dt, timezone, { hour: '2-digit', minute: '2-digit', hour12: true }),
        feelsLike: Math.round(currentData.main.feels_like),
        uvi: 0, // Not available in this API version
        sunrise: formatTime(currentData.sys.sunrise, timezone, { hour: 'numeric', minute: 'numeric', hour12: true }),
        sunset: formatTime(currentData.sys.sunset, timezone, { hour: 'numeric', minute: 'numeric', hour12: true }),
    };

    const hourly: ForecastItem[] = forecastData.list.slice(0, 4).map((item: any) => ({
        time: formatTime(item.dt, timezone, { hour: 'numeric', hour12: true }),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main,
    }));

    const daily: ForecastItem[] = forecastData.list
      .filter((item: any) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5)
      .map((item: any) => ({
        time: formatDate(item.dt, timezone, { weekday: 'short' }),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main,
    }));

    return { current: current as CurrentWeather, hourly, daily };
};

export const getWeatherData = async ({ lat, lon, apiKey, units }: WeatherApiParams): Promise<Omit<WeatherData, 'air'>> => {
  const currentUrl = `${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  const forecastUrl = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    if (!currentResponse.ok) {
      const errorData = await currentResponse.json();
      throw new Error(`Weather API error: ${errorData.message || currentResponse.statusText}`);
    }
     if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json();
      throw new Error(`Forecast API error: ${errorData.message || forecastResponse.statusText}`);
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    return transformWeatherData(currentData, forecastData, units);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw new Error('Failed to fetch weather data from the service.');
  }
};


export const getAirPollutionData = async ({ lat, lon, apiKey }: Omit<WeatherApiParams, 'units'>): Promise<AirPollutionData> => {
    const url = `${AIR_POLLUTION_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
     try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Air Pollution API error: ${errorData.message || response.statusText}`);
        }
        const data = await response.json();
        const aqiData = data.list[0];
        return {
            aqi: aqiData.main.aqi,
            co: aqiData.components.co,
            no2: aqiData.components.no2,
            o3: aqiData.components.o3,
            so2: aqiData.components.so2,
        };
    } catch (error) {
        console.error('Failed to fetch air pollution data:', error);
        throw new Error('Failed to fetch air pollution data.');
    }
}