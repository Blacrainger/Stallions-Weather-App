'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { WeatherData, City, HistoricalWeatherData } from '@/lib/types';
import { getWeatherData, getAirPollutionData } from '@/lib/weather-api';
import { LoadingSkeleton } from '@/components/weather/loading-skeleton';
import { WeatherDisplay } from '@/components/weather/weather-display';
import { StallionsWeatherAppLogo } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, History } from 'lucide-react';
import { saveWeatherLog } from './actions';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoricalWeatherDialog } from '@/components/weather/historical-weather';
import { Button } from '@/components/ui/button';
import { getWeatherLogs } from '@/lib/actions';


const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes
const AUN_COORDS = { lat: 9.191132, lon: 12.499648, name: 'Yola', country: 'NG', state: 'Adamawa State' };

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city] = useState<City>(AUN_COORDS);
  const [units] = useState<'metric' | 'imperial'>('metric');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historicalData, setHistoricalData] = useState<HistoricalWeatherData[]>([]);

  const fetchWeather = useCallback(async (selectedCity: City, selectedUnits: 'metric' | 'imperial') => {
    const apiKey = "98ad386102be9343288fc55cb6f57a90";
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      setError('OpenWeather API key is missing. Please add it to your .env.local file.');
      setLoading(false);
      return;
    }

    if(isInitialLoad) {
      setLoading(true);
    }

    try {
      const [weatherResponse, air] = await Promise.all([
        getWeatherData({ lat: selectedCity.lat, lon: selectedCity.lon, apiKey, units: selectedUnits }),
        getAirPollutionData({ lat: selectedCity.lat, lon: selectedCity.lon, apiKey })
      ]);
      
      const combinedData = { 
        ...weatherResponse, 
        air, 
        current: { ...weatherResponse.current, city: selectedCity.name } 
      };

      setWeatherData(combinedData);
      setError(null);
      await saveWeatherLog(combinedData);
    } catch (err: any) {
      setError(err.message || 'Could not fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
      if(isInitialLoad) setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    fetchWeather(city, units);
    const intervalId = setInterval(() => fetchWeather(city, units), REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [city, units, fetchWeather]);

  const handleHistoryClick = async () => {
    const logs = await getWeatherLogs();
    setHistoricalData(logs);
    setIsHistoryOpen(true);
  };
  
  const renderContent = () => {
    if (loading && isInitialLoad) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (!weatherData) {
      return null;
    }

    return (
      <WeatherDisplay weather={weatherData} units={units} />
    );
  };

  const MemoizedContent = useMemo(() => renderContent(), [loading, isInitialLoad, error, weatherData, units]);

  return (
    <>
      <main className="flex min-h-svh w-full flex-col items-center bg-background p-4 sm:p-6 font-body transition-colors duration-300">
        <div className="w-full max-w-md">
          <header className="flex items-center justify-between py-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <StallionsWeatherAppLogo className="size-10 text-primary" />
                <h1 className="text-3xl font-bold font-headline text-foreground">
                  Stallions Weather
                </h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button variant="ghost" size="icon" onClick={handleHistoryClick}>
                <History className="size-5" />
                <span className="sr-only">View weather history</span>
              </Button>
            </motion.div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={city.name + city.country}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {MemoizedContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <HistoricalWeatherDialog 
        isOpen={isHistoryOpen} 
        onOpenChange={setIsHistoryOpen} 
        data={historicalData} 
        units={units}
      />
    </>
  );
}
