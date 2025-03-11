'use client';

import {
  Bike,
  Calendar,
  Home,
  Info,
  PersonStanding,
  Store,
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
      title: 'Registrations',
      url: '/admin',
      icon: Calendar,
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: PersonStanding,
    },
    // {
    //   title: 'All events',
    //   url: '/events',
    //   icon: CalendarDays,
    // },
    // {
    //   title: 'Rankings',
    //   url: '/leaderboard',
    //   icon: Trophy,
    // },
    // {
    //   title: 'Rulebook',
    //   url: '/rules-and-regulations',
    //   icon: BookOpen,
    // },
    // {
    //   title: 'Contact support',
    //   url: '/support',
    //   icon: InfoIcon,
    // },
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

export function AdminSidebar({ user }: { user: any }) {
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
