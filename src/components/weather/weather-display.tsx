import { WeatherData } from "@/lib/types";
import { CurrentWeatherDisplay } from "./current-weather";
import { Forecast } from "./forecast";

interface WeatherDisplayProps {
    weather: WeatherData;
    units: 'metric' | 'imperial';
}

export function WeatherDisplay({ weather, units }: WeatherDisplayProps) {
    return (
        <div className="space-y-6">
            <CurrentWeatherDisplay weather={weather.current} air={weather.air} units={units} />
            <Forecast title="Hourly Forecast" items={weather.hourly} />
            <Forecast title="Daily Forecast" items={weather.daily} />
        </div>
    );
}
