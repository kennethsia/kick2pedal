import EventsList from '@/components/EventsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Coming soon</p>
          </CardContent>
        </Card>
      </div>
      <EventsList />;
    </div>
  );
}
