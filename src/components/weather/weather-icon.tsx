import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  CloudSun,
  Moon,
  CloudMoon,
  Cloudy,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Thermometer,
  type LucideProps,
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  condition: string;
}

export function WeatherIcon({ condition, ...props }: WeatherIconProps) {
  const normalizedCondition = condition.toLowerCase();

  if (normalizedCondition.includes('sun') || normalizedCondition.includes('sunny')) {
    return <Sun {...props} />;
  }
  if (normalizedCondition.includes('clear')) {
    // Simple check for night/day could be added here
    return <Sun {...props} />;
  }
  if (normalizedCondition.includes('rain')) {
    return <CloudRain {...props} />;
  }
  if (normalizedCondition.includes('drizzle')) {
    return <CloudDrizzle {...props} />;
  }
  if (normalizedCondition.includes('snow')) {
    return <Snowflake {...props} />;
  }
  if (normalizedCondition.includes('wind')) {
    return <Wind {...props} />;
  }
  if (normalizedCondition.includes('thunder')) {
    return <CloudLightning {...props} />;
  }
  if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist')) {
    return <CloudFog {...props} />;
  }
  if (normalizedCondition.includes('cloud')) {
    return <Cloudy {...props} />;
  }

  return <Thermometer {...props} />;
}
