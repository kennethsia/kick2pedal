import Image from 'next/image';
import Logo from '@/public/kick2pedal-word-logo_360x.png';
import { SignupForm } from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-32 w-32 items-center justify-center rounded-md text-primary-foreground">
            <Image src={Logo} alt="Authentication background" priority />
          </div>
        </a>
        <SignupForm />
      </div>
    </div>
  );
}
