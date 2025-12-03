import type { ForecastItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon } from './weather-icon';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

interface ForecastProps {
  title: string;
  items: ForecastItem[];
}

export function Forecast({ title, items }: ForecastProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-1 rounded-lg border bg-card p-4 shadow-sm flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <p className="text-sm font-medium text-muted-foreground">{item.time}</p>
                <WeatherIcon condition={item.condition} className="size-8 text-primary" />
                <p className="text-xl font-bold text-foreground">{item.temperature}°</p>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
