# Stallion Weather App

A modern, responsive web application that provides real-time weather information and forecasts using a clean, animated interface.



Features

Real-time weather data (temperature, humidity, wind, sunrise & sunset)

Hourly and daily forecasts

Location-based weather (default: Yola, Nigeria)

Automatic weather logging to MongoDB

Fully responsive UI with smooth animations




Tech Stack

Next.js (App Router)

TypeScript & React

Tailwind CSS

shadcn/ui

Framer Motion

MongoDB (Atlas)

OpenWeatherMap API




Getting Started
1. Install dependencies
npm install

2. Configure environment variables

Create a .env file:

NEXT_PUBLIC_WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

3. Run the app
npm run dev


Open http://localhost:9002 in your browser.



Project Structure
src/
 ├─ app/          # Pages, layouts, server actions
 ├─ components/   # UI and weather components
 └─ lib/          # API and database utilities




Future Enhancements

Historical weather charts

User-saved locations

PWA support

Smart outfit recommendations
