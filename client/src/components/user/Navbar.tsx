"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false); // Separate state for mobile dropdown

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




 

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);


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
                    src="/logo.webp"
                    alt='Ar Group'
                    height={120}
                    width={120}
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
                href="/company"
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
          <Link
            href="/company"
            className="block px-3 py-2 text-base font-medium text-black hover:bg-[#007f52] hover:text-white rounded-md"
          >
             Our Company
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
