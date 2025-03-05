import { logoutAction } from '@/data/actions/authActions';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" className="w-full">
        <LogOut className="w-6 h-6 hover:text-primary" />
        Log out
      </Button>
    </form>
  );
}
