import { Card, CardContent } from '@/components/ui/card';
import { Store, Clock } from 'lucide-react';

export default function StorePage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-lg text-center">
        <CardContent className="pt-6 space-y-6">
          <div className="flex justify-center space-x-2">
            <Store className="h-12 w-12 text-muted-foreground" />
            <Clock className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Store Coming Soon
            </h1>
            <p className="text-muted-foreground">
              We&#34;re working hard to bring you the best push bikes and
              accessories. Stay tuned for our grand opening!
            </p>
          </div>
          <div className="pt-4 text-sm text-muted-foreground">
            <p>Expected categories:</p>
            <ul className="mt-2 space-y-1">
              <li>Push Bikes (12&#34; & 14&#34;)</li>
              <li>Parts & Accessories</li>
              <li>Pedal Bikes</li>
              <li>Protection Gear</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
