export type City = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface AirPollutionData {
    aqi: number; // Air Quality Index
    co: number; // Carbon monoxide
    no2: number; // Nitrogen dioxide
    o3: number; // Ozone
    so2: number; // Sulphur dioxide
}

export interface CurrentWeather {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  time: string;
  feelsLike: number;
  uvi: number;
  sunrise: string;
  sunset: string;
}

export type ForecastItem = {
  time: string;
  temperature: number;
  condition: string;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: ForecastItem[];
  daily: ForecastItem[];
  air: AirPollutionData;
}

export interface HistoricalWeatherData {
    _id: string;
    current: {
        city: string;
        temperature: number;
        condition: string;
    },
    createdAt: string;
}
