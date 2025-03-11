import { PasswordProtection } from '@/components/PasswordProtection';
import { RegistrationList } from '@/components/RegistrationList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminPage() {
  return (
    <PasswordProtection>
      <div className="container py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Event Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <RegistrationList />
          </CardContent>
        </Card>
      </div>
    </PasswordProtection>
  );
}
