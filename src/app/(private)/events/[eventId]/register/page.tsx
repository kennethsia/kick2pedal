import { RegisterEventFormV2 } from '@/components/RegisterEventFormV2';
import { getUserMeLoader } from '@/data/services/getUserMeLoader';
import { api } from '@/lib/apiClient';
import { notFound } from 'next/navigation';

export default async function RegisterPage({ params }: { params: any }) {
  // Remove await from params
  const { eventId } = await params;
  const { data: event } = await api.events.get(eventId);
  const user = await getUserMeLoader();

  if (!event) {
    notFound();
  }

  // return null;

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
