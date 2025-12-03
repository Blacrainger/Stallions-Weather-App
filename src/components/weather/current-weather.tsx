import type { CurrentWeather, AirPollutionData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { WeatherIcon } from './weather-icon';
import { Droplets, Wind, Sunrise, Sunset } from 'lucide-react';
import { motion } from 'framer-motion';

interface CurrentWeatherProps {
  weather: CurrentWeather;
  air: AirPollutionData;
  units: 'metric' | 'imperial';
}

export function CurrentWeatherDisplay({ weather, air, units }: CurrentWeatherProps) {
  const tempUnit = units === 'metric' ? 'C' : 'F';

  return (
    <Card className="w-full shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{weather.city}</CardTitle>
        <CardDescription>As of {weather.time}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
            <WeatherIcon condition={weather.condition} className="size-20 text-primary" />
          </motion.div>
          <div>
            <p className="text-7xl font-bold text-foreground">
              {weather.temperature}°<span className="text-4xl font-medium text-muted-foreground">{tempUnit}</span>
            </p>
            <p className="text-center text-lg capitalize text-muted-foreground">{weather.condition}</p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-8 pt-4 text-sm">
           <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
           >
            <Droplets className="size-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">{weather.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
          </motion.div>
           <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
           >
            <Wind className="size-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">{weather.windSpeed} {units === 'metric' ? 'km/h' : 'mph'}</p>
              <p className="text-xs text-muted-foreground">Wind</p>
            </div>
          </motion.div>
        </div>

         <div className="flex w-full justify-around pt-4">
           <motion.div 
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
           >
            <Sunrise className="size-5 text-yellow-500" />
            <div>
              <p className="font-semibold text-foreground">{weather.sunrise}</p>
              <p className="text-xs text-muted-foreground">Sunrise</p>
            </div>
          </motion.div>
           <motion.div 
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
           >
            <Sunset className="size-5 text-orange-500" />
            <div>
              <p className="font-semibold text-foreground">{weather.sunset}</p>
              <p className="text-xs text-muted-foreground">Sunset</p>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
