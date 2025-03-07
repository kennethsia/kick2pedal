'use client';

import {
  Bike,
  BookOpen,
  CalendarDays,
  Home,
  Info,
  SquareTerminal,
  Store,
  Trophy,
} from 'lucide-react';

import { NavEvent } from '@/components/layout/Sidebar/components/nav-events';
import { NavMain } from '@/components/layout/Sidebar/components/nav-main';
import { NavUser } from '@/components/layout/Sidebar/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import Logo from '@/public/k2p-logo-removebg-preview.png';
import Image from 'next/image';
import Link from 'next/link';

// This is sample data.
const data = {
  // teams: [
  //   {
  //     name: 'Acme Inc',
  //     logo: GalleryVerticalEnd,
  //     plan: 'Enterprise',
  //   },
  //   {
  //     name: 'Acme Corp.',
  //     logo: AudioWaveform,
  //     plan: 'Startup',
  //   },
  //   {
  //     name: 'Evil Corp.',
  //     logo: Command,
  //     plan: 'Free',
  //   },
  // ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: SquareTerminal,
    },
    {
      title: 'All events',
      url: '/events',
      icon: CalendarDays,
    },
    {
      title: 'Rankings',
      url: '/leaderboard',
      icon: Trophy,
    },
    {
      title: 'Rulebook',
      url: '/rules-and-regulations',
      icon: BookOpen,
    },
  ],
  navEvents: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'About Us',
      url: '/about-us',
      icon: Info,
    },
    {
      title: 'Store',
      url: '/store',
      icon: Store,
    },
    {
      title: 'Races',
      url: '/events',
      icon: Bike,
    },
  ],
};

export function AppSidebar({ user }: { user: any }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard">
          <Image src={Logo} alt="Authentication background" priority />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavEvent items={data.navEvents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
