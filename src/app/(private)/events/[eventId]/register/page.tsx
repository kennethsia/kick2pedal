import { RegisterEventFormV3 } from '@/components/RegisterEventFormV3';
import { RegisterEventFormV4 } from '@/components/RegisterEventFormV4';
import { Button } from '@/components/ui/button';
import { getUserMeLoader } from '@/data/services/getUserMeLoader';
import { api } from '@/lib/apiClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const CLOSED_EVENTS = [
  '1st Victor Cup Race',
  'Kick2Pedal Mindanao - Northtown - Davao City',
  'Kick2Pedal Mindanao - Avia Estate - Sarangani Province',
  'Kick2Pedal - DAY 1 - ASEAN International Runbike Championship',
  'Kick2Pedal - DAY 2 - ASEAN International Runbike Championship',
];

export default async function RegisterPage({ params }: { params: any }) {
  // Remove await from params
  const { eventId } = await params;
  const { data: event } = await api.events.get(eventId);
  const user = await getUserMeLoader();
  const { data: registrations } = await api.registration.list(
    user?.data?.documentId,
  );
  console.log(eventId);
  console.log(registrations);

  if (!event) {
    notFound();
  }

  // Check if the user is already registered for this specific event
  const isAlreadyRegistered = registrations?.some(
    (registration: any) => registration.event.documentId === eventId,
  );

  // Check if event registration is closed
  const isEventClosed = CLOSED_EVENTS.includes(event.title);

  if (isAlreadyRegistered) {
    return (
      <div className="container max-w-2xl py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="text-muted-foreground">
            You are already registered in this event. if you want to make any
            changes to your registration contact our support team.
          </p>
        </div>
        <Link href="/support">
          <Button>Contact support</Button>
        </Link>
      </div>
    );
  }

  if (isEventClosed) {
    return (
      <div className="container max-w-2xl py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="text-muted-foreground">
            Registration for this event is closed. If you have any questions
            please contact our support team.
          </p>
        </div>
        <Link href="/support">
          <Button>Contact support</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p className="text-muted-foreground">
          Complete your registration details below
        </p>
      </div>
      {event.title ===
        'Kick2Pedal - DAY 1 - ASEAN International Runbike Championship' ||
      event.title ===
        'Kick2Pedal - DAY 2 - ASEAN International Runbike Championship' ? (
        <RegisterEventFormV4 event={event} user={user} />
      ) : (
        <RegisterEventFormV3 event={event} user={user} />
      )}
    </div>
  );
}
