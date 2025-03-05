import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={120} height={40} />
      </Link>
      <Button asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
    </nav>
  );
}
