'use client';
import React from "react";
import Image from "next/image";
import iq from "@/app/assets/img/IQBD.webp";
import digirib from "@/app/assets/img/Digirib.webp";
import intero from "@/app/assets/img/Interio.webp";
import Link from "next/link";




const CompanySection = () => {
    
    return (
        <section className="bg-[#f0f8ff] py-12 relative">

            {/* Background Text */}
            <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[20vw] sm:text-7xl md:text-9xl font-bold text-[#E6F3FB] opacity-1 z-0">
                COMPANY
            </h1>

            <div className="text-center relative z-10">
                {/* Front Text */}
                <h2 className="text-4xl font-semibold text-[#202020] mt-2">COMPANY</h2>
            </div>

            <div className="mt-12 flex justify-center">
                <div className="bg-white shadow-sm rounded-lg p-6 w-full max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {/* Company 1 */}
                        <Link href={`https://iq-bd.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex flex-col items-center border-b border-gray-200 md:border-b-0 md:border-r ">


                                <Image
                                    src={iq}
                                    alt="IQ BD Logo"
                                    width={150}
                                    height={120}
                                    className="object-contain mx-auto"
                                />
                                <p className="text-[#202020] mt-4">iq-bd.com</p>
                            </div>
                        </Link>
                        {/* Company 2 */}
                        <Link href={`https://interiobd.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >

                        
                        <div className="flex flex-col items-center border-b border-gray-200 md:border-b-0 md:border-r ">
                            <Image
                                src={intero}
                                alt="Interio Logo"
                                width={150}
                                height={120}
                                className="object-contain mx-auto"
                            />
                            <p className="text-[#202020] mt-4">interiobd.com</p>
                        </div>
                        </Link>
                        <Link href={`https://digirib.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        {/* Company 3 */}
                        <div className="flex flex-col items-center">
                            <Image
                                src={digirib}
                                alt="Digirib Logo"
                                width={150}
                                height={120}
                                className="object-contain mx-auto"
                            />
                            <p className="text-[#202020] mt-4">digirib.com</p>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default CompanySection;
