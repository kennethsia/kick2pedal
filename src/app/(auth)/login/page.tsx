import { GalleryVerticalEnd } from 'lucide-react';
import Image from 'next/image';
import { LoginForm } from '@/components/LoginForm';
import Poster from '@/public/k2p-logo-removebg-preview.png';
import Logo from '@/public/kick2pedal-word-logo_360x.png';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-32 w-32 items-center justify-center rounded-md text-primary-foreground">
              <Image src={Logo} alt="Authentication background" priority />
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={Poster}
          alt="Authentication background"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
