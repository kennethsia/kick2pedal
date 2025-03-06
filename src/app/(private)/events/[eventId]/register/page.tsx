import { notFound } from 'next/navigation';
import { api } from '@/lib/apiClient';
import { RegisterEventForm } from '@/components/RegisterEventForm';
import { getUserMeLoader } from '@/data/services/getUserMeLoader';

export default async function RegisterPage({ params }: { params: any }) {
  // Remove await from params
  const { eventId } = params;
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
      <RegisterEventForm event={event} user={user} />
    </div>
  );
}
