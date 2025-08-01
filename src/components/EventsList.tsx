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

export default async function Events() {
  const { data: allEvents } = await api.events.list();
  const events = allEvents.filter(
    (event: any) => new Date(event.date) > new Date(),
  );

  const previousEvents = allEvents.filter(
    (event: any) => new Date(event.date) < new Date(),
  );

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {events.map((event: any) => (
            <Card key={event.id}>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={`${event.image?.url}` || '/placeholder-event.jpg'}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {event.description}
                    </CardDescription>
                  </div>
                  <Link href={`/events/${event.documentId}/register`}>
                    <Button size={'sm'}>Register</Button>
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

        <h1 className="text-3xl font-bold mb-8 mt-8">Previous Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {previousEvents.map((event: any) => (
            <Card key={event.id}>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={`${event.image?.url}` || '/placeholder-event.jpg'}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {event.description}
                    </CardDescription>
                  </div>
                  <Link href={`/events/${event.documentId}/register`}>
                    <Button size={'sm'}>Register</Button>
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
      </main>
    </div>
  );
}
