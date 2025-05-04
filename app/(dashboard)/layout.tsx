'use client';
import Link from 'next/link';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  LogOut,
  ShoppingCart,
  Users,
  Users2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import { NavItem } from './nav-item';
import { SearchInput } from './search';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            {/* <DashboardBreadcrumb /> */}
            {pathname !== '/profile' && <SearchInput />}
            {/* <User /> */}
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

function DesktopNav() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`);
      if (response.status === 200) {
        console.log('Logout successful');
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">


        <NavItem href="/" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>


        <NavItem href="/users" label="Users">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/profile" label="Profile">
          <Users className="h-5 w-5" />
        </NavItem>

      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <button
          onClick={handleLogout}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </button>
      </nav>
    </aside>
  );
}

function MobileNav() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`);
      if (response.status === 200) {
        console.log('Logout successful');
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/users"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Users2 className="h-5 w-5" />
            User
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Users className="h-5 w-5" />
            Profile
          </Link>
          <Link
            href="#"
            onClick={handleLogout}
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <LogOut className="h-5 w-5" />
            LogOut
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}