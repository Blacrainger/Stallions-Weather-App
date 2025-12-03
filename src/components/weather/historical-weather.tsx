import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HistoricalWeatherData } from '@/lib/types';
import { format } from 'date-fns';

interface HistoricalWeatherDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  data: HistoricalWeatherData[];
  units: 'metric' | 'imperial';
}

export function HistoricalWeatherDialog({ isOpen, onOpenChange, data, units }: HistoricalWeatherDialogProps) {
    const tempUnit = units === 'metric' ? '°C' : '°F';
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Weather History</DialogTitle>
          <DialogDescription>
            Showing the last {data.length} weather logs recorded for the selected city.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>{format(new Date(log.createdAt), 'PPpp')}</TableCell>
                  <TableCell>{log.current.temperature}{tempUnit}</TableCell>
                  <TableCell>{log.current.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
