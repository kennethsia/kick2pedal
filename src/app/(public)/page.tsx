import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/apiClient';
import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { data: allEvents } = await api.events.list();
  const events = allEvents.filter(
    (event: any) => new Date(event.date) > new Date(),
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>

      <div className="grid gap-6">
        {events.map((event: any) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative aspect-[16/9] w-full">
              {event?.image?.url && (
                <Image
                  src={`${event.image?.url}` || '/placeholder-event.jpg'}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {event.description}
                  </CardDescription>
                </div>
                <Link href={`/events`}>
                  <Button size="lg">Register</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="flex gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    <span>{event.maxCapacity} spots</span>
                  </div> */}
                {/* <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
