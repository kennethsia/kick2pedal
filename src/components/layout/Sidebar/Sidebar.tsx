'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  CalendarDays,
  CalendarPlus,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Trophy,
} from 'lucide-react';

import { NavMain } from '@/components/layout/Sidebar/components/nav-main';
import { NavEvent } from '@/components/layout/Sidebar/components/nav-events';
import { NavUser } from '@/components/layout/Sidebar/components/nav-user';
import { TeamSwitcher } from '@/components/layout/Sidebar/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import Image from 'next/image';
import Logo from '@/public/k2p-logo-removebg-preview.png';
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
      title: 'Rules & Regulations',
      url: '/rules-and-regulations',
      icon: BookOpen,
      isActive: true,
      // items: [
      //   {
      //     title: 'Genesis',
      //     url: '#',
      //   },
      //   {
      //     title: 'Explorer',
      //     url: '#',
      //   },
      //   {
      //     title: 'Quantum',
      //     url: '#',
      //   },
      // ],
    },
  ],
  navEvents: [
    // {
    //   title: 'My events',
    //   url: '/my-events',
    //   icon: CalendarPlus,
    // },
    {
      title: 'All events',
      url: '/events',
      icon: CalendarDays,
    },
    {
      title: 'Leaderboard',
      url: '/leaderboard',
      icon: Trophy,
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
