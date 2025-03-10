import { RegisterEventFormV2 } from '@/components/RegisterEventFormV2';
import { Button } from '@/components/ui/button';
import { getUserMeLoader } from '@/data/services/getUserMeLoader';
import { api } from '@/lib/apiClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function RegisterPage({ params }: { params: any }) {
  // Remove await from params
  const { eventId } = await params;
  const { data: event } = await api.events.get(eventId);
  const user = await getUserMeLoader();
  const { data: registrations } = await api.registration.list(
    user?.data?.documentId,
  );

  if (!event) {
    notFound();
  }

  if (registrations && registrations.length > 0) {
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

  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p className="text-muted-foreground">
          Complete your registration details below
        </p>
      </div>
      <RegisterEventFormV2 event={event} user={user} />
    </div>
  );
}
