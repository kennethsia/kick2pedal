'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Logo from '@/public/kick2pedal-word-logo_360x.png';

import {
  Home,
  Info,
  Calendar,
  User,
  Store,
  Trophy,
  Contact,
  Users,
  Target,
  Gift,
} from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon?: any;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  items?: NavItem[];
};

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from './ui/separator';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    icon?: React.ComponentType<{ className?: string }>;
  }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function Navigation() {
  const pathname = usePathname();
  const mainNav: NavItem[] = [
    {
      title: 'Home',
      href: '/',
      icon: Home,
    },
    {
      title: 'About',
      href: '/about',
      icon: Info,
      items: [
        {
          title: 'Who we are',
          href: '/about',
          description: 'Learn about our story and values',
        },
        {
          title: 'Mission and Vision',
          href: '/about/mission',
          description: 'Our goals and what drives us',
        },
        {
          title: 'Our Partners',
          href: '/about/partners',
          description: 'Meet our trusted partners',
        },
        {
          title: 'Contact Us',
          href: '/contact',
          description: 'Get in touch with our team',
          icon: Contact,
        },
      ],
    },
    {
      title: 'Store',
      href: '/store',
      icon: Store,
      items: [
        {
          title: 'Push Bikes',
          href: '/store/push-bikes',
          items: [
            { title: '12"', href: '/store/push-bikes/12' },
            { title: '14"', href: '/store/push-bikes/14' },
          ],
        },
        {
          title: 'Parts & Accessories',
          href: '/store/parts',
          items: [
            { title: 'Wheelsets', href: '/store/parts/wheelsets' },
            { title: 'Helmets & Protection', href: '/store/parts/protection' },
            { title: 'Parts', href: '/store/parts/other' },
          ],
        },
        { title: 'Pedal Bikes', href: '/store/pedal-bikes' },
        { title: 'Our Brands', href: '/store/brands' },
      ],
    },
    {
      title: 'Races',
      href: '/races',
      icon: Trophy,
      items: [
        {
          title: 'About our Races',
          href: '/races/about',
          description: 'Learn about our racing events',
        },
        {
          title: '2025 Calendar',
          href: '/races/calendar',
          description: 'View upcoming race schedule',
          icon: Calendar,
        },
        {
          title: 'Register for Race',
          href: '/races/register',
          description: 'Sign up for upcoming races',
        },
      ],
    },
  ];

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/">
        <Image src={Logo} alt="Logo" width={150} />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {mainNav.map((item) => {
              const Icon = item.icon;

              if (!item.items) {
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'gap-2',
                          pathname === item.href &&
                            'bg-accent text-accent-foreground',
                        )}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger className="gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {item.items.map((subItem) => (
                        <ListItem
                          key={subItem.href}
                          href={subItem.href}
                          title={subItem.title}
                          icon={subItem.icon}
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop Login Button */}
      <div className="hidden md:block">
        <Button size="lg" asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 py-4">
              {mainNav.map((item) => {
                const Icon = item.icon;

                if (!item.items) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground',
                        pathname === item.href &&
                          'bg-accent text-accent-foreground',
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.title}
                    </Link>
                  );
                }

                return (
                  <div key={item.href} className="space-y-2">
                    <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.title}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}

              <Separator className="my-2" />

              <Button size="lg" asChild className="w-full">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
