import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getUserMeLoader } from '@/data/services/getUserMeLoader';
import { api } from '@/lib/apiClient';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

interface Registration {
  id: number;
  documentId: string;
  registration_status: 'registered' | 'waitlisted' | 'confirmed';
  createdAt: string;
  amount: number | null;
  event: {
    title: string;
    description: string;
    date: string;
    location: string;
  };
  category: {
    name: string;
    title: string;
  };
  additional_category_1?: {
    name: string;
    title: string;
  };
  additional_category_2?: {
    name: string;
    title: string;
  };
}

const statusColors = {
  registered: 'bg-yellow-500',
  waitlisted: 'bg-orange-500',
  confirmed: 'bg-green-500',
} as const;

const capitalizeStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export default async function DashboardPage() {
  const user = await getUserMeLoader();
  const { data: registrations } = await api.registration.list(
    user?.data?.documentId,
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Registered Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{registrations.length}</p>
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

      <div className="space-y-4">
        <h2 className="text-xl font-semibold px-2">My Registrations</h2>
        <div className="grid gap-4">
          {registrations.map((registration: Registration) => (
            <Card key={registration.id} className="w-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{registration.event.title}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex flex-wrap gap-4 text-sm">
                        {/* <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(
                            new Date(registration.event.date),
                            'MMMM d, yyyy',
                          )}
                        </div> */}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {registration.event.location}
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className={statusColors[registration.registration_status]}
                  >
                    {capitalizeStatus(registration.registration_status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <p className="text-sm text-muted-foreground">
                  {registration.event.description}
                </p> */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {registration?.category?.title}
                    </Badge>
                    {registration.additional_category_1 && (
                      <Badge variant="outline">
                        {registration?.additional_category_1?.title}
                      </Badge>
                    )}
                    {registration.additional_category_2 && (
                      <Badge variant="outline">
                        {registration?.additional_category_2?.title}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Amount:</div>
                  <div className="text-lg font-bold">
                    ₱{registration.amount?.toLocaleString() ?? 'N/A'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Link href="/events">
          <Button>See all events</Button>
        </Link>
      </div>
    </div>
  );
}
