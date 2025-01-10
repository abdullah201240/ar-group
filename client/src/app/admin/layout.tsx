"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
 
  const pathname = usePathname(); // Get the current route
  const isLoginPage = pathname === "/admin/login"; 
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <Toaster position="top-center" />
        <div className="flex">
          {!isLoginPage && <AppSidebar />} {/* Conditionally render the AppSidebar */}
          <main className="flex-1">
            {isLoginPage ? null : <SidebarTrigger />}
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
