import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Current Weather Skeleton */}
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="size-20 rounded-full" />
            <div>
              <Skeleton className="h-16 w-36" />
              <Skeleton className="mt-2 h-6 w-24" />
            </div>
          </div>
          <div className="flex w-full justify-around pt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="size-5 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-5 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Skeleton */}
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-6 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
