import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

async function getDashboardData() {
  const [totalEvents, totalUsers] = await Promise.all([
    prisma.event.count(),
    prisma.user.count(),
  ]);

  return {
    totalEvents,
    totalUsers,
  };
}

export default async function DashboardPage() {
  const { totalEvents, totalUsers } = await getDashboardData();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalEvents}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
