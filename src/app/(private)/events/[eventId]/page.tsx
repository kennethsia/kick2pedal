import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/apiClient';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Use the PageProps type for the component
export default async function EventsPage({ params }: { params: any }) {
  // Remove await from params
  const { eventId } = params;
  const { data: event } = await api.events.get(eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={
              `${process.env.STRAPI_BASE_URL}${event.image?.url}` ||
              '/placeholder-event.jpg'
            }
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl">{event.title}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {event.date}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
              {event.maxCapacity && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {event.maxCapacity} spots
                </div>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert">{event.description}</div>
          <Separator className="my-4" />
          {/* <Button className="w-full" size="lg">
            Register for Event
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
}
