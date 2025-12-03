'use server';

import clientPromise from '@/lib/mongodb';
import type { WeatherData } from '@/lib/types';

export async function saveWeatherLog(weatherData: WeatherData) {
  try {
    const client = await clientPromise;
    const db = client.db('weather_app');
    const collection = db.collection('weather_logs');
    
    // Only log a subset of data to keep documents smaller
    const logEntry = {
      current: {
        city: weatherData.current.city,
        temperature: weatherData.current.temperature,
        condition: weatherData.current.condition,
      },
      createdAt: new Date(),
    };

    await collection.insertOne(logEntry);
    
    return { success: true };
  } catch (e) {
    console.error('Failed to save weather log to MongoDB', e);
    // Don't return error to client, just log it
    return { success: false };
  }
}
