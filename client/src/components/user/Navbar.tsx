"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/img/logo.webp";



interface Service {
  id: number;
  name: string;
  image: string;

}

const Navbar = () => {
  const [services, setServices] = useState<Service[]>([]); // Store categories and subcategories
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false); // Separate state for mobile dropdown

  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // Separate state for mobile dropdown
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll position
  const [isClient, setIsClient] = useState(false); // Track if it's on the client side

  // Create a ref for the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // When you scroll down
      } else {
        setIsScrolled(false); // At the top of the page
      }
    };

    // Click outside listener to close the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Only close dropdown if it's open and the click is outside the dropdown or button
      if (
        isDesktopDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target.closest('.relative') // Ensure click is not inside the button that toggles the dropdown
      ) {
        setIsDesktopDropdownOpen(false); // Close the dropdown
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside); // Listen for outside clicks

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside); // Clean up listener
    };
  }, [isDesktopDropdownOpen]); // Depend on dropdown state to trigger re-bind




  // Fetch categories and subcategories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/services`); // Replace with your API endpoint
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleMobileDropdown = () =>
    setIsMobileDropdownOpen((prev) => !prev); // Toggle mobile dropdown

  


  // If it's not the client, return null to avoid hydration errors
  if (!isClient) {
    return null;
  }

  return (
    <nav
      className={`${isScrolled ? "shadow-md" : ""} fixed top-0 left-0 right-0 z-50 `}
      style={{ backgroundColor: "white", opacity: 0.95 }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 " >
        <div className="relative flex items-center justify-between h-20">
          {/* Mobile and Tablet menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-[#007f52] hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Logo/Branding */}
          <div className="flex items-center">
            <div className="grid-element relative w-32 h-16">
              <Link href="/" className="text-black text-2xl font-semibold">
                <Image
                  src={Logo}
                  alt="Ar Group"
                  fill
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, 120px"
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <div className="flex space-x-4">
              <Link
                href="/"
                className="px-3 py-2 text-medium font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                href="/aboutUs"
                className="px-3 py-2 text-medium font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
              >
                About Us
              </Link>

              
              <Link
                href="/projects"
                className="px-3 py-2 text-medium font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
              >
                Our Company
              </Link>


              <Link
                href="/career"
                className="px-3 py-2 text-medium font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
              >
                Career
              </Link>
              <Link
                href="/blog"
                className="px-3 py-2 text-medium font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
              >
                Blog
              </Link>
              <Link
                href="/contactUs"
                className="px-3 py-2 text-medium font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and Tablet Menu */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            href="/aboutUs"
            className="block px-3 py-2 text-base font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
          >
            About Us
          </Link>
          <div className="block">
            <button
              onClick={toggleMobileDropdown}
              className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
            >
              Services
            </button>
            {isMobileDropdownOpen && (
              <div className="space-y-1 px-2 hover:bg-[#007f52]" >
                {services.map((service) => (
                  
                  <div key={service.id} className="flex items-center space-x-3">
                     <Link href={`/services/${service.id}`}>
                    <button className="text-black text-left px-3 py-2 text-base font-medium hover:bg-[#007f52] rounded-md">
                      {service.name}
                    </button>
                    </Link>
                  </div>
                
                ))}

              </div>
            )}
          </div>
          <Link
            href="/projects"
            className="block px-3 py-2 text-base font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
          >
            Projects
          </Link>

          <Link
            href="/career"
            className="block px-3 py-2 text-base font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
          >
            Career
          </Link>
          <Link
            href="/blog"
            className="block px-3 py-2 text-base font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
          >
            Blog
          </Link>
          <Link
            href="/contactUs"
            className="block px-3 py-2 text-base font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
