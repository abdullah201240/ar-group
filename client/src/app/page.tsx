"use client";
import AboutUs from "@/components/user/AboutUs";
import Blog from "@/components/user/Blog";
import CompanySection from "@/components/user/CompanySection";
import Footer from "@/components/user/Footer";
import HeroSection from "@/components/user/HeroSection";
import HeroSectionMobile from "@/components/user/HeroSectionMobile";
import Navbar from "@/components/user/Navbar";
import Whatsapp from "@/components/user/Whatsapp";
import { useMediaQuery } from 'react-responsive';

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Checks for screen width <= 768px

  return (
    <div >
      <Navbar />
      {isMobile ? <HeroSectionMobile /> : <HeroSection />}
      
      <CompanySection/>
      <AboutUs/>
      <Blog/>
     
      <Whatsapp  />
      <Footer  />



    </div>
      
  );
}
