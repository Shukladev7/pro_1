
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Users,
  FileText,
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  Scale,
  CircleDollarSign,
  Wrench,
  Ticket,
  ClipboardList,
  Settings,
  LogOut
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/escalations", label: "Escalations", icon: ClipboardList },
  { href: "/escalations/new", label: "New Escalation", icon: PlusCircle },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  }
  
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Ticket className="w-8 h-8 text-primary-foreground" />
            <h1 className="text-xl font-semibold text-primary-foreground group-data-[collapsible=icon]:hidden">
              Escalation Tracker
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                        <LogOut />
                        <span>Sign Out</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-xl font-semibold">
                {navItems.find(item => pathname.startsWith(item.href))?.label || 'Escalation Tracker'}
            </h2>
        </div>
        <main className="flex-1 p-4 overflow-auto">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
