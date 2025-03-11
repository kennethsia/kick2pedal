import { AdminSidebar } from '@/components/layout/Sidebar/AdminSidebar';
import { PasswordProtection } from '@/components/PasswordProtection';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getUserMeLoader } from '@/data/services/getUserMeLoader';
import Logo from '@/public/kick2pedal-word-logo_360x.png';
import Image from 'next/image';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getUserMeLoader();
  const user = result?.data ?? null;
  return (
    <PasswordProtection>
      <SidebarProvider>
        <AdminSidebar user={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Image
                src={Logo}
                alt="Authentication background"
                priority
                width="100"
              />
              {/* <Breadcrumbs /> */}
            </div>
          </header>
          <div className="flex items-center gap-2 px-4"> {children}</div>

          {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */}
        </SidebarInset>
      </SidebarProvider>
    </PasswordProtection>
  );
}
