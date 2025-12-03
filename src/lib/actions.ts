'use server';

import clientPromise from '@/lib/mongodb';
import type { WeatherData, HistoricalWeatherData } from '@/lib/types';
import { unstable_noStore as noStore } from 'next/cache';

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

export async function getWeatherLogs(): Promise<HistoricalWeatherData[]> {
  noStore();
  try {
    const client = await clientPromise;
    const db = client.db('weather_app');
    const collection = db.collection('weather_logs');

    // Get the last 50 logs, sorted by most recent
    const logs = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    // The _id is an ObjectId, which is not directly serializable. Convert it to a string.
    return logs.map(log => ({
        ...log,
        _id: log._id.toString(),
        createdAt: log.createdAt.toISOString(),
    })) as HistoricalWeatherData[];

  } catch (e) {
    console.error('Failed to fetch weather logs from MongoDB', e);
    return [];
  }
}
