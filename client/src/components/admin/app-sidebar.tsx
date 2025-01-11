"use client";

import {
  Home,
  LogOut,
  Info,
  Phone,
  Building,
  Sun,
  Moon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import Image from "next/image";
import logo from "@/app/assets/img/logo.webp";
import Link from "next/link";
import { useState } from "react";

// Logo Component
function Logo() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <Image
        src={logo}
        alt="Company Logo"
        className="w-16 h-12"
      />
      <span className="text-xl font-bold text-gray-900 dark:text-white">Ar Group</span>
    </div>
  );
}

// Mode Toggle Component
function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="px-4 py-4">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
      >
        <Sun className="h-5 w-5 dark:hidden" />
        <Moon className="hidden h-5 w-5 dark:block" />
        <span>Toggle Theme</span>
      </button>
    </div>
  );
}

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "About",
    url: "/admin/about",
    icon: Info,
  },
  {
    title: "Our Company",
    url: "/admin/company",
    icon: Building,
  },
  {
    title: "Contact Us",
    url: "/admin/contact",
    icon: Phone,
  },
  
  
];

export function AppSidebar() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // Handle Logout
  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    setIsLoggingOut(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/auth/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
      });

      if (response.ok) {
        // Remove token from localStorage
        localStorage.removeItem("sessionToken");

        // Redirect to the login page
        router.push("/admin/login");
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Sidebar className="w-64 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white h-full">
      <SidebarContent>
        {/* Logo Section */}
        <Logo />

        {/* Mode Toggle Section */}
        <ModeToggle />

        {/* Menu Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-gray-500 dark:text-gray-400">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Log Out Section */}
        <div className="mt-auto px-4 py-4 border-t border-gray-300 dark:border-gray-700">
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
          >
            <LogOut className="w-5 h-5" />
            <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
